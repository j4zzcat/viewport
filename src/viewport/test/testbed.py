import sys
import logging

x = { "default": {
    "fmt": "[%(asctime)s] %(levelname)-7s %(message)s",
    "datefmt": "%Y-%m-%d %H:%M:%S"}}



def main():
    print("Hello")

    logger1 = logging.getLogger("viewport")  # All loggers are children of this one
    sh = logging.StreamHandler(sys.stdout)
    sh.setFormatter(ColoringFormatter("viewport"))
    logger1.addHandler(
        ChainHandler(
            PrefixChopperHandler("viewport"),
            OverridesHandler(),
            RedactionsHandler(),
            sh))

    logger1.setLevel(logging.DEBUG)

    logger2 = logging.getLogger("2")
    logger2.addHandler(logging.StreamHandler(sys.stdout))
    logger2.setLevel(logging.DEBUG)

    logger1.debug("1 debug message XXX", extra={"add_redaction": "XXX", "override": {"process": "124"}})
    # logger1.propagate = True
    logger1.debug("1 debug XXX YYY")
    logger2.debug("2 debug XXX YYY")
    logger11 = logger1.getChild("1")
    logger11.debug("11 debug XXX YYY")

    # logger2.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_0"}})
    # logger2.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_1"}})
    # logger1.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_2"}})
    # logger1.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_3"}})
    #
    # child = logger1.getChild("child")
    # child.add_redaction("message")
    # child.debug("debug message")
    # child.error("error message")
    # child.warning("warning message", extra={"override": {"process": 1234}})
    # child.warning("warning message", extra={"override": {"process": 3234}})
    # child.debug("debug message", extra={"override": {"process": 2234}})
    # child.debug("debug message", extra={"override": {"process": 4234}})
    # child.debug("debug message", extra={"override": {"process": 6234}})
    # child.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_0"}})
    # child.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_1"}})
    # child.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_1"}})
    # child.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_2"}})
    # child.debug("debug message", extra={"override": {"process": 2234, "threadName": "PS_3"}})
    # child.debug("debug message", extra={"override": {"process": 6234, "threadName": "PS_3"}})
    # child.info("info message")
    #
    # logger1.info("info hello world")
    # logger1.info("info message")


if __name__ == "__main__":
    # print_ansi256_color_gamut()
    main()
