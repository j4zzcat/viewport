import os
import re
import subprocess

from backend.cmdsrv import SimpleCommandServer
from backend.protocol import AbstractProtocolController, AbstractLivestreamController
from context import GlobalFactory


class SimpleRTSPProtocolController(AbstractProtocolController):
    class LivestreamController(AbstractLivestreamController):
        def __init__(self, media_server_controller, url):
            self._media_server_controller = media_server_controller
            self._url = url

        def get_url(self):
            return self._url

    def __init__(self):
        super().__init__()
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self.media_server = None

    def initialize(self):
        super().initialize()

    def run(self):
        super().run()
        self._media_server_controller = GlobalFactory.new_media_server_controller()
        GlobalFactory.get_command_server().run_asynchronously(
            self._media_server_controller)
        return self

    def create_livestream_controller(self, url):
        return [SimpleRTSPProtocolController.LivestreamController(self._media_server_controller, url)]

    def start_livestreams(self):
        pass


class SimpleMediaServerController(SimpleCommandServer.BaseCommand):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._media_server_process = None
        self._media_server_logger = None

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



