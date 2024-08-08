import os
import subprocess
import urllib

import requests
import json

from context import GlobalFactory
from backend.cmdsrv import SimpleCommandServer
from backend.error import ApplicationException
from backend.protocol import AbstractProtocolController, AbstractLivestreamController


class SimpleUnifiProtocolController(AbstractProtocolController):
    class LivestreamController(AbstractLivestreamController):
        def __init__(self, reflector_controller, url):
            self._reflector_controller = reflector_controller
            self._url = url

        def get_type(self) -> str:
            return "unifi"

        def get_url(self):
            return {
                "scheme": "ws",
                "port": self._reflector_controller.port,
                "path": "/unifi://{url}".format(url=self._url)
            }

    def __init__(self):
        super().__init__()
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._reflector_controller = None
        self._apis = {}

    def initialize(self):
        super().initialize()

    def run(self):
        super().run()
        self._reflector_controller = GlobalFactory.new_unifi_reflector_controller()
        GlobalFactory.get_command_server().run_asynchronously(
            self._reflector_controller)
        return self

    def create_livestream_controller(self, url):
        url = urllib.parse(url) if isinstance(url, str) else url
        host = url.netloc.split('@')[1]

        key = "{username}:{host}".format(username=host, host=host)
        if key not in self._apis:
            self._apis[key] = SimpleUnifiProtectApi(url.username, url.password, host)
            self._apis[key].login()

        livestreams = []
        path = url.path[1:]  # remove leading '/'

        if path == "_all":
            # handle unifi://u:p@host/_all

            for camera in self._apis[key].bootstrap["cameras"]:
                livestreams.append(SimpleUnifiProtocolController.LivestreamController(
                    self._reflector_controller,
                    "{netloc}/{camera_id}".format(
                        netloc=url.netloc,
                        camera_id=camera["id"])))
        else:
            # handle unifi://u:p@host/camera name 1,...

            for camera_name in path.split(","):
                camera = self._apis[key].get_camera_by_name(camera_name)
                if camera is None:
                    raise ApplicationException("Camera '{camera_name}' not found in Unifi Protect Controller: {host}".format(
                        camera_name=camera_name, host=self._apis[key].host))

                camera = self._apis[key].get_camera_by_name(camera_name)
                livestreams.append(SimpleUnifiProtocolController.LivestreamController(
                    self._reflector_controller,
                    "{netloc}/{camera_id}".format(
                        netloc=url.netloc,
                        camera_id=camera["id"])))

        return livestreams


class SimpleReflectorController(SimpleCommandServer.BaseCommand):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._reflector_process = None
        self._reflector_logger = None
        self.bind = GlobalFactory.get_settings()["protocol"]["unifi"]["reflector"]["bind"]
        self.port = GlobalFactory.get_settings()["protocol"]["unifi"]["reflector"]["port"]

    def run(self):
        self._logger.debug("Spawning the SimpleReflector Node process")

        process = GlobalFactory.get_command_server().spwan(
            args=["node", "--no-warnings", "--import", "tsx", "reflector.ts", self.bind, str(self.port)],
            cwd="{reflector_root}/src".format(reflector_root=GlobalFactory.get_directories()["reflector_root"]),
            stdout=subprocess.PIPE,
            preexec_fn=os.setsid,
            text=True)

        self._reflector_process = process
        self._logger.debug("Reflector started, pid: " + str(self._reflector_process.pid))

        self._reflector_logger = GlobalFactory.get_logger().get_child("SimpleReflector:{pid}".format(
            pid=self._reflector_process.pid))

        for line in self._reflector_process.stdout:
            try:
                parsed_line = json.loads(line)
            except json.decoder.JSONDecodeError as e:
                if line.startswith("UNVR"):
                    parsed_line = {"level": "debug", "message": line.strip()}
                else:
                    raise ApplicationException("Failed to parse JSON, offending line: {line}".format(line=line))

            msg = (
                "{message}, context: {context}".format(
                    message=parsed_line["message"],
                    context=parsed_line["context"])
                if "context" in parsed_line
                else parsed_line["message"]
            )

            eval("self._reflector_logger.{level}(msg)".format(level=parsed_line["level"]))


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




