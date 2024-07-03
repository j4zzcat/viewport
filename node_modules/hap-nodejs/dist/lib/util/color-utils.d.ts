/**
 * @group Utils
 */
export declare class ColorUtils {
    /**
     * Returns the Hue and Saturation representation of the given color temperature in mired.
     *
     * @param colorTemperature - The color temperature in mired.
     * @param roundResults - The lookup table has a precision of .1 decimal places. The given characteristics only have a step value of 1.
     *  Thus, the method will round the results by default to an integer value. This can be turned off using this option.
     * @returns An number array of length 2 with the first element being the saturation and the second argument being the hue.
     */
    static colorTemperatureToHueAndSaturation(colorTemperature: number, roundResults?: boolean): {
        saturation: number;
        hue: number;
    };
}
//# sourceMappingURL=color-utils.d.ts.map