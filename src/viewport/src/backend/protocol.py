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

from abc import ABC, abstractmethod


class AbstractLivestreamController(ABC):

    #
    # Returns a tuple of {original_url, stream_format, scheme, port, path} that allows
    # the viewport web page to get and decode the video stream, i.e., by first selecting
    # the correct player for the stream_format, and then playing the stream from
    # scheme://<js:window.location.hostname>:port/path.
    #
    @abstractmethod
    def get_endpoint(self) -> str:
        pass

    @abstractmethod
    def start(self):
        pass

    @abstractmethod
    def stop(self):
        pass


class AbstractProtocolController(ABC):
    @abstractmethod
    def run(self):
        pass

    @abstractmethod
    def new_livestream(self, url) -> [AbstractLivestreamController]:
        pass


class SimpleLivestreamController(AbstractLivestreamController):
    def __init__(self, endpoint):
        self._endpoint = endpoint

    def get_endpoint(self):
        return self._endpoint

    def start(self):
        pass

    def stop(self):
        pass

