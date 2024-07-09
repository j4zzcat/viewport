import {Logger} from "../utils/logger";
import {IStream, IVideoProvider} from "./backend";
import {BasePlugin} from "../utils/plugin";

export class RTSPVideoProvider extends BasePlugin implements IVideoProvider {
    private _logger = Logger.createLogger(RTSPVideoProvider.name);

    constructor() {
        super('rtsp');
    }

    public canHandle(url: URL): boolean {
        switch(url.protocol.split(':')[0]) {
            case 'rtsp':
            case 'rtsps':
                return true;
            default:
                return false;
        }
    }

    public async getOrCreateStreams(url: URL): Promise<IStream[]> {
        this._logger.debug(`Creating new RTSPStream to handle '${url}'`);
        return [new RTSPStream(url) ]
    }
}

export class RTSPStream implements IStream {
    private _logger = Logger.createLogger(RTSPStream.name);
    private readonly _url;
    private readonly _id: string;
    private _codec: string;
    private _container: string;
    private _endpoint: string;

    constructor(url: URL) {
        this._url = url;
        this._id = this._url;
    }

    public get id(): string { return this._id; }
    public get codec(): string { return this._codec; }
    public get container(): string { return this._container }
    public get endpoint(): string { return this._endpoint }

    public async start(): Promise<void> {
        this._logger.debug(`Starting stream '${this.id}'...`);
        this._logger.debug(`Starting ffmpeg to transcode the RTSP stream into FLV stream`);
        this._logger.debug(`ffmpeg is running, pid is '4311'`);
    }

    public async stop(): Promise<void> {
        this._logger.debug(`Stopping stream '${this.id}'`);
    }
}
