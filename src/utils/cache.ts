import {Logger} from "./logger";

export interface ICacheable {
    initialize(...args: any[]): Promise<void>;
}

export class CachingFactory<T extends ICacheable> {
    private _logger = Logger.createLogger(CachingFactory.name);
    private readonly _ctor: { new(): T };
    private readonly _keyGenerator;
    private _cache: Map<string, T> = new Map();

    public constructor(ctor: { new(): T }, keyGenerator: (...args: any[]) => string = (...args: any[]) => { return args.join(':')}) {
        this._keyGenerator = keyGenerator;
        this._ctor = ctor;
    }

    public async getOrCreate(...args: any[]): Promise<T> {
        let key = this._keyGenerator(...args);
        if (this._cache.has(key)) {
            this._logger.debug(`Found ${key}`)

            return this._cache.get(key) as T;
        }

        this._logger.debug(`Creating entry for key '${key}'`)

        const instance = new this._ctor();
        await instance.initialize(...args);
        this._cache.set(key, instance);
        return instance;
    }
}
