import signal
from http.server import HTTPServer, SimpleHTTPRequestHandler
import functools
import socketserver

from context import GlobalFactory


class SimpleWebServer:
    class DefaultHandler(SimpleHTTPRequestHandler):
        def log_message(self, fmt, *args):
            if not hasattr(self, "_logger"):
                self._logger = GlobalFactory.get_logger().get_child("SimpleWebServer")

            self._logger.debug(fmt % args)

    def __init__(self, directory, bind, port):
        self._logger = GlobalFactory.get_logger().get_child("SimpleWebServer")
        self._directory = directory
        self._bind = bind if bind is not None else GlobalFactory.get_settings()["httpd"]["bind"]
        self._port = port if port is not None else GlobalFactory.get_settings()["httpd"]["port"]
        self._server = None

    def __enter__(self):
        signal.signal(signal.SIGINT, self._cleanup)
        handler = functools.partial(SimpleWebServer.DefaultHandler, directory=self._directory)
        self._server = socketserver.TCPServer((self._bind, int(self._port)), handler)
        self._logger.info("Simple Web Server is ready, HTTP: {bind}:{port}".format(bind=self._bind, port=self._port))
        return self._server

    def __exit__(self, *args):
        pass

    def _cleanup(self, signum, frame):
        self._server.shutdown()

