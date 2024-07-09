import {Logger} from "./logger";

export class BasePlugin {
    private readonly _id;

    constructor(id: string) {
        this._id = id;
    }

    public get id(): string { return this._id; }
    public canHandle(something) { return false; }
}

export class PluginRegistry {
    private _logger = Logger.createLogger(PluginRegistry.name);
    private _plugins = new Map<String, BasePlugin>();

    public addPlugin(plugin) {
        this._plugins.set(plugin.id, plugin);
        return this;
    }

    public getPlugin(canHandlePredicate): any {
        // @ts-ignore
        for (let plugin of this._plugins.values()) {
            if (plugin.canHandle(canHandlePredicate)) {
                this._logger.debug(`Plugin '${plugin.id}' can handle '${canHandlePredicate}'`);
                return plugin;
            }
        }

        throw new Error(`No suitable plugin to handle '${canHandlePredicate}'`);
    }
}