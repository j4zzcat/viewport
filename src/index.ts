#!/usr/bin/env node --import tsx

import {
    CommandLineAction,
    CommandLineChoiceParameter,
    CommandLineFlagParameter,
    CommandLineParser, CommandLineStringListParameter, CommandLineStringParameter
} from "@rushstack/ts-command-line";

class BusinessLogic {
    static doTheWork(force: boolean, protocol: string) {
        console.log(force);
        console.log(protocol);
    }

    static configureLogger(verbose: boolean) {
        console.log(verbose);
    };
}

export class GridAction extends CommandLineAction {
    private _layout: CommandLineStringParameter;
    private _stream: CommandLineStringListParameter;

    public constructor() {
        super({
            actionName: 'grid',
            summary: 'Launch a viewport with specified streams',
            documentation: 'Here we provide a longer description of how our action works.'
        });

        this._layout = this.defineStringParameter({
            argumentName: "SIZE",
            defaultValue: '2x2',
            description: 'Grid layout in rows x columns',
            parameterLongName: '--layout',
            required: false})

        this._stream = this.defineStringListParameter( {
            argumentName: "URL",
            description: "Stream url, supported protocols: rtsp, rtsps, unifi",
            parameterLongName: "--stream"

        })
    }

    protected async onExecute(): Promise<void> { // abstract
        console.log(this._layout.value);
        console.log(this._stream.values);
        // await BusinessLogic.doTheWork(this._force.value, this._protocol.value || "(none)");
    }
}

export class RemoteAction extends CommandLineAction {
    private _remote: CommandLineStringParameter;

    public constructor() {
        super({
            actionName: 'remote',
            summary: 'Launch a remote viewport',
            documentation: 'Here we provide a longer description of how our action works.'
        });

        this._remote = this.defineStringParameter({
            argumentName: "URL",
            description: 'Remote viewport URL',
            parameterLongName: '--url',
            required: true})
    }

    protected async onExecute(): Promise<void> { // abstract
        console.log(this._remote.value);
        // await BusinessLogic.doTheWork(this._force.value, this._protocol.value || "(none)");
    }
}


export class WidgetCommandLine extends CommandLineParser {
    private _verbose: CommandLineFlagParameter;

    public constructor() {
        super({
            toolFilename: 'streamline-viewport',
            toolDescription: 'Create a web-based viewport for rtsp/rtsps/unifi video streams'
        });

        this.addAction(new GridAction());
        this.addAction(new RemoteAction());

        this._verbose = this.defineFlagParameter({
            parameterLongName: '--verbose',
            parameterShortName: '-v',
            description: 'Show extra logging detail'
        });
    }

    protected async onExecute(): Promise<void> { // override
        BusinessLogic.configureLogger(this._verbose.value);
        await super.onExecute();
    }
}

const commandLine: WidgetCommandLine = new WidgetCommandLine();
commandLine.executeAsync();
