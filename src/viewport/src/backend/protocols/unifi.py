import subprocess
import urllib
import requests
import json

from context import GlobalFactory
from backend.error import ApplicationException
from backend.protocol import AbstractProtocolController, SimpleLivestreamController


class SimpleUnifiProtocolController(AbstractProtocolController):
    def __init__(self):
        super().__init__()
        self._logger = GlobalFactory.get_logger().get_child("UnifiProtocolController")
        self._reflector_logger = self._logger.get_child("Reflector")
        self._reflector_controller = None
        self._apis = {}

    def run(self):
        self._reflector_controller = self._reflector_start()

    def _reflector_start(self):
        controller = GlobalFactory.get_process_server().new_process(
            "node",
                "--no-warnings",
                "--import", "tsx",
                "reflector.ts",
                    GlobalFactory.get_settings()["protocol"]["unifi"]["server"]["streaming"]["bind"],
                    GlobalFactory.get_settings()["protocol"]["unifi"]["server"]["streaming"]["port"],
            cwd="{reflector_root}/src".format(reflector_root=GlobalFactory.get_dirs()["reflector_root"]),
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            stdout_text=True,
            monitor=True)

        controller.on("stdout", self._reflector_log)
        controller.start()
        return controller

    def _reflector_log(self, line):
        try:
            parsed_line = json.loads(line)
        except json.decoder.JSONDecodeError as e:
            line = line.decode("utf-8")
            if line.startswith("UNVR"):
                parsed_line = {"level": "warn", "message": line.strip()}
            else:
                raise ApplicationException(f"Failed to parse JSON, offending line: {line}")

        if "context" in parsed_line:
            msg = "{message}, context: {context}".format(
                message=parsed_line["message"],
                context=parsed_line["context"])
        else:
            msg = parsed_line["message"]

        eval("self._reflector_logger.{level}(msg, extra={{'override': {{'process':'{pid}', 'threadName': 'MainThread' }} }})".format(
            level=parsed_line["level"],
            pid=self._reflector_controller._process.pid))

    def new_livestream(self, url):
        url = urllib.parse(url) if isinstance(url, str) else url
        host = url.netloc.split('@')[1]

        key = host  # maybe should be username:host?
        if key not in self._apis:
            self._apis[key] = SimpleUnifiProtectApi(url.username, url.password, host)
            self._apis[key].login()

        livestreams = []
        path = url.path[1:]  # remove leading '/'

        if path == "_all":
            # handle unifi://u:p@host/_all
            for camera in self._apis[key].bootstrap["cameras"]:
                livestreams.append(SimpleLivestreamController({
                    "original_url": url,
                    "stream_format": "unifi",
                    "scheme": "ws",
                    "port": GlobalFactory.get_settings()["protocol"]["unifi"]["server"]["streaming"]["port"],
                    "path": "{netloc}/{camera_id}".format(
                        netloc=url.netloc,
                        camera_id=camera["id"])
                }))

        else:
            # handle unifi://u:p@host/camera name 1,...
            for camera_name in path.split(","):
                camera = self._apis[key].get_camera_by_name(camera_name)
                if camera is None:
                    raise ApplicationException("Camera '{camera_name}' not found in Unifi Protect Controller: {host}".format(
                        camera_name=camera_name, host=self._apis[key].host))

                camera = self._apis[key].get_camera_by_name(camera_name)
                livestreams.append(SimpleLivestreamController({
                    "original_url": url,
                    "stream_format": "unifi",
                    "scheme": "ws",
                    "port": GlobalFactory.get_settings()["protocol"]["unifi"]["server"]["streaming"]["port"],
                    "path": "{netloc}/{camera_id}".format(
                        netloc=url.netloc,
                        camera_id=camera["id"])
                }))

        return livestreams


class SimpleUnifiProtectApi:
    def __init__(self, username, password, host):
        self._logger = GlobalFactory.get_logger().get_child("{clazz}:{host}".format(
            clazz=self.__class__.__name__,
            host=host))
        self.host = host
        self.username = username
        self.password = password
        self.bootstrap = None
        self._headers = {}

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




