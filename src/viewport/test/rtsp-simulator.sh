id=$(docker run --rm -d -e MTX_PROTOCOLS=tcp -e MTX_WEBRTCADDITIONALHOSTS=192.168.1.181 -p 8554:8554 -p 1935:1935 -p 8888:8888 -p 8889:8889 -p 8890:8890/udp -p 8189:8189/udp bluenviron/mediamtx)
trap "docker stop $id" SIGINT
sleep 3
ffmpeg -re -i test.mp4 -c copy -f rtsp rtsp://localhost:8554/mystream

