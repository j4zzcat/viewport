import {logger} from "./logger";

export interface ICacheable {
    initialize(...args: any[]): Promise<void>;
}

export class CachingFactory<T extends ICacheable> {
    private _ctor: { new(): T };
    private readonly _keyGenerator;
    private _cache: Map<string, T> = new Map();

    public constructor(ctor: { new(): T }, keyGenerator: (...args: any[]) => string = (...args: any[]) => { return args.join(':')}) {
        this._keyGenerator = keyGenerator;
        this._ctor = ctor;
    }

    public async getOrCreate(...args: any[]): Promise<T> {
        let key = this._keyGenerator(...args);
        if (this._cache.has(key)) {
            logger.debug(`found ${key}`)

            return this._cache.get(key) as T;
        }

        logger.debug(`creating ${key}`)

        const instance = new this._ctor();
        await instance.initialize(...args);
        this._cache.set(key, instance);
        return instance;
    }
}
