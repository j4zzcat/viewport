import {describe, expect, test} from '@jest/globals';
import {UnifiStreamsManager} from "../src/backend/unifi";

describe('Testing UnifiVideoProvider', () => {
    test('Valid URL can be handled', () => {
        let usm = new UnifiStreamsManager();
        expect(usm.canHandle(new URL('unifi://u:p@host/camera'))).toBe(true);
    });

    test('Invalid URL cannot be handled', () => {
        let usm = new UnifiStreamsManager();
        expect(usm.canHandle(new URL('xunifi://u:p@host/camera'))).toBe(false);
        expect(usm.canHandle(new URL('unifi://u:p@host/xcamera'))).toBe(false);
    });

});