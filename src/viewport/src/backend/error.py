import sys
import traceback

from backend.context import GlobalFactory


class ApplicationException(Exception):
    def __init__(self, message):
        super().__init__(message)
        GlobalFactory.get_logger().get_child("ExceptionHandler").error(message)
        # traceback.print_exc()


