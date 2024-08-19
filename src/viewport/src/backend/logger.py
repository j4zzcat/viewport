import logging
import os
import sys



class SimpleLogger(logging.Logger):
    FORMATS = {
        logging.DEBUG: {
            "fmt": "[%(asctime)s.%(msecs)-3d] (%(process_color)s%(process)s\033[0m:%(threadName_color)s%(threadName)-10s\033[0m) %(levelname)-7s %(name)-34s %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S"},

        "default": {
            "fmt": "[%(asctime)s] %(levelname)-7s %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S"}}

    PID_COLORS = [2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]
    TID_COLORS = [2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]
    # TID_COLORS = [250, 246, 248, 250, 252, 254]
    LEVEL_COLORS = []

    class Formatter(logging.Formatter):
        def __init__(self, fmt, datefmt):
            super().__init__(fmt, datefmt)

        def format(self, record):
            return super().format(record)

    class Filter(logging.Filter):
        def filter(self, record):
            # Chop root logger name
            record.name = record.name[len(SimpleLogger._root_name) + 1:]

            # Handle overrides
            if "override" in record.__dict__:
                for attr in record.override:
                    exec(f"record.{attr} = record.override[attr]")

            # Handle redactions
            for redaction in SimpleLogger._redactions:
                record.msg = record.msg.replace(redaction, "[REDACTED]")

            # Handle pid coloring
            if hasattr(record, "process"):
                if record.process is not None:
                    if record.process not in SimpleLogger._pids:
                        SimpleLogger._pids.append(record.process)

                    color = SimpleLogger.PID_COLORS[SimpleLogger._pids.index(record.process) % len(SimpleLogger.PID_COLORS)]
                    record.process_color = f"\033[38;5;{color}m"

            # Handle tid coloring
            if hasattr(record, "threadName"):
                if record.threadName is not None:
                    if record.threadName not in SimpleLogger._tids:
                        SimpleLogger._tids.append(record.threadName)

                    color = SimpleLogger.TID_COLORS[SimpleLogger._tids.index(record.threadName) % len(SimpleLogger.TID_COLORS)]
                    record.threadName_color = f"\033[38;5;{color}m"

            return True

    _root_name = None
    _redactions = []
    _pids = []
    _tids = []

    def __init__(self, name, level=logging.NOTSET):
        super().__init__(name, level)
        if SimpleLogger._root_name is None:
            SimpleLogger._root_name = name

        self._redactions = []

    def getChild(self, suffix):
        child = super().getChild(suffix)

        child.handlers = []
        child.propagate = True
        child.addFilter(SimpleLogger.Filter())
        return child

    def get_child(self, suffix):
        return self.getChild(suffix)

    def setLevel(self, level: int):
        super().setLevel(level)
        if isinstance(self.parent, logging.RootLogger):
            if level in self.FORMATS:
                formatter = self.FORMATS[level]
            else:
                formatter = self.FORMATS["default"]

            self.handlers[0].setFormatter(
                self.Formatter(
                    formatter["fmt"],
                    formatter["datefmt"]))

    def add_redaction(self, redaction):
        SimpleLogger._redactions.append(redaction)




class SimpleLogger2:
    class CustomFormatter(logging.Formatter):
        def format(self, record):
            for attr in record.__dict__:
                if attr.startswith("override_"):
                    overridden_attr = attr.split("_")[1]
                    exec(f"record.{overridden_attr} = record.{attr}")

            return super().format(record)

    DETAILED_FORMATTER = CustomFormatter(
        fmt="[%(asctime)s.%(msecs)-3d] (%(process)s:%(threadName)-10s) %(levelname)-7s %(name)-34s %(message)s",
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

        self._root = GlobalFactory.get_logger().get_child("x")
        self._root.addHandler(self._handler)
        setattr(GlobalFactory.get_logger().get_childClass(), "add_redaction", self._handler.add_redaction)

    def get_child(self, suffix):
        return self._root.getChild(suffix)

    def set_level(self, level):
        self._root.setLevel(level)
        return self._handler.setLevel(level)

    def add_redaction(self, str):
        self._handler.add_redaction(str)

