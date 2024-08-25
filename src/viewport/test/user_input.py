import unittest
from urllib.parse import urlparse

from backend.protocols.unifi import SimpleUnifiProtectApi
from cli.commands import Streams


class UserInputTestCase(unittest.TestCase):
    def test1(self):
        sua = SimpleUnifiProtectApi("u1:p1@host1")
        sua.bootstrap = {"cameras": [
            {"name": "c 1", "id": "id1"},
            {"name": "c 2", "id": "id2"},
            {"name": "c 3", "id": "id3"},
        ]}

        sc = Streams(None, None)
        sc._parse_urls(["unifi://u1:p1@host1/_all"])


if __name__ == '__main__':
    unittest.main()
