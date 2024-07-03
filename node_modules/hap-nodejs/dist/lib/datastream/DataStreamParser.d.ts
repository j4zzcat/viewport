/// <reference types="node" />
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class ValueWrapper<T> {
    value: T;
    constructor(value: T);
    equals(obj: ValueWrapper<T>): boolean;
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class Int8 extends ValueWrapper<number> {
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class Int16 extends ValueWrapper<number> {
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class Int32 extends ValueWrapper<number> {
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class Int64 extends ValueWrapper<number> {
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class Float32 extends ValueWrapper<number> {
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class Float64 extends ValueWrapper<number> {
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class SecondsSince2001 extends ValueWrapper<number> {
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class UUID extends ValueWrapper<string> {
    constructor(value: string);
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare const enum DataFormatTags {
    INVALID = 0,
    TRUE = 1,
    FALSE = 2,
    TERMINATOR = 3,
    NULL = 4,
    UUID = 5,
    DATE = 6,
    INTEGER_MINUS_ONE = 7,
    INTEGER_RANGE_START_0 = 8,
    INTEGER_RANGE_STOP_39 = 46,
    INT8 = 48,
    INT16LE = 49,
    INT32LE = 50,
    INT64LE = 51,
    FLOAT32LE = 53,
    FLOAT64LE = 54,
    UTF8_LENGTH_START = 64,
    UTF8_LENGTH_STOP = 96,
    UTF8_LENGTH8 = 97,
    UTF8_LENGTH16LE = 98,
    UTF8_LENGTH32LE = 99,
    UTF8_LENGTH64LE = 100,
    UTF8_NULL_TERMINATED = 111,
    DATA_LENGTH_START = 112,
    DATA_LENGTH_STOP = 144,
    DATA_LENGTH8 = 145,
    DATA_LENGTH16LE = 146,
    DATA_LENGTH32LE = 147,
    DATA_LENGTH64LE = 148,
    DATA_TERMINATED = 159,
    COMPRESSION_START = 160,
    COMPRESSION_STOP = 207,
    ARRAY_LENGTH_START = 208,
    ARRAY_LENGTH_STOP = 222,
    ARRAY_TERMINATED = 223,
    DICTIONARY_LENGTH_START = 224,
    DICTIONARY_LENGTH_STOP = 238,
    DICTIONARY_TERMINATED = 239
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class DataStreamParser {
    static decode(buffer: DataStreamReader): any;
    static encode(data: any, buffer: DataStreamWriter): void;
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class DataStreamReader {
    private readonly data;
    readerIndex: number;
    private trackedCompressedData;
    constructor(data: Buffer);
    finished(): void;
    decompressData(index: number): any;
    private trackData;
    private ensureLength;
    readTag(): number;
    readTrue(): true;
    readFalse(): false;
    readNegOne(): -1;
    readIntRange(tag: number): number;
    readInt8(): number;
    readInt16LE(): number;
    readInt32LE(): number;
    readInt64LE(): number;
    readFloat32LE(): number;
    readFloat64LE(): number;
    private readLength8;
    private readLength16LE;
    private readLength32LE;
    private readLength64LE;
    readUTF8(length: number): string;
    readUTF8_Length8(): string;
    readUTF8_Length16LE(): string;
    readUTF8_Length32LE(): string;
    readUTF8_Length64LE(): string;
    readUTF8_NULL_terminated(): string;
    readData(length: number): Buffer;
    readData_Length8(): Buffer;
    readData_Length16LE(): Buffer;
    readData_Length32LE(): Buffer;
    readData_Length64LE(): Buffer;
    readData_terminated(): Buffer;
    readSecondsSince2001_01_01(): number;
    readUUID(): string;
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class DataStreamWriter {
    private static readonly chunkSize;
    private data;
    private writerIndex;
    private writtenData;
    constructor();
    length(): number;
    getData(): Buffer;
    private ensureLength;
    private compressDataIfPossible;
    writeTag(tag: DataFormatTags): void;
    writeTrue(): void;
    writeFalse(): void;
    writeNumber(number: number): void;
    writeInt8(int8: Int8): void;
    writeInt16LE(int16: Int16): void;
    writeInt32LE(int32: Int32): void;
    writeInt64LE(int64: Int64): void;
    writeFloat32LE(float32: Float32): void;
    writeFloat64LE(float64: Float64): void;
    private writeLength8;
    private writeLength16LE;
    private writeLength32LE;
    private writeLength64LE;
    writeUTF8(utf8: string): void;
    private _writeUTF8;
    private writeUTF8_Length8;
    private writeUTF8_Length16LE;
    private writeUTF8_Length32LE;
    private writeUTF8_Length64LE;
    private writeUTF8_NULL_terminated;
    writeData(data: Buffer): void;
    private _writeData;
    private writeData_Length8;
    private writeData_Length16LE;
    private writeData_Length32LE;
    private writeData_Length64LE;
    private writeData_terminated;
    writeSecondsSince2001_01_01(seconds: SecondsSince2001): void;
    writeUUID(uuid_string: string): void;
}
//# sourceMappingURL=DataStreamParser.d.ts.map