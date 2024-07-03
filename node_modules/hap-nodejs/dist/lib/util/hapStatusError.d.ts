import { HAPStatus } from "../HAPServer";
/**
 * Throws a HAP status error that is sent back to HomeKit.
 *
 * @example
 * ```ts
 * throw new HapStatusError(HAPStatus.OPERATION_TIMED_OUT);
 * ```
 *
 * @group Utils
 */
export declare class HapStatusError extends Error {
    hapStatus: HAPStatus;
    constructor(status: HAPStatus);
}
//# sourceMappingURL=hapStatusError.d.ts.map