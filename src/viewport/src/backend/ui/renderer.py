import glob
import os
import shutil
import subprocess

from backend.cmdsrv import SimpleCommandServer
from context import GlobalFactory


class SimpleUIRenderer(SimpleCommandServer.BaseCommand):
    def __init__(self, layout, player_urls, output_dir):
        self._logger = GlobalFactory.get_logger().get_child(self.__class__.__name__)
        self._layout = layout
        self._player_urls = player_urls
        self._output_dir = output_dir

    def run(self):
        super().run()

        self._logger.debug("Rendering UI with layout: '{layout}' to '{dir}'".format(layout=self._layout, dir=self._output_dir))

        with open("{dir}/index.html".format(dir=self._output_dir), "w") as rendered_file:
            rendered_file.write(
                self._layout.render(self._player_urls))

        # Copy the player bundle to output_dir
        self._logger.debug("Copying player bundle to output directory")
        os.environ["DIST_DIR"] = os.getcwd() if self._output_dir == "." else self._output_dir
        subprocess.run(["npx", "webpack"],
            cwd=GlobalFactory.get_directories()["player_root"],
            capture_output=True)

        # Copy favicon
        self._logger.debug("Copying favicon output directory")
        for filename in glob.glob(os.path.join("{viewport_root}/resource/backend/ui/favicon/*".format(
                viewport_root=GlobalFactory.get_directories()["viewport_root"]))):
            shutil.copy(filename, self._output_dir)

