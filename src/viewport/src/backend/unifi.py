import requests
import json

from app.backend import GlobalFactory


class SimpleUnifiProtectApi:
    def __init__(self, netloc):
        self._logger = GlobalFactory.get_logger().get_child("{clazz}:{host}".format(
            clazz=self.__class__.__name__,
            host=netloc.split('@')[1]))
        self.host = netloc.split('@')[1]
        self.username = netloc.split("@")[0].split(":")[0]
        self.password = netloc.split("@")[0].split(":")[1]
        self._headers = {}
        self.bootstrap = None

    def login(self):
        self._logger.debug("Logging in")
        self.logout()

        if "Cookie" in self._headers and "X-CSRF-Token" in self._headers:
            return True

        url_prefix = "https://{host}".format(host=self.host)
        if "X-CSRF-Token" not in self._headers:
            r = requests.get(url_prefix, verify=False)
            if r.status_code == 200 and "X-CSRF-Token" in r.headers:
                self._headers["X-CSRF-Token"] = r.headers["X-CSRF-Token"]
                self._logger.debug("Got X-CSRF-Token")

        self._logger.debug("Attempting login")
        r = requests.post(
            "{url_prefix}/api/auth/login".format(url_prefix=url_prefix),
            headers={"Content-type": "application/json"},
            data=json.dumps({
                "password": self.password,
                "rememberMe": True,
                "token": "",
                "username": self.username}),
            verify=False
        )

        self._logger.debug("Login result: {status}".format(status=r.status_code))
        if r.status_code == 200:
            csrf_token = r.headers.get("X-Updated-CSRF-Token") or r.headers["X-CSRF-Token"]
            cookie = r.headers["Set-Cookie"]

            if csrf_token and cookie:
                self._headers["Cookie"] = cookie.split(";")[0]
                self._headers["X-CSRF-Token"] = csrf_token

                self._logger.debug("Attempting to bootstrap")
                url = "https://{host}/proxy/protect/api/bootstrap".format(host=self.host)
                r = requests.get(url, headers=self._headers, verify=False)
                self._logger.debug("Bootstrap result: {status}".format(status=r.status_code))

                if r.status_code == 200:
                    self.bootstrap = r.json()
                    self._logger.debug("Ready")
                    return True

        self.logout()
        return False

    def logout(self):
        self._logger.debug("Logging out")
        self._headers.clear()

    def get_camera_by_name(self, name):
        for camera in self.bootstrap["cameras"]:
            if camera["name"] == name:
                return camera

        return None




