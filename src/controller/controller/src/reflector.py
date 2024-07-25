from logger import Logger
from error import ApplicationException, ApplicationFatal


class ReflectorController:
    def __init__(self):
        self._logger = Logger.getChild(__name__)
        self._logger.info("Starting...")


