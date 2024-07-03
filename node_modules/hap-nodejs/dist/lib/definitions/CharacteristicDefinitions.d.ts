import { Characteristic } from "../Characteristic";
/**
 * Characteristic "Access Code Control Point"
 * @since iOS 15
 */
export declare class AccessCodeControlPoint extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Access Code Supported Configuration"
 * @since iOS 15
 */
export declare class AccessCodeSupportedConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Access Control Level"
 */
export declare class AccessControlLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Accessory Flags"
 */
export declare class AccessoryFlags extends Characteristic {
    static readonly UUID: string;
    static readonly REQUIRES_ADDITIONAL_SETUP_BIT_MASK = 1;
    constructor();
}
/**
 * Characteristic "Accessory Identifier"
 */
export declare class AccessoryIdentifier extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Active"
 */
export declare class Active extends Characteristic {
    static readonly UUID: string;
    static readonly INACTIVE = 0;
    static readonly ACTIVE = 1;
    constructor();
}
/**
 * Characteristic "Active Identifier"
 */
export declare class ActiveIdentifier extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Activity Interval"
 * @since iOS 14
 */
export declare class ActivityInterval extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Administrator Only Access"
 */
export declare class AdministratorOnlyAccess extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Air Particulate Density"
 */
export declare class AirParticulateDensity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Air Particulate Size"
 */
export declare class AirParticulateSize extends Characteristic {
    static readonly UUID: string;
    static readonly _2_5_M = 0;
    static readonly _10_M = 1;
    constructor();
}
/**
 * Characteristic "AirPlay Enable"
 */
export declare class AirPlayEnable extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Air Quality"
 */
export declare class AirQuality extends Characteristic {
    static readonly UUID: string;
    static readonly UNKNOWN = 0;
    static readonly EXCELLENT = 1;
    static readonly GOOD = 2;
    static readonly FAIR = 3;
    static readonly INFERIOR = 4;
    static readonly POOR = 5;
    constructor();
}
/**
 * Characteristic "App Matching Identifier"
 */
export declare class AppMatchingIdentifier extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Asset Update Readiness"
 */
export declare class AssetUpdateReadiness extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Audio Feedback"
 */
export declare class AudioFeedback extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Battery Level"
 */
export declare class BatteryLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Brightness"
 */
export declare class Brightness extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Button Event"
 */
export declare class ButtonEvent extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Camera Operating Mode Indicator"
 */
export declare class CameraOperatingModeIndicator extends Characteristic {
    static readonly UUID: string;
    static readonly DISABLE = 0;
    static readonly ENABLE = 1;
    constructor();
}
/**
 * Characteristic "Carbon Dioxide Detected"
 */
export declare class CarbonDioxideDetected extends Characteristic {
    static readonly UUID: string;
    static readonly CO2_LEVELS_NORMAL = 0;
    static readonly CO2_LEVELS_ABNORMAL = 1;
    constructor();
}
/**
 * Characteristic "Carbon Dioxide Level"
 */
export declare class CarbonDioxideLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Carbon Dioxide Peak Level"
 */
export declare class CarbonDioxidePeakLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Carbon Monoxide Detected"
 */
export declare class CarbonMonoxideDetected extends Characteristic {
    static readonly UUID: string;
    static readonly CO_LEVELS_NORMAL = 0;
    static readonly CO_LEVELS_ABNORMAL = 1;
    constructor();
}
/**
 * Characteristic "Carbon Monoxide Level"
 */
export declare class CarbonMonoxideLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Carbon Monoxide Peak Level"
 */
export declare class CarbonMonoxidePeakLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Category"
 * @deprecated Removed and not used anymore
 */
export declare class Category extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "CCA Energy Detect Threshold"
 * @since iOS 14
 */
export declare class CCAEnergyDetectThreshold extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "CCA Signal Detect Threshold"
 * @since iOS 14
 */
export declare class CCASignalDetectThreshold extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Characteristic Value Active Transition Count"
 * @since iOS 14
 */
export declare class CharacteristicValueActiveTransitionCount extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Characteristic Value Transition Control"
 * @since iOS 14
 */
export declare class CharacteristicValueTransitionControl extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Charging State"
 */
export declare class ChargingState extends Characteristic {
    static readonly UUID: string;
    static readonly NOT_CHARGING = 0;
    static readonly CHARGING = 1;
    static readonly NOT_CHARGEABLE = 2;
    constructor();
}
/**
 * Characteristic "Closed Captions"
 */
