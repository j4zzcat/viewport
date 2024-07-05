const winston = require('winston');
const { combine, timestamp, printf, colorize, align } = winston.format;

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`)
    ),
    transports: [new winston.transports.Console()],
});
