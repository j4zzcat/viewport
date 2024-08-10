from backend.cmdsrv import SimpleCommandServer


class AbstractLivestreamController:

    # Returns a tuple of {stream_format, scheme, port, path} that allows a video player
    # to get and decode the video stream, i.e., by adjusting to the stream_format and then
    # getting the stream from scheme://{js:window.location.hostname}:port/path.
    def get_endpoint(self) -> str:
        pass

    def start(self):
        pass

    def stop(self):
        pass


class AbstractProtocolController(SimpleCommandServer.BaseCommand):
    def create_livestream_controller(self, url) -> [AbstractLivestreamController]:
        pass