export declare class ClosedCaptions extends Characteristic {
    static readonly UUID: string;
    static readonly DISABLED = 0;
    static readonly ENABLED = 1;
    constructor();
}
/**
 * Characteristic "Color Temperature"
 */
export declare class ColorTemperature extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Configuration State"
 * @since iOS 15
 */
export declare class ConfigurationState extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Configure Bridged Accessory"
 * @deprecated Removed and not used anymore
 */
export declare class ConfigureBridgedAccessory extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Configure Bridged Accessory Status"
 * @deprecated Removed and not used anymore
 */
export declare class ConfigureBridgedAccessoryStatus extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Configured Name"
 */
export declare class ConfiguredName extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Contact Sensor State"
 */
export declare class ContactSensorState extends Characteristic {
    static readonly UUID: string;
    static readonly CONTACT_DETECTED = 0;
    static readonly CONTACT_NOT_DETECTED = 1;
    constructor();
}
/**
 * Characteristic "Cooling Threshold Temperature"
 */
export declare class CoolingThresholdTemperature extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Crypto Hash"
 */
export declare class CryptoHash extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Air Purifier State"
 */
export declare class CurrentAirPurifierState extends Characteristic {
    static readonly UUID: string;
    static readonly INACTIVE = 0;
    static readonly IDLE = 1;
    static readonly PURIFYING_AIR = 2;
    constructor();
}
/**
 * Characteristic "Current Ambient Light Level"
 */
export declare class CurrentAmbientLightLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Door State"
 */
export declare class CurrentDoorState extends Characteristic {
    static readonly UUID: string;
    static readonly OPEN = 0;
    static readonly CLOSED = 1;
    static readonly OPENING = 2;
    static readonly CLOSING = 3;
    static readonly STOPPED = 4;
    constructor();
}
/**
 * Characteristic "Current Fan State"
 */
export declare class CurrentFanState extends Characteristic {
    static readonly UUID: string;
    static readonly INACTIVE = 0;
    static readonly IDLE = 1;
    static readonly BLOWING_AIR = 2;
    constructor();
}
/**
 * Characteristic "Current Heater-Cooler State"
 */
export declare class CurrentHeaterCoolerState extends Characteristic {
    static readonly UUID: string;
    static readonly INACTIVE = 0;
    static readonly IDLE = 1;
    static readonly HEATING = 2;
    static readonly COOLING = 3;
    constructor();
}
/**
 * Characteristic "Current Heating Cooling State"
 */
export declare class CurrentHeatingCoolingState extends Characteristic {
    static readonly UUID: string;
    static readonly OFF = 0;
    static readonly HEAT = 1;
    static readonly COOL = 2;
    constructor();
}
/**
 * Characteristic "Current Horizontal Tilt Angle"
 */
export declare class CurrentHorizontalTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Humidifier-Dehumidifier State"
 */
export declare class CurrentHumidifierDehumidifierState extends Characteristic {
    static readonly UUID: string;
    static readonly INACTIVE = 0;
    static readonly IDLE = 1;
    static readonly HUMIDIFYING = 2;
    static readonly DEHUMIDIFYING = 3;
    constructor();
}
/**
 * Characteristic "Current Media State"
 */
export declare class CurrentMediaState extends Characteristic {
    static readonly UUID: string;
    static readonly PLAY = 0;
    static readonly PAUSE = 1;
    static readonly STOP = 2;
    static readonly LOADING = 4;
    static readonly INTERRUPTED = 5;
    constructor();
}
/**
 * Characteristic "Current Position"
 */
export declare class CurrentPosition extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Relative Humidity"
 */
export declare class CurrentRelativeHumidity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Slat State"
 */
export declare class CurrentSlatState extends Characteristic {
    static readonly UUID: string;
    static readonly FIXED = 0;
    static readonly JAMMED = 1;
    static readonly SWINGING = 2;
    constructor();
}
/**
 * Characteristic "Current Temperature"
 */
export declare class CurrentTemperature extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Tilt Angle"
 */
export declare class CurrentTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Time"
 * @deprecated Removed and not used anymore
 */
export declare class CurrentTime extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Transport"
 * @since iOS 14
 */
export declare class CurrentTransport extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Vertical Tilt Angle"
 */
export declare class CurrentVerticalTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Visibility State"
 */
export declare class CurrentVisibilityState extends Characteristic {
    static readonly UUID: string;
    static readonly SHOWN = 0;
    static readonly HIDDEN = 1;
    constructor();
}
/**
 * Characteristic "Data Stream HAP Transport"
 * @since iOS 14
 */
