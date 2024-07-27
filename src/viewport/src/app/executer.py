import os
import signal
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

from src.app.context import Context
from src.app.error import ApplicationException


class SimpleExecuter:
    def __init__(self):
        self._logger = Context.get_logger().get_child(self.__class__.__name__)

        self._tpe = ThreadPoolExecutor(max_workers=10, thread_name_prefix='TPE')
        self._tpe_futures = []

        self._ppe = ProcessPoolExecutor(max_workers=10)
        self._ppe_futures = []

        self.initialize()

    def initialize(self):
        self._logger.debug("Initializing")

    def submit(self, thingy, mode="sync"):
        self._logger.debug("Thingy '{thingy}' submitted, mode: {mode}".format(thingy=thingy.__class__.__name__, mode=mode))
        if mode == "sync":
            self._execute(thingy)

        elif mode == "async_thread":
            self._tpe_futures.append(self._tpe.submit(self._execute, thingy))

        elif mode == "async_process":
            self._ppe_futures.append(self._ppe.submit(self._execute, thingy))

    def _execute(self, thingy):
        try:
            self._logger.debug("Calling {thingy}.initialize()".format(thingy=thingy.__class__.__name__))
            thingy.initialize()

            self._logger.debug("Calling {thingy}.run()".format(thingy=thingy.__class__.__name__))
            return thingy.run()
        except Exception as e:
            raise ApplicationException("Thingy raised exception: {e}".format(e=e))
        finally:
            self._logger.debug("Calling {thingy}.dispose()".format(thingy=thingy.__class__.__name__))
            thingy.dispose()
