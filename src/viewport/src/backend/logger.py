#
# This file is part of Viewport.
# By Sharon Dagan <https://github.com/j4zzcat>, Copyright (C) 2024.
#
# Viewport is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option)
# any later version.
#
# This software is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along with
# This software. If not, see <https://www.gnu.org/licenses/>.
#

import logging


class ColoringFormatter(logging.Formatter):
    FORMAT = {
        "fmt": "[%(asctime)s.%(msecs)-3d] (%(process_color)s%(process)-2s\033[0m:%(threadName_color)s%(threadName)-10s\033[0m) %(level_color)s%(levelname)-7s\033[0m %(name)-34s %(message)s",
        "datefmt": "%Y-%m-%d %H:%M:%S"}

    PID_COLORS = [15, 2, 3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 15]
    TID_COLORS = [13, 12, 10, 8, 7, 6, 5, 4, 3, 2, 15, 14]
    LEVEL_COLORS = {
        logging.WARNING: 11,
        logging.ERROR: 9}

    def __init__(self):
        super().__init__(self.FORMAT["fmt"], self.FORMAT["datefmt"])
        self._pids = []
        self._tids = []

    def format(self, record):
        # Handle level coloring
        if record.levelno in self.LEVEL_COLORS:
            record.level_color = "\033[38;5;{color}m".format(color=self.LEVEL_COLORS[record.levelno])
        else:
            record.level_color = ""

        # Handle pid coloring
        if hasattr(record, "process"):
            if record.process is not None:
                if record.process not in self._pids:
                    self._pids.append(record.process)

                color = self.PID_COLORS[self._pids.index(record.process) % len(self.PID_COLORS)]
                record.process_color = f"\033[38;5;{color}m"

        # Handle tid coloring
        if hasattr(record, "threadName"):
            if record.threadName is not None:
                if record.threadName not in self._tids:
                    self._tids.append(record.threadName)

                color = self.TID_COLORS[self._tids.index(record.threadName) % len(self.TID_COLORS)]
                record.threadName_color = f"\033[38;5;{color}m"

        return super().format(record)


class PrefixChopperHandler:
    def __init__(self, prefix):
        self._prefix = prefix

    def handle(self, record):
        record.name = record.name[len(self._prefix) + 1:]
        return record


class OverridesHandler:
    def handle(self, record):
        if "override" in record.__dict__:
            for attr in record.override:
                exec(f"record.{attr} = record.override[attr]")

        return record


class RedactionsHandler:
    def __init__(self):
        super().__init__()
        self._redactions = []

    def handle(self, record):
        if "add_redaction" in record.__dict__:
            if record.add_redaction not in self._redactions:
                self._redactions.append(record.add_redaction)

        for redaction in self._redactions:
            if record.msg:
                record.msg = record.msg.replace(redaction, "[REDACTED]")

        return record


class ChainHandler(logging.Handler):
    def __init__(self, *args):
        super().__init__()
        self._handlers = args

    def handle(self, record):
        result = record
        for handler in self._handlers:
            result = handler.handle(result)

        return result
