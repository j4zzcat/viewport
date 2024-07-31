from http.server import HTTPServer, SimpleHTTPRequestHandler
import functools
import socketserver

from backend.factory import GlobalFactory


class SimpleWebServer:
    class DefaultHandler(SimpleHTTPRequestHandler):
        def log_message(self, fmt, *args):
            if not hasattr(self, "_logger"):
                self._logger = GlobalFactory.get_logger().get_child("SimpleWebServer")

            self._logger.debug(fmt % args)

    def __init__(self, host, port, directory):
        self._host = host
        self._port = port
        self._directory = directory

    def __enter__(self):
        handler = functools.partial(SimpleWebServer.DefaultHandler, directory=self._directory)
        return socketserver.TCPServer((self._host, self._port), handler)

    def __exit__(self, *args):
        pass

