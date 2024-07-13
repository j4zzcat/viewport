class fMPEG4OverWebSocketPlayer {
    private _mediaSource: MediaSource;
    private _videoElementId: string;
    private _mimeCodec: string;
    private _url: string;

    constructor(videoElementId, mimeCodec, url) {
        this._videoElementId = videoElementId;
        this._mimeCodec = mimeCodec;
        this._url = url;

        this.initialize();
    }

    private initialize() {
        const videoElement: HTMLVideoElement = document.getElementById(this._videoElementId) as HTMLVideoElement;
        if(videoElement == undefined) {
            throw Error(`Video element '${this._videoElementId}' not found`);
        }

        if (!("MediaSource" in window)) {
            throw new Error("MediaSource API is not available in your browser.");
        } else if(!MediaSource.isTypeSupported(this._mimeCodec)) {
            throw new Error(`Mime Codec not supported: ${this._mimeCodec}`);
        }
        this._mediaSource = new MediaSource();

        videoElement.src = URL.createObjectURL(this._mediaSource);
        this._mediaSource.addEventListener("sourceopen", this.onSourceOpen);
    }

    private onSourceOpen = () => {
        const sourceBuffer = this._mediaSource.addSourceBuffer(this._mimeCodec);

        const socket = new WebSocket(this._url);
        socket.binaryType = "arraybuffer";

        socket.onopen = () => {
            console.log("WebSocket connection opened.");

            // Optionally send some initialization data to the server
            // socket.send('Some initialization data');
        };

        socket.onmessage = (event) => {
            const data = new Uint8Array(event.data);
            sourceBuffer.appendBuffer(data);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = (event) => {
            console.log("WebSocket connection closed:", event);
            this._mediaSource.endOfStream();
        };
    }
}