export declare class DataStreamHAPTransport extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Data Stream HAP Transport Interrupt"
 * @since iOS 14
 */
export declare class DataStreamHAPTransportInterrupt extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Day of the Week"
 * @deprecated Removed and not used anymore
 */
export declare class DayoftheWeek extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Diagonal Field Of View"
 * @since iOS 13.2
 */
export declare class DiagonalFieldOfView extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Digital Zoom"
 */
export declare class DigitalZoom extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Discover Bridged Accessories"
 * @deprecated Removed and not used anymore
 */
export declare class DiscoverBridgedAccessories extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Discovered Bridged Accessories"
 * @deprecated Removed and not used anymore
 */
export declare class DiscoveredBridgedAccessories extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Display Order"
 */
export declare class DisplayOrder extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Event Retransmission Maximum"
 * @since iOS 14
 */
export declare class EventRetransmissionMaximum extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Event Snapshots Active"
 */
export declare class EventSnapshotsActive extends Characteristic {
    static readonly UUID: string;
    static readonly DISABLE = 0;
    static readonly ENABLE = 1;
    constructor();
}
/**
 * Characteristic "Event Transmission Counters"
 * @since iOS 14
 */
export declare class EventTransmissionCounters extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Filter Change Indication"
 */
export declare class FilterChangeIndication extends Characteristic {
    static readonly UUID: string;
    static readonly FILTER_OK = 0;
    static readonly CHANGE_FILTER = 1;
    constructor();
}
/**
 * Characteristic "Filter Life Level"
 */
export declare class FilterLifeLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Firmware Revision"
 */
export declare class FirmwareRevision extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Firmware Update Readiness"
 */
export declare class FirmwareUpdateReadiness extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Firmware Update Status"
 */
export declare class FirmwareUpdateStatus extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Hardware Finish"
 * @since iOS 15
 */
export declare class HardwareFinish extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Hardware Revision"
 */
export declare class HardwareRevision extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Heart Beat"
 * @since iOS 14
 */
export declare class HeartBeat extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Heating Threshold Temperature"
 */
export declare class HeatingThresholdTemperature extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Hold Position"
 */
export declare class HoldPosition extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "HomeKit Camera Active"
 */
export declare class HomeKitCameraActive extends Characteristic {
    static readonly UUID: string;
    static readonly OFF = 0;
    static readonly ON = 1;
    constructor();
}
/**
 * Characteristic "Hue"
 */
export declare class Hue extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Identifier"
 */
export declare class Identifier extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Identify"
 */
export declare class Identify extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Image Mirroring"
 */
export declare class ImageMirroring extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Image Rotation"
 */
export declare class ImageRotation extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Input Device Type"
 */
export declare class InputDeviceType extends Characteristic {
    static readonly UUID: string;
    static readonly OTHER = 0;
    static readonly TV = 1;
    static readonly RECORDING = 2;
    static readonly TUNER = 3;
    static readonly PLAYBACK = 4;
    static readonly AUDIO_SYSTEM = 5;
    constructor();
}
/**
 * Characteristic "Input Source Type"
 */
export declare class InputSourceType extends Characteristic {
    static readonly UUID: string;
    static readonly OTHER = 0;
    static readonly HOME_SCREEN = 1;
    static readonly TUNER = 2;
    static readonly HDMI = 3;
    static readonly COMPOSITE_VIDEO = 4;
    static readonly S_VIDEO = 5;
    static readonly COMPONENT_VIDEO = 6;
    static readonly DVI = 7;
    static readonly AIRPLAY = 8;
    static readonly USB = 9;
    static readonly APPLICATION = 10;
    constructor();
}
/**
 * Characteristic "In Use"
 */
export declare class InUse extends Characteristic {
    static readonly UUID: string;
    static readonly NOT_IN_USE = 0;
    static readonly IN_USE = 1;
    constructor();
}
/**
 * Characteristic "Is Configured"
 */
export declare class IsConfigured extends Characteristic {
    static readonly UUID: string;
    static readonly NOT_CONFIGURED = 0;
    static readonly CONFIGURED = 1;
    constructor();
}
/**
 * Characteristic "Leak Detected"
 */
export declare class LeakDetected extends Characteristic {
    static readonly UUID: string;
    static readonly LEAK_NOT_DETECTED = 0;
    static readonly LEAK_DETECTED = 1;
    constructor();
}
/**
 * Characteristic "Link Quality"
 * @deprecated Removed and not used anymore
 */
export declare class LinkQuality extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "List Pairings"
 */
export declare class ListPairings extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Lock Control Point"
 */
