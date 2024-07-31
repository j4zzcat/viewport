import unittest

from backend.factory import GlobalFactory


class UnifiApiTestCase(unittest.TestCase):
    def test1(self):
        with GlobalFactory.new_web_server("localhost", 8777, "/tmp") as web_server:
            web_server.serve_forever()


if __name__ == '__main__':
    unittest.main()
