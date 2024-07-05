#!/usr/bin/env node --import tsx
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var backend_1 = require("./backend");
var backend_2 = require("./backend");
var cli_1 = require("./cli");
var winston = require('winston');
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, printf = _a.printf, colorize = _a.colorize, align = _a.align;
exports.logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(colorize({ all: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), align(), printf(function (info) { return "[".concat(info.timestamp, "] ").concat(info.level, " ").concat(info.message); })),
    transports: [new winston.transports.Console()],
});
var transcoderFactory = new backend_2.TranscoderFactory([
    new backend_1.RTSPProtocolManager(),
    new backend_1.UnifiProtocolManager()
]);
var backend = new backend_1.Backend(transcoderFactory);
var commandLine = new cli_1.MainCommandLine(backend);
commandLine.executeAsync();
