const winston = require('winston');
const { combine, colorize, timestamp, align, printf } = winston.format;

export class DefaultLogger {
    private _winston;

    constructor() {
        this._winston = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: combine(
                colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                align(),
                printf((info) => `[${info.timestamp}] [${info.level}] ${this.messageFormatter(info)}`)
            ),
            transports: [new winston.transports.Console()]
        });
    }

    public createLogger(meta: {}): any {
        return this._winston.child(meta);
    }

    public get rootLevel() { return this._winston.level; }
    public set rootLevel(level: string) {
        this._winston.level = level;
    }

    // Redaction mechanics
    private redactSecrets = require('redact-secrets')('[REDACTED]');
    private _redactions: string[] = [];

    public redact(s: string) {
        if(!this._redactions.includes(s)) {
            this._redactions.push(s);
        }
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