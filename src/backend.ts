export class Backend {
    private _verbose: boolean;

    public constructor() {
        console.log();
    }

    public verbosity(flag: boolean) {
        this._verbose = flag;
        console.log(this._verbose);
    }

    public async handleStreamsAction(grid: string, streams: string[]) {
        console.log(grid);
        console.log(streams);
    }
}