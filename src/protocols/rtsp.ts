import {logger} from "../logger";
import {IProtocolManager, ITranscoder} from '../backend';

export class RTSPProtocolManager implements IProtocolManager {
    canHandle(url: URL): boolean {
        return false;
    }

    createTranscoder(url: URL): ITranscoder[] {
        return undefined;
    }
}

