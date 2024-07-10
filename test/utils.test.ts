import {afterAll, describe, expect, test} from '@jest/globals';
import {nextFreePort} from "../src/utils/net";

// describe(`Testing Utils`, () => {
//     test('Next free port', async () => {
//         let port = await nextFreePort(63342);
//         expect(port).toBe(63343);
//
//     });
// });