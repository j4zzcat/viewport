import React from 'react';

class LiveStreamPlayer extends React.Component {
    constructor() {
        super(...arguments);
        this.videoElement = null;
        this.moovHeader = undefined;
        this.mediaSourceInstance = undefined;
        this.sourceBufferInstance = undefined;
        this.startTime = undefined;
        this.endTime = undefined;
        this.bufferToRemove = { start: null, end: null };
        this.appendQueue = [];
        this.segmentQueue = [];
        this.logger = createLogger().wrap(LoggerTag.TIMELAPSE_PLAYER);
        this.throttledCheckBufferStatus = throttle(this.checkBufferStatus, 300);
    }

    playVideo = () => {
        if (this.videoElement) {
            this.logger.verbose(`Playing video at ${this.currentTime}`);
            this.videoElement.play()
                .then(() => {
                    this.videoElement
                        ? this.logger.debug(`Playing ${this.videoElement.src}`)
                        : this.logger.warn("Playing started but video reference is no longer valid");
                })
                .catch(error => {
                    this.logger.error("Error playing video", error);
                });
        }
    }

    pauseVideo = () => {
        this.logger.verbose(`Pausing video at ${this.currentTime}`);
        this.videoElement?.pause();
    }

    appendBuffers = (...buffers) => {
        if (buffers.length) {
            const lastBufferSegment = this.appendQueue[this.appendQueue.length - 1];
            const flatBuffers = buffers.flat(2);

            if (!lastBufferSegment || !lastBufferSegment.canAppendBuffers(flatBuffers)) {
                if (lastBufferSegment && lastBufferSegment.index === 0) {
                    throw new Error("Buffer size too large.");
                }

                const newSegment = BufferSegment.allocate();
                this.appendQueue.push(newSegment);
            }

            lastBufferSegment.appendBuffers(flatBuffers);
        }

        if (!this.sourceBufferInstance) return;
        if (!this.moovHeader || (!buffers.length && !this.appendQueue.length)) {
            return this.clearBuffers();
        }

        if (this.sourceBufferInstance.updating) {
            this.sourceBufferInstance.onupdateend = () => {
                this.appendBuffers();
            };
            return;
        }

        if (this.videoElement && this.videoElement.error) {
            return this.handleError(this.videoElement.error);
        }

        const nextSegment = this.appendQueue.shift();
        this.sourceBufferInstance.appendBuffer(nextSegment.bufferView);
        nextSegment.release();
        this.updateProgress();
        this.sourceBufferInstance.onupdateend = () => {
            this.appendQueue.length ? this.appendBuffers() : this.clearBuffers();
        };
    }

    clearBuffers = (start = null, end = null) => {
        if (start !== null && end !== null) {
            this.bufferToRemove.start = Math.min(start, this.bufferToRemove.start || start);
            this.bufferToRemove.end = Math.max(end, this.bufferToRemove.end || end);
        }

        if (!this.sourceBufferInstance || this.sourceBufferInstance.updating) return false;

        if (this.bufferToRemove.start !== null || this.bufferToRemove.end !== null) {
            this.bufferToRemove = { start: null, end: null };
            return true;
        }

        return false;
    }

    attachStream = (stream) => {
        const { cameraId } = stream;
        this.logger.verbose(`About to attach stream ${cameraId}`);
        stream.on("segment", this.handlePreMoovSegment);

        stream.attach(this)
            .then(([codec, moov]) => {
                this.bufferToRemove = { start: null, end: null };
                this.appendQueue = [];
                this.moovHeader = moov;
                this.appendBuffers(moov);

                stream.off("segment", this.handlePreMoovSegment);
                this.segmentQueue.forEach(segment => this.handleSegment(segment));
                this.segmentQueue = [];

                stream.on("segment", this.handleSegment);

                const { videoElement } = this;
                if (!videoElement) {
                    this.logger.verbose(`Attached stream ${cameraId} but will detach because video element is missing`);
                    return stream.detach(this);
                }

                const mediaSourceInstance = new MediaSource();
                this.mediaSourceInstance = mediaSourceInstance;
                videoElement.src = URL.createObjectURL(mediaSourceInstance);
                this.logger.verbose(`Attached stream ${cameraId} with src=${videoElement.src}`);

                mediaSourceInstance.onsourceopen = () => {
                    if (!codec) throw new Error("Missing codecs");
                    this.sourceBufferInstance = mediaSourceInstance.addSourceBuffer(codec);
                    this.sourceBufferInstance.onerror = this.handleError;
                    mediaSourceInstance.onsourceopen = null;
                    this.appendBuffers();
                };
            })
            .catch(error => handleError("Failed to attach stream", error));
    }

