import unittest

from app.command.streams import StreamsCommand


class TemplateTestCase(unittest.TestCase):
    def test1(self):
        sc = StreamsCommand(None, None)
        sc._render_viewport(None, [
            "u1:p1@host1/id1",
            "u1:p1@host1/id2",
            "u1:p1@host1/id3",
        ])