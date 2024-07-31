import logging


class SimpleLogger:
    class SimpleHandler(logging.Handler):
        def __init__(self):
            super().__init__()
            self._debug_formatter = logging.Formatter(
                fmt="[%(asctime)s.%(msecs)-3d] (%(threadName)-10s) %(levelname)-5s %(name)-20s %(message)s",
                datefmt="%Y-%m-%d %H:%M:%S")

            self._info_formatter = logging.Formatter(
                fmt="[%(asctime)s] %(levelname)-5s %(message)s",
                datefmt="%Y-%m-%d %H:%M:%S")

            self._redactions = []

        def add_redaction(self, redaction):
            self._redactions.append(redaction)

        def emit(self, record):
            for redaction in self._redactions:
                record.msg = record.getMessage().replace(redaction, "[REDACTED]")

            record.name = record.name[2:]  # remove x.

            if record.levelname == "DEBUG":
                self.setFormatter(self._debug_formatter)
            else:
                self.setFormatter(self._info_formatter)

            print(self.format(record))

    def __init__(self):
        self._handler = SimpleLogger.SimpleHandler()
        self._handler.setLevel(logging.INFO)

        self._root = logging.getLogger("x")
        self._root.addHandler(self._handler)
        setattr(logging.getLoggerClass(), "add_redaction", self._handler.add_redaction)

    def get_child(self, suffix):
        return self._root.getChild(suffix)

    def set_level(self, level):
        self._root.setLevel(level)
        return self._handler.setLevel(level)

    def add_redaction(self, str):
        self._handler.add_redaction(str)

