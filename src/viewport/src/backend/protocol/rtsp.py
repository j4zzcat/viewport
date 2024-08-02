from backend.protocol import AbstractProtocolController
from context import GlobalFactory


class SimpleRTSPProtocolController(AbstractProtocolController):
    class SimpleLivestreamController(AbstractProtocolController.LivestreamController):
        pass

    def __init__(self):
        super().__init__()
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)

    def initialize(self):
        super().initialize()

    def run(self):
        super().run()

    def create_livestream_controller(self, url):
        return SimpleRTSPProtocolController.SimpleLivestreamController()