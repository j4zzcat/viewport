#!/usr/bin/env node --no-warnings --import tsx

import {context} from "./context";

const commandLine = context.createMainCommandLine();
commandLine.executeAsync();
