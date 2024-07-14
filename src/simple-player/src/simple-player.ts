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
    private _url: string;

    constructor(videoElementId, url) {
        this._videoElementId = videoElementId;
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
        }
        this._mediaSource = new MediaSource();

        videoElement.src = URL.createObjectURL(this._mediaSource);
        this._mediaSource.addEventListener("sourceopen", this.onSourceOpen);
    }

    private onSourceOpen = () => {
        const socket = new WebSocket(this._url);
        socket.binaryType = "arraybuffer";

        socket.onopen = () => {
            this.log("WebSocket connection opened.");

            // Optionally send some initialization data to the server
            // socket.send('Some initialization data');
        }

        let firstMessage = true;
        let notReadyCount = 0;
        socket.onmessage = (event) => {
            console.log(this._videoElementId);
            const data = new Uint8Array(event.data);

            if(firstMessage) {
                let codec = event.data as string;
                let mimeCodec = `video/mp4; codecs="${codec}"`
                this.log(`mimeCodec: ${mimeCodec}`);

                if(!MediaSource.isTypeSupported(mimeCodec)) {
                    throw new Error(`Mime Codec not supported: ${mimeCodec}`);
                }

                this._sourceBuffer = this._mediaSource.addSourceBuffer(mimeCodec);
                firstMessage = false;
                return;
            }

            // Spin around the status for several iterations
            while (this._sourceBuffer.updating && notReadyCount < 100) {
                notReadyCount++;
                return
            }

            if (notReadyCount == 100) {
                this.log("Should replace buffer");
            }

            try {
                this._sourceBuffer.appendBuffer(data);
            } catch (e) {
                this.log(`Error occurred in socket.onmessage: ${e}`);
            }
        };

        socket.onerror = (error) => {
            this.log(`WebSocket error: ${error}`);
        };

        socket.onclose = (event) => {
            this.log("WebSocket connection closed:");
            this._mediaSource.endOfStream();
        };
    }

    private log(message: string) {
        console.log(`[${Date.now()}] [debug] fMPEG4OverWebSocketPlayer ${message}`);
    }
}

