/*
 * This file is part of Viewport.
 * By Sharon Dagan <https://github.com/j4zzcat>, (C) Copyright 2024.
 *
 * Viewport is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This software is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * This software. If not, see <https://www.gnu.org/licenses/>.
 */

class fMPEG4OverWebSocketPlayer {
    private _mediaSource: MediaSource;
    private _sourceBuffer: SourceBuffer;
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
        this._sourceBuffer = this._mediaSource.addSourceBuffer(this._mimeCodec);

        const socket = new WebSocket(this._url);
        socket.binaryType = "arraybuffer";

        socket.onopen = () => {
            console.log("WebSocket connection opened.");

            // Optionally send some initialization data to the server
            // socket.send('Some initialization data');
        };

        socket.onmessage = (event) => {
            const data = new Uint8Array(event.data);

            let count = 0;
            while(this._sourceBuffer.updating && count < 100) {
                count++;
            }

            if(count == 100) {
                return;
            }

            try {
                this._sourceBuffer.appendBuffer(data);
            } catch (e) {
                console.log(e);
            }
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

