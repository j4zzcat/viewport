# frozen_string_literal: true

require "json"

module Viewport
  class ReflectorController
    def initialize
      @log = Logging.logger[self]
      @reflector_log = Logging.logger["Node::Reflector"]
    end

    def start
      @log.info "Starting Node::Reflector..."
      Open3.popen3("node --no-warnings --import tsx src/simple-reflector", chdir: "../reflector") do |stdin, stdout, stderr, wait_thr|
        # Stream stdout and stderr
        stdout.each do |line|
          log line
        end

        stderr.each do |line|
          puts "Child stderr: #{line}"
        end

        # Wait for the process to exit and get the status
        exit_status = wait_thr.value.exitstatus
        puts "Process exited with status: #{exit_status}"
      end
    end

    private

    def log(line)
      parsed = JSON.parse(line)
      message =
        if parsed["mdc"]
          "#{parsed["message"]}, mdc: #{parsed["mdc"]}"
        else
          parsed["message"]
        end

      @reflector_log.send parsed["level"], message
    end
  end
end
