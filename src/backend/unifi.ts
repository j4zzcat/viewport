import {Logger} from "../utils/logger";
import {IStream, IVideoProvider} from "./backend";
import {BasePlugin} from "../utils/plugin";
import {CachingFactory, ICacheable} from "../utils/cache";

export class UnifiVideoProvider extends BasePlugin implements IVideoProvider {
    private _logger = Logger.createLogger(UnifiVideoProvider.name);
    private _unifiNvrFactory = new CachingFactory<UnifiNVR>(
        UnifiNVR,
        (...args: any[]) => `${args[0]}:${args[1]}`);

    constructor() {
        super('unifi');
    }

    /**
     * Handles URLs in the form of unifi://.../camera/...
     */
    public canHandle(url: URL): boolean {
        if(url.protocol.split(':')[0] == 'unifi' &&
            decodeURI(url.pathname).split('/')[1] == 'camera') {
            return true;
        } else {
            return false;
        }
    }

    public async getOrCreateStreams(url: URL): Promise<IStream[]> {
        let splitPathname = decodeURI(url.pathname).split('/');
        if(splitPathname[2].trim().length == 0) {
            throw new Error(`Expecting url.pathname to specify either '/camera/_all' or /camera/camera1,camera2... but got '${splitPathname[2]}'`);
        }

        let unifiNvr = await this._unifiNvrFactory.getOrCreate(
            url.host,
            url.username,
            url.host);

        return [new UnifiStream(url)];
    }
}

export class UnifiStream implements IStream {
    private _logger = Logger.createLogger(UnifiStream.name);
    private readonly _url;
    private readonly _id: string;
    private _codec: string;
    private _container: string;
    private _endpoint: string;

    constructor(url: URL) {
        this._url = url;
        this._id = this._url;
    }

    public get id(): string { return this._id; }
    public get codec(): string { return this._codec; }
    public get container(): string { return this._container }
    public get endpoint(): string { return this._endpoint }

    public start() {
        this._logger.debug(`Starting stream '${this.id}'...`);
        //this._logger.debug(`Connecting to Unifi fMPEG web socket for camera ${this._camera.name }`);
    }

    public stop() {
        this._logger.debug(`Stopping stream '${this.id}'`);
    }
}

class UnifiNVR implements ICacheable {
    private _logger = Logger.createLogger(UnifiNVR.name);
    private _host;
    private _username;
    private _password;
    private _protectApi;

    public async initialize(host, username, password): Promise<void> {
        this._host = host;
        this._username = username;
        this._password = password;

        // Jest blues
        let unifiProtectPackage = await import('unifi-protect');
        this._protectApi = new unifiProtectPackage.ProtectApi();

        this._logger.info(`Connecting to NVR at '${this._host}' with username '${this._username}'...`)
        if(!(await this._protectApi.login(this._host, this._username, this._password))) {
            this._logger.error('Invalid login credentials.');
            process.exit(0);
        };

        if(!(await this._protectApi.getBootstrap())) {
            this._logger.error("Unable to bootstrap the Protect controller.");
            process.exit(0);
        }

        this._logger.info('Connected successfully');
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

    public removeListener(listener) {

    }
}