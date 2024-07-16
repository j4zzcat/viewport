# frozen_string_literal: true
require "uri"

module Viewport
  class Backend

    def initialize(alleged_urls, alleged_layout, verbose)
      @log = Logging.logger[self]
      @streams = parse_urls alleged_urls
    end

    def run; end

    private
    def parse_urls(alleged_urls)

      alleged_urls.each do |alleged_url|
        begin
          uri = URI(alleged_url)
        rescue URI::InvalidURIError => e
          @log.error "Invalid URL: #{alleged_url}"
          raise Viewport::Error e
        end
      end
    end
  end
end