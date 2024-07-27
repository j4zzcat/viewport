import unittest
from unittest.mock import MagicMock, patch

from app.command.streams import StreamsCommand
from app.executer import SimpleExecuter
from app.unifi.api import SimpleUnifiApi
from app.context import Context


class StreamsCommandTestCase(unittest.TestCase):
    def test1(self):
        with patch.object(Context, "create_reflector_controller", MagicMock(return_value=SimpleExecuter.Thingy())):
            sua1 = SimpleUnifiApi("u1:p1@host1")
            sua1.bootstrap = {"cameras": [
                {"name": "c 1", "id": "id1"},
                {"name": "c 2", "id": "id2"},
                {"name": "c 3", "id": "id3"},
            ]}

            sua2 = SimpleUnifiApi("u2:p2@host2")
            sua2.bootstrap = {"cameras": [
                {"name": "c 4", "id": "id4"},
                {"name": "c5", "id": "id5"},
            ]}

            with patch.object(Context, "create_unifi_api", MagicMock(side_effect=[sua1, sua2])):
                sc = StreamsCommand(
                    layout="grid:3x3",
                    urls=[
                        "unifi://u1:p1@host1/_all",
                        "unifi://u2:p2@host2/c5,c 4",
                        "unifi://u1:p1@host1/c 3",
                    ])

                sc.initialize()
                sc.run()

                self.assertEqual(sc._livestream_urls, [
                    "u1:p1@host1/id1",
                    "u1:p1@host1/id2",
                    "u1:p1@host1/id3",
                    "u2:p2@host2/id5",
                    "u2:p2@host2/id4",
                    "u1:p1@host1/id3",
                ])


if __name__ == '__main__':
    unittest.main()
