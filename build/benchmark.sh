#!/usr/bin/env bash

sample_process() {
  local _process_name="$1"
  local _output_file="$2"
  local _top_log=$(mktemp)

  case "$(uname)" in
    Darwin)
      eval top -pid $(pgrep "$_process_name" | xargs | sed -e 's/ / -pid /g') -l 30 >"$_top_log"
      grep <"$_top_log" -A5 PID | grep -v '^PID' | grep -v '^--' | sort | awk '{print $1, $3}' >"$_output_file"
      ;;

    Linux)
      eval top -p $(pgrep "$_process_name" | xargs | sed -e 's/ / -p /g') -n 30 -b >"$_top_log"
      grep <"$_top_log" -A5 PID | grep -v '^    PID' | grep -v '^--' | sort | awk '{print $1, $9}' >"$_output_file"
      ;;
  esac
}

# Main

top_log_file=$(mktemp)
sample_process 'ffmpeg' "$top_log_file"
for pid in $(sort <"$top_log_file" | awk '{print $1}' | uniq); do
  grep <"$top_log_file" "$pid" | gawk 'BEGIN{s=0}{s=s+$2}END{print '"$pid"', s/NR}'
done


