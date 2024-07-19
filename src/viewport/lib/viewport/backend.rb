# frozen_string_literal: true

require "uri"
require "open3"

module Viewport
  # Backend
  class Backend
    attr_reader :uris, :unique_schemes

    def initialize(alleged_uris, alleged_layout, verbose)
      @log = SimpleLogger.logger(Backend.name)

      @uris = validate_uris alleged_uris
      @unique_schemes = @uris.map(&:scheme).uniq
      @log.debug "Unique protocols: #{@unique_schemes.join(", ")}"
    end

    def run
      @reflector_controller = ReflectorController.new
      @reflector_controller.start
      # uris.each do |uri|
      #   if uri.scheme == "unifi"
      #     handleUnifiUri(uri)
      #   end
      # end
    end

    private

    def validate_uris(alleged_uris)
      parsed_uris = []
      alleged_uris.each do |alleged_uri|
        @log.debug "Parsing URI: #{alleged_uri}"

        uri = URI(alleged_uri)
        SimpleLogger.redact uri.password
        parsed_uris << uri if uri.scheme && uri.host && uri.path

      rescue StandardError => e
        @log.error "Invalid URI: #{alleged_uri}"

        raise Viewport::Error, e
      end
      parsed_uris
    end

    def handleUnifiUri(uri)
      if @unifi_reflector.nil?

      end
    end
  end


end
