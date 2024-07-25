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
        self._logger.info("Spawning the Reflector process")
        process = subprocess.Popen(
            args=["node", "--no-warnings", "--import", "tsx", "src/simple-reflector"],
            cwd=os.path.dirname(os.path.realpath(__file__)) + "/../../reflector",
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True)

        self._reflector_process = process
        self._logger.info("Reflector started, pid: " + str(self._reflector_process.pid))

        self._reflector_logger = Logger.getChild("Reflector")
        self._reflector_stdout_reader_thread = Thread(target=self.stdoutReader)
        self._reflector_stdout_reader_thread.name = "T02"
        self._reflector_stdout_reader_thread.daemon = True
        self._reflector_stdout_reader_thread.start()
        self._reflector_stdout_reader_thread.join()

        # Todo register signal handler to cleanup spwaned processed after stop/failure
        # def cleanup(signum, frame):
        #   print("Caught signal", signum)
        #   # Kill all processes in the process group
        #   os.killpg(os.getpgid(os.getpid()), signal.SIGTERM)
        #   sys.exit(1)

        # for sig in (signal.SIGINT, signal.SIGTERM, signal.SIGQUIT):
        #   signal.signal(sig, cleanup)

        # Starts the process in a new process group
        # subprocess.Popen(command, preexec_fn=os.setsid)

    def stdoutReader(self):
        for line in self._reflector_process.stdout:
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

            eval("self._reflector_logger.{level}(msg)".format(level=parsed_line["level"]))

