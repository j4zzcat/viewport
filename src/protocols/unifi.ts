import {logger} from "../logger";
import {IProtocolManager, ITranscoder} from '../backend';
import {ProtectApi, ProtectLogging} from "unifi-protect";

class NVR {
    private _host;
    private _username;
    private _password;
    private _protectApi;

    public constructor(host, username, password) {
        this._host = host;
        this._username = username;
        this._password = password;
    }

    public async connect() {
        this._protectApi = new ProtectApi(new LoggerDelegate());
        if(!(await this._protectApi.login(this._host, this._username, this._password))) {
            logger.error("Invalid login credentials.");
            process.exit(0);
        };

        if(!(await this._protectApi.getBootstrap())) {
            logger.error("Unable to bootstrap the Protect controller.");
            process.exit(0);
        }
    }
}

class NVRCache {
    private _nvrMap = new Map<string, Promise<NVR>>();

    getOrCreate(host, username, password): Promise<NVR> {
        let key = `${username}:${password}@${host}`
        if(this._nvrMap.has(key)) {
            return this._nvrMap.get(key);
        } else {
            let nvr = this.create(host, username, password);
            this._nvrMap.set(key, nvr);
            return nvr;
        }
    }

    private async create(host, username, password): Promise<NVR> {
        let nvr = new NVR(host, username, password);
        await nvr.connect();
        return nvr;
    }
}

export class UnifiProtocolManager implements IProtocolManager {
    private _supportedProtocols: string[] = ['unifi'];
    private _nvrCache = new NVRCache();

    canHandle(url: URL): boolean {
        return this._supportedProtocols.includes(url.protocol.split(':')[0]);
    }

    createTranscoder(url: URL): ITranscoder[] {
        logger.info(`Creating transcoder for ${url}`);
        let nvr = this._nvrCache.getOrCreate(url.host, url.username, url.password);

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
