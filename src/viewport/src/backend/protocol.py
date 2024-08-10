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

from backend.cmdsrv import SimpleCommandServer


class AbstractLivestreamController:

    # Returns a tuple of {stream_format, scheme, port, path} that allows a video player
    # to get and decode the video stream, i.e., by adjusting to the stream_format and then
    # getting the stream from scheme://{js:window.location.hostname}:port/path.
    def get_endpoint(self) -> str:
        pass

    def start(self):
        pass

    def stop(self):
        pass


class AbstractProtocolController(SimpleCommandServer.BaseCommand):
    def create_livestream_controller(self, url) -> [AbstractLivestreamController]:
        pass

