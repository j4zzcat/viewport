"""Viewport - Display livestream videos in a simple, unattended web page.

Usage:
  viewport streams [--verbose] [--layout=<layout>] [--output-dir=<dir>] <url>...
  viewport [--version] [--help]

Options:
  -v, --verbose           Be verbose.
  -l, --layout=<layout>   The layout to use. Supported layouts: grid. [Default: grid:3x3]
  -o, --output-dir=<dir>  The output directory where web-related files will be
                          written to. [Default: .]
  <url>                   The URL of a live video stream, or controller.
                          Supported protocols: unifi://.

Example:
  To display all the cameras of an Unifi Protect Controller at 192.168.4.10:

    $ viewport streams unifi://username:password@192.168.4.10/_all

  Then open the url 'http://localhost:8001' in Google Chrome web browser.
"""
import sys

from docopt import docopt
import logging

from app.context import Context
from app.error import ApplicationException
from version import Version


def main():
    args = docopt(
        __doc__,
        version="Viewport {version}".format(version=Version))

    if len(sys.argv) == 1:
        print("Viewport - Display livestream videos in a simple, unattended web page.")
        print("Try 'viewport --help' for more information.")
        exit(0)


    logger = Context.get_logger().get_child("Cli")

    if args['--verbose']:
        Context.get_logger().set_level(logging.DEBUG)

    if args["streams"]:
        logger.info("Starting...")
        logger.debug("Processing 'streams' command")

        try:
            Context.get_executer().submit(
                Context.create_streams_command(
                    layout=args['--layout'],
                    urls=args['<url>'],
                    output_dir=args["--output-dir"]))

        except ApplicationException as e:
            print("Fatal error, stopping. Exit code: 127")
            exit(127)


if __name__ == '__main__':
    main()

