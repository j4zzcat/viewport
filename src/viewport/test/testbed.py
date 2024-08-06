import time

from backend.cmdsrv import SimpleCommandServer
from context import GlobalFactory
from backend.protocols.rtsp import SimpleRTSPToFragmentedMP4Server

if __name__ == '__main__':
    GlobalFactory.get_logger().set_level("DEBUG")
    scs = SimpleCommandServer()

    server = SimpleRTSPToFragmentedMP4Server()

    scs.run_asynchronously(server)

    while True:
        time.sleep(10)
