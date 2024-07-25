import sys


class ApplicationException(Exception):
    def __init__(self, message):
        super().__init__(message)
        enclosing_object_logger = sys._getframe(2).f_locals.get("self")._logger
        if enclosing_object_logger:
            enclosing_object_logger.error(message)


