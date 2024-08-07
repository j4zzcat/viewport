import os
import tomllib

from backend.logger import SimpleLogger


class GlobalFactory:
    HERE_DIR = os.path.dirname(os.path.abspath(__file__))

    def __init__(self):
        self._settings = None
        self._root_logger = SimpleLogger()
        self._root_logger.set_level("INFO")
        self._logger = self._root_logger.get_child("GlobalFactory")
        self._command_server = None
        self._unifi_protocol_controller = None
        self._rtsp_protocol_controller = None

    def get_directories(self):
        return {
            "root": "{here}/../../..".format(here=self.HERE_DIR),
            "viewport_root": "{here}/..".format(here=self.HERE_DIR),
            "reflector_root": "{here}/../../../src/reflector".format(here=self.HERE_DIR),
            "player_root": "{here}/../../../src/player".format(here=self.HERE_DIR),
            "srs_root": "/opt/srs"
        }

    def get_settings(self):
        if not self._settings:
            with open("{viewport_root}/resource/settings.toml".format(
                    viewport_root=self.get_directories()["viewport_root"]), "rb") as f:
                self._settings = tomllib.load(f)

        return self._settings

    def get_logger(self):
        return self._root_logger

    def get_command_server(self):
        if not self._command_server:
            from backend.cmdsrv import SimpleCommandServer
            self._logger.debug("Creating {clazz} Singleton".format(clazz=SimpleCommandServer))
            self._command_server = SimpleCommandServer()

        return self._command_server

    def new_process_group(self, name, descriptors, restart=True, stdout=True):
        from backend.cmdsrv import SimpleCommandServer
        self._logger.debug("Creating {clazz} instance".format(clazz=SimpleCommandServer.ProcessGroup))
        return SimpleCommandServer.ProcessGroup(name, descriptors, restart, stdout)

    def new_streams_cli_command(self, layout, urls, output_dir):
        from cli.streams import StreamsCliCommand
        self._logger.debug("Creating new {clazz} instance".format(clazz=StreamsCliCommand))
        return StreamsCliCommand(layout, urls, output_dir)

    def new_web_server(self, directory, host=None, port=None, ):
        from backend.httpd import SimpleWebServer
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleWebServer))
        return SimpleWebServer(directory, host, port)

    def get_unifi_protocol_controller(self):
        if not self._unifi_protocol_controller:
            from backend.protocols.unifi import SimpleUnifiProtocolController
            self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleUnifiProtocolController))
            self._unifi_protocol_controller = SimpleUnifiProtocolController()

        return self._unifi_protocol_controller

    def new_unifi_reflector_controller(self):
        from backend.protocols.unifi import SimpleReflectorController
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleReflectorController))
        return SimpleReflectorController()

    def new_unifi_protect_api(self, netloc):
        from backend.protocols.unifi import SimpleUnifiProtectApi
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleUnifiProtectApi))
        return SimpleUnifiProtectApi(netloc)

    def get_rtsp_protocol_controller(self):
        if not self._rtsp_protocol_controller:
            from backend.protocols.rtsp import SimpleRTSPProtocolController
            self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleRTSPProtocolController))
            self._rtsp_protocol_controller = SimpleRTSPProtocolController()

        return self._rtsp_protocol_controller

    def get_rtsps_protocol_controller(self):
        return self.get_rtsp_protocol_controller()

    def new_ffmpeg_server(self):
        from backend.protocols.rtsp import SimpleFFMpegServer
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleFFMpegServer))
        return SimpleFFMpegServer()

    def new_ui_renderer(self, layout, player_urls, output_dir):
        from backend.ui.renderer import SimpleUIRenderer
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleUIRenderer))
        return SimpleUIRenderer(layout, player_urls, output_dir)


GlobalFactory = GlobalFactory()
