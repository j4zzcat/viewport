# frozen_string_literal: true

require "rubygems"
require_relative "viewport/version"
require_relative "viewport/error"
require_relative "viewport/logger"
require_relative "viewport/cli"
require_relative "viewport/backend"
require_relative "viewport/reflector-controller"

Viewport::CLI.new.run if $PROGRAM_NAME == __FILE__

