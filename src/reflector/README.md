# Simple Reflector

SimpleReflector acts as a proxy/app.reflector server to retrieve video streams
from Unifi Protect cameras and deliver them to a [Simple Player](../simple-player) 
over WebSockets. It initializes a WebSocketServer on port 4001, listens for 
connections, and continuously copies the stream from Unifi Protect to the client. 
The video stream is sent in the correct format directly to the client without
transcoding, ensuring low latency.