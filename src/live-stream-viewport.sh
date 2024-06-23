#! /bin/bash

#
# Utility functions
#

PID="$$"
PANIC_MESSAGE_FILE=$(mktemp /tmp/XXXXX)
trap "cat $PANIC_MESSAGE_FILE; exit 127" SIGQUIT

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

#
# Usage and help functions
#

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

#
# The parse_and_validate_output_dir function is responsible for parsing and
# validating the provided output directory. If the provided directory is null,
# it defaults to a specified directory. It verifies that the directory exists
# and is writable.
#
# Positional parameters:
#   (1) <output_dir>:
#       The desired output directory specified by the user. It can be an empty
#       string, meaning that the function should use the default directory.
#   (2) <default_output_dir>:
#       The default output directory to be used if <output_dir> is empty or null.
#
# Returns:
#   The validated output directory path.
#
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

#
# The parse_and_validate_layout function is responsible for parsing and
# validating a layout string, which specifies a grid in the form of rows and
# columns. If the input layout is null, it defaults to a specified layout. It
# verifies that the grid size is within acceptable bounds.
#
# Positional parameters:
#   (1) <layout>: The desired layout specified by the user in the format NxM,
#       where N is the number of rows and M is the number of columns. It can
#       be an empty string, meaning that the function should use the default
#       layout.
#   (2) <default_layout>: The default layout to be used if <layout> is empty
#       or null.
#
# Returns:
#   The number of rows and columns as separate echoed values.
#
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
  if (( _grid_size < 1 )) || (( _grid_size > MAX_GRID_SIZE )); then panic "Error. Layout grid size of $_grid_size is out of bounds."; fi

  echo "$_rows" "$_columns"
}

#
# The parse_and_validate_streams function is responsible for parsing and
# validating a list of streams provided in the format id=url. It checks if
# each stream has a valid id=url structure, ensures no duplicate IDs exist,
# and verifies that the URLs use supported protocols (RTSP or RTSPS).
#
# Positional parameters:
#   (1)...(N) <stream1> <stream2> ...: A list of streams, each specified in the
#      format id=url.
#
# Returns:
#   A list of validated streams in the format <id=url> <id=url>...
#
parse_and_validate_streams() {
  local _streams=("$@")

  log "Parsing and validating streams, input is '$_streams'"

  local _temp_dir=$(mktemp -d /tmp/XXXXX)
  for _id_url in ${_streams[*]}; do
    log "Parsing $_id_url"
    local _seperator_count=$(echo "$_id_url" | grep --count '=')
    (( _seperator_count == 0 )) && panic "Error. The stream '$_id_url' doesn't match the pattern 'id=url'."

    local _id=$(echo "$_id_url" | awk -F '=' '{print $1}')
    local _url=$(echo "$_id_url" | awk -F '=' '{print $2}')

    log "Stream id is '$_id', URL is '$_url'"

    [ -f "$_temp_dir/$_id" ] && panic "Error. The stream id '$_id' was already given."
    touch "$_temp_dir/$_id"

    local _protocol=$(echo "${_url}" | awk -F '/' '{print substr($1, 1, length($1)-1)}')
    case "$_protocol" in
       rtsp) ;;
       rtsps) ;;
       *) panic "Error. Unsupported protocol in url '$_url'" ;;
    esac
  done

  echo ${_streams[*]}
}

