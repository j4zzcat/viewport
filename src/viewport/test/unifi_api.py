import unittest
from unittest.mock import MagicMock, patch

from app.command.streams import StreamsCommand
from app.executer import SimpleExecuter
from app.unifi.api import SimpleUnifiApi
from app.context import Context


class UnifiApiTestCase(unittest.TestCase):
    def test1(self):
        sua = SimpleUnifiApi("dev-user:dev10203040$Dx@192.168.4.10")
        r = sua.login()
        print(r)
        print(sua.headers)


if __name__ == '__main__':
    unittest.main()
