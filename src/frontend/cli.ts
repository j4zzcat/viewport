import {context} from "../context";
import {
    CommandLineAction,
    CommandLineFlagParameter,
    CommandLineParser, CommandLineStringListParameter, CommandLineStringParameter
} from "@rushstack/ts-command-line";

export class StreamAction extends CommandLineAction {
    private _layout: CommandLineStringParameter;
    private _stream: CommandLineStringListParameter;

    public constructor() {
        super({
            actionName: 'stream',
            summary: 'Create a viewport with specified stream(s).',
            documentation: 'Here we provide a longer description of how our action works.'
        });

        this._layout = this.defineStringParameter({
            argumentName: "LAYOUT",
            defaultValue: 'grid:2x2',
            description: 'Layout of the viewport. Supported layouts: grid:NxM, unifi:N',
            parameterLongName: '--layout',
            required: false })

        this._stream = this.defineStringListParameter( {
            argumentName: "URL",
            description: "Stream url. Supported protocols: rtsp(s), unifi.",
            parameterLongName: "--stream",
            required: true })
    }

    protected async onExecute(): Promise<void> {
        await context.createBackend().handleStreamAction(this._layout.value, this._stream.values);
    }
}

export class ViewAction extends CommandLineAction {
    private _remote: CommandLineStringParameter;

    public constructor() {
        super({
            actionName: 'view',
            summary: 'Create a viewport based on a remote view.',
            documentation: 'Create a viewport based on a remote view.'
        });

        this._remote = this.defineStringParameter({
            argumentName: "URL",
            description: 'Remote view URL.',
            parameterLongName: '--url',
            required: true });
    }

    protected async onExecute(): Promise<void> {
        //await Backend().handleViewAction();
    }
}

export class MainCommandLine extends CommandLineParser {
    private _logger = context.createChildLogger(MainCommandLine.name);
    private readonly _verbose: CommandLineFlagParameter;

    public constructor() {
        super({
            toolFilename: 'viewport',
            toolDescription: 'Create a web-based viewport for RTSP(S) and Unifi Protect video streams.' });

        this.addAction(new StreamAction());
        this.addAction(new ViewAction());

        this._verbose = this.defineFlagParameter({
            parameterLongName: '--verbose',
            parameterShortName: '-v',
            description: 'Be verbose.' });
    }

    protected async onExecute(): Promise<void> {
        this._logger.info('Starting...');

        if(this._verbose.value == true) {
            context.rootLogger.rootLevel = 'debug';
        }

        await super.onExecute();
    }
}

