from urllib.parse import urlparse

from logger import Logger
from error import ApplicationException
from reflector import ReflectorController


class StreamsCommand(object):
    def __init__(self, layout, urls):
        self._logger = Logger.getChild(StreamsCommand.__name__)

        self._logger.info("Initializing...")
        self._layout = self.parse_layout(layout)
        self._urls = self.parse_urls(urls)
        self._unique_protocols = {url.scheme for url in self._urls}
        self._unique_unifi_controllers = {url.netloc for url in self._urls if url.scheme == 'unifi'}

        self._logger.debug("Parsed URLs: {urls}".format(urls=self._urls))
        self._logger.debug("Parsed layout: {layout}".format(layout=self._layout))
        self._logger.debug("Unique protocols: {protocols}".format(protocols=self._unique_protocols))
        self._logger.debug("Unique Unifi Controllers: {controllers}".format(controllers=self._unique_unifi_controllers))

    def start(self):
        self._logger.info("Running")
        self.reflector_controller = ReflectorController()
        self.reflector_controller.start()

    def parse_layout(self, layout):
        return ["grid", 3, 3]

    def parse_urls(self, urls):
        parsed_urls = []
        for url in urls:
            try:
                parsed_url = urlparse(url)
                if parsed_url.password:
                    self._logger.addRedaction(parsed_url.password)

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

