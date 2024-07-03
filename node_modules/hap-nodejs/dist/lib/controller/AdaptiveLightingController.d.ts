/// <reference types="node" />
import { EventEmitter } from "events";
import { Lightbulb } from "../definitions";
import { ControllerIdentifier, ControllerServiceMap, SerializableController, StateChangeDelegate } from "./Controller";
/**
 * @group Adaptive Lighting
 */
export interface ActiveAdaptiveLightingTransition {
    /**
     * The instance id for the characteristic for which this transition applies to (aka the ColorTemperature characteristic).
     */
    iid: number;
    /**
     * Start of the transition in epoch time millis (as sent from the HomeKit controller).
     * Additionally see {@link timeMillisOffset}.
     */
    transitionStartMillis: number;
    /**
     * It is not necessarily given, that we have the same time (or rather the correct time) as the HomeKit controller
     * who set up the transition schedule.
     * Thus we record the delta between our current time and the the time sent with the setup request.
     * <code>timeMillisOffset</code> is defined as <code>Date.now() - transitionStartMillis;</code>.
     * So in the case were we actually have a correct local time, it most likely will be positive (due to network latency).
     * But of course it can also be negative.
     */
    timeMillisOffset: number;
    /**
     * Value is the same for ALL control write requests I have seen (even on other homes).
     * @private
     */
    transitionId: string;
    /**
     * Start of transition in milliseconds from 2001-01-01 00:00:00; unsigned 64 bit LE integer
     * @private as it is a 64 bit integer, we just store the buffer to not have the struggle to encode/decode 64 bit int in JavaScript
     */
    transitionStartBuffer: string;
    /**
     * Hex string of 8 bytes. Some kind of id (?). Sometimes it isn't supplied. Don't know the use for that.
     * @private
     */
    id3?: string;
    transitionCurve: AdaptiveLightingTransitionCurveEntry[];
    brightnessCharacteristicIID: number;
    brightnessAdjustmentRange: BrightnessAdjustmentMultiplierRange;
    /**
     * Interval in milliseconds specifies how often the accessory should update the color temperature (internally).
     * Typically this is 60000 aka 60 seconds aka 1 minute.
     * Note {@link notifyIntervalThreshold}
     */
    updateInterval: number;
    /**
     * Defines the interval in milliseconds on how often the accessory may send even notifications
     * to subscribed HomeKit controllers (aka call {@link Characteristic.updateValue}.
     * Typically this is 600000 aka 600 seconds aka 10 minutes or 300000 aka 300 seconds aka 5 minutes.
     */
    notifyIntervalThreshold: number;
}
/**
 * @group Adaptive Lighting
 */
export interface AdaptiveLightingTransitionPoint {
    /**
     * This is the time offset from the transition start to the {@link lowerBound}.
     */
    lowerBoundTimeOffset: number;
    transitionOffset: number;
    lowerBound: AdaptiveLightingTransitionCurveEntry;
    upperBound: AdaptiveLightingTransitionCurveEntry;
}
/**
 * @group Adaptive Lighting
 */
export interface AdaptiveLightingTransitionCurveEntry {
    /**
     * The color temperature in mired.
     */
    temperature: number;
    /**
     * The color temperature actually set to the color temperature characteristic is dependent
     * on the current brightness value of the lightbulb.
     * This means you will always need to query the current brightness when updating the color temperature
     * for the next transition step.
     * Additionally you will also need to correct the color temperature when the end user changes the
     * brightness of the Lightbulb.
     *
     * The brightnessAdjustmentFactor is always a negative floating point value.
     *
     * To calculate the resulting color temperature you will need to do the following.
     *
     * In short: temperature + brightnessAdjustmentFactor * currentBrightness
     *
     * Complete example:
     * ```js
     * const temperature = ...; // next transition value, the above property
     * // below query the current brightness while staying the the min/max brightness range (typically between 10-100 percent)
     * const currentBrightness = Math.max(minBrightnessValue, Math.min(maxBrightnessValue, CHARACTERISTIC_BRIGHTNESS_VALUE));
     *
     * // as both temperature and brightnessAdjustmentFactor are floating point values it is advised to round to the next integer
     * const resultTemperature = Math.round(temperature + brightnessAdjustmentFactor * currentBrightness);
     * ```
     */
    brightnessAdjustmentFactor: number;
    /**
     * The duration in milliseconds this exact temperature value stays the same.
     * When we transition to to the temperature value represented by this entry, it stays for the specified
     * duration on the exact same value (with respect to brightness adjustment) until we transition
     * to the next entry (see {@link transitionTime}).
     */
    duration?: number;
    /**
     * The time in milliseconds the color temperature should transition from the previous
     * entry to this one.
     * For example if we got the two values A and B, with A.temperature = 300 and B.temperature = 400 and
     * for the current time we are at temperature value 300. Then we need to transition smoothly
     * within the B.transitionTime to the B.temperature value.
     * If this is the first entry in the Curve (this value is probably zero) and is the offset to the transitionStartMillis
     * (the Date/Time were this transition curve was set up).
     */
    transitionTime: number;
}
/**
 * @group Adaptive Lighting
 */
