# frozen_string_literal: true

# require "logging"
#
# layout = Logging.layouts.pattern \
#   pattern: "[%d] %-5l %c %m\n",
#   date_pattern: "%Y-%m-%d %H:%M:%S.%6N"
#
# Logging.logger.root.appenders = Logging.appenders.stdout "stdout", layout => layout

require "logger"

module Viewport
  class SimpleLogger
    @@loggers = {}
    @@redact = []

    @@formatter = proc do |severity, datetime, progname, msg|
      datetime = datetime.strftime("%Y-%m-%d %H:%M:%S.%6N")

      @@redact.each do |redactor|
        msg = msg.gsub(redactor, "[REDACTED]") unless redactor.nil?
      end

      "[#{datetime}] #{severity} #{progname} #{msg}\n"
    end

    def self.redact(redact)
      @@redact << redact
    end

    def self.logger(name)
      logger = Logger.new(
        STDOUT,
        progname: name,
        formatter: @@formatter
      )

      @@loggers[name] = logger
      logger
    end
  end
end