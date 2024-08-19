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

"""Viewport - Display livestream videos in a simple, unattended web page.

Usage:
  viewport [-v] streams [--layout=<layout>] <url>...
  viewport [--version] [--help]

Options:
  -v, --verbose           Be verbose.
  -l, --layout=<layout>   The layout to use. Supported layouts: grid. [Default: grid:3x3]
  <url>                   The URL of a live video stream. Supported protocols: unifi and rtsp(s).
                          Unifi protocol takes the form of unifi://u:p@host/(_all|camera name,...)
                          Rtsp(s) protocol takes the form of rtsp(s)://url(::format)

Example:
  Display Unifi Protect and RTPSP streams, side by side, transcode the RTSP stream to MPEG-TS
  for lower latency:

    $ viewport \\
         streams --layout grid:3x3 \\
             'unifi://username1:password1@192.168.4.10/_all' \\
             'unifi://username2:password2@192.168.12.10/NE Gate,Homestead 2,Pool' \\
             'rtsps://192.168.4.10:7441/DEVTOTALX1X?nightVision=off' \\
             'rtsp://192.168.106.10:7441/C0FFEE0X1XY::mpegts'

  Then open the url 'http://localhost:8001' in Google Chrome web browser.
"""
import signal
import sys

from docopt import docopt
import logging

from context import GlobalFactory
from backend.error import ApplicationException


def main():
    settings = GlobalFactory.get_settings()
    logger = logging.getLogger("main")

    args = docopt(
        __doc__,
        version="Viewport {version}".format(version=settings["version"]))

    if len(sys.argv) == 1:
        print("Viewport - Display livestream videos in a simple, unattended web page.")
        print("Try 'viewport --help' for more information.")
        exit(0)

    # if args['--verbose']:
    #     GlobalFactory.get_logger().set_level(logging.DEBUG)

    if args["streams"]:
        logger.info("Hello!")
        logger.debug("Processing 'streams' command")

        try:
            GlobalFactory.new_streams_cli_command(
                layout=args['--layout'],
                urls=args['<url>']).run()

        except ApplicationException as e:
            print("Fatal error, stopping. Exit code: 127")
            exit(127)


if __name__ == '__main__':
    main()

