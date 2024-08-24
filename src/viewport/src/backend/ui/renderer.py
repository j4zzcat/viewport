import glob
import logging
import os
import shutil
import subprocess

from context import GlobalFactory


class SimpleUIRenderer:
    def __init__(self, layout, livestream_endpoints, directory):
        self._logger = GlobalFactory.get_logger().getChild(self.__class__.__name__)
        self._layout = layout
        self._livestream_endpoints = livestream_endpoints
        self._output_dir = directory

    def run(self):
        self._logger.debug("Rendering UI with layout: '{layout}' to '{dir}'".format(
            layout=self._layout.__class__.__name__,
            dir=self._output_dir))

        with open("{dir}/index.html".format(dir=self._output_dir), "w") as rendered_file:
            rendered_file.write(
                self._layout.render(self._livestream_endpoints))

        # Copy the player bundle to output_dir
        self._logger.debug("Copying player bundle to output directory")

        os.environ["DIST_DIR"] = self._output_dir
        subprocess.run(["npx", "webpack"],
            cwd=GlobalFactory.get_dirs()["player_root"],
            capture_output=True)

        # Copy favicon
        self._logger.debug("Copying favicon output directory")
        for filename in glob.glob(os.path.join("{viewport_root}/resource/backend/ui/favicon/*".format(
                viewport_root=GlobalFactory.get_dirs()["viewport_root"]))):
            shutil.copy(filename, self._output_dir)

