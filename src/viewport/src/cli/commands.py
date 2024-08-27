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

import os
from urllib.parse import urlparse

from backend.ui.lm import LargeMediumLayout
from context import GlobalFactory
from backend.ui.grid import GridLayout
from backend.error import ApplicationException


class Streams:
    def __init__(self, layout, urls):
        self._logger = GlobalFactory.get_logger().getChild(self.__class__.__name__)

        self._layout = layout
        self._urls = urls

    def run(self):
        # Parse URLs and Layout
        self._layout = self._parse_layout(self._layout)
        self._urls = self._parse_urls(self._urls)

        # From the urls, create a set of the unique protocols needed. Iterate over the
        # protocols and start the necessary infrastructure of each.
        protocol_controllers = {}
        for protocol in {url.scheme for url in self._urls}:
            protocol_controllers[protocol] = eval(
                "GlobalFactory.get_{protocol}_protocol_controller()".format(
                    protocol=protocol))

            protocol_controllers[protocol].run()

        # Iterate over the URLs in the order received. Create the livestream controller
        # for each url. Depending on the input url, (such as in the case of 'unifi://.../_all'),
        # more than one livestream instance may be returned. Save the endpoint of each
        # livestream for the next step.
        player_endpoints = []
        for url in self._urls:
            livestreams = protocol_controllers[url.scheme].new_livestream(url)
            player_endpoints += [livestream.endpoint for livestream in livestreams]
            [livestream.start() for livestream in livestreams]

        # Render the web page
        data_dir = GlobalFactory.get_dirs()["web_root_dir"]
        html_dir = f"{data_dir}/html"
        os.makedirs(html_dir, exist_ok=True)
        GlobalFactory.new_ui_renderer(self._layout, player_endpoints, html_dir).run()

        # Start the web server
        GlobalFactory.get_web_server().run()

        # Leave MainThread free for signal handling

    def _parse_layout(self, layout):
        self._logger.debug("Parsing layout: {layout}".format(layout=layout))

        parsed_layout = None
        name = layout.split(":")[0]
        if name == "grid":
            params = layout.split(":")[1]
            rows = int(params.split("x")[0])
            columns = int(params.split("x")[1])
            parsed_layout = GridLayout(rows, columns)

        elif name == "lm":
            params = layout.split(":")[1]
            large_cell_ids = params.lower().split(",")
            parsed_layout = LargeMediumLayout(large_cell_ids)

        else:
            raise ApplicationException("Unknown layout: {layout}".format(layout=layout))

        self._logger.debug("Parsed layout: {result}".format(result=parsed_layout))
        return parsed_layout

    def _parse_urls(self, urls):
        self._logger.debug("Parsing URLs")

        parsed_urls = []
        for url in urls:
            try:
                parsed_url = urlparse(url)
                if parsed_url.password:
                    self._logger.debug("Adding redaction", extra={"add_redaction": parsed_url.password})

                self._logger.debug("Parsing URL: {url}".format(url=url))
                scheme = parsed_url.scheme
                if scheme not in ["unifi", "rtsp", "rtsps"]:
                    raise ApplicationException(
                        "Unsupported protocol: '{scheme}' in url: '{parsed_url}'".format(
                            scheme=scheme,
                            parsed_url=url))

                parsed_urls.append(parsed_url)

            except (ValueError, ApplicationException) as e:
                raise ApplicationException("Failed to parse url: '{url}', error: '{error}'".format(
                    url=url,
                    error=e))

        self._logger.debug("Parsed URLs: {parsed_urls}".format(parsed_urls=parsed_urls))
        return parsed_urls

