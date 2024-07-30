import unittest

from app.unifi.protect import SimpleUnifiProtectApi


class UnifiApiTestCase(unittest.TestCase):
    def test1(self):
        sua = SimpleUnifiProtectApi("dev-user:dev10203040$Dx@192.168.4.10")
        if sua.login():
            sua.bootstrap()



if __name__ == '__main__':
    unittest.main()
