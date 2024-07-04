#!/usr/bin/env node --import tsx

import {Backend} from "./backend";
import {MainCommandLine} from "./cli";

const backend = new Backend();
const commandLine: MainCommandLine = new MainCommandLine(backend);
commandLine.executeAsync();
