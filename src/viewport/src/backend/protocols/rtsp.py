import asyncio
import os
from urllib import request

from websockets.server import serve

from backend.cmdsrv import SimpleCommandServer
from backend.error import ApplicationException
from backend.protocol import AbstractProtocolController, AbstractLivestreamController
from context import GlobalFactory


class SimpleRTSPProtocolController(AbstractProtocolController):
    class LivestreamController(AbstractLivestreamController):
        def __init__(self, url, endpoint):
            self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
            self._url = url
            self._endpoint = endpoint

        def get_endpoint(self):
            return self._endpoint

        def start(self):
            self._ffmpeg_server.prepare(self)

    def __init__(self, props):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._ffmpeg_server = None

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

        endpoint = self._ffmpeg_server.get_endpoint(url, stream_format)
        livestream = SimpleRTSPProtocolController.LivestreamController(url, endpoint)

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
        self._stream_file_index = 0

        self._bind = GlobalFactory.get_settings()["protocol"]["rtsp"]["reflector"]["bind"]
        self._port = GlobalFactory.get_settings()["protocol"]["rtsp"]["reflector"]["port"]
        self._transcoders = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoders"]

    def prepare(self, livestream):
        self._livestreams.append(livestream)

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
        self._logger.info("Simple FFMPEG Server is ready, WS: {bind}:{port}".format(bind=self._bind, port=self._port))
        async with serve(self._on_connection, self._bind, int(self._port)):
            await asyncio.Future()  # run forever

    async def _on_connection(self, websocket):
        rtsp_url = websocket.path[1:]  # Chop leading '/'
        self._logger.debug("Client {client_address}:{client_port} asks for '{rtsp_url}'".format(
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1],
            rtsp_url=rtsp_url))

        prepared_paths = [livestream.get_endpoint()["path"] for livestream in self._livestreams]
        if rtsp_url not in prepared_paths:
            raise ApplicationException(
                "The url '{rtsp_url}' was not previously prepared via a Livestream Controller".format(
                    rtsp_url=rtsp_url))
        else:
            livestream = [livestream for livestream in self._livestreams if livestream.get_endpoint()["path"] == rtsp_url][0]
            stream_format = livestream.get_endpoint()["stream_format"]
            self._logger.debug("Starting ffmpeg to transcode '{rtsp_url}' to '{stream_format}'".format(
                rtsp_url=rtsp_url, stream_format=stream_format))

            command = self._transcoders[stream_format]

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
