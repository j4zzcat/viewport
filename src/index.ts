#!/usr/bin/env node --no-warnings --import tsx

import {UnifiPlugin, RTSPPlugin} from "./plugins";
import {Backend, PluginFactory} from "./backend";
import {MainCommandLine} from "./cli";

const pluginFactory = new PluginFactory([
    new RTSPPlugin(),
    new UnifiPlugin()
]);

const backend = new Backend(pluginFactory);

const commandLine: MainCommandLine = new MainCommandLine(backend);
commandLine.executeAsync();
