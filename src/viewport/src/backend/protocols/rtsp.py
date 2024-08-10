import asyncio
from urllib import request

from websockets.server import serve

from backend.cmdsrv import SimpleCommandServer
from backend.error import ApplicationException
from backend.protocol import AbstractProtocolController, AbstractLivestreamController
from context import GlobalFactory


class SimpleRTSPProtocolController(AbstractProtocolController):
    class LivestreamController(AbstractLivestreamController):
        def __init__(self, url, stream_format, reflector):
            self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
            self._url = url
            self._stream_format = stream_format
            self._reflector = reflector

        def get_endpoint(self):
            endpoint = {
                "stream_format": self._stream_format,
                "scheme": self._reflector.scheme,
                "port": self._reflector.port,
                "path": "/{url}".format(url=self._url.geturl())}

            return endpoint

        def start(self):
            self._reflector.prepare(self)

    def __init__(self):
        super().__init__()
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._ffmpeg_server = None
        self._livestreams = []

        self._default_transcoder = GlobalFactory.get_settings()["protocol"]["rtsp"]["reflector"]["default_transcoder"]
        self._transcoders = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoders"]

    def initialize(self):
        super().initialize()

    def run(self):
        super().run()
        self._ffmpeg_server = GlobalFactory.new_ffmpeg_server()
        GlobalFactory.get_command_server().run_asynchronously(
            self._ffmpeg_server)

        return self

    def create_livestream_controller(self, url):
        self._logger.debug("Creating a Livestream Controller for '{url}'".format(url=url))

        # See if the client asked for a specific stream format
        parts = url.rsplit('::', 1)
        if len(parts) > 1:
            requested_stream_format = parts[-1]
            self._logger.debug("A specific stream format was requested: '{requested_stream_format}'".format(
                requested_stream_format=requested_stream_format))

            if requested_stream_format in self._transcoders.keys():
                stream_format = requested_stream_format
            else:
                raise ApplicationException(
                    "Requested transcoder '{requested_stream_format}' is not known".format(
                        requested_stream_format=requested_stream_format))
        else:
            stream_format = self._default_transcoder

        livestream = SimpleRTSPProtocolController.LivestreamController(
            url,
            stream_format,
            self._ffmpeg_server)

        self._livestreams.append(livestream)
        return [livestream]


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

        self.bind = GlobalFactory.get_settings()["protocol"]["rtsp"]["reflector"]["bind"]
        self.port = GlobalFactory.get_settings()["protocol"]["rtsp"]["reflector"]["port"]

    def prepare(self, livestream):
        self._livestreams.append(livestream)

    def run(self):
        super().run()
        asyncio.run(self._run_forever())

    async def _run_forever(self):
        self._logger.info("Simple FFMPEG Server is ready, WS: {bind}:{port}".format(bind=self.bind, port=self.port))
        async with serve(self._on_connection, self.bind, int(self.port)):
            await asyncio.Future()  # run forever

    async def _on_connection(self, websocket):
        rtsp_url = websocket.path[1:]  # Chop leading '/'
        self._logger.debug("Client {client_address}:{client_port} asks for '{rtsp_url}'".format(
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1],
            rtsp_url=rtsp_url))

        # Is this rtsp_url a part of a previously prepared livestream?
        for livestream in self._livestreams:
            endpoint = livestream.get_endpoint()

            if endpoint["path"] == rtsp_url:
                self._logger.debug("Starting ffmpeg to transcode '{rtsp_url}' to '{stream_format}'".format(
                    rtsp_url=rtsp_url, stream_format=endpoint["stream_format"]))

                command = self._known_transcoders[endpoint["stream_format"]]

                if "{pipe}" in command:
                    process = await asyncio.create_subprocess_exec(
                        *command.format(url=rtsp_url, pipe="-").split(" "),
                        stdout=asyncio.subprocess.PIPE,
                        stderr=asyncio.subprocess.PIPE)

                elif "{file}" in command:
                    process = await asyncio.create_subprocess_exec(
                        *command.format(url=rtsp_url, file="-").split(" "),
                        stdout=asyncio.subprocess.PIPE,
                        stderr=asyncio.subprocess.PIPE)

                io_worker_task = asyncio.create_task(
                    self._io_worker(
                        process=process,
                        websocket=websocket))

                stderr_logger_task = asyncio.create_task(self._stderr_logger(process=process))

                done, pending = await asyncio.wait([io_worker_task, stderr_logger_task], return_when=asyncio.FIRST_COMPLETED)
                for task in pending:
                    task.cancel()
                process.terminate()

        # No it's not
        raise ApplicationException("The url '{rtsp_url}' was not previously prepared via a Livestream Controller".format(
            rtsp_url=rtsp_url))

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

