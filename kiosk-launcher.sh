#! /bin/bash

HOME_DIR=/opt/unifi-protect-camera-kiosk
TEMPLATE_PAGE="$HOME_DIR"/kiosk.html.template

if [ -f /.dockerenv ]; then
  # Inside docker
  WWW_DIR=/var/www/localhost/htdocs
else
  # RPI
  WWW_DIR=/var/www/html
fi

GENERATED_PAGE="$WWW_DIR"/kiosk.html
cp "$TEMPLATE_PAGE" "$GENERATED_PAGE"

function log() {
    local message="$1"
    local now=$(date +'%Y-%m-%d %H:%M:%S')
    echo "[$now] $message" >/dev/stderr
}

function panic() {
    local error_message="$1"
    log "Panic. $error_message"
    exit 128
}

function usage() {
    echo "Usage: $(basename $0) --layout <rows>x<columns> --stream <id=rtsps://address>..."
    exit 1
}

# Start transcoding rtsps to hls in the background
function stream_transcode() {
    local stream_id="$1"
    local url="$2"

    log "Setting up transcoding for stream '$stream_id'"

    output_dir="$WWW_DIR/stream/$stream_id"
    if [ -d "$output_dir" ]; then
        panic "Stream '$stream_id' is already in use."
    fi
    mkdir -p "$output_dir"

    ffmpeg \
      -i "$url" \
      -fflags flush_packets -max_delay 5 -flags -global_header \
      -hls_time 5 -hls_list_size 3 -hls_flags delete_segments \
      -vcodec copy \
      -y "$output_dir"/index.m3u8 \
      &>/dev/null \
      &

    log "Transcoding stream '$stream_id' in the background with PID=$!..."
}

function html_generate_page() {
    local layout="$1"
    local local stream_ids="$2"
    local generated_page="$3"

    local rows=$(echo "$layout" | awk -F 'x' '{print $1}')
    local columns=$(echo "$layout" | awk -F 'x' '{print $2}')

    for dummy in $(seq "$rows"); do html_rows="$html_rows 1fr "; done
    for dummy in $(seq "$columns"); do html_columns="$html_columns 1fr "; done

    log "Setting layout to $rows x $columns"
    sed --in-place -e 's/{{ROWS}}/'"$html_rows"'/' "$generated_page"
    sed --in-place -e 's/{{COLUMNS}}/'"$html_columns"'/' "$generated_page"

    local html_grid_size=$(("$rows" * "$columns"))
    sed --in-place -e 's/{{GRID_SIZE}}/'"$html_grid_size"'/' "$generated_page"

    log "Setting stream ids to [$stream_ids]"
    local html_stream_ids="\"$(echo "$stream_ids" | sed -e 's/ /","/g')\""
    sed --in-place -e 's/{{STREAM_IDS}}/'"$html_stream_ids"'/' "$generated_page"
}

function httpd_run() {
    log "Starting Web Server, log level is set to warn"
    ln -sf /proc/$$/fd/1 /var/log/apache2/access.log
    ln -sf /proc/$$/fd/2 /var/log/apache2/error.log
    exec /usr/sbin/httpd -k start -D FOREGROUND
}

# Main

if [[ $# -eq 0 ]]; then
    usage
fi

error_message_file=/tmp/getopt.err
valid_args=$(getopt -o l:s: --long layout:,stream: -- "$@" 2>"$error_message_file")
if [[ $? -ne 0 ]]; then
    log "Error. $(cat "$error_message_file")"
    usage
fi

log "Parsing command line options"
eval set -- "$valid_args"
while [ : ]; do
  case "$1" in
    -l | --layout)
        log "Parsing 'layout' option, input is '$2'"
        layout="$2"
        shift 2
        ;;

    -s | --stream)
        log "Parsing 'stream' option, input is '$2'"
        stream_id=$(echo "$2" | awk -F '=' '{print $1}')
        stream_ids="$stream_ids $stream_id"
        url=$(echo "$2" | awk -F '=' '{print $2}')

        stream_transcode "$stream_id" "$url"
        shift 2
        ;;

    --) shift;
        break
        ;;
  esac
done

stream_ids="${stream_ids:1}"
html_generate_page "$layout" "$stream_ids" "$GENERATED_PAGE"

if [ -f /.dockerenv ]; then
  for stream_id in $stream_ids; do
    log "Stream '$stream_id' is available at http://<host:port>/stream/$stream_id/index.m3u8"
  done

  log "Kiosk is available at http://<host:port>/kiosk.html"
  httpd_run
fi