export interface BrightnessAdjustmentMultiplierRange {
    minBrightnessValue: number;
    maxBrightnessValue: number;
}
/**
 * @group Adaptive Lighting
 */
export interface AdaptiveLightingOptions {
    /**
     * Defines how the controller will operate.
     * You can choose between automatic and manual mode.
     * See {@link AdaptiveLightingControllerMode}.
     */
    controllerMode?: AdaptiveLightingControllerMode;
    /**
     * Defines a custom temperature adjustment factor.
     *
     * This can be used to define a linear deviation from the HomeKit Controller defined
     * ColorTemperature schedule.
     *
     * For example supplying a value of `-10` will reduce the ColorTemperature, which is
     * calculated from the transition schedule, by 10 mired for every change.
     */
    customTemperatureAdjustment?: number;
}
/**
 * Defines in which mode the {@link AdaptiveLightingController} will operate in.
 * @group Adaptive Lighting
 */
export declare const enum AdaptiveLightingControllerMode {
    /**
     * In automatic mode pretty much everything from setup to transition scheduling is done by the controller.
     */
    AUTOMATIC = 1,
    /**
     * In manual mode setup is done by the controller but the actual transition must be done by the user.
     * This is useful for lights which natively support transitions.
     */
    MANUAL = 2
}
/**
 * @group Adaptive Lighting
 */
export declare const enum AdaptiveLightingControllerEvents {
    /**
     * This event is called once a HomeKit controller enables Adaptive Lighting
     * or a HomeHub sends a updated transition schedule for the next 24 hours.
     * This is also called on startup when AdaptiveLighting was previously enabled.
     */
    UPDATE = "update",
    /**
     * In yet unknown circumstances HomeKit may also send a dedicated disable command
     * via the control point characteristic. You may want to handle that in manual mode as well.
     * The current transition will still be associated with the controller object when this event is called.
     */
    DISABLED = "disable"
}
/**
 * @group Adaptive Lighting
 */
export declare interface AdaptiveLightingController {
    /**
     * See {@link AdaptiveLightingControllerEvents.UPDATE}
     *
     * @param event
     * @param listener
     */
    on(event: "update", listener: () => void): this;
    /**
     * See {@link AdaptiveLightingControllerEvents.DISABLED}
     *
     * @param event
     * @param listener
     */
    on(event: "disable", listener: () => void): this;
    emit(event: "update"): boolean;
    emit(event: "disable"): boolean;
}
/**
 * @group Adaptive Lighting
 */
