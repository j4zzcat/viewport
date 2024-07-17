# frozen_string_literal: true

require "logging"

layout = Logging.layouts.pattern \
  pattern: "[%d] %-5l %c {%X{context}} %m\n",
  date_pattern: "%Y-%m-%d %H:%M:%S.%3N"

Logging.logger.root.appenders = Logging.appenders.stdout(layout: layout)

