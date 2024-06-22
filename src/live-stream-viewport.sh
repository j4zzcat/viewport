#! /bin/bash

PID="$$"
PANIC_MESSAGE_FILE=$(mktemp /tmp/XXXXX)
trap "cat $PANIC_MESSAGE_FILE; exit 127" SIGQUIT

graceful_shutdown() {
  echo "Done"
}

log() {
    [[ -z "$VERBOSE" ]] && return
    local _message="$1"
    local now=$(date +'%Y-%m-%d %H:%M:%S')
    echo "[$now] $_message" >/dev/stderr
}

panic() {
    local _message="$1"
    log "$_message"
    echo "$_message" >"$PANIC_MESSAGE_FILE"
    kill -SIGQUIT "$PID"
    exit
}

usage() {
    echo "usage: $(basename $0) [-vh] [-o <output-dir>] [-l <layout>] -s <id=rtsp-url>..."
}

help() {
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
parse_and_validate_output_dir() {
  local _output_dir="$1"
  local _default_output_dir="$2"

  log "Parsing and validating output-dir, input is '$_output_dir'"
  if [ -z "$_output_dir" ]; then
    _output_dir="$_default_output_dir"
    log "Using default output dir '$_output_dir'"
  fi

  [ ! -d "$_output_dir" ] && panic "Error. Directory '$_output_dir' doesn't exist."
  if ! touch "$_output_dir"/touch 2>/dev/null; then panic "Error. Directory '$_output_dir' is not writable."; fi
  rm "$_output_dir"/touch

  echo "$_output_dir"
}

parse_and_validate_layout() {
  local _layout="$1"
  local _default_layout="$2"

  log "Parsing and validating layout, input is '$_layout'"

  if [ -z "$_layout" ]; then
    _layout="$_default_layout"
    log "Using default layout '$_layout'"
  fi

  local _rows=$(echo "$_layout" | awk -F 'x' '{print $1}')
  local _columns=$(echo "$_layout" | awk -F 'x' '{print $2}')
  log "Layout rows=$_rows, layout columns=$_columns"

  local _grid_size=$((_rows * _columns))
  if (( "$_grid_size" < 1 )) || (( "$_grid_size" > "$MAX_GRID_SIZE" )); then panic "Error. Layout grid size of $_grid_size is out of bounds."; fi

  echo "$_rows" "$_columns"
}

parse_and_validate_streams() {
  local _array_name="$1"[@]
  local _streams=("${!_array_name}")

  log "${_streams[*]}"
}

# Main

# Defaults and constants
MAX_GRID_SIZE=30
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
      VERBOSE='true'
      log "Collecting 'verbose' option"
      shift 1
      ;;

    -h | --help)
      log "Collecting 'help' option"
      help && exit 0
      ;;

    -o | --output-dir)
      log "Collecting 'output-dir' option, input is '$2'"
      output_dir="$2"
      shift 2
      ;;

    -l | --layout)
      log "Collecting 'layout' option, input is '$2'"
      layout="$2"
      shift 2
      ;;

    -s | --stream)
      log "Collecting 'stream' option, input is '$2'"
      streams+=("$2")
      shift 2
      ;;

    --) shift;
      break
      ;;
  esac
done

output_dir=$(parse_and_validate_output_dir "$output_dir" "$DEFAULT_OUTPUT_DIR");
layout=$(parse_and_validate_layout "$layout" "$DEFAULT_LAYOUT")
streams=$(parse_and_validate_streams streams)


#      stream_id=$(echo "$2" | awk -f '=' '{print $1}')
#      stream_ids="$stream_ids $stream_id"
#      url=$(echo "$2" | awk -f '=' '{print $2}')

      #stream_transcode "$stream_id" "$url"
