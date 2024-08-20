import logging
import os
import sys


class SimpleLogger(logging.Logger):
    FORMATS = {
        logging.DEBUG: {
            "fmt": "[%(asctime)s.%(msecs)-3d] (%(process_color)s%(process)s\033[0m:%(threadName_color)s%(threadName)-10s\033[0m) %(level_color)s%(levelname)-7s\033[0m %(name)-34s %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S"},

        "default": {
            "fmt": "[%(asctime)s] %(levelname)-7s %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S"}}

    PID_COLORS = [15, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]
    TID_COLORS = [13, 12, 11, 10, 8, 7, 6, 5, 4, 3, 2, 15, 14]
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

            # Handle level coloring
            if record.levelno == logging.WARNING:
                record.level_color = "\033[38;5;11m"
            elif record.levelno == logging.ERROR:
                record.level_color = "\033[38;5;9m"
            else:
                record.level_color = "\033[38;5;250m"

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
