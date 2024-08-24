/*
 * This file is part of Viewport.
 * By Sharon Dagan <https://github.com/j4zzcat>, Copyright (C) 2024.
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

import log from "loglevel";

/*
 * SimplePlayer - plays the video feed of a Unifi camera, with low latency.
 * The player receives the stream from the Simple Reflector, which handles
 * the mechanics of getting the actual video stream from Unifi Protect, and
 * then sends it over a WebSocket to this player. The video is then presented
 * using MSE.
 *
 * Usually, the video is formatted as an H.264 fMP4 stream, with avc1.4d4032
 * codec for video and mp4a.40.2 codec for audio. This format is natively
 * supported by MSE, so no further transcoding is necessary, just careful
 * management of the SourceBuffer.
 *
 * Under normal circumstances, the player achieves latency of 0.5 - 1 second.
 */

export class SimplePlayer {
    private readonly _videoElementId: string;
    private readonly _url: string;
    private _videoElement: HTMLVideoElement;
    private _mimeCodecs: string;
    private _ws: WebSocket;
    private _mediaSource: MediaSource;
    private _sourceBuffer: SourceBuffer;
    private _queue: Uint8ArrayQueue

    private HOUSEKEEPING_INTERVAL_MESSAGES = 100;
    private CLEANUP_INTERVAL_SECONDS = 20;
    private KEEP_VIDEO_SECONDS = 10

    private _logger = {
        info: (msg: string) => {log.info(`[${Date.now()}] [${this._videoElementId}] ${msg}`)},
        warn: (msg: string) => {log.warn(`[${Date.now()}] [${this._videoElementId}] ${msg}`)},
        error: (msg: string) => {log.error(`[${Date.now()}] [${this._videoElementId}] ${msg}`)},
        debug: (msg: string) => {log.debug(`[${Date.now()}] [${this._videoElementId}] ${msg}`)}
    }

    constructor(videoElementId: string, url: string) {
        this._videoElementId = videoElementId;
        this._url = url;

        log.setLevel("INFO");
        this._logger.info("Starting SimplePlayer");
        this.initialize();
    }

