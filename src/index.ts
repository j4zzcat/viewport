#!/usr/bin/env node --import tsx

import {Backend, RTSPProtocolManager, UnifiProtocolManager} from "./backend";
import {TranscoderFactory} from "./backend";
import {MainCommandLine} from "./cli";

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

const transcoderFactory = new TranscoderFactory([
    new RTSPProtocolManager(),
    new UnifiProtocolManager()
]);

const backend = new Backend(transcoderFactory);

const commandLine: MainCommandLine = new MainCommandLine(backend);
commandLine.executeAsync();
