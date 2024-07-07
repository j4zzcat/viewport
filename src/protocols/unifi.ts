import {logger, redact} from "../logger";
import {IProtocolManager, ITranscoder} from '../backend';
import {ProtectApi, ProtectLogging} from "unifi-protect";
import {CachingFactory, ICacheable} from "../utils";
import {ProtocolManagerError} from "./index";
import {spawn} from "child_process";

class UnifiTranscoder implements ITranscoder {
    private _logger = logger.child({ 'class': 'UnifiTranscoder' });
    private _cameraId;
    private _nvr;
    private _ffmpeg;

    public constructor(cameraId: string, nvr: UnifiNVR) {
        this._nvr = nvr;
        this._cameraId = cameraId;
    }

    public start() {
        this._ffmpeg = spawn('/opt/homebrew/bin/ffmpeg', [
            '-loglevel', '8',
            '-hide_banner', '-nostats',
            '-i', 'pipe:0',
            '-c', 'copy', '-f', 'rtsp', 'rtsp://localhost:8554/mystream' ]);


        //     '-fflags', '+discardcorrupt',
        //     '-max_delay', '50000',
        //     '-flags', '-low_delay',
        //     "-enc_time_base", "-1",
        //     "-fps_mode", "passthrough",
        //     "-muxdelay", "0",
        //     "-video_track_timescale", "90000",
        //     '-hls_time', '2',
        //     '-hls_list_size', '3',
        //     '-hls_flags', 'delete_segments',
        //     '-vcodec', 'copy',
        //     '-y', '/Users/snd/.tmp/index.m3u8'
        // ]);

        this._ffmpeg.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        this._ffmpeg.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        this._nvr.addListener(this._cameraId, (buffer) => this._ffmpeg.stdin.write(buffer));
    }

    public stop() {
    }
}

class UnifiNVR implements ICacheable {
    private _logger = logger.child({ 'class': 'UnifiNVR' });
    private _host;
    private _username;
    private _password;
    private _protectApi;
    private _cameras;

    public async initialize(host, username, password): Promise<void> {
        this._host = host;
        this._username = username;
        this._password = password;

        logger.info(`Connecting to NVR at '${this._host}' with username '${this._username}'...`)
        this._protectApi = new ProtectApi(new UnifiLoggerDelegate());
        if(!(await this._protectApi.login(this._host, this._username, this._password))) {
            logger.error("Invalid login credentials.");
            process.exit(0);
        };

        if(!(await this._protectApi.getBootstrap())) {
            logger.error("Unable to bootstrap the Protect controller.");
            process.exit(0);
        }

        logger.info('Connected successfully');
    }

    public get cameras() {
        return this._protectApi.bootstrap.cameras;
    }

    public addListener(cameraId, listener) {
        let protectLiveStream = this._protectApi.createLivestream();
        protectLiveStream.addListener('codec', (codec) => this._logger.info(codec));
        protectLiveStream.addListener('message', listener);
        protectLiveStream.start(cameraId, 0);

    }
}

export class UnifiProtocolManager implements IProtocolManager {
    private _logger = logger.child({ 'class': 'UnifiProtocolManager' });
    private _supportedProtocols: string[] = ['unifi'];
    private _nvrCache = new CachingFactory<UnifiNVR>(UnifiNVR);

    canHandle(url: URL): boolean {
        return this._supportedProtocols.includes(url.protocol.split(':')[0]);
    }

    public async createTranscoders(url: URL): Promise<ITranscoder[]> {
        redact.push(url.password);
        this._logger.info(`Creating transcoder(s) for ${url}`);

        let nvr = await this._nvrCache.getOrCreate(url.host, url.username, url.password);

        let splitPathname = decodeURI(url.pathname).split('/');
        if(splitPathname[1] != 'camera') {
            this._logger.error(`Expecting url.pathname to start with '/camera' but got '${url.pathname}'`)
            throw new ProtocolManagerError();
        }

        const cameras = [];
        const filter = splitPathname[2].slice(1, -1);
        this._logger.debug(`Camera filter is '${filter}'`);

        if(filter == 'all') {
            for(let camera of nvr.cameras) {
                cameras.push([camera.id, camera.name]);
            }
        } else {
            const filterList: string[] = filter.split(',').map(val => val.trim());
            for(let camera of nvr.cameras) {
                if(filterList.includes(camera.name)) {
                    cameras.push([camera.id, camera.name]);
                }
            }
        }

        this._logger.debug(`Found these cameras '${cameras}'`);
        this._logger.info(`Creating '${cameras.length}' transcoders`);

        let transcoders = [];
        for(let camera of cameras) {
            transcoders.push(new UnifiTranscoder(camera[0], nvr))
        }

        return transcoders;
    }
}


class UnifiLoggerDelegate implements ProtectLogging {
    log(level: string, message: string) {
        logger.log(level, message);
    }

    debug(message: string, ...parameters: unknown[]): void { this.log('debug', message); }
    error(message: string, ...parameters: unknown[]): void { this.log('error', message); }
    warn(message: string, ...parameters: unknown[]): void { this.log('warn', message); }
    info(message: string, ...parameters: unknown[]): void { this.log('info', message); }
}
