node --import=tsx src/streamline-viewport.ts | ffmpeg \
    -loglevel 8 \
    -i pipe: \
    -fflags flush_packets -max_delay 5 -flags -global_header \
    -hls_time 5 -hls_list_size 3 -hls_flags delete_segments \
    -vcodec copy \
    -y ~/.tmp/index.m3u8

streamline-viewport -v
  -s, --stream ...        camera-1=rtsps://...
  -m, --multi-stream ...  unifi://userid:password@192.168.4.10/camera/{_all}
  -v, --view ...          unifi://userid:password@192.168.4.10/liveview/important



