import os
import signal
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

from backend.factory import GlobalFactory
from backend.error import ApplicationException


class SimpleCommandServer:
    class BaseCommand:
        def initialize(self):
            if hasattr(self, "_logger"):
                self._logger.debug("Initializing")

        def run(self) -> any:
            if hasattr(self, "_logger"):
                self._logger.debug("Running")

        def finalize(self):
            if hasattr(self, "_logger"):
                self._logger.debug("Finalized")

    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)

    def run_synchronously(self, command):
        self._logger.debug("Running command {command} synchronously".format(command=command.__class__.__name__))
        self._run(command)

    def _run(self, command):
        try:
            try:
                self._logger.debug("Initializing command: '{command}'".format(command=command))
                command.initialize()
            except Exception as e:
                self._logger.error("Exception while initializing command: '{command}'".format(command=command))
                raise e

            try:
                self._logger.debug("Running command: '{command}'".format(command=command))
                command.run()
            except Exception as e:
                self._logger.error("Exception while running command: '{command}'".format(command=command))
                raise e
        finally:
            self._logger.debug("Finalizing command: '{command}'".format(command=command))
            try:
                command.finalize()
            except Exception as e:
                self._logger.error("Exception while finalizing command: '{command}'".format(command=command))


class SimpleExecuter:
    class Thingy:
        def initialize(self):
            pass

        def run(self):
            pass

        def dispose(self):
            pass

    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._logger.debug("Initializing")

        self._tpe = ThreadPoolExecutor(max_workers=10, thread_name_prefix='TPE')
        self._tpe_futures = []
        self._processes = {}

        signal.signal(signal.SIGINT, self._cleanup)
        signal.signal(signal.SIGTERM, self._cleanup)

    def _cleanup(self, signum, frame):
        self._logger.info("Cleaning up")
        self.shutdown()
        for pid in self._processes.keys():
            os.killpg(os.getpgid(pid), signal.SIGTERM)

        os._exit(1)

    def shutdown(self):
        self._tpe.shutdown(wait=False)
        [future.cancel() for future in self._tpe_futures]

    def submit(self, thingy, mode="sync"):
        self._logger.debug("Thingy '{thingy}' submitted, mode: {mode}".format(thingy=thingy.__class__.__name__, mode=mode))
        if mode == "sync":
            return self._execute(thingy)

        elif mode == "async_thread":
            future = self._tpe.submit(self._execute, thingy)
            self._tpe_futures.append(future)
            return future

    def spwan(self, *args, **kwargs):
        self._logger.debug("Subprocessing {name}".format(name=kwargs["args"][0]))
        process = subprocess.Popen(*args, **kwargs)
        self._processes[process.pid] = process
        return process

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
