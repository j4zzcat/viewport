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
import atexit
import concurrent.futures

from abc import ABC, abstractmethod

from context import GlobalFactory


class Command(ABC):
    @abstractmethod
    def run(self):
        pass

    def done(self):
        pass


class SimpleCommandServer:
    def __init__(self):
        self._logger = GlobalFactory.get_logger.getChild(__class__.__name__)

        atexit.register(self.shutdown)
        self._tpe = concurrent.futures.ThreadPoolExecutor(
            max_workers=10,
            thread_name_prefix='TPE')

    def submit(self, command):
        return self._tpe.submit(self._run_command, command)

    def _run_command(self, command) -> any:
        try:
            return command.run()
        finally:
            command.done()

    def shutdown(self):
        self._logger.debug("Shutting down")
        self._tpe.shutdown(wait=False)
