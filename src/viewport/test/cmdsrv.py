import logging
import os
import time
import unittest

from backend.cmdsrv import SimpleCommandServer
from context import GlobalFactory


class SimpleCommandServerTestCase(unittest.TestCase):
    def test1(self):
        script = """
            while true; do
                date +%s
                random=$(LC_CTYPE=C printf '%d' "'$(dd if=/dev/random of=/dev/stdout count=1 bs=1 2>/dev/null)")
                sleep_duration=$(( random % 10 ))
                sleep "$sleep_duration"
            done
                
        """

        with open("/tmp/script.sh", "w") as f:
            f.write(script)

        class TestExecCommand(SimpleCommandServer.ExecCommand):
            def __init__(self, id):
                super()
                self.id = id
                self.args = ["bash", "/tmp/script.sh"]

            def log(self, line):
                print("log {id} -> {line}".format(id=id, line=line))

        GlobalFactory.get_logger().set_level(logging.DEBUG)
        scs = SimpleCommandServer()
        scs.run_forever("test", [TestExecCommand(1),TestExecCommand(2)])
        time.sleep(100)

if __name__ == '__main__':
    unittest.main()
