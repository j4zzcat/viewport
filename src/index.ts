#!/usr/bin/env node --no-warnings --import tsx

import {Backend, PluginRegistry, GridLayoutManager, RTSPStreamManager, UnifiStreamManager} from "./backend/backend";
import {MainCommandLine} from "./frontend/cli";

const commandLine: MainCommandLine = new MainCommandLine();
commandLine.executeAsync();
