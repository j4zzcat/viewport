class pX {
    get byteLength() {
        return this.buffer.byteLength
    }

    get view() {
        return new Uint8Array(this.buffer, 0, this.index)
    }

    constructor(e) {
        this.pool = void 0, this.buffer = void 0, this.appendView = void 0, this.index = void 0, this.pool = e, this.buffer = e.createBuffer(), this.appendView = new Uint8Array(this.buffer), this.index = 0
    }

    canAppend(e) {
        const t = this.byteLength;
        let n = this.index;
        for (let r = 0; r < e.length; r += 1) if (e[r] && (n += e[r].byteLength, n > t)) return !1;
        return !0
    }

    append(e) {
        for (let t = 0; t < e.length; t += 1) if (e[t]) {
            const n = e[t].byteLength;
            this.appendView.set(e[t], this.index), this.index += n
        }
    }

    free() {
        this.pool.free(this), this.index = 0
    }
}

const {URL: EX, MediaSource: hX} = window, mX = new class {
    constructor(e) {
        this.size = void 0, this.pool = void 0, this.inuse = void 0, this.size = e, this.pool = [], this.inuse = []
    }

    createBuffer() {
        return new ArrayBuffer(this.size)
    }

    alloc() {
        this.pool.length || this.pool.push(new pX(this));
        const e = this.pool.pop();
        return this.inuse.push(e), e
    }

    free(e) {
        const t = this.inuse.indexOf(e);
        if (t < 0) throw new Error("Buffer is not part of pool.");
        this.inuse.splice(t, 1), this.pool.push(e)
    }
}(3145728);

class fX extends r.Component {
    constructor() {
        var e;
        super(...arguments), e = this, this.video = null, this.moov = void 0, this.mediaSource = void 0, this.sourceBuffer = void 0, this.startTime = void 0, this.endTime = void 0, this.toRemove = {
            start: null, end: null
        }, this.appendQueue = [], this.preMoovSegments = [], this.logger = lr().wrap(Dr.qs.TIMELAPSE_PLAYER), this.throttledCheckTimeInBuffer = Xr()(this.checkTimeInBuffer, 300), this.play = () => {
            this.video && (this.logger.verbose(`playing video at ${this.currentTime}`), this.video.play().then((() => {
                    this.video ? this.logger.debug(`playing ${this.video.src}`) : this.logger.warn("playing started but video reference no longer valid")
                })).catch((e => {
                    this.logger.error("error playing", e)
                })))
        }
            , this.pause = () => {
            this.logger.verbose(`pausing video at ${this.currentTime}`), this.video?.pause()
        }
            , this.appendBuffers = function () {
            for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
            if (n.length) {
                const t = e.appendQueue;
                let r = t[t.length - 1];
                const i = n.flat(2);
                if (!r || !r.canAppend(i)) {
                    if (r && 0 === r.index) throw new Error("Buffer size too large.");
                    r = mX.alloc(), t.push(r)
                }
                r.append(i)
            }
            if (!e.sourceBuffer) return;
            if (!e.moov || !n.length && !e.appendQueue.length) return void e.clearBuffers();
            if (e.sourceBuffer.updating) return void (e.sourceBuffer.onupdateend = () => {
                    e.appendBuffers()
                });
            if (e.video && e.video.error) return void e.onError(e.video.error);
            const i = e.appendQueue.shift();
            e.sourceBuffer.appendBuffer(i.view), i.free(), e.onProgress(), e.sourceBuffer.onupdateend = () => {
                e.appendQueue.length ? e.appendBuffers() : e.clearBuffers()
            }
        }
            , this.clearBuffers = (e, t) => (null != e && null != t && (this.toRemove.start = Math.min(e, this.toRemove.start || e), this.toRemove.end = Math.max(t, this.toRemove.end || t)), !(this.sourceBuffer && !this.sourceBuffer.updating && (this.toRemove.start || this.toRemove.end) && (this.toRemove = {
            start: null, end: null
        }, 1))), this.attach = e => {
            const {cameraId: t} = e;
            this.logger.verbose(`about to attach stream ${t}`), e.on("segment", this.onPreMoovSegment), e.attach(this).then((n => {
                    let [r, i] = n;
                    this.toRemove = {
                        start: null, end: null
                    }, this.appendQueue = [], this.moov = i, this.appendBuffers(i), e.off("segment", this.onPreMoovSegment), this.preMoovSegments.forEach((e => this.onSegment(e))), this.preMoovSegments = [], e.on("segment", this.onSegment);
                    const {video: o} = this;
                    if (!o) return this.logger.verbose(`attached stream ${t} but will detach because video element is missing`), void e.detach(this);
                    const a = new hX;
                    this.mediaSource = a, o.src = EX.createObjectURL(a), this.logger.verbose(`attached stream ${t} with src=${o.src}`), a.onsourceopen = () => {
                        if (!r) throw new Error("Missing codecs");
                        this.sourceBuffer = a.addSourceBuffer(r), this.sourceBuffer.onerror = this.onError, a.onsourceopen = null, this.appendBuffers()
                    }
                })).catch((e => (0, a.s9)("Failed to attach stream", e)))
        }
            , this.detach = e => {
            const {cameraId: t} = e;
            if (this.logger.verbose(`about to detach stream ${t}`), this.moov = null, e.detach(this).then((() => {
                    e.removeListener("segment", this.onSegment)
                })).catch((e => (0, a.s9)("Failed to detach stream", e))), this.mediaSource && this.sourceBuffer && this.mediaSource.removeSourceBuffer(this.sourceBuffer), this.video && this.video.src) {
                const {src: e} = this.video;
                EX.revokeObjectURL(e), this.logger.verbose(`detaching stream ${t} with src=${e}`)
            } else this.logger.warn(`detaching stream ${t} without video or src`, this);
            this.clearVideoProps(), this.clearSourceBuffer(), this.clearMediaSource()
        }
            , this.setVideo = e => {
            if (e && this.video) throw new Error("setVideo cannot be invoked twice");
            e ? (this.video = e, this.video.onprogress = this.onProgress, this.video.ontimeupdate = this.onProgress, this.video.onwaiting = this.onWaiting, this.video.oncanplay = this.onCanPlay, this.video.onplaying = this.onPlaying, this.video.onstalled = this.onStalled) : (this.clearVideoProps(), this.video = null)
        }
            , this.onCanPlay = e => {
            this.props.onCanPlay && this.props.onCanPlay(e)
        }
            , this.onPlaying = e => {
            this.props.onPlaying && this.props.onPlaying(e)
        }
            , this.onStalled = e => {
            this.props.onStalled && this.props.onStalled(e)
        }
            , this.onWaiting = e => {
            const {paused: t, buffered: n, currentTime: r} = this.video;
            if (!t && r) {
                for (let e = 0; e < n.length - 1; e += 1) if (n.start(e) > r) {
                    this.video.currentTime = n.start(e);
                    break
                }
                this.onProgress(e)
            }
        }
            , this.seek = e => {
            this.logger.verbose(`seek: from ${this.currentTime} to ${e}`), this.currentTime = e
        }
            , this.onSegment = e => {
            this.logger.silly("segment received"), this.appendBuffers(e)
        }
            , this.onPreMoovSegment = e => {
            this.preMoovSegments.push(e)
        }
            , this.onProgress = e => {
            const {video: t} = this;
            if (!t) return;
            const n = t.buffered;
            if (!n.length) return;
            const {autoPlay: r} = this.props;
            this.startTime = n.start(0), this.endTime = n.end(t.buffered.length - 1), r && !this.currentTime && this.isPaused && (this.currentTime = this.startTime, this.play()), !document.hidden && this.props.onProgress && this.props.onProgress(this.currentTime, this.startTime, this.endTime), this.throttledCheckTimeInBuffer()
        }
            , this.onError = e => {
            this.logger.error("error", e), this.props.onError && this.props.onError(e)
        }
            , this.shouldComponentUpdate = () => !1, this.UNSAFE_componentWillReceiveProps = e => {
            const t = this.props.stream, n = e.stream;
            t !== n && (t && this.detach(t), n && this.attach(n)), e.muted !== this.props.muted && this.video && (this.video.muted = !!e.muted)
        }
            , this.componentDidMount = () => {
            this.props.stream && this.attach(this.props.stream)
        }
            , this.componentWillUnmount = () => {
            const {stream: e} = this.props;
            e && this.detach(e)
        }
    }