#
# The generate_viewport_page function generates an HTML viewport page based on
# a template file. It populates the template with layout information and stream
# IDs.
#
# Positional parameters:
#   (1) <template_file>: Path to the HTML template file that contains place
#       holders for the layout and stream information.
#   (2) <viewport_file>: Path to the output HTML file generated from the template.
#   (3) <rows>: Number of rows in the layout grid.
#   (4) <columns>: Number of columns in the layout grid.
#   (5)...(N) <stream1> <stream2> ...: A list of streams, each specified in the
#       format id=url.
#
generate_viewport_page() {
  local _template_file="$1"
  local _viewport_file="$2"
  local _layout=($3)
  shift 3
  local _streams=($@)

  log "Preparing replacements for the template file '$_template_file'"

  local _rows="${_layout[0]}"
  local _columns="${_layout[1]}"

  local _html_rows
  for _dummy in $(seq "$_rows"); do _html_rows="$_html_rows 1fr "; done
  log "{{ROWS}} is going to be '$_html_rows'"

  local _html_columns
  for _dummy in $(seq "$_columns"); do _html_columns="$_html_columns 1fr "; done
  log "{{COLUMNS}} is going to be '$_html_columns'"

  local _html_grid_size=$(( _rows * _columns ))
  log "{{GRID_SIZE}} is going to be '$_html_grid_size'"

  local _html_stream_ids=()
  for _id_url in ${_streams[*]}; do
    _html_stream_ids+=(\"$(echo "$_id_url" | awk -F '=' '{print $1}')\")
  done

  _html_stream_ids=$( echo "${_html_stream_ids[*]}" | tr ' ' ',' )
  log "{{STREAM_IDS}} is going to be '$_html_stream_ids'"

  log "Generating into '$_viewport_file'..."
  sed \
    -e 's/{{ROWS}}/'"$_html_rows"'/g' \
    -e 's/{{COLUMNS}}/'"$_html_columns"'/g' \
    -e 's/{{GRID_SIZE}}/'"$_html_grid_size"'/g' \
    -e 's/{{STREAM_IDS}}/'"$_html_stream_ids"'/g' \
    "$_template_file" \
    >"$_viewport_file"
}

#
# The transcode_streams function is responsible for transcoding multiple streams
# using ffmpeg. Each stream is specified in the format id=url, and the output
# for each stream is saved in a specified output directory. The function also
# collects and returns the PIDs of the ffmpeg processes started.
#
# Positional parameters:
#   (1) <output_dir>: The base directory where output directories for each
#       stream's transcoded files will be created.
#   (2)...(N) <stream1> <stream2> ...: A list of streams, each specified in
#       the format id=url.
#
# Returns:
#  After processing all streams, the function returns the list of PIDs for the
#  started ffmpeg processes. Failed processes are represented by 0.
#

transcode_streams() {
  local _output_dir="$1"
  shift
  local _streams=($@)

  for _id_url in ${_streams[*]}; do
    local _stream_id=$(echo "$_id_url" | awk -F '=' '{print $1}')
    local _stream_url=$(echo "$_id_url" | awk -F '=' '{print $2}')

    local _stream_output_dir="$_output_dir"/"$_stream_id"
    mkdir -p "$_stream_output_dir"

    local _pids=()
    log "Trying to transcode '$_stream_url'..."
    local _error_output_file="$(mktemp /tmp/XXXXX)"
    ffmpeg \
       -loglevel 8 \
       -i "$_stream_url" \
       -fflags flush_packets -max_delay 5 -flags -global_header \
       -hls_time 5 -hls_list_size 3 -hls_flags delete_segments \
       -vcodec copy \
       -y "$_stream_output_dir"/index.m3u8 \
       &>"$_error_output_file" \
       &

    local _child_pid="$!"
    sleep 1

    # Zero size?
    if [ -s "$_error_output_file" ]; then
      log "Error starting ffmpeg. '$(head "$_error_output_file")'"
    else
      log "Successfully started ffmpeg, PID is '$_child_pid'"
      _pids+=($_child_pid)
    fi
  done

  echo ${_pids[*]}
}

# --- Main ---

# Defaults and constants
MAX_GRID_SIZE=30
VIEWPORT_TEMPLATE_FILE='live-stream-viewport.html.template'
VIEWPORT_PAGE='viewport.html'

DEFAULT_OUTPUT_DIR='.'
DEFAULT_LAYOUT='2x2'

streams=()

# Usage and --help, as getopt on macos doesn't have long options
if [[ $# -eq 0 ]]; then
    usage && exit 128
elif [[ "$1" == "--help" ]]; then
  help && exit 0
fi

# Parse command line
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

# Parse and validate the instructions
output_dir=$(parse_and_validate_output_dir "$output_dir" "$DEFAULT_OUTPUT_DIR");
layout=( $(parse_and_validate_layout "$layout" "$DEFAULT_LAYOUT") )
streams=( $(parse_and_validate_streams "${streams[*]}") )

# Generate the viewport
generate_viewport_page "$VIEWPORT_TEMPLATE_FILE" "$output_dir"/"$VIEWPORT_PAGE" "${layout[*]}" "${streams[*]}"

# Start transcoders
transcoder_pids=( $(transcode_streams "$output_dir/streams" "${streams[*]}" ) )
