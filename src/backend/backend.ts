import {Logger} from "../utils/logger";

export class BasePlugin {
    private readonly _id;

    constructor(id: string) {
        this._id = id;
    }

    public get id(): string { return this._id; }
}

export interface IStreamManager {
    canHandle(url: URL): boolean
    getOrCreateStream(url: URL): IStream[]
};

export interface IStream {
    get id(): string;
    get codec(): string;
    get container(): string;
    get endpoint(): string;

    start();
    stop();
}

export interface ILayoutManager {
}

export class UnifiStreamManager extends BasePlugin implements IStreamManager {
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

    public getOrCreateStream(url: URL): IStream[] {
        return [new UnifiStream(url)];
    }
}

export class UnifiStream implements IStream {
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

    public start() {
        this._logger.debug(`Starting stream '${this.id}'...`);
        this._logger.debug(`Connecting to Unifi fMPEG web socket for camera ${this._camera.name }`);
    }

    public stop() {
        this._logger.debug(`Stopping stream '${this.id}'`);
    }
}

export class RTSPStreamManager extends BasePlugin implements IStreamManager {
    private _logger = Logger.createLogger(RTSPStreamManager.name);

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

    public getOrCreateStream(url: URL): IStream[] {
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

    public start() {
        this._logger.debug(`Starting stream '${this.id}'...`);
        this._logger.debug(`Starting ffmpeg to transcode the RTSP stream into FLV stream`);
        this._logger.debug(`ffmpeg is running, pid is '4311'`);
    }

    public stop() {
        this._logger.debug(`Stopping stream '${this.id}'`);
    }
}


export class GridLayoutManager extends BasePlugin implements ILayoutManager {
    constructor() {
        super('grid');
    }
}

export class PluginRegistry {
    private _logger = Logger.createLogger(PluginRegistry.name);
    private _streamsManagers = [];
    private _layoutManagers = [];

    public addStreamsManager(...plugins): PluginRegistry {
        this._logger.debug(`Adding '${plugins.length}' streams managers: '${plugins.map((value) => value.id)}'`);
        this._streamsManagers = [...this._streamsManagers, ...plugins];
        return this;
    }

    public addLayoutManager(...plugins): PluginRegistry {
        this._logger.debug(`Adding '${plugins.length}' layout managers: '${plugins.map((value) => value.id)}'`);
        this._layoutManagers = [...this._layoutManagers, ...plugins];
        return this;
    }

    public getStreamManager(url: URL) {
        for(let streamsManager of this._streamsManagers) {
            if(streamsManager.canHandle(url)) {
                this._logger.debug(`Streams manager '${streamsManager.id}' can handle '${url}'`);
                return streamsManager;
            }
        }

        throw new Error(`No suitable streams manager to handle '${url}'`);
    }
}

export class Backend {
    private _logger = Logger.createLogger(Backend.name);
    private _pluginRegistry: PluginRegistry;

    public constructor() {
        this._logger.debug('Filling plugin registry...');

        this._pluginRegistry = new PluginRegistry()
            .addStreamsManager(
                new UnifiStreamManager(),
                new RTSPStreamManager())
            .addLayoutManager(
                new GridLayoutManager()
            );
    }

    public async handleStreamAction(layout: string, streams: readonly string[]) {
        this._logger.debug(`Handling stream action`);
        for(let stream of streams) {
            let url;

            try {
                url = new URL(stream);
            } catch(e) {
                this._logger.error(e);
                throw new Error(`Failed to process stream url, got '${e}'`);
            }

            this._logger.debug(`Processing stream '${stream}'`);
            Logger.addRedaction(url.password);

            let streamManager = this._pluginRegistry.getStreamManager(url);
            let streams = streamManager.getOrCreateStream(url);
            for(let stream of streams) {
                stream.start();
                this._logger.info(`Started stream '${stream.id}', codec is '${stream.codec}', container is '${stream.container}' endpoint is '${stream.endpoint}'`)
            }
        }
    }
}

