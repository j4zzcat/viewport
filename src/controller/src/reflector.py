import os
import sys
import subprocess
import json
from threading import Thread

from logger import Logger
from error import ApplicationException


class ReflectorController:
    def __init__(self):
        self._logger = Logger.getChild(ReflectorController.__name__)
        self._logger.info("Initializing")

    def start(self):
        t = Thread(target=self.run)
        t.name = "T02"
        t.daemon = True
        t.start()
        t.join()

    def run(self):
        self._logger.info("Spawning the Reflector process")
        process = subprocess.Popen(
            args=["node", "--no-warnings", "--import", "tsx", "src/simple-reflector"],
            cwd=os.path.dirname(os.path.realpath(__file__)) + "/../../reflector",
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True)

        self._reflector_process = process
        self._logger.info("Reflector started, pid: " + str(self._reflector_process.pid))
        reflector_logger = Logger.getChild("Reflector")

        for line in process.stdout:
            try:
                parsed_line = json.loads(line)
            except json.decoder.JSONDecodeError as e:
                raise ApplicationException("Error parsing JSON output of Reflector, {e}".format(e=e))

            msg = (
                "{message}, context: {context}".format(
                    message=parsed_line["message"],
                    context=parsed_line["context"])
                if "context" in parsed_line
                else parsed_line["message"]
            )

            eval("reflector_logger.{level}(msg)".format(level=parsed_line["level"]))
