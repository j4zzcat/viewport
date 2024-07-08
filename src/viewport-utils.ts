const winston = require('winston');
const { combine, colorize, timestamp, align, printf } = winston.format;

class SimpleLogger {
    private _winston;

    constructor() {
        this._winston = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: combine(
                colorize({ info: true }),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                align(),
                printf((info) => `[${info.timestamp}] [${info.level}] ${this.messageFormatter(info)}`)
            ),
            transports: [new winston.transports.Console()]
        });
    }

    public createLogger(clazz: string): any {
        return this._winston.child({'class': clazz});
    }

    // Redaction mechanics
    private redactSecrets = require('redact-secrets')('[REDACTED]');
    private _redactions: string[] = [];

    public set addRedaction(s: string) {
        this._redactions.push(s);
    }

    // Format the message and redact secrets
    private messageFormatter(info): string {
        let s = info.message;
        s = this.redactSecrets.map(s);
        for(let redact of this._redactions) {
            s = s.replace(redact, '[REDACTED]' );
        }

        if(info['class'] != undefined) {
            s = s.replace(/(\b\w+\b)/, `[${info['class']}] $1`);
        }

        return s;
    }
}

export const Logger = new SimpleLogger();

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
