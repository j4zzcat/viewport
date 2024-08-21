import os
import signal
import subprocess
from http.server import HTTPServer, SimpleHTTPRequestHandler
import functools
import socketserver

from backend.cmdsrv import Command
from context import GlobalFactory


class SimpleWebServer(Command):
    def __init__(self, root_dir):
        self._root_dir = root_dir

    def run(self):
        process_controller = GlobalFactory.get_process_server().new_process(
            "npx",
              "http-server",
                  "-a", GlobalFactory.get_settings()["httpd"]["bind"],
                  "-p", GlobalFactory.get_settings()["httpd"]["port"],
                  self._root_dir,
            cwd="{reflector_root}/src".format(reflector_root=GlobalFactory.get_dirs()["reflector_root"]),
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            stdout_text=True,
            monitor=True)

        process_controller.on("stdout", print)
        process_controller.start()
