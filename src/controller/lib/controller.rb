# frozen_string_literal: true

require_relative "controller/version"

module Controller
  class Error < StandardError; end
  # Your code goes here...
end

require "rubygems"
require "commander"

class MyApplication
  include Commander::Methods

  def run
    program :name, "Viewport"
    program :version, "1.1.0"
    program :description, "Display Unifi and RTSP video streams in a browser"
    never_trace!

    global_option('-V', '--verbose', 'Be verbose')

    command :streams do |c|
      c.syntax = "viewport streams [--layout LAYOUT] --stream url..."
      c.description = "Displays the specified streams in the specified layout."
      c.option "--layout=LAYOUT", "Layout to use. Supported layouts are: grid:RowsxColumns. [Default: grid:3x3]."
      c.option "--stream", 'Video stream URL. Supported protocols are: unifi:// and rtsp[s]://.
For Unifi protocol, use the following format:
  * To specify all cameras of a controller, use: unifi://username:password@controller/all
  * To specify specific cameras and/or display order, use:
    unifi://username:password@controller/camera name 1, camera name 2, ... , camera name N
'
      c.action do |args, options|
        options.default layout: "grid:3x3"
        say "stream"
      end
    end

    run!
  end
end

MyApplication.new.run if $0 == __FILE__

