#!/usr/bin/env node --import tsx

import {MainCommandLine} from "./cli";

const commandLine: MainCommandLine = new MainCommandLine();
commandLine.executeAsync();
