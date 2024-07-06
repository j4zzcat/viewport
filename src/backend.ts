import {logger} from "./logger";

export interface IProtocolManager {
    canHandle(url: URL): boolean
    createTranscoders(url: URL): Promise<ITranscoder[]>;
}

export interface ITranscoder {
    start();
    stop();
}

export class TranscoderFactory {
    private _protocol_managers: IProtocolManager[];
    private _transcoders: Map<URL, ITranscoder> = new Map<URL, ITranscoder>();

    public constructor(protocol_managers: IProtocolManager[]) {
        this._protocol_managers = protocol_managers;
    }

    createTranscoders(url: URL): Promise<ITranscoder[]> {
        for(let pm of this._protocol_managers) {
            if(pm.canHandle(url) == false) continue;
            return pm.createTranscoders(url);
        }
        throw Error(`No suitable Protocol Manager for url '${url}'`);
    }
}

export class Backend {
    private _logger = logger.child({ 'class': 'Backend' });
    private _transcoderFactory: TranscoderFactory;
    private _verbose: boolean;
    private _outputDir: string;

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