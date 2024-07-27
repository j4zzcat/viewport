import concurrent
from urllib.parse import urlparse

from app.context import Context
from app.error import ApplicationException
from app.executer import SimpleExecuter


class StreamsCommand:
    def __init__(self, layout, urls):
        self._logger = Context.get_logger().get_child(self.__class__.__name__)
        self._layout = layout
        self._urls = urls
        self._unique_protocols = None
        self._unique_unifi_controllers = None
        self._protect_apis = []

    def initialize(self):
        self._logger.debug("Initializing")

        self._layout = self._parse_layout(self._layout)
        self._logger.debug("Parsed layout: {layout}".format(layout=self._layout))

        self._urls = self._parse_urls(self._urls)
        self._logger.debug("Parsed URLs: {urls}".format(urls=self._urls))

        self._unique_protocols = {url.scheme for url in self._urls}
        self._logger.debug("Unique protocols: {protocols}".format(protocols=self._unique_protocols))

        self._unique_unifi_controllers = {url.netloc for url in self._urls if url.scheme == 'unifi'}
        self._logger.debug("Unique Unifi Controllers: {controllers}".format(controllers=self._unique_unifi_controllers))

    def run(self):
        self._logger.debug("Running")

        if "unifi" in self._unique_protocols:
            self._logger.debug("Processing Unifi streams")

            class UnifiApiThingy(SimpleExecuter.Thingy):
                def __init__(self, unifi_api):
                    self._unifi_api = unifi_api

                def run(self):
                    return self._unifi_api.login()

            futures = []
            for netloc in self._unique_unifi_controllers:
                futures.append(Context.get_executer().submit(
                    UnifiApiThingy(Context.create_unifi_api(netloc)),
                    mode="async_thread"
                ))

            concurrent.futures.wait(futures)

            # for url in self._urls:
            #     self._logger.debug("Processing {url}".format(url=url))
            #
            #     if url.netloc not in self._protect_apis:
            #         protect_api = Context.create_protect_api(url.netloc)
            #         protect_api.login()
            #         self._protect_apis[url.netloc] = protect_api
            #
            #     # self._unifi_controllers_bootstrap[url.netloc]
            #
            #
            #
            #
            # Context.get_executer().submit(
            #     Context.create_reflector_controller(),
            #     mode="async_thread"
            # )

        if "rtsp" or "rtsps" in self._unique_protocols:
            self._logger.debug("Processing RTSP(S) streams")

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
