#!/usr/bin/env node --no-warnings --import tsx

import {MainCommandLine} from "./frontend/cli";

const commandLine: MainCommandLine = new MainCommandLine();
commandLine.executeAsync();
