import os
import signal
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

from src.app.context import Context
from src.app.error import ApplicationException


class SimpleExecuter:
    Sync = 1
    AsyncThread = 2
    AsyncProcess = 3

    _tpe = ThreadPoolExecutor(max_workers=10)
    _ppe = ProcessPoolExecutor(max_workers=10)

    def __init__(self):
        self._logger = Context.get_logger().get_child(self.__class__.__name__)
        self.initialize()

    def initialize(self):
        self._logger.info("Initializing")

        self._logger.debug("Registering signal handlers")
        for sig in (signal.SIGINT, signal.SIGTERM, signal.SIGQUIT):
            signal.signal(sig, self.cleanup)


    def cleanup(self, signum, frame):
        self._logger.fatal("Caught signal", signum)

        # Kill all processes in the process group
        os.killpg(os.getpgid(os.getpid()), signal.SIGTERM)
        exit(1)

    def submit(self, thingy, mode):
        if mode == self.Sync:
            self._execute(thingy)

        elif mode == self.AsyncThread:
            with self._tpe as executor:
                executor.submit(self._execute(thingy))

        elif mode == self.AsyncProcess:
            with self._ppe as executor:
                executor.submit(self._execute(thingy))

    def _execute(self, thingy):
        try:
            thingy.initialize()
            return thingy.run()
        except Exception as e:
            raise ApplicationException("Thingy raised exception: {e}".format(e=e))
        finally:
            thingy.dispose()
