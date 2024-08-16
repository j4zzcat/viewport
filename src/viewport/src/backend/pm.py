import asyncio
import subprocess
from concurrent.futures import ThreadPoolExecutor

from backend.error import ApplicationException
from context import GlobalFactory
import backend.utils as utils


#
# Manages the lifecycle and execution of processes and their associated task runners. The
# ProcessManager class is responsible for initializing and managing task runners, creating new
# process controllers, and overseeing the execution of subprocesses. It utilizes a
# ThreadPoolExecutor to run task runner event loops in separate threads and assigns task runners
# to process controllers in a round-robin fashion.
#
class ProcessManager:
    THREAD_START_TIMEOUT_MS = 2000
    PROCESS_START_TIMEOUT_MS = 3000

    #
    # Handles the lifecycle and control of individual processes. The Controller class is
    # responsible for starting, stopping, and handling the output of a subprocess. It allows for
    # the registration of coros callbacks to handle the subprocess's stdout and stderr streams,
    # liveness monitoring and more. The coros themselves run on the eventloop of a TaskRunner.
    #
    class Controller:
        # Extra keywords accepted on top of those of Popen
        KEYWORDS = [("stdout_text", False), ("stderr_text", False), ("monitor", False)]

        def __init__(self, pm, task_runner, *args, **kwargs):
            self._logger = GlobalFactory.get_logger().get_child(__class__.__name__)
            self._pm = pm
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
            self._logger.debug("Starting process")
            try:
                future = self._task_runner.new_task(
                    asyncio.create_subprocess_exec(*self._popen_args, **self._popen_kwargs))
            except OSError as e:
                raise ApplicationException("Failed to start process, '{e}".format(e=e))

            self._logger.debug("Waiting for process to start")
            self._process = utils.future_busy_wait(
                future,
                ProcessManager.PROCESS_START_TIMEOUT_MS)

            if self._process.returncode != 0:
                raise ApplicationException("Process failed to start")

            self._logger = GlobalFactory.get_logger().get_child("{clazz}:{pid}".format(clazz=__class__.__name__, pid=self._process.pid))
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
            pass

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
    # cancelling existing tasks. Each TaskRunner instance is identified by a unique identifier.
    #
    class TaskRunner:
        def __init__(self, id):
            self.id = id
            self._logger = GlobalFactory.get_logger().get_child("{clazz}:{id}".format(clazz=__class__.__name__, id=self.id))
            self.loop = None

        # Running on the caller's thread
        def new_task(self, task):
            self._logger.debug("New task: {task}".format(task=task))

            utils.condition_busy_wait(
                lambda: self.loop is not None,
                timeout_ms=ProcessManager.THREAD_START_TIMEOUT_MS)

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
        max_workers = 2
        self._tpe = ThreadPoolExecutor(max_workers=max_workers, thread_name_prefix="PM")

        self._task_runners = []
        for index in range(max_workers):
            task_runner = ProcessManager.TaskRunner(id=index)
            future = self._tpe.submit(task_runner.run)
            self._task_runners.append({"instance": task_runner, "future": future})

        self._controllers = {}
        self._next_task_runner = 0

    def new_process_controller(self, *args, **kwargs):
        task_runner = self._task_runners[self._next_task_runner % len(self._task_runners)]["instance"]
        self._next_task_runner += 1

        controller = ProcessManager.Controller(self, task_runner, *args, **kwargs)
        self._controllers[controller] = {}
        self._controllers[controller]["task_runner"] = task_runner

        return controller



