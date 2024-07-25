import logging
import sys

class Logger:
    class RedactingHandler(logging.Handler):
        def __init__(self):
            super().__init__()
            self._redactions = []

        def addRedaction(self, redaction):
            self._redactions.append(redaction)

        def emit(self, record):
            for redaction in self._redactions:
                record.msg = record.getMessage().replace(redaction, "[REDACTED]")

            print(self.format(record))

    def __init__(self):
        self._redactor = Logger.RedactingHandler()
        self._redactor.setLevel(logging.INFO)
        self._redactor.setFormatter(logging.Formatter(
            fmt="[%(asctime)s.%(msecs)-3d] (%(threadName)-3s) %(levelname)-5s %(name)-20s %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"))

        self._root = logging.getLogger("root")
        self._root.addHandler(self._redactor)
        setattr(logging.getLoggerClass(), "addRedaction", self._redactor.addRedaction)

    def getChild(self, suffix):
        return self._root.getChild(suffix)

    def setLevel(self, level):
        self._root.setLevel(level)
        return self._redactor.setLevel(level)

    def addRedaction(self, str):
        self._redactor.addRedaction(str)


Logger = Logger()
