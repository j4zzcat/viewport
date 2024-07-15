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

import {Queue} from "typescript-collections";

export class SimplePlayer {
    private _videoElementId: string;
    private _url: string;
    private _mimeCodecs: string;
    private _ws: WebSocket;
    private _mediaSource: MediaSource;
    private _sourceBuffer: SourceBuffer;
    private _queue: Queue<Uint8Array>;

    private CLEANUP_INTERVAL_SECONDS = 20;

    constructor(videoElementId, url) {
        this._videoElementId = videoElementId;
        this._url = url;

        this.log("Starting SimplePlayer");
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
        this._mediaSource.addEventListener("sourceended", this.onSourceEnded);
        this._mediaSource.addEventListener("sourceclose", this.onSourceClose);
    }

    private firstMessage = true;
    private onSourceOpen = () => {
        this._ws = new WebSocket(this._url);
        this._ws.binaryType = "arraybuffer";

        this._ws.onopen = () => {
            this.log("WebSocket connection opened.");
        }

        let messageCount = 0;
        let cleanup = 0;
        let lastCleanup = Date.now();

        this._ws.onmessage = (event) => {
            messageCount++;
            if(messageCount % 100 == 0) {
                this.log(`messageCount: ${messageCount}`);

                if(cleanup == 0) {
                    if((Date.now() - lastCleanup) > this.CLEANUP_INTERVAL_SECONDS * 1000) {
                        cleanup = 1;
                    }
                }
            }

            if (messageCount == 1) {
                this._mimeCodecs = `video/mp4; codecs="${event.data}"`

                this.log(`mimeCodec: ${this._mimeCodecs}`);
                if (!MediaSource.isTypeSupported(this._mimeCodecs)) {
                    throw new Error(`Mime Codec not supported: ${this._mimeCodecs}`);
                }

                this._sourceBuffer = this._mediaSource.addSourceBuffer(this._mimeCodecs);
                this._queue = new Queue<Uint8Array>();

            } else if(messageCount == 2) {
                const data = new Uint8Array(event.data);
                this._sourceBuffer.appendBuffer(data);

            } else {
                const data = new Uint8Array(event.data);
                this._queue.enqueue(data);

                if (this._sourceBuffer.updating == false) {
                    if (cleanup == 1) {
                        try {
                            // Clean the source buffer, leaving only the last N seconds

                            let end = this._sourceBuffer.buffered.end(0);
                            this.log(`Cleaning up SourceBuffer, end: ${end}`);

                            this._sourceBuffer.remove(0, end - 10);
                            this.log("SourceBuffer cleaned");

                            cleanup = 0;
                            return;

                        } catch (e) {
                            this.log(`Failed to clean up SourceBuffer: ${e}`);
                            return;
                        }
                    }

                    // Dehydrate the queue and create one single buffer with
                    // all the received messages

                    const arrays: Uint8Array[] = [];

                    let totalLength = 0;
                    while (!this._queue.isEmpty()) {
                        const array = this._queue.dequeue();
                        arrays.push(array);
                        totalLength += array.length;
                    }

                    const allBuffers = new Uint8Array(totalLength);
                    let offset = 0;

                    for (const arr of arrays) {
                        allBuffers.set(arr, offset);
                        offset += arr.length;
                    }

                    // Append the single large buffer
                    this._sourceBuffer.appendBuffer(allBuffers);
                }
            }
        }
    }

    private onSourceEnded = () => {
        this.log("onSourceEnded");
    }

    private onSourceClose = () => {
        this.log("onSourceClose");
    }

    private log(message: string) {
        console.log(`[${Date.now()}] [${this._videoElementId}] ${message}`);
    }
}

