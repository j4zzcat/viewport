from backend.protocol import AbstractProtocolController, AbstractLivestreamController
from context import GlobalFactory


class SimpleRTSPProtocolController(AbstractProtocolController):
    class LivestreamController(AbstractLivestreamController):
        def __init__(self, reflector_controller, url):
            self._reflector_controller = reflector_controller
            self._url = url

        def get_url(self):
            return "ws://{host}:{port}/unifi://{url}".format(
                host=self._reflector_controller.host,
                port=self._reflector_controller.port,
                url=self._url
            )

    def __init__(self):
        super().__init__()
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self.media_server = None

    def initialize(self):
        super().initialize()

    def run(self):
        super().run()
        self._media_server = GlobalFactory.new_media_server_controller()
        GlobalFactory.get_command_server().run_asynchronously(
            self._reflector_controller)
        return self

    def create_livestream_controller(self, url):
        url = urllib.parse(url) if isinstance(url, str) else url
        host = url.netloc.split('@')[1]
