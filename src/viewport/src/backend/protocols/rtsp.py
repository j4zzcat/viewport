import asyncio
import os
import subprocess
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import ParseResult, urlparse
from sanic import Sanic
from sanic.response import redirect
from websockets.server import serve

from backend.cmdsrv import SimpleCommandServer, Command
from backend.error import ApplicationException
from backend.protocol import AbstractProtocolController, AbstractLivestreamController, CallbackLivestreamController
from context import GlobalFactory


class SimpleRTSPProtocolController(AbstractProtocolController):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().getChild(self.__class__.__name__)
        self._transcoding_servers = {}

    def run(self):
        # Lazy start the needed infrastructure based on the requested livestreams
        pass

    def new_livestream(self, url: str):
        if isinstance(url, ParseResult):
            url = url.geturl()
        self._logger.debug("Creating a Livestream Controller for '{url}'".format(url=url))

        # See if the client asked for a specific stream format that's supported
        parts = url.rsplit('::', 1)
        if len(parts) > 1:
            url = parts[0]
            stream_format = parts[-1]
            stream_format = stream_format.lower()
            if stream_format not in GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"]:
                raise ApplicationException("Can't transcode from '{scheme}' to '{stream_format}'".format(
                    scheme=urlparse(url).scheme,
                    stream_format=stream_format))
        else:
            stream_format = GlobalFactory.get_settings()["protocol"]["rtsp"]["default_transcoder"]

        # See what infra should be started for this type of streaming format
        server_type = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"][stream_format]["server"]
        if server_type not in self._transcoding_servers:
            self._transcoding_servers[server_type] = eval(
                f"GlobalFactory.new_{server_type}_transcoding_server()")

            self._transcoding_servers[server_type].run()

        return [self._transcoding_servers[server_type].new_livestream(url, stream_format)]