export interface SerializedAdaptiveLightingControllerState {
    activeTransition: ActiveAdaptiveLightingTransition;
}
/**
 * This class allows adding Adaptive Lighting support to Lightbulb services.
 * The Lightbulb service MUST have the {@link Characteristic.ColorTemperature} characteristic AND
 * the {@link Characteristic.Brightness} characteristic added.
 * The light may also expose {@link Characteristic.Hue} and {@link Characteristic.Saturation} characteristics
 * (though additional work is required to keep them in sync with the color temperature characteristic. see below)
 *
 * How Adaptive Lighting works:
 *  When enabling AdaptiveLighting the iDevice will send a transition schedule for the next 24 hours.
 *  This schedule will be renewed all 24 hours by a HomeHub in your home
 *  (updating the schedule according to your current day/night situation).
 *  Once enabled the lightbulb will execute the provided transitions. The color temperature value set is always
 *  dependent on the current brightness value. Meaning brighter light will be colder and darker light will be warmer.
 *  HomeKit considers Adaptive Lighting to be disabled as soon a write happens to either the
 *  Hue/Saturation or the ColorTemperature characteristics.
 *  The AdaptiveLighting state must persist across reboots.
 *
 * The AdaptiveLightingController can be operated in two modes: {@link AdaptiveLightingControllerMode.AUTOMATIC} and
 * {@link AdaptiveLightingControllerMode.MANUAL} with AUTOMATIC being the default.
 * The goal would be that the color transition is done DIRECTLY on the light itself, thus not creating any
 * additional/heavy traffic on the network.
 * So if your light hardware/API supports transitions please go the extra mile and use MANUAL mode.
 *
 *
 *
 * Below is an overview what you need to or consider when enabling AdaptiveLighting (categorized by mode).
 * The {@link AdaptiveLightingControllerMode} can be defined with the second constructor argument.
 *
 * <b>AUTOMATIC (Default mode):</b>
 *
 *  This is the easiest mode to setup and needs less to no work form your side for AdaptiveLighting to work.
 *  The AdaptiveLightingController will go through setup procedure with HomeKit and automatically update
 *  the color temperature characteristic base on the current transition schedule.
 *  It is also adjusting the color temperature when a write to the brightness characteristic happens.
 *  Additionally, it will also handle turning off AdaptiveLighting, when it detects a write happening to the
 *  ColorTemperature, Hue or Saturation characteristic (though it can only detect writes coming from HomeKit and
 *  can't detect changes done to the physical devices directly! See below).
 *
 *  So what do you need to consider in automatic mode:
 *   - Brightness and ColorTemperature characteristics MUST be set up. Hue and Saturation may be added for color support.
 *   - Color temperature will be updated all 60 seconds by calling the SET handler of the ColorTemperature characteristic.
 *    So every transition behaves like a regular write to the ColorTemperature characteristic.
 *   - Every transition step is dependent on the current brightness value. Try to keep the internal cache updated
 *    as the controller won't call the GET handler every 60 seconds.
 *    (The cached brightness value is updated on SET/GET operations or by manually calling {@link Characteristic.updateValue}
 *    on the brightness characteristic).
 *   - Detecting changes on the lightbulb side:
 *    Any manual change to ColorTemperature or Hue/Saturation is considered as a signal to turn AdaptiveLighting off.
 *    In order to notify the AdaptiveLightingController of such an event happening OUTSIDE of HomeKit
 *    you must call {@link disableAdaptiveLighting} manually!
 *   - Be aware that even when the light is turned off the transition will continue to call the SET handler
 *    of the ColorTemperature characteristic.
 *   - When using Hue/Saturation:
 *    When using Hue/Saturation in combination with the ColorTemperature characteristic you need to update the
 *    respective other in a particular way depending on if being in "color mode" or "color temperature mode".
 *    When a write happens to Hue/Saturation characteristic in is advised to set the internal value of the
 *    ColorTemperature to the minimal (NOT RAISING an event).
 *    When a write happens to the ColorTemperature characteristic just MUST convert to a proper representation
 *    in hue and saturation values, with RAISING an event.
 *    As noted above you MUST NOT call the {@link Characteristic.setValue} method for this, as this will be considered
 *    a write to the characteristic and will turn off AdaptiveLighting. Instead, you should use
 *    {@link Characteristic.updateValue} for this.
 *    You can and SHOULD use the supplied utility method {@link ColorUtils.colorTemperatureToHueAndSaturation}
 *    for converting mired to hue and saturation values.
 *
 *
 * <b>MANUAL mode:</b>
 *
 *  Manual mode is recommended for any accessories which support transitions natively on the devices end.
 *  Like for example ZigBee lights which support sending transitions directly to the lightbulb which
 *  then get executed ON the lightbulb itself reducing unnecessary network traffic.
 *  Here is a quick overview what you have to consider to successfully implement AdaptiveLighting support.
 *  The AdaptiveLightingController will also in manual mode do all the setup procedure.
 *  It will also save the transition schedule to disk to keep AdaptiveLighting enabled across reboots.
 *  The "only" thing you have to do yourself is handling the actual transitions, check that event notifications
 *  are only sent in the defined interval threshold, adjust the color temperature when brightness is changed
 *  and signal that Adaptive Lighting should be disabled if ColorTemperature, Hue or Saturation is changed manually.
 *
 *  First step is to setup up an event handler for the {@link AdaptiveLightingControllerEvents.UPDATE}, which is called
 *  when AdaptiveLighting is enabled, the HomeHub updates the schedule for the next 24 hours or AdaptiveLighting
 *  is restored from disk on startup.
 *  In the event handler you can get the current schedule via {@link AdaptiveLightingController.getAdaptiveLightingTransitionCurve},
 *  retrieve current intervals like {@link AdaptiveLightingController.getAdaptiveLightingUpdateInterval} or
 *  {@link AdaptiveLightingController.getAdaptiveLightingNotifyIntervalThreshold} and get the date in epoch millis
 *  when the current transition curve started using {@link AdaptiveLightingController.getAdaptiveLightingStartTimeOfTransition}.
 *  Additionally {@link AdaptiveLightingController.getAdaptiveLightingBrightnessMultiplierRange} can be used
 *  to get the valid range for the brightness value to calculate the brightness adjustment factor.
 *  The method {@link AdaptiveLightingController.isAdaptiveLightingActive} can be used to check if AdaptiveLighting is enabled.
 *  Besides, actually running the transition (see {@link AdaptiveLightingTransitionCurveEntry}) you must correctly update
 *  the color temperature when the brightness of the lightbulb changes (see {@link AdaptiveLightingTransitionCurveEntry.brightnessAdjustmentFactor}),
 *  and signal when AdaptiveLighting got disabled by calling {@link AdaptiveLightingController.disableAdaptiveLighting}
 *  when ColorTemperature, Hue or Saturation where changed manually.
 *  Lastly you should set up a event handler for the {@link AdaptiveLightingControllerEvents.DISABLED} event.
 *  In yet unknown circumstances HomeKit may also send a dedicated disable command via the control point characteristic.
 *  Be prepared to handle that.
 *
 *  @group Adaptive Lighting
 */
