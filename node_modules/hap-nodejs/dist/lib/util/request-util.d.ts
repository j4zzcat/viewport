import { CharacteristicValue, Nullable } from "../../types";
import { CharacteristicProps, Formats } from "../Characteristic";
/**
 * Prepares the characteristic value to be sent to the HomeKit controller.
 * This includes changing booleans to 0 or 1 (for lower bandwidth) and converting
 * numbers to the desired minStep (by converting them to a string).
 * The minStep conversion only happens for minStep < 1
 *
 * @param value - The value which should be formatted
 * @param props - The characteristic properties used to format the value.
 * @private
 * @group Utils
 */
export declare function formatOutgoingCharacteristicValue(value: Nullable<CharacteristicValue>, props: CharacteristicProps): Nullable<CharacteristicValue>;
export declare function formatOutgoingCharacteristicValue(value: CharacteristicValue, props: CharacteristicProps): CharacteristicValue;
/**
 * @group Utils
 */
export declare function isNumericFormat(format: Formats | string): boolean;
/**
 * @group Utils
 */
export declare function isUnsignedNumericFormat(format: Formats | string): boolean;
/**
 * @group Utils
 */
export declare function isIntegerNumericFormat(format: Formats | string): boolean;
/**
 * @group Utils
 */
export declare function numericLowerBound(format: Formats | string): number;
/**
 * @group Utils
 */
export declare function numericUpperBound(format: Formats | string): number;
//# sourceMappingURL=request-util.d.ts.map