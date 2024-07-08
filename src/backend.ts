import {logger} from "./logger";

export class Backend {
    private _logger = logger.child({ 'class': 'Backend' });
    private _transcoderFactory: PluginFactory;
    private _verbose: boolean;

    public constructor(tf) {
        this._transcoderFactory = tf;
    }

    public set verbosity(flag: boolean) {
        this._verbose = flag;
        logger.level = 'debug';
    }

    public async handleStreamsAction(grid: string, streams: string[]) {
        for(let stream of streams) {
            const url = new URL(stream);
            try {
                const transcoders = await this._transcoderFactory.createTranscoders(url);
                for(let transcoder of transcoders) {
                    this._logger.info(`Starting transcoder`);
                    transcoder.start();
                
                }
            } catch (e) {
                logger.error(e);
                process.exit(1);
            }
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

