# Simple Player 

Plays the video feed of a Unifi camera, with low latency.
The player receives the stream from the [Simple Reflector](../simple-app.reflector), which handles
the mechanics of getting the stream from Unifi Protect, and then sends it
over WebSocket to this player. The video is then presented using MSE.

Usually, the video is formatted as an H.264 fMP4 stream, with avc1.4d4032
codec for video and mp4a.40.2 codec for audio. This format is natively
supported by MSE, so no further transcoding is necessary, just careful
management of the SourceBuffer object.

Under normal circumstances, the player achieves latency of 0.5 - 1 second.
