#!/usr/bin/env node --import tsx

import {
    CommandLineAction,
    CommandLineChoiceParameter,
    CommandLineFlagParameter,
    CommandLineParser
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

export class PushAction extends CommandLineAction {
    private _force: CommandLineFlagParameter;
    private _protocol: CommandLineChoiceParameter;

    public constructor() {
        super({
            actionName: 'push',
            summary: 'Pushes a widget to the service',
            documentation: 'Here we provide a longer description of how our action works.'
        });

        this._force = this.defineFlagParameter({
            parameterLongName: '--force',
            parameterShortName: '-f',
            description: 'Push and overwrite any existing state'
        });

        this._protocol = this.defineChoiceParameter({
            parameterLongName: '--protocol',
            description: 'Specify the protocol to use',
            alternatives: ['ftp', 'webdav', 'scp'],
            environmentVariable: 'WIDGET_PROTOCOL',
            defaultValue: 'scp'
        });
    }

    protected async onExecute(): Promise<void> { // abstract
        await BusinessLogic.doTheWork(this._force.value, this._protocol.value || "(none)");
    }
}

export class WidgetCommandLine extends CommandLineParser {
    private _verbose: CommandLineFlagParameter;

    public constructor() {
        super({
            toolFilename: 'widget',
            toolDescription: 'The "widget" tool is a code sample for using the @rushstack/ts-command-line library.'
        });

        this.addAction(new PushAction());

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
