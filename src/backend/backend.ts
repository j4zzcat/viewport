import {Logger} from "../utils/logger";

export class BasePlugin {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}

export interface IStreamManagerPlugin {
};

export interface ILayoutManagerPlugin {
}

export class UnifiStreamManager extends BasePlugin implements IStreamManagerPlugin {
    constructor() {
        super('unifi');
    }
}

export class RTSPStreamManager extends BasePlugin implements IStreamManagerPlugin {
    constructor() {
        super('rtsp');
    }

}

export class GridLayoutManager extends BasePlugin implements ILayoutManagerPlugin {
    constructor() {
        super('grid');
    }
}

export class PluginRegistry {
    private _logger = Logger.createLogger(PluginRegistry.name);
    private _protocolManagerPlugins = [];
    private _layoutPlugins = [];

    public addStreamManagerPlugins(...plugins): PluginRegistry {
        this._logger.debug(`Adding stream manager plugins '${plugins.map((value) => value.id)}'`);
        this._protocolManagerPlugins = [...this._protocolManagerPlugins, ...plugins];
        return this;
    }

    public addLayoutManagerPlugins(...plugins): PluginRegistry {
        this._logger.debug(`Adding layout manager plugins '${plugins.map((value) => value.id)}'`);
        this._layoutPlugins = [...this._layoutPlugins, ...plugins];
        return this;
    }
}

export class Backend {
    private _logger = Logger.createLogger(Backend.name);
    private _pluginRegistry: PluginRegistry;

    public constructor() {
        this._logger.debug('Filling plugin registry...');

        this._pluginRegistry = new PluginRegistry()
            .addStreamManagerPlugins(
                new UnifiStreamManager(),
                new RTSPStreamManager())
            .addLayoutManagerPlugins(
                new GridLayoutManager()
            );
    }

    public async handleStreamAction(layout: string, streams: readonly string[]) {
        for(let stream of streams) {
            this._logger.debug(`Processing stream '${stream}'`);
            // const url = new URL(stream);
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

export interface ILayoutPlugin {
}

export interface IProtocolPlugin {
    canHandle(url: URL): boolean
    createTranscoders(url: URL): Promise<ITranscoder[]>;
}

export interface ITranscoder {
    start();
    stop();
}

export class PluginFactory {
    private _plugins: IProtocolPlugin[];
    private _transcoders: Map<URL, ITranscoder> = new Map<URL, ITranscoder>();

    public constructor(protocol_managers: IProtocolPlugin[]) {
        this._plugins = protocol_managers;
    }

    createTranscoders(url: URL): Promise<ITranscoder[]> {
        for(let pm of this._plugins) {
            if(pm.canHandle(url) == false) continue;
            return pm.createTranscoders(url);
        }
        throw Error(`No suitable Protocol Manager for url '${url}'`);
    }
}

