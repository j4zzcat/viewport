module Viewport
  class Backend

    def initialize(streams, layout, verbose)
      @streams = streams
      @layout = layout
      @verbose = verbose
    end

    def run()
      puts "run"
      puts @streams
      puts @layout
      puts @verbose

    end
  end
end