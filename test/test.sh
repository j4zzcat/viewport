node --import=tsx src/streamline-viewport.ts | ffmpeg \
    -loglevel 8 \
    -i pipe: \
    -fflags flush_packets -max_delay 5 -flags -global_header \
    -hls_time 5 -hls_list_size 3 -hls_flags delete_segments \
    -vcodec copy \
    -y ~/.tmp/index.m3u8

docker run --rm -it \
  -e MTX_PROTOCOLS=tcp \
  -e MTX_WEBRTCADDITIONALHOSTS=192.168.1.181 \
  -p 8554:8554 \
  -p 1935:1935 \
  -p 8888:8888 \
  -p 8889:8889 \
  -p 8890:8890/udp \
  -p 8189:8189/udp \
  bluenviron/mediamtx

cat blah.mkv | pv -p --rate-limit 4M | ffmpeg -i pipe:0 -c copy -f rtsp rtsp://localhost:8554/mystream

streamline-viewport -v \
  --output-dir ~/.tmp/work \
  grid \
    --layout 3x3 \
    --stream 'unifi://dev-user:'$(security find-generic-password -l dev-user -a unifi-protect -w)'@192.168.4.10/camera/{_all}'

streamline-viewport -v \
  -o ~/.tmp/work \
  remote \
    --url 'unifi://dev-user:'$(security find-generic-password -l dev-user -a unifi-protect -w)'@192.168.4.10/liveview/kiosk'


