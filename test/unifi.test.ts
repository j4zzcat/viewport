import {describe, expect, test} from '@jest/globals';
import {UnifiStreamsManager} from "../src/backend/unifi";

describe('testing index file', () => {
    test('empty string should result in zero', () => {
        let usm = new UnifiStreamsManager();
        expect(usm.canHandle(new URL('unifi://u:p@host/camera'))).toBe(true);
    });
});