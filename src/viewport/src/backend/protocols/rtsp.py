import asyncio
import os
import threading
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from urllib.parse import ParseResult

from websockets.server import serve
from aiohttp import web

from backend.cmdsrv import SimpleCommandServer
from backend.error import ApplicationException
from backend.protocol import AbstractProtocolController, AbstractLivestreamController
from context import GlobalFactory


class SimpleRTSPProtocolController(AbstractProtocolController):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._transcoding_controller = None

    def run(self):
        super().run()
        self._transcoding_controller = GlobalFactory.new_transcoding_controller()
        GlobalFactory.get_command_server().run_synchronously(
            self._transcoding_controller)

        return self

    def new_livestream_controller(self, url: str):
        if isinstance(url, ParseResult):
            url = url.geturl()
        self._logger.debug("Creating a Livestream Controller for '{url}'".format(url=url))

        # See if the client asked for a specific stream format
        parts = url.rsplit('::', 1)
        if len(parts) > 1:
            url = parts[0]
            transcoder = parts[-1]
        else:
            transcoder = None

        livestream = self._transcoding_controller.new_livestream_controller(url, transcoder)

        return [livestream]


class SimpleTranscodingController(SimpleCommandServer.BaseCommand):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
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
        # Todo Fix
        GlobalFactory.get_command_server().run_asynchronously(self._transcoding_streaming_server)
        # GlobalFactory.get_command_server().run_asynchronously(self._transcoding_file_server, "process")
        # server_thread = threading.Thread(target=self._transcoding_file_server.run)
        # server_thread.start()
        pe = ProcessPoolExecutor()
        pe.submit(self._transcoding_file_server.run)

    def new_livestream_controller(self, input_url, transcoder=None):
        if transcoder is None:
            transcoder = self._default_transcoder

        if self._transcoding_file_server.can_transcode(transcoder):
            transcoding_server = self._transcoding_file_server
        elif self._transcoding_streaming_server.can_transcode(transcoder):
            transcoding_server = self._transcoding_streaming_server
        else:
            raise ApplicationException("Transcoder '{transcoder}' is not supported".format(transcoder=transcoder))

        return transcoding_server.new_livestream_controller(input_url, transcoder)


class SimpleTranscodingStreamingServer(SimpleCommandServer.BaseCommand):
    def __init__(self, transcoders, bind, port):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._transcoders = transcoders
        self._bind = bind
        self._port = port

        self._stream_index = 0
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
            "path": "/stream/{index}".format(index=GlobalFactory.next_number("stream"))
        }

        self._endpoints[endpoint["path"]] = endpoint

        return SimpleTranscodingStreamingServer.LivestreamController(endpoint)

    def run(self):
        super().run()
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
        logger = GlobalFactory.get_logger().get_child("ffmpeg:{pid}".format(pid=process.pid))
        try:
            while True:
                line = await process.stderr.readline()
                if line:
                    logger.error(line)
                else:
                    break
        except Exception as e:
            self._logger.error(e)


