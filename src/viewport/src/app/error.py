import sys
import traceback

from app.context import Context

class ApplicationException(Exception):
    def __init__(self, message):
        super().__init__(message)
        Context.get_logger().get_child("ExceptionHandler").error(message)
        traceback.print_exc()


