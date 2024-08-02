from urllib.parse import urlparse

from context import GlobalFactory
from backend.layout.grid import GridLayout
from backend.cmdsrv import SimpleCommandServer
from backend.error import ApplicationException

# SRS
# docker run --rm -it -p 1935:1935 -p 1985:1985 -p 8080:8080 \
#     -p 8000:8000/udp -p 10080:10080/udp ossrs/srs:6
#
# RTSP to SRS
# ffmpeg -re \
#   -i 'rtsps://192.168.4.10:7441/kJQJx6iNWalq0GJ0?enableSrtp' \
#   -vcodec copy \
#   -f flv -y rtmp://localhost/live/livestream1
#


class StreamsCliCommand(SimpleCommandServer.BaseCommand):
    def __init__(self, layout, urls, output_dir):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)

        self._layout = layout
        self._urls = urls
        self._output_dir = output_dir
        self._livestreams = []

    def initialize(self):
        super().initialize()

        self._layout = self._parse_layout(self._layout)
        self._urls = self._parse_urls(self._urls)

    def run(self):
        super().run()

        # Iterate over the unique protocols and start the necessary infrastructure
        # to serve them. For unifi, this is the Reflector Server, for rtsp(s) this is
        # the SRS Media Server.
        protocol_controllers = {}
        for protocol in {url.scheme for url in self._urls}:
            protocol_controllers[protocol] = GlobalFactory.get_command_server().run_synchronously(
                eval("GlobalFactory.new_{protocol}_protocol_controller()".format(protocol=protocol)))

        # Iterate over the URLs in the order received.
        # Create the livestream controller for each url. Depending on the input url,
        # such as in the case of 'unifi://u:p@host/_all', several livestream instances
        # may be returned.
        player_urls = []
        for url in self._urls:
            livestreams = protocol_controllers[url.scheme].create_livestream_controller(url)
            self._livestreams += livestreams
            [livestream.start() for livestream in livestreams]
            player_urls += [livestream.get_url for livestream in livestreams]

        # Render the web page
        GlobalFactory.get_command_server().run_synchronously(
            GlobalFactory.new_ui_renderer(player_urls, self._layout, self._output_dir))

        # Serve the web page
        with GlobalFactory.new_web_server("localhost", 8777, self._output_dir) as web_server:
            web_server.serve_forever()

    def _parse_layout(self, layout):
        self._logger.debug("Parsing layout: {layout}".format(layout=layout))

        parsed_layout = None
        name = layout.split(":")[0]
        params = layout.split(":")[1]
        if name == "grid":
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

