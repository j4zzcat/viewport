#!/usr/bin/env bash

trap 'docker stop $CONTAINER_ID; kill -9 $FFMPEG_PID' SIGINT

SCRIPT_DIR=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)

echo "Starting MediaMTX in the background..."
CONTAINER_ID=$(docker run \
  --rm -d \
  -e MTX_PROTOCOLS=tcp \
  -e MTX_WEBRTCADDITIONALHOSTS=192.168.1.181 \
  -p 8554:8554 \
  -p 1935:1935 \
  -p 8888:8888 \
  -p 8889:8889 \
  -p 8890:8890/udp \
  -p 8189:8189/udp \
  bluenviron/mediamtx)

echo "Waiting for MediaMTX to initialize..."
sleep 3

echo "Starting ffmpeg in the background..."
ffmpeg -hide_banner -loglevel error -nostats -re -i "$SCRIPT_DIR/test.mp4" -c copy -f rtsp rtsp://localhost:8554/mystream &
FFMPEG_PID="$$"

echo "RTSP test stream is available at rtsp://localhost:8554/mystream"
while true; do
  sleep 3600
done