class SimpleFileTranscodingServer(Command):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().getChild(self.__class__.__name__)
        self._bind = GlobalFactory.get_settings()["protocol"]["rtsp"]["server"]["file"]["bind"]
        self._port = GlobalFactory.get_settings()["protocol"]["rtsp"]["server"]["file"]["port"]

        self._root_dir = "{data_dir}/file_transcoding_server".format(data_dir=GlobalFactory.get_dirs()["data_dir"])
        os.makedirs(self._root_dir, exist_ok=True)

        self._endpoints = {}
        self._tpe = ThreadPoolExecutor(max_workers=1, thread_name_prefix="FTS")

    def new_livestream(self, url, stream_format):
        endpoint = {
            "original_url": url,
            "format": stream_format,
            "scheme": "http",
            "port": self._port,
            "path": "/stream/{index}".format(index=GlobalFactory.next_int("stream"))
        }

        return CallbackLivestreamController(endpoint, self.start_livestream, self.stop_livestream)

    def start_livestream(self, livestream):
        endpoint = livestream.get_endpoint()
        self._endpoints[endpoint["path"]] = endpoint

    def stop_livestream(self, livestream):
        pass

    def run(self):
        self._tpe.submit(self._run)

    def _run(self):
        self._logger.info("Simple File Transcoding Server is ready, WS: {bind}:{port}".format(
            bind=self._bind,
            port=self._port))

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(self._run_forever())

    async def _run_forever(self):
        async with serve(self._on_connection, self._bind, int(self._port)):
            await asyncio.Future()

    async def _on_connection(self, websocket):
        client = "{client_address}:{client_port}".format(
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1])

        if websocket.path not in self._endpoints:
            self._logger.warning("Client '{client}' requested an unknown livestream path '{path}'".format(
                client=client,
                path=websocket.path
            ))

            await websocket.close()

        endpoint = self._endpoints[websocket.path]
        self._logger.debug("Client '{client}' asks for endpoint '{endpoint}'".format(
            client=client,
            endpoint=endpoint))

        transcoder = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"][endpoint["format"]]
        program = transcoder["program"]
        program_options = transcoder["options"]

        if program != "ffmpeg":
            self._logger.error("Transcoder '{format}' defines an unknown program '{program}'. Check settings.toml.".format(
                format=endpoint["format"],
                program=program
            ))

            await websocket.close()
            return

        output_dir = "{root_dir}{path}".format(
            root_dir=self._root_dir,
            path=websocket.path)
        os.makedirs(output_dir, exist_ok=True)

        program_options = program_options.format(
            input_url=endpoint["original_url"],
            output_dir=output_dir)

        controller = GlobalFactory.get_process_server().new_process(
            program,
            *program_options,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            stdout_text=True,
            stderr_text=True,
            monitor=True)

        controller.on("stdout", print)
        controller.on("stderr", print)
        controller.start()

        # self._logger.info("Simple File Transcoding Server is ready, HTTP: {bind}:{port}".format(
        #     bind=self._bind,
        #     port=self._port))
        #
        # app = Sanic("MyStreamApp")
        # files_dir = "{root_dir}/files".format(root_dir=self._root_dir)
        # app.static('/files', files_dir)
        # self._logger.debug("Serving /files/ from {files_dir}".format(files_dir=files_dir))
        #
        # app.run(motd=True, port=int(self._port), debug=True, access_log=True)
        # asyncio.sleep(3600)
        #
        # @app.route("/stream/<id>")
        # async def _on_connect(request, id):
        #     if request.path in self._endpoints:
        #         endpoint = self._endpoints[request.path]
        #         transcoder = self._transcoders[endpoint["format"]]
        #
        #         self._logger.debug("Starting '{program}' to transcode '{original_url}' to '{format}'".format(
        #             program=self._transcoders[endpoint["format"]]["program"],
        #             original_url=endpoint["original_url"],
        #             format=endpoint["format"]))
        #
        #         if transcoder["program"] == "ffmpeg":
        #             output_dir = "{root_dir}/files{path}".format(root_dir=self._root_dir, path=request.path)
        #             os.makedirs(output_dir, exist_ok=True)
        #
        #             if endpoint["format"] == "hls":
        #                 output_file_name = "index.m3u8"
        #             else:
        #                 output_file_name = "index.{format}".format(output_dir=output_dir, format=endpoint["format"])
        #
        #             output_file = "{output_dir}/{output_file_name}".format(output_dir=output_dir, output_file_name=output_file_name)
        #             output_path = "/files{request_path}/{output_file_name}".format(request_path=request.path, output_file_name=output_file_name)
        #
        #             command = "ffmpeg {options}".format(options=transcoder["options"])
        #             command = command.format(
        #                 input_url=endpoint["original_url"],
        #                 output_file=output_file)
        #         else:
        #             raise ApplicationException("Transcoder program '{program}' is not supported".format(
        #                 program=transcoder["program"]))
        #
        #         process = await asyncio.create_subprocess_exec(
        #             *command.split(" "),
        #             stdout=asyncio.subprocess.PIPE,
        #             stderr=asyncio.subprocess.PIPE)
        #
        #         return redirect(output_path)
        #







class SimpleTranscodingController(Command):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().getChild(self.__class__.__name__)
        self._http_server = None
        self._ws_server = None
        self.file_transcoders = None
        self.stdout_transcoders = None

        self._transcoders = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"]
        self._default_transcoder = GlobalFactory.get_settings()["protocol"]["rtsp"]["default_transcoder"]

        self._transcoding_streaming_server = GlobalFactory.new_transcoding_streaming_server(
            {key: value for key, value in self._transcoders.items() if value["server"] == "streaming"},
            GlobalFactory.get_settings()["protocol"]["rtsp"]["server"]["streaming"]["bind"],
            GlobalFactory.get_settings()["protocol"]["rtsp"]["server"]["streaming"]["port"])

        self._transcoding_file_server = GlobalFactory.new_transcoding_file_server(
            {key: value for key, value in self._transcoders.items() if value["server"] == "file"},
            GlobalFactory.get_settings()["protocol"]["rtsp"]["server"]["file"]["bind"],
            GlobalFactory.get_settings()["protocol"]["rtsp"]["server"]["file"]["port"])

    def run(self):
        GlobalFactory.get_command_server().submit(
            self._transcoding_streaming_server)

        tpe = ThreadPoolExecutor(max_workers=10,thread_name_prefix="BBB")
        tpe.submit(self._transcoding_file_server.run)

    def new_livestream_controller(self, input_url, transcoder=None):
        if transcoder is None:
            transcoder = self._default_transcoder

        if self._transcoding_file_server.can_transcode(transcoder):
            transcoding_server = self._transcoding_file_server
        elif self._transcoding_streaming_server.can_transcode(transcoder):
            transcoding_server = self._transcoding_streaming_server
        else:
            raise ApplicationException("Transcoder '{transcoder}' is not supported".format(transcoder=transcoder))

        return transcoding_server.new_livestream(input_url, transcoder)


