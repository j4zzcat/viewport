import os
import signal
import subprocess
from http.server import HTTPServer, SimpleHTTPRequestHandler
import functools
import socketserver

from backend.cmdsrv import Command
from context import GlobalFactory


class SimpleWebServer(Command):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().getChild(__class__.__name__)
        self.root_dir = GlobalFactory.get_dirs()["web_root_dir"]
        self.bind = GlobalFactory.get_settings()["httpd"]["bind"]
        self.port = GlobalFactory.get_settings()["httpd"]["port"]

    def run(self):
        process_controller = GlobalFactory.get_process_server().new_process(
            "npx",
              "http-server",
                  "-a", self.bind,
                  "-p", self.port,
                  self.root_dir,
            cwd="{reflector_root}/src".format(reflector_root=GlobalFactory.get_dirs()["reflector_root"]),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            monitor=True)

        process_controller.start()
        self._logger.info("Simple Web Server is ready, HTTP: {bind}:{port}".format(
            bind=self.bind, port=self.port))
