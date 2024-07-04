export class Backend {
    private _verbose: boolean;
    private _output_dir: string;

    public constructor() {
    }

    public set verbosity(flag: boolean) {
        this._verbose = flag;
    }

    public set output_dir(dir: string) {
        this._output_dir = dir;
    }

    public async handleStreamsAction(grid: string, streams: string[]) {
        console.log(grid);
        console.log(streams);

        for(let stream of streams) {
            const url = new URL(stream);
            const protocol = url.protocol.split(':')[0];
            pm = ProtocolManagerFactory.getOrCreate(url);
            for(id of pm.streamIds) {
                transcoder = pm.createStreamTranscoder(id);
                transcoder.start();
            }

        }
    }
}