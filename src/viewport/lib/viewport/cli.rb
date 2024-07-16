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

      verbose = false
      global_option("-V", "--verbose", "Be verbose") do
        verbose = true
      end

      program :help, "Example", "viewport streams --layout grid:3x3 'unifi://u:p@192.168.4.10/pool camera, shed 3'"

      command :streams do |c|
        c.syntax = "viewport streams [--layout LAYOUT] url..."
        c.description = <<~HEREDOC
          This command displays video streams according to an (optional) layout. Video streams are
          specified as a URL, with any of the supported protocols.  This command uses  `ffmpeg` in
          the background to reflect the video streams to a Media Server, where they are transcoded
          to a format suitable for live web presentation (H.264 fMP4 or FLV). The exact processing
          pipeline depends on the protocol. Obviously, for the lowest possible latency, prefer  to
          use the native protocol of the NVR.

            (1) For the Unifi Protect low latency H.264 fMP4 video stream, use the 'unifi' 
                protocol as follows:

                * To specify all cameras of a Unifi Protect Controller (i.e., UNVR):
                  unifi://username:password@controller-address/_all

                * To specify specific cameras and/or layout order:
                  unifi://username:password@controller-address/camera name 1, ..., camera name N

            (2) For the Real Time Streaming Protocol, use the 'rtsp' or 'rtsps' (secured)
                protocols.

          Don't forget to  put a `'` (single quote) around  URLs with special characters  in them,
          such as spaces (' '), commas (',') or ampersands ('&') etc.
        HEREDOC

        c.option "--layout=LAYOUT", <<~HEREDOC
          Layout to use. Supported layouts are: grid and lms.
          :RowsxColumns and lms:L,M,S.
          [Default: grid:3x3].'
        HEREDOC

        c.action do |args, options|
          options.default layout: "grid:3x3"
          backend = Viewport::Backend.new(args, options.layout, verbose)
          backend.run()

        end
      end

      run!
    end
  end
end

