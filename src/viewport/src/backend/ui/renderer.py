#
# This file is part of Viewport.
# By Sharon Dagan <https://github.com/j4zzcat>, Copyright (C) 2024.
#
# Viewport is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option)
# any later version.
#
# This software is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along with
# This software. If not, see <https://www.gnu.org/licenses/>.
#

import glob
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

        # Copy js files
        js_files = glob.glob(
            "{viewport_root}/resource/backend/ui/js/*".format(
                viewport_root=GlobalFactory.get_dirs()["viewport_root"]))

        for file_path in js_files:
            shutil.copy2(file_path, "{web_root_dir}/html".format(web_root_dir=GlobalFactory.get_dirs()["web_root_dir"]))

        # Copy css files
        css_files = glob.glob(
            "{viewport_root}/resource/backend/ui/css/*".format(
                viewport_root=GlobalFactory.get_dirs()["viewport_root"]))

        for file_path in css_files:
            shutil.copy2(file_path, "{web_root_dir}/html".format(web_root_dir=GlobalFactory.get_dirs()["web_root_dir"]))

        # Copy the redirect file
        shutil.copy(
            "{viewport_root}/resource/backend/ui/template/redirect.html".format(
                viewport_root=GlobalFactory.get_dirs()["viewport_root"]),
            "{web_root_dir}/index.html".format(
                web_root_dir=GlobalFactory.get_dirs()["web_root_dir"]))

        # Build and copy the player bundle to output_dir
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

