import {describe, expect, test} from '@jest/globals';
import {UnifiVideoProvider} from "../src/backend/unifi";

describe('Testing UnifiVideoProvider', () => {
    test('Valid URLs can be handled', () => {
        let usm = new UnifiVideoProvider();
        expect(usm.canHandle(new URL('unifi://u:p@host/camera'))).toBe(true);
        expect(usm.canHandle(new URL('unifi://u:p@host/camera/_all'))).toBe(true);
        expect(usm.canHandle(new URL('unifi://u:p@host/camera/camera1,camera2'))).toBe(true);
        expect(usm.canHandle(new URL('unifi://u:p@host/camera/camera 1, camera 2'))).toBe(true);
        expect(usm.canHandle(new URL('unifi://192.168.4.10:1234/camera/camera 1, camera 2'))).toBe(true);
    });

    test('Invalid URLs cannot be handled', () => {
        let usm = new UnifiVideoProvider();
        expect(usm.canHandle(new URL('unifi://u:p@host'))).toBe(false);
        expect(usm.canHandle(new URL('xunifi://u:p@host/camera'))).toBe(false);
        expect(usm.canHandle(new URL('unifi://u:p@host/xcamera'))).toBe(false);
        expect(usm.canHandle(new URL('xunifi://192.168.4.10/camera'))).toBe(false);
    });
});