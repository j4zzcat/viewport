"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.redact = void 0;
var winston = require('winston');
var _a = winston.format, combine = _a.combine, colorize = _a.colorize, timestamp = _a.timestamp, align = _a.align, printf = _a.printf;
exports.redact = [];
var redactSecrets = require('redact-secrets')('[REDACTED]');
function messageFormatter(info) {
    var s = info.message;
    s = redactSecrets.map(s);
    for (var _i = 0, redact_1 = exports.redact; _i < redact_1.length; _i++) {
        var needle = redact_1[_i];
        s = s.replace(needle, '[REDACTED]');
    }
    if (info['class'] != undefined) {
        s = s.replace(/(\b\w+\b)/, "[".concat(info['class'], "] $1"));
    }
    return s;
}
exports.logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(colorize({ info: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), align(), printf(function (info) { return "[".concat(info.timestamp, "] [").concat(info.level, "] ").concat(messageFormatter(info)); })),
    transports: [new winston.transports.Console()],
});
