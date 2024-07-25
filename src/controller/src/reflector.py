from logger import Logger
from error import ApplicationException


class ReflectorController:
    def __init__(self):
        self._logger = Logger.getChild(ReflectorController.__name__)
        self._logger.info("Starting...")


