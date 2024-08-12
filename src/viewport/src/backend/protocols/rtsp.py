import asyncio
import os

from websockets.server import serve
from aiohttp import web

from backend.cmdsrv import SimpleCommandServer
from backend.error import ApplicationException
from backend.protocol import AbstractProtocolController, AbstractLivestreamController
from context import GlobalFactory


class SimpleRTSPProtocolController(AbstractProtocolController):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._transcoding_server = None

    def initialize(self):
        super().initialize()

    def run(self):
        super().run()
        self._transcoding_server = GlobalFactory.new_transcoding_server()
        GlobalFactory.get_command_server().run_synchronously(
            self._transcoding_server)

        return self

    def new_livestream_controller(self, url):
        self._logger.debug("Creating a Livestream Controller for '{url}'".format(url=url))

        # See if the client asked for a specific stream format
        parts = url.rsplit('::', 1)
        if len(parts) > 1:
            url = parts[0]
            transcoder = parts[-1]
        else:
            transcoder = None

        livestream = self._transcoding_server.new_livestream_controller(url, transcoder)

        return [livestream]


class SimpleLivestreamController(AbstractLivestreamController):
    def __init__(self, rtsp_url, stream_format, transcoding_server):
        self._rtsp_url = rtsp_url
        self._stream_format = stream_format
        self._transcoding_server = transcoding_server

    def get_endpoint(self):
        return self._transcoding_server.get_endpoint(self._rtsp_url, self._stream_format)

    def start(self):
        self._transcoding_server.livestream_prepare(self._rtsp_url, self._stream_format)


