"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston = require('winston');
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, printf = _a.printf, colorize = _a.colorize, align = _a.align;
exports.logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(colorize({ all: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), align(), printf(function (info) { return "[".concat(info.timestamp, "] ").concat(info.level, " ").concat(info.message); })),
    transports: [new winston.transports.Console()],
});