export declare class LockControlPoint extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Lock Current State"
 */
export declare class LockCurrentState extends Characteristic {
    static readonly UUID: string;
    static readonly UNSECURED = 0;
    static readonly SECURED = 1;
    static readonly JAMMED = 2;
    static readonly UNKNOWN = 3;
    constructor();
}
/**
 * Characteristic "Lock Last Known Action"
 */
export declare class LockLastKnownAction extends Characteristic {
    static readonly UUID: string;
    static readonly SECURED_PHYSICALLY_INTERIOR = 0;
    static readonly UNSECURED_PHYSICALLY_INTERIOR = 1;
    static readonly SECURED_PHYSICALLY_EXTERIOR = 2;
    static readonly UNSECURED_PHYSICALLY_EXTERIOR = 3;
    static readonly SECURED_BY_KEYPAD = 4;
    static readonly UNSECURED_BY_KEYPAD = 5;
    static readonly SECURED_REMOTELY = 6;
    static readonly UNSECURED_REMOTELY = 7;
    static readonly SECURED_BY_AUTO_SECURE_TIMEOUT = 8;
    static readonly SECURED_PHYSICALLY = 9;
    static readonly UNSECURED_PHYSICALLY = 10;
    constructor();
}
/**
 * Characteristic "Lock Management Auto Security Timeout"
 */
export declare class LockManagementAutoSecurityTimeout extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Lock Physical Controls"
 */
export declare class LockPhysicalControls extends Characteristic {
    static readonly UUID: string;
    static readonly CONTROL_LOCK_DISABLED = 0;
    static readonly CONTROL_LOCK_ENABLED = 1;
    constructor();
}
/**
 * Characteristic "Lock Target State"
 */
export declare class LockTargetState extends Characteristic {
    static readonly UUID: string;
    static readonly UNSECURED = 0;
    static readonly SECURED = 1;
    constructor();
}
/**
 * Characteristic "Logs"
 */
export declare class Logs extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "MAC Retransmission Maximum"
 * @since iOS 14
 */
export declare class MACRetransmissionMaximum extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "MAC Transmission Counters"
 */
export declare class MACTransmissionCounters extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Managed Network Enable"
 */
export declare class ManagedNetworkEnable extends Characteristic {
    static readonly UUID: string;
    static readonly DISABLED = 0;
    static readonly ENABLED = 1;
    constructor();
}
/**
 * Characteristic "Manually Disabled"
 */
export declare class ManuallyDisabled extends Characteristic {
    static readonly UUID: string;
    static readonly ENABLED = 0;
    static readonly DISABLED = 1;
    constructor();
}
/**
 * Characteristic "Manufacturer"
 */
export declare class Manufacturer extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Maximum Transmit Power"
 * @since iOS 14
 */
export declare class MaximumTransmitPower extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Metrics Buffer Full State"
 */
export declare class MetricsBufferFullState extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Model"
 */
export declare class Model extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Motion Detected"
 */
export declare class MotionDetected extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Multifunction Button"
 */
export declare class MultifunctionButton extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Mute"
 */
export declare class Mute extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Name"
 */
export declare class Name extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Network Access Violation Control"
 */
export declare class NetworkAccessViolationControl extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Network Client Profile Control"
 */
export declare class NetworkClientProfileControl extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Network Client Status Control"
 */
export declare class NetworkClientStatusControl extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "NFC Access Control Point"
 * @since iOS 15
 */
export declare class NFCAccessControlPoint extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "NFC Access Supported Configuration"
 * @since iOS 15
 */
export declare class NFCAccessSupportedConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Night Vision"
 */
export declare class NightVision extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Nitrogen Dioxide Density"
 */
export declare class NitrogenDioxideDensity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Obstruction Detected"
 */
export declare class ObstructionDetected extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Occupancy Detected"
 */
export declare class OccupancyDetected extends Characteristic {
    static readonly UUID: string;
    static readonly OCCUPANCY_NOT_DETECTED = 0;
    static readonly OCCUPANCY_DETECTED = 1;
    constructor();
}
/**
 * Characteristic "On"
 */
export declare class On extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Operating State Response"
 * @since iOS 14
 */
export declare class OperatingStateResponse extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Optical Zoom"
 */
export declare class OpticalZoom extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Outlet In Use"
 */
export declare class OutletInUse extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Ozone Density"
 */
export declare class OzoneDensity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Pairing Features"
 */
export declare class PairingFeatures extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Pair Setup"
 */
export declare class PairSetup extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Pair Verify"
 */
