import {logger, redact} from "../logger";
import {IProtocolManager, ITranscoder} from '../backend';
import {ProtectApi, ProtectLogging} from "unifi-protect";
import {CachingFactory, ICacheable} from "../utils";
import {ProtocolManagerError} from "./index";

class NVR implements ICacheable {
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
    private _logger = logger.child({ 'class': 'UnifiProtocolManager' });
    private _supportedProtocols: string[] = ['unifi'];
    private _nvrCache = new CachingFactory<NVR>(NVR);

    canHandle(url: URL): boolean {
        return this._supportedProtocols.includes(url.protocol.split(':')[0]);
    }

    public async createTranscoder(url: URL): Promise<ITranscoder[]> {
        redact.push(url.password);
        this._logger.info(`Creating transcoder(s) for ${url}`);

        let nvr = await this._nvrCache.getOrCreate(url.host, url.username, url.password);

        let splitPathname = url.pathname.split('/');
        if(splitPathname[1] != 'camera') {
            this._logger.error(`Expecting url.pathname to start with '/camera' but got '${url.pathname}'`)
            throw new ProtocolManagerError();
        }

        const cameras = [];
        const filter = splitPathname[2].slice(3, -3);
        this._logger.debug(`Camera filter is '${filter}'`);

        if(filter == 'all') {
            for(let camera of nvr.cameras) {
                cameras.push(camera.id);
            }

            process.exit(0);
        } else {

        }

        return undefined;
    }
}


class LoggerDelegate implements ProtectLogging {
    log(level: string, message: string) {
        logger.log(level, message);
    }

    debug(message: string, ...parameters: unknown[]): void { this.log('debug', message); }
    error(message: string, ...parameters: unknown[]): void { this.log('error', message); }
    warn(message: string, ...parameters: unknown[]): void { this.log('warn', message); }
    info(message: string, ...parameters: unknown[]): void { this.log('info', message); }
}
