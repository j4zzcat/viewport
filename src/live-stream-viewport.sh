#! /bin/bash

function log() {
    [[ -z "$verbose" ]] && return
    local message="$1"
    local now=$(date +'%y-%m-%d %h:%m:%s')
    echo "[$now] $message" >/dev/stderr
}

function panic() {
    local error_message="$1"
    log "panic. $error_message"
    exit 128
}

function usage() {
    echo "usage: $(basename $0) [-vh] [-o <output-dir>] [-l <layout>] -s <id=rtsp-url>..."
}

function help() {
    cat <<EOF
NAME:
    $(basename $0) - View rtsp/rtsps streams in a web browser.

SYNOPSIS:
    This program offers a simple  method to display multiple, side-by-side real
    time streaming protocol (RTSP)  streams in a  web browser, making  it ideal
    for passive, security cameras view-only scenarios (i.e., 'kiosk').

    The program starts by generating a simple web page for viewing the supplied
    streams ('viewport'),  and then by running in  the background,  for each of
    the streams,  a transcoder program (ffmpeg) that translates  the RTSP/RTSPS
    stream into a http live stream (hls) stream. These HLS streams are suitable
    for easy consumption by the previously generated web page.

    Note: A web server is needed to serve the viewport and streams.

USAGE:
    $(basename $0) [-o <output-dir>] [-l <layout>] -s <id=url>...

STANDARD OPTIONS:
    -v                Be verbose.
    -h, --help        Print this help and exit.

OPTIONS:
    -o <output-dir>   Directory where the output should go [default: .]
    -l <layout>       Viewport layout in rows x columns format [default: 2x2]
    -s <id=url>       Stream id and url in the form of 'id=rtsp[s]://address.'

EXAMPLE:
    The following is used to view two streams,  side by side,  in a 1x2 layout.
    The streams  are transcoded concurrently  in the background.  The resulting
    temporary files are stored in /var/www/htdocs,  which is expected to be the
    root  directory  of the  web server.  The viewport can then be accessed  by
    navigating to: http://localhost/viewport.html.

    $(basename $0) \\
      -o /var/www/htdocs \\
      -l 1x2 \\
      -s 'door-camera=rtsps://192.168.4.10/d3xxdde0xa9jn' \\
      -s 'pool-camera=rtsps://192.168.4.10/f1gzgge0xt1sn?nightmode=false'

EOF
}

# Functions
function parse_output_dir() {
  local output_dir="$1"

  log "$output_dir"
}

function parse_layout() {
  local layout="$1"

  log "$layout"
}

function parse_streams() {
  local array_name="$1"[@]
  local streams=("${!array_name}")

  log "${streams[*]}"
}

# Main

# Defaults
DEFAULT_OUTPUT_DIR='.'
DEFAULT_LAYOUT='2x2'
streams=()

# Usage and --help, getopt on macos doesn't have long options
if [[ $# -eq 0 ]]; then
    usage && exit 128
elif [[ "$1" == "--help" ]]; then
  help && exit 0
fi

# parse command line
error_message_file=$(mktemp /tmp/XXXXX)
valid_args=$(getopt vho:l:s: "$@" 2>"$error_message_file")
if [[ $? -ne 0 ]]; then
    echo "error. $(cat "$error_message_file")" 2>/dev/stderr
    usage && exit 129
fi

eval set -- "$valid_args"
while :; do
  case "$1" in
    -v | --verbose)
      verbose='true'
      log "parsing 'verbose' option"
      shift 1
      ;;

    -h | --help)
      log "parsing 'help' option"
      help && exit 0
      ;;

    -o | --output-dir)
      log "parsing 'output-dir' option, input is '$2'"
      output_dir="$2"
      shift 2
      ;;

    -l | --layout)
      log "parsing 'layout' option, input is '$2'"
      layout="$2"
      shift 2
      ;;

    -s | --stream)
      log "parsing 'stream' option, input is '$2'"
      streams+=("$2")
      shift 2
      ;;

    --) shift;
      break
      ;;
  esac
done

output_dir=$(parse_output_dir "$output_dir" "$DEFAULT_OUTPUT_DIR")
layout=$(parse_layout "$layout")
streams=$(parse_streams streams)


#      stream_id=$(echo "$2" | awk -f '=' '{print $1}')
#      stream_ids="$stream_ids $stream_id"
#      url=$(echo "$2" | awk -f '=' '{print $2}')

      #stream_transcode "$stream_id" "$url"
