import {context} from "../context";
import {PluginRegistry} from "../utils/plugin";

export interface IStreamProvider {
    canHandle(url: URL): boolean
    createStreamControllers(url: URL): Promise<IStreamController[]>
    dispose();
};

export interface IStreamController {
    get id(): string;
    get codec(): string;
    get container(): string;
    get endpoint(): string;

    start();
    stop();
    dispose();
}

export interface ILayoutManager {
}

export class Backend {
    private _logger = context.createChildLogger(Backend.name);
    private _streamProvidersRegistry: PluginRegistry;
    private _layoutManagersRegistry: PluginRegistry;

    public constructor() {
        this._logger.debug("Filling plugin registries...");

        this._streamProvidersRegistry = context.createPluginRegistry()
            .addPlugin(context.createUnifiStreamProvider())
            .addPlugin(context.createRTSPStreamProvider());

        this._layoutManagersRegistry = context.createPluginRegistry()
            .addPlugin(context.createGridLayoutManager());
    }

    public async handleStreamAction(layout: string, sUrls: readonly string[]): Promise<void> {
        this._logger.debug("Handling stream action");
        for(let sUrl of sUrls) {
            let url;

            try {
                url = new URL(sUrl);
            } catch(e) {
                this._logger.error(e);
                throw new Error(`Failed to parse stream url, got '${e}'`);
            }

            context.rootLogger.addRedaction(url.password);
            this._logger.debug(`Processing stream url '${sUrl}'`);

            this._logger.debug("Looking for a suitable video provider");
            let streamProvider = this._streamProvidersRegistry.getPlugin(url);
            let streamControllers;

            try {
                this._logger.debug("Trying to create stream controllers...");
                streamControllers = await streamProvider.createStreamControllers(url);
            } catch(e) {
                this._logger.error("Cannot create stream controller");
                throw e;
            }

            streamControllers.forEach((streamController) => {
                streamController.start();
                this._logger.info(`Started stream controller '${streamController.id}', codec is '${streamController.codec}', container is '${streamController.container}' endpoint is '${streamController.endpoint}'`)
            });
        }
    }
}

