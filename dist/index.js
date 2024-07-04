#!/usr/bin/env node --import tsx
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var backend_1 = require("./backend");
var cli_1 = require("./cli");
var backend = new backend_1.Backend();
var commandLine = new cli_1.MainCommandLine(backend);
commandLine.executeAsync();
