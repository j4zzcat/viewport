#!/usr/bin/env node --no-warnings --import tsx
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protocols_1 = require("./protocols");
var backend_1 = require("./backend");
var cli_1 = require("./cli");
var transcoderFactory = new backend_1.TranscoderFactory([
    new protocols_1.RTSPProtocolManager(),
    new protocols_1.UnifiProtocolManager()
]);
var backend = new backend_1.Backend(transcoderFactory);
var commandLine = new cli_1.MainCommandLine(backend);
commandLine.executeAsync();
