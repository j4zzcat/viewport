import asyncio
import logging
import os
import queue
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

from backend.cmdsrv import Command
from backend.error import ApplicationException
from context import GlobalFactory
import backend.utils as utils


#
# Manages the lifecycle and execution of processes and their associated task runners. The class is
# responsible for initializing and managing task runners, creating new process controllers, and
# overseeing the execution of subprocesses. It utilizes a ThreadPoolExecutor to run task runner
# event loops in separate threads and assigns task runners to process controllers in a round-robin
# fashion.
#
class SimpleProcessServer:
    THREAD_START_TIMEOUT_MS = 2000
    PROCESS_START_TIMEOUT_MS = 3000
    MAX_TPE_SIZE = 2
    MAX_PPE_SIZE = 1

    #
    # Handles the lifecycle and control of individual processes. The Controller class is
    # responsible for starting, stopping, and handling the output of a subprocess. It allows for
    # the registration of coros callbacks to handle the subprocess's stdout and stderr streams,
    # liveness monitoring and more. The coros themselves run on the eventloop of a TaskRunner.
    #
    class Controller:
        # Extra keywords accepted on top of those of Popen
        KEYWORDS = [("stdout_text", False), ("stderr_text", False), ("monitor", False)]

        def __init__(self, task_runner, *args, **kwargs):
            self._logger = GlobalFactory.get_logger().getChild("SimpleProcessServer.{clazz}".format(clazz=__class__.__name__))
            self._task_runner = task_runner
            self._popen_args = args
            self._popen_kwargs, self._kwargs = utils.split_kwargs(kwargs, self.KEYWORDS)

            self._process = None
            self._callbacks = {}

        def on(self, event, callback, error=None):
            # Check pre-conditions
            if event in ["stdout", "stderr"]:
                if event not in self._popen_kwargs or self._popen_kwargs[event] != subprocess.PIPE:
                    raise ApplicationException(
                        "Can't register callback on '{event}', '{event}=subprocess.PIPE' should have been specified on {clazz} creation".format(
                            event=event,
                            clazz=self.__class__.__name__))

            self._callbacks[event] = (callback, error)

        def start(self):
            self._logger.debug("Starting process '{program}' with args '{args}'".format(
                program=self._popen_args[0],
                args=self._popen_args[1:]))
            try:
                future = self._task_runner.new_task(
                    asyncio.create_subprocess_exec(*self._popen_args, **self._popen_kwargs))
            except OSError as e:
                raise ApplicationException("Failed to start process, '{e}".format(e=e))

            self._logger.debug("Waiting for process to start")
            self._process = utils.future_busy_wait(
                future,
                SimpleProcessServer.PROCESS_START_TIMEOUT_MS)

            self._logger = GlobalFactory.get_logger().getChild(__class__.__name__)
            self._logger.debug("Process started, pid={pid}".format(pid=self._process.pid))

            for stream in ["stdout", "stderr"]:
                if stream in self._callbacks:
                    callback, error = self._callbacks[stream]
                    if self._kwargs["{stream}_text".format(stream=stream)]:
                        fn = self._mirror_text_stream
                    else:
                        fn = self._mirror_binary_stream

                    self._task_runner.new_task(fn(
                        name=stream,
                        stream=eval("self._process.{stream}".format(stream=stream)),
                        callback=callback,
                        eof=None,
                        error=error))

            # monitor
            # done

        def stop(self):
            self._logger.debug("Stopping process '{pid}'".format(pid=self._process.pid))
            self._process.terminate()

        #
        # Asynchronously mirrors a stream by repeatedly calling a read function and executing a
        # callback upon receiving data. Handles errors and end-of-file notifications gracefully.
        # The function operates in an infinite loop until the read_fn indicates there is no more
        # data. Any exceptions raised during execution are logged, and the error callback is
        # invoked if provided.
        #
        async def _mirror_stream(self, name, read_fn, read_fn_args, callback, eof, error):
            try:
                while True:
                    result = await read_fn(*read_fn_args)
                    if not result:
                        break

                    callback(result)
            except Exception as e:
                logger = self._logger.getChild("_mirror_stream")
                logger.error(e)
                if error is not None:
                    error(e)

            self._logger.warning("Stream '{name}' reached EOF".format(name=name))
            if eof is not None:
                eof(name)

        async def _mirror_binary_stream(self, name, stream, callback, eof, error):
            await self._mirror_stream(name, stream.read, [1], callback, eof, error)

        async def _mirror_text_stream(self, name, stream, callback, eof, error):
            await self._mirror_stream(name, stream.readline, [], callback, eof, error)

    #
    # Manages the execution of asynchronous tasks in a dedicated event loop. The TaskRunner class
    # is responsible for creating and managing an asyncio event loop in a separate thread. It
    # allows for submitting new asynchronous tasks to be run on this event loop, as well as
    # cancelling existing tasks.
    #
    class TaskRunner:
        def __init__(self, id=0):
            self.id = id
            self._logger = GlobalFactory.get_logger().getChild("SimpleProcessServer.{clazz}:{id}".format(clazz=__class__.__name__, id=self.id))
            self.loop = None

        # Running on the caller's thread
        def new_task(self, task):
            self._logger.debug("New task: {task}".format(task=task))

            utils.condition_busy_wait(
                lambda: self.loop is not None,
                timeout_ms=SimpleProcessServer.THREAD_START_TIMEOUT_MS)

            return asyncio.run_coroutine_threadsafe(self._with_log(task), self.loop)

        def cancel_task(self, task):
            return asyncio.run_coroutine_threadsafe(self._with_log(task.cancel()), self.loop)

        # Running on the task's thread
        def run(self):
            self._logger.debug("Starting loop")

            self.loop = asyncio.new_event_loop()
            asyncio.set_event_loop(self.loop)
            self.loop.run_forever()

        # Running on the task's thread on the loop as a coro
        async def _with_log(self, task):
            self._logger.debug("Starting {task}".format(task=task))
            return await asyncio.create_task(task)

    def __init__(self):
        self._tpe = ThreadPoolExecutor(max_workers=self.MAX_TPE_SIZE, thread_name_prefix="PS")

        self._task_runners = []
        for index in range(self.MAX_TPE_SIZE):
            task_runner = SimpleProcessServer.TaskRunner(id=index)
            future = self._tpe.submit(task_runner.run)
            self._task_runners.append({"instance": task_runner, "future": future})

        self._ppe = ProcessPoolExecutor(max_workers=self.MAX_PPE_SIZE)

        self._controllers = {}
        self._next_task_runner = 0

    def new_process(self, *args, **kwargs):
        task_runner = self._task_runners[self._next_task_runner % len(self._task_runners)]["instance"]
        self._next_task_runner += 1

        controller = SimpleProcessServer.Controller(task_runner, *args, **kwargs)
        self._controllers[controller] = {}
        self._controllers[controller]["task_runner"] = task_runner

        return controller


