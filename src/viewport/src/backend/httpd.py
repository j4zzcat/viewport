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

    def __init__(self, host, port, directory):
        self._logger = GlobalFactory.get_logger().get_child("SimpleWebServer")
        self._host = host
        self._port = port
        self._directory = directory
        self._server = None

    def __enter__(self):
        signal.signal(signal.SIGINT, self._cleanup)
        handler = functools.partial(SimpleWebServer.DefaultHandler, directory=self._directory)
        self._server = socketserver.TCPServer((self._host, self._port), handler)
        self._logger.info("Listening on {host}:{port}".format(host=self._host, port=self._port))
        return self._server

    def __exit__(self, *args):
        pass

    def _cleanup(self, signum, frame):
        self._server.shutdown()

