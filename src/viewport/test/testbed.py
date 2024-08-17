import logging
import subprocess
import sys
from multiprocessing import freeze_support

from backend.cmdsrv import Command
from backend.pm import ProcessManager
from context import GlobalFactory

def main():

    GlobalFactory.get_logger().set_level(logging.DEBUG)

    pm = ProcessManager()
    # pc1 = pm.new_process(
    #     "/bin/bash", "-c", "echo hello >/dev/stdout; echo goodbye >/dev/stderr",
    #     stdout=subprocess.PIPE,
    #     stderr=subprocess.PIPE,
    #     stdout_text=True,
    #     stderr_text=True,
    #     monitor=True)
    #
    # pc1.on("stdout", sys.stdout.buffer.write)
    # pc1.on("stderr", sys.stdout.buffer.write)
    # # pc.on("done", lambda p: print(p.return_code))
    # pc1.start()

    class Dummy(Command):
        def run(self):
            print("dummy")

    pc2 = pm.new_process(
        Dummy(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdout_text=True,
        stderr_text=True,
        monitor=True)

    pc2.start()

if __name__ == '__main__':
    freeze_support()
    main()