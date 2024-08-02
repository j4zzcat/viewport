from backend.cmdsrv import SimpleCommandServer


class AbstractProtocolController(SimpleCommandServer.BaseCommand):
    class LivestreamController:
        def get_url(self) -> str:
            pass

        def start(self):
            pass

        def stop(self):
            pass

    def create_livestream_controller(self, url) -> [LivestreamController]:
        pass

