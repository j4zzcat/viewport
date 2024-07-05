import {logger} from "../logger";
import {IProtocolManager, ITranscoder} from '../backend';

class NVR {
}

class NVRCache {
    private _nvrs = new Map<string, NVR>();

    getOrCreate(host, port, username, password): NVR {
        let key = `${username}:${password}@${host}:${port}`
        if(this._nvrs.has(key)) {
            return this._nvrs.get(key);
        } else {
            let nvr = this.create(host, port, username, password);
            this._nvrs.set(key, nvr);
        }
    }

    private create(host, port, username, password): NVR {
        return undefined;
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
        let nvr = this._nvrCache.getOrCreate(url.host, url.port, url.username, url.password);

        return undefined;
    }
}
