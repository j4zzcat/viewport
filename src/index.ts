#!/usr/bin/env node --import tsx

import {UnifiProtocolManager, RTSPProtocolManager} from "./protocols";
import {Backend, TranscoderFactory} from "./backend";
import {MainCommandLine} from "./cli";

const transcoderFactory = new TranscoderFactory([
    new RTSPProtocolManager(),
    new UnifiProtocolManager()
]);

const backend = new Backend(transcoderFactory);

const commandLine: MainCommandLine = new MainCommandLine(backend);
commandLine.executeAsync();
