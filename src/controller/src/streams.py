from urllib.parse import urlparse

from logger import Logger
from error import ApplicationException, ApplicationFatal


class StreamsCommand(object):
    def __init__(self, layout, urls):
        self._logger = Logger.getChild(StreamsCommand.__name__)
        self._logger.debug("Starting...")

        self._layout = self.parse_layout(layout)
        self._urls = self.parse_urls(urls)
        self._protocols = {url.scheme for url in self._urls}

        self._logger.debug("Unique protocols: {protocols}".format(
            protocols=self._protocols))

    def parse_layout(self, layout):
        return ["grid", 3, 3]

    def parse_urls(self, urls):
        parsed_urls = []
        for url in urls:
            try:
                parsed_url = urlparse(url)
                scheme = parsed_url.scheme
                if scheme not in ["unifi", "rtsp", "rtsps"]:
                    raise ApplicationException(
                        "Unsupported scheme: '{scheme}' in url: '{parsed_url}'".format(
                            scheme=scheme,
                            parsed_url=url))

                parsed_urls.append(parsed_url)

            except (ValueError, ApplicationException) as e:
                self._logger.error("Failed to parse url: '{url}', error: '{error}'".format(
                    url=url,
                    error=e))

                raise ApplicationFatal(e)

        return parsed_urls

