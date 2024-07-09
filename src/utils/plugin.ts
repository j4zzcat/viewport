import {Logger} from "./logger";

export class BasePlugin {
    protected _logger = Logger.createLogger(BasePlugin.name);
    private readonly _id;

    constructor(id: string) {
        this._id = id;
        this._logger.debug(`Plugin '${this.id}' created`);
    }

    public get id(): string { return this._id; }
    public canHandle(specification) { return false; }
}

export class PluginRegistry {
    private _logger = Logger.createLogger(PluginRegistry.name);
    private _plugins = new Map<String, BasePlugin>();

    public addPlugin(plugin) {
        this._plugins.set(plugin.id, plugin);
        return this;
    }

    public getPlugin(specification): any {
        // @ts-ignore
        for (let plugin of this._plugins.values()) {
            if (plugin.canHandle(specification)) {
                this._logger.debug(`Plugin '${plugin.id}' can handle '${specification}'`);
                return plugin;
            }
        }

        throw new Error(`No suitable plugin to handle '${specification}'`);
    }
}