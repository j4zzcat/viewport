import os
import signal
import subprocess
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

from context import GlobalFactory


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
        self._tpe = ThreadPoolExecutor(max_workers=10, thread_name_prefix='TPE')
        self._tpe_futures = []
        self._processes = {}
        signal.signal(signal.SIGINT, self._cleanup)

    def run_synchronously(self, command):
        self._logger.debug("Running command {command} synchronously".format(command=command.__class__.__name__))
        return self._run(command)

    def run_asynchronously(self, command):
        self._logger.debug("Running command {command} asynchronously".format(command=command.__class__.__name__))
        future = self._tpe.submit(self._run, command)
        self._tpe_futures.append(future)
        return future

    def spwan(self, *args, **kwargs):
        self._logger.debug("Subprocessing {name}".format(name=kwargs["args"][0]))
        process = subprocess.Popen(*args, **kwargs)
        self._processes[process.pid] = process
        return process

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
                return command.run()
            except Exception as e:
                self._logger.error("Exception while running command: '{command}'".format(command=command))
                raise e
        finally:
            self._logger.debug("Finalizing command: '{command}'".format(command=command))
            try:
                command.finalize()
            except Exception as e:
                self._logger.error("Exception while finalizing command: '{command}'".format(command=command))

    def _cleanup(self, signum, frame):
        for future in self._tpe_futures:
            future.cancel()

        self._tpe.shutdown(wait=False)

        for pid in self._processes.keys():
            os.kill(pid, signal.SIGKILL)
