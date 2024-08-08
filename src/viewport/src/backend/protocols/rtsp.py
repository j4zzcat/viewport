import asyncio
import os
import re
import subprocess
import sys
import urllib
from pprint import pprint

from websockets.server import serve

from backend.cmdsrv import SimpleCommandServer
from backend.protocol import AbstractProtocolController, AbstractLivestreamController
from context import GlobalFactory


class SimpleRTSPProtocolController(AbstractProtocolController):
    class LivestreamController(AbstractLivestreamController):
        def __init__(self, ffmpeg_server, url):
            self._ffmpeg_server = ffmpeg_server
            self._url = url

        def get_type(self) -> str:
            return self._ffmpeg_server.format

        def get_url(self):
            return {
                "scheme": "ws",
                "port": self._ffmpeg_server.port,
                "path": "/{url}".format(url=self._url.geturl())}

    def __init__(self):
        super().__init__()
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._ffmpeg_server = None
        self._livestreams = []

    def initialize(self):
        super().initialize()

    def run(self):
        super().run()
        self._ffmpeg_server = GlobalFactory.new_ffmpeg_server()
        GlobalFactory.get_command_server().run_asynchronously(
            self._ffmpeg_server)

        return self

    def create_livestream_controller(self, url):
        livestream = SimpleRTSPProtocolController.LivestreamController(
            self._ffmpeg_server,
            url)

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
        self.bind = GlobalFactory.get_settings()["protocol"]["rtsp"]["ffmpeg_server"]["bind"]
        self.port = GlobalFactory.get_settings()["protocol"]["rtsp"]["ffmpeg_server"]["port"]
        self.format = GlobalFactory.get_settings()["protocol"]["rtsp"]["ffmpeg_server"]["format"]

    def run(self):
        super().run()
        asyncio.run(self._runforever())

    async def _runforever(self):
        self._logger.info("Simple FFMPEG Server is ready, WS: {bind}:{port}".format(bind=self.bind, port=self.port))
        async with serve(self.onConnection, self.bind, int(self.port)):
            await asyncio.Future()  # run forever

    async def onConnection(self, websocket):
        rtsp_url = websocket.path[1:]
        self._logger.debug("Client {client_address}:{client_port} asks for '{rtsp_url}'".format(
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1],
            rtsp_url=rtsp_url))

        self._logger.debug("Starting ffmpeg to transcode '{url}' to '{format}'".format(url=rtsp_url, format=self.format))
        process = await asyncio.create_subprocess_exec(
            "ffmpeg",
                "-hide_banner", "-loglevel", "error", "-nostats",
                "-re",
                "-i", rtsp_url,
                "-err_detect", "ignore_err",
                "-flags", "+bitexact",
                "-tune", "zerolatency",
                "-vcodec", "copy",
                "-an",
                "-f", self.format,
                "-",
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

    async def _io_worker(self, process, websocket):
        self._logger.info("Starting '{format}' livestream for client '{client_address}:{client_port}'".format(
            format=self.format,
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1]
        ))

        try:
            while True:
                b = await process.stdout.read(1)
                await websocket.send(b)
        except Exception as e:
            self._logger.debug(e)
            self._logger.info("Stopping 'flv' livestream for client: '{client_address}:{client_port}".format(
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


