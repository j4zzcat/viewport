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

import subprocess

from context import GlobalFactory


class SimpleWebServer:
    def __init__(self):
        self._logger = GlobalFactory.get_logger().getChild(__class__.__name__)
        self.root_dir = GlobalFactory.get_dirs()["web_root_dir"]
        self.bind = GlobalFactory.get_settings()["httpd"]["bind"]
        self.port = GlobalFactory.get_settings()["httpd"]["port"]

    def run(self):
        process_controller = GlobalFactory.get_process_server().new_process(
            "static-web-server",
                "-p", self.port,
                "-d", self.root_dir,
                "-w", "{viewport_root}/resource/sws.toml".format(viewport_root=GlobalFactory.get_dirs()["viewport_root"]),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            monitor=True)

        process_controller.start()
        self._logger.info("Simple Web Server is ready, HTTP: {bind}:{port}".format(
            bind=self.bind, port=self.port))
