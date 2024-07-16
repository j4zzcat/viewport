require "commander"

module Viewport
  class CLI
    include Commander::Methods


    def run
      spec = Gem::Specification.load("viewport.gemspec")

      program :name, "Viewport"
      program :version, "1.1.0"
      program :description, spec.description
      default_command :short_help
      never_trace!

      global_option("-V", "--verbose", "Be verbose")

      program :help, "Example", "viewport streams --layout grid:3x3 --stream 'unifi://u:p@192.168.4.10/pool camera, shed 3'"

      command :streams do |c|
        c.syntax = "viewport streams [--layout LAYOUT] --stream url..."
        c.description = "Displays the specified streams in the specified layout."
        c.option "--stream", 'Video stream URL. Supported protocols are: unifi:// and rtsp[s]://.
  For Unifi protocol, use the following format:
    * To specify all cameras of a controller, use: unifi://username:password@controller/all
    * To specify specific cameras and/or display order, use:
      unifi://username:password@controller/camera name 1, camera name 2, ... , camera name N'
        c.option "--layout=LAYOUT", "Layout to use. Supported layouts are: grid:RowsxColumns. [Default: grid:3x3]."
        c.action do |args, options|
          options.default layout: "grid:3x3"

          Viewport::Backend.new(verbose = options.verbose, ).stream

        end
      end

      run!
    end
  end
end