class SimpleTranscodingController(SimpleCommandServer.BaseCommand):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._http_server = None
        self._ws_server = None
        self.file_transcoders = None
        self.stdout_transcoders = None

        self._transcoders = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoders"]
        self._default_transcoder = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoders"]["default_transcoder"]

        self._file_transcoding_server = GlobalFactory.new_file_transcoding_server(
            [for format, command in self._transcoders if "file"
        )
        self._streaming_transcoding_server = GlobalFactory.new_stdout_transcoding_server(self._transcoders)

    def run(self):
        GlobalFactory.get_command_server().run_asynchronously(self._file_transcoding_server)
        GlobalFactory.get_command_server().run_asynchronously(self._stdout_transcoding_server)

    def new_livestream_controller(self, input_url, transcoder=None):
        if transcoder is None:
            transcoder = self._default_transcoder
        else:
            if transcoder not in self._transcoders:
                raise ApplicationException("Transcoder '{transcoder}' is not supported".format(transcoder=transcoder))

        if transcoder in self._file_transcoders:
            self._file_transcoding_server.get_endpoint(input_url, )


def livestream_prepare(self, url, stream_format):
        if stream_format in self._file_transcoders:
            self._http_server.prepare(url, stream_format)
        elif stream_format in self._stdout_transcoders:
            self._ws_server.prepare(url, stream_format)
        else:
            raise ApplicationException("Stream format '{stream_format}' is not known".format(stream_format=stream_format))

    def get_endpoint(self, url, stream_format):
        if self._transcoders[stream_format] is not None:


class SimpleWSServer(SimpleCommandServer.BaseCommand):
    def __init__(self, transcoding_server, bind, port):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._transcoding_server = transcoding_server
        self._bind = bind
        self._port = port

        self._prepared_paths = {}

    def prepare(self, url, stream_format):
        self._prepared_paths[url] = stream_format

    def run(self):
        asyncio.run(self._run_forever())

    async def _run_forever(self):
        async with serve(self._on_connection, self.bind, int(self.port)):
            await asyncio.Future()

    async def _on_connection(self, websocket):
        self._logger.debug("Client {client_address}:{client_port} asks for '{path}'".format(
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1],
            path=websocket.path))

        if websocket.path not in self._prepared_paths:
            raise ApplicationException(
                "The '{path}' is not a known Livestream".format(
                    path=websocket.path))
        else:
            # The requested path belongs to a livestream, and it's a valid rtsp url.
            stream_format = self._prepared_paths[websocket.path]
            rtsp_url = websocket.path[1:]  # Chop leading '/'

            # livestream = [livestream for livestream in self._livestreams if livestream.get_endpoint()["path"] == rtsp_url][0]
            # stream_format = livestream.get_endpoint()["stream_format"]
            self._logger.debug("Starting ffmpeg to transcode '{rtsp_url}' to '{stream_format}'".format(
                rtsp_url=rtsp_url, stream_format=stream_format))

            command = self._transcoding_server[stream_format]

        if "{pipe}" in command:
            # Client receives the stream via the web socket
            process = await asyncio.create_subprocess_exec(
                *command.format(url=rtsp_url, pipe="-").split(" "),
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE)

            tasks = [
                asyncio.create_task(
                    self._io_worker(
                        process=process,
                        websocket=websocket)),
                asyncio.create_task(
                    self._stderr_logger(process=process))]

        elif "{file}" in command:
            self._stream_file_index += 1
            file = "/streams/{index}/index.{stream_format}".format(
                index=str(self._stream_file_index),
                stream_format=stream_format)

            web_dir_root = GlobalFactory.get_dirs()["web_root"]
            os.makedirs("{web_dir_root}/streams/{index}".format(
                web_dir_root=web_dir_root,
                index=str(self._stream_file_index)),
                exist_ok=True)

            process = await asyncio.create_subprocess_exec(
                *command.format(url=rtsp_url, file=file).split(" "),
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE)

            tasks = [
                asyncio.create_task(
                    self._stderr_logger(process=process))]

            # Now tell the client about it
            await websocket.send({
                "scheme": "http",
                "port": GlobalFactory.get_settings()["httpd"]["port"],
                "path": file
            })

        # Wait for ffmpeg to exit
        # When transcoding to a pipe, also wait for the io task
        done, pending = await asyncio.wait(
            tasks,
            return_when=asyncio.FIRST_COMPLETED)

        for task in pending:
            task.cancel()

        process.terminate()


    async def _io_worker(self, process, websocket):
        self._logger.info("Starting '{format}' livestream for client '{client_address}:{client_port}'".format(
            format=self.transcoder,
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1]
        ))

        try:
            while True:
                b = await process.stdout.read(1)
                await websocket.send(b)
        except Exception as e:
            self._logger.debug(e)
            self._logger.info("Stopping {format} livestream for client: '{client_address}:{client_port}".format(
                format=self.transcoder,
                client_address=websocket.remote_address[0],
                client_port=websocket.remote_address[1]
            ))
            try:
                await websocket.close()
            except Exception as e:
                self._logger.error(e)

    async def _stderr_logger(self, process):
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


class SimpleHTTPServer(SimpleCommandServer.BaseCommand):
    def __init__(self, transcoding_server, bind, port, root_dir, ):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._transcoding_server = transcoding_server
        self._bind = bind
        self._port = port
        self._root_dir = root_dir

        self._loop = None
        self._stream_index = 0

    def run(self):
        super().run()
        self._loop = asyncio.get_event_loop()
        self._loop.run_until_complete(self._run_forever())

    async def _run_forever(self):
        web_app = web.Application()
        web_app.add_routes([web.static("/", self._root_dir)])
        web_server_runner = web.AppRunner(web_app)
        web_server_site = web.TCPSite(web_server_runner, self._bind, int(self._port))

        await web_server_runner.setup()
        await web_server_site.start()

    async def _stderr_logger(self, process):
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

    def prepare(self, url, stream_format):
        self._stream_index += 1
        file = "/streams/{index}/index.{stream_format}".format(
            index=str(self._stream_index),
            stream_format=stream_format)

        os.makedirs("{root_dir}/streams/{index}".format(
            root_dir=self._root_dir,
            index=str(self._stream_index)),
            exist_ok=True)

        command = self._transcoding_server.file_transcoders[stream_format]
        asyncio.run_coroutine_threadsafe(coroutine, loop)
        process = self._loop.create_subprocess_exec(
            *command.format(url=url, file=file).split(" "),
            stdout=asyncio.subprocess.DEVNULL,
            stderr=asyncio.subprocess.PIPE)

        self._loop.create_task(self._stderr_logger(process=process))