export declare class PairVerify extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Password Setting"
 */
export declare class PasswordSetting extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Periodic Snapshots Active"
 */
export declare class PeriodicSnapshotsActive extends Characteristic {
    static readonly UUID: string;
    static readonly DISABLE = 0;
    static readonly ENABLE = 1;
    constructor();
}
/**
 * Characteristic "Picture Mode"
 */
export declare class PictureMode extends Characteristic {
    static readonly UUID: string;
    static readonly OTHER = 0;
    static readonly STANDARD = 1;
    static readonly CALIBRATED = 2;
    static readonly CALIBRATED_DARK = 3;
    static readonly VIVID = 4;
    static readonly GAME = 5;
    static readonly COMPUTER = 6;
    static readonly CUSTOM = 7;
    constructor();
}
/**
 * Characteristic "Ping"
 * @since iOS 14
 */
export declare class Ping extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "PM10 Density"
 */
export declare class PM10Density extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "PM2.5 Density"
 */
export declare class PM2_5Density extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Position State"
 */
export declare class PositionState extends Characteristic {
    static readonly UUID: string;
    static readonly DECREASING = 0;
    static readonly INCREASING = 1;
    static readonly STOPPED = 2;
    constructor();
}
/**
 * Characteristic "Power Mode Selection"
 */
export declare class PowerModeSelection extends Characteristic {
    static readonly UUID: string;
    static readonly SHOW = 0;
    static readonly HIDE = 1;
    constructor();
}
/**
 * Characteristic "Product Data"
 */
export declare class ProductData extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Programmable Switch Event"
 */
export declare class ProgrammableSwitchEvent extends Characteristic {
    static readonly UUID: string;
    static readonly SINGLE_PRESS = 0;
    static readonly DOUBLE_PRESS = 1;
    static readonly LONG_PRESS = 2;
    constructor();
}
/**
 * Characteristic "Programmable Switch Output State"
 */
export declare class ProgrammableSwitchOutputState extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Program Mode"
 */
export declare class ProgramMode extends Characteristic {
    static readonly UUID: string;
    static readonly NO_PROGRAM_SCHEDULED = 0;
    static readonly PROGRAM_SCHEDULED = 1;
    static readonly PROGRAM_SCHEDULED_MANUAL_MODE_ = 2;
    constructor();
}
/**
 * Characteristic "Reachable"
 * @deprecated Removed and not used anymore
 */
export declare class Reachable extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Received Signal Strength Indication"
 * @since iOS 14
 */
export declare class ReceivedSignalStrengthIndication extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Receiver Sensitivity"
 * @since iOS 14
 */
export declare class ReceiverSensitivity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Recording Audio Active"
 */
export declare class RecordingAudioActive extends Characteristic {
    static readonly UUID: string;
    static readonly DISABLE = 0;
    static readonly ENABLE = 1;
    constructor();
}
/**
 * Characteristic "Relative Humidity Dehumidifier Threshold"
 */
export declare class RelativeHumidityDehumidifierThreshold extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Relative Humidity Humidifier Threshold"
 */
export declare class RelativeHumidityHumidifierThreshold extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Relay Control Point"
 */
export declare class RelayControlPoint extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Relay Enabled"
 */
export declare class RelayEnabled extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Relay State"
 */
export declare class RelayState extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Remaining Duration"
 */
export declare class RemainingDuration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Remote Key"
 */
export declare class RemoteKey extends Characteristic {
    static readonly UUID: string;
    static readonly REWIND = 0;
    static readonly FAST_FORWARD = 1;
    static readonly NEXT_TRACK = 2;
    static readonly PREVIOUS_TRACK = 3;
    static readonly ARROW_UP = 4;
    static readonly ARROW_DOWN = 5;
    static readonly ARROW_LEFT = 6;
    static readonly ARROW_RIGHT = 7;
    static readonly SELECT = 8;
    static readonly BACK = 9;
    static readonly EXIT = 10;
    static readonly PLAY_PAUSE = 11;
    static readonly INFORMATION = 15;
    constructor();
}
/**
 * Characteristic "Reset Filter Indication"
 */
export declare class ResetFilterIndication extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Rotation Direction"
 */
export declare class RotationDirection extends Characteristic {
    static readonly UUID: string;
    static readonly CLOCKWISE = 0;
    static readonly COUNTER_CLOCKWISE = 1;
    constructor();
}
/**
 * Characteristic "Rotation Speed"
 */
export declare class RotationSpeed extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Router Status"
 */
