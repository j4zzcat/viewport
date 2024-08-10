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

from aiohttp import web

from backend.cmdsrv import SimpleCommandServer
from context import GlobalFactory


class SimpleWebServer(SimpleCommandServer.BaseCommand):
    def __init__(self):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)

        self._bind = GlobalFactory.get_settings()["httpd"]["bind"]
        self._port = GlobalFactory.get_settings()["httpd"]["port"]
        self._root_dir = GlobalFactory.get_dirs()["web_root"]

    def run(self):
        self._logger.info("Simple Web Server is ready, HTTP: {bind}:{port}".format(bind=self._bind, port=self._port))
        logging.getLogger("aiohttp").handlers = None

        app = web.Application()
        app.add_routes([web.static("/", self._root_dir)])
        web.run_app(app, host=self._bind, port=self._port)

