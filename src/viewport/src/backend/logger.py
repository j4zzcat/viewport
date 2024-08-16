import logging


class SimpleLogger:
    DETAILED_FORMATTER = logging.Formatter(
        fmt="[%(asctime)s.%(msecs)-3d] (%(threadName)-10s) %(levelname)-7s %(name)-34s %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S")

    DEFAULT_FORMATTER = logging.Formatter(
        fmt="[%(asctime)s] %(levelname)-7s %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S")

    YELLOW = "\x1b[33;20m"
    RED = "\x1b[31;20m"
    BOLD_RED = "\x1b[31;1m"
    RESET = "\x1b[0m"

    class SimpleHandler(logging.Handler):
        def __init__(self):
            super().__init__()
            self._redactions = []

        def add_redaction(self, redaction):
            self._redactions.append(redaction)

        def emit(self, record):
            for redaction in self._redactions:
                record.msg = record.getMessage().replace(redaction, "[REDACTED]")

            record.name = record.name[2:]  # remove x.

            if self.level == logging.DEBUG:
                self.setFormatter(SimpleLogger.DETAILED_FORMATTER)
            else:
                self.setFormatter(SimpleLogger.DEFAULT_FORMATTER)

            formatted = self.format(record)
            if record.levelno == logging.ERROR:
                formatted = SimpleLogger.RED + formatted + SimpleLogger.RESET
            elif record.levelno == logging.WARNING:
                formatted = SimpleLogger.YELLOW + formatted + SimpleLogger.RESET

            print(formatted)

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

