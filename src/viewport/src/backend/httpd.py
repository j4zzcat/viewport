import subprocess
import sys

from context import GlobalFactory


class SimpleWebServer:
    def __init__(self):
        self._logger = GlobalFactory.get_logger().getChild(__class__.__name__)
        self.root_dir = GlobalFactory.get_dirs()["web_root_dir"]
        self.bind = GlobalFactory.get_settings()["httpd"]["bind"]
        self.port = GlobalFactory.get_settings()["httpd"]["port"]

    def run(self):
        process_controller = GlobalFactory.get_process_server().new_process(
            "static-web-server",
                "-p", self.port,
                "-d", self.root_dir,
                "-w", "{viewport_root}/resource/sws.toml".format(viewport_root=GlobalFactory.get_dirs()["viewport_root"]),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            monitor=True)

        process_controller.start()
        self._logger.info("Simple Web Server is ready, HTTP: {bind}:{port}".format(
            bind=self.bind, port=self.port))
