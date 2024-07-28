import unittest

from app.unifi.api import SimpleUnifiApi


class UnifiApiTestCase(unittest.TestCase):
    def test1(self):
        sua = SimpleUnifiApi("dev-user:dev10203040$Dx@192.168.4.10")
        if sua.login():
            sua.bootstrap()



if __name__ == '__main__':
    unittest.main()
