# frozen_string_literal: true
require "uri"

module Viewport
  class Backend
    attr_reader :uris, :unique_schemes

    def initialize(alleged_uris, alleged_layout, verbose)
      @log = Logging.logger[self]
      @uris = validate_uris alleged_uris
      p @uris
      @unique_schemes = @uris.map { |uri| uri.scheme }.uniq
    end

    def run
      @log.debug(@uris)
    end

    private
    def validate_uris(alleged_uris)
      parsed_uris = []
      alleged_uris.each do |alleged_uri|
        begin
          uri = URI(alleged_uri)
          parsed_uris << uri if uri.scheme && uri.host && uri.path

        rescue StandardError => e
          @log.error "Invalid URI: #{alleged_uri}"
          raise Viewport::Error, e
        end

        parsed_uris
      end
    end

  end
end
