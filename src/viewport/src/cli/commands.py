import os
from urllib.parse import urlparse

from context import GlobalFactory
from backend.ui.grid import GridLayout
from backend.cmdsrv import Command
from backend.error import ApplicationException


class Streams(Command):
    def __init__(self, layout, urls):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)

        self._layout = layout
        self._urls = urls

    def run(self):
        # Parse URLs and Layout
        self._layout = self._parse_layout(self._layout)
        self._urls = self._parse_urls(self._urls)

        # Iterate over the unique protocols and start the necessary infrastructure
        # to serve them. For unifi, this is the UnifiReflector Server, for rtsp(s) this
        # is the aiohttp web server and additional components based on the target
        # transcoded format.
        protocol_controllers = {}
        for protocol in {url.scheme for url in self._urls}:
            protocol_controllers[protocol] = eval(
                "GlobalFactory.get_{protocol}_protocol_controller()".format(
                    protocol=protocol))

            protocol_controllers[protocol].run()

        # Iterate over the URLs in the order received. Create the livestream controller
        # for each url. Depending on the input url, (such as in the case of 'unifi://u:p@host/_all'),
        # more than one livestream instance may be returned. Save the endpoint of each
        # livestream for the next step.
        player_endpoints = []
        for url in self._urls:
            livestreams = protocol_controllers[url.scheme].new_livestream(url)
            player_endpoints += [livestream.get_endpoint() for livestream in livestreams]
            [livestream.start() for livestream in livestreams]

        # Render the web page
        html_dir = "{data_dir}/web_server".format(
            data_dir=GlobalFactory.get_dirs()["data_dir"])
        os.makedirs(html_dir, exist_ok=True)

        GlobalFactory.new_ui_renderer(self._layout, player_endpoints, html_dir).run()

        GlobalFactory.get_command_server().submit(
            GlobalFactory.get_web_server(html_dir))

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
                    self._logger.add_redaction(parsed_url.password)

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

