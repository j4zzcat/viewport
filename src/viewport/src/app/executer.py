import os
import signal
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

from app.context import Context
from app.error import ApplicationException


class SimpleExecuter:
    class Thingy:
        def initialize(self):
            pass

        def run(self):
            pass

        def dispose(self):
            pass

    def __init__(self):
        self._logger = Context.get_logger().get_child(self.__class__.__name__)
        self._logger.debug("Initializing")

        self._tpe = ThreadPoolExecutor(max_workers=10, thread_name_prefix='TPE')
        self._tpe_futures = []

        self._ppe = ProcessPoolExecutor(max_workers=10)
        self._ppe_futures = []

        # signal.signal(signal.SIGINT, self._cleanup)

    def _cleanup(self, signum, frame):
        self._logger.debug("Cleaning up")

    def submit(self, thingy, mode="sync"):
        self._logger.debug("Thingy '{thingy}' submitted, mode: {mode}".format(thingy=thingy.__class__.__name__, mode=mode))
        if mode == "sync":
            return self._execute(thingy)

        elif mode == "async_thread":
            future = self._tpe.submit(self._execute, thingy)
            self._tpe_futures.append(future)
            return future

        elif mode == "async_process":
            future = self._ppe.submit(self._execute, thingy)
            self._ppe_futures.append(future)
            return future

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
