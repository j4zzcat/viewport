import { SimplePlayer } from "./SimplePlayer.js";

function play(videoStreamUrls) {
    videoStreamUrls.forEach((item, index) => {
        let videoElement = document.getElementById(`video-${index}`);

        const jitter = Math.floor(Math.random() * videoStreamUrls.length * .75 * 1000)
        setTimeout(() => {
                let stream_format = item[0];
                let stream_url = item[1];

                if (["unifi"].indexOf(stream_format) >= 0) {
                    let videoPlayer = new SimplePlayer(
                        `video-${index}`,
                        stream_url);

                } else if (["flv", "mpegts"].indexOf(stream_format) >= 0) {
                    let flvPlayer = mpegts.createPlayer({
                        isLive: true,
                        type: stream_format,
                        url: stream_url
                    });
                    flvPlayer.attachMediaElement(videoElement);
                    flvPlayer.load();
                    flvPlayer.play();

                } else if (["hls"].indexOf(stream_format) >= 0) {
                    const ws = new WebSocket(stream_url);
                    ws.onmessage = (event) => {
                        ws.close();
                        const actual_stream_url = event.data.replace("{server}", window.location.hostname);

                        if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
                            videoElement.src = actual_stream_url;
                        } else {
                            var hls = new Hls();
                            hls.on(Hls.Events.ERROR, function (event, data) {
                                if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR)
                                    hls.recoverMediaError();
                            });
                            hls.loadSource(actual_stream_url);
                            hls.attachMedia(videoElement);
                        }
                    };
                }
            },
            jitter);
    });
}