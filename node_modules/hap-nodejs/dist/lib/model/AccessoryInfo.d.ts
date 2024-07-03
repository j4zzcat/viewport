/// <reference types="node" />
import { AccessoryJsonObject, MacAddress } from "../../types";
import { Categories } from "../Accessory";
import { HAPConnection, HAPUsername } from "../util/eventedhttp";
/**
 * @group Model
 */
export declare const enum PermissionTypes {
    USER = 0,
    ADMIN = 1
}
/**
 * @group Model
 */
export interface PairingInformation {
    username: HAPUsername;
    publicKey: Buffer;
    permission: PermissionTypes;
}
/**
 * AccessoryInfo is a model class containing a subset of Accessory data relevant to the internal HAP server,
 * such as encryption keys and username. It is persisted to disk.
 * @group Model
 */
export declare class AccessoryInfo {
    static readonly deviceIdPattern: RegExp;
    username: MacAddress;
    displayName: string;
    model: string;
    category: Categories;
    pincode: string;
    signSk: Buffer;
    signPk: Buffer;
    pairedClients: Record<HAPUsername, PairingInformation>;
    pairedAdminClients: number;
    private configVersion;
    private configHash;
    setupID: string;
    private lastFirmwareVersion;
    private constructor();
    /**
     * Add a paired client to memory.
     * @param {HAPUsername} username
     * @param {Buffer} publicKey
     * @param {PermissionTypes} permission
     */
    addPairedClient(username: HAPUsername, publicKey: Buffer, permission: PermissionTypes): void;
    updatePermission(username: HAPUsername, permission: PermissionTypes): void;
    listPairings(): PairingInformation[];
    /**
     * Remove a paired client from memory.
     * @param connection - the session of the connection initiated the removal of the pairing
     * @param {string} username
     */
    removePairedClient(connection: HAPConnection, username: HAPUsername): void;
    private _removePairedClient0;
    /**
     * Check if username is paired
     * @param username
     */
    isPaired(username: HAPUsername): boolean;
    hasAdminPermissions(username: HAPUsername): boolean;
    getClientPublicKey(username: HAPUsername): Buffer | undefined;
    paired: () => boolean;
    /**
     * Checks based on the current accessory configuration if the current configuration number needs to be incremented.
     * Additionally, if desired, it checks if the firmware version was incremented (aka the HAP-NodeJS) version did grow.
     *
     * @param configuration - The current accessory configuration.
     * @param checkFirmwareIncrement
     * @returns True if the current configuration number was incremented and thus a new TXT must be advertised.
     */
    checkForCurrentConfigurationNumberIncrement(configuration: AccessoryJsonObject[], checkFirmwareIncrement?: boolean): boolean;
    getConfigVersion(): number;
    private ensureConfigVersionBounds;
    save(): void;
    static persistKey(username: MacAddress): string;
    static create(username: MacAddress): AccessoryInfo;
    static load(username: MacAddress): AccessoryInfo | null;
    static remove(username: MacAddress): void;
    static assertValidUsername(username: MacAddress): void;
}
//# sourceMappingURL=AccessoryInfo.d.ts.map