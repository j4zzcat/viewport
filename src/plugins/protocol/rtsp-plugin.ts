import {logger} from "../logger";
import {IProtocolPlugin, ITranscoder} from '../../backend/backend';

export class RTSPPlugin implements IProtocolPlugin {
    canHandle(url: URL): boolean {
        return false;
    }

    createTranscoders(url: URL): Promise<ITranscoder[]> {
        return Promise.resolve([]);
    }
}

