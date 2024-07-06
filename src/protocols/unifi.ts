import {logger} from "../logger";
import {IProtocolManager, ITranscoder} from '../backend';
import {ProtectApi, ProtectLogging} from "unifi-protect";
import {CachingFactory, ICacheable} from "../utils";
import {ProtocolManagerError} from "./index";

class NVR implements ICacheable {
    private _host;
    private _username;
    private _password;
    private _protectApi;

    public async initialize(host, username, password): Promise<void> {
        this._host = host;
        this._username = username;
        this._password = password;

        logger.info(`Connecting to NVR at '${this._host}' with username '${this._username}'...`)
        this._protectApi = new ProtectApi(new LoggerDelegate());
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
}

export class UnifiProtocolManager implements IProtocolManager {
    private _supportedProtocols: string[] = ['unifi'];
    private _nvrCache = new CachingFactory<NVR>(NVR);

    canHandle(url: URL): boolean {
        return this._supportedProtocols.includes(url.protocol.split(':')[0]);
    }

    public async createTranscoder(url: URL): Promise<ITranscoder[]> {
        let maskedUrl = new URL(url);
        maskedUrl.password = '*****';
        logger.info(`Creating transcoder for ${maskedUrl}`);

        // let nvr = this._nvrCache.getOrCreate(url.host, url.username, url.password);
        let nvr = await this._nvrCache.getOrCreate(url.host, url.username, url.password);

        type CameraInfo = [string, string];
        let camerasInfo: CameraInfo[] = [];
        for(let camera of nvr.cameras) {
            camerasInfo.push([camera.id, camera.name]);
        }

        let splitPathname = url.pathname.split('/');
        if(splitPathname[1] != 'camera') {
            logger.error(`Expecting url.pathname to start with '/camera' but got '${maskedUrl.pathname}'`)
            throw new ProtocolManagerError();
        }



        let camerasFilter = splitPathname[2].slice(3, -3);
        if(camerasFilter == 'all') {

            logger.info(cameraInfoList);
        } else {

        }



        return undefined;
    }
}

class LoggerDelegate implements ProtectLogging {
    debug(message: string, ...parameters: unknown[]): void {
        logger.debug(message);
    }

    error(message: string, ...parameters: unknown[]): void {
        logger.error(message);
    }

    info(message: string, ...parameters: unknown[]): void {
        logger.info(message);
    }

    warn(message: string, ...parameters: unknown[]): void {
        logger.warn(message);
    }
}
