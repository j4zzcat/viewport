import {Logger} from "../utils/logger";
import {IStream, IStreamsManager} from "./backend";
import {BasePlugin} from "../utils/plugin";

export class UnifiStreamsManager extends BasePlugin implements IStreamsManager {
    constructor() {
        super('unifi');
    }

    public canHandle(url: URL): boolean {
        switch(url.protocol.split(':')[0]) {
            case 'unifi':
                return true;
            default:
                return false;
        }
    }

    public getOrCreateStreams(url: URL): IStream[] {
        return [new UnifiStream(url)];
    }
}

export class UnifiStream implements IStream {
    private _logger = Logger.createLogger(UnifiStream.name);
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

    public start() {
        this._logger.debug(`Starting stream '${this.id}'...`);
        this._logger.debug(`Connecting to Unifi fMPEG web socket for camera ${this._camera.name }`);
    }

    public stop() {
        this._logger.debug(`Stopping stream '${this.id}'`);
    }
}
