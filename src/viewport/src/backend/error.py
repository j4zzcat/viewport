import sys
import traceback

from context import GlobalFactory


class ApplicationException(Exception):
    def __init__(self, message):
        super().__init__(message)
        logger = GlobalFactory.get_logger().get_child("ExceptionHandler")
        logger.error(message)
        logger.error(traceback.format_exc())


