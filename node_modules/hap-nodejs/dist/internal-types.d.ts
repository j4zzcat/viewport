import { CharacteristicValue, Nullable } from "./types";
/**
 * @group HAP Accessory Server
 */
export interface EventNotification {
    characteristics: CharacteristicEventNotification[];
}
/**
 * @group HAP Accessory Server
 */
export interface CharacteristicEventNotification {
    aid: number;
    iid: number;
    value: Nullable<CharacteristicValue>;
}
/**
 * @group Utils
 */
export declare function consideredTrue(input: string | null): boolean;
/**
 * @group HAP Accessory Server
 */
export declare const enum TLVValues {
    REQUEST_TYPE = 0,
    METHOD = 0,// (match the terminology of the spec sheet but keep backwards compatibility with entry above)
    USERNAME = 1,
    IDENTIFIER = 1,
    SALT = 2,
    PUBLIC_KEY = 3,
    PASSWORD_PROOF = 4,
    ENCRYPTED_DATA = 5,
    SEQUENCE_NUM = 6,
    STATE = 6,
    ERROR_CODE = 7,
    RETRY_DELAY = 8,
    CERTIFICATE = 9,// x.509 certificate
    PROOF = 10,
    SIGNATURE = 10,// apple authentication coprocessor
    PERMISSIONS = 11,// None (0x00): regular user, 0x01: Admin (able to add/remove/list pairings)
    FRAGMENT_DATA = 12,
    FRAGMENT_LAST = 13,
    SEPARATOR = 255
}
/**
 * @group HAP Accessory Server
 */
export declare const enum PairMethods {
    PAIR_SETUP = 0,
    PAIR_SETUP_WITH_AUTH = 1,
    PAIR_VERIFY = 2,
    ADD_PAIRING = 3,
    REMOVE_PAIRING = 4,
    LIST_PAIRINGS = 5
}
/**
 * Pairing states (pair-setup or pair-verify). Encoded in {@link TLVValues.SEQUENCE_NUM}.
 *
 * @group HAP Accessory Server
 */
export declare const enum PairingStates {
    M1 = 1,
    M2 = 2,
    M3 = 3,
    M4 = 4,
    M5 = 5,
    M6 = 6
}
/**
 * @group HAP Accessory Server
 */
export declare const enum HAPMimeTypes {
    PAIRING_TLV8 = "application/pairing+tlv8",
    HAP_JSON = "application/hap+json",
    IMAGE_JPEG = "image/jpeg"
}
//# sourceMappingURL=internal-types.d.ts.map