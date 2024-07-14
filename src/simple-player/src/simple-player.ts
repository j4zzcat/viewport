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
import {isTooManyTries, retryAsync} from "ts-retry";

export class SimplePlayer {
    private _mediaSource: MediaSource;
    private _sourceBuffer: SourceBuffer;
    private _videoElementId: string;
    private _url: string;

    constructor(videoElementId, url) {
        this._videoElementId = videoElementId;
        this._url = url;

        this.log("debug", "Starting SimplePlayer");
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

    private onSourceOpen = async () => {
        let queue = new Queue<Uint8Array>();
        let ws = this.createWebSocket(this._url, queue);

        try {
            await retryAsync(
                async ()=> {
                    return queue.isEmpty()
                },
                {
                    delay: 1000,
                    maxTry: 5,
                    until: (lastResult) => lastResult == false,
                }
            );
        } catch (err) {
            if (isTooManyTries(err)) {
                this.log("error", "Did not get codec in time!")
            } else {
                this.log("error", err);// something else goes wrong
            }
        }

        let codec = queue.dequeue() as unknown as string;
        let mimeCodec = `video/mp4; codecs="${codec}"`
        this.log("debug", `mimeCodec: ${mimeCodec}`);

        if(!MediaSource.isTypeSupported(mimeCodec)) {
            throw new Error(`Mime Codec not supported: ${mimeCodec}`);
        }

        this._sourceBuffer = this._mediaSource.addSourceBuffer(mimeCodec);

        this._sourceBuffer.addEventListener("updateend", (event) => {
            if(queue.peek() == undefined) {
                return;
            } else {
                this._sourceBuffer.appendBuffer(queue.dequeue());
            }
        });

    }

    private onSourceEnded = () => {
        this.log("debug", "onSourceEnded");
    }

    private onSourceClose = () => {
        this.log("debug", "onSourceClose");
    }


    private createWebSocket(url, queue) {
        const ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";

        ws.onopen = () => {
            this.log("debug", "WebSocket connection opened.");
        }

        ws.onmessage = (event) => {
            const data = new Uint8Array(event.data);
            queue.enqueue(data);
        }

        return ws;
    }
    //
    //     let messageCount = 0;
    //     let updateEndCount = 0;
    //     let notReadyCount = 0;
    //     let firstMessage = true;
    //     socket.onmessage = (event) => {
    //         const data = new Uint8Array(event.data);
    //
    //         if(firstMessage) {
    //             let codec = event.data as string;
    //             let mimeCodec = `video/mp4; codecs="${codec}"`
    //             this.log(`mimeCodec: ${mimeCodec}`);
    //
    //             if(!MediaSource.isTypeSupported(mimeCodec)) {
    //                 throw new Error(`Mime Codec not supported: ${mimeCodec}`);
    //             }
    //
    //             this._sourceBuffer = this._mediaSource.addSourceBuffer(mimeCodec);
    //
    //             firstMessage = false;
    //             return;
    //         }
    //
    //         messageCount++;
    //         if(messageCount % 100 == 0) {
    //             this.log(`messageCount: ${messageCount}, updateEndCount: ${updateEndCount}, notReadyCount: ${notReadyCount}`);
    //         }
    //
    //         // Spin around the status for several ticks
    //         while(this._sourceBuffer.updating) {
    //             notReadyCount++;
    //             if(notReadyCount % 100 == 0) {
    //                 this._sourceBuffer.abort();
    //                 firstMessage = false;
    //             }
    //         }
    //
    //         try {
    //             this._sourceBuffer.appendBuffer(data);
    //         } catch (e) {
    //             this.log(`Error occurred in socket.onmessage: ${e}`);
    //         }
    //     };
    //
    //     socket.onerror = (error) => {
    //         this.log(`WebSocket error: ${error}`);
    //     };
    //
    //     socket.onclose = (event) => {
    //         this.log("WebSocket connection closed:");
    //         this._mediaSource.endOfStream();
    //     };
    // }

    private log(level: string, message: string) {
        console.log(`[${Date.now()}] [${level}] [${this._videoElementId}] ${message}`);
    }
}

