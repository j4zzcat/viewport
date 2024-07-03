"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numericUpperBound = exports.numericLowerBound = exports.isIntegerNumericFormat = exports.isUnsignedNumericFormat = exports.isNumericFormat = exports.formatOutgoingCharacteristicValue = void 0;
function formatOutgoingCharacteristicValue(value, props) {
    var _a;
    if (typeof value === "boolean") {
        return value ? 1 : 0;
    }
    else if (typeof value === "number") {
        if (!props.minStep || props.minStep >= 1) {
            return value;
        }
        var base = (_a = props.minValue) !== null && _a !== void 0 ? _a : 0;
        var inverse = 1 / props.minStep;
        return Math.round(((Math.round((value - base) * inverse) / inverse) + base) * 10000) / 10000;
    }
    return value;
}
exports.formatOutgoingCharacteristicValue = formatOutgoingCharacteristicValue;
/**
 * @group Utils
 */
function isNumericFormat(format) {
    switch (format) {
        case "int" /* Formats.INT */:
        case "float" /* Formats.FLOAT */:
        case "uint8" /* Formats.UINT8 */:
        case "uint16" /* Formats.UINT16 */:
        case "uint32" /* Formats.UINT32 */:
        case "uint64" /* Formats.UINT64 */:
            return true;
        default:
            return false;
    }
}
exports.isNumericFormat = isNumericFormat;
/**
 * @group Utils
 */
function isUnsignedNumericFormat(format) {
    switch (format) {
        case "uint8" /* Formats.UINT8 */:
        case "uint16" /* Formats.UINT16 */:
        case "uint32" /* Formats.UINT32 */:
        case "uint64" /* Formats.UINT64 */:
            return true;
        default:
            return false;
    }
}
exports.isUnsignedNumericFormat = isUnsignedNumericFormat;
/**
 * @group Utils
 */
function isIntegerNumericFormat(format) {
    switch (format) {
        case "int" /* Formats.INT */:
        case "uint8" /* Formats.UINT8 */:
        case "uint16" /* Formats.UINT16 */:
        case "uint32" /* Formats.UINT32 */:
        case "uint64" /* Formats.UINT64 */:
            return true;
        default:
            return false;
    }
}
exports.isIntegerNumericFormat = isIntegerNumericFormat;
/**
 * @group Utils
 */
function numericLowerBound(format) {
    switch (format) {
        case "int" /* Formats.INT */:
            return -2147483648;
        case "float" /* Formats.FLOAT */:
            return -Number.MAX_VALUE;
        case "uint8" /* Formats.UINT8 */:
        case "uint16" /* Formats.UINT16 */:
        case "uint32" /* Formats.UINT32 */:
        case "uint64" /* Formats.UINT64 */:
            return 0;
        default:
            throw new Error("Unable to determine numeric lower bound for " + format);
    }
}
exports.numericLowerBound = numericLowerBound;
/**
 * @group Utils
 */
function numericUpperBound(format) {
    switch (format) {
        case "int" /* Formats.INT */:
            return 2147483647;
        case "float" /* Formats.FLOAT */:
            return Number.MAX_VALUE;
        case "uint8" /* Formats.UINT8 */:
            return 255;
        case "uint16" /* Formats.UINT16 */:
            return 65535;
        case "uint32" /* Formats.UINT32 */:
            return 4294967295;
        case "uint64" /* Formats.UINT64 */:
            // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
            return 18446744073709551615; // don't get fooled, javascript uses 18446744073709552000 here
        default:
            throw new Error("Unable to determine numeric lower bound for " + format);
    }
}
exports.numericUpperBound = numericUpperBound;
//# sourceMappingURL=request-util.js.map