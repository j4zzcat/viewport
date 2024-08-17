import os
import tomllib

from backend.logger import SimpleLogger


class GlobalFactory:
    def __init__(self):
        self._root_logger = SimpleLogger()
        self._root_logger.set_level("INFO")
        self._logger = self._root_logger.get_child("GlobalFactory")

        self._properties = self._initialize_properties()
        self._command_server = None
        self._web_server = None
        self._unifi_protocol_controller = None
        self._rtsp_protocol_controller = None
        self._counters = {}

    def _initialize_properties(self):
        properties = {}

        # Important dirs
        here_dir = os.path.dirname(os.path.abspath(__file__))
        root_dir = "{here}/../../..".format(here=here_dir)

        properties["dirs"] = {
            "root": root_dir,
            "viewport_root": "{root_dir}/src/viewport".format(root_dir=root_dir),
            "reflector_root": "{root_dir}/src/reflector".format(root_dir=root_dir),
            "player_root": "{root_dir}/src/player".format(root_dir=root_dir),
        }

        # Web root dir
        if "RAM_FS" in os.environ:
            if os.path.isdir(os.environ["RAM_FS"]):
                data_dir = "{ram_fs}/viewport".format(ram_fs=os.environ["RAM_FS"])
        else:
            data_dir = "{home}/.viewport".format(home=os.environ["HOME"])

        os.makedirs(data_dir, exist_ok=True)
        properties["dirs"]["data_dir"] = os.path.abspath(data_dir)

        # Settings.toml
        with open("{viewport_root}/resource/settings.toml".format(
                viewport_root=properties["dirs"]["viewport_root"]), "rb") as f:
            properties["settings"] = tomllib.load(f)

        properties["args"] = {}

        return properties

    def get_properties(self, key=None):
        if key is None:
            return self._properties
        else:
            return self._properties[key]

    def set_property(self, section, key, value):
        if section not in self._properties:
            from backend.error import ApplicationException
            raise ApplicationException("Section {section} is not defined".format(section=section))
        self._properties[section][key] = value

    def get_settings(self):
        return self._properties["settings"]

    def get_dirs(self):
        return self._properties["dirs"]

    def get_args(self):
        return self._properties["args"]

    def get_logger(self):
        return self._root_logger

    def get_command_server(self):
        if not self._command_server:
            from backend.cmdsrv import SimpleCommandServer
            self._logger.debug("Creating {clazz} Singleton".format(clazz=SimpleCommandServer))
            self._command_server = SimpleCommandServer()

        return self._command_server

    def get_process_server(self):
        from backend.procsrv import SimpleProcessServer
        self._logger.debug("Creating {clazz} instance".format(clazz=SimpleProcessServer))
        return SimpleProcessServer()

    def new_streams_cli_command(self, layout, urls):
        from cli.commands import Streams
        self._logger.debug("Creating new {clazz} instance".format(clazz=Streams))
        return Streams(layout, urls)

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

    def new_transcoding_controller(self):
        from backend.protocols.rtsp import SimpleTranscodingController
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleTranscodingController))
        return SimpleTranscodingController()

    def new_transcoding_streaming_server(self, transcoders, bind, port):
        from backend.protocols.rtsp import SimpleTranscodingStreamingServer
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleTranscodingStreamingServer))
        return SimpleTranscodingStreamingServer(transcoders, bind, port)

    def new_transcoding_file_server(self, transcoders, bind, port):
        from backend.protocols.rtsp import SimpleTranscodingFileServer
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleTranscodingFileServer))
        return SimpleTranscodingFileServer(transcoders, bind, port)

    def new_ui_renderer(self, layout, player_urls, directory):
        from backend.ui.renderer import SimpleUIRenderer
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleUIRenderer))
        return SimpleUIRenderer(layout, player_urls, directory)

    def get_web_server(self, directory, bind=None, port=None):
        if not self._web_server:
            from backend.httpd import SimpleWebServer
            self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleWebServer))
            self._web_server = SimpleWebServer(directory, bind, port)

        return self._web_server

    def next_number(self, counter):
        if counter not in self._counters:
            self._counters[counter] = 0

        self._counters[counter] += 1
        return self._counters[counter]


GlobalFactory = GlobalFactory()
