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
import os
import random
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

    class Descriptor:
        def __init__(self, id, args):
            self.id = id
            self.args = args

    class ProcessGroup(BaseCommand):
        def __init__(self, name, descriptors, restart, stdout):
            self._logger = GlobalFactory.get_logger().get_child("{clazz}:{name}".format(
                clazz=self.__class__.__name__, name=name))
            self._name = name
            self._descriptors = descriptors
            self._restart = restart
            self._stdout = stdout

        def run(self):
            self._logger.debug("Running asyncio.run()")
            asyncio.run(self._run(self._descriptors))

        async def _run(self, descriptors):
            await asyncio.gather(*(self._start_process(descriptor) for descriptor in descriptors))

        async def _start_process(self, descriptor):
            while True:
                process = await asyncio.create_subprocess_exec(
                    *descriptor.args,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.DEVNULL)

                if self._stdout:
                    stdout_task = asyncio.create_task(
                        self._log_stream(
                            id="{group_name}:{id}:{pid}".format(
                                group_name=self._name,
                                id=descriptor.id,
                                pid=process.pid),
                            stream=process.stdout))

                return_code = await process.wait()
                if self._stdout:
                    await stdout_task

                if return_code == 0:
                    self._logger.debug("Process {args} completed successfully.".format(args=descriptor.args))
                    break
                else:
                    self._logger.debug("Process {args} failed with return code {return_code}".format(
                        args=descriptor.args, return_code=return_code))
                    if self._restart:
                        await asyncio.sleep(random.randrange(5))  # Jitter
                    else:
                        break

        async def _log_stream(self, id, stream):
            logger = GlobalFactory.get_logger().get_child(id)
            while True:
                line = await stream.readline()
                if line:
                    logger.debug(line)
                else:
                    break

    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._tpe = ThreadPoolExecutor(max_workers=20, thread_name_prefix='TPE')
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
                self._logger.error("Exception while initializing command: '{command}', error: 'e'".format(command=command, e=e))
                raise e

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

