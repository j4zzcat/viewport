#
# This file is part of Viewport.
# By Sharon Dagan <https://github.com/j4zzcat>, Copyright (C) 2024.
#
# Viewport is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option)
# any later version.
#
# This software is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along with
# This software. If not, see <https://www.gnu.org/licenses/>.
#

import logging
import os
import shutil
import sys
import tomllib

from backend.logger import ColoringFormatter, ChainHandler, PrefixChopperHandler, OverridesHandler, RedactionsHandler


class GlobalFactory:
    def __init__(self):
        self._root_logger = logging.getLogger("viewport")  # All loggers will be children of this one
        sh = logging.StreamHandler(sys.stdout)
        sh.setFormatter(ColoringFormatter())
        self._root_logger.addHandler(
            ChainHandler(
                PrefixChopperHandler("viewport"),
                OverridesHandler(),
                RedactionsHandler(),
                sh))

        self._root_logger.setLevel(logging.INFO)

        self._logger = self._root_logger.getChild("GlobalFactory")

        self._properties = self._initialize_properties()
        self._command_server = None
        self._process_server = None
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
        web_root_dir = "{home}/.viewport".format(home=os.environ["HOME"])

        # Optimize for Docker container
        if "RAM_FS" in os.environ:
            if os.path.isdir(os.environ["RAM_FS"]):
                web_root_dir = "{ram_fs}/viewport".format(ram_fs=os.environ["RAM_FS"])

        shutil.rmtree(web_root_dir, ignore_errors=True)
        os.makedirs(web_root_dir, exist_ok=True)
        properties["dirs"]["web_root_dir"] = os.path.abspath(web_root_dir)

        # Settings.toml
        with open("{viewport_root}/resource/settings.toml".format(
                viewport_root=properties["dirs"]["viewport_root"]), "rb") as f:
            properties["settings"] = tomllib.load(f)

        properties["args"] = {}

        return properties

    def initialize(self):
        self.get_process_server()
        # self.get_command_server()

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

    def get_process_server(self):
        if not self._process_server:
            from backend.procsrv import SimpleProcessServer
            self._logger.debug("Creating {clazz} instance".format(clazz=SimpleProcessServer))
            self._process_server = SimpleProcessServer()

        return self._process_server

    def new_cli_streams_command(self, layout, urls):
        from cli.commands import Streams
        self._logger.debug("Creating new {clazz} instance".format(clazz=Streams))
        return Streams(layout, urls)

    def get_unifi_protocol_controller(self):
        if not self._unifi_protocol_controller:
            from backend.protocols.unifi import SimpleUnifiProtocolController
            self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleUnifiProtocolController))
            self._unifi_protocol_controller = SimpleUnifiProtocolController()

        return self._unifi_protocol_controller

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

    def new_streaming_transcoding_server(self):
        from backend.protocols.rtsp import SimpleStreamingTranscodingServer
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleStreamingTranscodingServer))
        return SimpleStreamingTranscodingServer()

    def new_file_transcoding_server(self):
        from backend.protocols.rtsp import SimpleFileTranscodingServer
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleFileTranscodingServer))
        return SimpleFileTranscodingServer()

    def new_ui_renderer(self, layout, player_urls, directory):
        from backend.ui.renderer import SimpleUIRenderer
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleUIRenderer))
        return SimpleUIRenderer(layout, player_urls, directory)

    def get_web_server(self):
        if not self._web_server:
            from backend.httpd import SimpleWebServer
            self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleWebServer))
            self._web_server = SimpleWebServer()

        return self._web_server

    def next_int(self, counter):
        if counter not in self._counters:
            self._counters[counter] = 0

        self._counters[counter] += 1
        return self._counters[counter]


GlobalFactory = GlobalFactory()
