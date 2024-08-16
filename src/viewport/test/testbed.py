import logging
import subprocess
import sys

from backend.pm import ProcessManager
from context import GlobalFactory

GlobalFactory.get_logger().set_level(logging.DEBUG)
pm = ProcessManager()
pc = pm.new_process_controller(
    "/bin/bash", "-c", "echo hello >/dev/stdout; echo goodbye >/dev/stderr",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    # text=False,
    stdout_text=True,
    # stderr_text=True,
    monitor=True)

pc.on("stdout", sys.stdout.buffer.write, print)
pc.on("stderr", sys.stdout.buffer.write, print)
pc.on("done", lambda p: print(p.return_code))

pc.start()


# pc = pm.new_process(
#     FileServer()
# stdout=PIPE,
# stderr=DEVNULL,
# stdout_text=True
# monitor=True)
#
# pc.stdout.mirror(print)
# ps.start()
