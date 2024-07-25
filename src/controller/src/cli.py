"""Viewport.

Usage:
  viewport streams [--verbose] [--layout=<layout>] <url>...
  viewport [--version] [--help]

Options:
  -v, --verbose      Be verbose.
  --layout=<layout>  The layout to use. Supported layouts are: grid and lms. [Default: grid:3x3]
  <url>              The URL of a live video stream, or controller. Supported protocols are: unifi:// and rtsp(s)://.

Example:
    To view all the cameras of an Unifi Protect Controller at 192.168.4.10:
    viewport streams --layout grid:3x3 unifi://username:password@192.168.4.10/_all

"""
from docopt import docopt
import logging
from logger import Logger
from error import ApplicationException
from version import VERSION
from streams import StreamsCommand

if __name__ == '__main__':
    arguments = docopt(__doc__,
        version="Viewport {version}".format(version=VERSION))

    if arguments['--verbose']:
        Logger.setLevel(logging.DEBUG)

    if arguments["streams"]:
        try:
            streams = StreamsCommand(arguments["--layout"], arguments["<url>"])
            streams.start()
        except ApplicationException as e:
            print("Fatal error, stopping. Exit code: 127")
            exit(127)

