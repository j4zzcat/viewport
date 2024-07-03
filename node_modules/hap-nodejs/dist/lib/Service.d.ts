/// <reference types="node" />
import { EventEmitter } from "events";
import { CharacteristicValue, Nullable, ServiceJsonObject, WithUUID } from "../types";
import { CharacteristicWarning } from "./Accessory";
import { Characteristic, CharacteristicChange, SerializedCharacteristic } from "./Characteristic";
import type { AccessCode, AccessControl, AccessoryInformation, AccessoryMetrics, AccessoryRuntimeInformation, AirPurifier, AirQualitySensor, AssetUpdate, Assistant, AudioStreamManagement, Battery, BridgeConfiguration, BridgingState, CameraControl, CameraOperatingMode, CameraRecordingManagement, CameraRTPStreamManagement, CarbonDioxideSensor, CarbonMonoxideSensor, CloudRelay, ContactSensor, DataStreamTransportManagement, Diagnostics, Door, Doorbell, Fan, Fanv2, Faucet, FilterMaintenance, FirmwareUpdate, GarageDoorOpener, HeaterCooler, HumidifierDehumidifier, HumiditySensor, InputSource, IrrigationSystem, LeakSensor, Lightbulb, LightSensor, LockManagement, LockMechanism, Microphone, MotionSensor, NFCAccess, OccupancySensor, Outlet, Pairing, PowerManagement, ProtocolInformation, SecuritySystem, ServiceLabel, Siri, SiriEndpoint, Slats, SmartSpeaker, SmokeSensor, Speaker, StatefulProgrammableSwitch, StatelessProgrammableSwitch, Switch, TapManagement, TargetControl, TargetControlManagement, Television, TelevisionSpeaker, TemperatureSensor, Thermostat, ThreadTransport, TimeInformation, TransferTransportManagement, Tunnel, Valve, WiFiRouter, WiFiSatellite, WiFiTransport, Window, WindowCovering } from "./definitions";
import { IdentifierCache } from "./model/IdentifierCache";
import { HAPConnection } from "./util/eventedhttp";
import { HapStatusError } from "./util/hapStatusError";
/**
 * @group Service
 */
export interface SerializedService {
    displayName: string;
    UUID: string;
    subtype?: string;
    constructorName?: string;
    hiddenService?: boolean;
    primaryService?: boolean;
    characteristics: SerializedCharacteristic[];
    optionalCharacteristics?: SerializedCharacteristic[];
}
/**
 * string with the format: `UUID + (subtype | "")`
 *
 * @group Service
 */
export type ServiceId = string;
/**
 * @group Service
 */
export type ServiceCharacteristicChange = CharacteristicChange & {
    characteristic: Characteristic;
};
/**
 * @deprecated Use ServiceEventTypes instead
 * @group Service
 */
export type EventService = ServiceEventTypes.CHARACTERISTIC_CHANGE | ServiceEventTypes.SERVICE_CONFIGURATION_CHANGE;
/**
 * @group Service
 */
export declare const enum ServiceEventTypes {
    CHARACTERISTIC_CHANGE = "characteristic-change",
    SERVICE_CONFIGURATION_CHANGE = "service-configurationChange",
    CHARACTERISTIC_WARNING = "characteristic-warning"
}
/**
 * @group Service
 */
export declare interface Service {
    on(event: "characteristic-change", listener: (change: ServiceCharacteristicChange) => void): this;
    on(event: "service-configurationChange", listener: () => void): this;
    on(event: "characteristic-warning", listener: (warning: CharacteristicWarning) => void): this;
    emit(event: "characteristic-change", change: ServiceCharacteristicChange): boolean;
    emit(event: "service-configurationChange"): boolean;
    emit(event: "characteristic-warning", warning: CharacteristicWarning): boolean;
}
/**
 * Service represents a set of grouped values necessary to provide a logical function. For instance, a
 * "Door Lock Mechanism" service might contain two values, one for the "desired lock state" and one for the
 * "current lock state". A particular Service is distinguished from others by its "type", which is a UUID.
 * HomeKit provides a set of known Service UUIDs defined in HomeKit.ts along with a corresponding
 * concrete subclass that you can instantiate directly to set up the necessary values. These natively-supported
 * Services are expected to contain a particular set of Characteristics.
 *
 * Unlike Characteristics, where you cannot have two Characteristics with the same UUID in the same Service,
 * you can actually have multiple Services with the same UUID in a single Accessory. For instance, imagine
 * a Garage Door Opener with both a "security light" and a "backlight" for the display. Each light could be
 * a "Lightbulb" Service with the same UUID. To account for this situation, we define an extra "subtype"
 * property on Service, that can be a string or other string-convertible object that uniquely identifies the
 * Service among its peers in an Accessory. For instance, you might have `service1.subtype = 'security_light'`
 * for one and `service2.subtype = 'backlight'` for the other.
 *
 * You can also define custom Services by providing your own UUID for the type that you generate yourself.
 * Custom Services can contain an arbitrary set of Characteristics, but Siri will likely not be able to
 * work with these.
 *
 * @group Service
 */
