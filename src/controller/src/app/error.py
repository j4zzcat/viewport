import sys
from src.app.context import Context

class ApplicationException(Exception):
    def __init__(self, message):
        super().__init__(message)
        try:
            enclosing_object_logger = sys._getframe(2).f_locals.get("self")._root_logger
            if enclosing_object_logger:
                enclosing_object_logger.error(message)
        except Exception as e:
            Context.get_logger().get_child("ExceptionHandler").error(message)


