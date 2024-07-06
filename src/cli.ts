import {
    CommandLineAction,
    CommandLineFlagParameter,
    CommandLineParser, CommandLineStringListParameter, CommandLineStringParameter
} from "@rushstack/ts-command-line";
import {Backend} from "./backend";
import {logger} from "./logger";

export class StreamsAction extends CommandLineAction {
    private _backend: Backend;
    private _grid: CommandLineStringParameter;
    private _stream: CommandLineStringListParameter;

    public constructor(backend: Backend) {
        super({
            actionName: 'streams',
            summary: 'Launch a viewport with specified streams.',
            documentation: 'Here we provide a longer description of how our action works.'
        });

        this._backend = backend;

        this._grid = this.defineStringParameter({
            argumentName: "SIZE",
            defaultValue: '2x2',
            description: 'Grid layout in rows x columns.',
            parameterLongName: '--grid',
            required: false })

        this._stream = this.defineStringListParameter( {
            argumentName: "URL",
            description: "Stream url, supported protocols: rtsp, rtsps, unifi.",
            parameterLongName: "--stream",
            required: true })
    }

    protected async onExecute(): Promise<void> {
        // @ts-ignore
        await this._backend.handleStreamsAction(this._grid.value, this._stream.values);
    }
}

export class RemoteAction extends CommandLineAction {
    private _backend: Backend;
    private _remote: CommandLineStringParameter;

    public constructor(backend: Backend) {
        super({
            actionName: 'remote',
            summary: 'Launch a remote viewport.',
            documentation: 'Here we provide a longer description of how our action works.'
        });

        this._backend = backend;

        this._remote = this.defineStringParameter({
            argumentName: "URL",
            description: 'Remote viewport URL.',
            parameterLongName: '--url',
            required: true })
    }

    protected async onExecute(): Promise<void> {
        console.log(this._remote.value);
        // await BusinessLogic.doTheWork(this._force.value, this._protocol.value || "(none)");
    }
}

export class MainCommandLine extends CommandLineParser {
    private readonly _backend: Backend;
    private _verbose: CommandLineFlagParameter;
    private _outputDir: CommandLineStringParameter;

    public constructor(backend: Backend) {
        super({
            toolFilename: 'streamline-viewport',
            toolDescription: 'Create a web-based viewport for rtsp/rtsps/unifi video streams.' });

        this._backend = backend;
        this.addAction(new StreamsAction(this._backend));
        this.addAction(new RemoteAction(this._backend));

        this._verbose = this.defineFlagParameter({
            parameterLongName: '--verbose',
            parameterShortName: '-v',
            description: 'Be verbose.' });

        this._outputDir = this.defineStringParameter({
            parameterShortName: '-o',
            parameterLongName: '--output-dir',
            argumentName: 'DIR',
            defaultValue: '.',
            description: 'Directory where the output should go',
            required: false

        })
    }

    protected async onExecute(): Promise<void> {
        logger.info('Starting...');
        this._backend.verbosity = this._verbose.value;
        this._backend.outputDir = this._outputDir.value;
        await super.onExecute();
    }
}

