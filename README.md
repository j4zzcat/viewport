# Live Stream Viewport

<img src="docs/screenshot1.png" align="right" width="40%"/>

This program offers a simple  method to display multiple, side-by-side Real
Time Streaming Protocol (RTSP)  streams in a  web browser, making  it ideal
for passive, security cameras view-only scenarios (i.e., 'Kiosk').

The program uses `ffmpeg` to continuously transcode RTSP/RTSPS streams from 
the given endpoints (usually security cameras) into HTTP Live Streaming (HLS) streams, 
and then makes these streams available on a simple, unattended web page (i.e., 'viewport').

The program is available both as a Docker container and a Raspberry Pi deb package. 

&nbsp;
## Unifi Protect Quickstart
* The following will display a 2x3 viewport for 4 Unifi Protect Cameras. 
* Obviously, you have to replace the IDs and URLs given in this example with your very own. 
* To get the RTSPS stream URL for a camera, open the Unifi Protect app, go to 'Unifi Devices', 
select the desired camera, and then select 'Settings'. Scroll down and expand the 'Advanced' section. 
Enable the desired RTSPS stream, and take a note of its URL. Pass this URL to the `-s` option.
* Run the following command:

```bash
docker run \
  -it --rm \
  -p 8777:80 \
  --mount type=tmpfs,destination=/var/www/localhost/htdocs,tmpfs-mode=1777 \
  j4zzcat/live-stream-viewport:latest \
    -l 2x3 \
    -s 'my-gate-camera=rtsps://192.168.1.246:7441/D3xxDDe0xA9JN?enableSrtp' \
    -s 'my-tree-camera=rtsps://192.168.1.246:7441/DEVC0FFEE1Sd3?enableSrtp' \
    -s 'my-pool-camera=rtsps://192.168.1.246:7441/AoSixcDJKP0xj?enableSrtp' \
    -s 'my-back-camera=rtsps://192.168.1.246:7441/EFDHIpxfo3zYC?enableSrtp'
```

* To get to the viewport, open a web browser and navigate to: http://localhost:8777/viewport.html.

&nbsp;
## Raspberry Pi Quickstart

First, login to the RPI and install the necessary prerequisites: 
```shell
sudo apt update
sudo apt install -y ffmpeg apache2 git
``` 

Now, enable the `headers` apache2 module:
```shell
sudo a2enmod headers
```

Next, enable 

### Performance 
On [Raspberry Pi model 3 B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b), the delay is about 7 seconds 
and resource usage per one stream transcoding is as follows: 

| Stream Resolution | Average CPU | Top Memory |
|-------------------|-------------|------------|
| Low               | 28%         | 57 MiB     |
| Medium            | 28%         | 57 MiB     |
| High              | 34%         | 62 MiB     |

Essentially, it means that starting from the 4th stream, adding more streams will cause an increase in delay. 
For example, with 5 streams the CPU consumption is 100% and the delay for each stream can be as much as 15 seconds. 

Note. Average CPU was measured using this thingy:
```bash
for i in $(seq 60); do 
  top -b -n 2 -d 0.2 -p <ffmpeg PID> | tail -1 | awk '{print $9}'
done \
| awk 'BEGIN{sum=0}{sum += $1}END{print sum/NR}'
```

&nbsp;
## Advance Topics

### Embedding individual streams in your own web page

Use the following snippet to display a HLS video stream:

```html
<script src="https://hlsjs.video-dev.org/dist/hls.js"></script>
<div>
  <video id="my-camera-video" width="100%"/>  
  <script>
    let stream_id = "camera_pool";
    let stream_server = "localhost:8777";
    let stream_url = "http://" + stream_server + "/stream/" + stream_id + "/index.m3u8";
    
    let video_element = document.getElementById("my-camera-video");

    let hls = new Hls();
    hls.loadSource(stream_url);
    hls.attachMedia(video_element);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      video_element.muted = true;
      video_element.play();
    });
  </script>
</div>
```

### Consuming individual streams with VLC

Individual HLS streams are also made available on the web server under the `/stream` path, i.e., for the docker example above, 
the streams are available at `http://localhost:8777/stream/<stream-id>/index.m3u8`. 
The easiest way to view a single stream is by using `vlc`, like so:

```bash
vlc http://localhost:8777/stream/camera7/index.m3u8
```
