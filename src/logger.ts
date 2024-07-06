const winston = require('winston');
const { combine, colorize, timestamp, align, printf } = winston.format;

export const redact: string[] = [];
const redactSecrets = require('redact-secrets')('[REDACTED]');

function messageFormatter(info): string {
    let s = info.message;
    s = redactSecrets.map(s);
    for(let needle of redact) {
        s = s.replace(needle, '[REDACTED]' );
    }

    if(info['class'] != undefined) {
        s = s.replace(/(\b\w+\b)/, `[${info['class']}] $1`);
    }

    return s;
}

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        colorize({ info: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        align(),
        printf((info) => `[${info.timestamp}] [${info.level}] ${messageFormatter(info)}`)
    ),
    transports: [new winston.transports.Console()],
});

