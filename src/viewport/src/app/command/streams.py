import concurrent
from urllib.parse import urlparse

from app.context import Context
from app.error import ApplicationException
from app.executer import SimpleExecuter
from app.unifi.api import SimpleUnifiApi


class StreamsCommand:
    def __init__(self, layout, urls):
        self._logger = Context.get_logger().get_child(self.__class__.__name__)
        self._layout = layout
        self._urls = urls

    def initialize(self):
        self._logger.debug("Initializing")

        self._layout = self._parse_layout(self._layout)
        self._logger.debug("Parsed layout: {layout}".format(layout=self._layout))

        self._urls = self._parse_urls(self._urls)
        self._logger.debug("Parsed URLs: {urls}".format(urls=self._urls))

        self._unique_protocols = {url.scheme for url in self._urls}
        self._logger.debug("Unique protocols: {protocols}".format(protocols=self._unique_protocols))

        self._unifi_urls = [url for url in self._urls if url.scheme == "unifi"]
        self._rtsp_urls = [url for url in self._urls if url.scheme == "rtsp"]
        self._rtsps_urls = [url for url in self._urls if url.scheme == "rtsps"]

        self._unique_unifi_controllers = {url.netloc for url in self._urls if url.scheme == 'unifi'}
        self._logger.debug("Unique Unifi Controllers: {controllers}".format(controllers=self._unique_unifi_controllers))

    def run(self):
        self._logger.debug("Running")

        if "unifi" in self._unique_protocols:
            self._reflector_controller = Context.create_reflector_controller()
            Context.get_executer().submit(
                self._reflector_controller,
                mode="async_thread"
            )

            self._logger.debug("Preparing livestream urls")
            self._protect_apis = self._create_unifi_apis(list(self._unique_unifi_controllers))
            self._livestream_urls = self._get_livestream_urls(self._unifi_urls, self._protect_apis)



            # for k, v in self._protect_apis.items():
            #     print(k)
            #     print(v)


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
            pass

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

    def _create_unifi_apis(self, netlocs):
        futures = {}
        for netloc in netlocs:
            futures[netloc] = Context.get_executer().submit(
                SimpleUnifiApi.Thingy(Context.create_unifi_api(netloc)),
                mode="async_thread"
            )

        concurrent.futures.wait(list(futures.values()))
        return {k: v.result() for k, v in futures.items()}

    def _get_livestream_urls(self, urls, protect_apis):
        # Create a list of cameras name=id for every unifi controller
        cameras_by_netloc = {}
        for netloc, protect_api in self._protect_apis.items():
            cameras_name_to_id = {}
            for camera in protect_api._bootstrap["cameras"]:
                cameras_name_to_id[camera["name"]] = camera["id"]
            cameras_by_netloc[netloc] = cameras_name_to_id

        self._logger.debug("Cameras by netloc: {cameras_by_netloc}".format(cameras_by_netloc=cameras_by_netloc))

        # Create a list of urls of the cameras
        livestream_urls = []
        for url in urls:
            self._logger.debug("Processing url.path: {path}".format(path=url.path))
            path = url.path[1:]  # remove leading '/'

            if path == "_all":
                for camera_id in cameras_by_netloc[url.netloc].values():
                    livestream_urls.append("{netloc}/{camera_id}".format(
                        netloc=url.netloc,
                        camera_id=camera_id))
            else:
                for camera_name in path.split(","):
                    camera_id = cameras_by_netloc[url.netloc][camera_name]
                    livestream_urls.append("{netloc}/{camera_id}".format(
                        netloc=url.netloc,
                        camera_id=camera_id))
        
        self._logger.debug(f"Livestream urls: {livestream_urls}")
        return livestream_urls