    get currentTime() {
        return this.video?.currentTime || 0
    }

    set currentTime(e) {
        this.video && this.video.currentTime !== e && (this.video.currentTime = e, this.throttledCheckTimeInBuffer())
    }

    get isPlaying() {
        return !!this.video && !this.video.paused
    }

    get isPaused() {
        return !this.video || this.video.paused
    }

    checkTimeInBuffer() {
        if (!this.video || this.props.isEPTZmode) return;
        const e = this.video.buffered || [], {hideWhenNoData: t, onCurrentTimeNotBuffered: n} = this.props,
            r = e.length, i = this.currentTime - 300, o = this.currentTime + 300;
        let a = !1;
        for (let t = 0; t < r; t++) if (e.start(t) < o && i < e.end(t)) {
            a = !0;
            break
        }
        this.video.setAttribute("style", a ? "" : t ? "opacity: 0" : "filter: blur(16px)"), !a && n && n()
    }

    clearVideoProps() {
        this.video && (this.video.onerror = null, this.video.onwaiting = null, this.video.onprogress = null, this.video.ontimeupdate = null, this.video.onstalled = null, this.video.onplaying = null, this.video.removeAttribute("src"), this.video.load())
    }

    clearMediaSource() {
        this.mediaSource && (this.mediaSource.onsourceopen = null, this.mediaSource = null)
    }

    clearSourceBuffer() {
        this.clearBuffers(), this.sourceBuffer && (this.sourceBuffer.onupdateend = null, this.sourceBuffer.onerror = null, this.sourceBuffer = null)
    }

    render() {
        const {isEPTZmode: e} = this.props;
        return r.createElement("video", {
            muted: this.props.muted, ref: this.setVideo, style: {
                opacity: e ? 1e-8 : void 0
            }
        })
    }
}

fX.defaultProps = {
    muted: !1, autoPlay: !0
};