#
# The SimpleFFMpegServer acts as an RTSP to WebSocket server, leveraging
# ffmpeg to transcode RTSP streams into the FLV format, which are then streamed
# to WebSocket clients. It uses Python's asyncio framework for asynchronous
# handling of tasks.
#
# When the run() method is called, it starts the server by initiating a coroutine
# that runs indefinitely. The server waits for incoming WebSocket
# connections, and for each connection, the onConnection() method is invoked.
#
# In onConnection(), the RTSP URL is extracted from the WebSocket request path,
# and an ffmpeg subprocess is started to transcode the RTSP stream to an FLV
# stream. This subprocess runs concurrently with tasks for managing the IO
# between the ffmpeg process and the WebSocket client, as well as logging any
# errors from the ffmpeg process.
#

class SimpleFFMpegServer(SimpleCommandServer.BaseCommand):
    def __init__(self):
        super().__init__()
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._livestreams = []
        self._stream_file_index = 0

        self._ws_bind = GlobalFactory.get_settings()["protocol"]["rtsp"]["reflector"]["ws"]["bind"]
        self._ws_port = GlobalFactory.get_settings()["protocol"]["rtsp"]["reflector"]["ws"]["port"]
        self._http_bind = GlobalFactory.get_settings()["protocol"]["rtsp"]["reflector"]["http"]["bind"]
        self._http_port = GlobalFactory.get_settings()["protocol"]["rtsp"]["reflector"]["http"]["port"]

        self._web_root_dir = GlobalFactory.get_dirs()["web_root"]

        self._transcoders = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoders"]

    def prepare(self, livestream):
        self._livestreams.append(livestream)
        # mkdirs etc

    def get_endpoint(self, url, stream_format):
        command = self._transcoders[stream_format]

        if "{pipe}" in command:
            endpoint = {
                "stream_format": stream_format,
                "scheme": "ws",
                "port": self._port,
                "path": "/{url}".format(url=url.geturl())}

        elif "{file}" in command:
            self._stream_file_index += 1
            file = "/streams/{index}/index.{stream_format}".format(
                index=str(self._stream_file_index),
                stream_format=stream_format)

            endpoint = {
                "stream_format": stream_format,
                "scheme": "http",
                "port": GlobalFactory.get_settings()["http"]["port"],
                "path": file}

        return endpoint

    def run(self):
        super().run()
        asyncio.run(self._run_forever())

    async def _run_forever(self):
        http_server = SimpleFFMpegServer.HTTPServer(self._http_bind, int(self._http_port), self._web_root_dir)
        await http_server.start()
        self._logger.info("Simple FFMPEG Server is ready, HTTP: {http_bind}:{http_port}".format(
            http_bind=self._http_bind,
            http_port=self._http_port))

        ws_server = SimpleFFMpegServer.WSServer(self._ws_bind, int(self._ws_port))
        await ws_server.start()
        self._logger.info("Simple FFMPEG Server is ready, WS: {ws_bind}:{ws_port}".format(
            ws_bind=self._ws_bind,
            ws_port=self._ws_port))

        await asyncio.Future()

    class HTTPServer:
        def __init__(self, bind, port, root_dir):
            self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
            self._bind = bind
            self._port = port
            self._root_dir = root_dir

        async def start(self):
            web_app = web.Application()
            web_app.add_routes([web.static("/", self._root_dir)])
            web_server_runner = web.AppRunner(web_app)
            web_server_site = web.TCPSite(web_server_runner, self._bind, int(self._port))

            await web_server_runner.setup()
            await web_server_site.start()

