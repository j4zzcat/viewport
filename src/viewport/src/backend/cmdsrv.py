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

import asyncio
import concurrent.futures

from backend.error import ApplicationException
from abc import ABC, abstractmethod

class Command(ABC):
    @abstractmethod
    def run(self):
        pass

    def done(self):
        pass

class AsyncCommand(ABC):
    @abstractmethod
    async def run(self, loop):
        pass

    async def done(self):
        pass


class SimpleCommandServer:
    def __init__(self):
        self._tpe = concurrent.futures.ThreadPoolExecutor(
            max_workers=10,
            thread_name_prefix='TPE')

    def submit(self, command, runner="thread") -> concurrent.futures.Future:
        if runner == "thread":
            return self._tpe.submit(self._run_command, command)
        else:
            raise ApplicationException("Invalid runner")

    def _run_command(self, command) -> any:
        if isinstance(command, AsyncCommand):
            # Create an asyncio event loop for the command
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                return loop.run_until_complete(command.run(loop))
            finally:
                command.done()
                loop.close()

        elif isinstance(command, Command):
            try:
                return command.run()
            finally:
                command.done()

    def shutdown(self):
        self._tpe.shutdown(wait=True)


# import os
# import signal
# from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
#
# from backend.error import ApplicationException
# from context import GlobalFactory
#
#
# class BaseCommand:
#     def run(self) -> any:
#         if hasattr(self, "_logger"):
#             self._logger.debug("Running")
#
#     def done(self):
#         if hasattr(self, "_logger"):
#             self._logger.debug("Done")
#
# class AsyncBaseCommand(BaseCommand):
#     async def run(self) -> any:
#         super().run()
#
#     async def done(self):
#         super().done()
#
# class SimpleCommandServer:
#
#     def __init__(self):
#         self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
#         self._tpe = ThreadPoolExecutor(max_workers=5, thread_name_prefix='TPE')
#         self._tpe_futures = []
#
#         signal.signal(signal.SIGINT, self._cleanup)
#
#
#
#     def _run(self, command):
#         try:
#             try:
#                 self._logger.debug("Running command: '{command}'".format(command=command))
#                 return command.run()
#             except Exception as e:
#                 self._logger.error("Exception while running command: '{command}', error: '{e}'".format(command=command, e=e))
#                 raise e
#         finally:
#             self._logger.debug("Command: '{command}' is done".format(command=command))
#             try:
#                 command.done()
#             except Exception as e:
#                 self._logger.warn("Exception while finalizing command: '{command}', error: '{e}'".format(command=command,e=e))
#
#     def _cleanup(self, signum, frame):
#         self._logger.info("Cleaning up")
#
#         for future in self._tpe_futures:
#             future.cancel()
#
#         self._tpe.shutdown(wait=False)
#
#         for pid in self._processes.keys():
#             os.kill(pid, signal.SIGKILL)
#
#         exit(127)
#
#     def submit(self, command, runner="thread", restart=False, log=False):
#         self._logger.debug("Running command {command} asynchronously in a new {runner}".format(
#             command=command.__class__.__name__,
#             runner=runner))
#
#         if runner == "thread":
#             future = self._tpe.submit(self._run, command)
#             self._tpe_futures.append(future)
#         elif runner == "process":
#
#
#
#         else:
#             raise ApplicationException("Invalid runner type")
#
#         return future
#
#
