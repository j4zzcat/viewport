# frozen_string_literal: true

require "logging"
require "stringio"

layout = Logging.layouts.pattern \
  pattern: "[%d] %-5l %c %m\n",
  date_pattern: "%Y-%m-%d %H:%M:%S.%6N"

class RedactingAppender < ::Logging::Appenders::IO
  class Writer
    def write(message)
      puts message.gsub("a", "X")
    end
  end

  def initialize(layout)
    super(name, Writer.new, { layout: layout} )
  end

  def method_missing(method_name, *args, &block)
    if respond_to?(method_name)
      send(method_name, *args, &block)
    else
      super
    end
  end

  def respond_to_missing?(method_name, include_private = false)
    super(method_name, include_private)
  end

end

# Logging.logger.root.appenders =
Logging.logger.root.appenders = RedactingAppender.new(layout)
