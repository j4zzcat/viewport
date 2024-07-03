/**
 * @group Utils
 */
export declare function findLoopbackAddress(): string;
/**
 * Returns the loopback address for the machine.
 * Uses IPV4 loopback address by default and falls back to global unique IPv6 loopback and then
 * link local IPv6 loopback address.
 * If no loopback interface could be found a error is thrown.
 *
 * @group Utils
 */
export declare function getOSLoopbackAddress(): string;
/**
 * Refer to {@link getOSLoopbackAddress}.
 * Instead of throwing an error, undefined is returned if loopback interface couldn't be detected.
 *
 * @group Utils
 */
export declare function getOSLoopbackAddressIfAvailable(): string | undefined;
//# sourceMappingURL=net-utils.d.ts.map