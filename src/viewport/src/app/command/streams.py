import os
import subprocess
import tempfile
from urllib.parse import urlparse
from jinja2 import Environment, PackageLoader, select_autoescape

from app.context import Context
from app.error import ApplicationException


class StreamsCommand:
    def __init__(self, layout, urls, output_dir):
        self._logger = Context.get_logger().get_child(self.__class__.__name__)
        self._layout = layout
        self._urls = urls
        self._output_dir = output_dir

    def initialize(self):
        self._logger.debug("Initializing")

        self._layout = self._parse_layout(self._layout)
        self._logger.debug("Parsed layout: {layout}".format(layout=self._layout))

        self._urls = self._parse_urls(self._urls)
        self._logger.debug("Parsed URLs: {urls}".format(urls=self._urls))

        self._unique_protocols = {url.scheme for url in self._urls}
        self._logger.debug("Unique protocols: {protocols}".format(protocols=self._unique_protocols))

        self._unifi_protect_api_by_netloc = {}  # key = u:p@host

    def run(self):
        self._logger.debug("Running")

        self._logger.debug("Creating Player URLs")
        player_urls = self._get_player_urls(self._urls)

        # Start the Reflector if at least one 'unifi' protocol is specified
        if "unifi" in self._unique_protocols:
            self._reflector_controller = Context.create_reflector_controller()
            Context.get_executer().submit(
                self._reflector_controller,
                mode="async_thread"
            )

        self._prepare_viewport_portal(self._layout, player_urls, self._output_dir)

    def dispose(self):
        self._logger.debug("Disposed")

    def _parse_layout(self, layout):
        self._logger.debug("Parsing layout: {layout}".format(layout=layout))

        return ["grid", 3, 3]

    def _parse_urls(self, urls):
        self._logger.debug("Parsing {len} URLs".format(len=len(urls)))

        parsed_urls = []
        for url in urls:
            try:
                parsed_url = urlparse(url)
                if parsed_url.password:
                    self._logger.add_redaction(parsed_url.password)

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

        return parsed_urls

    def _get_player_url_for_unifi_protocol(self, url, unifi_protect_api):
        player_urls = []
        path = url.path[1:]  # remove leading '/'

        if path == "_all":
            for camera in unifi_protect_api.bootstrap["cameras"]:
                player_urls.append("{netloc}/{camera_id}".format(
                    netloc=url.netloc,
                    camera_id=camera["id"]))
        else:
            for camera_name in path.split(","):
                camera = unifi_protect_api.get_camera_by_name(camera_name)
                if camera is None:
                    raise ApplicationException("Camera '{camera_name}' not found in Unifi Protect Controller: {host}".format(
                        camera_name=camera_name, host=unifi_protect_api.host))

                camera_id = unifi_protect_api.get_camera_by_name(camera_name)["id"]
                player_urls.append("{netloc}/{camera_id}".format(
                    netloc=url.netloc,
                    camera_id=camera_id))

        return player_urls

    def _get_player_urls(self, urls):
        player_urls = []
        for url in urls:
            self._logger.debug("Processing url: {url}".format(url=url))

            if url.scheme == 'unifi':
                if url.netloc not in self._unifi_protect_api_by_netloc:
                    upapi = Context.create_unifi_protect_api(url.netloc)
                    upapi.login()

                    self._unifi_protect_api_by_netloc[url.netloc] = upapi

                player_url = self._get_player_url_for_unifi_protocol(url, self._unifi_protect_api_by_netloc[url.netloc])
                self._logger.debug("Player URLs: {urls}".format(urls=player_url))

                player_urls += player_url

            elif "rtsp" or "rtsps" in self._unique_protocols:
                self._logger.debug("Player URL: {url}".format(url=url.netloc))
                pass

        player_urls = ["ws://localhost:4001/{url}".format(url=url) for url in player_urls]
        return player_urls

    def _prepare_viewport_portal(self, layout, player_urls, output_dir):
        self._logger.debug("Preparing viewport portal")

        self._logger.debug("Output directory is '{output_dir}'".format(output_dir=output_dir))

        env = Environment(
            loader=PackageLoader("app"),
            autoescape=select_autoescape()
        )

        self._logger.debug("Generating index.html to: '{output_dir}'".format(output_dir=output_dir))
        template = env.get_template("index.html")
        with open("{output_dir}/index.html".format(output_dir=output_dir), "w") as f:
            f.write(template.render(layout=layout, player_urls=player_urls))

        self._logger.debug("Building and packaging Player to: '{output_dir}'".format(output_dir=output_dir))
        os.environ["DIST_DIR"] = os.getcwd() if output_dir == "." else output_dir
        subprocess.run(["npx", "webpack"],
            cwd=os.path.dirname(os.path.realpath(__file__)) + "/../../../../player",
            capture_output=True
        )

