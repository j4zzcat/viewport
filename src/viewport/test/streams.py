import unittest
from unittest.mock import MagicMock, patch
from urllib.parse import urlparse

from app.command.streams import StreamsCommand
from app.executer import SimpleExecuter
from app.unifi.protect import SimpleUnifiProtectApi
from app.context import Context


class StreamsCommandTestCase(unittest.TestCase):
    def test1(self):
        sua = SimpleUnifiProtectApi("u1:p1@host1")
        sua.bootstrap = {"cameras": [
            {"name": "c 1", "id": "id1"},
            {"name": "c 2", "id": "id2"},
            {"name": "c 3", "id": "id3"},
        ]}

        sc = StreamsCommand(None, None)
        self.assertEqual(
            sc._get_player_url_for_unifi_protocol(urlparse("unifi://u1:p1@host1/_all"), sua),
     ["u1:p1@host1/id1",
             "u1:p1@host1/id2",
             "u1:p1@host1/id3"])

        self.assertEqual(
            sc._get_player_url_for_unifi_protocol(urlparse("unifi://u1:p1@host1/c 2,c 1"), sua),
            ["u1:p1@host1/id2",
             "u1:p1@host1/id1"])


if __name__ == '__main__':
    unittest.main()