# class ProcessManagerAI:
#     def __init__(self, max_workers=4):
#         self.processes = defaultdict(dict)
#         self.callbacks = defaultdict(dict)
#         self.groups = defaultdict(set)
#         self.executor = ThreadPoolExecutor(max_workers=max_workers)
#
#     async def start_process(self, name, command, group=None, stdout_callback=None, stderr_callback=None):
#         proc = await asyncio.create_subprocess_exec(
#             *command,
#             stdout=asyncio.subprocess.PIPE,
#             stderr=asyncio.subprocess.PIPE
#         )
#         self.processes[group][name] = {
#             'process': proc,
#             'command': command,
#             'restart': True
#         }
#         self.callbacks[group][name] = {
#             'stdout': stdout_callback,
#             'stderr': stderr_callback
#         }
#         if group:
#             self.groups[group].add(name)
#         asyncio.create_task(self._monitor_process(group, name))
#         asyncio.create_task(self._stream_output(group, name, proc.stdout, 'stdout'))
#         asyncio.create_task(self._stream_output(group, name, proc.stderr, 'stderr'))
#
#     async def _monitor_process(self, group, name):
#         while True:
#             proc = self.processes[group][name]['process']
#             await proc.wait()
#             if self.processes[group][name]['restart']:
#                 command = self.processes[group][name]['command']
#                 await self.start_process(name, command, group,
#                                          self.callbacks[group][name]['stdout'],
#                                          self.callbacks[group][name]['stderr'])
#             else:
#                 break
#
#     async def _stream_output(self, group, name, stream, stream_type):
#         loop = asyncio.get_event_loop()
#         while True:
#             line = await loop.run_in_executor(self.executor, stream.readline)
#             if line:
#                 decoded_line = line.decode()
#                 print(f"[{name} - {stream_type}] {decoded_line}", end='')
#                 if self.callbacks[group][name][stream_type]:
#                     self.callbacks[group][name][stream_type](decoded_line)
#             else:
#                 break
#
#     async def stop_process(self, group, name):
#         self.processes[group][name]['restart'] = False
#         self.processes[group][name]['process'].terminate()
#         await self.processes[group][name]['process'].wait()
#         del self.processes[group][name]
#         if name in self.groups[group]:
#             self.groups[group].remove(name)
#
#     def start(self):
#         self.loop = asyncio.new_event_loop()
#         asyncio.set_event_loop(self.loop)
#         self.loop.run_forever()
#
#     def stop(self):
#         for group in list(self.groups.keys()):
#             asyncio.run_coroutine_threadsafe(self.stop_group(group), self.loop).result()
#         self.loop.call_soon_threadsafe(self.loop.stop)
#         self.executor.shutdown(wait=True)
#
#     async def stop_group(self, group):
#         if group in self.groups:
#             for name in list(self.groups[group]):
#                 await self.stop_process(group, name)
#             del self.groups[group]
#
# class ProcessManagerThread(Thread):
#     def __init__(self, process_manager):
#         super().__init__()
#         self.process_manager = process_manager
#
#     def run(self):
#         self.process_manager.start()
#
#     def stop(self):
#         self.process_manager.stop()
#
# # Example Usage
# async def main():
#     process_manager = ProcessManagerAI(max_workers=4)
#
#     # Start ProcessManager in its own thread
#     process_manager_thread = ProcessManagerThread(process_manager)
#     process_manager_thread.start()
#
#     # Define stdout and stderr callback functions
#     def stdout_callback(line):
#         print(f"Processed stdout line: {line}")
#
#     def stderr_callback(line):
#         print(f"Processed stderr line: {line}")
#
#     # Start processes and group them
#     asyncio.run_coroutine_threadsafe(process_manager.start_process(
#         'ping_google_1', ['ping', 'google.com', '-c', '5'], 'group1', stdout_callback, stderr_callback), process_manager.loop)
#     asyncio.run_coroutine_threadsafe(process_manager.start_process(
#         'ping_google_2', ['ping', 'google.com', '-c', '5'], 'group1', stdout_callback, stderr_callback), process_manager.loop)
#
#     # Simulate main program running
#     await asyncio.sleep(10)
#
#     # Stop the group of processes and the ProcessManager
#     asyncio.run_coroutine_threadsafe(process_manager.stop_group('group1'), process_manager.loop).result()
#     process_manager_thread.stop()
#     process_manager_thread.join()
#
# if __name__ == "__main__":
#     asyncio.run(main())