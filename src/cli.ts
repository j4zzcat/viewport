import {
    CommandLineAction,
    CommandLineFlagParameter,
    CommandLineParser, CommandLineStringListParameter, CommandLineStringParameter
} from "@rushstack/ts-command-line";
import {Backend} from "./backend";
import {Logger} from "./viewport-utils";

export class StreamAction extends CommandLineAction {
    private _backend: Backend;
    private layout: CommandLineStringParameter;
    private _stream: CommandLineStringListParameter;

    public constructor(backend: Backend) {
        super({
            actionName: 'stream',
            summary: 'Create a viewport with specified stream(s).',
            documentation: 'Here we provide a longer description of how our action works.'
        });

        this._backend = backend;

        this.layout = this.defineStringParameter({
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
        // @ts-ignore
        await this._backend.handleStreamsAction(this.layout.value, this._stream.values);
    }
}

export class ViewAction extends CommandLineAction {
    private _backend: Backend;
    private _remote: CommandLineStringParameter;

    public constructor(backend: Backend) {
        super({
            actionName: 'view',
            summary: 'Create a viewport based on a remote view.',
            documentation: 'Create a viewport based on a remote view.'
        });

        this._backend = backend;

        this._remote = this.defineStringParameter({
            argumentName: "URL",
            description: 'Remote view URL.',
            parameterLongName: '--url',
            required: true });
    }

    protected async onExecute(): Promise<void> {
        console.log(this._remote.value);
        // await BusinessLogic.doTheWork(this._force.value, this._protocol.value || "(none)");
    }
}

export class MainCommandLine extends CommandLineParser {
    private _logger = Logger.createLogger(MainCommandLine.name);
    private readonly _backend: Backend;
    private _verbose: CommandLineFlagParameter;

    public constructor(backend: Backend) {
        super({
            toolFilename: 'viewport',
            toolDescription: 'Create a web-based viewport for RTSP(S) and Unifi Protect video streams.' });

        this._backend = backend;
        this.addAction(new StreamAction(this._backend));
        this.addAction(new ViewAction(this._backend));

        this._verbose = this.defineFlagParameter({
            parameterLongName: '--verbose',
            parameterShortName: '-v',
            description: 'Be verbose.' });
    }

    protected async onExecute(): Promise<void> {
        this._logger.info('Starting...');
        this._backend.verbosity = this._verbose.value;
        await super.onExecute();
    }
}

