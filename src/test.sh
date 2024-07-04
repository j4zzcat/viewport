node --import=tsx src/streamline-viewport.ts | ffmpeg \
    -loglevel 8 \
    -i pipe: \
    -fflags flush_packets -max_delay 5 -flags -global_header \
    -hls_time 5 -hls_list_size 3 -hls_flags delete_segments \
    -vcodec copy \
    -y ~/.tmp/index.m3u8


streamline-viewport -v \
  grid \
    --layout 3x3 \
    --stream 'unifi://dev-user:'$(security find-generic-password -l dev-user -a unifi-protect -w)'@192.168.4.10/camera/{_all}'

