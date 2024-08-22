import asyncio
import os
import subprocess
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import ParseResult, urlparse
from websockets.server import serve

from backend.cmdsrv import Command
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

        # See if the client asked for a specific transcoder we know of
        parts = url.rsplit('::', 1)
        if len(parts) > 1:
            url = parts[0]
            transcoder_name = parts[-1].lower()
            if transcoder_name not in GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"]:
                raise ApplicationException("Transcoder '{transcoder_name}' not found in settings.toml".format(
                    scheme=urlparse(url).scheme,
                    transcoder_name=transcoder_name))
        else:
            transcoder_name = GlobalFactory.get_settings()["protocol"]["rtsp"]["default_transcoder"]

        # See what infra should be started for this type of transcoder
        # and make sure not to start it more than once
        server_type = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"][transcoder_name]["server"]
        if server_type not in self._transcoding_servers:
            self._transcoding_servers[server_type] = eval(
                f"GlobalFactory.new_{server_type}_transcoding_server()")

            self._transcoding_servers[server_type].run()

        stream_format = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"][transcoder_name]["format"]
        return [self._transcoding_servers[server_type].new_livestream(url, stream_format)]


class SimpleFileTranscodingServer(Command):
    class FFMpegLogger:
        def __init__(self, process_controller):
            self._logger = GlobalFactory.get_logger().getChild("ffmpeg")
            self._process_controller = process_controller

        def log(self, line):
            self._logger.debug(line, extra={"override": {
                    "process": self._process_controller._process.pid,
                    "threadName": "Unknown"}})

    def __init__(self):
        self._logger = GlobalFactory.get_logger().getChild(self.__class__.__name__)
        self._bind = GlobalFactory.get_settings()["protocol"]["rtsp"]["server"]["file"]["bind"]
        self._port = GlobalFactory.get_settings()["protocol"]["rtsp"]["server"]["file"]["port"]

        self._root_dir = GlobalFactory.get_dirs()["web_root_dir"]
        os.makedirs(self._root_dir, exist_ok=True)

        self._endpoints = {}
        self._tpe = ThreadPoolExecutor(max_workers=1, thread_name_prefix="FTS")

    def new_livestream(self, url, stream_format):
        endpoint = {
            "original_url": url,
            "stream_format": stream_format,
            "scheme": "ws",
            "port": self._port,
            "path": "stream/{index}".format(index=GlobalFactory.next_int("stream"))
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

        path = websocket.path[1:]  # chop leading '/'
        if path not in self._endpoints:
            self._logger.warning("Client '{client}' requested an unknown livestream path '{path}'".format(
                client=client,
                path=websocket.path
            ))

            await websocket.close()

        endpoint = self._endpoints[path]
        self._logger.info("Client '{client}' asks for '{path}'".format(
            client=client,
            path=path))

        transcoder = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"][endpoint["stream_format"]]
        program = transcoder["program"]
        program_options = transcoder["options"]
        format = transcoder["format"]

        match program:
            case "ffmpeg":
                output_dir = "{root_dir}/{path}".format(
                    root_dir=self._root_dir,
                    path=path)
                os.makedirs(output_dir, exist_ok=True)

                program_options = program_options.format(
                    input_url=endpoint["original_url"],
                    output_dir=output_dir)

                match endpoint["stream_format"]:
                    case "hls":
                        response = "http://{{server}}:{port}/{path}/index.m3u8".format(
                            port=GlobalFactory.get_web_server().port,
                            path=endpoint["path"])

                        response_stall = 10

                    case _:
                        self._logger.error("Can't handle '{format}'".format(format=transcoder))
                        await  websocket.close()

            case _:
                self._logger.error("Transcoder '{format}' defines an unknown program '{program}'. Check settings.toml.".format(
                    format=endpoint["format"],
                    program=program))

                await websocket.close()
                return

        process_controller = GlobalFactory.get_process_server().new_process(
            program,
            *(program_options.split()),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            stderr_text=True,
            monitor=True)

        # Check if a transcoder program is already running for this endpoint, and if so
        # stop it, i.e., the client reconnected.
        if "process_controller" in endpoint:
            process_controller = endpoint["process_controller"]
            process_controller.stop()
        else:
            endpoint["process_controller"] = process_controller

        process_controller.on("stderr", self.FFMpegLogger(process_controller).log)
        process_controller.start()

        await asyncio.sleep(response_stall)
        await websocket.send(response)
        await websocket.close()


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
            "stream_format": transcoder,
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


