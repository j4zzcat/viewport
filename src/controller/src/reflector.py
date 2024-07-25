import os
import sys
import subprocess
from logger import Logger
from error import ApplicationException


class ReflectorController:
    def __init__(self):
        self._logger = Logger.getChild(ReflectorController.__name__)
        self._logger.info("Initializing...")

    def start(self):
        process = subprocess.Popen("node",
            args="--no-warnings --import tsx src/simple-reflector",
            cwd=os.path.dirname(os.path.realpath(__file__)) + "/../../reflector",
            stdout=subprocess.PIPE)

        for line in iter(process.stdout.readline, b""):
            sys.stdout.write(line)
