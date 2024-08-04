from backend.cmdsrv import SimpleCommandServer


class AbstractLivestreamController:
    def get_url(self) -> str:
        pass

    def start(self):
        pass

    def stop(self):
        pass


class AbstractProtocolController(SimpleCommandServer.BaseCommand):
    def create_livestream_controller(self, url) -> [AbstractLivestreamController]:
        pass

    def start_livestreams(self):
        pass