export declare class RouterStatus extends Characteristic {
    static readonly UUID: string;
    static readonly READY = 0;
    static readonly NOT_READY = 1;
    constructor();
}
/**
 * Characteristic "Saturation"
 */
export declare class Saturation extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Security System Alarm Type"
 */
export declare class SecuritySystemAlarmType extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Security System Current State"
 */
export declare class SecuritySystemCurrentState extends Characteristic {
    static readonly UUID: string;
    static readonly STAY_ARM = 0;
    static readonly AWAY_ARM = 1;
    static readonly NIGHT_ARM = 2;
    static readonly DISARMED = 3;
    static readonly ALARM_TRIGGERED = 4;
    constructor();
}
/**
 * Characteristic "Security System Target State"
 */
export declare class SecuritySystemTargetState extends Characteristic {
    static readonly UUID: string;
    static readonly STAY_ARM = 0;
    static readonly AWAY_ARM = 1;
    static readonly NIGHT_ARM = 2;
    static readonly DISARM = 3;
    constructor();
}
/**
 * Characteristic "Selected Audio Stream Configuration"
 */
export declare class SelectedAudioStreamConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Selected Camera Recording Configuration"
 */
export declare class SelectedCameraRecordingConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Selected Diagnostics Modes"
 */
export declare class SelectedDiagnosticsModes extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Selected RTP Stream Configuration"
 */
export declare class SelectedRTPStreamConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Selected Sleep Configuration"
 */
export declare class SelectedSleepConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Serial Number"
 */
export declare class SerialNumber extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Service Label Index"
 */
export declare class ServiceLabelIndex extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Service Label Namespace"
 */
export declare class ServiceLabelNamespace extends Characteristic {
    static readonly UUID: string;
    static readonly DOTS = 0;
    static readonly ARABIC_NUMERALS = 1;
    constructor();
}
/**
 * Characteristic "Set Duration"
 */
export declare class SetDuration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Setup Data Stream Transport"
 */
export declare class SetupDataStreamTransport extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Setup Endpoints"
 */
export declare class SetupEndpoints extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Setup Transfer Transport"
 * @since iOS 13.4
 */
export declare class SetupTransferTransport extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Signal To Noise Ratio"
 * @since iOS 14
 */
export declare class SignalToNoiseRatio extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Siri Enable"
 */
export declare class SiriEnable extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Siri Endpoint Session Status"
 */
export declare class SiriEndpointSessionStatus extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Siri Engine Version"
 */
export declare class SiriEngineVersion extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Siri Input Type"
 */
export declare class SiriInputType extends Characteristic {
    static readonly UUID: string;
    static readonly PUSH_BUTTON_TRIGGERED_APPLE_TV = 0;
    constructor();
}
/**
 * Characteristic "Siri Light On Use"
 */
export declare class SiriLightOnUse extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Siri Listening"
 */
export declare class SiriListening extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Siri Touch To Use"
 */
export declare class SiriTouchToUse extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Slat Type"
 */
export declare class SlatType extends Characteristic {
    static readonly UUID: string;
    static readonly HORIZONTAL = 0;
    static readonly VERTICAL = 1;
    constructor();
}
/**
 * Characteristic "Sleep Discovery Mode"
 */
export declare class SleepDiscoveryMode extends Characteristic {
    static readonly UUID: string;
    static readonly NOT_DISCOVERABLE = 0;
    static readonly ALWAYS_DISCOVERABLE = 1;
    constructor();
}
/**
 * Characteristic "Sleep Interval"
 * @since iOS 14
 */
export declare class SleepInterval extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Smoke Detected"
 */
export declare class SmokeDetected extends Characteristic {
    static readonly UUID: string;
    static readonly SMOKE_NOT_DETECTED = 0;
    static readonly SMOKE_DETECTED = 1;
    constructor();
}
/**
 * Characteristic "Software Revision"
 */
export declare class SoftwareRevision extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Staged Firmware Version"
 */
export declare class StagedFirmwareVersion extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Status Active"
 */
export declare class StatusActive extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Status Fault"
 */
export declare class StatusFault extends Characteristic {
    static readonly UUID: string;
    static readonly NO_FAULT = 0;
    static readonly GENERAL_FAULT = 1;
    constructor();
}
/**
 * Characteristic "Status Jammed"
 */
export declare class StatusJammed extends Characteristic {
    static readonly UUID: string;
    static readonly NOT_JAMMED = 0;
    static readonly JAMMED = 1;
    constructor();
}
/**
 * Characteristic "Status Low Battery"
 */
