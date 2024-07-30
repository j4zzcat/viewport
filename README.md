# Viewport

<img src="man/screenshot1.png" align="right" width="40%"/>

*Viewport* is a simple program to display multiple, side-by-side Unifi Protect and RTSP 
video streams in an unattended web page, making it ideal for passive, security 
cameras view-only scenarios (i.e., 'Kiosk'). Viewport is easy to use, uses little 
resources and has low latency.

## Quickstart
To display the video streams of a _Unify Protect Controller_, first define a local Admin on that
controller, with minimum privileges. This user is used by Viewport to access the livestream feeds.
Follow the following procedure:
1. Open up Unifi Protect web application, select _OS Settings_ from the top-level navigation bar. 
1. Click _Admins and Users_, then click the _+_ (plus) button in the top right corner to _Add Admin_.
1. In the _Add Admin_ panel, check _Restrict to local access only_, then fill in the *username* and
*password*.
1. Uncheck the _Use a pre-defined role_, and set _Live only_ for _Protect_, and _None_ for _OS Settings_.
1. Click _Add_ and close the app.
1. Run the following in the terminal:
```bash
docker run -it --rm --network host viewport:1.1 \ 
  streams 'unifi://username:password@host/_all'
```
Replace _username_ and _password_ with those used above, replace _host_ with the hostname or ip address
of the Unifi Protect Controller. Once _Viewport_ starts, use Google Chrome to navigate to [http://localhost:8001](http://localhost:8001).

## Theory of operation
_Viewport_ is based on the client-server architecture, and is made of several parts:


On the client side:
* [Viewport Player](src/player) which is a simple livestream video player written in TypeScript. This player
uses Media Source Extension API to play the H.264 fMP4 livestream video from the Unifi Protect Controller through 
the Viewport Reflector Server.
* [MpegTS Player](https://github.com/xqq/mpegts.js) which is a video player that supports livestream FLV. It is used
to play the specified RTPS/S streams through the SRS Media Server.
* [index.html](src/viewport/src/app/templates) which is a simple web page that is rendered once by the server and 
binds all views together. 


On the server side:
* [Viewport Reflector](src/reflector) which is a simple livestream reflector server. This server uses the excellent
node-based [Unifi Protect Library](https://github.com/hjdhjd/unifi-protect) to reflect the livestream off of a
Unifi Protect Controller and onto the Viewport Player, over Web Socket.
* [SRS Media Server](https://github.com/ossrs/srs) which is used to quickly transcode RTPS/S livestreams into
HTTP-FLV for the MpegTS Player.
* [Viewport](src/viewport) which provides CLI and orchestrates the execution of all the parts. 



## Build
To build the software locally, run the following command.
You should have `docker` and `buildkit` installed.
```shell
docker buildx build -t viewport:latest -f build/Dockerfile .
```











Under normal circumctences, the
latecy is quite small, 0.5s to 1.0s for Unifi Protect livestreams, and 2s to 3s
for RTPS livestreams.


For Unifi Protect support, the program uses the excellent open source [Library](https://github.com/hjdhjd/unifi-protect)
to reflect the low-level H.264 fMP4 video stream over web sockets to the player.  
The program uses `ffmpeg` to continuously transcode RTSP/RTSPS streams from 
the given endpoints (usually security cameras) into HTTP Live Streaming (HLS) streams, 
and then makes these streams available on a simple, unattended web page (i.e., 'viewport').

The program is available both as standalone and as a Docker image.

&nbsp;


## Theory of Operation
( unifi-nvr -> fMPEG -> websocket ) <- ( universal-livestream -> ffmpeg ) -> flv/rtmp -> ( srs ) <- ( mpegts.js ) 


## Unifi Protect Quickstart

```bash
docker run -it --rm --network host viewport:1.1 \ 
  streams 'unifi://username:password@host/_all'
```
* The above will display a 3x3 viewport with 5 Unifi Protect Cameras. 
* Obviously, you have to replace the `IDs` and `URLs` given in this example with *your very own*. 
Note that `IDs` are arbitrary strings, but they must be unique.
* To get the RTSPS stream URL for a camera, open the Unifi Protect app, go to 'Unifi Devices', 
select the desired camera, and then select 'Settings'. Scroll down and expand the 'Advanced' section. 
Enable the stream for the desired resolution, and take a note of its URL. 
Pass this URL to the `-s` option as in `-s ID=URL`.
* To get to the viewport, open a web browser and navigate to: http://localhost:8777/viewport.html.

&nbsp;
## macOS Quickstart

Install prerequisites: 
```shell
brew install ffmpeg 
```
Create temporary directory: 
```shell
mkdir -p ~/.tmp/{work,conf}
```
Start the program, passing `~/.tmp/work` as the output directory. Obviously, you have to pass *your* stream 
ids and URLs to the `-s` option: 
```shell
./streamline-viewport.sh -v -o ~/.tmp/work -l 2x2 -s camera-1=rtsps://...    
```
To access the viewport, a web server needs to be running, serving from `~/.tmp/work`. The easiest option is to
run a web server inside a docker container, like so:
```shell
docker run --rm httpd:2.4 \
  cat /usr/local/apache2/conf/httpd.conf \
  | sed -e 's|\(<Directory "/usr/local/apache2/htdocs">\)|\1\nHeader set Access-Control-Allow-Origin "*"|' \
  >~/.tmp/conf/httpd.conf
  
docker run -itd --rm \
  -p 8777:80 \
  -v ~/.tmp/conf/httpd.conf:/usr/local/apache2/conf/httpd.conf \
  -v ~/.tmp/work:/usr/local/apache2/htdocs/ \
  httpd:2.4
```
To get to the viewport, open a web browser and navigate to: http://localhost:8777/viewport.html.

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
    let stream_url = "http://" + stream_server + "/streams/" + stream_id + "/index.m3u8";
    
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
the streams are available at `http://localhost:8777/streams/<stream-id>/index.m3u8`. 
The easiest way to view a single stream is by using `vlc`, like so:

```bash
vlc http://localhost:8777/streams/camera7/index.m3u8
```
