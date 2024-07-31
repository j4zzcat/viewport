import atexit
import os
import subprocess
import json

from app.backend import GlobalFactory
from app.error import ApplicationException


class SimpleReflectorController:
    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._reflector_process = None
        self._reflector_logger = None

    def initialize(self):
        self._logger.debug("Initializing")

    def run(self):
        self._logger.debug("Spawning the SimpleReflector Node process")

        process = GlobalFactory.get_executer().spwan(
            args=["node", "--no-warnings", "--import", "tsx", "src/simple-reflector.ts"],
            cwd=os.path.dirname(os.path.realpath(__file__)) + "/../../../../reflector",
            stdout=subprocess.PIPE,
            preexec_fn=os.setsid,
            text=True)

        self._reflector_process = process
        self._logger.debug("Reflector started, pid: " + str(self._reflector_process.pid))

        self._reflector_logger = GlobalFactory.get_logger().get_child("SimpleReflector:{pid}".format(
            pid=self._reflector_process.pid))

        for line in self._reflector_process.stdout:
            try:
                parsed_line = json.loads(line)
            except json.decoder.JSONDecodeError as e:
                if line.startswith("UNVR"):
                    parsed_line = {"level": "debug", "message": line.strip()}
                else:
                    raise ApplicationException("Failed to parse JSON, offending line: {line}".format(line=line))

            msg = (
                "{message}, context: {context}".format(
                    message=parsed_line["message"],
                    context=parsed_line["context"])
                if "context" in parsed_line
                else parsed_line["message"]
            )

            eval("self._reflector_logger.{level}(msg)".format(level=parsed_line["level"]))

    def dispose(self):
        self._logger.debug("Disposed")