class SimpleTranscodingStreamingServer(Command):
    def __init__(self, transcoders, bind, port):
        self._logger = GlobalFactory.get_logger().getChild(self.__class__.__name__)
        self._transcoders = transcoders
        self._bind = bind
        self._port = port

        self._endpoints = {}

    def can_transcode(self, transcoder):
        return transcoder in self._transcoders

    class LivestreamController(AbstractLivestreamController):
        def __init__(self, endpoint):
            self._endpoint = endpoint

        def get_endpoint(self):
            return self._endpoint

    def new_livestream_controller(self, input_url, transcoder):
        endpoint = {
            "original_url": input_url,
            "format": transcoder,
            "scheme": "ws",
            "port": self._port,
            "path": "/stream/{index}".format(index=GlobalFactory.next_int("stream"))
        }

        self._endpoints[endpoint["path"]] = endpoint

        return SimpleTranscodingStreamingServer.LivestreamController(endpoint)

    def run(self):
        self._logger.info("Simple Transcoding Streaming Server is ready, WS: {bind}:{port}".format(bind=self._bind, port=self._port))
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(self._run_forever())

    async def _run_forever(self):
        async with serve(self._on_connection, self._bind, int(self._port)):
            await asyncio.Future()

    async def _on_connection(self, websocket):
        self._logger.debug("Client {client_address}:{client_port} asks for '{path}'".format(
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1],
            path=websocket.path))

        if websocket.path not in self._endpoints:
            raise ApplicationException(
                "The '{path}' is not a known Livestream endpoint".format(
                    path=websocket.path))
        else:
            endpoint = self._endpoints[websocket.path]
            transcoder = self._transcoders[endpoint["format"]]

            self._logger.debug("Starting '{command}' to transcode '{original_url}' to '{format}'".format(
                command=transcoder["command"],
                original_url=endpoint["original_url"],
                format=endpoint["format"]))

            if transcoder["program"] == "ffmpeg":
                command = "ffmpeg -i {original_url} {options} -".format(
                    original_url=endpoint["original_url"],
                    options=transcoder["options"])
            else:
                raise ApplicationException("Transcoder program '{program}' is not supported".format(
                    program=transcoder["program"]))

            process = await asyncio.create_subprocess_exec(
                *command.split(" "),
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE)

            tasks = [
                asyncio.create_task(
                    self._copy_stdout_to_ws(
                        process=process,
                        websocket=websocket)),
                asyncio.create_task(
                    self._log_stderr(process=process))]

            # Wait for ffmpeg to exit
            # When transcoding to a pipe, also wait for the io task
            done, pending = await asyncio.wait(
                tasks,
                return_when=asyncio.FIRST_COMPLETED)

            for task in pending:
                task.cancel()

            process.terminate()

    async def _copy_stdout_to_ws(self, process, websocket):
        self._logger.info("Starting livestream for client '{client_address}:{client_port}'".format(
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1]
        ))

        try:
            while True:
                b = await process.stdout.read(1)
                await websocket.send(b)
        except Exception as e:
            self._logger.debug(e)
            self._logger.info("Stopping livestream for client: '{client_address}:{client_port}".format(
                client_address=websocket.remote_address[0],
                client_port=websocket.remote_address[1]))
            try:
                await websocket.close()
            except Exception as e:
                self._logger.error(e)

    async def _log_stdout(self, process):
        logger = GlobalFactory.get_logger().getChild("ffmpeg:{pid}".format(pid=process.pid))
        try:
            while True:
                line = await process.stderr.readline()
                if line:
                    logger.error(line)
                else:
                    break
        except Exception as e:
            self._logger.error(e)


