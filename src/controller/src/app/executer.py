import os
import signal
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

from src.app.context import Context
from src.app.error import ApplicationException


class SimpleExecuter:
    def __init__(self):
        self._logger = Context.get_logger().get_child(self.__class__.__name__)
        self._tpe = ThreadPoolExecutor(max_workers=10)
        self._ppe = ProcessPoolExecutor(max_workers=10)

        self.initialize()

    def initialize(self):
        self._logger.debug("Initializing")

        self._logger.debug("Registering signal handlers")
        for sig in (signal.SIGINT, signal.SIGTERM, signal.SIGQUIT):
            signal.signal(sig, self.cleanup)

    def cleanup(self, signum, frame):
        self._logger.fatal("Caught signal", signum)

        # Kill all processes in the process group
        os.killpg(os.getpgid(os.getpid()), signal.SIGTERM)
        exit(1)

    def submit(self, thingy, mode="sync"):
        self._logger.debug("Thingy '{thingy}' submitted, mode: {mode}".format(thingy=thingy.__class__.__name__, mode=mode))
        if mode == "sync":
            self._execute(thingy)

        elif mode == "async_thread":
            with self._tpe as executor:
                executor.submit(self._execute(thingy))

        elif mode == "async_process":
            with self._ppe as executor:
                executor.submit(self._execute(thingy))

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