export declare class Service extends EventEmitter {
    /**
     * @group Service Definitions
     */
    static AccessCode: typeof AccessCode;
    /**
     * @group Service Definitions
     */
    static AccessControl: typeof AccessControl;
    /**
     * @group Service Definitions
     */
    static AccessoryInformation: typeof AccessoryInformation;
    /**
     * @group Service Definitions
     */
    static AccessoryMetrics: typeof AccessoryMetrics;
    /**
     * @group Service Definitions
     */
    static AccessoryRuntimeInformation: typeof AccessoryRuntimeInformation;
    /**
     * @group Service Definitions
     */
    static AirPurifier: typeof AirPurifier;
    /**
     * @group Service Definitions
     */
    static AirQualitySensor: typeof AirQualitySensor;
    /**
     * @group Service Definitions
     */
    static AssetUpdate: typeof AssetUpdate;
    /**
     * @group Service Definitions
     */
    static Assistant: typeof Assistant;
    /**
     * @group Service Definitions
     */
    static AudioStreamManagement: typeof AudioStreamManagement;
    /**
     * @group Service Definitions
     */
    static Battery: typeof Battery;
    /**
     * @group Service Definitions
     * @deprecated Please use {@link Service.Battery}.
     */
    static BatteryService: typeof Battery;
    /**
     * @group Service Definitions
     * @deprecated Removed and not used anymore
     */
    static BridgeConfiguration: typeof BridgeConfiguration;
    /**
     * @group Service Definitions
     * @deprecated Removed and not used anymore
     */
    static BridgingState: typeof BridgingState;
    /**
     * @group Service Definitions
     * @deprecated This service has no usage anymore and will be ignored by iOS
     */
    static CameraControl: typeof CameraControl;
    /**
     * @group Service Definitions
     * @deprecated Please use {@link Service.CameraRecordingManagement}.
     */
    static CameraEventRecordingManagement: typeof CameraRecordingManagement;
    /**
     * @group Service Definitions
     */
    static CameraOperatingMode: typeof CameraOperatingMode;
    /**
     * @group Service Definitions
     */
    static CameraRecordingManagement: typeof CameraRecordingManagement;
    /**
     * @group Service Definitions
     */
    static CameraRTPStreamManagement: typeof CameraRTPStreamManagement;
    /**
     * @group Service Definitions
     */
    static CarbonDioxideSensor: typeof CarbonDioxideSensor;
    /**
     * @group Service Definitions
     */
    static CarbonMonoxideSensor: typeof CarbonMonoxideSensor;
    /**
     * @group Service Definitions
     */
    static CloudRelay: typeof CloudRelay;
    /**
     * @group Service Definitions
     */
    static ContactSensor: typeof ContactSensor;
    /**
     * @group Service Definitions
     */
    static DataStreamTransportManagement: typeof DataStreamTransportManagement;
    /**
     * @group Service Definitions
     */
    static Diagnostics: typeof Diagnostics;
    /**
     * @group Service Definitions
     */
    static Door: typeof Door;
    /**
     * @group Service Definitions
     */
    static Doorbell: typeof Doorbell;
    /**
     * @group Service Definitions
     */
    static Fan: typeof Fan;
    /**
     * @group Service Definitions
     */
    static Fanv2: typeof Fanv2;
    /**
     * @group Service Definitions
     */
    static Faucet: typeof Faucet;
    /**
     * @group Service Definitions
     */
    static FilterMaintenance: typeof FilterMaintenance;
    /**
     * @group Service Definitions
     */
    static FirmwareUpdate: typeof FirmwareUpdate;
    /**
     * @group Service Definitions
     */
    static GarageDoorOpener: typeof GarageDoorOpener;
    /**
     * @group Service Definitions
     */
    static HeaterCooler: typeof HeaterCooler;
    /**
     * @group Service Definitions
     */
    static HumidifierDehumidifier: typeof HumidifierDehumidifier;
    /**
     * @group Service Definitions
     */
    static HumiditySensor: typeof HumiditySensor;
    /**
     * @group Service Definitions
     */
    static InputSource: typeof InputSource;
    /**
     * @group Service Definitions
     */
    static IrrigationSystem: typeof IrrigationSystem;
    /**
     * @group Service Definitions
     */
    static LeakSensor: typeof LeakSensor;
    /**
     * @group Service Definitions
     */
    static Lightbulb: typeof Lightbulb;
    /**
     * @group Service Definitions
     */
    static LightSensor: typeof LightSensor;
    /**
     * @group Service Definitions
     */
    static LockManagement: typeof LockManagement;
    /**
     * @group Service Definitions
     */
    static LockMechanism: typeof LockMechanism;
    /**
     * @group Service Definitions
     */
    static Microphone: typeof Microphone;
    /**
     * @group Service Definitions
     */
    static MotionSensor: typeof MotionSensor;
    /**
     * @group Service Definitions
     */
    static NFCAccess: typeof NFCAccess;
    /**
     * @group Service Definitions
     */
    static OccupancySensor: typeof OccupancySensor;
    /**
     * @group Service Definitions
     */
    static Outlet: typeof Outlet;
    /**
     * @group Service Definitions
     */
    static Pairing: typeof Pairing;
    /**
     * @group Service Definitions
     */
    static PowerManagement: typeof PowerManagement;
    /**
     * @group Service Definitions
     */
    static ProtocolInformation: typeof ProtocolInformation;
    /**
     * @group Service Definitions
     * @deprecated Please use {@link Service.CloudRelay}.
     */
    static Relay: typeof CloudRelay;
    /**
     * @group Service Definitions
     */
    static SecuritySystem: typeof SecuritySystem;
    /**
     * @group Service Definitions
     */
    static ServiceLabel: typeof ServiceLabel;
    /**
     * @group Service Definitions
     */
    static Siri: typeof Siri;
    /**
     * @group Service Definitions
     */
    static SiriEndpoint: typeof SiriEndpoint;
    /**
     * @group Service Definitions
     * @deprecated Please use {@link Service.Slats}.
     */
    static Slat: typeof Slats;
    /**
     * @group Service Definitions
     */
    static Slats: typeof Slats;
    /**
     * @group Service Definitions
     */
    static SmartSpeaker: typeof SmartSpeaker;
    /**
     * @group Service Definitions
     */
    static SmokeSensor: typeof SmokeSensor;
    /**
     * @group Service Definitions
     */
    static Speaker: typeof Speaker;
    /**
     * @group Service Definitions
     */
    static StatefulProgrammableSwitch: typeof StatefulProgrammableSwitch;
    /**
     * @group Service Definitions
     */
    static StatelessProgrammableSwitch: typeof StatelessProgrammableSwitch;
    /**
     * @group Service Definitions
     */
    static Switch: typeof Switch;
    /**
     * @group Service Definitions
     */
    static TapManagement: typeof TapManagement;
    /**
     * @group Service Definitions
     */
    static TargetControl: typeof TargetControl;
    /**
     * @group Service Definitions
     */
    static TargetControlManagement: typeof TargetControlManagement;
    /**
     * @group Service Definitions
     */
    static Television: typeof Television;
    /**
     * @group Service Definitions
     */
    static TelevisionSpeaker: typeof TelevisionSpeaker;
    /**
     * @group Service Definitions
     */
    static TemperatureSensor: typeof TemperatureSensor;
    /**
     * @group Service Definitions
     */
    static Thermostat: typeof Thermostat;
    /**
     * @group Service Definitions
     */
    static ThreadTransport: typeof ThreadTransport;
    /**
     * @group Service Definitions
     * @deprecated Removed and not used anymore
     */
    static TimeInformation: typeof TimeInformation;
    /**
     * @group Service Definitions
     */
    static TransferTransportManagement: typeof TransferTransportManagement;
    /**
     * @group Service Definitions
     */
    static Tunnel: typeof Tunnel;
    /**
     * @group Service Definitions
     * @deprecated Please use {@link Service.Tunnel}.
     */
    static TunneledBTLEAccessoryService: typeof Tunnel;
    /**
     * @group Service Definitions
     */
    static Valve: typeof Valve;
    /**
     * @group Service Definitions
     */
    static WiFiRouter: typeof WiFiRouter;
    /**
     * @group Service Definitions
     */
    static WiFiSatellite: typeof WiFiSatellite;
    /**
     * @group Service Definitions
     */
    static WiFiTransport: typeof WiFiTransport;
    /**
     * @group Service Definitions
     */
    static Window: typeof Window;
    /**
     * @group Service Definitions
     */
    static WindowCovering: typeof WindowCovering;
    displayName: string;
    UUID: string;
    subtype?: string;
    iid: Nullable<number>;
    name: Nullable<string>;
    characteristics: Characteristic[];
    optionalCharacteristics: Characteristic[];
    /**
     * @private
     */
    isHiddenService: boolean;
    /**
     * @private
     */
    isPrimaryService: boolean;
    /**
     * @private
     */
    linkedServices: Service[];
    constructor(displayName: string | undefined, UUID: string, subtype?: string);
    /**
     * Returns an id which uniquely identifies a service on the associated accessory.
     * The serviceId is a concatenation of the UUID for the service (defined by HAP) and the subtype (could be empty)
     * which is programmatically defined by the programmer.
     *
     * @returns the serviceId
     */
    getServiceId(): ServiceId;
    addCharacteristic(input: Characteristic): Characteristic;
    addCharacteristic(input: {
        new (...args: any[]): Characteristic;
    }, ...constructorArgs: any[]): Characteristic;
    /**
     * Sets this service as the new primary service.
     * Any currently active primary service will be reset to be not primary.
     * This will happen immediately, if the service was already added to an accessory, or later
     * when the service gets added to an accessory.
     *
     * @param isPrimary - optional boolean (default true) if the service should be the primary service
     */
    setPrimaryService(isPrimary?: boolean): void;
    /**
     * Marks the service as hidden
     *
     * @param isHidden - optional boolean (default true) if the service should be marked hidden
     */
    setHiddenService(isHidden?: boolean): void;
    /**
     * Adds a new link to the specified service. The service MUST be already added to
     * the SAME accessory.
     *
     * @param service - The service this service should link to
     */
    addLinkedService(service: Service): void;
    /**
     * Removes a link to the specified service which was previously added with {@link addLinkedService}
     *
     * @param service - Previously linked service
     */
    removeLinkedService(service: Service): void;
    removeCharacteristic(characteristic: Characteristic): void;
    getCharacteristic(constructor: WithUUID<{
        new (): Characteristic;
    }>): Characteristic;
    getCharacteristic(name: string | WithUUID<{
        new (): Characteristic;
    }>): Characteristic | undefined;
    testCharacteristic<T extends WithUUID<typeof Characteristic>>(name: string | T): boolean;
    /**
     * This updates the value by calling the {@link CharacteristicEventTypes.SET} event handler associated with the characteristic.
     * This acts the same way as when a HomeKit controller sends a `/characteristics` request to update the characteristic.
     * An event notification will be sent to all connected HomeKit controllers which are registered
     * to receive event notifications for this characteristic.
     *
     * This method behaves like a {@link Characteristic.updateValue} call with the addition that the own {@link CharacteristicEventTypes.SET}
     * event handler is called.
     *
     * @param name - The name or the constructor of the desired {@link Characteristic}.
     * @param value - The updated value.
     *
     * Note: If you don't want the {@link CharacteristicEventTypes.SET} to be called, refer to {@link updateCharacteristic}.
     */
    setCharacteristic<T extends WithUUID<{
        new (): Characteristic;
    }>>(name: string | T, value: CharacteristicValue): Service;
    /**
     * Sets the state of the characteristic to an errored state.
     *
     * If a {@link Characteristic.onGet} or {@link CharacteristicEventTypes.GET} handler is set up,
     * the errored state will be ignored and the characteristic will always query the latest state by calling the provided handler.
     *
     * If a generic error object is supplied, the characteristic tries to extract a {@link HAPStatus} code
     * from the error message string. If not possible a generic {@link HAPStatus.SERVICE_COMMUNICATION_FAILURE} will be used.
     * If the supplied error object is an instance of {@link HapStatusError} the corresponding status will be used.
     *
     * This doesn't call any registered {@link Characteristic.onSet} or {@link CharacteristicEventTypes.SET} handlers.
     *
     * Have a look at the
     * {@link https://github.com/homebridge/HAP-NodeJS/wiki/Presenting-Erroneous-Accessory-State-to-the-User Presenting Erroneous Accessory State to the User}
     * guide for more information on how to present erroneous state to the user.
     *
     * @param name - The name or the constructor of the desired {@link Characteristic}.
     * @param error - The error object
     *
     * Note: Erroneous state is never **pushed** to the client side. Only, if the HomeKit client requests the current
     *  state of the Characteristic, the corresponding {@link HapStatusError} is returned. As described above,
     *  any {@link Characteristic.onGet} or {@link CharacteristicEventTypes.GET} handlers have preference.
     */
    setCharacteristic<T extends WithUUID<{
        new (): Characteristic;
    }>>(name: string | T, error: HapStatusError | Error): Service;
    /**
     * This updates the value of the characteristic. If the value changed, an event notification will be sent to all connected
     * HomeKit controllers which are registered to receive event notifications for this characteristic.
     *
     * @param name - The name or the constructor of the desired {@link Characteristic}.
     * @param value - The new value.
     */
    updateCharacteristic<T extends WithUUID<{
        new (): Characteristic;
    }>>(name: string | T, value: Nullable<CharacteristicValue>): Service;
    /**
     * Sets the state of the characteristic to an errored state.
     * If a {@link Characteristic.onGet} or {@link CharacteristicEventTypes.GET} handler is set up,
     * the errored state will be ignored and the characteristic will always query the latest state by calling the provided handler.
     *
     * If a generic error object is supplied, the characteristic tries to extract a {@link HAPStatus} code
     * from the error message string. If not possible a generic {@link HAPStatus.SERVICE_COMMUNICATION_FAILURE} will be used.
     * If the supplied error object is an instance of {@link HapStatusError} the corresponding status will be used.
     *
     * @param name - The name or the constructor of the desired {@link Characteristic}.
     * @param error - The error object
     *
     * Have a look at the
     * {@link https://github.com/homebridge/HAP-NodeJS/wiki/Presenting-Erroneous-Accessory-State-to-the-User Presenting Erroneous Accessory State to the User}
     * guide for more information on how to present erroneous state to the user.
     *
     * Note: Erroneous state is never **pushed** to the client side. Only, if the HomeKit client requests the current
     *  state of the Characteristic, the corresponding {@link HapStatusError} is returned. As described above,
     *  any {@link Characteristic.onGet} or {@link CharacteristicEventTypes.GET} handlers have precedence.
     */
    updateCharacteristic<T extends WithUUID<{
        new (): Characteristic;
    }>>(name: string | T, error: HapStatusError | Error): Service;
    addOptionalCharacteristic(characteristic: Characteristic | {
        new (): Characteristic;
    }): void;
    /**
     * This method was created to copy all characteristics from another service to this.
     * It's only adopting is currently in homebridge to merge the AccessoryInformation service. So some things
     * may be explicitly tailored towards this use case.
     *
     * It will not remove characteristics which are present currently but not added on the other characteristic.
     * It will not replace the characteristic if the value is falsy (except of '0' or 'false')
     * @param service
     * @private used by homebridge
     */
    replaceCharacteristicsFromService(service: Service): void;
    /**
     * @private
     */
    getCharacteristicByIID(iid: number): Characteristic | undefined;
    /**
     * @private
     */
    _assignIDs(identifierCache: IdentifierCache, accessoryName: string, baseIID?: number): void;
    /**
     * Returns a JSON representation of this service suitable for delivering to HAP clients.
     * @private used to generate response to /accessories query
     */
    toHAP(connection: HAPConnection, contactGetHandlers?: boolean): Promise<ServiceJsonObject>;
    /**
     * Returns a JSON representation of this service without characteristic values.
     * @private used to generate the config hash
     */
    internalHAPRepresentation(): ServiceJsonObject;
    /**
     * @private
     */
    private setupCharacteristicEventHandlers;
    /**
     * @private
     */
    private emitCharacteristicWarningEvent;
    /**
     * @private
     */
    private _sideloadCharacteristics;
    /**
     * @private
     */
    static serialize(service: Service): SerializedService;
    /**
     * @private
     */
    static deserialize(json: SerializedService): Service;
}
import "./definitions/ServiceDefinitions";
//# sourceMappingURL=Service.d.ts.map