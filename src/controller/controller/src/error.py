class ApplicationException(Exception):
    def __init__(self, message):
        super(ApplicationException, self).__init__(message)


class ApplicationFatal(ApplicationException):
    def __init__(self, message):
        super(ApplicationFatal, self).__init__(message)
