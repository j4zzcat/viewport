import logging
import sys

logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)-5s %(name)-15s %(message)s")

Logger = logging.getLogger("root")