export declare class StatusLowBattery extends Characteristic {
    static readonly UUID: string;
    static readonly BATTERY_LEVEL_NORMAL = 0;
    static readonly BATTERY_LEVEL_LOW = 1;
    constructor();
}
/**
 * Characteristic "Status Tampered"
 */
export declare class StatusTampered extends Characteristic {
    static readonly UUID: string;
    static readonly NOT_TAMPERED = 0;
    static readonly TAMPERED = 1;
    constructor();
}
/**
 * Characteristic "Streaming Status"
 */
export declare class StreamingStatus extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Sulphur Dioxide Density"
 */
export declare class SulphurDioxideDensity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Asset Types"
 */
export declare class SupportedAssetTypes extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Audio Recording Configuration"
 */
export declare class SupportedAudioRecordingConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Audio Stream Configuration"
 */
export declare class SupportedAudioStreamConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Camera Recording Configuration"
 */
export declare class SupportedCameraRecordingConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Characteristic Value Transition Configuration"
 * @since iOS 14
 */
export declare class SupportedCharacteristicValueTransitionConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Data Stream Transport Configuration"
 */
export declare class SupportedDataStreamTransportConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Diagnostics Modes"
 */
export declare class SupportedDiagnosticsModes extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Diagnostics Snapshot"
 * @since iOS 14
 */
export declare class SupportedDiagnosticsSnapshot extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Firmware Update Configuration"
 */
export declare class SupportedFirmwareUpdateConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Metrics"
 */
export declare class SupportedMetrics extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Router Configuration"
 */
export declare class SupportedRouterConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported RTP Configuration"
 */
export declare class SupportedRTPConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Sleep Configuration"
 */
export declare class SupportedSleepConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Transfer Transport Configuration"
 * @since iOS 13.4
 */
export declare class SupportedTransferTransportConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Video Recording Configuration"
 */
export declare class SupportedVideoRecordingConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Video Stream Configuration"
 */
export declare class SupportedVideoStreamConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Swing Mode"
 */
export declare class SwingMode extends Characteristic {
    static readonly UUID: string;
    static readonly SWING_DISABLED = 0;
    static readonly SWING_ENABLED = 1;
    constructor();
}
/**
 * Characteristic "Tap Type"
 */
export declare class TapType extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Air Purifier State"
 */
export declare class TargetAirPurifierState extends Characteristic {
    static readonly UUID: string;
    static readonly MANUAL = 0;
    static readonly AUTO = 1;
    constructor();
}
/**
 * Characteristic "Target Air Quality"
 * @deprecated Removed and not used anymore
 */
export declare class TargetAirQuality extends Characteristic {
    static readonly UUID: string;
    static readonly EXCELLENT = 0;
    static readonly GOOD = 1;
    static readonly FAIR = 2;
    constructor();
}
/**
 * Characteristic "Target Control List"
 */
export declare class TargetControlList extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Control Supported Configuration"
 */
export declare class TargetControlSupportedConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Door State"
 */
export declare class TargetDoorState extends Characteristic {
    static readonly UUID: string;
    static readonly OPEN = 0;
    static readonly CLOSED = 1;
    constructor();
}
/**
 * Characteristic "Target Fan State"
 */
export declare class TargetFanState extends Characteristic {
    static readonly UUID: string;
    static readonly MANUAL = 0;
    static readonly AUTO = 1;
    constructor();
}
/**
 * Characteristic "Target Heater-Cooler State"
 */
export declare class TargetHeaterCoolerState extends Characteristic {
    static readonly UUID: string;
    static readonly AUTO = 0;
    static readonly HEAT = 1;
    static readonly COOL = 2;
    constructor();
}
/**
 * Characteristic "Target Heating Cooling State"
 */
export declare class TargetHeatingCoolingState extends Characteristic {
    static readonly UUID: string;
    static readonly OFF = 0;
    static readonly HEAT = 1;
    static readonly COOL = 2;
    static readonly AUTO = 3;
    constructor();
}
/**
 * Characteristic "Target Horizontal Tilt Angle"
 */
export declare class TargetHorizontalTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Humidifier-Dehumidifier State"
 */
export declare class TargetHumidifierDehumidifierState extends Characteristic {
    static readonly UUID: string;
    /**
     * @deprecated Removed in iOS 11. Use {@link HUMIDIFIER_OR_DEHUMIDIFIER} instead.
     */
    static readonly AUTO = 0;
    static readonly HUMIDIFIER_OR_DEHUMIDIFIER = 0;
    static readonly HUMIDIFIER = 1;
    static readonly DEHUMIDIFIER = 2;
    constructor();
}
/**
 * Characteristic "Target Media State"
 */