export declare class AdaptiveLightingController extends EventEmitter implements SerializableController<ControllerServiceMap, SerializedAdaptiveLightingControllerState> {
    private stateChangeDelegate?;
    private readonly lightbulb;
    private readonly mode;
    private readonly customTemperatureAdjustment;
    private readonly adjustmentFactorChangedListener;
    private readonly characteristicManualWrittenChangeListener;
    private supportedTransitionConfiguration?;
    private transitionControl?;
    private activeTransitionCount?;
    private colorTemperatureCharacteristic?;
    private brightnessCharacteristic?;
    private saturationCharacteristic?;
    private hueCharacteristic?;
    private activeTransition?;
    private didRunFirstInitializationStep;
    private updateTimeout?;
    private lastTransitionPointInfo?;
    private lastEventNotificationSent;
    private lastNotifiedTemperatureValue;
    private lastNotifiedSaturationValue;
    private lastNotifiedHueValue;
    /**
     * Creates a new instance of the AdaptiveLightingController.
     * Refer to the {@link AdaptiveLightingController} documentation on how to use it.
     *
     * @param service - The lightbulb to which Adaptive Lighting support should be added.
     * @param options - Optional options to define the operating mode (automatic vs manual).
     */
    constructor(service: Lightbulb, options?: AdaptiveLightingOptions);
    /**
     * @private
     */
    controllerId(): ControllerIdentifier;
    /**
     * Returns if a Adaptive Lighting transition is currently active.
     */
    isAdaptiveLightingActive(): boolean;
    /**
     * This method can be called to manually disable the current active Adaptive Lighting transition.
     * When using {@link AdaptiveLightingControllerMode.AUTOMATIC} you won't need to call this method.
     * In {@link AdaptiveLightingControllerMode.MANUAL} you must call this method when Adaptive Lighting should be disabled.
     * This is the case when the user manually changes the value of Hue, Saturation or ColorTemperature characteristics
     * (or if any of those values is changed by physical interaction with the lightbulb).
     */
    disableAdaptiveLighting(): void;
    /**
     * Returns the time where the current transition curve was started in epoch time millis.
     * A transition curves is active for 24 hours typically and is renewed every 24 hours by a HomeHub.
     * Additionally see {@link getAdaptiveLightingTimeOffset}.
     */
    getAdaptiveLightingStartTimeOfTransition(): number;
    /**
     * It is not necessarily given, that we have the same time (or rather the correct time) as the HomeKit controller
     * who set up the transition schedule.
     * Thus we record the delta between our current time and the the time send with the setup request.
     * <code>timeOffset</code> is defined as <code>Date.now() - getAdaptiveLightingStartTimeOfTransition();</code>.
     * So in the case were we actually have a correct local time, it most likely will be positive (due to network latency).
     * But of course it can also be negative.
     */
    getAdaptiveLightingTimeOffset(): number;
    getAdaptiveLightingTransitionCurve(): AdaptiveLightingTransitionCurveEntry[];
    getAdaptiveLightingBrightnessMultiplierRange(): BrightnessAdjustmentMultiplierRange;
    /**
     * This method returns the interval (in milliseconds) in which the light should update its internal color temperature
     * (aka changes it physical color).
     * A lightbulb should ideally change this also when turned of in oder to have a smooth transition when turning the light on.
     *
     * Typically this evaluates to 60000 milliseconds (60 seconds).
     */
    getAdaptiveLightingUpdateInterval(): number;
    /**
     * Returns the minimum interval threshold (in milliseconds) a accessory may notify HomeKit controllers about a new
     * color temperature value via event notifications (what happens when you call {@link Characteristic.updateValue}).
     * Meaning the accessory should only send event notifications to subscribed HomeKit controllers at the specified interval.
     *
     * Typically this evaluates to 600000 milliseconds (10 minutes).
     */
    getAdaptiveLightingNotifyIntervalThreshold(): number;
    private handleActiveTransitionUpdated;
    private handleAdaptiveLightingEnabled;
    private handleAdaptiveLightingDisabled;
    private handleAdjustmentFactorChanged;
    /**
     * This method is called when a change happens to the Hue/Saturation or ColorTemperature characteristic.
     * When such a write happens (caused by the user changing the color/temperature) Adaptive Lighting must be disabled.
     *
     * @param change
     */
    private handleCharacteristicManualWritten;
    /**
     * Retrieve the {@link AdaptiveLightingTransitionPoint} for the current timestamp.
     * Returns undefined if the current transition schedule reached its end.
     */
    getCurrentAdaptiveLightingTransitionPoint(): AdaptiveLightingTransitionPoint | undefined;
    private scheduleNextUpdate;
    /**
     * @private
     */
    constructServices(): ControllerServiceMap;
    /**
     * @private
     */
    initWithServices(serviceMap: ControllerServiceMap): void | ControllerServiceMap;
    /**
     * @private
     */
    configureServices(): void;
    /**
     * @private
     */
    handleControllerRemoved(): void;
    /**
     * @private
     */
    handleFactoryReset(): void;
    /**
     * @private
     */
    serialize(): SerializedAdaptiveLightingControllerState | undefined;
    /**
     * @private
     */
    deserialize(serialized: SerializedAdaptiveLightingControllerState): void;
    /**
     * @private
     */
    setupStateChangeDelegate(delegate?: StateChangeDelegate): void;
    private handleSupportedTransitionConfigurationRead;
    private buildTransitionControlResponseBuffer;
    private handleTransitionControlWrite;
    private handleTransitionControlReadTransition;
    private handleTransitionControlUpdateTransition;
}
//# sourceMappingURL=AdaptiveLightingController.d.ts.map