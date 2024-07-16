require "commander"

module Viewport
  class CLI
    include Commander::Methods

    def run
      spec = Gem::Specification.load("viewport.gemspec")

      program :name, "Viewport"
      program :version, "1.1.0"
      program :description, spec.description
      never_trace!

      verbose = false
      global_option("-V", "--verbose", "Be verbose") do
        verbose = true
      end

      command :streams do |c|
        c.syntax = "viewport streams [--layout LAYOUT] url..."
        c.description = "Display the specified video streams in the specified layout."
        c.option "--layout=LAYOUT", "Layout to display on."
        c.action do |args, options|
          options.default layout: "grid:3x3"
          
          backend = Viewport::Backend.new(args, options.layout, verbose)
          backend.run
        end
      end

      run!
    end
  end
end

