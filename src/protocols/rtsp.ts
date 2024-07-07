import {logger} from "../logger";
import {IProtocolManager, ITranscoder} from '../backend';

export class RTSPProtocolManager implements IProtocolManager {
    canHandle(url: URL): boolean {
        return false;
    }

    createTranscoders(url: URL): Promise<ITranscoder[]> {
        return Promise.resolve([]);
    }
}

