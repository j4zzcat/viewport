/// <reference types="node" />
/**
 * @group TLV8
 */
export type TLVEncodable = Buffer | number | string;
/**
 * @group TLV8
 */
export declare function encode(type: number, data: TLVEncodable | TLVEncodable[], ...args: any[]): Buffer;
/**
 * This method is the legacy way of decoding tlv data.
 * It will not properly decode multiple list of the same id.
 * Should the decoder encounter multiple instances of the same id, it will just concatenate the buffer data.
 *
 * @param buffer - TLV8 data
 *
 * Note: Please use {@link decodeWithLists} which properly decodes list elements.
 *
 * @group TLV8
 */
export declare function decode(buffer: Buffer): Record<number, Buffer>;
/**
 * Decode a buffer coding TLV8 encoded entries.
 *
 * This method decodes multiple entries split by a TLV delimiter properly into Buffer arrays.
 * It properly reassembles tlv entries if they were split across multiple entries due to exceeding the max tlv entry size of 255 bytes.
 * @param buffer - The Buffer containing TLV8 encoded data.
 *
 * @group TLV8
 */
export declare function decodeWithLists(buffer: Buffer): Record<number, Buffer | Buffer[]>;
/**
 * This method can be used to parse a TLV8 encoded list that was concatenated.
 *
 * If you are thinking about using this method, try to refactor the code to use {@link decodeWithLists} instead of {@link decode}.
 * The single reason of this method's existence are the shortcomings {@link decode}, as it concatenates multiple tlv8 list entries
 * into a single Buffer.
 * This method can be used to undo that, by specifying the concatenated buffer and the tlv id of the element that should
 * mark the beginning of a new tlv8 list entry.
 *
 * @param data - The concatenated tlv8 list entries (probably output of {@link decode}).
 * @param entryStartId - The tlv id that marks the beginning of a new tlv8 entry.
 *
 * @group TLV8
 */
export declare function decodeList(data: Buffer, entryStartId: number): Record<number, Buffer>[];
/**
 * @deprecated This implementation is considered broken. Don't use it.
 *
 * @group TLV8
 */
export declare function writeUInt64(value: number): Buffer;
/**
 * @deprecated This implementation is considered broken. Don't use it.
 *
 * @group TLV8
 */
export declare function readUInt64(buffer: Buffer): number;
/**
 * @group TLV8
 */
export declare function readUInt64LE(buffer: Buffer, offset?: number): number;
/**
 * @deprecated The method was named wrongfully and actually reads an UInt64 in **little endian** format.
 * @group TLV8
 */
export declare function readUInt64BE(buffer: Buffer, offset?: number): number;
/**
 * `writeUint32LE`
 * @group TLV8
 */
export declare function writeUInt32(value: number): Buffer;
/**
 * `readUInt32LE`
 * @group TLV8
 */
export declare function readUInt32(buffer: Buffer): number;
/**
 * @group TLV8
 */
export declare function writeFloat32LE(value: number): Buffer;
/**
 * `writeUInt16LE`
 * @group TLV8
 */
export declare function writeUInt16(value: number): Buffer;
/**
 * `readUInt16LE`
 * @group TLV8
 */
export declare function readUInt16(buffer: Buffer): number;
/**
 * Reads variable size unsigned integer {@link writeVariableUIntLE}.
 * @param buffer - The buffer to read from. It must have exactly the size of the given integer.
 * @group TLV8
 */
export declare function readVariableUIntLE(buffer: Buffer): number;
/**
 * @deprecated Can't define an offset. The original implementation messed up here!
 * @group TLV8
 */
export declare function readVariableUIntLE(buffer: Buffer, offset: number): number;
/**
 * Writes variable size unsigned integer.
 * Either:
 * - `UInt8`
 * - `UInt16LE`
 * - `UInt32LE`
 * @param number
 * @group TLV8
 */
export declare function writeVariableUIntLE(number: number): Buffer;
/**
 * @deprecated Can't define an offset. The original implementation messed up here!
 * @group TLV8
 */
export declare function writeVariableUIntLE(number: number, offset: number): Buffer;
//# sourceMappingURL=tlv.d.ts.map