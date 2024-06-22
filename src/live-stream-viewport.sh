#! /bin/bash

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
    echo "usage: $(basename $0) [-o <output-dir>] [-l <layout>] -s <id=rtsp-url>..."
}

function help() {
    cat <<EOF
NAME:
    $(basename $0) - View RTSP/RTSPS streams in a web browser.

SYNOPSIS:
    This program offers a simple  method to display multiple, side-by-side Real
    Time Streaming Protocol (RTSP)  streams in a  web browser, making  it ideal
    for passive, security cameras view-only scenarios (i.e., 'Kiosk').

    The program starts by generating a simple web page for viewing the supplied
    streams ('viewport'),  and then by running in  the background,  for each of
    the streams,  a transcoder program (ffmpeg) that translates  the RTSP/RTSPS
    stream into a HTTP Live Stream (HLS) stream. These HLS streams are suitable
    for easy consumption by the previously generated web page.

    Note: A web server is needed to serve the viewport and streams.

USAGE:
    $(basename $0) [-o <output-dir>] [-l <layout>] -s <id=url>...

OPTIONS:
    -o <output-dir>   Directory where the output should go [default: .]
    -l <layout>       Viewport layout in rows x columns format [default: 2x2]
    -s <id=url>       Stream id and url in the form of 'id=rtsp[s]://address.'

EXAMPLE:
    The following is used to view two streams,  side by side,  in a 2x2 layout.
    The streams  are transcoded concurrently  in the background.  The resulting
    temporary files are stored in /var/www/htdocs,  which is expected to be the
    root  directory  of the  web server.  The viewport can then be accessed  by
    navigating to: http://localhost/viewport.html.

    $(basename $0) \\
      -o /var/www/htdocs \\
      -l 2x2 \\
      -s door_camera=rtsps://192.168.4.10/D3xxDDe0xA9JN \\
      -s pool_camera=rtsps://192.168.4.10/F1gzGGe0xT1SN?nm=true

EOF
    exit 1
}

# Main

if [[ $# -eq 0 ]]; then
    usage && exit
elif [[ "$1" == "-h" ]] || [[ "$1" == "--help" ]] ; then
    help && exit
fi

error_message_file=$(mktemp /tmp/XXX)
valid_args=$(getopt o:l:s: -- "$@" 2>"$error_message_file")
if [[ $? -ne 0 ]]; then
    log "Error. $(cat "$error_message_file")"
    usage && exit
fi

log "Parsing command line options"
eval set -- "$valid_args"
while [ : ]; do
  case "$1" in
    -o | --output-dir)
      log "Parsing 'output-dir' option, input is '$2'"
      output_dir="$2"
      shift 2
      ;;

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

      #stream_transcode "$stream_id" "$url"
      shift 2
      ;;

    --) shift;
      break
      ;;
  esac
done
