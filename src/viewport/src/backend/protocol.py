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
from dataclasses import dataclass

from context import GlobalFactory


class AbstractProcessController(ABC):
    @abstractmethod
    def start(self):
        pass

    @abstractmethod
    def stop(self):
        pass

    @abstractmethod
    def on(self, event, *callbacks):
        pass

@dataclass
class Endpoint:
    stream_format: str
    scheme: str
    port: str
    path: str


# Represents and controls a livestream
class AbstractLivestreamController(ABC):
    @property
    @abstractmethod
    def url(self) -> str:
        """Returns the url this live stream represents."""
        pass

    @property
    @abstractmethod
    def transcoder(self) -> str | None:
        """Returns the transcoder name associated with this controller, if any"""
        pass

    @property
    @abstractmethod
    def endpoint(self) -> Endpoint:
        """Returns the endpoint associated with this controller. Based on the stream_format,
         the client selects the appropriate video player"""
        pass

    @abstractmethod
    def start(self):
        pass

    @abstractmethod
    def stop(self):
        pass


class SimpleLivestreamController(AbstractLivestreamController):
    def __init__(self, url, transcoder, endpoint, start_callback=None, stop_callback=None):
        self._logger = GlobalFactory.get_logger().getChild(__class__.__name__)
        self._url = url
        self._transcoder = transcoder
        self._endpoint = endpoint
        self._start_callback = start_callback
        self._stop_callback = stop_callback

    @property
    def url(self) -> str:
        return self._url

    @property
    def transcoder(self) -> str | None:
        return self._transcoder

    @property
    def endpoint(self):
        return self._endpoint

    def start(self):
        self._logger.debug("Starting livestream controller")
        if self._start_callback:
            self._start_callback(self)

    def stop(self):
        self._logger.debug("Stopping livestream controller")
        if self._stop_callback:
            self._stop_callback(self)


class AbstractProtocolController(ABC):
    @abstractmethod
    def run(self):
        pass

    @abstractmethod
    def new_livestream(self, url) -> [AbstractLivestreamController]:
        pass


