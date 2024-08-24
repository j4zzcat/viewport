#
# This file is part of Viewport.
# By Sharon Dagan <https://github.com/j4zzcat>, Copyright (C) 2024.
#
# Viewport is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option)
# any later version.
#
# This software is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along with
# This software. If not, see <https://www.gnu.org/licenses/>.
#

import asyncio
import os
import subprocess
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import ParseResult, urlparse

import websockets
from websockets.server import serve

from backend.error import ApplicationException
from backend.protocol import AbstractProtocolController, SimpleLivestreamController, Endpoint
from backend.utils import RWLockDict
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
        return [self._transcoding_servers[server_type].new_livestream(url, transcoder_name, stream_format)]


class SimpleFileTranscodingServer:
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

        self._livestreams = RWLockDict()
        self._tpe = ThreadPoolExecutor(max_workers=1, thread_name_prefix="FTS")

    def new_livestream(self, url, transcoder_name, stream_format):
        endpoint = Endpoint(
            stream_format=stream_format,
            scheme="ws",
            port=self._port,
            path="stream/{index}".format(index=GlobalFactory.next_int("stream")))

        livestream = SimpleLivestreamController(url, transcoder_name, endpoint)
        self._livestreams[endpoint.path] = livestream
        return livestream

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
        if path not in self._livestreams:
            self._logger.warning("Client '{client}' requested an unknown livestream path '{path}'".format(
                client=client,
                path=websocket.path
            ))

            await websocket.close()

        livestream = self._livestreams[path]
        self._logger.debug("Client '{client}' asks for '{path}'".format(
            client=client,
            path=path))

        program = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"][livestream.transcoder]["program"]
        match program:
            case "ffmpeg":
                await self._start_ffmpeg_transcoder(livestream, websocket)

            case _:
                self._logger.error("Transcoder '{transcoder}' defines an unknown program '{program}'. Check settings.toml.".format(
                    transcoder=livestream.transcoder,
                    program=program))

    async def _start_ffmpeg_transcoder(self, livestream, websocket):
        livestream.__dict__["output_dir"] = "{root_dir}/{path}".format(
            root_dir=self._root_dir,
            path=livestream.endpoint.path)

        self._logger.debug("Making directory '{dir}'".format(dir=livestream.output_dir))
        os.makedirs(livestream.output_dir, exist_ok=True)

        program_options = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"][livestream.transcoder]["options"].format(
            input_url=livestream.url,
            output_dir=livestream.output_dir)

        match livestream.endpoint.stream_format:
            case "hls":
                response = "http://{{server}}:{port}/{path}/index.m3u8".format(
                    port=GlobalFactory.get_web_server().port,
                    path=livestream.endpoint.path)

                async def wait_for_file():
                    file = "{output_dir}/index3.ts".format(output_dir=livestream.output_dir)
                    self._logger.debug("Waiting for file '{file}' to become available".format(file=file))

                    while True:
                        if os.path.exists(file):
                            break
                        await asyncio.sleep(1)

                    self._logger.debug("File '{file}' is available".format(file=file))

                is_ready = wait_for_file

            case _:
                self._logger.error("Can't handle '{format}'".format(format=livestream.endpoint.stream_format))
                await websocket.close()
                return

        process_controller = GlobalFactory.get_process_server().new_process(
            "ffmpeg",
            *(program_options.split()),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            stderr_text=True,
            monitor=True)

        # Check if a transcoder program is already running for this endpoint, and if so
        # stop it, i.e., the client reconnected.
        if "process_controller" in livestream.__dict__:
            self._logger.info("Stopping livestream for client '{client_address}:{client_port}'".format(
                client_address=websocket.remote_address[0],
                client_port=websocket.remote_address[1]))

            livestream.process_controller.stop()

        livestream.__dict__["process_controller"] = process_controller

        process_controller.on("stderr", self.FFMpegLogger(process_controller).log)
        process_controller.start()

        self._logger.info("Starting '{stream_format}' livestream for client '{client_address}:{client_port}'".format(
            stream_format=livestream.endpoint.stream_format,
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1]))

        await is_ready()
        try:
            await websocket.send(response)
            await websocket.close()
        except websockets.exceptions.ConnectionClosedOK:
            self._logger.warning("Client '{client_address}:{client_port}' disconnected".format(
                client_address=websocket.remote_address[0],
                client_port=websocket.remote_address[1]))


