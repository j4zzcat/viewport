class VideoStreamPlayer extends React.Component {
    constructor() {
        super(...arguments);
        this.videoElement = null;
        this.moovData = undefined;
        this.mediaSource = undefined;
        this.sourceBuffer = undefined;
        this.startTime = undefined;
        this.endTime = undefined;
        this.toRemove = { start: null, end: null };
        this.appendQueue = [];
        this.preMoovSegments = [];
        this.logger = createLogger().wrap(LoggerLevels.TIMELAPSE_PLAYER);
        this.throttledCheckTimeInBuffer = throttle(this.checkTimeInBuffer, 300);

        this.play = this.handlePlay;
        this.pause = this.handlePause;
        this.attachStream = this.attachStream.bind(this);
        this.detachStream = this.detachStream.bind(this);
        this.setVideoElement = this.setVideoElement.bind(this);
        this.seek = this.seek.bind(this);
    }

    handlePlay = () => {
        if (this.videoElement) {
            this.logger.verbose(`Playing video at ${this.currentTime}`);
            this.videoElement.play()
                .then(() => {
                    this.videoElement
                        ? this.logger.debug(`Playing ${this.videoElement.src}`)
                        : this.logger.warn("Playing started but video reference no longer valid");
                })
                .catch((error) => {
                    this.logger.error("Error playing", error);
                });
        }
    };

    handlePause = () => {
        this.logger.verbose(`Pausing video at ${this.currentTime}`);
        this.videoElement?.pause();
    };

    appendBuffers = (...buffers) => {
        if (buffers.length) {
            const appendQueue = this.appendQueue;
            let lastItem = appendQueue[appendQueue.length - 1];
            const flatBuffers = buffers.flat(2);
            if (!lastItem || !lastItem.canAppend(flatBuffers)) {
                if (lastItem && lastItem.index === 0) {
                    throw new Error("Buffer size too large.");
                }
                lastItem = BufferAllocator.alloc();
                appendQueue.push(lastItem);
            }
            lastItem.append(flatBuffers);
        }

        if (!this.sourceBuffer) return;
        if (!this.moovData || (!buffers.length && !this.appendQueue.length)) {
            return this.clearBuffers();
        }
        if (this.sourceBuffer.updating) {
            this.sourceBuffer.onupdateend = () => this.appendBuffers();
            return;
        }
        if (this.videoElement?.error) {
            return this.handleError(this.videoElement.error);
        }

        const bufferItem = this.appendQueue.shift();
        this.sourceBuffer.appendBuffer(bufferItem.view);
        bufferItem.free();
        this.handleProgress();
        this.sourceBuffer.onupdateend = () => {
            if (this.appendQueue.length) {
                this.appendBuffers();
            } else {
                this.clearBuffers();
            }
        };
    };

    clearBuffers = (start, end) => {
        if (start != null && end != null) {
            this.toRemove.start = Math.min(start, this.toRemove.start || start);
            this.toRemove.end = Math.max(end, this.toRemove.end || end);
        }
        if (this.sourceBuffer && !this.sourceBuffer.updating && (this.toRemove.start || this.toRemove.end)) {
            this.toRemove = { start: null, end: null };
            return true;
        }
        return false;
    };

    attachStream(stream) {
        const { cameraId } = stream;
        this.logger.verbose(`About to attach stream ${cameraId}`);
        stream.on("segment", this.onPreMoovSegment);
        stream.attach(this)
            .then(([codec, moov]) => {
                this.toRemove = { start: null, end: null };
                this.appendQueue = [];
                this.moovData = moov;
                this.appendBuffers(moov);
                stream.off("segment", this.onPreMoovSegment);
                this.preMoovSegments.forEach((segment) => this.onSegment(segment));
                this.preMoovSegments = [];
                stream.on("segment", this.onSegment);

                if (!this.videoElement) {
                    this.logger.verbose(`Attached stream ${cameraId} but will detach because video element is missing`);
                    stream.detach(this);
                    return;
                }

                const mediaSource = new MediaSource();
                this.mediaSource = mediaSource;
                this.videoElement.src = URL.createObjectURL(mediaSource);
                this.logger.verbose(`Attached stream ${cameraId} with src=${this.videoElement.src}`);

                mediaSource.onsourceopen = () => {
                    if (!codec) {
                        throw new Error("Missing codecs");
                    }
                    this.sourceBuffer = mediaSource.addSourceBuffer(codec);
                    this.sourceBuffer.onerror = this.handleError;
                    mediaSource.onsourceopen = null;
                    this.appendBuffers();
                };
            })
            .catch((error) => this.logger.error("Failed to attach stream", error));
    }

    detachStream(stream) {
        const { cameraId } = stream;
        this.logger.verbose(`About to detach stream ${cameraId}`);
        this.moovData = null;
        stream.detach(this)
            .then(() => {
                stream.removeListener("segment", this.onSegment);
            })
            .catch((error) => this.logger.error("Failed to detach stream", error));

        if (this.mediaSource && this.sourceBuffer) {
            this.mediaSource.removeSourceBuffer(this.sourceBuffer);
        }

        if (this.videoElement && this.videoElement.src) {
            const { src } = this.videoElement;
            URL.revokeObjectURL(src);
            this.logger.verbose(`Detaching stream ${cameraId} with src=${src}`);
        } else {
            this.logger.warn(`Detaching stream ${cameraId} without video or src`, this);
        }

        this.clearVideoProps();
        this.clearSourceBuffer();
        this.clearMediaSource();
    }

    setVideoElement(video) {
        if (video && this.videoElement) {
            throw new Error("setVideo cannot be invoked twice");
        }
        if (video) {
            this.videoElement = video;
            this.videoElement.onprogress = this.handleProgress;
            this.videoElement.ontimeupdate = this.handleProgress;
            this.videoElement.onwaiting = this.handleWaiting;
            this.videoElement.oncanplay = this.handleCanPlay;
            this.videoElement.onplaying = this.handlePlaying;
            this.videoElement.onstalled = this.handleStalled;
        } else {
            this.clearVideoProps();
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
            for (let i = 0; i < buffered.length - 1; i++) {
                if (buffered.start(i) > currentTime) {
                    this.videoElement.currentTime = buffered.start(i);
                    break;
                }
            }
            this.handleProgress(event);
        }
    }

    seek(time) {
        this.logger.verbose(`Seek: from ${this.currentTime} to ${time}`);
        this.currentTime = time;
    }

    onSegment = (segment) => {
        this.logger.silly("Segment received");
        this.appendBuffers(segment);
    }

    onPreMoovSegment = (segment) => {
        this.preMoovSegments.push(segment);
    }

    handleProgress = (event) => {
        const { videoElement } = this;
        if (!videoElement) return;

        const buffered = videoElement.buffered;
        if (!buffered.length) return;

        const { autoPlay } = this.props;
        this.startTime = buffered.start(0);
        this.endTime = buffered.end(buffered.length - 1);

        if (autoPlay && !this.currentTime && this.isPaused) {
            this.currentTime = this.startTime;
            this.play();
        }

        if (!document.hidden && this.props.onProgress) {
            this.props.onProgress(this.currentTime, this.startTime, this.endTime);
        }
        this.throttledCheckTimeInBuffer();
    }

    handleError = (error) => {
        this.logger.error("Error", error);
        this.props.onError && this.props.onError(error);
    }

    shouldComponentUpdate() {
        return false;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { stream: currentStream, muted: currentMuted } = this.props;
        const { stream: nextStream, muted: nextMuted } = nextProps;

        if (currentStream !== nextStream) {
            if (currentStream) this.detachStream(currentStream);
            if (nextStream) this.attachStream(nextStream);
        }

        if (nextMuted !== currentMuted && this.videoElement) {
            this.videoElement.muted = !!nextMuted;
        }
    }

    componentDidMount() {
        if (this.props.stream) {
            this.attachStream(this.props.stream);
        }
    }

    componentWillUnmount() {
        const { stream } = this.props;
        if (stream) {
            this.detachStream(stream);
        }
    }

    get currentTime() {
        return this.videoElement?.currentTime || 0;
    }

    set currentTime(value) {
        if (this.videoElement && this.videoElement.currentTime !== value) {
            this.videoElement.currentTime = value;
            this.throttledCheckTimeInBuffer();
        }
    }

    get isPlaying() {
        return !!this.videoElement && !this.videoElement.paused;
    }

    get isPaused() {
        return !this.videoElement || this.videoElement.paused;
    }

    checkTimeInBuffer() {
        if (!this.videoElement || this.props.isEPTZMode) return;

        const { hideWhenNoData, onCurrentTimeNotBuffered } = this.props;
        const bufferedRanges = this.videoElement.buffered || [];
        const rangeCount = bufferedRanges.length;
        const bufferStartTime = this.currentTime - 300;
        const bufferEndTime = this.currentTime + 300;

        let isBuffered = false;
        for (let i = 0; i < rangeCount; i++) {
            if (bufferedRanges.start(i) < bufferEndTime && bufferStartTime < bufferedRanges.end(i)) {
                isBuffered = true;
                break;
            }
        }

        this.videoElement.setAttribute("style", isBuffered ? "" : hideWhenNoData ? "opacity: 0" : "filter: blur(16px)");

        if (!isBuffered && onCurrentTimeNotBuffered) {
            onCurrentTimeNotBuffered();
        }
    }

    clearVideoProps() {
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

    clearMediaSource() {
        if (this.mediaSource) {
            this.mediaSource.onsourceopen = null;
            this.mediaSource = null;
        }
    }

    clearSourceBuffer() {
        this.clearBuffers();
        if (this.sourceBuffer) {
            this.sourceBuffer.onupdateend = null;
            this.sourceBuffer.onerror = null;
            this.sourceBuffer = null;
        }
    }

    render() {
        const { isEPTZMode, muted } = this.props;
        return (
            <video
                muted={muted}
                ref={this.setVideoElement}
                style={{ opacity: isEPTZMode ? 1e-8 : undefined }}
            />
        );
    }
}

VideoStreamPlayer.defaultProps = {
    muted: false,
    autoPlay: true,
};