import {Logger} from "../utils/logger";
import {UnifiStreamsManager} from "./unifi";
import {RTSPStreamsManager} from "./rtsp";
import {GridLayoutManager} from "./layout";
import {PluginRegistry} from "../utils/plugin";

export interface IStreamsManager {
    canHandle(url: URL): boolean
    getOrCreateStreams(url: URL): Promise<IStream[]>
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

export class Backend {
    private _logger = Logger.createLogger(Backend.name);
    private _streamsManagersRegistry: PluginRegistry;
    private _layoutManagersRegistry: PluginRegistry;

    public constructor() {
        this._logger.debug('Filling plugin registries...');

        this._streamsManagersRegistry = new PluginRegistry()
            .addPlugin(new UnifiStreamsManager())
            .addPlugin(new RTSPStreamsManager());

        this._layoutManagersRegistry = new PluginRegistry()
            .addPlugin(new GridLayoutManager());
    }

    public async handleStreamAction(layout: string, streams: readonly string[]): Promise<void> {
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

            let streamsManager = this._streamsManagersRegistry.getPlugin(url);
            let streams = streamsManager.getOrCreateStreams(url);
            for(let stream of streams) {
                stream.start();
                this._logger.info(`Started stream '${stream.id}', codec is '${stream.codec}', container is '${stream.container}' endpoint is '${stream.endpoint}'`)
            }
        }
    }
}

