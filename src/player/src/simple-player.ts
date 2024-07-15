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

/*
 * SimplePlayer - plays the video feed of a Unifi camera, with low latency.
 * The player receives the stream from the Simple Reflector, which handles
 * the mechanics of getting the stream from Unifi Protect, and then sends it
 * over WebSocket to this player. The video is then presented using MSE.
 *
 * Usually, the video is formatted as an H.264 fMP4 stream, with avc1.4d4032
 * codec for video and mp4a.40.2 codec for audio. This format is natively
 * supported by MSE, so no further transcoding is necessary, just careful
 * management of the SourceBuffer object.
 *
 * Under normal circumstances, the player achieves latency of 0.5 - 1 second.
 */

export class SimplePlayer {
    private readonly _videoElementId: string;
    private readonly _url: string;
    private _mimeCodecs: string;
    private _ws: WebSocket;
    private _mediaSource: MediaSource;
    private _sourceBuffer: SourceBuffer;
    private _queue: Queue<Uint8Array>;

    private HOUSEKEEPING_INTERVAL_MESSAGES = 100;
    private CLEANUP_INTERVAL_SECONDS = 20;
    private KEEP_VIDEO_SECONDS = 10

    constructor(videoElementId: string, url: string) {
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

            if (messageCount == 1) {
                this.log("Processing message: 1");

                /*
                 * The first message from the server contains the codecs of this stream, which
                 * are usually avc1.4d4032 for video and mp4a.40.2 for audio. All other messages
                 * are fragments of the H.264 fMP4 stream of the camera. Essentially, this is
                 * the initialization section of the engine where the SourceBuffer and Queue
                 * are allocated.
                 */

                this._mimeCodecs = `video/mp4; codecs="${event.data}"`

                this.log(`Got mimeCodec: ${this._mimeCodecs}`);
                if (!MediaSource.isTypeSupported(this._mimeCodecs)) {
                    throw new Error(`Mime Codec not supported: ${this._mimeCodecs}`);
                }

                this.log("Allocating SourceBuffer and Queue");
                this._sourceBuffer = this._mediaSource.addSourceBuffer(this._mimeCodecs);
                this._queue = new Queue<Uint8Array>();

            } else if(messageCount == 2) {
                this.log("Processing message: 2");

                /*
                 * The second message from the server is the first message of the stream.
                 * It contains the Init segment of the stream and must be handled before
                 * all other messages.
                 */

                this.log("Appending Init segment");
                const data = new Uint8Array(event.data);
                this._sourceBuffer.appendBuffer(data);

            } else {

                /*
                 * All other messages are handled here. All of them are segments of the
                 * H.264 fMP4 stream.
                 */

                /*
                 * Do a housekeeping cycle every HOUSE_KEEPING_INTERVAL_MESSAGES messages.
                 */
                if(messageCount % this.HOUSEKEEPING_INTERVAL_MESSAGES == 0) {
                    this.log("Starting housekeeping cycle");
                    this.log(`messageCount: ${messageCount}, queue.size: ${this._queue.size()}`);

                    /*
                     * Request a cleaning cycle every CLEANUP_INTERVAL_SECONDS.
                     * Without a cleanup, the SourceBuffer will eventually overflow.
                     */
                    if (cleanup == 0) {
                        if((Date.now() - lastCleanup) > this.CLEANUP_INTERVAL_SECONDS * 1000) {
                            lastCleanup = Date.now();
                            cleanup = 1;
                        }
                    }
                }

                /*
                 * Handle the H.264 fMP4 stream. Ideally, when a message arrives it can be
                 * appended to the SourceBuffer right away. However, there are times when the
                 * SourceBuffer is not yet ready, and so the message is enqueued to be later
                 * appended to the SourceBuffer. Whenever the SourceBuffer can be updated,
                 * all queued messages are appended at once, effectively cleaning up the queue
                 * and avoiding any lag accumulation.
                 */
                const data = new Uint8Array(event.data);
                this._queue.enqueue(data);

                if (this._sourceBuffer.updating == false) {

                    if (cleanup > 0) {

                        /*
                         * A cleanup cycle was requested, start it now. Cleanup can
                         * proceed only if the SourceBuffer is ready (i.e., not updating).
                         * If successful, the SourceBuffer is reduced, leaving in it only
                         * the last KEEP_VIDEO_SECONDS seconds of video.
                         */

                        if(cleanup == 1) {
                            this.log("Starting cleanup cycle");
                        } else {
                            this.log(`Retrying cleanup cycle, this is attempt: ${cleanup}`)
                        }

                        try {
                            let end = this._sourceBuffer.buffered.end(0);
                            this.log(`Cleaning up SourceBuffer, end: ${end}`);

                            this._sourceBuffer.remove(0, end - this.KEEP_VIDEO_SECONDS);
                            this.log("SourceBuffer cleaned");

                            cleanup = 0;
                            return;

                        } catch (e) {
                            this.log(`Failed to clean up SourceBuffer: ${e}`);
                            cleanup++;
                        }
                    }

                    let allWaitingMessages = this.dehydrateQueue(this._queue);
                    this._sourceBuffer.appendBuffer(allWaitingMessages);
                }
            }
        }
    }

    /*
     * Dequeues all Uint8Array elements from the provided queue, concatenates them,
     * and returns a single Uint8Array containing all the data.
     */
    private dehydrateQueue(queue: Queue<Uint8Array>): Uint8Array {
        const buffers: Uint8Array[] = [];

        let totalLength = 0;
        while (!this._queue.isEmpty()) {
            const array = this._queue.dequeue();
            buffers.push(array);
            totalLength += array.length;
        }

        const combinedBuffers = new Uint8Array(totalLength);
        let offset = 0;

        for (const buffer of buffers) {
            combinedBuffers.set(buffer, offset);
            offset += buffer.length;
        }

        return combinedBuffers;
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

