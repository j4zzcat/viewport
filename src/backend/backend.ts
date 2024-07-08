import {Logger} from "../utils/logger";

export class BasePlugin {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}

export interface IStreamManager {
    canHandle(url: URL): boolean
    getOrCreateStream(url: URL): IStream[]
};

export interface IStream {
    id: string;
    codec: string;
    endpoint: string;

    start()
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
        throw new Error("Method not implemented.");
    }
}

export class RTSPStreamManager extends BasePlugin implements IStreamManager {
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
        return [new RTSPStream(url) ]
    }
}

export class RTSPStream implements IStream {
    private _logger = Logger.createLogger(RTSPStream.name);
    private _url;
    codec: string;
    endpoint: string;
    id: string;

    constructor(url: URL) {
        this._url = url;
    }

    start() {
        this._logger.info(`Starting stream '${this.id}'`);
    }
}


export class GridLayoutManager extends BasePlugin implements ILayoutManager {
    constructor() {
        super('grid');
    }
}

export class PluginRegistry {
    private _logger = Logger.createLogger(PluginRegistry.name);
    private _streamManagers = [];
    private _layoutManagers = [];

    public addStreamManager(...plugins): PluginRegistry {
        this._logger.debug(`Adding stream manager plugins '${plugins.map((value) => value.id)}'`);
        this._streamManagers = [...this._streamManagers, ...plugins];
        return this;
    }

    public addLayoutManager(...plugins): PluginRegistry {
        this._logger.debug(`Adding layout manager plugins '${plugins.map((value) => value.id)}'`);
        this._layoutManagers = [...this._layoutManagers, ...plugins];
        return this;
    }

    public getStreamManager(url: URL) {
        for(let streamManager of this._streamManagers) {
            if(streamManager.canHandle(url)) {
                this._logger.debug(`Stream manager '${streamManager.id}' can handle '${url}'`);
                return streamManager;
            }
        }

        throw new Error(`No suitable stream manager to handle '${url}'`);
    }
}

export class Backend {
    private _logger = Logger.createLogger(Backend.name);
    private _pluginRegistry: PluginRegistry;

    public constructor() {
        this._logger.debug('Filling plugin registry...');

        this._pluginRegistry = new PluginRegistry()
            .addStreamManager(
                new UnifiStreamManager(),
                new RTSPStreamManager())
            .addLayoutManager(
                new GridLayoutManager()
            );
    }

    public async handleStreamAction(layout: string, streams: readonly string[]) {
        for(let stream of streams) {
            this._logger.debug(`Processing stream '${stream}'`);

            let url;
            try {
                url = new URL(stream);
            } catch(e) {
                this._logger.error(e);
                throw new Error(`Failed to process stream url '${stream}', got '${e}'`);
            }

            let streamManager = this._pluginRegistry.getStreamManager(url);
            let streams = streamManager.getOrCreateStream(url);
            for(let stream of streams) {
                stream.start();
                this._logger.info(`Started stream '${stream.id}', codec is '${stream.codec}', endpoint is '${stream.endpoint}'`)
            }

            // const protocolManager pm = this._pluginRegistry.protocolManagerFor(url);
            // const videoStreams: IVideoStream[] = pm.createStreams(url);
            //
            // for(let stream of videoStreams) {
            //     stream.start();
            //     this._logger(`Started video stream '${stream.id}', endpoint is '${stream.endpoint}'`);
            // }

            // try {
            //     const transcoders = await this._transcoderFactory.createTranscoders(url);
            //     for(let transcoder of transcoders) {
            //         this._logger.info(`Starting transcoder`);
            //         transcoder.start();
            //
            //     }
            // } catch (e) {
            //     logger.error(e);
            //     process.exit(1);
            // }
        }
    }
}