    private initialize() {
        this._videoElement = document.getElementById(this._videoElementId) as HTMLVideoElement;
        if(this._videoElement == undefined) {
            this._logger.error(`Video element '${this._videoElementId}' not found`);
            throw new Error("Video element not found");
        }

        if (!("MediaSource" in window)) {
            this._logger.error("MediaSource API is not available in your browser.");
            throw new Error("MSE not available");
        }
        this._mediaSource = new MediaSource();

        this._videoElement.src = URL.createObjectURL(this._mediaSource);
        this._mediaSource.addEventListener("sourceopen", this.onSourceOpen);
        this._mediaSource.addEventListener("sourceended", () => {this._logger.debug("onSourceEnded"); });
        this._mediaSource.addEventListener("sourceclose", () => {this._logger.debug("onSourceClose"); });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden == false) {
                this._logger.debug("Visibility changed: Focus")

                /*
                 * Jump to the end of the stream.
                 */
                if(this._sourceBuffer && this._sourceBuffer.buffered) {
                    this._videoElement.currentTime = this._sourceBuffer.buffered.end(0);
                }
            }
        });
    }

    private onSourceOpen = () => {
        this._ws = new WebSocket(this._url);
        this._ws.binaryType = "arraybuffer";

        this._ws.onopen = () => {
            this._logger.info("Connected to the Simple Reflector");
        }

        let messageCount = 0;
        let byteCount = 0;
        let cleanup = 0;
        let lastCleanup = Date.now();

        this._ws.onmessage = (event) => {
            messageCount++;

            if (messageCount == 1) {
                this._logger.debug("Processing message: 1");

                /*
                 * The first message from the server contains the codecs of this stream, which
                 * for unifi are usually avc1.4d4032 for video (Main profile of H.264, constrains apply, 5.0)
                 * and mp4a.40.2 for audio.
                 */
                if(event.data) {
                    this._mimeCodecs = `video/mp4; codecs="${event.data}"`;
                } else {
                    this._mimeCodecs = "video/mp4; codecs=\"avc1.4d4032\"";
                }

                this._logger.info(`mimeCodecs: ${this._mimeCodecs}`);
                if (!MediaSource.isTypeSupported(this._mimeCodecs)) {
                    this._logger.error(`Mime Codec not supported: ${this._mimeCodecs}`);
                    throw new Error("Mime Codec not supported");
                }

                this._sourceBuffer = this._mediaSource.addSourceBuffer(this._mimeCodecs);
                this._queue = new Uint8ArrayQueue();

                this._logger.info("Starting video");
                return;
            }

            /*
             * messageCount > 1
             * All other messages are handled here. All of them are segments of the
             * H.264 fMP4 stream.
             */

            /*
             * Do a housekeeping cycle every HOUSE_KEEPING_INTERVAL_MESSAGES messages.
             */
            if(messageCount % this.HOUSEKEEPING_INTERVAL_MESSAGES == 0) {
                this._logger.debug(`Processing message: ${messageCount}, starting housekeeping cycle`);
                this._logger.debug(`queue.size: ${this._queue.size()}, ` +
                                   `buffer start: ${this._sourceBuffer.buffered.start(0)}, ` +
                                   `buffer end: ${this._sourceBuffer.buffered.end(0)}, ` +
                                   `buffer size: ${this._sourceBuffer.buffered.end(0) - this._sourceBuffer.buffered.start(0)}, ` +
                                   `byte received: ${byteCount}`);

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
            byteCount += data.length

            if (this._sourceBuffer.updating == false) {
                if (cleanup > 0) {

                    /*
                     * A cleanup cycle was requested, start it now. Cleanup can
                     * proceed only if the SourceBuffer is ready (i.e., not updating).
                     * If successful, the SourceBuffer is reduced, leaving in it only
                     * the last KEEP_VIDEO_SECONDS seconds of video.
                     */

                    if(cleanup == 1) {
                        this._logger.debug("Starting cleanup cycle");
                    } else {
                        this._logger.error(`Retrying cleanup cycle, this is attempt: ${cleanup}`)
                    }

                    try {
                        let bufferSize = this._sourceBuffer.buffered.end(0) - this._sourceBuffer.buffered.start(0);
                        this._logger.debug(`Buffer size: ${bufferSize}`);

                        if (bufferSize > this.KEEP_VIDEO_SECONDS) {
                            this._sourceBuffer.remove(0, this._sourceBuffer.buffered.end(0) - this.KEEP_VIDEO_SECONDS);
                            this._logger.debug("Cleaning buffer");
                        }

                        this._logger.debug("SourceBuffer cleaned");
                        cleanup = 0;
                        return;

                    } catch (e) {
                        this._logger.debug(`Failed to clean up SourceBuffer: ${e}`);
                        cleanup++;
                    }
                }

                const data = new Uint8Array(event.data);
                try {
                    this._sourceBuffer.appendBuffer(this.dehydrateQueue(this._queue));
                } catch (e) {
                    this._logger.error(`Error, appendBuffer failed: ${e}`);
                }

            } else {
                /*
                 * Update the source buffer as soon as the previous update ends,
                 * and then go back to the normal driving loop.
                 */
                this._sourceBuffer.onupdateend = () => {
                    try {
                        if (this._sourceBuffer.updating == false) {
                            this._sourceBuffer.appendBuffer(this.dehydrateQueue(this._queue));
                        }
                    } catch(e) {
                       this._logger.error(`Error, appendBuffer failed inside onUpdateEnd: ${e}`);
                    } finally {
                        this._sourceBuffer.onupdateend = undefined;
                    }
                }
            }
        }
    }

    /*
     * Dequeues all Uint8Array elements from the provided queue, concatenates them,
     * and returns a single Uint8Array containing all the data.
     */
    private dehydrateQueue(queue: Uint8ArrayQueue): Uint8Array {
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
}

class Uint8ArrayQueue {
    private queue: Uint8Array[];

    constructor() {
        this.queue = [];
    }

    enqueue(element: Uint8Array): void {
        this.queue.push(element);
    }

    dequeue(): Uint8Array | undefined {
        return this.queue.shift();
    }

    peek(): Uint8Array | undefined {
        return this.queue[0];
    }

    isEmpty(): boolean {
        return this.queue.length === 0;
    }

    size(): number {
        return this.queue.length;
    }
}