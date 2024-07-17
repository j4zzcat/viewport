# frozen_string_literal: true

require "uri"

module Viewport
  # Backend
  class Backend
    attr_reader :uris, :unique_schemes

    def initialize(alleged_uris, alleged_layout, verbose)
      @log = Logging.logger[self]
      @uris = validate_uris alleged_uris
      @unique_schemes = @uris.map(&:scheme).uniq
    end

    def run
      @log.debug(@uris)
    end

    private

    def validate_uris(alleged_uris)
      parsed_uris = []
      alleged_uris.each do |alleged_uri|
        Logging.mdc["context"] = "uri=#{alleged_uri}"

        @log.debug "Parsing"

        uri = URI(alleged_uri)
        parsed_uris << uri if uri.scheme && uri.host && uri.path
      rescue StandardError => e
        @log.error "Invalid URI: #{alleged_uri}"
        raise Viewport::Error, e
      ensure
        Logging.mdc.clear
      end
      parsed_uris
    end

  end
end