    detachStream = (stream) => {
        const { cameraId } = stream;
        this.logger.verbose(`About to detach stream ${cameraId}`);
        this.moovHeader = null;

        stream.detach(this)
            .then(() => {
                stream.removeListener("segment", this.handleSegment);
            })
            .catch(error => handleError("Failed to detach stream", error));

        if (this.mediaSourceInstance && this.sourceBufferInstance) {
            this.mediaSourceInstance.removeSourceBuffer(this.sourceBufferInstance);
        }

        if (this.videoElement && this.videoElement.src) {
            const { src } = this.videoElement;
            URL.revokeObjectURL(src);
            this.logger.verbose(`Detaching stream ${cameraId} with src=${src}`);
        } else {
            this.logger.warn(`Detaching stream ${cameraId} without video element or src`);
        }

        this.clearVideoProperties();
        this.clearSourceBufferProperties();
        this.clearMediaSourceProperties();
    }

    setVideoElement = (videoElement) => {
        if (videoElement && this.videoElement) {
            throw new Error("setVideoElement cannot be invoked twice");
        }

        if (videoElement) {
            this.videoElement = videoElement;
            this.videoElement.onprogress = this.updateProgress;
            this.videoElement.ontimeupdate = this.updateProgress;
            this.videoElement.onwaiting = this.handleWaiting;
            this.videoElement.oncanplay = this.handleCanPlay;
            this.videoElement.onplaying = this.handlePlaying;
            this.videoElement.onstalled = this.handleStalled;
        } else {
            this.clearVideoProperties();
            this.videoElement = null;
        }
    }

    handleCanPlay = (event) => {
        this.props.onCanPlay && this.props.onCanPlay(event);
    }

    handlePlaying = (event) => {
        this.props.onPlaying && this.props.onPlaying(event);
    }

    handleStalled = (event) => {
        this.props.onStalled && this.props.onStalled(event);
    }

    handleWaiting = (event) => {
        const { paused, buffered, currentTime } = this.videoElement;
        if (!paused && currentTime) {
            for (let i = 0; i < buffered.length - 1; i += 1) {
                if (buffered.start(i) > currentTime) {
                    this.videoElement.currentTime = buffered.start(i);
                    break;
                }
            }
            this.updateProgress(event);
        }
    }

    seekTo = (time) => {
        this.logger.verbose(`Seek: from ${this.currentTime} to ${time}`);
        this.currentTime = time;
    }

    handleSegment = (segment) => {
        this.logger.silly("Segment received");
        this.appendBuffers(segment);
    }

    handlePreMoovSegment = (segment) => {
        this.segmentQueue.push(segment);
    }

    updateProgress = (event) => {
        const { videoElement } = this;
        if (!videoElement) return;

        const buffered = videoElement.buffered;
        if (!buffered.length) return;

        const { autoPlay } = this.props;
        this.startTime = buffered.start(0);
        this.endTime = buffered.end(videoElement.buffered.length - 1);

        if (autoPlay && !this.currentTime && this.isPaused) {
            this.currentTime = this.startTime;
            this.playVideo();
        }

        if (!document.hidden && this.props.onProgress) {
            this.props.onProgress(this.currentTime, this.startTime, this.endTime);
        }

        this.throttledCheckBufferStatus();
    }

    handleError = (error) => {
        this.logger.error("Error", error);
        this.props.onError && this.props.onError(error);
    }

