import logging
import sys


def print_ansi256_color_gamut():
    # Print system colors (0-15)
    print("System colors:")
    for color_code in range(16):
        print(f'\033[38;5;{color_code}m {color_code:3} \033[0m', end=' ')
    print("\n")

    # Print 6x6x6 color cube (16-231)
    print("Color cube (16-231):")
    for g in range(6):
        for r in range(6):
            for b in range(6):
                # Convert the RGB coordinates to a single code
                color_code = 16 + 36 * r + 6 * g + b
                print(f'\033[38;5;{color_code}m{color_code:3}\033[0m', end=' ')
            print(" ", end='')  # Slightly wider space between groups
        print("\n")
    print("\n")

    # Print grayscale colors (232-255)
    print("Grayscale colors:")
    for color_code in range(232, 256):
        print(f'\033[38;5;{color_code}m {color_code:3} \033[0m', end=' ')
        if (color_code - 231) % 8 == 0:
            print()  # Newline every 8 colors for readability


class SimpleLogger(logging.Logger):
    FORMATS = {
        logging.DEBUG: {
            "fmt": "[%(asctime)s.%(msecs)-3d] (%(process_color)s%(process)s\033[0m:%(threadName_color)s%(threadName)-10s\033[0m) %(levelname)-7s %(name)-34s %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S"},

        "default": {
            "fmt": "[%(asctime)s] %(levelname)-7s %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S"}}

    PID_COLORS = [250, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]
    TID_COLORS = [250, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]
    # TID_COLORS = [250, 246, 248, 250, 252, 254]
    LEVEL_COLORS = []

    class Formatter(logging.Formatter):
        def __init__(self, fmt, datefmt):
            super().__init__(fmt, datefmt)

        def format(self, record):
            return super().format(record)

    class Filter(logging.Filter):
        def filter(self, record):
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


def main():
    print("Hello")
    logging.setLoggerClass(SimpleLogger)
    logger = logging.getLogger("viewport")
    logger.addFilter(SimpleLogger.Filter())
    logger.addHandler(logging.StreamHandler(sys.stdout))
    logger.setLevel(logging.DEBUG)

    logger.debug("debug message")
    logger.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_0"}})
    logger.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_1"}})
    logger.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_2"}})
    logger.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_3"}})

    child = logger.getChild("child")
    child.add_redaction("message")
    child.debug("debug message")
    child.error("error message")
    child.warning("warning message", extra={"override": {"process": 1234}})
    child.warning("warning message", extra={"override": {"process": 3234}})
    child.debug("debug message", extra={"override": {"process": 2234}})
    child.debug("debug message", extra={"override": {"process": 4234}})
    child.debug("debug message", extra={"override": {"process": 6234}})
    child.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_0"}})
    child.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_1"}})
    child.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_1"}})
    child.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_2"}})
    child.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_3"}})
    child.debug("debug message", extra={"override": {"process": 6234, "threadName": "PS_3"}})
    child.info("info message")

    logger.info("info hello world")
    logger.info("info message")


if __name__ == "__main__":
    # print_ansi256_color_gamut()
    main()