class SimpleStreamingTranscodingServer:
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
        self._bind = GlobalFactory.get_settings()["protocol"]["rtsp"]["server"]["streaming"]["bind"]
        self._port = GlobalFactory.get_settings()["protocol"]["rtsp"]["server"]["streaming"]["port"]

        self._livestreams = RWLockDict()
        self._tpe = ThreadPoolExecutor(max_workers=1, thread_name_prefix="STS")

    def new_livestream(self, url, transcoder_name, stream_format):
        endpoint = Endpoint(
            stream_format=stream_format,
            scheme="ws",
            port=self._port,
            path="stream/{index}".format(index=GlobalFactory.next_int("stream")))

        livestream = SimpleLivestreamController(url, transcoder_name, endpoint)
        self._livestreams[endpoint.path] = livestream
        return livestream

    def run(self):
        self._tpe.submit(self._run)

    def _run(self):
        self._logger.info("Simple Streaming Transcoding Server is ready, WS: {bind}:{port}".format(
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
        if path not in self._livestreams:
            self._logger.warning("Client '{client}' requested an unknown livestream path '{path}'".format(
                client=client,
                path=websocket.path))

            await websocket.close()

        livestream = self._livestreams[path]
        self._logger.debug("Client '{client}' asks for '{path}'".format(
            client=client,
            path=path))

        program = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"][livestream.transcoder]["program"]
        match program:
            case "ffmpeg":
                await self._start_ffmpeg_transcoder(livestream, websocket)

            case _:
                self._logger.error("Transcoder '{transcoder}' defines an unknown program '{program}'. Check settings.toml.".format(
                    transcoder=livestream.transcoder,
                    program=program))

    async def _start_ffmpeg_transcoder(self, livestream, websocket):
        program_options = GlobalFactory.get_settings()["protocol"]["rtsp"]["transcoder"][livestream.transcoder]["options"].format(
            input_url=livestream.url)

        process_controller = GlobalFactory.get_process_server().new_process(
            "ffmpeg",
            *(program_options.split()),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            stderr_text=True,
            monitor=True)

        # Check if a transcoder program is already running for this endpoint, and if so
        # stop it, i.e., the client reconnected.
        if "process_controller" in livestream.__dict__:
            self._logger.info("Stopping livestream for client '{client_address}:{client_port}'".format(
                client_address=websocket.remote_address[0],
                client_port=websocket.remote_address[1]))

            livestream.process_controller.stop()

        livestream.__dict__["process_controller"] = process_controller

        async def _mirror_queue_to_websocket(queue, socket):
            logger = self._logger.getChild("_mirror_queue_to_websocket")
            logger.debug("Starting")
            try:
                while True:
                    result = await queue.get()
                    if not result:
                        break

                    await socket.send(result)
            except Exception as e:
                logger.warning(str(e))

            logger.warning("Stream reached EOF")

        async def _mirror_stream_to_queue(stream, queue):
            logger = self._logger.getChild("_mirror_stream_to_queue")
            logger.debug("Starting")
            try:
                while True:
                    result = await stream.read(512)
                    if not result:
                        break

                    await queue.put(result)
            except Exception as e:
                logger.warning(str(e))

            logger.warning("Stream reached EOF")

        self._logger.info("Starting '{stream_format}' livestream for client '{client_address}:{client_port}'".format(
            stream_format=livestream.endpoint.stream_format,
            client_address=websocket.remote_address[0],
            client_port=websocket.remote_address[1]))

        process_controller.on("stderr", self.FFMpegLogger(process_controller).log)
        process_controller.start()

        queue = asyncio.Queue()
        process_controller._task_runner.new_task(_mirror_stream_to_queue(process_controller._process.stdout, queue))
        await asyncio.create_task(_mirror_queue_to_websocket(queue, websocket))