class SimpleTranscodingFileServer(SimpleCommandServer.BaseCommand):
    def __init__(self, transcoders, bind, port):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._transcoders = transcoders
        self._bind = bind
        self._port = port

        self._root_dir = "{data_dir}/transcoding_file_server".format(data_dir=GlobalFactory.get_dirs()["data_dir"])
        os.makedirs(self._root_dir, exist_ok=True)
        os.makedirs("{root_dir}/files".format(root_dir=self._root_dir), exist_ok=True)

        self._endpoints = {}
        self._loop = None

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
            "scheme": "http",
            "port": self._port,
            "path": "/stream/{index}".format(index=GlobalFactory.next_number("stream"))
        }

        self._endpoints[endpoint["path"]] = endpoint

        return SimpleTranscodingFileServer.LivestreamController(endpoint)

    def run(self):
        super().run()
        self._logger.info("Simple Transcoding File Server is ready, HTTP: {bind}:{port}".format(
            bind=self._bind,
            port=self._port))

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(self._run_forever())

    async def _run_forever(self):
        self._app = web.Application()
        self._app.router.add_get("/stream/{id}", self._on_connect)

        files_dir = "{root_dir}/files".format(root_dir=self._root_dir)
        self._app.router.add_static("/files/", path=files_dir)
        self._logger.debug("Serving /files/ from {files_dir}".format(files_dir=files_dir))

        runner = web.AppRunner(self._app)
        await runner.setup()
        site = web.TCPSite(runner, host=self._bind, port=int(self._port))
        await site.start()

        while True:
            await asyncio.sleep(3600)  # Keep the server run


        # server = web.Server(self._on_connect)
        # runner = web.ServerRunner(server)
        # await runner.setup()
        # site = web.TCPSite(runner, self._bind, int(self._port))
        # await site.start()
        #
        # while True:
        #     await asyncio.sleep(100*3600)

    async def _on_connect(self, request):
        if request.method != "GET":
            return web.Response(status=403)

        if request.path in self._endpoints:
            endpoint = self._endpoints[request.path]
            transcoder = self._transcoders[endpoint["format"]]

            self._logger.debug("Starting '{program}' to transcode '{original_url}' to '{format}'".format(
                program=self._transcoders[endpoint["format"]]["program"],
                original_url=endpoint["original_url"],
                format=endpoint["format"]))

            if transcoder["program"] == "ffmpeg":
                output_dir = "{root_dir}/files{path}".format(root_dir=self._root_dir, path=request.path)
                os.makedirs(output_dir, exist_ok=True)

                if endpoint["format"] == "hls":
                    output_file_name = "index.m3u8"
                else:
                    output_file_name = "index.{format}".format(output_dir=output_dir, format=endpoint["format"])

                output_file = "{output_dir}/{output_file_name}".format(output_dir=output_dir, output_file_name=output_file_name)
                output_path = "/files{request_path}/{output_file_name}".format(request_path=request.path, output_file_name=output_file_name)

                command = "ffmpeg {options}".format(options=transcoder["options"])
                command = command.format(
                    input_url=endpoint["original_url"],
                    output_file=output_file)
            else:
                raise ApplicationException("Transcoder program '{program}' is not supported".format(
                    program=transcoder["program"]))

            process = await asyncio.create_subprocess_exec(
                *command.split(" "),
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE)

            raise web.HTTPFound(output_path)

            # def add_task(self, coro):
            #     if self._loop is not None:
            #         future = asyncio.run_coroutine_threadsafe(coro, self._loop)
            #         return future
            #     else:
            #         raise RuntimeError("Event loop is not running.")

            # tasks = [
            #     asyncio.create_task(
            #         self._copy_stdout_to_ws(
            #             process=process,
            #             websocket=websocket)),
            #     asyncio.create_task(
            #         self._log_stderr(process=process))]

            # Wait for ffmpeg to exit
            # When transcoding to a pipe, also wait for the io task
            # done, pending = await asyncio.wait(
            #     tasks,
            #     return_when=asyncio.FIRST_COMPLETED)
            #
            # for task in pending:
            #     task.cancel()
            #
            # process.terminate()
            #


    # async def _stderr_logger(self, process):
    #     logger = GlobalFactory.get_logger().get_child("ffmpeg:{pid}".format(pid=process.pid))
    #     try:
    #         while True:
    #             line = await process.stderr.readline()
    #             if line:
    #                 logger.error(line)
    #             else:
    #                 break
    #     except Exception as e:
    #         self._logger.error(e)
    #
    # def prepare(self, url, stream_format):
    #     self._stream_index += 1
    #     file = "/streams/{index}/index.{stream_format}".format(
    #         index=str(self._stream_index),
    #         stream_format=stream_format)
    #
    #     os.makedirs("{root_dir}/streams/{index}".format(
    #         root_dir=self._root_dir,
    #         index=str(self._stream_index)),
    #         exist_ok=True)
    #
    #     command = self._transcoding_server.file_transcoders[stream_format]
    #     asyncio.run_coroutine_threadsafe(coroutine, loop)
    #     process = self._loop.create_subprocess_exec(
    #         *command.format(url=url, file=file).split(" "),
    #         stdout=asyncio.subprocess.DEVNULL,
    #         stderr=asyncio.subprocess.PIPE)
    #
    #     self._loop.create_task(self._stderr_logger(process=process))
    #




