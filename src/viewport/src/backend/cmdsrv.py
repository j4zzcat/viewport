#
# This file is part of Viewport.
# By Sharon Dagan <https://github.com/j4zzcat>, Copyright (C) 2024.
#
# Viewport is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option)
# any later version.
#
# This software is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along with
# This software. If not, see <https://www.gnu.org/licenses/>.
#

import os
import signal
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

from context import GlobalFactory


class SimpleCommandServer:
    class BaseCommand:
        def run(self) -> any:
            if hasattr(self, "_logger"):
                self._logger.debug("Running")

        def finalize(self):
            if hasattr(self, "_logger"):
                self._logger.debug("Finalized")

    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._tpe = ThreadPoolExecutor(max_workers=5, thread_name_prefix='TPE')
        self._tpe_futures = []
        self._ppe = ProcessPoolExecutor(max_workers=5)
        self._ppe_futures = []
        signal.signal(signal.SIGINT, self._cleanup)

    def run_synchronously(self, command):
        self._logger.debug("Running command {command} synchronously".format(command=command.__class__.__name__))
        return self._run(command)

    def run_asynchronously(self, command, runner="thread"):
        self._logger.debug("Running command {command} asynchronously in a '{runner}'".format(
            command=command.__class__.__name__,
            runner=runner))

        if runner == "thread":
            future = self._tpe.submit(self._run, command)
            self._tpe_futures.append(future)
        elif runner == "process":
            future = self._ppe.submit(self._run, command)
            self._ppe_futures.append(future)

        return future

    def _run(self, command):
        try:
            try:
                self._logger.debug("Running command: '{command}'".format(command=command))
                return command.run()
            except Exception as e:
                self._logger.error("Exception while running command: '{command}', error: '{e}'".format(command=command, e=e))
                raise e
        finally:
            self._logger.debug("Finalizing command: '{command}'".format(command=command))
            try:
                command.finalize()
            except Exception as e:
                self._logger.warn("Exception while finalizing command: '{command}', error: '{e}'".format(command=command,e=e))

    def _cleanup(self, signum, frame):
        self._logger.info("Cleaning up")

        for future in self._tpe_futures:
            future.cancel()

        self._tpe.shutdown(wait=False)

        for pid in self._processes.keys():
            os.kill(pid, signal.SIGKILL)

        exit(127)

