# Viewport

<img src="doc/screenshot1.png" align="right" width="40%"/>

*Viewport* is a simple program to display multiple, side-by-side Unifi Protect 
and RTPS(S) video streams in an unattended web page. It is designed for passive, security 
cameras view-only scenarios (i.e., 'Kiosk'). Viewport is easy to use, uses little 
resources and has low latency.

## Quickstart
To display the video streams of a _Unify Protect Controller_, first define a local Admin on that
controller, with minimum privileges. This user is used by Viewport to access the livestream feeds.
Follow this procedure:
1. Open up Unifi Protect web application, select _OS Settings_ from the top-level navigation bar. 
1. Click _Admins and Users_, then click the _+_ (plus) button in the top right corner to _Add Admin_.
1. In the _Add Admin_ panel, check _Restrict to local access only_, then fill in the *username* and
*password*.
1. Uncheck the _Use a pre-defined role_, and set _Live only_ for _Protect_, and _None_ for _OS Settings_.
1. Click _Add_ and close the app.
1. Run the following in the terminal:
```bash
docker run -it --rm --network host --mount type=tmpfs,destination=/ramfs,tmpfs-mode=1777 \ 
  j4zzcat/viewport:1.3 \ 
    streams 'unifi://username:password@host/_all'
```
Replace _username_ and _password_ with those used above, replace _host_ with the hostname or ip address
of the Unifi Protect Controller. Once _Viewport_ starts, head over to [http://localhost:8001](http://localhost:8001).

### Another example
Display cameras from several controllers and RTPS(S) sources on a 4x4 grid:
```bash
docker run -it --rm --network host --mount type=tmpfs,destination=/ramfs,tmpfs-mode=1777 \
  j4zzcat/viewport:1.4 \ 
      streams \
        --layout grid:4x4 \
        'unifi://username1:password1@host1/_all' \
        'unifi://username2:password2@host2/camera name 5,camera name 3' \
        'rtsp://host3/ABCDEFG' \
        'rtsps://host3/HIJKLMNOP?nighmode=false'
```

### And another example
Display cameras on the Large-Regular layout (lr), with two large cells, one on the
top left (tl) corner, and the other on the bottom right (br) corner, with the rest
of the streams presented in regular-sized cells: 
```bash
docker run -it --rm --network host --mount type=tmpfs,destination=/ramfs,tmpfs-mode=1777 \
  j4zzcat/viewport:1.4 \ 
      streams \
        --layout lr:tl,br \
        'unifi://username1:password1@host1/_all'
```

### And yet another example
By default, RTSP(S) streams are transcoded to HTTP Live Stream (HLS) format. This format provides a reasonable 
balance between CPU consumption and latency. In addition, MPEG-TS and FLV are also available and can be specified as 
the default or per individual streams. Have a look in [settings.toml](src/viewport/resource/settings.toml) to learn more.
Note that the transcoding of Unifi streams cannot be changed, this feature only applies to RTPS(S) streams.

The following will transcode one stream to MPEG-TS and the other FLV:
```bash
docker run -it --rm --network host --mount type=tmpfs,destination=/ramfs,tmpfs-mode=1777 \
  j4zzcat/viewport:1.4 \ 
      streams \
        'rtsps://host3/ABCDEFG::mpegts_1'  \
        'rtsps://host4/ZDEEFFS::flv_1'
```


## Theory of Operation

Viewport operates based on a simple client-server architecture, consisting of several key components:

On the client side, there are multiple players and an interface:

* The [Viewport Player](src/player) is a straightforward livestream video player written in TypeScript. 
This player utilizes the Media Source Extension API to play H.264 fragmented MP4 livestream video from the 
Unifi Protect Controller via the Viewport Reflector Server, over websockets.
* The [FLV/MPEG-TS Player](https://github.com/xqq/mpegts.js) plays FLV or MPEG-TS streams.
* The [HLS Player](https://github.com/video-dev/hls.js/) handles playback of HLS streams.
* The [index.html](src/viewport/resource/backend/ui/templates) is a simple web page that is rendered once by the server
and integrates all the various views.


On the server side, the architecture includes:

* The [Viewport Reflector](src/reflector) is a simple livestream reflector server. It employs the excellent node-based 
[unifi-protect](https://github.com/hjdhjd/unifi-protect) library by [@hjdhjd](https://github.com/hjdhjd) to redirect 
the livestream from a Unifi Protect Controller to the Viewport Player over websockets.
* The [Viewport File Transcoding Server](src/viewport/src/backend/protocols/rtsp.py#L73) is designed specifically for the
file-based HLS (HTTP Live Streaming) format. HLS, developed by Apple, segments a video stream into small HTTP-based file
segments. Upon receiving a request, the server starts a `ffmpeg` process to transcode the specified RTSP(S) stream into
HLS format. This process generates a series of MPEG-TS segments along with a master index.m3u8 playlist file, which are then
served over HTTP to the client.
* The [Viewport Streaming Transcoding Server](src/viewport/src/backend/protocols/rtsp.py#L224) is a simple server for 
transcoding streaming-based formats such as MPEG-TS and FLV. When a client request is made, the server initiates a 
`ffmpeg` process to transcode the specified RTSP(S) stream into the desired format. The transcoded output is then streamed
continuously to the client over websockets.
* The core [Viewport](src/viewport) provides a CLI and orchestrates the execution of all these components. Running the program
with the `--verbose` option will display the entire, multi-process, multi-threaded flow.


## Build
To build the software locally, run the following command.
You should have `docker` and `buildkit` installed.
```shell
docker buildx build -t viewport:latest -f build/Dockerfile .
```

## Known issues
* Not working on iOS.







