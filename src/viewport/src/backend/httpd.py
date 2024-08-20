import os
import signal
from http.server import HTTPServer, SimpleHTTPRequestHandler
import functools
import socketserver

from backend.cmdsrv import Command
from context import GlobalFactory


class SimpleWebServer(Command):
    class DefaultHandler(SimpleHTTPRequestHandler):
        def log_message(self, fmt, *args):
            if not hasattr(self, "_logger"):
                self._logger = GlobalFactory.get_logger().getChild("SimpleWebServer")

            self._logger.debug(fmt % args)

    def __init__(self, directory, bind=None, port=None):
        self._logger = GlobalFactory.get_logger().getChild("SimpleWebServer")
        self._root_dir = directory
        self._bind = bind if bind is not None else GlobalFactory.get_settings()["httpd"]["bind"]
        self._port = port if port is not None else GlobalFactory.get_settings()["httpd"]["port"]
        self._server = None

    def run(self):
        handler = functools.partial(SimpleWebServer.DefaultHandler, directory=self._root_dir)
        self._server = socketserver.TCPServer((self._bind, int(self._port)), handler)

        self._logger.info("Simple Web Server is ready, HTTP: {bind}:{port}".format(bind=self._bind, port=self._port))

        self._server.serve_forever()
