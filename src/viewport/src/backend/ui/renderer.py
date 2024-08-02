from backend.cmdsrv import SimpleCommandServer
from context import GlobalFactory


class SimpleUIRenderer(SimpleCommandServer.BaseCommand):
    def __init__(self, layout, player_urls, output_dir):
        self._logger = GlobalFactory.get_logger().get_child(SimpleUIRenderer.__class__.__name__)
        self._layout = layout
        self._player_urls = player_urls
        self._output_dir = output_dir

    def run(self):
        super().run()

        self._logger.debug("Rendering UI with layout: '{layout}'".format(layout=self._layout))

        with open("{dir}/index.html".format(dir=self._output_dir), "w") as rendered_file:
            rendered_file.write(
                self._layout.render(self._player_urls))

