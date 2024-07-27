from time import sleep

from app.context import Context
from app.executer import SimpleExecuter


class SimpleUnifiApi:
    class Thingy(SimpleExecuter.Thingy):
        def __init__(self, unifi_api):
            self._unifi_api = unifi_api

        def run(self):
            self._unifi_api.login()
            return self._unifi_api

    def __init__(self, netloc):
        self._logger = Context.get_logger().get_child("{clazz}:{host}".format(
            clazz=self.__class__.__name__,
            host=netloc.split('@')[1]))
        self.netloc = netloc
        self.bootstrap = None

    def login(self):
        self._logger.debug("Logging in")
        self._logger.debug("Getting bootstrap")

    def logout(self):
        pass

