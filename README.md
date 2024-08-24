# Viewport

<img src="man/screenshot1.png" align="right" width="40%"/>

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
of the Unifi Protect Controller. Once _Viewport_ starts, use Google Chrome to navigate to [http://localhost:8001](http://localhost:8001).

### Another example
Display cameras from several controllers and RTPS(S) sources on a 4x4 grid:
```bash
docker run -it --rm --network host --mount type=tmpfs,destination=/ramfs,tmpfs-mode=1777 \
  j4zzcat/viewport:1.3 \ 
      streams \
        --layout grid:4x4 \
        'unifi://username1:password1@host1/_all' \
        'unifi://username2:password2@host2/camera name 5,camera name 3' \
        'rtsp://host3/ABCDEFG' \
        'rtsps://host3/HIJKLMNOP?nighmode=false'
```

### Yet another example
By default, RTSP(S) streams are transcoded to HTTP Live Stream (HLS) format. This format provides a reasonable 
balance between CPU consumption and latency. In addition, MPEG-TS and FLV are also available and can be specified as 
the default or per individual streams. Have a look in [settings.toml](src/viewport/resource/settings.toml) to learn more.
Note that the transcoding of Unifi streams cannot be changed, this feature only applies to RTPS(S) streams.

The following will transcode one stream to MPEG-TS and the other FLV:
```bash
docker run -it --rm --network host --mount type=tmpfs,destination=/ramfs,tmpfs-mode=1777 \
  j4zzcat/viewport:1.3 \ 
      streams \
        'rtsps://host3/ABCDEFG::mpegts_1'  \
        'rtsps://host4/ZDEEFFS::flv_1'
```



## Theory of operation
_Viewport_ is based on a simple client-server architecture, and is made of several parts:


On the client side:
* [Viewport Player](src/player) which is a simple livestream video player written in TypeScript. This player
uses Media Source Extension API to play the H.264 fMP4 livestream video from the Unifi Protect Controller through 
the Viewport Reflector Server.
* [FLV Player](https://github.com/bilibili/flv.js/tree/master) which plays the FLV streams transcoded by the
FFMpegServer from RTSP(S). 
* [index.html](src/viewport/resource/backend/ui/templates) which is a simple web page that is rendered once by the server and 
binds all the views together. 


On the server side:
* [Viewport Reflector](src/reflector) which is a simple livestream reflector server. This server uses the excellent
node-based Unifi Protect [library](https://github.com/hjdhjd/unifi-protect) to reflect the livestream off of a
Unifi Protect Controller and onto the Viewport Player, over Web Sockets.
* [Viewport FFMpeg Server](src/viewport/src/backend/protocols/rtsp.py#L57) which is a simple transcoding server that uses FFMPEG to transcode the specified
RTSP(S) streams into FLV and sends it the FLV Player over Web Sockets.
* [Viewport](src/viewport) which provides CLI and orchestrates the execution of all the parts. Run the program 
with the `--verbose` option to see the entire flow.



## Build
To build the software locally, run the following command.
You should have `docker` and `buildkit` installed.
```shell
docker buildx build -t viewport:latest -f build/Dockerfile .
```


## Known issues
* Somewhat working on Safari and Firefox.
* Not working on iOS.

## Todo
* Better error handling. Should exit cleanly on fatal.
* Better unit testing.
* Migrate away from FLV player to [mpegts.js](https://github.com/xqq/mpegts.js)
* Investigate why is that RTPS(S) streams paused when focus is taken away.
* Explore ways to optimize the RTSP(S) transcoding.

```
main -> StreamsCli --> UnifiProtocol --new process--> UnifiReflector (Node)
                   --> RTSPProtocol  --new process--> File Web Server 
                                     --new process--> ffmpeg 
                                     --new process--> ffmpeg
                   --> WebServer 
```

macOS, top viewport components
```
top -o +pid $(pgrep "ffmpeg|node|static-web-server|Python" | xargs -I {} printf "\-pid {} ")
```