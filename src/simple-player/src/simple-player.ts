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
        this._ws.onmessage = (event) => {
            messageCount++;
            if(messageCount % 100 == 0) {
                if(cleanup == 0) {
                    cleanup = 1;
                }
                this.log(`messageCount: ${messageCount}, sourceBufferList: ${this._mediaSource.sourceBuffers.length}`);
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
                if(this._sourceBuffer.updating == false) {

                    if(cleanup != 0) {
                        this.log(`cleanup: ${cleanup}`);

                        if (cleanup == 1) {
                            try {
                                this._sourceBuffer.remove(0, 3);
                                cleanup = 0;
                                return;

                            } catch (e) {
                                this.log(`Failed to clean SourceBuffer: ${e}`);
                                return;
                            }
                        }
                    }

                    this._sourceBuffer.appendBuffer(this._queue.dequeue())
                }
            }

        // if(this._sourceBuffer != undefined) {
        //     this._mediaSource.sourceBuffers.onremovesourcebuffer = (event) => {
        //         this._sourceBuffer = this._mediaSource.addSourceBuffer(this._mimeCodecs);
        //     };
        //
        //     this._mediaSource.removeSourceBuffer(this._sourceBuffer);
        // } else {

        }
    }

    private onSourceEnded = () => {
        this.log("onSourceEnded");
    }

    private onSourceClose = () => {
        this.log("onSourceClose");
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

    private log(message: string) {
        console.log(`[${Date.now()}] [${this._videoElementId}] ${message}`);
    }
}

