import os
import re
import subprocess
import urllib

from backend.cmdsrv import SimpleCommandServer
from backend.protocol import AbstractProtocolController, AbstractLivestreamController
from context import GlobalFactory


class SimpleRTSPProtocolController(AbstractProtocolController):
    class LivestreamController(AbstractLivestreamController):
        def __init__(self, unique_id, media_server_controller, url):
            self._unique_id = unique_id
            self._media_server_controller = media_server_controller
            self._url = url

        def get_url(self):
            return {
                "scheme": "http",
                "port": self._media_server_controller.flv_port,
                "path": "/live/{unique_id}.flv".format(unique_id=self._unique_id)}

    def __init__(self):
        super().__init__()
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._media_server_controller = None
        self._counter = 0
        self._livestreams = []

    def initialize(self):
        super().initialize()

    def run(self):
        super().run()
        self._media_server_controller = GlobalFactory.new_media_server_controller()
        GlobalFactory.get_command_server().run_asynchronously(
            self._media_server_controller)
        return self

    def create_livestream_controller(self, url):
        livestream = SimpleRTSPProtocolController.LivestreamController(
            self._increment_counter(),
            self._media_server_controller,
            url)

        self._livestreams.append(livestream)
        return [livestream]

    def start_livestreams(self):
        descriptors = []
        for livestream in self._livestreams:
            descriptors.append(
                SimpleCommandServer.Descriptor(
                    id=livestream._unique_id,
                    args="ffmpeg -re -i {rtsp_url} -vcodec copy -f flv -y rtmp://localhost/live/{unique_id}".format(
                        rtsp_url=urllib.parse.urlunparse(livestream._url),
                        unique_id=livestream._unique_id).split(" ")))

        pg = GlobalFactory.new_process_group("ffmpeg", descriptors, restart=False, stdout=True)
        GlobalFactory.get_command_server().run_asynchronously(pg)

    def _increment_counter(self):
        self._counter += 1
        return self._counter


class SimpleMediaServerController(SimpleCommandServer.BaseCommand):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._media_server_process = None
        self._media_server_logger = None
        self.flv_host = GlobalFactory.get_settings()["protocol"]["rtsp"]["media_server"]["flv_host"]
        self.flv_port = GlobalFactory.get_settings()["protocol"]["rtsp"]["media_server"]["flv_port"]

    def run(self):
        self._logger.debug("Spawning the SRS Media Server process")

        process = GlobalFactory.get_command_server().spwan(
            args=["srs", "-c", "conf/http.flv.live.conf"],
            cwd="{srs_root}".format(srs_root=GlobalFactory.get_directories()["srs_root"]),
            stdout=subprocess.PIPE,
            preexec_fn=os.setsid,
            text=True)

        self._media_server_process = process
        self._logger.debug("Media Server started, pid: " + str(self._media_server_process.pid))

        self._media_server_logger = GlobalFactory.get_logger().get_child("MediaServer:{pid}".format(
            pid=self._media_server_process.pid))

        log_pattern = re.compile(
            r'\[(?P<timestamp>.*?)\]\['
            r'(?P<level>.*?)\]\['
            r'(?P<dummy>.*?)\]\['
            r'(?P<thread>.*?)\]'
            r'(?:\[(?P<errno>.*?)\])? '  # Non-capturing group for optional dummy2
            r'(?P<message>.*)'
        )

        ansi_escape = re.compile(r'\x1B[@-_][0-?]*[ -/]*[@-~]')

        for line in self._media_server_process.stdout:
            line = ansi_escape.sub("", line)
            match = log_pattern.match(line)
            if match:
                parsed_line = match.groupdict()
                msg = parsed_line["message"]
                level = parsed_line["level"].lower()
                if level != "info":
                    eval("self._media_server_logger.{level}(msg)".format(level=level))
            else:
                self._logger.warn("Failed to parse Media Server output, offending line: '{line}'".format(line=line))