export declare class TargetMediaState extends Characteristic {
    static readonly UUID: string;
    static readonly PLAY = 0;
    static readonly PAUSE = 1;
    static readonly STOP = 2;
    constructor();
}
/**
 * Characteristic "Target Position"
 */
export declare class TargetPosition extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Relative Humidity"
 */
export declare class TargetRelativeHumidity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Slat State"
 * @deprecated Removed and not used anymore
 */
export declare class TargetSlatState extends Characteristic {
    static readonly UUID: string;
    static readonly MANUAL = 0;
    static readonly AUTO = 1;
    constructor();
}
/**
 * Characteristic "Target Temperature"
 */
export declare class TargetTemperature extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Tilt Angle"
 */
export declare class TargetTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Vertical Tilt Angle"
 */
export declare class TargetVerticalTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Visibility State"
 */
export declare class TargetVisibilityState extends Characteristic {
    static readonly UUID: string;
    static readonly SHOWN = 0;
    static readonly HIDDEN = 1;
    constructor();
}
/**
 * Characteristic "Temperature Display Units"
 */
export declare class TemperatureDisplayUnits extends Characteristic {
    static readonly UUID: string;
    static readonly CELSIUS = 0;
    static readonly FAHRENHEIT = 1;
    constructor();
}
/**
 * Characteristic "Third Party Camera Active"
 */
export declare class ThirdPartyCameraActive extends Characteristic {
    static readonly UUID: string;
    static readonly OFF = 0;
    static readonly ON = 1;
    constructor();
}
/**
 * Characteristic "Thread Control Point"
 */
export declare class ThreadControlPoint extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Thread Node Capabilities"
 */
export declare class ThreadNodeCapabilities extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Thread OpenThread Version"
 */
export declare class ThreadOpenThreadVersion extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Thread Status"
 */
export declare class ThreadStatus extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Time Update"
 * @deprecated Removed and not used anymore
 */
export declare class TimeUpdate extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Token"
 */
export declare class Token extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Transmit Power"
 * @since iOS 14
 */
export declare class TransmitPower extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Tunnel Connection Timeout"
 */
export declare class TunnelConnectionTimeout extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Tunneled Accessory Advertising"
 */
export declare class TunneledAccessoryAdvertising extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Tunneled Accessory Connected"
 */
export declare class TunneledAccessoryConnected extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Tunneled Accessory State Number"
 */
export declare class TunneledAccessoryStateNumber extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Valve Type"
 */
export declare class ValveType extends Characteristic {
    static readonly UUID: string;
    static readonly GENERIC_VALVE = 0;
    static readonly IRRIGATION = 1;
    static readonly SHOWER_HEAD = 2;
    static readonly WATER_FAUCET = 3;
    constructor();
}
/**
 * Characteristic "Version"
 */
export declare class Version extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Video Analysis Active"
 * @since iOS 14
 */
export declare class VideoAnalysisActive extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "VOC Density"
 */
export declare class VOCDensity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Volume"
 */
export declare class Volume extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Volume Control Type"
 */
export declare class VolumeControlType extends Characteristic {
    static readonly UUID: string;
    static readonly NONE = 0;
    static readonly RELATIVE = 1;
    static readonly RELATIVE_WITH_CURRENT = 2;
    static readonly ABSOLUTE = 3;
    constructor();
}
/**
 * Characteristic "Volume Selector"
 */
export declare class VolumeSelector extends Characteristic {
    static readonly UUID: string;
    static readonly INCREMENT = 0;
    static readonly DECREMENT = 1;
    constructor();
}
/**
 * Characteristic "Wake Configuration"
 * @since iOS 13.4
 */
export declare class WakeConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "WAN Configuration List"
 */
export declare class WANConfigurationList extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "WAN Status List"
 */
export declare class WANStatusList extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Water Level"
 */
export declare class WaterLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Wi-Fi Capabilities"
 * @since iOS 14
 */
export declare class WiFiCapabilities extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Wi-Fi Configuration Control"
 * @since iOS 14
 */
export declare class WiFiConfigurationControl extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Wi-Fi Satellite Status"
 */
export declare class WiFiSatelliteStatus extends Characteristic {
    static readonly UUID: string;
    static readonly UNKNOWN = 0;
    static readonly CONNECTED = 1;
    static readonly NOT_CONNECTED = 2;
    constructor();
}
//# sourceMappingURL=CharacteristicDefinitions.d.ts.map