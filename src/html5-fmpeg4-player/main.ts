const videoElement = document.getElementById('videoElement') as HTMLVideoElement;

if (!('MediaSource' in window)) {
    console.error('MediaSource API is not available in your browser.');
} else {
    const mediaSource = new MediaSource();
    videoElement.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', onSourceOpen);
}

function onSourceOpen() {
    const mediaSource = this as MediaSource;
    let mimeCodec = 'video/mp4; codecs="avc1.4d4032,mp4a.40.2"';

    if (MediaSource.isTypeSupported(mimeCodec)) {
        const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

        const socket = new WebSocket('ws://localhost:4001/dev-user:dev10203040$Dx@192.168.4.10/65d741550170b803e4013dc4'); // replace with your WebSocket URL

        socket.binaryType = 'arraybuffer';

        socket.onopen = () => {
            console.log('WebSocket connection opened.');

            // Optionally send some initialization data to the server
            // socket.send('Some initialization data');
        };

        socket.onmessage = (event) => {
            console.log("buffer received")
            const data = new Uint8Array(event.data);
            sourceBuffer.appendBuffer(data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
            mediaSource.endOfStream();
        };

    } else {
        console.error('MIME type or codec not supported:', mimeCodec);
    }
}