    shouldComponentUpdate = () => false;

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        const currentStream = this.props.stream;
        const nextStream = nextProps.stream;

        if (currentStream !== nextStream) {
            if (currentStream) {
                this.detachStream(currentStream);
            }
            if (nextStream) {
                this.attachStream(nextStream);
            }
        }

        if (nextProps.muted !== this.props.muted && this.videoElement) {
            this.videoElement.muted = !!nextProps.muted;
        }
    }

    componentDidMount = () => {
        this.props.stream && this.attachStream(this.props.stream);
    }

    componentWillUnmount = () => {
        const { stream } = this.props;
        stream && this.detachStream(stream);
    }

    get currentTime() {
        return this.videoElement?.currentTime || 0;
    }

    set currentTime(value) {
        if (this.videoElement && this.videoElement.currentTime !== value) {
            this.videoElement.currentTime = value;
            this.throttledCheckBufferStatus();
        }
    }

    get isPlaying() {
        return !!this.videoElement && !this.videoElement.paused;
    }

    get isPaused() {
        return !this.videoElement || this.videoElement.paused;
    }

    checkBufferStatus = () => {
        if (!this.videoElement || this.props.isEPTZMode) return;

        const bufferedLists = this.videoElement.buffered || [];
        const { hideWhenNoData, onCurrentTimeNotBuffered } = this.props;
        const bufferedRangesCount = bufferedLists.length;
        const bufferStartWindow = this.currentTime - 300;
        const bufferEndWindow = this.currentTime + 300;

        let isBuffered = false;

        for (let i = 0; i < bufferedRangesCount; i++) {
            if (bufferedLists.start(i) < bufferEndWindow && bufferStartWindow < bufferedLists.end(i)) {
                isBuffered = true;
                break;
            }
        }

        this.videoElement.setAttribute("style", isBuffered ? "" : hideWhenNoData ? "opacity: 0" : "filter: blur(16px)");
        !isBuffered && onCurrentTimeNotBuffered && onCurrentTimeNotBuffered();
    }

    clearVideoProperties = () => {
        if (this.videoElement) {
            this.videoElement.onerror = null;
            this.videoElement.onwaiting = null;
            this.videoElement.onprogress = null;
            this.videoElement.ontimeupdate = null;
            this.videoElement.onstalled = null;
            this.videoElement.onplaying = null;
            this.videoElement.removeAttribute("src");
            this.videoElement.load();
        }
    }

    clearMediaSourceProperties = () => {
        if (this.mediaSourceInstance) {
            this.mediaSourceInstance.onsourceopen = null;
            this.mediaSourceInstance = null;
        }
    }

    clearSourceBufferProperties = () => {
        this.clearBuffers();
        if (this.sourceBufferInstance) {
            this.sourceBufferInstance.onupdateend = null;
            this.sourceBufferInstance.onerror = null;
            this.sourceBufferInstance = null;
        }
    }

    render() {
        const { isEPTZMode } = this.props;

        return (
            <video
                muted={this.props.muted}
                ref={this.setVideoElement}
                style={{ opacity: isEPTZMode ? 0.00000001 : undefined }}
            />
        );
    }
}

LiveStreamPlayer.defaultProps = {
    muted: false,
    autoPlay: true,
};

function createLogger() {
    // Mock logger creation
    return {
        wrap: () => ({
            verbose: console.log,
            debug: console.log,
            warn: console.log,
            error: console.log,
            silly: console.log,
        }),
    };
}

function handleError(message, error) {
    console.error(message, error);
}

function throttle(func, delay) {
    // Mock throttle implementation
    return func;
}

class BufferSegment {
    static allocate() {
        return new BufferSegment();
    }

    appendBuffers(buffers) {
        // Implementation of appendBuffers
    }

    release() {
        // Implementation of release
    }

    canAppendBuffers() {
        return true;
    }
}

class LoggerTag {
    static TIMELAPSE_PLAYER = 'Timelapse_Player';
}

export default LiveStreamPlayer;