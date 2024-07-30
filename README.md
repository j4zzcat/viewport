# Viewport

<img src="man/screenshot1.png" align="right" width="40%"/>

*Viewport* is a simple program to display multiple, side-by-side Unifi Protect 
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
* [index.html](src/viewport/src/app/templates) which is a simple web page that is rendered once by the server and 
binds all the views together. 


On the server side:
* [Viewport Reflector](src/reflector) which is a simple livestream reflector server. This server uses the excellent
node-based [Unifi Protect Library](https://github.com/hjdhjd/unifi-protect) to reflect the livestream off of a
Unifi Protect Controller and onto the Viewport Player, over Web Sockets.
* [Viewport](src/viewport) which provides CLI and orchestrates the execution of all the parts. 



## Build
To build the software locally, run the following command.
You should have `docker` and `buildkit` installed.
```shell
docker buildx build -t viewport:latest -f build/Dockerfile .
```
