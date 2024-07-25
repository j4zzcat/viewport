import os
import sys
import subprocess
import json
from logger import Logger
from error import ApplicationException


class ReflectorController:
    def __init__(self):
        self._logger = Logger.getChild(ReflectorController.__name__)
        self._logger.info("Initializing")

    def start(self):
        self._logger.info("Starting the Reflector process")
        process = subprocess.Popen(
            args=["node", "--no-warnings", "--import", "tsx", "src/simple-reflector"],
            cwd=os.path.dirname(os.path.realpath(__file__)) + "/../../reflector",
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True)

        self._logger.info("Reflector started, pid: " + str(process.pid))
        reflector_logger = Logger.getChild("Reflector")

        for line in process.stdout:
            try:
                parsed_line = json.loads(line)
            except json.decoder.JSONDecodeError as e:

                print(e)
                continue

            msg = (
                "{message}, context: {context}".format(
                    message=parsed_line["message"],
                    context=parsed_line["context"])
                if "context" in parsed_line
                else parsed_line["message"]
            )

            eval("reflector_logger.{level}(msg)".format(level=parsed_line["level"]))
