# frozen_string_literal: true
require "uri"

module Viewport
  class Backend

    def initialize(alleged_urls, alleged_layout, verbose)
      @log = Logging.logger[self]
      @urls = parse_urls alleged_urls
    end

    def run
      @log.debug(@urls)
    end

    private
    def parse_urls(alleged_urls)
      urls = []
      alleged_urls.each do |alleged_url|
        begin
          uri = URI(alleged_url)
          urls << uri if uri.host && uri.path
        rescue URI::InvalidURIError => e
          @log.error "Invalid URL: #{alleged_url}"
          raise Viewport::Error, e
        end
      end
    end
  end
end