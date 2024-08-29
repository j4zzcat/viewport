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

from jinja2 import Environment, PackageLoader, select_autoescape


class LargeRegularLayout:
    def __init__(self, large_cell_ids):
        self._large_cell_ids = large_cell_ids

    def render(self, livestream_endpoints):
        env = Environment(
            loader=PackageLoader("backend.ui", "template"),
            autoescape=select_autoescape()
        )

        template = env.get_template("lr.html")
        return template.render(layout=self,
            livestream_endpoints=livestream_endpoints,
            large_cell_ids=self._large_cell_ids)

