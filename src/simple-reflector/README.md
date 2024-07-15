# Simple Reflector

SimpleReflector acts as a proxy/reflector server to retrieve video streams
from Unifi cameras and deliver them to a [Simple Player](../simple-player) over WebSocket. It
initializes a WebSocketServer on port 4001, listens for connections, and
establishes the stream from Unifi Protect to the client. The video stream
is sent in the correct format directly to the client without transcoding,
ensuring low latency.