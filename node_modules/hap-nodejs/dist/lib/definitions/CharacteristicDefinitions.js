"use strict";
// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY
// V=880
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentMediaState = exports.CurrentHumidifierDehumidifierState = exports.CurrentHorizontalTiltAngle = exports.CurrentHeatingCoolingState = exports.CurrentHeaterCoolerState = exports.CurrentFanState = exports.CurrentDoorState = exports.CurrentAmbientLightLevel = exports.CurrentAirPurifierState = exports.CryptoHash = exports.CoolingThresholdTemperature = exports.ContactSensorState = exports.ConfiguredName = exports.ConfigureBridgedAccessoryStatus = exports.ConfigureBridgedAccessory = exports.ConfigurationState = exports.ColorTemperature = exports.ClosedCaptions = exports.ChargingState = exports.CharacteristicValueTransitionControl = exports.CharacteristicValueActiveTransitionCount = exports.CCASignalDetectThreshold = exports.CCAEnergyDetectThreshold = exports.Category = exports.CarbonMonoxidePeakLevel = exports.CarbonMonoxideLevel = exports.CarbonMonoxideDetected = exports.CarbonDioxidePeakLevel = exports.CarbonDioxideLevel = exports.CarbonDioxideDetected = exports.CameraOperatingModeIndicator = exports.ButtonEvent = exports.Brightness = exports.BatteryLevel = exports.AudioFeedback = exports.AssetUpdateReadiness = exports.AppMatchingIdentifier = exports.AirQuality = exports.AirPlayEnable = exports.AirParticulateSize = exports.AirParticulateDensity = exports.AdministratorOnlyAccess = exports.ActivityInterval = exports.ActiveIdentifier = exports.Active = exports.AccessoryIdentifier = exports.AccessoryFlags = exports.AccessControlLevel = exports.AccessCodeSupportedConfiguration = exports.AccessCodeControlPoint = void 0;
exports.Logs = exports.LockTargetState = exports.LockPhysicalControls = exports.LockManagementAutoSecurityTimeout = exports.LockLastKnownAction = exports.LockCurrentState = exports.LockControlPoint = exports.ListPairings = exports.LinkQuality = exports.LeakDetected = exports.IsConfigured = exports.InUse = exports.InputSourceType = exports.InputDeviceType = exports.ImageRotation = exports.ImageMirroring = exports.Identify = exports.Identifier = exports.Hue = exports.HomeKitCameraActive = exports.HoldPosition = exports.HeatingThresholdTemperature = exports.HeartBeat = exports.HardwareRevision = exports.HardwareFinish = exports.FirmwareUpdateStatus = exports.FirmwareUpdateReadiness = exports.FirmwareRevision = exports.FilterLifeLevel = exports.FilterChangeIndication = exports.EventTransmissionCounters = exports.EventSnapshotsActive = exports.EventRetransmissionMaximum = exports.DisplayOrder = exports.DiscoveredBridgedAccessories = exports.DiscoverBridgedAccessories = exports.DigitalZoom = exports.DiagonalFieldOfView = exports.DayoftheWeek = exports.DataStreamHAPTransportInterrupt = exports.DataStreamHAPTransport = exports.CurrentVisibilityState = exports.CurrentVerticalTiltAngle = exports.CurrentTransport = exports.CurrentTime = exports.CurrentTiltAngle = exports.CurrentTemperature = exports.CurrentSlatState = exports.CurrentRelativeHumidity = exports.CurrentPosition = void 0;
exports.RelayState = exports.RelayEnabled = exports.RelayControlPoint = exports.RelativeHumidityHumidifierThreshold = exports.RelativeHumidityDehumidifierThreshold = exports.RecordingAudioActive = exports.ReceiverSensitivity = exports.ReceivedSignalStrengthIndication = exports.Reachable = exports.ProgramMode = exports.ProgrammableSwitchOutputState = exports.ProgrammableSwitchEvent = exports.ProductData = exports.PowerModeSelection = exports.PositionState = exports.PM2_5Density = exports.PM10Density = exports.Ping = exports.PictureMode = exports.PeriodicSnapshotsActive = exports.PasswordSetting = exports.PairVerify = exports.PairSetup = exports.PairingFeatures = exports.OzoneDensity = exports.OutletInUse = exports.OpticalZoom = exports.OperatingStateResponse = exports.On = exports.OccupancyDetected = exports.ObstructionDetected = exports.NitrogenDioxideDensity = exports.NightVision = exports.NFCAccessSupportedConfiguration = exports.NFCAccessControlPoint = exports.NetworkClientStatusControl = exports.NetworkClientProfileControl = exports.NetworkAccessViolationControl = exports.Name = exports.Mute = exports.MultifunctionButton = exports.MotionDetected = exports.Model = exports.MetricsBufferFullState = exports.MaximumTransmitPower = exports.Manufacturer = exports.ManuallyDisabled = exports.ManagedNetworkEnable = exports.MACTransmissionCounters = exports.MACRetransmissionMaximum = void 0;
exports.SupportedDiagnosticsModes = exports.SupportedDataStreamTransportConfiguration = exports.SupportedCharacteristicValueTransitionConfiguration = exports.SupportedCameraRecordingConfiguration = exports.SupportedAudioStreamConfiguration = exports.SupportedAudioRecordingConfiguration = exports.SupportedAssetTypes = exports.SulphurDioxideDensity = exports.StreamingStatus = exports.StatusTampered = exports.StatusLowBattery = exports.StatusJammed = exports.StatusFault = exports.StatusActive = exports.StagedFirmwareVersion = exports.SoftwareRevision = exports.SmokeDetected = exports.SleepInterval = exports.SleepDiscoveryMode = exports.SlatType = exports.SiriTouchToUse = exports.SiriListening = exports.SiriLightOnUse = exports.SiriInputType = exports.SiriEngineVersion = exports.SiriEndpointSessionStatus = exports.SiriEnable = exports.SignalToNoiseRatio = exports.SetupTransferTransport = exports.SetupEndpoints = exports.SetupDataStreamTransport = exports.SetDuration = exports.ServiceLabelNamespace = exports.ServiceLabelIndex = exports.SerialNumber = exports.SelectedSleepConfiguration = exports.SelectedRTPStreamConfiguration = exports.SelectedDiagnosticsModes = exports.SelectedCameraRecordingConfiguration = exports.SelectedAudioStreamConfiguration = exports.SecuritySystemTargetState = exports.SecuritySystemCurrentState = exports.SecuritySystemAlarmType = exports.Saturation = exports.RouterStatus = exports.RotationSpeed = exports.RotationDirection = exports.ResetFilterIndication = exports.RemoteKey = exports.RemainingDuration = void 0;
exports.WakeConfiguration = exports.VolumeSelector = exports.VolumeControlType = exports.Volume = exports.VOCDensity = exports.VideoAnalysisActive = exports.Version = exports.ValveType = exports.TunneledAccessoryStateNumber = exports.TunneledAccessoryConnected = exports.TunneledAccessoryAdvertising = exports.TunnelConnectionTimeout = exports.TransmitPower = exports.Token = exports.TimeUpdate = exports.ThreadStatus = exports.ThreadOpenThreadVersion = exports.ThreadNodeCapabilities = exports.ThreadControlPoint = exports.ThirdPartyCameraActive = exports.TemperatureDisplayUnits = exports.TargetVisibilityState = exports.TargetVerticalTiltAngle = exports.TargetTiltAngle = exports.TargetTemperature = exports.TargetSlatState = exports.TargetRelativeHumidity = exports.TargetPosition = exports.TargetMediaState = exports.TargetHumidifierDehumidifierState = exports.TargetHorizontalTiltAngle = exports.TargetHeatingCoolingState = exports.TargetHeaterCoolerState = exports.TargetFanState = exports.TargetDoorState = exports.TargetControlSupportedConfiguration = exports.TargetControlList = exports.TargetAirQuality = exports.TargetAirPurifierState = exports.TapType = exports.SwingMode = exports.SupportedVideoStreamConfiguration = exports.SupportedVideoRecordingConfiguration = exports.SupportedTransferTransportConfiguration = exports.SupportedSleepConfiguration = exports.SupportedRTPConfiguration = exports.SupportedRouterConfiguration = exports.SupportedMetrics = exports.SupportedFirmwareUpdateConfiguration = exports.SupportedDiagnosticsSnapshot = void 0;
exports.WiFiSatelliteStatus = exports.WiFiConfigurationControl = exports.WiFiCapabilities = exports.WaterLevel = exports.WANStatusList = exports.WANConfigurationList = void 0;
var tslib_1 = require("tslib");
var Characteristic_1 = require("../Characteristic");
/**
 * Characteristic "Access Code Control Point"
 * @since iOS 15
 */
var AccessCodeControlPoint = /** @class */ (function (_super) {
    tslib_1.__extends(AccessCodeControlPoint, _super);
    function AccessCodeControlPoint() {
        var _this = _super.call(this, "Access Code Control Point", AccessCodeControlPoint.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AccessCodeControlPoint.UUID = "00000262-0000-1000-8000-0026BB765291";
    return AccessCodeControlPoint;
}(Characteristic_1.Characteristic));
exports.AccessCodeControlPoint = AccessCodeControlPoint;
Characteristic_1.Characteristic.AccessCodeControlPoint = AccessCodeControlPoint;
/**
 * Characteristic "Access Code Supported Configuration"
 * @since iOS 15
 */
var AccessCodeSupportedConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(AccessCodeSupportedConfiguration, _super);
    function AccessCodeSupportedConfiguration() {
        var _this = _super.call(this, "Access Code Supported Configuration", AccessCodeSupportedConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AccessCodeSupportedConfiguration.UUID = "00000261-0000-1000-8000-0026BB765291";
    return AccessCodeSupportedConfiguration;
}(Characteristic_1.Characteristic));
exports.AccessCodeSupportedConfiguration = AccessCodeSupportedConfiguration;
Characteristic_1.Characteristic.AccessCodeSupportedConfiguration = AccessCodeSupportedConfiguration;
/**
 * Characteristic "Access Control Level"
 */
var AccessControlLevel = /** @class */ (function (_super) {
    tslib_1.__extends(AccessControlLevel, _super);
    function AccessControlLevel() {
        var _this = _super.call(this, "Access Control Level", AccessControlLevel.UUID, {
            format: "uint16" /* Formats.UINT16 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AccessControlLevel.UUID = "000000E5-0000-1000-8000-0026BB765291";
    return AccessControlLevel;
}(Characteristic_1.Characteristic));
exports.AccessControlLevel = AccessControlLevel;
Characteristic_1.Characteristic.AccessControlLevel = AccessControlLevel;
/**
 * Characteristic "Accessory Flags"
 */
var AccessoryFlags = /** @class */ (function (_super) {
    tslib_1.__extends(AccessoryFlags, _super);
    function AccessoryFlags() {
        var _this = _super.call(this, "Accessory Flags", AccessoryFlags.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AccessoryFlags.UUID = "000000A6-0000-1000-8000-0026BB765291";
    AccessoryFlags.REQUIRES_ADDITIONAL_SETUP_BIT_MASK = 1;
    return AccessoryFlags;
}(Characteristic_1.Characteristic));
exports.AccessoryFlags = AccessoryFlags;
Characteristic_1.Characteristic.AccessoryFlags = AccessoryFlags;
/**
 * Characteristic "Accessory Identifier"
 */
var AccessoryIdentifier = /** @class */ (function (_super) {
    tslib_1.__extends(AccessoryIdentifier, _super);
    function AccessoryIdentifier() {
        var _this = _super.call(this, "Accessory Identifier", AccessoryIdentifier.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AccessoryIdentifier.UUID = "00000057-0000-1000-8000-0026BB765291";
    return AccessoryIdentifier;
}(Characteristic_1.Characteristic));
exports.AccessoryIdentifier = AccessoryIdentifier;
Characteristic_1.Characteristic.AccessoryIdentifier = AccessoryIdentifier;
/**
 * Characteristic "Active"
 */
var Active = /** @class */ (function (_super) {
    tslib_1.__extends(Active, _super);
    function Active() {
        var _this = _super.call(this, "Active", Active.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Active.UUID = "000000B0-0000-1000-8000-0026BB765291";
    Active.INACTIVE = 0;
    Active.ACTIVE = 1;
    return Active;
}(Characteristic_1.Characteristic));
exports.Active = Active;
Characteristic_1.Characteristic.Active = Active;
/**
 * Characteristic "Active Identifier"
 */
var ActiveIdentifier = /** @class */ (function (_super) {
    tslib_1.__extends(ActiveIdentifier, _super);
    function ActiveIdentifier() {
        var _this = _super.call(this, "Active Identifier", ActiveIdentifier.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ActiveIdentifier.UUID = "000000E7-0000-1000-8000-0026BB765291";
    return ActiveIdentifier;
}(Characteristic_1.Characteristic));
exports.ActiveIdentifier = ActiveIdentifier;
Characteristic_1.Characteristic.ActiveIdentifier = ActiveIdentifier;
/**
 * Characteristic "Activity Interval"
 * @since iOS 14
 */
var ActivityInterval = /** @class */ (function (_super) {
    tslib_1.__extends(ActivityInterval, _super);
    function ActivityInterval() {
        var _this = _super.call(this, "Activity Interval", ActivityInterval.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ActivityInterval.UUID = "0000023B-0000-1000-8000-0026BB765291";
    return ActivityInterval;
}(Characteristic_1.Characteristic));
exports.ActivityInterval = ActivityInterval;
Characteristic_1.Characteristic.ActivityInterval = ActivityInterval;
/**
 * Characteristic "Administrator Only Access"
 */
var AdministratorOnlyAccess = /** @class */ (function (_super) {
    tslib_1.__extends(AdministratorOnlyAccess, _super);
    function AdministratorOnlyAccess() {
        var _this = _super.call(this, "Administrator Only Access", AdministratorOnlyAccess.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AdministratorOnlyAccess.UUID = "00000001-0000-1000-8000-0026BB765291";
    return AdministratorOnlyAccess;
}(Characteristic_1.Characteristic));
exports.AdministratorOnlyAccess = AdministratorOnlyAccess;
Characteristic_1.Characteristic.AdministratorOnlyAccess = AdministratorOnlyAccess;
/**
 * Characteristic "Air Particulate Density"
 */
var AirParticulateDensity = /** @class */ (function (_super) {
    tslib_1.__extends(AirParticulateDensity, _super);
    function AirParticulateDensity() {
        var _this = _super.call(this, "Air Particulate Density", AirParticulateDensity.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1000,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AirParticulateDensity.UUID = "00000064-0000-1000-8000-0026BB765291";
    return AirParticulateDensity;
}(Characteristic_1.Characteristic));
exports.AirParticulateDensity = AirParticulateDensity;
Characteristic_1.Characteristic.AirParticulateDensity = AirParticulateDensity;
/**
 * Characteristic "Air Particulate Size"
 */
var AirParticulateSize = /** @class */ (function (_super) {
    tslib_1.__extends(AirParticulateSize, _super);
    function AirParticulateSize() {
        var _this = _super.call(this, "Air Particulate Size", AirParticulateSize.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AirParticulateSize.UUID = "00000065-0000-1000-8000-0026BB765291";
    AirParticulateSize._2_5_M = 0;
    AirParticulateSize._10_M = 1;
    return AirParticulateSize;
}(Characteristic_1.Characteristic));
exports.AirParticulateSize = AirParticulateSize;
Characteristic_1.Characteristic.AirParticulateSize = AirParticulateSize;
/**
 * Characteristic "AirPlay Enable"
 */
var AirPlayEnable = /** @class */ (function (_super) {
    tslib_1.__extends(AirPlayEnable, _super);
    function AirPlayEnable() {
        var _this = _super.call(this, "AirPlay Enable", AirPlayEnable.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AirPlayEnable.UUID = "0000025B-0000-1000-8000-0026BB765291";
    return AirPlayEnable;
}(Characteristic_1.Characteristic));
exports.AirPlayEnable = AirPlayEnable;
Characteristic_1.Characteristic.AirPlayEnable = AirPlayEnable;
/**
 * Characteristic "Air Quality"
 */
var AirQuality = /** @class */ (function (_super) {
    tslib_1.__extends(AirQuality, _super);
    function AirQuality() {
        var _this = _super.call(this, "Air Quality", AirQuality.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 5,
            minStep: 1,
            validValues: [0, 1, 2, 3, 4, 5],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AirQuality.UUID = "00000095-0000-1000-8000-0026BB765291";
    AirQuality.UNKNOWN = 0;
    AirQuality.EXCELLENT = 1;
    AirQuality.GOOD = 2;
    AirQuality.FAIR = 3;
    AirQuality.INFERIOR = 4;
    AirQuality.POOR = 5;
    return AirQuality;
}(Characteristic_1.Characteristic));
exports.AirQuality = AirQuality;
Characteristic_1.Characteristic.AirQuality = AirQuality;
/**
 * Characteristic "App Matching Identifier"
 */
var AppMatchingIdentifier = /** @class */ (function (_super) {
    tslib_1.__extends(AppMatchingIdentifier, _super);
    function AppMatchingIdentifier() {
        var _this = _super.call(this, "App Matching Identifier", AppMatchingIdentifier.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AppMatchingIdentifier.UUID = "000000A4-0000-1000-8000-0026BB765291";
    return AppMatchingIdentifier;
}(Characteristic_1.Characteristic));
exports.AppMatchingIdentifier = AppMatchingIdentifier;
Characteristic_1.Characteristic.AppMatchingIdentifier = AppMatchingIdentifier;
/**
 * Characteristic "Asset Update Readiness"
 */
var AssetUpdateReadiness = /** @class */ (function (_super) {
    tslib_1.__extends(AssetUpdateReadiness, _super);
    function AssetUpdateReadiness() {
        var _this = _super.call(this, "Asset Update Readiness", AssetUpdateReadiness.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AssetUpdateReadiness.UUID = "00000269-0000-1000-8000-0026BB765291";
    return AssetUpdateReadiness;
}(Characteristic_1.Characteristic));
exports.AssetUpdateReadiness = AssetUpdateReadiness;
Characteristic_1.Characteristic.AssetUpdateReadiness = AssetUpdateReadiness;
/**
 * Characteristic "Audio Feedback"
 */
var AudioFeedback = /** @class */ (function (_super) {
    tslib_1.__extends(AudioFeedback, _super);
    function AudioFeedback() {
        var _this = _super.call(this, "Audio Feedback", AudioFeedback.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AudioFeedback.UUID = "00000005-0000-1000-8000-0026BB765291";
    return AudioFeedback;
}(Characteristic_1.Characteristic));
exports.AudioFeedback = AudioFeedback;
Characteristic_1.Characteristic.AudioFeedback = AudioFeedback;
/**
 * Characteristic "Battery Level"
 */
var BatteryLevel = /** @class */ (function (_super) {
    tslib_1.__extends(BatteryLevel, _super);
    function BatteryLevel() {
        var _this = _super.call(this, "Battery Level", BatteryLevel.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    BatteryLevel.UUID = "00000068-0000-1000-8000-0026BB765291";
    return BatteryLevel;
}(Characteristic_1.Characteristic));
exports.BatteryLevel = BatteryLevel;
Characteristic_1.Characteristic.BatteryLevel = BatteryLevel;
/**
 * Characteristic "Brightness"
 */
var Brightness = /** @class */ (function (_super) {
    tslib_1.__extends(Brightness, _super);
    function Brightness() {
        var _this = _super.call(this, "Brightness", Brightness.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Brightness.UUID = "00000008-0000-1000-8000-0026BB765291";
    return Brightness;
}(Characteristic_1.Characteristic));
exports.Brightness = Brightness;
Characteristic_1.Characteristic.Brightness = Brightness;
/**
 * Characteristic "Button Event"
 */
var ButtonEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonEvent, _super);
    function ButtonEvent() {
        var _this = _super.call(this, "Button Event", ButtonEvent.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            adminOnlyAccess: [2 /* Access.NOTIFY */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ButtonEvent.UUID = "00000126-0000-1000-8000-0026BB765291";
    return ButtonEvent;
}(Characteristic_1.Characteristic));
exports.ButtonEvent = ButtonEvent;
Characteristic_1.Characteristic.ButtonEvent = ButtonEvent;
/**
 * Characteristic "Camera Operating Mode Indicator"
 */
var CameraOperatingModeIndicator = /** @class */ (function (_super) {
    tslib_1.__extends(CameraOperatingModeIndicator, _super);
    function CameraOperatingModeIndicator() {
        var _this = _super.call(this, "Camera Operating Mode Indicator", CameraOperatingModeIndicator.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "tw" /* Perms.TIMED_WRITE */],
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CameraOperatingModeIndicator.UUID = "0000021D-0000-1000-8000-0026BB765291";
    CameraOperatingModeIndicator.DISABLE = 0;
    CameraOperatingModeIndicator.ENABLE = 1;
    return CameraOperatingModeIndicator;
}(Characteristic_1.Characteristic));
exports.CameraOperatingModeIndicator = CameraOperatingModeIndicator;
Characteristic_1.Characteristic.CameraOperatingModeIndicator = CameraOperatingModeIndicator;
/**
 * Characteristic "Carbon Dioxide Detected"
 */
var CarbonDioxideDetected = /** @class */ (function (_super) {
    tslib_1.__extends(CarbonDioxideDetected, _super);
    function CarbonDioxideDetected() {
        var _this = _super.call(this, "Carbon Dioxide Detected", CarbonDioxideDetected.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CarbonDioxideDetected.UUID = "00000092-0000-1000-8000-0026BB765291";
    CarbonDioxideDetected.CO2_LEVELS_NORMAL = 0;
    CarbonDioxideDetected.CO2_LEVELS_ABNORMAL = 1;
    return CarbonDioxideDetected;
}(Characteristic_1.Characteristic));
exports.CarbonDioxideDetected = CarbonDioxideDetected;
Characteristic_1.Characteristic.CarbonDioxideDetected = CarbonDioxideDetected;
/**
 * Characteristic "Carbon Dioxide Level"
 */
var CarbonDioxideLevel = /** @class */ (function (_super) {
    tslib_1.__extends(CarbonDioxideLevel, _super);
    function CarbonDioxideLevel() {
        var _this = _super.call(this, "Carbon Dioxide Level", CarbonDioxideLevel.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 100000,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CarbonDioxideLevel.UUID = "00000093-0000-1000-8000-0026BB765291";
    return CarbonDioxideLevel;
}(Characteristic_1.Characteristic));
exports.CarbonDioxideLevel = CarbonDioxideLevel;
Characteristic_1.Characteristic.CarbonDioxideLevel = CarbonDioxideLevel;
/**
 * Characteristic "Carbon Dioxide Peak Level"
 */
var CarbonDioxidePeakLevel = /** @class */ (function (_super) {
    tslib_1.__extends(CarbonDioxidePeakLevel, _super);
    function CarbonDioxidePeakLevel() {
        var _this = _super.call(this, "Carbon Dioxide Peak Level", CarbonDioxidePeakLevel.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 100000,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CarbonDioxidePeakLevel.UUID = "00000094-0000-1000-8000-0026BB765291";
    return CarbonDioxidePeakLevel;
}(Characteristic_1.Characteristic));
exports.CarbonDioxidePeakLevel = CarbonDioxidePeakLevel;
Characteristic_1.Characteristic.CarbonDioxidePeakLevel = CarbonDioxidePeakLevel;
/**
 * Characteristic "Carbon Monoxide Detected"
 */
var CarbonMonoxideDetected = /** @class */ (function (_super) {
    tslib_1.__extends(CarbonMonoxideDetected, _super);
    function CarbonMonoxideDetected() {
        var _this = _super.call(this, "Carbon Monoxide Detected", CarbonMonoxideDetected.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CarbonMonoxideDetected.UUID = "00000069-0000-1000-8000-0026BB765291";
    CarbonMonoxideDetected.CO_LEVELS_NORMAL = 0;
    CarbonMonoxideDetected.CO_LEVELS_ABNORMAL = 1;
    return CarbonMonoxideDetected;
}(Characteristic_1.Characteristic));
exports.CarbonMonoxideDetected = CarbonMonoxideDetected;
Characteristic_1.Characteristic.CarbonMonoxideDetected = CarbonMonoxideDetected;
/**
 * Characteristic "Carbon Monoxide Level"
 */
var CarbonMonoxideLevel = /** @class */ (function (_super) {
    tslib_1.__extends(CarbonMonoxideLevel, _super);
    function CarbonMonoxideLevel() {
        var _this = _super.call(this, "Carbon Monoxide Level", CarbonMonoxideLevel.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CarbonMonoxideLevel.UUID = "00000090-0000-1000-8000-0026BB765291";
    return CarbonMonoxideLevel;
}(Characteristic_1.Characteristic));
exports.CarbonMonoxideLevel = CarbonMonoxideLevel;
Characteristic_1.Characteristic.CarbonMonoxideLevel = CarbonMonoxideLevel;
/**
 * Characteristic "Carbon Monoxide Peak Level"
 */
var CarbonMonoxidePeakLevel = /** @class */ (function (_super) {
    tslib_1.__extends(CarbonMonoxidePeakLevel, _super);
    function CarbonMonoxidePeakLevel() {
        var _this = _super.call(this, "Carbon Monoxide Peak Level", CarbonMonoxidePeakLevel.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CarbonMonoxidePeakLevel.UUID = "00000091-0000-1000-8000-0026BB765291";
    return CarbonMonoxidePeakLevel;
}(Characteristic_1.Characteristic));
exports.CarbonMonoxidePeakLevel = CarbonMonoxidePeakLevel;
Characteristic_1.Characteristic.CarbonMonoxidePeakLevel = CarbonMonoxidePeakLevel;
/**
 * Characteristic "Category"
 * @deprecated Removed and not used anymore
 */
var Category = /** @class */ (function (_super) {
    tslib_1.__extends(Category, _super);
    function Category() {
        var _this = _super.call(this, "Category", Category.UUID, {
            format: "uint16" /* Formats.UINT16 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 1,
            maxValue: 16,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Category.UUID = "000000A3-0000-1000-8000-0026BB765291";
    return Category;
}(Characteristic_1.Characteristic));
exports.Category = Category;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.Category = Category;
/**
 * Characteristic "CCA Energy Detect Threshold"
 * @since iOS 14
 */
var CCAEnergyDetectThreshold = /** @class */ (function (_super) {
    tslib_1.__extends(CCAEnergyDetectThreshold, _super);
    function CCAEnergyDetectThreshold() {
        var _this = _super.call(this, "CCA Energy Detect Threshold", CCAEnergyDetectThreshold.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CCAEnergyDetectThreshold.UUID = "00000246-0000-1000-8000-0026BB765291";
    return CCAEnergyDetectThreshold;
}(Characteristic_1.Characteristic));
exports.CCAEnergyDetectThreshold = CCAEnergyDetectThreshold;
Characteristic_1.Characteristic.CCAEnergyDetectThreshold = CCAEnergyDetectThreshold;
/**
 * Characteristic "CCA Signal Detect Threshold"
 * @since iOS 14
 */
var CCASignalDetectThreshold = /** @class */ (function (_super) {
    tslib_1.__extends(CCASignalDetectThreshold, _super);
    function CCASignalDetectThreshold() {
        var _this = _super.call(this, "CCA Signal Detect Threshold", CCASignalDetectThreshold.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CCASignalDetectThreshold.UUID = "00000245-0000-1000-8000-0026BB765291";
    return CCASignalDetectThreshold;
}(Characteristic_1.Characteristic));
exports.CCASignalDetectThreshold = CCASignalDetectThreshold;
Characteristic_1.Characteristic.CCASignalDetectThreshold = CCASignalDetectThreshold;
/**
 * Characteristic "Characteristic Value Active Transition Count"
 * @since iOS 14
 */
var CharacteristicValueActiveTransitionCount = /** @class */ (function (_super) {
    tslib_1.__extends(CharacteristicValueActiveTransitionCount, _super);
    function CharacteristicValueActiveTransitionCount() {
        var _this = _super.call(this, "Characteristic Value Active Transition Count", CharacteristicValueActiveTransitionCount.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CharacteristicValueActiveTransitionCount.UUID = "0000024B-0000-1000-8000-0026BB765291";
    return CharacteristicValueActiveTransitionCount;
}(Characteristic_1.Characteristic));
exports.CharacteristicValueActiveTransitionCount = CharacteristicValueActiveTransitionCount;
Characteristic_1.Characteristic.CharacteristicValueActiveTransitionCount = CharacteristicValueActiveTransitionCount;
/**
 * Characteristic "Characteristic Value Transition Control"
 * @since iOS 14
 */
var CharacteristicValueTransitionControl = /** @class */ (function (_super) {
    tslib_1.__extends(CharacteristicValueTransitionControl, _super);
    function CharacteristicValueTransitionControl() {
        var _this = _super.call(this, "Characteristic Value Transition Control", CharacteristicValueTransitionControl.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CharacteristicValueTransitionControl.UUID = "00000143-0000-1000-8000-0026BB765291";
    return CharacteristicValueTransitionControl;
}(Characteristic_1.Characteristic));
exports.CharacteristicValueTransitionControl = CharacteristicValueTransitionControl;
Characteristic_1.Characteristic.CharacteristicValueTransitionControl = CharacteristicValueTransitionControl;
/**
 * Characteristic "Charging State"
 */
var ChargingState = /** @class */ (function (_super) {
    tslib_1.__extends(ChargingState, _super);
    function ChargingState() {
        var _this = _super.call(this, "Charging State", ChargingState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ChargingState.UUID = "0000008F-0000-1000-8000-0026BB765291";
    ChargingState.NOT_CHARGING = 0;
    ChargingState.CHARGING = 1;
    ChargingState.NOT_CHARGEABLE = 2;
    return ChargingState;
}(Characteristic_1.Characteristic));
exports.ChargingState = ChargingState;
Characteristic_1.Characteristic.ChargingState = ChargingState;
/**
 * Characteristic "Closed Captions"
 */
var ClosedCaptions = /** @class */ (function (_super) {
    tslib_1.__extends(ClosedCaptions, _super);
    function ClosedCaptions() {
        var _this = _super.call(this, "Closed Captions", ClosedCaptions.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ClosedCaptions.UUID = "000000DD-0000-1000-8000-0026BB765291";
    ClosedCaptions.DISABLED = 0;
    ClosedCaptions.ENABLED = 1;
    return ClosedCaptions;
}(Characteristic_1.Characteristic));
exports.ClosedCaptions = ClosedCaptions;
Characteristic_1.Characteristic.ClosedCaptions = ClosedCaptions;
/**
 * Characteristic "Color Temperature"
 */
var ColorTemperature = /** @class */ (function (_super) {
    tslib_1.__extends(ColorTemperature, _super);
    function ColorTemperature() {
        var _this = _super.call(this, "Color Temperature", ColorTemperature.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 140,
            maxValue: 500,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ColorTemperature.UUID = "000000CE-0000-1000-8000-0026BB765291";
    return ColorTemperature;
}(Characteristic_1.Characteristic));
exports.ColorTemperature = ColorTemperature;
Characteristic_1.Characteristic.ColorTemperature = ColorTemperature;
/**
 * Characteristic "Configuration State"
 * @since iOS 15
 */
var ConfigurationState = /** @class */ (function (_super) {
    tslib_1.__extends(ConfigurationState, _super);
    function ConfigurationState() {
        var _this = _super.call(this, "Configuration State", ConfigurationState.UUID, {
            format: "uint16" /* Formats.UINT16 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ConfigurationState.UUID = "00000263-0000-1000-8000-0026BB765291";
    return ConfigurationState;
}(Characteristic_1.Characteristic));
exports.ConfigurationState = ConfigurationState;
Characteristic_1.Characteristic.ConfigurationState = ConfigurationState;
/**
 * Characteristic "Configure Bridged Accessory"
 * @deprecated Removed and not used anymore
 */
var ConfigureBridgedAccessory = /** @class */ (function (_super) {
    tslib_1.__extends(ConfigureBridgedAccessory, _super);
    function ConfigureBridgedAccessory() {
        var _this = _super.call(this, "Configure Bridged Accessory", ConfigureBridgedAccessory.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ConfigureBridgedAccessory.UUID = "000000A0-0000-1000-8000-0026BB765291";
    return ConfigureBridgedAccessory;
}(Characteristic_1.Characteristic));
exports.ConfigureBridgedAccessory = ConfigureBridgedAccessory;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.ConfigureBridgedAccessory = ConfigureBridgedAccessory;
/**
 * Characteristic "Configure Bridged Accessory Status"
 * @deprecated Removed and not used anymore
 */
var ConfigureBridgedAccessoryStatus = /** @class */ (function (_super) {
    tslib_1.__extends(ConfigureBridgedAccessoryStatus, _super);
    function ConfigureBridgedAccessoryStatus() {
        var _this = _super.call(this, "Configure Bridged Accessory Status", ConfigureBridgedAccessoryStatus.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ConfigureBridgedAccessoryStatus.UUID = "0000009D-0000-1000-8000-0026BB765291";
    return ConfigureBridgedAccessoryStatus;
}(Characteristic_1.Characteristic));
exports.ConfigureBridgedAccessoryStatus = ConfigureBridgedAccessoryStatus;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.ConfigureBridgedAccessoryStatus = ConfigureBridgedAccessoryStatus;
/**
 * Characteristic "Configured Name"
 */
var ConfiguredName = /** @class */ (function (_super) {
    tslib_1.__extends(ConfiguredName, _super);
    function ConfiguredName() {
        var _this = _super.call(this, "Configured Name", ConfiguredName.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ConfiguredName.UUID = "000000E3-0000-1000-8000-0026BB765291";
    return ConfiguredName;
}(Characteristic_1.Characteristic));
exports.ConfiguredName = ConfiguredName;
Characteristic_1.Characteristic.ConfiguredName = ConfiguredName;
/**
 * Characteristic "Contact Sensor State"
 */
var ContactSensorState = /** @class */ (function (_super) {
    tslib_1.__extends(ContactSensorState, _super);
    function ContactSensorState() {
        var _this = _super.call(this, "Contact Sensor State", ContactSensorState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ContactSensorState.UUID = "0000006A-0000-1000-8000-0026BB765291";
    ContactSensorState.CONTACT_DETECTED = 0;
    ContactSensorState.CONTACT_NOT_DETECTED = 1;
    return ContactSensorState;
}(Characteristic_1.Characteristic));
exports.ContactSensorState = ContactSensorState;
Characteristic_1.Characteristic.ContactSensorState = ContactSensorState;
/**
 * Characteristic "Cooling Threshold Temperature"
 */
var CoolingThresholdTemperature = /** @class */ (function (_super) {
    tslib_1.__extends(CoolingThresholdTemperature, _super);
    function CoolingThresholdTemperature() {
        var _this = _super.call(this, "Cooling Threshold Temperature", CoolingThresholdTemperature.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "celsius" /* Units.CELSIUS */,
            minValue: 10,
            maxValue: 35,
            minStep: 0.1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CoolingThresholdTemperature.UUID = "0000000D-0000-1000-8000-0026BB765291";
    return CoolingThresholdTemperature;
}(Characteristic_1.Characteristic));
exports.CoolingThresholdTemperature = CoolingThresholdTemperature;
Characteristic_1.Characteristic.CoolingThresholdTemperature = CoolingThresholdTemperature;
/**
 * Characteristic "Crypto Hash"
 */
var CryptoHash = /** @class */ (function (_super) {
    tslib_1.__extends(CryptoHash, _super);
    function CryptoHash() {
        var _this = _super.call(this, "Crypto Hash", CryptoHash.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pw" /* Perms.PAIRED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CryptoHash.UUID = "00000250-0000-1000-8000-0026BB765291";
    return CryptoHash;
}(Characteristic_1.Characteristic));
exports.CryptoHash = CryptoHash;
Characteristic_1.Characteristic.CryptoHash = CryptoHash;
/**
 * Characteristic "Current Air Purifier State"
 */
var CurrentAirPurifierState = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentAirPurifierState, _super);
    function CurrentAirPurifierState() {
        var _this = _super.call(this, "Current Air Purifier State", CurrentAirPurifierState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentAirPurifierState.UUID = "000000A9-0000-1000-8000-0026BB765291";
    CurrentAirPurifierState.INACTIVE = 0;
    CurrentAirPurifierState.IDLE = 1;
    CurrentAirPurifierState.PURIFYING_AIR = 2;
    return CurrentAirPurifierState;
}(Characteristic_1.Characteristic));
exports.CurrentAirPurifierState = CurrentAirPurifierState;
Characteristic_1.Characteristic.CurrentAirPurifierState = CurrentAirPurifierState;
/**
 * Characteristic "Current Ambient Light Level"
 */
var CurrentAmbientLightLevel = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentAmbientLightLevel, _super);
    function CurrentAmbientLightLevel() {
        var _this = _super.call(this, "Current Ambient Light Level", CurrentAmbientLightLevel.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "lux" /* Units.LUX */,
            minValue: 0.0001,
            maxValue: 100000,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentAmbientLightLevel.UUID = "0000006B-0000-1000-8000-0026BB765291";
    return CurrentAmbientLightLevel;
}(Characteristic_1.Characteristic));
exports.CurrentAmbientLightLevel = CurrentAmbientLightLevel;
Characteristic_1.Characteristic.CurrentAmbientLightLevel = CurrentAmbientLightLevel;
/**
 * Characteristic "Current Door State"
 */
var CurrentDoorState = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentDoorState, _super);
    function CurrentDoorState() {
        var _this = _super.call(this, "Current Door State", CurrentDoorState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 4,
            minStep: 1,
            validValues: [0, 1, 2, 3, 4],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentDoorState.UUID = "0000000E-0000-1000-8000-0026BB765291";
    CurrentDoorState.OPEN = 0;
    CurrentDoorState.CLOSED = 1;
    CurrentDoorState.OPENING = 2;
    CurrentDoorState.CLOSING = 3;
    CurrentDoorState.STOPPED = 4;
    return CurrentDoorState;
}(Characteristic_1.Characteristic));
exports.CurrentDoorState = CurrentDoorState;
Characteristic_1.Characteristic.CurrentDoorState = CurrentDoorState;
/**
 * Characteristic "Current Fan State"
 */
var CurrentFanState = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentFanState, _super);
    function CurrentFanState() {
        var _this = _super.call(this, "Current Fan State", CurrentFanState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentFanState.UUID = "000000AF-0000-1000-8000-0026BB765291";
    CurrentFanState.INACTIVE = 0;
    CurrentFanState.IDLE = 1;
    CurrentFanState.BLOWING_AIR = 2;
    return CurrentFanState;
}(Characteristic_1.Characteristic));
exports.CurrentFanState = CurrentFanState;
Characteristic_1.Characteristic.CurrentFanState = CurrentFanState;
/**
 * Characteristic "Current Heater-Cooler State"
 */
var CurrentHeaterCoolerState = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentHeaterCoolerState, _super);
    function CurrentHeaterCoolerState() {
        var _this = _super.call(this, "Current Heater-Cooler State", CurrentHeaterCoolerState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 3,
            minStep: 1,
            validValues: [0, 1, 2, 3],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentHeaterCoolerState.UUID = "000000B1-0000-1000-8000-0026BB765291";
    CurrentHeaterCoolerState.INACTIVE = 0;
    CurrentHeaterCoolerState.IDLE = 1;
    CurrentHeaterCoolerState.HEATING = 2;
    CurrentHeaterCoolerState.COOLING = 3;
    return CurrentHeaterCoolerState;
}(Characteristic_1.Characteristic));
exports.CurrentHeaterCoolerState = CurrentHeaterCoolerState;
Characteristic_1.Characteristic.CurrentHeaterCoolerState = CurrentHeaterCoolerState;
/**
 * Characteristic "Current Heating Cooling State"
 */
var CurrentHeatingCoolingState = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentHeatingCoolingState, _super);
    function CurrentHeatingCoolingState() {
        var _this = _super.call(this, "Current Heating Cooling State", CurrentHeatingCoolingState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentHeatingCoolingState.UUID = "0000000F-0000-1000-8000-0026BB765291";
    CurrentHeatingCoolingState.OFF = 0;
    CurrentHeatingCoolingState.HEAT = 1;
    CurrentHeatingCoolingState.COOL = 2;
    return CurrentHeatingCoolingState;
}(Characteristic_1.Characteristic));
exports.CurrentHeatingCoolingState = CurrentHeatingCoolingState;
Characteristic_1.Characteristic.CurrentHeatingCoolingState = CurrentHeatingCoolingState;
/**
 * Characteristic "Current Horizontal Tilt Angle"
 */
var CurrentHorizontalTiltAngle = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentHorizontalTiltAngle, _super);
    function CurrentHorizontalTiltAngle() {
        var _this = _super.call(this, "Current Horizontal Tilt Angle", CurrentHorizontalTiltAngle.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "arcdegrees" /* Units.ARC_DEGREE */,
            minValue: -90,
            maxValue: 90,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentHorizontalTiltAngle.UUID = "0000006C-0000-1000-8000-0026BB765291";
    return CurrentHorizontalTiltAngle;
}(Characteristic_1.Characteristic));
exports.CurrentHorizontalTiltAngle = CurrentHorizontalTiltAngle;
Characteristic_1.Characteristic.CurrentHorizontalTiltAngle = CurrentHorizontalTiltAngle;
/**
 * Characteristic "Current Humidifier-Dehumidifier State"
 */
var CurrentHumidifierDehumidifierState = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentHumidifierDehumidifierState, _super);
    function CurrentHumidifierDehumidifierState() {
        var _this = _super.call(this, "Current Humidifier-Dehumidifier State", CurrentHumidifierDehumidifierState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 3,
            minStep: 1,
            validValues: [0, 1, 2, 3],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentHumidifierDehumidifierState.UUID = "000000B3-0000-1000-8000-0026BB765291";
    CurrentHumidifierDehumidifierState.INACTIVE = 0;
    CurrentHumidifierDehumidifierState.IDLE = 1;
    CurrentHumidifierDehumidifierState.HUMIDIFYING = 2;
    CurrentHumidifierDehumidifierState.DEHUMIDIFYING = 3;
    return CurrentHumidifierDehumidifierState;
}(Characteristic_1.Characteristic));
exports.CurrentHumidifierDehumidifierState = CurrentHumidifierDehumidifierState;
Characteristic_1.Characteristic.CurrentHumidifierDehumidifierState = CurrentHumidifierDehumidifierState;
/**
 * Characteristic "Current Media State"
 */
var CurrentMediaState = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentMediaState, _super);
    function CurrentMediaState() {
        var _this = _super.call(this, "Current Media State", CurrentMediaState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 5,
            minStep: 1,
            validValues: [0, 1, 2, 4, 5],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentMediaState.UUID = "000000E0-0000-1000-8000-0026BB765291";
    CurrentMediaState.PLAY = 0;
    CurrentMediaState.PAUSE = 1;
    CurrentMediaState.STOP = 2;
    CurrentMediaState.LOADING = 4;
    CurrentMediaState.INTERRUPTED = 5;
    return CurrentMediaState;
}(Characteristic_1.Characteristic));
exports.CurrentMediaState = CurrentMediaState;
Characteristic_1.Characteristic.CurrentMediaState = CurrentMediaState;
/**
 * Characteristic "Current Position"
 */
var CurrentPosition = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentPosition, _super);
    function CurrentPosition() {
        var _this = _super.call(this, "Current Position", CurrentPosition.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentPosition.UUID = "0000006D-0000-1000-8000-0026BB765291";
    return CurrentPosition;
}(Characteristic_1.Characteristic));
exports.CurrentPosition = CurrentPosition;
Characteristic_1.Characteristic.CurrentPosition = CurrentPosition;
/**
 * Characteristic "Current Relative Humidity"
 */
var CurrentRelativeHumidity = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentRelativeHumidity, _super);
    function CurrentRelativeHumidity() {
        var _this = _super.call(this, "Current Relative Humidity", CurrentRelativeHumidity.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentRelativeHumidity.UUID = "00000010-0000-1000-8000-0026BB765291";
    return CurrentRelativeHumidity;
}(Characteristic_1.Characteristic));
exports.CurrentRelativeHumidity = CurrentRelativeHumidity;
Characteristic_1.Characteristic.CurrentRelativeHumidity = CurrentRelativeHumidity;
/**
 * Characteristic "Current Slat State"
 */
var CurrentSlatState = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentSlatState, _super);
    function CurrentSlatState() {
        var _this = _super.call(this, "Current Slat State", CurrentSlatState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentSlatState.UUID = "000000AA-0000-1000-8000-0026BB765291";
    CurrentSlatState.FIXED = 0;
    CurrentSlatState.JAMMED = 1;
    CurrentSlatState.SWINGING = 2;
    return CurrentSlatState;
}(Characteristic_1.Characteristic));
exports.CurrentSlatState = CurrentSlatState;
Characteristic_1.Characteristic.CurrentSlatState = CurrentSlatState;
/**
 * Characteristic "Current Temperature"
 */
var CurrentTemperature = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentTemperature, _super);
    function CurrentTemperature() {
        var _this = _super.call(this, "Current Temperature", CurrentTemperature.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "celsius" /* Units.CELSIUS */,
            minValue: -270,
            maxValue: 100,
            minStep: 0.1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentTemperature.UUID = "00000011-0000-1000-8000-0026BB765291";
    return CurrentTemperature;
}(Characteristic_1.Characteristic));
exports.CurrentTemperature = CurrentTemperature;
Characteristic_1.Characteristic.CurrentTemperature = CurrentTemperature;
/**
 * Characteristic "Current Tilt Angle"
 */
var CurrentTiltAngle = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentTiltAngle, _super);
    function CurrentTiltAngle() {
        var _this = _super.call(this, "Current Tilt Angle", CurrentTiltAngle.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "arcdegrees" /* Units.ARC_DEGREE */,
            minValue: -90,
            maxValue: 90,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentTiltAngle.UUID = "000000C1-0000-1000-8000-0026BB765291";
    return CurrentTiltAngle;
}(Characteristic_1.Characteristic));
exports.CurrentTiltAngle = CurrentTiltAngle;
Characteristic_1.Characteristic.CurrentTiltAngle = CurrentTiltAngle;
/**
 * Characteristic "Current Time"
 * @deprecated Removed and not used anymore
 */
var CurrentTime = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentTime, _super);
    function CurrentTime() {
        var _this = _super.call(this, "Current Time", CurrentTime.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentTime.UUID = "0000009B-0000-1000-8000-0026BB765291";
    return CurrentTime;
}(Characteristic_1.Characteristic));
exports.CurrentTime = CurrentTime;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.CurrentTime = CurrentTime;
/**
 * Characteristic "Current Transport"
 * @since iOS 14
 */
var CurrentTransport = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentTransport, _super);
    function CurrentTransport() {
        var _this = _super.call(this, "Current Transport", CurrentTransport.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentTransport.UUID = "0000022B-0000-1000-8000-0026BB765291";
    return CurrentTransport;
}(Characteristic_1.Characteristic));
exports.CurrentTransport = CurrentTransport;
Characteristic_1.Characteristic.CurrentTransport = CurrentTransport;
/**
 * Characteristic "Current Vertical Tilt Angle"
 */
var CurrentVerticalTiltAngle = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentVerticalTiltAngle, _super);
    function CurrentVerticalTiltAngle() {
        var _this = _super.call(this, "Current Vertical Tilt Angle", CurrentVerticalTiltAngle.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "arcdegrees" /* Units.ARC_DEGREE */,
            minValue: -90,
            maxValue: 90,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentVerticalTiltAngle.UUID = "0000006E-0000-1000-8000-0026BB765291";
    return CurrentVerticalTiltAngle;
}(Characteristic_1.Characteristic));
exports.CurrentVerticalTiltAngle = CurrentVerticalTiltAngle;
Characteristic_1.Characteristic.CurrentVerticalTiltAngle = CurrentVerticalTiltAngle;
/**
 * Characteristic "Current Visibility State"
 */
var CurrentVisibilityState = /** @class */ (function (_super) {
    tslib_1.__extends(CurrentVisibilityState, _super);
    function CurrentVisibilityState() {
        var _this = _super.call(this, "Current Visibility State", CurrentVisibilityState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentVisibilityState.UUID = "00000135-0000-1000-8000-0026BB765291";
    CurrentVisibilityState.SHOWN = 0;
    CurrentVisibilityState.HIDDEN = 1;
    return CurrentVisibilityState;
}(Characteristic_1.Characteristic));
exports.CurrentVisibilityState = CurrentVisibilityState;
Characteristic_1.Characteristic.CurrentVisibilityState = CurrentVisibilityState;
/**
 * Characteristic "Data Stream HAP Transport"
 * @since iOS 14
 */
var DataStreamHAPTransport = /** @class */ (function (_super) {
    tslib_1.__extends(DataStreamHAPTransport, _super);
    function DataStreamHAPTransport() {
        var _this = _super.call(this, "Data Stream HAP Transport", DataStreamHAPTransport.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DataStreamHAPTransport.UUID = "00000138-0000-1000-8000-0026BB765291";
    return DataStreamHAPTransport;
}(Characteristic_1.Characteristic));
exports.DataStreamHAPTransport = DataStreamHAPTransport;
Characteristic_1.Characteristic.DataStreamHAPTransport = DataStreamHAPTransport;
/**
 * Characteristic "Data Stream HAP Transport Interrupt"
 * @since iOS 14
 */
var DataStreamHAPTransportInterrupt = /** @class */ (function (_super) {
    tslib_1.__extends(DataStreamHAPTransportInterrupt, _super);
    function DataStreamHAPTransportInterrupt() {
        var _this = _super.call(this, "Data Stream HAP Transport Interrupt", DataStreamHAPTransportInterrupt.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DataStreamHAPTransportInterrupt.UUID = "00000139-0000-1000-8000-0026BB765291";
    return DataStreamHAPTransportInterrupt;
}(Characteristic_1.Characteristic));
exports.DataStreamHAPTransportInterrupt = DataStreamHAPTransportInterrupt;
Characteristic_1.Characteristic.DataStreamHAPTransportInterrupt = DataStreamHAPTransportInterrupt;
/**
 * Characteristic "Day of the Week"
 * @deprecated Removed and not used anymore
 */
var DayoftheWeek = /** @class */ (function (_super) {
    tslib_1.__extends(DayoftheWeek, _super);
    function DayoftheWeek() {
        var _this = _super.call(this, "Day of the Week", DayoftheWeek.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 1,
            maxValue: 7,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DayoftheWeek.UUID = "00000098-0000-1000-8000-0026BB765291";
    return DayoftheWeek;
}(Characteristic_1.Characteristic));
exports.DayoftheWeek = DayoftheWeek;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.DayoftheWeek = DayoftheWeek;
/**
 * Characteristic "Diagonal Field Of View"
 * @since iOS 13.2
 */
var DiagonalFieldOfView = /** @class */ (function (_super) {
    tslib_1.__extends(DiagonalFieldOfView, _super);
    function DiagonalFieldOfView() {
        var _this = _super.call(this, "Diagonal Field Of View", DiagonalFieldOfView.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "arcdegrees" /* Units.ARC_DEGREE */,
            minValue: 0,
            maxValue: 360,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DiagonalFieldOfView.UUID = "00000224-0000-1000-8000-0026BB765291";
    return DiagonalFieldOfView;
}(Characteristic_1.Characteristic));
exports.DiagonalFieldOfView = DiagonalFieldOfView;
Characteristic_1.Characteristic.DiagonalFieldOfView = DiagonalFieldOfView;
/**
 * Characteristic "Digital Zoom"
 */
var DigitalZoom = /** @class */ (function (_super) {
    tslib_1.__extends(DigitalZoom, _super);
    function DigitalZoom() {
        var _this = _super.call(this, "Digital Zoom", DigitalZoom.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minStep: 0.1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DigitalZoom.UUID = "0000011D-0000-1000-8000-0026BB765291";
    return DigitalZoom;
}(Characteristic_1.Characteristic));
exports.DigitalZoom = DigitalZoom;
Characteristic_1.Characteristic.DigitalZoom = DigitalZoom;
/**
 * Characteristic "Discover Bridged Accessories"
 * @deprecated Removed and not used anymore
 */
var DiscoverBridgedAccessories = /** @class */ (function (_super) {
    tslib_1.__extends(DiscoverBridgedAccessories, _super);
    function DiscoverBridgedAccessories() {
        var _this = _super.call(this, "Discover Bridged Accessories", DiscoverBridgedAccessories.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DiscoverBridgedAccessories.UUID = "0000009E-0000-1000-8000-0026BB765291";
    return DiscoverBridgedAccessories;
}(Characteristic_1.Characteristic));
exports.DiscoverBridgedAccessories = DiscoverBridgedAccessories;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.DiscoverBridgedAccessories = DiscoverBridgedAccessories;
/**
 * Characteristic "Discovered Bridged Accessories"
 * @deprecated Removed and not used anymore
 */
var DiscoveredBridgedAccessories = /** @class */ (function (_super) {
    tslib_1.__extends(DiscoveredBridgedAccessories, _super);
    function DiscoveredBridgedAccessories() {
        var _this = _super.call(this, "Discovered Bridged Accessories", DiscoveredBridgedAccessories.UUID, {
            format: "uint16" /* Formats.UINT16 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DiscoveredBridgedAccessories.UUID = "0000009F-0000-1000-8000-0026BB765291";
    return DiscoveredBridgedAccessories;
}(Characteristic_1.Characteristic));
exports.DiscoveredBridgedAccessories = DiscoveredBridgedAccessories;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.DiscoveredBridgedAccessories = DiscoveredBridgedAccessories;
/**
 * Characteristic "Display Order"
 */
var DisplayOrder = /** @class */ (function (_super) {
    tslib_1.__extends(DisplayOrder, _super);
    function DisplayOrder() {
        var _this = _super.call(this, "Display Order", DisplayOrder.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DisplayOrder.UUID = "00000136-0000-1000-8000-0026BB765291";
    return DisplayOrder;
}(Characteristic_1.Characteristic));
exports.DisplayOrder = DisplayOrder;
Characteristic_1.Characteristic.DisplayOrder = DisplayOrder;
/**
 * Characteristic "Event Retransmission Maximum"
 * @since iOS 14
 */
var EventRetransmissionMaximum = /** @class */ (function (_super) {
    tslib_1.__extends(EventRetransmissionMaximum, _super);
    function EventRetransmissionMaximum() {
        var _this = _super.call(this, "Event Retransmission Maximum", EventRetransmissionMaximum.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    EventRetransmissionMaximum.UUID = "0000023D-0000-1000-8000-0026BB765291";
    return EventRetransmissionMaximum;
}(Characteristic_1.Characteristic));
exports.EventRetransmissionMaximum = EventRetransmissionMaximum;
Characteristic_1.Characteristic.EventRetransmissionMaximum = EventRetransmissionMaximum;
/**
 * Characteristic "Event Snapshots Active"
 */
var EventSnapshotsActive = /** @class */ (function (_super) {
    tslib_1.__extends(EventSnapshotsActive, _super);
    function EventSnapshotsActive() {
        var _this = _super.call(this, "Event Snapshots Active", EventSnapshotsActive.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    EventSnapshotsActive.UUID = "00000223-0000-1000-8000-0026BB765291";
    EventSnapshotsActive.DISABLE = 0;
    EventSnapshotsActive.ENABLE = 1;
    return EventSnapshotsActive;
}(Characteristic_1.Characteristic));
exports.EventSnapshotsActive = EventSnapshotsActive;
Characteristic_1.Characteristic.EventSnapshotsActive = EventSnapshotsActive;
/**
 * Characteristic "Event Transmission Counters"
 * @since iOS 14
 */
var EventTransmissionCounters = /** @class */ (function (_super) {
    tslib_1.__extends(EventTransmissionCounters, _super);
    function EventTransmissionCounters() {
        var _this = _super.call(this, "Event Transmission Counters", EventTransmissionCounters.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    EventTransmissionCounters.UUID = "0000023E-0000-1000-8000-0026BB765291";
    return EventTransmissionCounters;
}(Characteristic_1.Characteristic));
exports.EventTransmissionCounters = EventTransmissionCounters;
Characteristic_1.Characteristic.EventTransmissionCounters = EventTransmissionCounters;
/**
 * Characteristic "Filter Change Indication"
 */
var FilterChangeIndication = /** @class */ (function (_super) {
    tslib_1.__extends(FilterChangeIndication, _super);
    function FilterChangeIndication() {
        var _this = _super.call(this, "Filter Change Indication", FilterChangeIndication.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    FilterChangeIndication.UUID = "000000AC-0000-1000-8000-0026BB765291";
    FilterChangeIndication.FILTER_OK = 0;
    FilterChangeIndication.CHANGE_FILTER = 1;
    return FilterChangeIndication;
}(Characteristic_1.Characteristic));
exports.FilterChangeIndication = FilterChangeIndication;
Characteristic_1.Characteristic.FilterChangeIndication = FilterChangeIndication;
/**
 * Characteristic "Filter Life Level"
 */
var FilterLifeLevel = /** @class */ (function (_super) {
    tslib_1.__extends(FilterLifeLevel, _super);
    function FilterLifeLevel() {
        var _this = _super.call(this, "Filter Life Level", FilterLifeLevel.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    FilterLifeLevel.UUID = "000000AB-0000-1000-8000-0026BB765291";
    return FilterLifeLevel;
}(Characteristic_1.Characteristic));
exports.FilterLifeLevel = FilterLifeLevel;
Characteristic_1.Characteristic.FilterLifeLevel = FilterLifeLevel;
/**
 * Characteristic "Firmware Revision"
 */
var FirmwareRevision = /** @class */ (function (_super) {
    tslib_1.__extends(FirmwareRevision, _super);
    function FirmwareRevision() {
        var _this = _super.call(this, "Firmware Revision", FirmwareRevision.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    FirmwareRevision.UUID = "00000052-0000-1000-8000-0026BB765291";
    return FirmwareRevision;
}(Characteristic_1.Characteristic));
exports.FirmwareRevision = FirmwareRevision;
Characteristic_1.Characteristic.FirmwareRevision = FirmwareRevision;
/**
 * Characteristic "Firmware Update Readiness"
 */
var FirmwareUpdateReadiness = /** @class */ (function (_super) {
    tslib_1.__extends(FirmwareUpdateReadiness, _super);
    function FirmwareUpdateReadiness() {
        var _this = _super.call(this, "Firmware Update Readiness", FirmwareUpdateReadiness.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    FirmwareUpdateReadiness.UUID = "00000234-0000-1000-8000-0026BB765291";
    return FirmwareUpdateReadiness;
}(Characteristic_1.Characteristic));
exports.FirmwareUpdateReadiness = FirmwareUpdateReadiness;
Characteristic_1.Characteristic.FirmwareUpdateReadiness = FirmwareUpdateReadiness;
/**
 * Characteristic "Firmware Update Status"
 */
var FirmwareUpdateStatus = /** @class */ (function (_super) {
    tslib_1.__extends(FirmwareUpdateStatus, _super);
    function FirmwareUpdateStatus() {
        var _this = _super.call(this, "Firmware Update Status", FirmwareUpdateStatus.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    FirmwareUpdateStatus.UUID = "00000235-0000-1000-8000-0026BB765291";
    return FirmwareUpdateStatus;
}(Characteristic_1.Characteristic));
exports.FirmwareUpdateStatus = FirmwareUpdateStatus;
Characteristic_1.Characteristic.FirmwareUpdateStatus = FirmwareUpdateStatus;
/**
 * Characteristic "Hardware Finish"
 * @since iOS 15
 */
var HardwareFinish = /** @class */ (function (_super) {
    tslib_1.__extends(HardwareFinish, _super);
    function HardwareFinish() {
        var _this = _super.call(this, "Hardware Finish", HardwareFinish.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HardwareFinish.UUID = "0000026C-0000-1000-8000-0026BB765291";
    return HardwareFinish;
}(Characteristic_1.Characteristic));
exports.HardwareFinish = HardwareFinish;
Characteristic_1.Characteristic.HardwareFinish = HardwareFinish;
/**
 * Characteristic "Hardware Revision"
 */
var HardwareRevision = /** @class */ (function (_super) {
    tslib_1.__extends(HardwareRevision, _super);
    function HardwareRevision() {
        var _this = _super.call(this, "Hardware Revision", HardwareRevision.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HardwareRevision.UUID = "00000053-0000-1000-8000-0026BB765291";
    return HardwareRevision;
}(Characteristic_1.Characteristic));
exports.HardwareRevision = HardwareRevision;
Characteristic_1.Characteristic.HardwareRevision = HardwareRevision;
/**
 * Characteristic "Heart Beat"
 * @since iOS 14
 */
var HeartBeat = /** @class */ (function (_super) {
    tslib_1.__extends(HeartBeat, _super);
    function HeartBeat() {
        var _this = _super.call(this, "Heart Beat", HeartBeat.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HeartBeat.UUID = "0000024A-0000-1000-8000-0026BB765291";
    return HeartBeat;
}(Characteristic_1.Characteristic));
exports.HeartBeat = HeartBeat;
Characteristic_1.Characteristic.HeartBeat = HeartBeat;
/**
 * Characteristic "Heating Threshold Temperature"
 */
var HeatingThresholdTemperature = /** @class */ (function (_super) {
    tslib_1.__extends(HeatingThresholdTemperature, _super);
    function HeatingThresholdTemperature() {
        var _this = _super.call(this, "Heating Threshold Temperature", HeatingThresholdTemperature.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "celsius" /* Units.CELSIUS */,
            minValue: 0,
            maxValue: 25,
            minStep: 0.1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HeatingThresholdTemperature.UUID = "00000012-0000-1000-8000-0026BB765291";
    return HeatingThresholdTemperature;
}(Characteristic_1.Characteristic));
exports.HeatingThresholdTemperature = HeatingThresholdTemperature;
Characteristic_1.Characteristic.HeatingThresholdTemperature = HeatingThresholdTemperature;
/**
 * Characteristic "Hold Position"
 */
var HoldPosition = /** @class */ (function (_super) {
    tslib_1.__extends(HoldPosition, _super);
    function HoldPosition() {
        var _this = _super.call(this, "Hold Position", HoldPosition.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HoldPosition.UUID = "0000006F-0000-1000-8000-0026BB765291";
    return HoldPosition;
}(Characteristic_1.Characteristic));
exports.HoldPosition = HoldPosition;
Characteristic_1.Characteristic.HoldPosition = HoldPosition;
/**
 * Characteristic "HomeKit Camera Active"
 */
var HomeKitCameraActive = /** @class */ (function (_super) {
    tslib_1.__extends(HomeKitCameraActive, _super);
    function HomeKitCameraActive() {
        var _this = _super.call(this, "HomeKit Camera Active", HomeKitCameraActive.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HomeKitCameraActive.UUID = "0000021B-0000-1000-8000-0026BB765291";
    HomeKitCameraActive.OFF = 0;
    HomeKitCameraActive.ON = 1;
    return HomeKitCameraActive;
}(Characteristic_1.Characteristic));
exports.HomeKitCameraActive = HomeKitCameraActive;
Characteristic_1.Characteristic.HomeKitCameraActive = HomeKitCameraActive;
/**
 * Characteristic "Hue"
 */
var Hue = /** @class */ (function (_super) {
    tslib_1.__extends(Hue, _super);
    function Hue() {
        var _this = _super.call(this, "Hue", Hue.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "arcdegrees" /* Units.ARC_DEGREE */,
            minValue: 0,
            maxValue: 360,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Hue.UUID = "00000013-0000-1000-8000-0026BB765291";
    return Hue;
}(Characteristic_1.Characteristic));
exports.Hue = Hue;
Characteristic_1.Characteristic.Hue = Hue;
/**
 * Characteristic "Identifier"
 */
var Identifier = /** @class */ (function (_super) {
    tslib_1.__extends(Identifier, _super);
    function Identifier() {
        var _this = _super.call(this, "Identifier", Identifier.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Identifier.UUID = "000000E6-0000-1000-8000-0026BB765291";
    return Identifier;
}(Characteristic_1.Characteristic));
exports.Identifier = Identifier;
Characteristic_1.Characteristic.Identifier = Identifier;
/**
 * Characteristic "Identify"
 */
var Identify = /** @class */ (function (_super) {
    tslib_1.__extends(Identify, _super);
    function Identify() {
        var _this = _super.call(this, "Identify", Identify.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Identify.UUID = "00000014-0000-1000-8000-0026BB765291";
    return Identify;
}(Characteristic_1.Characteristic));
exports.Identify = Identify;
Characteristic_1.Characteristic.Identify = Identify;
/**
 * Characteristic "Image Mirroring"
 */
var ImageMirroring = /** @class */ (function (_super) {
    tslib_1.__extends(ImageMirroring, _super);
    function ImageMirroring() {
        var _this = _super.call(this, "Image Mirroring", ImageMirroring.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ImageMirroring.UUID = "0000011F-0000-1000-8000-0026BB765291";
    return ImageMirroring;
}(Characteristic_1.Characteristic));
exports.ImageMirroring = ImageMirroring;
Characteristic_1.Characteristic.ImageMirroring = ImageMirroring;
/**
 * Characteristic "Image Rotation"
 */
var ImageRotation = /** @class */ (function (_super) {
    tslib_1.__extends(ImageRotation, _super);
    function ImageRotation() {
        var _this = _super.call(this, "Image Rotation", ImageRotation.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "arcdegrees" /* Units.ARC_DEGREE */,
            minValue: 0,
            maxValue: 360,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ImageRotation.UUID = "0000011E-0000-1000-8000-0026BB765291";
    return ImageRotation;
}(Characteristic_1.Characteristic));
exports.ImageRotation = ImageRotation;
Characteristic_1.Characteristic.ImageRotation = ImageRotation;
/**
 * Characteristic "Input Device Type"
 */
var InputDeviceType = /** @class */ (function (_super) {
    tslib_1.__extends(InputDeviceType, _super);
    function InputDeviceType() {
        var _this = _super.call(this, "Input Device Type", InputDeviceType.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 6,
            minStep: 1,
            validValues: [0, 1, 2, 3, 4, 5, 6],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    InputDeviceType.UUID = "000000DC-0000-1000-8000-0026BB765291";
    InputDeviceType.OTHER = 0;
    InputDeviceType.TV = 1;
    InputDeviceType.RECORDING = 2;
    InputDeviceType.TUNER = 3;
    InputDeviceType.PLAYBACK = 4;
    InputDeviceType.AUDIO_SYSTEM = 5;
    return InputDeviceType;
}(Characteristic_1.Characteristic));
exports.InputDeviceType = InputDeviceType;
Characteristic_1.Characteristic.InputDeviceType = InputDeviceType;
/**
 * Characteristic "Input Source Type"
 */
var InputSourceType = /** @class */ (function (_super) {
    tslib_1.__extends(InputSourceType, _super);
    function InputSourceType() {
        var _this = _super.call(this, "Input Source Type", InputSourceType.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 10,
            minStep: 1,
            validValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    InputSourceType.UUID = "000000DB-0000-1000-8000-0026BB765291";
    InputSourceType.OTHER = 0;
    InputSourceType.HOME_SCREEN = 1;
    InputSourceType.TUNER = 2;
    InputSourceType.HDMI = 3;
    InputSourceType.COMPOSITE_VIDEO = 4;
    InputSourceType.S_VIDEO = 5;
    InputSourceType.COMPONENT_VIDEO = 6;
    InputSourceType.DVI = 7;
    InputSourceType.AIRPLAY = 8;
    InputSourceType.USB = 9;
    InputSourceType.APPLICATION = 10;
    return InputSourceType;
}(Characteristic_1.Characteristic));
exports.InputSourceType = InputSourceType;
Characteristic_1.Characteristic.InputSourceType = InputSourceType;
/**
 * Characteristic "In Use"
 */
var InUse = /** @class */ (function (_super) {
    tslib_1.__extends(InUse, _super);
    function InUse() {
        var _this = _super.call(this, "In Use", InUse.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    InUse.UUID = "000000D2-0000-1000-8000-0026BB765291";
    InUse.NOT_IN_USE = 0;
    InUse.IN_USE = 1;
    return InUse;
}(Characteristic_1.Characteristic));
exports.InUse = InUse;
Characteristic_1.Characteristic.InUse = InUse;
/**
 * Characteristic "Is Configured"
 */
var IsConfigured = /** @class */ (function (_super) {
    tslib_1.__extends(IsConfigured, _super);
    function IsConfigured() {
        var _this = _super.call(this, "Is Configured", IsConfigured.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    IsConfigured.UUID = "000000D6-0000-1000-8000-0026BB765291";
    IsConfigured.NOT_CONFIGURED = 0;
    IsConfigured.CONFIGURED = 1;
    return IsConfigured;
}(Characteristic_1.Characteristic));
exports.IsConfigured = IsConfigured;
Characteristic_1.Characteristic.IsConfigured = IsConfigured;
/**
 * Characteristic "Leak Detected"
 */
var LeakDetected = /** @class */ (function (_super) {
    tslib_1.__extends(LeakDetected, _super);
    function LeakDetected() {
        var _this = _super.call(this, "Leak Detected", LeakDetected.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LeakDetected.UUID = "00000070-0000-1000-8000-0026BB765291";
    LeakDetected.LEAK_NOT_DETECTED = 0;
    LeakDetected.LEAK_DETECTED = 1;
    return LeakDetected;
}(Characteristic_1.Characteristic));
exports.LeakDetected = LeakDetected;
Characteristic_1.Characteristic.LeakDetected = LeakDetected;
/**
 * Characteristic "Link Quality"
 * @deprecated Removed and not used anymore
 */
var LinkQuality = /** @class */ (function (_super) {
    tslib_1.__extends(LinkQuality, _super);
    function LinkQuality() {
        var _this = _super.call(this, "Link Quality", LinkQuality.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 1,
            maxValue: 4,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LinkQuality.UUID = "0000009C-0000-1000-8000-0026BB765291";
    return LinkQuality;
}(Characteristic_1.Characteristic));
exports.LinkQuality = LinkQuality;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.LinkQuality = LinkQuality;
/**
 * Characteristic "List Pairings"
 */
var ListPairings = /** @class */ (function (_super) {
    tslib_1.__extends(ListPairings, _super);
    function ListPairings() {
        var _this = _super.call(this, "List Pairings", ListPairings.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ListPairings.UUID = "00000050-0000-1000-8000-0026BB765291";
    return ListPairings;
}(Characteristic_1.Characteristic));
exports.ListPairings = ListPairings;
Characteristic_1.Characteristic.ListPairings = ListPairings;
/**
 * Characteristic "Lock Control Point"
 */
var LockControlPoint = /** @class */ (function (_super) {
    tslib_1.__extends(LockControlPoint, _super);
    function LockControlPoint() {
        var _this = _super.call(this, "Lock Control Point", LockControlPoint.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LockControlPoint.UUID = "00000019-0000-1000-8000-0026BB765291";
    return LockControlPoint;
}(Characteristic_1.Characteristic));
exports.LockControlPoint = LockControlPoint;
Characteristic_1.Characteristic.LockControlPoint = LockControlPoint;
/**
 * Characteristic "Lock Current State"
 */
var LockCurrentState = /** @class */ (function (_super) {
    tslib_1.__extends(LockCurrentState, _super);
    function LockCurrentState() {
        var _this = _super.call(this, "Lock Current State", LockCurrentState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 3,
            minStep: 1,
            validValues: [0, 1, 2, 3],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LockCurrentState.UUID = "0000001D-0000-1000-8000-0026BB765291";
    LockCurrentState.UNSECURED = 0;
    LockCurrentState.SECURED = 1;
    LockCurrentState.JAMMED = 2;
    LockCurrentState.UNKNOWN = 3;
    return LockCurrentState;
}(Characteristic_1.Characteristic));
exports.LockCurrentState = LockCurrentState;
Characteristic_1.Characteristic.LockCurrentState = LockCurrentState;
/**
 * Characteristic "Lock Last Known Action"
 */
var LockLastKnownAction = /** @class */ (function (_super) {
    tslib_1.__extends(LockLastKnownAction, _super);
    function LockLastKnownAction() {
        var _this = _super.call(this, "Lock Last Known Action", LockLastKnownAction.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 10,
            minStep: 1,
            validValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LockLastKnownAction.UUID = "0000001C-0000-1000-8000-0026BB765291";
    LockLastKnownAction.SECURED_PHYSICALLY_INTERIOR = 0;
    LockLastKnownAction.UNSECURED_PHYSICALLY_INTERIOR = 1;
    LockLastKnownAction.SECURED_PHYSICALLY_EXTERIOR = 2;
    LockLastKnownAction.UNSECURED_PHYSICALLY_EXTERIOR = 3;
    LockLastKnownAction.SECURED_BY_KEYPAD = 4;
    LockLastKnownAction.UNSECURED_BY_KEYPAD = 5;
    LockLastKnownAction.SECURED_REMOTELY = 6;
    LockLastKnownAction.UNSECURED_REMOTELY = 7;
    LockLastKnownAction.SECURED_BY_AUTO_SECURE_TIMEOUT = 8;
    LockLastKnownAction.SECURED_PHYSICALLY = 9;
    LockLastKnownAction.UNSECURED_PHYSICALLY = 10;
    return LockLastKnownAction;
}(Characteristic_1.Characteristic));
exports.LockLastKnownAction = LockLastKnownAction;
Characteristic_1.Characteristic.LockLastKnownAction = LockLastKnownAction;
/**
 * Characteristic "Lock Management Auto Security Timeout"
 */
var LockManagementAutoSecurityTimeout = /** @class */ (function (_super) {
    tslib_1.__extends(LockManagementAutoSecurityTimeout, _super);
    function LockManagementAutoSecurityTimeout() {
        var _this = _super.call(this, "Lock Management Auto Security Timeout", LockManagementAutoSecurityTimeout.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "seconds" /* Units.SECONDS */,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LockManagementAutoSecurityTimeout.UUID = "0000001A-0000-1000-8000-0026BB765291";
    return LockManagementAutoSecurityTimeout;
}(Characteristic_1.Characteristic));
exports.LockManagementAutoSecurityTimeout = LockManagementAutoSecurityTimeout;
Characteristic_1.Characteristic.LockManagementAutoSecurityTimeout = LockManagementAutoSecurityTimeout;
/**
 * Characteristic "Lock Physical Controls"
 */
var LockPhysicalControls = /** @class */ (function (_super) {
    tslib_1.__extends(LockPhysicalControls, _super);
    function LockPhysicalControls() {
        var _this = _super.call(this, "Lock Physical Controls", LockPhysicalControls.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LockPhysicalControls.UUID = "000000A7-0000-1000-8000-0026BB765291";
    LockPhysicalControls.CONTROL_LOCK_DISABLED = 0;
    LockPhysicalControls.CONTROL_LOCK_ENABLED = 1;
    return LockPhysicalControls;
}(Characteristic_1.Characteristic));
exports.LockPhysicalControls = LockPhysicalControls;
Characteristic_1.Characteristic.LockPhysicalControls = LockPhysicalControls;
/**
 * Characteristic "Lock Target State"
 */
var LockTargetState = /** @class */ (function (_super) {
    tslib_1.__extends(LockTargetState, _super);
    function LockTargetState() {
        var _this = _super.call(this, "Lock Target State", LockTargetState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LockTargetState.UUID = "0000001E-0000-1000-8000-0026BB765291";
    LockTargetState.UNSECURED = 0;
    LockTargetState.SECURED = 1;
    return LockTargetState;
}(Characteristic_1.Characteristic));
exports.LockTargetState = LockTargetState;
Characteristic_1.Characteristic.LockTargetState = LockTargetState;
/**
 * Characteristic "Logs"
 */
var Logs = /** @class */ (function (_super) {
    tslib_1.__extends(Logs, _super);
    function Logs() {
        var _this = _super.call(this, "Logs", Logs.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Logs.UUID = "0000001F-0000-1000-8000-0026BB765291";
    return Logs;
}(Characteristic_1.Characteristic));
exports.Logs = Logs;
Characteristic_1.Characteristic.Logs = Logs;
/**
 * Characteristic "MAC Retransmission Maximum"
 * @since iOS 14
 */
var MACRetransmissionMaximum = /** @class */ (function (_super) {
    tslib_1.__extends(MACRetransmissionMaximum, _super);
    function MACRetransmissionMaximum() {
        var _this = _super.call(this, "MAC Retransmission Maximum", MACRetransmissionMaximum.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    MACRetransmissionMaximum.UUID = "00000247-0000-1000-8000-0026BB765291";
    return MACRetransmissionMaximum;
}(Characteristic_1.Characteristic));
exports.MACRetransmissionMaximum = MACRetransmissionMaximum;
Characteristic_1.Characteristic.MACRetransmissionMaximum = MACRetransmissionMaximum;
/**
 * Characteristic "MAC Transmission Counters"
 */
var MACTransmissionCounters = /** @class */ (function (_super) {
    tslib_1.__extends(MACTransmissionCounters, _super);
    function MACTransmissionCounters() {
        var _this = _super.call(this, "MAC Transmission Counters", MACTransmissionCounters.UUID, {
            format: "data" /* Formats.DATA */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    MACTransmissionCounters.UUID = "00000248-0000-1000-8000-0026BB765291";
    return MACTransmissionCounters;
}(Characteristic_1.Characteristic));
exports.MACTransmissionCounters = MACTransmissionCounters;
Characteristic_1.Characteristic.MACTransmissionCounters = MACTransmissionCounters;
/**
 * Characteristic "Managed Network Enable"
 */
var ManagedNetworkEnable = /** @class */ (function (_super) {
    tslib_1.__extends(ManagedNetworkEnable, _super);
    function ManagedNetworkEnable() {
        var _this = _super.call(this, "Managed Network Enable", ManagedNetworkEnable.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "tw" /* Perms.TIMED_WRITE */],
            minValue: 0,
            maxValue: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ManagedNetworkEnable.UUID = "00000215-0000-1000-8000-0026BB765291";
    ManagedNetworkEnable.DISABLED = 0;
    ManagedNetworkEnable.ENABLED = 1;
    return ManagedNetworkEnable;
}(Characteristic_1.Characteristic));
exports.ManagedNetworkEnable = ManagedNetworkEnable;
Characteristic_1.Characteristic.ManagedNetworkEnable = ManagedNetworkEnable;
/**
 * Characteristic "Manually Disabled"
 */
var ManuallyDisabled = /** @class */ (function (_super) {
    tslib_1.__extends(ManuallyDisabled, _super);
    function ManuallyDisabled() {
        var _this = _super.call(this, "Manually Disabled", ManuallyDisabled.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ManuallyDisabled.UUID = "00000227-0000-1000-8000-0026BB765291";
    ManuallyDisabled.ENABLED = 0;
    ManuallyDisabled.DISABLED = 1;
    return ManuallyDisabled;
}(Characteristic_1.Characteristic));
exports.ManuallyDisabled = ManuallyDisabled;
Characteristic_1.Characteristic.ManuallyDisabled = ManuallyDisabled;
/**
 * Characteristic "Manufacturer"
 */
var Manufacturer = /** @class */ (function (_super) {
    tslib_1.__extends(Manufacturer, _super);
    function Manufacturer() {
        var _this = _super.call(this, "Manufacturer", Manufacturer.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
            maxLen: 64,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Manufacturer.UUID = "00000020-0000-1000-8000-0026BB765291";
    return Manufacturer;
}(Characteristic_1.Characteristic));
exports.Manufacturer = Manufacturer;
Characteristic_1.Characteristic.Manufacturer = Manufacturer;
/**
 * Characteristic "Maximum Transmit Power"
 * @since iOS 14
 */
var MaximumTransmitPower = /** @class */ (function (_super) {
    tslib_1.__extends(MaximumTransmitPower, _super);
    function MaximumTransmitPower() {
        var _this = _super.call(this, "Maximum Transmit Power", MaximumTransmitPower.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    MaximumTransmitPower.UUID = "00000243-0000-1000-8000-0026BB765291";
    return MaximumTransmitPower;
}(Characteristic_1.Characteristic));
exports.MaximumTransmitPower = MaximumTransmitPower;
Characteristic_1.Characteristic.MaximumTransmitPower = MaximumTransmitPower;
/**
 * Characteristic "Metrics Buffer Full State"
 */
var MetricsBufferFullState = /** @class */ (function (_super) {
    tslib_1.__extends(MetricsBufferFullState, _super);
    function MetricsBufferFullState() {
        var _this = _super.call(this, "Metrics Buffer Full State", MetricsBufferFullState.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    MetricsBufferFullState.UUID = "00000272-0000-1000-8000-0026BB765291";
    return MetricsBufferFullState;
}(Characteristic_1.Characteristic));
exports.MetricsBufferFullState = MetricsBufferFullState;
Characteristic_1.Characteristic.MetricsBufferFullState = MetricsBufferFullState;
/**
 * Characteristic "Model"
 */
var Model = /** @class */ (function (_super) {
    tslib_1.__extends(Model, _super);
    function Model() {
        var _this = _super.call(this, "Model", Model.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
            maxLen: 64,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Model.UUID = "00000021-0000-1000-8000-0026BB765291";
    return Model;
}(Characteristic_1.Characteristic));
exports.Model = Model;
Characteristic_1.Characteristic.Model = Model;
/**
 * Characteristic "Motion Detected"
 */
var MotionDetected = /** @class */ (function (_super) {
    tslib_1.__extends(MotionDetected, _super);
    function MotionDetected() {
        var _this = _super.call(this, "Motion Detected", MotionDetected.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    MotionDetected.UUID = "00000022-0000-1000-8000-0026BB765291";
    return MotionDetected;
}(Characteristic_1.Characteristic));
exports.MotionDetected = MotionDetected;
Characteristic_1.Characteristic.MotionDetected = MotionDetected;
/**
 * Characteristic "Multifunction Button"
 */
var MultifunctionButton = /** @class */ (function (_super) {
    tslib_1.__extends(MultifunctionButton, _super);
    function MultifunctionButton() {
        var _this = _super.call(this, "Multifunction Button", MultifunctionButton.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    MultifunctionButton.UUID = "0000026B-0000-1000-8000-0026BB765291";
    return MultifunctionButton;
}(Characteristic_1.Characteristic));
exports.MultifunctionButton = MultifunctionButton;
Characteristic_1.Characteristic.MultifunctionButton = MultifunctionButton;
/**
 * Characteristic "Mute"
 */
var Mute = /** @class */ (function (_super) {
    tslib_1.__extends(Mute, _super);
    function Mute() {
        var _this = _super.call(this, "Mute", Mute.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Mute.UUID = "0000011A-0000-1000-8000-0026BB765291";
    return Mute;
}(Characteristic_1.Characteristic));
exports.Mute = Mute;
Characteristic_1.Characteristic.Mute = Mute;
/**
 * Characteristic "Name"
 */
var Name = /** @class */ (function (_super) {
    tslib_1.__extends(Name, _super);
    function Name() {
        var _this = _super.call(this, "Name", Name.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
            maxLen: 64,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Name.UUID = "00000023-0000-1000-8000-0026BB765291";
    return Name;
}(Characteristic_1.Characteristic));
exports.Name = Name;
Characteristic_1.Characteristic.Name = Name;
/**
 * Characteristic "Network Access Violation Control"
 */
var NetworkAccessViolationControl = /** @class */ (function (_super) {
    tslib_1.__extends(NetworkAccessViolationControl, _super);
    function NetworkAccessViolationControl() {
        var _this = _super.call(this, "Network Access Violation Control", NetworkAccessViolationControl.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "tw" /* Perms.TIMED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NetworkAccessViolationControl.UUID = "0000021F-0000-1000-8000-0026BB765291";
    return NetworkAccessViolationControl;
}(Characteristic_1.Characteristic));
exports.NetworkAccessViolationControl = NetworkAccessViolationControl;
Characteristic_1.Characteristic.NetworkAccessViolationControl = NetworkAccessViolationControl;
/**
 * Characteristic "Network Client Profile Control"
 */
var NetworkClientProfileControl = /** @class */ (function (_super) {
    tslib_1.__extends(NetworkClientProfileControl, _super);
    function NetworkClientProfileControl() {
        var _this = _super.call(this, "Network Client Profile Control", NetworkClientProfileControl.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "tw" /* Perms.TIMED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NetworkClientProfileControl.UUID = "0000020C-0000-1000-8000-0026BB765291";
    return NetworkClientProfileControl;
}(Characteristic_1.Characteristic));
exports.NetworkClientProfileControl = NetworkClientProfileControl;
Characteristic_1.Characteristic.NetworkClientProfileControl = NetworkClientProfileControl;
/**
 * Characteristic "Network Client Status Control"
 */
var NetworkClientStatusControl = /** @class */ (function (_super) {
    tslib_1.__extends(NetworkClientStatusControl, _super);
    function NetworkClientStatusControl() {
        var _this = _super.call(this, "Network Client Status Control", NetworkClientStatusControl.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NetworkClientStatusControl.UUID = "0000020D-0000-1000-8000-0026BB765291";
    return NetworkClientStatusControl;
}(Characteristic_1.Characteristic));
exports.NetworkClientStatusControl = NetworkClientStatusControl;
Characteristic_1.Characteristic.NetworkClientStatusControl = NetworkClientStatusControl;
/**
 * Characteristic "NFC Access Control Point"
 * @since iOS 15
 */
var NFCAccessControlPoint = /** @class */ (function (_super) {
    tslib_1.__extends(NFCAccessControlPoint, _super);
    function NFCAccessControlPoint() {
        var _this = _super.call(this, "NFC Access Control Point", NFCAccessControlPoint.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NFCAccessControlPoint.UUID = "00000264-0000-1000-8000-0026BB765291";
    return NFCAccessControlPoint;
}(Characteristic_1.Characteristic));
exports.NFCAccessControlPoint = NFCAccessControlPoint;
Characteristic_1.Characteristic.NFCAccessControlPoint = NFCAccessControlPoint;
/**
 * Characteristic "NFC Access Supported Configuration"
 * @since iOS 15
 */
var NFCAccessSupportedConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(NFCAccessSupportedConfiguration, _super);
    function NFCAccessSupportedConfiguration() {
        var _this = _super.call(this, "NFC Access Supported Configuration", NFCAccessSupportedConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NFCAccessSupportedConfiguration.UUID = "00000265-0000-1000-8000-0026BB765291";
    return NFCAccessSupportedConfiguration;
}(Characteristic_1.Characteristic));
exports.NFCAccessSupportedConfiguration = NFCAccessSupportedConfiguration;
Characteristic_1.Characteristic.NFCAccessSupportedConfiguration = NFCAccessSupportedConfiguration;
/**
 * Characteristic "Night Vision"
 */
var NightVision = /** @class */ (function (_super) {
    tslib_1.__extends(NightVision, _super);
    function NightVision() {
        var _this = _super.call(this, "Night Vision", NightVision.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "tw" /* Perms.TIMED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NightVision.UUID = "0000011B-0000-1000-8000-0026BB765291";
    return NightVision;
}(Characteristic_1.Characteristic));
exports.NightVision = NightVision;
Characteristic_1.Characteristic.NightVision = NightVision;
/**
 * Characteristic "Nitrogen Dioxide Density"
 */
var NitrogenDioxideDensity = /** @class */ (function (_super) {
    tslib_1.__extends(NitrogenDioxideDensity, _super);
    function NitrogenDioxideDensity() {
        var _this = _super.call(this, "Nitrogen Dioxide Density", NitrogenDioxideDensity.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1000,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NitrogenDioxideDensity.UUID = "000000C4-0000-1000-8000-0026BB765291";
    return NitrogenDioxideDensity;
}(Characteristic_1.Characteristic));
exports.NitrogenDioxideDensity = NitrogenDioxideDensity;
Characteristic_1.Characteristic.NitrogenDioxideDensity = NitrogenDioxideDensity;
/**
 * Characteristic "Obstruction Detected"
 */
var ObstructionDetected = /** @class */ (function (_super) {
    tslib_1.__extends(ObstructionDetected, _super);
    function ObstructionDetected() {
        var _this = _super.call(this, "Obstruction Detected", ObstructionDetected.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ObstructionDetected.UUID = "00000024-0000-1000-8000-0026BB765291";
    return ObstructionDetected;
}(Characteristic_1.Characteristic));
exports.ObstructionDetected = ObstructionDetected;
Characteristic_1.Characteristic.ObstructionDetected = ObstructionDetected;
/**
 * Characteristic "Occupancy Detected"
 */
var OccupancyDetected = /** @class */ (function (_super) {
    tslib_1.__extends(OccupancyDetected, _super);
    function OccupancyDetected() {
        var _this = _super.call(this, "Occupancy Detected", OccupancyDetected.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    OccupancyDetected.UUID = "00000071-0000-1000-8000-0026BB765291";
    OccupancyDetected.OCCUPANCY_NOT_DETECTED = 0;
    OccupancyDetected.OCCUPANCY_DETECTED = 1;
    return OccupancyDetected;
}(Characteristic_1.Characteristic));
exports.OccupancyDetected = OccupancyDetected;
Characteristic_1.Characteristic.OccupancyDetected = OccupancyDetected;
/**
 * Characteristic "On"
 */
var On = /** @class */ (function (_super) {
    tslib_1.__extends(On, _super);
    function On() {
        var _this = _super.call(this, "On", On.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    On.UUID = "00000025-0000-1000-8000-0026BB765291";
    return On;
}(Characteristic_1.Characteristic));
exports.On = On;
Characteristic_1.Characteristic.On = On;
/**
 * Characteristic "Operating State Response"
 * @since iOS 14
 */
var OperatingStateResponse = /** @class */ (function (_super) {
    tslib_1.__extends(OperatingStateResponse, _super);
    function OperatingStateResponse() {
        var _this = _super.call(this, "Operating State Response", OperatingStateResponse.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    OperatingStateResponse.UUID = "00000232-0000-1000-8000-0026BB765291";
    return OperatingStateResponse;
}(Characteristic_1.Characteristic));
exports.OperatingStateResponse = OperatingStateResponse;
Characteristic_1.Characteristic.OperatingStateResponse = OperatingStateResponse;
/**
 * Characteristic "Optical Zoom"
 */
var OpticalZoom = /** @class */ (function (_super) {
    tslib_1.__extends(OpticalZoom, _super);
    function OpticalZoom() {
        var _this = _super.call(this, "Optical Zoom", OpticalZoom.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minStep: 0.1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    OpticalZoom.UUID = "0000011C-0000-1000-8000-0026BB765291";
    return OpticalZoom;
}(Characteristic_1.Characteristic));
exports.OpticalZoom = OpticalZoom;
Characteristic_1.Characteristic.OpticalZoom = OpticalZoom;
/**
 * Characteristic "Outlet In Use"
 */
var OutletInUse = /** @class */ (function (_super) {
    tslib_1.__extends(OutletInUse, _super);
    function OutletInUse() {
        var _this = _super.call(this, "Outlet In Use", OutletInUse.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    OutletInUse.UUID = "00000026-0000-1000-8000-0026BB765291";
    return OutletInUse;
}(Characteristic_1.Characteristic));
exports.OutletInUse = OutletInUse;
Characteristic_1.Characteristic.OutletInUse = OutletInUse;
/**
 * Characteristic "Ozone Density"
 */
var OzoneDensity = /** @class */ (function (_super) {
    tslib_1.__extends(OzoneDensity, _super);
    function OzoneDensity() {
        var _this = _super.call(this, "Ozone Density", OzoneDensity.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1000,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    OzoneDensity.UUID = "000000C3-0000-1000-8000-0026BB765291";
    return OzoneDensity;
}(Characteristic_1.Characteristic));
exports.OzoneDensity = OzoneDensity;
Characteristic_1.Characteristic.OzoneDensity = OzoneDensity;
/**
 * Characteristic "Pairing Features"
 */
var PairingFeatures = /** @class */ (function (_super) {
    tslib_1.__extends(PairingFeatures, _super);
    function PairingFeatures() {
        var _this = _super.call(this, "Pairing Features", PairingFeatures.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PairingFeatures.UUID = "0000004F-0000-1000-8000-0026BB765291";
    return PairingFeatures;
}(Characteristic_1.Characteristic));
exports.PairingFeatures = PairingFeatures;
Characteristic_1.Characteristic.PairingFeatures = PairingFeatures;
/**
 * Characteristic "Pair Setup"
 */
var PairSetup = /** @class */ (function (_super) {
    tslib_1.__extends(PairSetup, _super);
    function PairSetup() {
        var _this = _super.call(this, "Pair Setup", PairSetup.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PairSetup.UUID = "0000004C-0000-1000-8000-0026BB765291";
    return PairSetup;
}(Characteristic_1.Characteristic));
exports.PairSetup = PairSetup;
Characteristic_1.Characteristic.PairSetup = PairSetup;
/**
 * Characteristic "Pair Verify"
 */
var PairVerify = /** @class */ (function (_super) {
    tslib_1.__extends(PairVerify, _super);
    function PairVerify() {
        var _this = _super.call(this, "Pair Verify", PairVerify.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PairVerify.UUID = "0000004E-0000-1000-8000-0026BB765291";
    return PairVerify;
}(Characteristic_1.Characteristic));
exports.PairVerify = PairVerify;
Characteristic_1.Characteristic.PairVerify = PairVerify;
/**
 * Characteristic "Password Setting"
 */
var PasswordSetting = /** @class */ (function (_super) {
    tslib_1.__extends(PasswordSetting, _super);
    function PasswordSetting() {
        var _this = _super.call(this, "Password Setting", PasswordSetting.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PasswordSetting.UUID = "000000E4-0000-1000-8000-0026BB765291";
    return PasswordSetting;
}(Characteristic_1.Characteristic));
exports.PasswordSetting = PasswordSetting;
Characteristic_1.Characteristic.PasswordSetting = PasswordSetting;
/**
 * Characteristic "Periodic Snapshots Active"
 */
var PeriodicSnapshotsActive = /** @class */ (function (_super) {
    tslib_1.__extends(PeriodicSnapshotsActive, _super);
    function PeriodicSnapshotsActive() {
        var _this = _super.call(this, "Periodic Snapshots Active", PeriodicSnapshotsActive.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PeriodicSnapshotsActive.UUID = "00000225-0000-1000-8000-0026BB765291";
    PeriodicSnapshotsActive.DISABLE = 0;
    PeriodicSnapshotsActive.ENABLE = 1;
    return PeriodicSnapshotsActive;
}(Characteristic_1.Characteristic));
exports.PeriodicSnapshotsActive = PeriodicSnapshotsActive;
Characteristic_1.Characteristic.PeriodicSnapshotsActive = PeriodicSnapshotsActive;
/**
 * Characteristic "Picture Mode"
 */
var PictureMode = /** @class */ (function (_super) {
    tslib_1.__extends(PictureMode, _super);
    function PictureMode() {
        var _this = _super.call(this, "Picture Mode", PictureMode.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 13,
            minStep: 1,
            validValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PictureMode.UUID = "000000E2-0000-1000-8000-0026BB765291";
    PictureMode.OTHER = 0;
    PictureMode.STANDARD = 1;
    PictureMode.CALIBRATED = 2;
    PictureMode.CALIBRATED_DARK = 3;
    PictureMode.VIVID = 4;
    PictureMode.GAME = 5;
    PictureMode.COMPUTER = 6;
    PictureMode.CUSTOM = 7;
    return PictureMode;
}(Characteristic_1.Characteristic));
exports.PictureMode = PictureMode;
Characteristic_1.Characteristic.PictureMode = PictureMode;
/**
 * Characteristic "Ping"
 * @since iOS 14
 */
var Ping = /** @class */ (function (_super) {
    tslib_1.__extends(Ping, _super);
    function Ping() {
        var _this = _super.call(this, "Ping", Ping.UUID, {
            format: "data" /* Formats.DATA */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Ping.UUID = "0000023C-0000-1000-8000-0026BB765291";
    return Ping;
}(Characteristic_1.Characteristic));
exports.Ping = Ping;
Characteristic_1.Characteristic.Ping = Ping;
/**
 * Characteristic "PM10 Density"
 */
var PM10Density = /** @class */ (function (_super) {
    tslib_1.__extends(PM10Density, _super);
    function PM10Density() {
        var _this = _super.call(this, "PM10 Density", PM10Density.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1000,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PM10Density.UUID = "000000C7-0000-1000-8000-0026BB765291";
    return PM10Density;
}(Characteristic_1.Characteristic));
exports.PM10Density = PM10Density;
Characteristic_1.Characteristic.PM10Density = PM10Density;
/**
 * Characteristic "PM2.5 Density"
 */
var PM2_5Density = /** @class */ (function (_super) {
    tslib_1.__extends(PM2_5Density, _super);
    function PM2_5Density() {
        var _this = _super.call(this, "PM2.5 Density", PM2_5Density.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1000,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PM2_5Density.UUID = "000000C6-0000-1000-8000-0026BB765291";
    return PM2_5Density;
}(Characteristic_1.Characteristic));
exports.PM2_5Density = PM2_5Density;
Characteristic_1.Characteristic.PM2_5Density = PM2_5Density;
/**
 * Characteristic "Position State"
 */
var PositionState = /** @class */ (function (_super) {
    tslib_1.__extends(PositionState, _super);
    function PositionState() {
        var _this = _super.call(this, "Position State", PositionState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PositionState.UUID = "00000072-0000-1000-8000-0026BB765291";
    PositionState.DECREASING = 0;
    PositionState.INCREASING = 1;
    PositionState.STOPPED = 2;
    return PositionState;
}(Characteristic_1.Characteristic));
exports.PositionState = PositionState;
Characteristic_1.Characteristic.PositionState = PositionState;
/**
 * Characteristic "Power Mode Selection"
 */
var PowerModeSelection = /** @class */ (function (_super) {
    tslib_1.__extends(PowerModeSelection, _super);
    function PowerModeSelection() {
        var _this = _super.call(this, "Power Mode Selection", PowerModeSelection.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PowerModeSelection.UUID = "000000DF-0000-1000-8000-0026BB765291";
    PowerModeSelection.SHOW = 0;
    PowerModeSelection.HIDE = 1;
    return PowerModeSelection;
}(Characteristic_1.Characteristic));
exports.PowerModeSelection = PowerModeSelection;
Characteristic_1.Characteristic.PowerModeSelection = PowerModeSelection;
/**
 * Characteristic "Product Data"
 */
var ProductData = /** @class */ (function (_super) {
    tslib_1.__extends(ProductData, _super);
    function ProductData() {
        var _this = _super.call(this, "Product Data", ProductData.UUID, {
            format: "data" /* Formats.DATA */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ProductData.UUID = "00000220-0000-1000-8000-0026BB765291";
    return ProductData;
}(Characteristic_1.Characteristic));
exports.ProductData = ProductData;
Characteristic_1.Characteristic.ProductData = ProductData;
/**
 * Characteristic "Programmable Switch Event"
 */
var ProgrammableSwitchEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ProgrammableSwitchEvent, _super);
    function ProgrammableSwitchEvent() {
        var _this = _super.call(this, "Programmable Switch Event", ProgrammableSwitchEvent.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ProgrammableSwitchEvent.UUID = "00000073-0000-1000-8000-0026BB765291";
    ProgrammableSwitchEvent.SINGLE_PRESS = 0;
    ProgrammableSwitchEvent.DOUBLE_PRESS = 1;
    ProgrammableSwitchEvent.LONG_PRESS = 2;
    return ProgrammableSwitchEvent;
}(Characteristic_1.Characteristic));
exports.ProgrammableSwitchEvent = ProgrammableSwitchEvent;
Characteristic_1.Characteristic.ProgrammableSwitchEvent = ProgrammableSwitchEvent;
/**
 * Characteristic "Programmable Switch Output State"
 */
var ProgrammableSwitchOutputState = /** @class */ (function (_super) {
    tslib_1.__extends(ProgrammableSwitchOutputState, _super);
    function ProgrammableSwitchOutputState() {
        var _this = _super.call(this, "Programmable Switch Output State", ProgrammableSwitchOutputState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ProgrammableSwitchOutputState.UUID = "00000074-0000-1000-8000-0026BB765291";
    return ProgrammableSwitchOutputState;
}(Characteristic_1.Characteristic));
exports.ProgrammableSwitchOutputState = ProgrammableSwitchOutputState;
Characteristic_1.Characteristic.ProgrammableSwitchOutputState = ProgrammableSwitchOutputState;
/**
 * Characteristic "Program Mode"
 */
var ProgramMode = /** @class */ (function (_super) {
    tslib_1.__extends(ProgramMode, _super);
    function ProgramMode() {
        var _this = _super.call(this, "Program Mode", ProgramMode.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ProgramMode.UUID = "000000D1-0000-1000-8000-0026BB765291";
    ProgramMode.NO_PROGRAM_SCHEDULED = 0;
    ProgramMode.PROGRAM_SCHEDULED = 1;
    ProgramMode.PROGRAM_SCHEDULED_MANUAL_MODE_ = 2;
    return ProgramMode;
}(Characteristic_1.Characteristic));
exports.ProgramMode = ProgramMode;
Characteristic_1.Characteristic.ProgramMode = ProgramMode;
/**
 * Characteristic "Reachable"
 * @deprecated Removed and not used anymore
 */
var Reachable = /** @class */ (function (_super) {
    tslib_1.__extends(Reachable, _super);
    function Reachable() {
        var _this = _super.call(this, "Reachable", Reachable.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Reachable.UUID = "00000063-0000-1000-8000-0026BB765291";
    return Reachable;
}(Characteristic_1.Characteristic));
exports.Reachable = Reachable;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.Reachable = Reachable;
/**
 * Characteristic "Received Signal Strength Indication"
 * @since iOS 14
 */
var ReceivedSignalStrengthIndication = /** @class */ (function (_super) {
    tslib_1.__extends(ReceivedSignalStrengthIndication, _super);
    function ReceivedSignalStrengthIndication() {
        var _this = _super.call(this, "Received Signal Strength Indication", ReceivedSignalStrengthIndication.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ReceivedSignalStrengthIndication.UUID = "0000023F-0000-1000-8000-0026BB765291";
    return ReceivedSignalStrengthIndication;
}(Characteristic_1.Characteristic));
exports.ReceivedSignalStrengthIndication = ReceivedSignalStrengthIndication;
Characteristic_1.Characteristic.ReceivedSignalStrengthIndication = ReceivedSignalStrengthIndication;
/**
 * Characteristic "Receiver Sensitivity"
 * @since iOS 14
 */
var ReceiverSensitivity = /** @class */ (function (_super) {
    tslib_1.__extends(ReceiverSensitivity, _super);
    function ReceiverSensitivity() {
        var _this = _super.call(this, "Receiver Sensitivity", ReceiverSensitivity.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ReceiverSensitivity.UUID = "00000244-0000-1000-8000-0026BB765291";
    return ReceiverSensitivity;
}(Characteristic_1.Characteristic));
exports.ReceiverSensitivity = ReceiverSensitivity;
Characteristic_1.Characteristic.ReceiverSensitivity = ReceiverSensitivity;
/**
 * Characteristic "Recording Audio Active"
 */
var RecordingAudioActive = /** @class */ (function (_super) {
    tslib_1.__extends(RecordingAudioActive, _super);
    function RecordingAudioActive() {
        var _this = _super.call(this, "Recording Audio Active", RecordingAudioActive.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "tw" /* Perms.TIMED_WRITE */],
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RecordingAudioActive.UUID = "00000226-0000-1000-8000-0026BB765291";
    RecordingAudioActive.DISABLE = 0;
    RecordingAudioActive.ENABLE = 1;
    return RecordingAudioActive;
}(Characteristic_1.Characteristic));
exports.RecordingAudioActive = RecordingAudioActive;
Characteristic_1.Characteristic.RecordingAudioActive = RecordingAudioActive;
/**
 * Characteristic "Relative Humidity Dehumidifier Threshold"
 */
var RelativeHumidityDehumidifierThreshold = /** @class */ (function (_super) {
    tslib_1.__extends(RelativeHumidityDehumidifierThreshold, _super);
    function RelativeHumidityDehumidifierThreshold() {
        var _this = _super.call(this, "Relative Humidity Dehumidifier Threshold", RelativeHumidityDehumidifierThreshold.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RelativeHumidityDehumidifierThreshold.UUID = "000000C9-0000-1000-8000-0026BB765291";
    return RelativeHumidityDehumidifierThreshold;
}(Characteristic_1.Characteristic));
exports.RelativeHumidityDehumidifierThreshold = RelativeHumidityDehumidifierThreshold;
Characteristic_1.Characteristic.RelativeHumidityDehumidifierThreshold = RelativeHumidityDehumidifierThreshold;
/**
 * Characteristic "Relative Humidity Humidifier Threshold"
 */
var RelativeHumidityHumidifierThreshold = /** @class */ (function (_super) {
    tslib_1.__extends(RelativeHumidityHumidifierThreshold, _super);
    function RelativeHumidityHumidifierThreshold() {
        var _this = _super.call(this, "Relative Humidity Humidifier Threshold", RelativeHumidityHumidifierThreshold.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RelativeHumidityHumidifierThreshold.UUID = "000000CA-0000-1000-8000-0026BB765291";
    return RelativeHumidityHumidifierThreshold;
}(Characteristic_1.Characteristic));
exports.RelativeHumidityHumidifierThreshold = RelativeHumidityHumidifierThreshold;
Characteristic_1.Characteristic.RelativeHumidityHumidifierThreshold = RelativeHumidityHumidifierThreshold;
/**
 * Characteristic "Relay Control Point"
 */
var RelayControlPoint = /** @class */ (function (_super) {
    tslib_1.__extends(RelayControlPoint, _super);
    function RelayControlPoint() {
        var _this = _super.call(this, "Relay Control Point", RelayControlPoint.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RelayControlPoint.UUID = "0000005E-0000-1000-8000-0026BB765291";
    return RelayControlPoint;
}(Characteristic_1.Characteristic));
exports.RelayControlPoint = RelayControlPoint;
Characteristic_1.Characteristic.RelayControlPoint = RelayControlPoint;
/**
 * Characteristic "Relay Enabled"
 */
var RelayEnabled = /** @class */ (function (_super) {
    tslib_1.__extends(RelayEnabled, _super);
    function RelayEnabled() {
        var _this = _super.call(this, "Relay Enabled", RelayEnabled.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RelayEnabled.UUID = "0000005B-0000-1000-8000-0026BB765291";
    return RelayEnabled;
}(Characteristic_1.Characteristic));
exports.RelayEnabled = RelayEnabled;
Characteristic_1.Characteristic.RelayEnabled = RelayEnabled;
/**
 * Characteristic "Relay State"
 */
var RelayState = /** @class */ (function (_super) {
    tslib_1.__extends(RelayState, _super);
    function RelayState() {
        var _this = _super.call(this, "Relay State", RelayState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 5,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RelayState.UUID = "0000005C-0000-1000-8000-0026BB765291";
    return RelayState;
}(Characteristic_1.Characteristic));
exports.RelayState = RelayState;
Characteristic_1.Characteristic.RelayState = RelayState;
/**
 * Characteristic "Remaining Duration"
 */
var RemainingDuration = /** @class */ (function (_super) {
    tslib_1.__extends(RemainingDuration, _super);
    function RemainingDuration() {
        var _this = _super.call(this, "Remaining Duration", RemainingDuration.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "seconds" /* Units.SECONDS */,
            minValue: 0,
            maxValue: 3600,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RemainingDuration.UUID = "000000D4-0000-1000-8000-0026BB765291";
    return RemainingDuration;
}(Characteristic_1.Characteristic));
exports.RemainingDuration = RemainingDuration;
Characteristic_1.Characteristic.RemainingDuration = RemainingDuration;
/**
 * Characteristic "Remote Key"
 */
var RemoteKey = /** @class */ (function (_super) {
    tslib_1.__extends(RemoteKey, _super);
    function RemoteKey() {
        var _this = _super.call(this, "Remote Key", RemoteKey.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 16,
            minStep: 1,
            validValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RemoteKey.UUID = "000000E1-0000-1000-8000-0026BB765291";
    RemoteKey.REWIND = 0;
    RemoteKey.FAST_FORWARD = 1;
    RemoteKey.NEXT_TRACK = 2;
    RemoteKey.PREVIOUS_TRACK = 3;
    RemoteKey.ARROW_UP = 4;
    RemoteKey.ARROW_DOWN = 5;
    RemoteKey.ARROW_LEFT = 6;
    RemoteKey.ARROW_RIGHT = 7;
    RemoteKey.SELECT = 8;
    RemoteKey.BACK = 9;
    RemoteKey.EXIT = 10;
    RemoteKey.PLAY_PAUSE = 11;
    RemoteKey.INFORMATION = 15;
    return RemoteKey;
}(Characteristic_1.Characteristic));
exports.RemoteKey = RemoteKey;
Characteristic_1.Characteristic.RemoteKey = RemoteKey;
/**
 * Characteristic "Reset Filter Indication"
 */
var ResetFilterIndication = /** @class */ (function (_super) {
    tslib_1.__extends(ResetFilterIndication, _super);
    function ResetFilterIndication() {
        var _this = _super.call(this, "Reset Filter Indication", ResetFilterIndication.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
            minValue: 1,
            maxValue: 1,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ResetFilterIndication.UUID = "000000AD-0000-1000-8000-0026BB765291";
    return ResetFilterIndication;
}(Characteristic_1.Characteristic));
exports.ResetFilterIndication = ResetFilterIndication;
Characteristic_1.Characteristic.ResetFilterIndication = ResetFilterIndication;
/**
 * Characteristic "Rotation Direction"
 */
var RotationDirection = /** @class */ (function (_super) {
    tslib_1.__extends(RotationDirection, _super);
    function RotationDirection() {
        var _this = _super.call(this, "Rotation Direction", RotationDirection.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RotationDirection.UUID = "00000028-0000-1000-8000-0026BB765291";
    RotationDirection.CLOCKWISE = 0;
    RotationDirection.COUNTER_CLOCKWISE = 1;
    return RotationDirection;
}(Characteristic_1.Characteristic));
exports.RotationDirection = RotationDirection;
Characteristic_1.Characteristic.RotationDirection = RotationDirection;
/**
 * Characteristic "Rotation Speed"
 */
var RotationSpeed = /** @class */ (function (_super) {
    tslib_1.__extends(RotationSpeed, _super);
    function RotationSpeed() {
        var _this = _super.call(this, "Rotation Speed", RotationSpeed.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RotationSpeed.UUID = "00000029-0000-1000-8000-0026BB765291";
    return RotationSpeed;
}(Characteristic_1.Characteristic));
exports.RotationSpeed = RotationSpeed;
Characteristic_1.Characteristic.RotationSpeed = RotationSpeed;
/**
 * Characteristic "Router Status"
 */
var RouterStatus = /** @class */ (function (_super) {
    tslib_1.__extends(RouterStatus, _super);
    function RouterStatus() {
        var _this = _super.call(this, "Router Status", RouterStatus.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RouterStatus.UUID = "0000020E-0000-1000-8000-0026BB765291";
    RouterStatus.READY = 0;
    RouterStatus.NOT_READY = 1;
    return RouterStatus;
}(Characteristic_1.Characteristic));
exports.RouterStatus = RouterStatus;
Characteristic_1.Characteristic.RouterStatus = RouterStatus;
/**
 * Characteristic "Saturation"
 */
var Saturation = /** @class */ (function (_super) {
    tslib_1.__extends(Saturation, _super);
    function Saturation() {
        var _this = _super.call(this, "Saturation", Saturation.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Saturation.UUID = "0000002F-0000-1000-8000-0026BB765291";
    return Saturation;
}(Characteristic_1.Characteristic));
exports.Saturation = Saturation;
Characteristic_1.Characteristic.Saturation = Saturation;
/**
 * Characteristic "Security System Alarm Type"
 */
var SecuritySystemAlarmType = /** @class */ (function (_super) {
    tslib_1.__extends(SecuritySystemAlarmType, _super);
    function SecuritySystemAlarmType() {
        var _this = _super.call(this, "Security System Alarm Type", SecuritySystemAlarmType.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SecuritySystemAlarmType.UUID = "0000008E-0000-1000-8000-0026BB765291";
    return SecuritySystemAlarmType;
}(Characteristic_1.Characteristic));
exports.SecuritySystemAlarmType = SecuritySystemAlarmType;
Characteristic_1.Characteristic.SecuritySystemAlarmType = SecuritySystemAlarmType;
/**
 * Characteristic "Security System Current State"
 */
var SecuritySystemCurrentState = /** @class */ (function (_super) {
    tslib_1.__extends(SecuritySystemCurrentState, _super);
    function SecuritySystemCurrentState() {
        var _this = _super.call(this, "Security System Current State", SecuritySystemCurrentState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 4,
            minStep: 1,
            validValues: [0, 1, 2, 3, 4],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SecuritySystemCurrentState.UUID = "00000066-0000-1000-8000-0026BB765291";
    SecuritySystemCurrentState.STAY_ARM = 0;
    SecuritySystemCurrentState.AWAY_ARM = 1;
    SecuritySystemCurrentState.NIGHT_ARM = 2;
    SecuritySystemCurrentState.DISARMED = 3;
    SecuritySystemCurrentState.ALARM_TRIGGERED = 4;
    return SecuritySystemCurrentState;
}(Characteristic_1.Characteristic));
exports.SecuritySystemCurrentState = SecuritySystemCurrentState;
Characteristic_1.Characteristic.SecuritySystemCurrentState = SecuritySystemCurrentState;
/**
 * Characteristic "Security System Target State"
 */
var SecuritySystemTargetState = /** @class */ (function (_super) {
    tslib_1.__extends(SecuritySystemTargetState, _super);
    function SecuritySystemTargetState() {
        var _this = _super.call(this, "Security System Target State", SecuritySystemTargetState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 3,
            minStep: 1,
            validValues: [0, 1, 2, 3],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SecuritySystemTargetState.UUID = "00000067-0000-1000-8000-0026BB765291";
    SecuritySystemTargetState.STAY_ARM = 0;
    SecuritySystemTargetState.AWAY_ARM = 1;
    SecuritySystemTargetState.NIGHT_ARM = 2;
    SecuritySystemTargetState.DISARM = 3;
    return SecuritySystemTargetState;
}(Characteristic_1.Characteristic));
exports.SecuritySystemTargetState = SecuritySystemTargetState;
Characteristic_1.Characteristic.SecuritySystemTargetState = SecuritySystemTargetState;
/**
 * Characteristic "Selected Audio Stream Configuration"
 */
var SelectedAudioStreamConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SelectedAudioStreamConfiguration, _super);
    function SelectedAudioStreamConfiguration() {
        var _this = _super.call(this, "Selected Audio Stream Configuration", SelectedAudioStreamConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SelectedAudioStreamConfiguration.UUID = "00000128-0000-1000-8000-0026BB765291";
    return SelectedAudioStreamConfiguration;
}(Characteristic_1.Characteristic));
exports.SelectedAudioStreamConfiguration = SelectedAudioStreamConfiguration;
Characteristic_1.Characteristic.SelectedAudioStreamConfiguration = SelectedAudioStreamConfiguration;
/**
 * Characteristic "Selected Camera Recording Configuration"
 */
var SelectedCameraRecordingConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SelectedCameraRecordingConfiguration, _super);
    function SelectedCameraRecordingConfiguration() {
        var _this = _super.call(this, "Selected Camera Recording Configuration", SelectedCameraRecordingConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SelectedCameraRecordingConfiguration.UUID = "00000209-0000-1000-8000-0026BB765291";
    return SelectedCameraRecordingConfiguration;
}(Characteristic_1.Characteristic));
exports.SelectedCameraRecordingConfiguration = SelectedCameraRecordingConfiguration;
Characteristic_1.Characteristic.SelectedCameraRecordingConfiguration = SelectedCameraRecordingConfiguration;
/**
 * Characteristic "Selected Diagnostics Modes"
 */
var SelectedDiagnosticsModes = /** @class */ (function (_super) {
    tslib_1.__extends(SelectedDiagnosticsModes, _super);
    function SelectedDiagnosticsModes() {
        var _this = _super.call(this, "Selected Diagnostics Modes", SelectedDiagnosticsModes.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SelectedDiagnosticsModes.UUID = "0000024D-0000-1000-8000-0026BB765291";
    return SelectedDiagnosticsModes;
}(Characteristic_1.Characteristic));
exports.SelectedDiagnosticsModes = SelectedDiagnosticsModes;
Characteristic_1.Characteristic.SelectedDiagnosticsModes = SelectedDiagnosticsModes;
/**
 * Characteristic "Selected RTP Stream Configuration"
 */
var SelectedRTPStreamConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SelectedRTPStreamConfiguration, _super);
    function SelectedRTPStreamConfiguration() {
        var _this = _super.call(this, "Selected RTP Stream Configuration", SelectedRTPStreamConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SelectedRTPStreamConfiguration.UUID = "00000117-0000-1000-8000-0026BB765291";
    return SelectedRTPStreamConfiguration;
}(Characteristic_1.Characteristic));
exports.SelectedRTPStreamConfiguration = SelectedRTPStreamConfiguration;
Characteristic_1.Characteristic.SelectedRTPStreamConfiguration = SelectedRTPStreamConfiguration;
/**
 * Characteristic "Selected Sleep Configuration"
 */
var SelectedSleepConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SelectedSleepConfiguration, _super);
    function SelectedSleepConfiguration() {
        var _this = _super.call(this, "Selected Sleep Configuration", SelectedSleepConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SelectedSleepConfiguration.UUID = "00000252-0000-1000-8000-0026BB765291";
    return SelectedSleepConfiguration;
}(Characteristic_1.Characteristic));
exports.SelectedSleepConfiguration = SelectedSleepConfiguration;
Characteristic_1.Characteristic.SelectedSleepConfiguration = SelectedSleepConfiguration;
/**
 * Characteristic "Serial Number"
 */
var SerialNumber = /** @class */ (function (_super) {
    tslib_1.__extends(SerialNumber, _super);
    function SerialNumber() {
        var _this = _super.call(this, "Serial Number", SerialNumber.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
            maxLen: 64,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SerialNumber.UUID = "00000030-0000-1000-8000-0026BB765291";
    return SerialNumber;
}(Characteristic_1.Characteristic));
exports.SerialNumber = SerialNumber;
Characteristic_1.Characteristic.SerialNumber = SerialNumber;
/**
 * Characteristic "Service Label Index"
 */
var ServiceLabelIndex = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceLabelIndex, _super);
    function ServiceLabelIndex() {
        var _this = _super.call(this, "Service Label Index", ServiceLabelIndex.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
            minValue: 1,
            maxValue: 255,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ServiceLabelIndex.UUID = "000000CB-0000-1000-8000-0026BB765291";
    return ServiceLabelIndex;
}(Characteristic_1.Characteristic));
exports.ServiceLabelIndex = ServiceLabelIndex;
Characteristic_1.Characteristic.ServiceLabelIndex = ServiceLabelIndex;
/**
 * Characteristic "Service Label Namespace"
 */
var ServiceLabelNamespace = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceLabelNamespace, _super);
    function ServiceLabelNamespace() {
        var _this = _super.call(this, "Service Label Namespace", ServiceLabelNamespace.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ServiceLabelNamespace.UUID = "000000CD-0000-1000-8000-0026BB765291";
    ServiceLabelNamespace.DOTS = 0;
    ServiceLabelNamespace.ARABIC_NUMERALS = 1;
    return ServiceLabelNamespace;
}(Characteristic_1.Characteristic));
exports.ServiceLabelNamespace = ServiceLabelNamespace;
Characteristic_1.Characteristic.ServiceLabelNamespace = ServiceLabelNamespace;
/**
 * Characteristic "Set Duration"
 */
var SetDuration = /** @class */ (function (_super) {
    tslib_1.__extends(SetDuration, _super);
    function SetDuration() {
        var _this = _super.call(this, "Set Duration", SetDuration.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "seconds" /* Units.SECONDS */,
            minValue: 0,
            maxValue: 3600,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SetDuration.UUID = "000000D3-0000-1000-8000-0026BB765291";
    return SetDuration;
}(Characteristic_1.Characteristic));
exports.SetDuration = SetDuration;
Characteristic_1.Characteristic.SetDuration = SetDuration;
/**
 * Characteristic "Setup Data Stream Transport"
 */
var SetupDataStreamTransport = /** @class */ (function (_super) {
    tslib_1.__extends(SetupDataStreamTransport, _super);
    function SetupDataStreamTransport() {
        var _this = _super.call(this, "Setup Data Stream Transport", SetupDataStreamTransport.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SetupDataStreamTransport.UUID = "00000131-0000-1000-8000-0026BB765291";
    return SetupDataStreamTransport;
}(Characteristic_1.Characteristic));
exports.SetupDataStreamTransport = SetupDataStreamTransport;
Characteristic_1.Characteristic.SetupDataStreamTransport = SetupDataStreamTransport;
/**
 * Characteristic "Setup Endpoints"
 */
var SetupEndpoints = /** @class */ (function (_super) {
    tslib_1.__extends(SetupEndpoints, _super);
    function SetupEndpoints() {
        var _this = _super.call(this, "Setup Endpoints", SetupEndpoints.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SetupEndpoints.UUID = "00000118-0000-1000-8000-0026BB765291";
    return SetupEndpoints;
}(Characteristic_1.Characteristic));
exports.SetupEndpoints = SetupEndpoints;
Characteristic_1.Characteristic.SetupEndpoints = SetupEndpoints;
/**
 * Characteristic "Setup Transfer Transport"
 * @since iOS 13.4
 */
var SetupTransferTransport = /** @class */ (function (_super) {
    tslib_1.__extends(SetupTransferTransport, _super);
    function SetupTransferTransport() {
        var _this = _super.call(this, "Setup Transfer Transport", SetupTransferTransport.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pw" /* Perms.PAIRED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SetupTransferTransport.UUID = "00000201-0000-1000-8000-0026BB765291";
    return SetupTransferTransport;
}(Characteristic_1.Characteristic));
exports.SetupTransferTransport = SetupTransferTransport;
Characteristic_1.Characteristic.SetupTransferTransport = SetupTransferTransport;
/**
 * Characteristic "Signal To Noise Ratio"
 * @since iOS 14
 */
var SignalToNoiseRatio = /** @class */ (function (_super) {
    tslib_1.__extends(SignalToNoiseRatio, _super);
    function SignalToNoiseRatio() {
        var _this = _super.call(this, "Signal To Noise Ratio", SignalToNoiseRatio.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SignalToNoiseRatio.UUID = "00000241-0000-1000-8000-0026BB765291";
    return SignalToNoiseRatio;
}(Characteristic_1.Characteristic));
exports.SignalToNoiseRatio = SignalToNoiseRatio;
Characteristic_1.Characteristic.SignalToNoiseRatio = SignalToNoiseRatio;
/**
 * Characteristic "Siri Enable"
 */
var SiriEnable = /** @class */ (function (_super) {
    tslib_1.__extends(SiriEnable, _super);
    function SiriEnable() {
        var _this = _super.call(this, "Siri Enable", SiriEnable.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SiriEnable.UUID = "00000255-0000-1000-8000-0026BB765291";
    return SiriEnable;
}(Characteristic_1.Characteristic));
exports.SiriEnable = SiriEnable;
Characteristic_1.Characteristic.SiriEnable = SiriEnable;
/**
 * Characteristic "Siri Endpoint Session Status"
 */
var SiriEndpointSessionStatus = /** @class */ (function (_super) {
    tslib_1.__extends(SiriEndpointSessionStatus, _super);
    function SiriEndpointSessionStatus() {
        var _this = _super.call(this, "Siri Endpoint Session Status", SiriEndpointSessionStatus.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SiriEndpointSessionStatus.UUID = "00000254-0000-1000-8000-0026BB765291";
    return SiriEndpointSessionStatus;
}(Characteristic_1.Characteristic));
exports.SiriEndpointSessionStatus = SiriEndpointSessionStatus;
Characteristic_1.Characteristic.SiriEndpointSessionStatus = SiriEndpointSessionStatus;
/**
 * Characteristic "Siri Engine Version"
 */
var SiriEngineVersion = /** @class */ (function (_super) {
    tslib_1.__extends(SiriEngineVersion, _super);
    function SiriEngineVersion() {
        var _this = _super.call(this, "Siri Engine Version", SiriEngineVersion.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SiriEngineVersion.UUID = "0000025A-0000-1000-8000-0026BB765291";
    return SiriEngineVersion;
}(Characteristic_1.Characteristic));
exports.SiriEngineVersion = SiriEngineVersion;
Characteristic_1.Characteristic.SiriEngineVersion = SiriEngineVersion;
/**
 * Characteristic "Siri Input Type"
 */
var SiriInputType = /** @class */ (function (_super) {
    tslib_1.__extends(SiriInputType, _super);
    function SiriInputType() {
        var _this = _super.call(this, "Siri Input Type", SiriInputType.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 0,
            validValues: [0],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SiriInputType.UUID = "00000132-0000-1000-8000-0026BB765291";
    SiriInputType.PUSH_BUTTON_TRIGGERED_APPLE_TV = 0;
    return SiriInputType;
}(Characteristic_1.Characteristic));
exports.SiriInputType = SiriInputType;
Characteristic_1.Characteristic.SiriInputType = SiriInputType;
/**
 * Characteristic "Siri Light On Use"
 */
var SiriLightOnUse = /** @class */ (function (_super) {
    tslib_1.__extends(SiriLightOnUse, _super);
    function SiriLightOnUse() {
        var _this = _super.call(this, "Siri Light On Use", SiriLightOnUse.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SiriLightOnUse.UUID = "00000258-0000-1000-8000-0026BB765291";
    return SiriLightOnUse;
}(Characteristic_1.Characteristic));
exports.SiriLightOnUse = SiriLightOnUse;
Characteristic_1.Characteristic.SiriLightOnUse = SiriLightOnUse;
/**
 * Characteristic "Siri Listening"
 */
var SiriListening = /** @class */ (function (_super) {
    tslib_1.__extends(SiriListening, _super);
    function SiriListening() {
        var _this = _super.call(this, "Siri Listening", SiriListening.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SiriListening.UUID = "00000256-0000-1000-8000-0026BB765291";
    return SiriListening;
}(Characteristic_1.Characteristic));
exports.SiriListening = SiriListening;
Characteristic_1.Characteristic.SiriListening = SiriListening;
/**
 * Characteristic "Siri Touch To Use"
 */
var SiriTouchToUse = /** @class */ (function (_super) {
    tslib_1.__extends(SiriTouchToUse, _super);
    function SiriTouchToUse() {
        var _this = _super.call(this, "Siri Touch To Use", SiriTouchToUse.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SiriTouchToUse.UUID = "00000257-0000-1000-8000-0026BB765291";
    return SiriTouchToUse;
}(Characteristic_1.Characteristic));
exports.SiriTouchToUse = SiriTouchToUse;
Characteristic_1.Characteristic.SiriTouchToUse = SiriTouchToUse;
/**
 * Characteristic "Slat Type"
 */
var SlatType = /** @class */ (function (_super) {
    tslib_1.__extends(SlatType, _super);
    function SlatType() {
        var _this = _super.call(this, "Slat Type", SlatType.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SlatType.UUID = "000000C0-0000-1000-8000-0026BB765291";
    SlatType.HORIZONTAL = 0;
    SlatType.VERTICAL = 1;
    return SlatType;
}(Characteristic_1.Characteristic));
exports.SlatType = SlatType;
Characteristic_1.Characteristic.SlatType = SlatType;
/**
 * Characteristic "Sleep Discovery Mode"
 */
var SleepDiscoveryMode = /** @class */ (function (_super) {
    tslib_1.__extends(SleepDiscoveryMode, _super);
    function SleepDiscoveryMode() {
        var _this = _super.call(this, "Sleep Discovery Mode", SleepDiscoveryMode.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SleepDiscoveryMode.UUID = "000000E8-0000-1000-8000-0026BB765291";
    SleepDiscoveryMode.NOT_DISCOVERABLE = 0;
    SleepDiscoveryMode.ALWAYS_DISCOVERABLE = 1;
    return SleepDiscoveryMode;
}(Characteristic_1.Characteristic));
exports.SleepDiscoveryMode = SleepDiscoveryMode;
Characteristic_1.Characteristic.SleepDiscoveryMode = SleepDiscoveryMode;
/**
 * Characteristic "Sleep Interval"
 * @since iOS 14
 */
var SleepInterval = /** @class */ (function (_super) {
    tslib_1.__extends(SleepInterval, _super);
    function SleepInterval() {
        var _this = _super.call(this, "Sleep Interval", SleepInterval.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SleepInterval.UUID = "0000023A-0000-1000-8000-0026BB765291";
    return SleepInterval;
}(Characteristic_1.Characteristic));
exports.SleepInterval = SleepInterval;
Characteristic_1.Characteristic.SleepInterval = SleepInterval;
/**
 * Characteristic "Smoke Detected"
 */
var SmokeDetected = /** @class */ (function (_super) {
    tslib_1.__extends(SmokeDetected, _super);
    function SmokeDetected() {
        var _this = _super.call(this, "Smoke Detected", SmokeDetected.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SmokeDetected.UUID = "00000076-0000-1000-8000-0026BB765291";
    SmokeDetected.SMOKE_NOT_DETECTED = 0;
    SmokeDetected.SMOKE_DETECTED = 1;
    return SmokeDetected;
}(Characteristic_1.Characteristic));
exports.SmokeDetected = SmokeDetected;
Characteristic_1.Characteristic.SmokeDetected = SmokeDetected;
/**
 * Characteristic "Software Revision"
 */
var SoftwareRevision = /** @class */ (function (_super) {
    tslib_1.__extends(SoftwareRevision, _super);
    function SoftwareRevision() {
        var _this = _super.call(this, "Software Revision", SoftwareRevision.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SoftwareRevision.UUID = "00000054-0000-1000-8000-0026BB765291";
    return SoftwareRevision;
}(Characteristic_1.Characteristic));
exports.SoftwareRevision = SoftwareRevision;
Characteristic_1.Characteristic.SoftwareRevision = SoftwareRevision;
/**
 * Characteristic "Staged Firmware Version"
 */
var StagedFirmwareVersion = /** @class */ (function (_super) {
    tslib_1.__extends(StagedFirmwareVersion, _super);
    function StagedFirmwareVersion() {
        var _this = _super.call(this, "Staged Firmware Version", StagedFirmwareVersion.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    StagedFirmwareVersion.UUID = "00000249-0000-1000-8000-0026BB765291";
    return StagedFirmwareVersion;
}(Characteristic_1.Characteristic));
exports.StagedFirmwareVersion = StagedFirmwareVersion;
Characteristic_1.Characteristic.StagedFirmwareVersion = StagedFirmwareVersion;
/**
 * Characteristic "Status Active"
 */
var StatusActive = /** @class */ (function (_super) {
    tslib_1.__extends(StatusActive, _super);
    function StatusActive() {
        var _this = _super.call(this, "Status Active", StatusActive.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    StatusActive.UUID = "00000075-0000-1000-8000-0026BB765291";
    return StatusActive;
}(Characteristic_1.Characteristic));
exports.StatusActive = StatusActive;
Characteristic_1.Characteristic.StatusActive = StatusActive;
/**
 * Characteristic "Status Fault"
 */
var StatusFault = /** @class */ (function (_super) {
    tslib_1.__extends(StatusFault, _super);
    function StatusFault() {
        var _this = _super.call(this, "Status Fault", StatusFault.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    StatusFault.UUID = "00000077-0000-1000-8000-0026BB765291";
    StatusFault.NO_FAULT = 0;
    StatusFault.GENERAL_FAULT = 1;
    return StatusFault;
}(Characteristic_1.Characteristic));
exports.StatusFault = StatusFault;
Characteristic_1.Characteristic.StatusFault = StatusFault;
/**
 * Characteristic "Status Jammed"
 */
var StatusJammed = /** @class */ (function (_super) {
    tslib_1.__extends(StatusJammed, _super);
    function StatusJammed() {
        var _this = _super.call(this, "Status Jammed", StatusJammed.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    StatusJammed.UUID = "00000078-0000-1000-8000-0026BB765291";
    StatusJammed.NOT_JAMMED = 0;
    StatusJammed.JAMMED = 1;
    return StatusJammed;
}(Characteristic_1.Characteristic));
exports.StatusJammed = StatusJammed;
Characteristic_1.Characteristic.StatusJammed = StatusJammed;
/**
 * Characteristic "Status Low Battery"
 */
var StatusLowBattery = /** @class */ (function (_super) {
    tslib_1.__extends(StatusLowBattery, _super);
    function StatusLowBattery() {
        var _this = _super.call(this, "Status Low Battery", StatusLowBattery.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    StatusLowBattery.UUID = "00000079-0000-1000-8000-0026BB765291";
    StatusLowBattery.BATTERY_LEVEL_NORMAL = 0;
    StatusLowBattery.BATTERY_LEVEL_LOW = 1;
    return StatusLowBattery;
}(Characteristic_1.Characteristic));
exports.StatusLowBattery = StatusLowBattery;
Characteristic_1.Characteristic.StatusLowBattery = StatusLowBattery;
/**
 * Characteristic "Status Tampered"
 */
var StatusTampered = /** @class */ (function (_super) {
    tslib_1.__extends(StatusTampered, _super);
    function StatusTampered() {
        var _this = _super.call(this, "Status Tampered", StatusTampered.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    StatusTampered.UUID = "0000007A-0000-1000-8000-0026BB765291";
    StatusTampered.NOT_TAMPERED = 0;
    StatusTampered.TAMPERED = 1;
    return StatusTampered;
}(Characteristic_1.Characteristic));
exports.StatusTampered = StatusTampered;
Characteristic_1.Characteristic.StatusTampered = StatusTampered;
/**
 * Characteristic "Streaming Status"
 */
var StreamingStatus = /** @class */ (function (_super) {
    tslib_1.__extends(StreamingStatus, _super);
    function StreamingStatus() {
        var _this = _super.call(this, "Streaming Status", StreamingStatus.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    StreamingStatus.UUID = "00000120-0000-1000-8000-0026BB765291";
    return StreamingStatus;
}(Characteristic_1.Characteristic));
exports.StreamingStatus = StreamingStatus;
Characteristic_1.Characteristic.StreamingStatus = StreamingStatus;
/**
 * Characteristic "Sulphur Dioxide Density"
 */
var SulphurDioxideDensity = /** @class */ (function (_super) {
    tslib_1.__extends(SulphurDioxideDensity, _super);
    function SulphurDioxideDensity() {
        var _this = _super.call(this, "Sulphur Dioxide Density", SulphurDioxideDensity.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1000,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SulphurDioxideDensity.UUID = "000000C5-0000-1000-8000-0026BB765291";
    return SulphurDioxideDensity;
}(Characteristic_1.Characteristic));
exports.SulphurDioxideDensity = SulphurDioxideDensity;
Characteristic_1.Characteristic.SulphurDioxideDensity = SulphurDioxideDensity;
/**
 * Characteristic "Supported Asset Types"
 */
var SupportedAssetTypes = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedAssetTypes, _super);
    function SupportedAssetTypes() {
        var _this = _super.call(this, "Supported Asset Types", SupportedAssetTypes.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedAssetTypes.UUID = "00000268-0000-1000-8000-0026BB765291";
    return SupportedAssetTypes;
}(Characteristic_1.Characteristic));
exports.SupportedAssetTypes = SupportedAssetTypes;
Characteristic_1.Characteristic.SupportedAssetTypes = SupportedAssetTypes;
/**
 * Characteristic "Supported Audio Recording Configuration"
 */
var SupportedAudioRecordingConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedAudioRecordingConfiguration, _super);
    function SupportedAudioRecordingConfiguration() {
        var _this = _super.call(this, "Supported Audio Recording Configuration", SupportedAudioRecordingConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedAudioRecordingConfiguration.UUID = "00000207-0000-1000-8000-0026BB765291";
    return SupportedAudioRecordingConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedAudioRecordingConfiguration = SupportedAudioRecordingConfiguration;
Characteristic_1.Characteristic.SupportedAudioRecordingConfiguration = SupportedAudioRecordingConfiguration;
/**
 * Characteristic "Supported Audio Stream Configuration"
 */
var SupportedAudioStreamConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedAudioStreamConfiguration, _super);
    function SupportedAudioStreamConfiguration() {
        var _this = _super.call(this, "Supported Audio Stream Configuration", SupportedAudioStreamConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedAudioStreamConfiguration.UUID = "00000115-0000-1000-8000-0026BB765291";
    return SupportedAudioStreamConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedAudioStreamConfiguration = SupportedAudioStreamConfiguration;
Characteristic_1.Characteristic.SupportedAudioStreamConfiguration = SupportedAudioStreamConfiguration;
/**
 * Characteristic "Supported Camera Recording Configuration"
 */
var SupportedCameraRecordingConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedCameraRecordingConfiguration, _super);
    function SupportedCameraRecordingConfiguration() {
        var _this = _super.call(this, "Supported Camera Recording Configuration", SupportedCameraRecordingConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedCameraRecordingConfiguration.UUID = "00000205-0000-1000-8000-0026BB765291";
    return SupportedCameraRecordingConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedCameraRecordingConfiguration = SupportedCameraRecordingConfiguration;
Characteristic_1.Characteristic.SupportedCameraRecordingConfiguration = SupportedCameraRecordingConfiguration;
/**
 * Characteristic "Supported Characteristic Value Transition Configuration"
 * @since iOS 14
 */
var SupportedCharacteristicValueTransitionConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedCharacteristicValueTransitionConfiguration, _super);
    function SupportedCharacteristicValueTransitionConfiguration() {
        var _this = _super.call(this, "Supported Characteristic Value Transition Configuration", SupportedCharacteristicValueTransitionConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedCharacteristicValueTransitionConfiguration.UUID = "00000144-0000-1000-8000-0026BB765291";
    return SupportedCharacteristicValueTransitionConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedCharacteristicValueTransitionConfiguration = SupportedCharacteristicValueTransitionConfiguration;
Characteristic_1.Characteristic.SupportedCharacteristicValueTransitionConfiguration = SupportedCharacteristicValueTransitionConfiguration;
/**
 * Characteristic "Supported Data Stream Transport Configuration"
 */
var SupportedDataStreamTransportConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedDataStreamTransportConfiguration, _super);
    function SupportedDataStreamTransportConfiguration() {
        var _this = _super.call(this, "Supported Data Stream Transport Configuration", SupportedDataStreamTransportConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedDataStreamTransportConfiguration.UUID = "00000130-0000-1000-8000-0026BB765291";
    return SupportedDataStreamTransportConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedDataStreamTransportConfiguration = SupportedDataStreamTransportConfiguration;
Characteristic_1.Characteristic.SupportedDataStreamTransportConfiguration = SupportedDataStreamTransportConfiguration;
/**
 * Characteristic "Supported Diagnostics Modes"
 */
var SupportedDiagnosticsModes = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedDiagnosticsModes, _super);
    function SupportedDiagnosticsModes() {
        var _this = _super.call(this, "Supported Diagnostics Modes", SupportedDiagnosticsModes.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedDiagnosticsModes.UUID = "0000024C-0000-1000-8000-0026BB765291";
    return SupportedDiagnosticsModes;
}(Characteristic_1.Characteristic));
exports.SupportedDiagnosticsModes = SupportedDiagnosticsModes;
Characteristic_1.Characteristic.SupportedDiagnosticsModes = SupportedDiagnosticsModes;
/**
 * Characteristic "Supported Diagnostics Snapshot"
 * @since iOS 14
 */
var SupportedDiagnosticsSnapshot = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedDiagnosticsSnapshot, _super);
    function SupportedDiagnosticsSnapshot() {
        var _this = _super.call(this, "Supported Diagnostics Snapshot", SupportedDiagnosticsSnapshot.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedDiagnosticsSnapshot.UUID = "00000238-0000-1000-8000-0026BB765291";
    return SupportedDiagnosticsSnapshot;
}(Characteristic_1.Characteristic));
exports.SupportedDiagnosticsSnapshot = SupportedDiagnosticsSnapshot;
Characteristic_1.Characteristic.SupportedDiagnosticsSnapshot = SupportedDiagnosticsSnapshot;
/**
 * Characteristic "Supported Firmware Update Configuration"
 */
var SupportedFirmwareUpdateConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedFirmwareUpdateConfiguration, _super);
    function SupportedFirmwareUpdateConfiguration() {
        var _this = _super.call(this, "Supported Firmware Update Configuration", SupportedFirmwareUpdateConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedFirmwareUpdateConfiguration.UUID = "00000233-0000-1000-8000-0026BB765291";
    return SupportedFirmwareUpdateConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedFirmwareUpdateConfiguration = SupportedFirmwareUpdateConfiguration;
Characteristic_1.Characteristic.SupportedFirmwareUpdateConfiguration = SupportedFirmwareUpdateConfiguration;
/**
 * Characteristic "Supported Metrics"
 */
var SupportedMetrics = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedMetrics, _super);
    function SupportedMetrics() {
        var _this = _super.call(this, "Supported Metrics", SupportedMetrics.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedMetrics.UUID = "00000271-0000-1000-8000-0026BB765291";
    return SupportedMetrics;
}(Characteristic_1.Characteristic));
exports.SupportedMetrics = SupportedMetrics;
Characteristic_1.Characteristic.SupportedMetrics = SupportedMetrics;
/**
 * Characteristic "Supported Router Configuration"
 */
var SupportedRouterConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedRouterConfiguration, _super);
    function SupportedRouterConfiguration() {
        var _this = _super.call(this, "Supported Router Configuration", SupportedRouterConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedRouterConfiguration.UUID = "00000210-0000-1000-8000-0026BB765291";
    return SupportedRouterConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedRouterConfiguration = SupportedRouterConfiguration;
Characteristic_1.Characteristic.SupportedRouterConfiguration = SupportedRouterConfiguration;
/**
 * Characteristic "Supported RTP Configuration"
 */
var SupportedRTPConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedRTPConfiguration, _super);
    function SupportedRTPConfiguration() {
        var _this = _super.call(this, "Supported RTP Configuration", SupportedRTPConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedRTPConfiguration.UUID = "00000116-0000-1000-8000-0026BB765291";
    return SupportedRTPConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedRTPConfiguration = SupportedRTPConfiguration;
Characteristic_1.Characteristic.SupportedRTPConfiguration = SupportedRTPConfiguration;
/**
 * Characteristic "Supported Sleep Configuration"
 */
var SupportedSleepConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedSleepConfiguration, _super);
    function SupportedSleepConfiguration() {
        var _this = _super.call(this, "Supported Sleep Configuration", SupportedSleepConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedSleepConfiguration.UUID = "00000251-0000-1000-8000-0026BB765291";
    return SupportedSleepConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedSleepConfiguration = SupportedSleepConfiguration;
Characteristic_1.Characteristic.SupportedSleepConfiguration = SupportedSleepConfiguration;
/**
 * Characteristic "Supported Transfer Transport Configuration"
 * @since iOS 13.4
 */
var SupportedTransferTransportConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedTransferTransportConfiguration, _super);
    function SupportedTransferTransportConfiguration() {
        var _this = _super.call(this, "Supported Transfer Transport Configuration", SupportedTransferTransportConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedTransferTransportConfiguration.UUID = "00000202-0000-1000-8000-0026BB765291";
    return SupportedTransferTransportConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedTransferTransportConfiguration = SupportedTransferTransportConfiguration;
Characteristic_1.Characteristic.SupportedTransferTransportConfiguration = SupportedTransferTransportConfiguration;
/**
 * Characteristic "Supported Video Recording Configuration"
 */
var SupportedVideoRecordingConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedVideoRecordingConfiguration, _super);
    function SupportedVideoRecordingConfiguration() {
        var _this = _super.call(this, "Supported Video Recording Configuration", SupportedVideoRecordingConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedVideoRecordingConfiguration.UUID = "00000206-0000-1000-8000-0026BB765291";
    return SupportedVideoRecordingConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedVideoRecordingConfiguration = SupportedVideoRecordingConfiguration;
Characteristic_1.Characteristic.SupportedVideoRecordingConfiguration = SupportedVideoRecordingConfiguration;
/**
 * Characteristic "Supported Video Stream Configuration"
 */
var SupportedVideoStreamConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(SupportedVideoStreamConfiguration, _super);
    function SupportedVideoStreamConfiguration() {
        var _this = _super.call(this, "Supported Video Stream Configuration", SupportedVideoStreamConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedVideoStreamConfiguration.UUID = "00000114-0000-1000-8000-0026BB765291";
    return SupportedVideoStreamConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedVideoStreamConfiguration = SupportedVideoStreamConfiguration;
Characteristic_1.Characteristic.SupportedVideoStreamConfiguration = SupportedVideoStreamConfiguration;
/**
 * Characteristic "Swing Mode"
 */
var SwingMode = /** @class */ (function (_super) {
    tslib_1.__extends(SwingMode, _super);
    function SwingMode() {
        var _this = _super.call(this, "Swing Mode", SwingMode.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SwingMode.UUID = "000000B6-0000-1000-8000-0026BB765291";
    SwingMode.SWING_DISABLED = 0;
    SwingMode.SWING_ENABLED = 1;
    return SwingMode;
}(Characteristic_1.Characteristic));
exports.SwingMode = SwingMode;
Characteristic_1.Characteristic.SwingMode = SwingMode;
/**
 * Characteristic "Tap Type"
 */
var TapType = /** @class */ (function (_super) {
    tslib_1.__extends(TapType, _super);
    function TapType() {
        var _this = _super.call(this, "Tap Type", TapType.UUID, {
            format: "uint16" /* Formats.UINT16 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TapType.UUID = "0000022F-0000-1000-8000-0026BB765291";
    return TapType;
}(Characteristic_1.Characteristic));
exports.TapType = TapType;
Characteristic_1.Characteristic.TapType = TapType;
/**
 * Characteristic "Target Air Purifier State"
 */
var TargetAirPurifierState = /** @class */ (function (_super) {
    tslib_1.__extends(TargetAirPurifierState, _super);
    function TargetAirPurifierState() {
        var _this = _super.call(this, "Target Air Purifier State", TargetAirPurifierState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetAirPurifierState.UUID = "000000A8-0000-1000-8000-0026BB765291";
    TargetAirPurifierState.MANUAL = 0;
    TargetAirPurifierState.AUTO = 1;
    return TargetAirPurifierState;
}(Characteristic_1.Characteristic));
exports.TargetAirPurifierState = TargetAirPurifierState;
Characteristic_1.Characteristic.TargetAirPurifierState = TargetAirPurifierState;
/**
 * Characteristic "Target Air Quality"
 * @deprecated Removed and not used anymore
 */
var TargetAirQuality = /** @class */ (function (_super) {
    tslib_1.__extends(TargetAirQuality, _super);
    function TargetAirQuality() {
        var _this = _super.call(this, "Target Air Quality", TargetAirQuality.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 2,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetAirQuality.UUID = "000000AE-0000-1000-8000-0026BB765291";
    TargetAirQuality.EXCELLENT = 0;
    TargetAirQuality.GOOD = 1;
    TargetAirQuality.FAIR = 2;
    return TargetAirQuality;
}(Characteristic_1.Characteristic));
exports.TargetAirQuality = TargetAirQuality;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.TargetAirQuality = TargetAirQuality;
/**
 * Characteristic "Target Control List"
 */
var TargetControlList = /** @class */ (function (_super) {
    tslib_1.__extends(TargetControlList, _super);
    function TargetControlList() {
        var _this = _super.call(this, "Target Control List", TargetControlList.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
            adminOnlyAccess: [0 /* Access.READ */, 1 /* Access.WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetControlList.UUID = "00000124-0000-1000-8000-0026BB765291";
    return TargetControlList;
}(Characteristic_1.Characteristic));
exports.TargetControlList = TargetControlList;
Characteristic_1.Characteristic.TargetControlList = TargetControlList;
/**
 * Characteristic "Target Control Supported Configuration"
 */
var TargetControlSupportedConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(TargetControlSupportedConfiguration, _super);
    function TargetControlSupportedConfiguration() {
        var _this = _super.call(this, "Target Control Supported Configuration", TargetControlSupportedConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetControlSupportedConfiguration.UUID = "00000123-0000-1000-8000-0026BB765291";
    return TargetControlSupportedConfiguration;
}(Characteristic_1.Characteristic));
exports.TargetControlSupportedConfiguration = TargetControlSupportedConfiguration;
Characteristic_1.Characteristic.TargetControlSupportedConfiguration = TargetControlSupportedConfiguration;
/**
 * Characteristic "Target Door State"
 */
var TargetDoorState = /** @class */ (function (_super) {
    tslib_1.__extends(TargetDoorState, _super);
    function TargetDoorState() {
        var _this = _super.call(this, "Target Door State", TargetDoorState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetDoorState.UUID = "00000032-0000-1000-8000-0026BB765291";
    TargetDoorState.OPEN = 0;
    TargetDoorState.CLOSED = 1;
    return TargetDoorState;
}(Characteristic_1.Characteristic));
exports.TargetDoorState = TargetDoorState;
Characteristic_1.Characteristic.TargetDoorState = TargetDoorState;
/**
 * Characteristic "Target Fan State"
 */
var TargetFanState = /** @class */ (function (_super) {
    tslib_1.__extends(TargetFanState, _super);
    function TargetFanState() {
        var _this = _super.call(this, "Target Fan State", TargetFanState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetFanState.UUID = "000000BF-0000-1000-8000-0026BB765291";
    TargetFanState.MANUAL = 0;
    TargetFanState.AUTO = 1;
    return TargetFanState;
}(Characteristic_1.Characteristic));
exports.TargetFanState = TargetFanState;
Characteristic_1.Characteristic.TargetFanState = TargetFanState;
/**
 * Characteristic "Target Heater-Cooler State"
 */
var TargetHeaterCoolerState = /** @class */ (function (_super) {
    tslib_1.__extends(TargetHeaterCoolerState, _super);
    function TargetHeaterCoolerState() {
        var _this = _super.call(this, "Target Heater-Cooler State", TargetHeaterCoolerState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetHeaterCoolerState.UUID = "000000B2-0000-1000-8000-0026BB765291";
    TargetHeaterCoolerState.AUTO = 0;
    TargetHeaterCoolerState.HEAT = 1;
    TargetHeaterCoolerState.COOL = 2;
    return TargetHeaterCoolerState;
}(Characteristic_1.Characteristic));
exports.TargetHeaterCoolerState = TargetHeaterCoolerState;
Characteristic_1.Characteristic.TargetHeaterCoolerState = TargetHeaterCoolerState;
/**
 * Characteristic "Target Heating Cooling State"
 */
var TargetHeatingCoolingState = /** @class */ (function (_super) {
    tslib_1.__extends(TargetHeatingCoolingState, _super);
    function TargetHeatingCoolingState() {
        var _this = _super.call(this, "Target Heating Cooling State", TargetHeatingCoolingState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 3,
            minStep: 1,
            validValues: [0, 1, 2, 3],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetHeatingCoolingState.UUID = "00000033-0000-1000-8000-0026BB765291";
    TargetHeatingCoolingState.OFF = 0;
    TargetHeatingCoolingState.HEAT = 1;
    TargetHeatingCoolingState.COOL = 2;
    TargetHeatingCoolingState.AUTO = 3;
    return TargetHeatingCoolingState;
}(Characteristic_1.Characteristic));
exports.TargetHeatingCoolingState = TargetHeatingCoolingState;
Characteristic_1.Characteristic.TargetHeatingCoolingState = TargetHeatingCoolingState;
/**
 * Characteristic "Target Horizontal Tilt Angle"
 */
var TargetHorizontalTiltAngle = /** @class */ (function (_super) {
    tslib_1.__extends(TargetHorizontalTiltAngle, _super);
    function TargetHorizontalTiltAngle() {
        var _this = _super.call(this, "Target Horizontal Tilt Angle", TargetHorizontalTiltAngle.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "arcdegrees" /* Units.ARC_DEGREE */,
            minValue: -90,
            maxValue: 90,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetHorizontalTiltAngle.UUID = "0000007B-0000-1000-8000-0026BB765291";
    return TargetHorizontalTiltAngle;
}(Characteristic_1.Characteristic));
exports.TargetHorizontalTiltAngle = TargetHorizontalTiltAngle;
Characteristic_1.Characteristic.TargetHorizontalTiltAngle = TargetHorizontalTiltAngle;
/**
 * Characteristic "Target Humidifier-Dehumidifier State"
 */
var TargetHumidifierDehumidifierState = /** @class */ (function (_super) {
    tslib_1.__extends(TargetHumidifierDehumidifierState, _super);
    function TargetHumidifierDehumidifierState() {
        var _this = _super.call(this, "Target Humidifier-Dehumidifier State", TargetHumidifierDehumidifierState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetHumidifierDehumidifierState.UUID = "000000B4-0000-1000-8000-0026BB765291";
    /**
     * @deprecated Removed in iOS 11. Use {@link HUMIDIFIER_OR_DEHUMIDIFIER} instead.
     */
    TargetHumidifierDehumidifierState.AUTO = 0;
    TargetHumidifierDehumidifierState.HUMIDIFIER_OR_DEHUMIDIFIER = 0;
    TargetHumidifierDehumidifierState.HUMIDIFIER = 1;
    TargetHumidifierDehumidifierState.DEHUMIDIFIER = 2;
    return TargetHumidifierDehumidifierState;
}(Characteristic_1.Characteristic));
exports.TargetHumidifierDehumidifierState = TargetHumidifierDehumidifierState;
Characteristic_1.Characteristic.TargetHumidifierDehumidifierState = TargetHumidifierDehumidifierState;
/**
 * Characteristic "Target Media State"
 */
var TargetMediaState = /** @class */ (function (_super) {
    tslib_1.__extends(TargetMediaState, _super);
    function TargetMediaState() {
        var _this = _super.call(this, "Target Media State", TargetMediaState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 2,
            minStep: 1,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetMediaState.UUID = "00000137-0000-1000-8000-0026BB765291";
    TargetMediaState.PLAY = 0;
    TargetMediaState.PAUSE = 1;
    TargetMediaState.STOP = 2;
    return TargetMediaState;
}(Characteristic_1.Characteristic));
exports.TargetMediaState = TargetMediaState;
Characteristic_1.Characteristic.TargetMediaState = TargetMediaState;
/**
 * Characteristic "Target Position"
 */
var TargetPosition = /** @class */ (function (_super) {
    tslib_1.__extends(TargetPosition, _super);
    function TargetPosition() {
        var _this = _super.call(this, "Target Position", TargetPosition.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetPosition.UUID = "0000007C-0000-1000-8000-0026BB765291";
    return TargetPosition;
}(Characteristic_1.Characteristic));
exports.TargetPosition = TargetPosition;
Characteristic_1.Characteristic.TargetPosition = TargetPosition;
/**
 * Characteristic "Target Relative Humidity"
 */
var TargetRelativeHumidity = /** @class */ (function (_super) {
    tslib_1.__extends(TargetRelativeHumidity, _super);
    function TargetRelativeHumidity() {
        var _this = _super.call(this, "Target Relative Humidity", TargetRelativeHumidity.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetRelativeHumidity.UUID = "00000034-0000-1000-8000-0026BB765291";
    return TargetRelativeHumidity;
}(Characteristic_1.Characteristic));
exports.TargetRelativeHumidity = TargetRelativeHumidity;
Characteristic_1.Characteristic.TargetRelativeHumidity = TargetRelativeHumidity;
/**
 * Characteristic "Target Slat State"
 * @deprecated Removed and not used anymore
 */
var TargetSlatState = /** @class */ (function (_super) {
    tslib_1.__extends(TargetSlatState, _super);
    function TargetSlatState() {
        var _this = _super.call(this, "Target Slat State", TargetSlatState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetSlatState.UUID = "000000BE-0000-1000-8000-0026BB765291";
    TargetSlatState.MANUAL = 0;
    TargetSlatState.AUTO = 1;
    return TargetSlatState;
}(Characteristic_1.Characteristic));
exports.TargetSlatState = TargetSlatState;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.TargetSlatState = TargetSlatState;
/**
 * Characteristic "Target Temperature"
 */
var TargetTemperature = /** @class */ (function (_super) {
    tslib_1.__extends(TargetTemperature, _super);
    function TargetTemperature() {
        var _this = _super.call(this, "Target Temperature", TargetTemperature.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "celsius" /* Units.CELSIUS */,
            minValue: 10,
            maxValue: 38,
            minStep: 0.1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetTemperature.UUID = "00000035-0000-1000-8000-0026BB765291";
    return TargetTemperature;
}(Characteristic_1.Characteristic));
exports.TargetTemperature = TargetTemperature;
Characteristic_1.Characteristic.TargetTemperature = TargetTemperature;
/**
 * Characteristic "Target Tilt Angle"
 */
var TargetTiltAngle = /** @class */ (function (_super) {
    tslib_1.__extends(TargetTiltAngle, _super);
    function TargetTiltAngle() {
        var _this = _super.call(this, "Target Tilt Angle", TargetTiltAngle.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "arcdegrees" /* Units.ARC_DEGREE */,
            minValue: -90,
            maxValue: 90,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetTiltAngle.UUID = "000000C2-0000-1000-8000-0026BB765291";
    return TargetTiltAngle;
}(Characteristic_1.Characteristic));
exports.TargetTiltAngle = TargetTiltAngle;
Characteristic_1.Characteristic.TargetTiltAngle = TargetTiltAngle;
/**
 * Characteristic "Target Vertical Tilt Angle"
 */
var TargetVerticalTiltAngle = /** @class */ (function (_super) {
    tslib_1.__extends(TargetVerticalTiltAngle, _super);
    function TargetVerticalTiltAngle() {
        var _this = _super.call(this, "Target Vertical Tilt Angle", TargetVerticalTiltAngle.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "arcdegrees" /* Units.ARC_DEGREE */,
            minValue: -90,
            maxValue: 90,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetVerticalTiltAngle.UUID = "0000007D-0000-1000-8000-0026BB765291";
    return TargetVerticalTiltAngle;
}(Characteristic_1.Characteristic));
exports.TargetVerticalTiltAngle = TargetVerticalTiltAngle;
Characteristic_1.Characteristic.TargetVerticalTiltAngle = TargetVerticalTiltAngle;
/**
 * Characteristic "Target Visibility State"
 */
var TargetVisibilityState = /** @class */ (function (_super) {
    tslib_1.__extends(TargetVisibilityState, _super);
    function TargetVisibilityState() {
        var _this = _super.call(this, "Target Visibility State", TargetVisibilityState.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetVisibilityState.UUID = "00000134-0000-1000-8000-0026BB765291";
    TargetVisibilityState.SHOWN = 0;
    TargetVisibilityState.HIDDEN = 1;
    return TargetVisibilityState;
}(Characteristic_1.Characteristic));
exports.TargetVisibilityState = TargetVisibilityState;
Characteristic_1.Characteristic.TargetVisibilityState = TargetVisibilityState;
/**
 * Characteristic "Temperature Display Units"
 */
var TemperatureDisplayUnits = /** @class */ (function (_super) {
    tslib_1.__extends(TemperatureDisplayUnits, _super);
    function TemperatureDisplayUnits() {
        var _this = _super.call(this, "Temperature Display Units", TemperatureDisplayUnits.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TemperatureDisplayUnits.UUID = "00000036-0000-1000-8000-0026BB765291";
    TemperatureDisplayUnits.CELSIUS = 0;
    TemperatureDisplayUnits.FAHRENHEIT = 1;
    return TemperatureDisplayUnits;
}(Characteristic_1.Characteristic));
exports.TemperatureDisplayUnits = TemperatureDisplayUnits;
Characteristic_1.Characteristic.TemperatureDisplayUnits = TemperatureDisplayUnits;
/**
 * Characteristic "Third Party Camera Active"
 */
var ThirdPartyCameraActive = /** @class */ (function (_super) {
    tslib_1.__extends(ThirdPartyCameraActive, _super);
    function ThirdPartyCameraActive() {
        var _this = _super.call(this, "Third Party Camera Active", ThirdPartyCameraActive.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ThirdPartyCameraActive.UUID = "0000021C-0000-1000-8000-0026BB765291";
    ThirdPartyCameraActive.OFF = 0;
    ThirdPartyCameraActive.ON = 1;
    return ThirdPartyCameraActive;
}(Characteristic_1.Characteristic));
exports.ThirdPartyCameraActive = ThirdPartyCameraActive;
Characteristic_1.Characteristic.ThirdPartyCameraActive = ThirdPartyCameraActive;
/**
 * Characteristic "Thread Control Point"
 */
var ThreadControlPoint = /** @class */ (function (_super) {
    tslib_1.__extends(ThreadControlPoint, _super);
    function ThreadControlPoint() {
        var _this = _super.call(this, "Thread Control Point", ThreadControlPoint.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ThreadControlPoint.UUID = "00000704-0000-1000-8000-0026BB765291";
    return ThreadControlPoint;
}(Characteristic_1.Characteristic));
exports.ThreadControlPoint = ThreadControlPoint;
Characteristic_1.Characteristic.ThreadControlPoint = ThreadControlPoint;
/**
 * Characteristic "Thread Node Capabilities"
 */
var ThreadNodeCapabilities = /** @class */ (function (_super) {
    tslib_1.__extends(ThreadNodeCapabilities, _super);
    function ThreadNodeCapabilities() {
        var _this = _super.call(this, "Thread Node Capabilities", ThreadNodeCapabilities.UUID, {
            format: "uint16" /* Formats.UINT16 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 31,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ThreadNodeCapabilities.UUID = "00000702-0000-1000-8000-0026BB765291";
    return ThreadNodeCapabilities;
}(Characteristic_1.Characteristic));
exports.ThreadNodeCapabilities = ThreadNodeCapabilities;
Characteristic_1.Characteristic.ThreadNodeCapabilities = ThreadNodeCapabilities;
/**
 * Characteristic "Thread OpenThread Version"
 */
var ThreadOpenThreadVersion = /** @class */ (function (_super) {
    tslib_1.__extends(ThreadOpenThreadVersion, _super);
    function ThreadOpenThreadVersion() {
        var _this = _super.call(this, "Thread OpenThread Version", ThreadOpenThreadVersion.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ThreadOpenThreadVersion.UUID = "00000706-0000-1000-8000-0026BB765291";
    return ThreadOpenThreadVersion;
}(Characteristic_1.Characteristic));
exports.ThreadOpenThreadVersion = ThreadOpenThreadVersion;
Characteristic_1.Characteristic.ThreadOpenThreadVersion = ThreadOpenThreadVersion;
/**
 * Characteristic "Thread Status"
 */
var ThreadStatus = /** @class */ (function (_super) {
    tslib_1.__extends(ThreadStatus, _super);
    function ThreadStatus() {
        var _this = _super.call(this, "Thread Status", ThreadStatus.UUID, {
            format: "uint16" /* Formats.UINT16 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 6,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ThreadStatus.UUID = "00000703-0000-1000-8000-0026BB765291";
    return ThreadStatus;
}(Characteristic_1.Characteristic));
exports.ThreadStatus = ThreadStatus;
Characteristic_1.Characteristic.ThreadStatus = ThreadStatus;
/**
 * Characteristic "Time Update"
 * @deprecated Removed and not used anymore
 */
var TimeUpdate = /** @class */ (function (_super) {
    tslib_1.__extends(TimeUpdate, _super);
    function TimeUpdate() {
        var _this = _super.call(this, "Time Update", TimeUpdate.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TimeUpdate.UUID = "0000009A-0000-1000-8000-0026BB765291";
    return TimeUpdate;
}(Characteristic_1.Characteristic));
exports.TimeUpdate = TimeUpdate;
// noinspection JSDeprecatedSymbols
Characteristic_1.Characteristic.TimeUpdate = TimeUpdate;
/**
 * Characteristic "Token"
 */
var Token = /** @class */ (function (_super) {
    tslib_1.__extends(Token, _super);
    function Token() {
        var _this = _super.call(this, "Token", Token.UUID, {
            format: "data" /* Formats.DATA */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Token.UUID = "00000231-0000-1000-8000-0026BB765291";
    return Token;
}(Characteristic_1.Characteristic));
exports.Token = Token;
Characteristic_1.Characteristic.Token = Token;
/**
 * Characteristic "Transmit Power"
 * @since iOS 14
 */
var TransmitPower = /** @class */ (function (_super) {
    tslib_1.__extends(TransmitPower, _super);
    function TransmitPower() {
        var _this = _super.call(this, "Transmit Power", TransmitPower.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TransmitPower.UUID = "00000242-0000-1000-8000-0026BB765291";
    return TransmitPower;
}(Characteristic_1.Characteristic));
exports.TransmitPower = TransmitPower;
Characteristic_1.Characteristic.TransmitPower = TransmitPower;
/**
 * Characteristic "Tunnel Connection Timeout"
 */
var TunnelConnectionTimeout = /** @class */ (function (_super) {
    tslib_1.__extends(TunnelConnectionTimeout, _super);
    function TunnelConnectionTimeout() {
        var _this = _super.call(this, "Tunnel Connection Timeout", TunnelConnectionTimeout.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TunnelConnectionTimeout.UUID = "00000061-0000-1000-8000-0026BB765291";
    return TunnelConnectionTimeout;
}(Characteristic_1.Characteristic));
exports.TunnelConnectionTimeout = TunnelConnectionTimeout;
Characteristic_1.Characteristic.TunnelConnectionTimeout = TunnelConnectionTimeout;
/**
 * Characteristic "Tunneled Accessory Advertising"
 */
var TunneledAccessoryAdvertising = /** @class */ (function (_super) {
    tslib_1.__extends(TunneledAccessoryAdvertising, _super);
    function TunneledAccessoryAdvertising() {
        var _this = _super.call(this, "Tunneled Accessory Advertising", TunneledAccessoryAdvertising.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TunneledAccessoryAdvertising.UUID = "00000060-0000-1000-8000-0026BB765291";
    return TunneledAccessoryAdvertising;
}(Characteristic_1.Characteristic));
exports.TunneledAccessoryAdvertising = TunneledAccessoryAdvertising;
Characteristic_1.Characteristic.TunneledAccessoryAdvertising = TunneledAccessoryAdvertising;
/**
 * Characteristic "Tunneled Accessory Connected"
 */
var TunneledAccessoryConnected = /** @class */ (function (_super) {
    tslib_1.__extends(TunneledAccessoryConnected, _super);
    function TunneledAccessoryConnected() {
        var _this = _super.call(this, "Tunneled Accessory Connected", TunneledAccessoryConnected.UUID, {
            format: "bool" /* Formats.BOOL */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TunneledAccessoryConnected.UUID = "00000059-0000-1000-8000-0026BB765291";
    return TunneledAccessoryConnected;
}(Characteristic_1.Characteristic));
exports.TunneledAccessoryConnected = TunneledAccessoryConnected;
Characteristic_1.Characteristic.TunneledAccessoryConnected = TunneledAccessoryConnected;
/**
 * Characteristic "Tunneled Accessory State Number"
 */
var TunneledAccessoryStateNumber = /** @class */ (function (_super) {
    tslib_1.__extends(TunneledAccessoryStateNumber, _super);
    function TunneledAccessoryStateNumber() {
        var _this = _super.call(this, "Tunneled Accessory State Number", TunneledAccessoryStateNumber.UUID, {
            format: "int" /* Formats.INT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TunneledAccessoryStateNumber.UUID = "00000058-0000-1000-8000-0026BB765291";
    return TunneledAccessoryStateNumber;
}(Characteristic_1.Characteristic));
exports.TunneledAccessoryStateNumber = TunneledAccessoryStateNumber;
Characteristic_1.Characteristic.TunneledAccessoryStateNumber = TunneledAccessoryStateNumber;
/**
 * Characteristic "Valve Type"
 */
var ValveType = /** @class */ (function (_super) {
    tslib_1.__extends(ValveType, _super);
    function ValveType() {
        var _this = _super.call(this, "Valve Type", ValveType.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 3,
            minStep: 1,
            validValues: [0, 1, 2, 3],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ValveType.UUID = "000000D5-0000-1000-8000-0026BB765291";
    ValveType.GENERIC_VALVE = 0;
    ValveType.IRRIGATION = 1;
    ValveType.SHOWER_HEAD = 2;
    ValveType.WATER_FAUCET = 3;
    return ValveType;
}(Characteristic_1.Characteristic));
exports.ValveType = ValveType;
Characteristic_1.Characteristic.ValveType = ValveType;
/**
 * Characteristic "Version"
 */
var Version = /** @class */ (function (_super) {
    tslib_1.__extends(Version, _super);
    function Version() {
        var _this = _super.call(this, "Version", Version.UUID, {
            format: "string" /* Formats.STRING */,
            perms: ["pr" /* Perms.PAIRED_READ */],
            maxLen: 64,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Version.UUID = "00000037-0000-1000-8000-0026BB765291";
    return Version;
}(Characteristic_1.Characteristic));
exports.Version = Version;
Characteristic_1.Characteristic.Version = Version;
/**
 * Characteristic "Video Analysis Active"
 * @since iOS 14
 */
var VideoAnalysisActive = /** @class */ (function (_super) {
    tslib_1.__extends(VideoAnalysisActive, _super);
    function VideoAnalysisActive() {
        var _this = _super.call(this, "Video Analysis Active", VideoAnalysisActive.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    VideoAnalysisActive.UUID = "00000229-0000-1000-8000-0026BB765291";
    return VideoAnalysisActive;
}(Characteristic_1.Characteristic));
exports.VideoAnalysisActive = VideoAnalysisActive;
Characteristic_1.Characteristic.VideoAnalysisActive = VideoAnalysisActive;
/**
 * Characteristic "VOC Density"
 */
var VOCDensity = /** @class */ (function (_super) {
    tslib_1.__extends(VOCDensity, _super);
    function VOCDensity() {
        var _this = _super.call(this, "VOC Density", VOCDensity.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 1000,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    VOCDensity.UUID = "000000C8-0000-1000-8000-0026BB765291";
    return VOCDensity;
}(Characteristic_1.Characteristic));
exports.VOCDensity = VOCDensity;
Characteristic_1.Characteristic.VOCDensity = VOCDensity;
/**
 * Characteristic "Volume"
 */
var Volume = /** @class */ (function (_super) {
    tslib_1.__extends(Volume, _super);
    function Volume() {
        var _this = _super.call(this, "Volume", Volume.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Volume.UUID = "00000119-0000-1000-8000-0026BB765291";
    return Volume;
}(Characteristic_1.Characteristic));
exports.Volume = Volume;
Characteristic_1.Characteristic.Volume = Volume;
/**
 * Characteristic "Volume Control Type"
 */
var VolumeControlType = /** @class */ (function (_super) {
    tslib_1.__extends(VolumeControlType, _super);
    function VolumeControlType() {
        var _this = _super.call(this, "Volume Control Type", VolumeControlType.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 3,
            minStep: 1,
            validValues: [0, 1, 2, 3],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    VolumeControlType.UUID = "000000E9-0000-1000-8000-0026BB765291";
    VolumeControlType.NONE = 0;
    VolumeControlType.RELATIVE = 1;
    VolumeControlType.RELATIVE_WITH_CURRENT = 2;
    VolumeControlType.ABSOLUTE = 3;
    return VolumeControlType;
}(Characteristic_1.Characteristic));
exports.VolumeControlType = VolumeControlType;
Characteristic_1.Characteristic.VolumeControlType = VolumeControlType;
/**
 * Characteristic "Volume Selector"
 */
var VolumeSelector = /** @class */ (function (_super) {
    tslib_1.__extends(VolumeSelector, _super);
    function VolumeSelector() {
        var _this = _super.call(this, "Volume Selector", VolumeSelector.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["pw" /* Perms.PAIRED_WRITE */],
            minValue: 0,
            maxValue: 1,
            minStep: 1,
            validValues: [0, 1],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    VolumeSelector.UUID = "000000EA-0000-1000-8000-0026BB765291";
    VolumeSelector.INCREMENT = 0;
    VolumeSelector.DECREMENT = 1;
    return VolumeSelector;
}(Characteristic_1.Characteristic));
exports.VolumeSelector = VolumeSelector;
Characteristic_1.Characteristic.VolumeSelector = VolumeSelector;
/**
 * Characteristic "Wake Configuration"
 * @since iOS 13.4
 */
var WakeConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(WakeConfiguration, _super);
    function WakeConfiguration() {
        var _this = _super.call(this, "Wake Configuration", WakeConfiguration.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WakeConfiguration.UUID = "00000222-0000-1000-8000-0026BB765291";
    return WakeConfiguration;
}(Characteristic_1.Characteristic));
exports.WakeConfiguration = WakeConfiguration;
Characteristic_1.Characteristic.WakeConfiguration = WakeConfiguration;
/**
 * Characteristic "WAN Configuration List"
 */
var WANConfigurationList = /** @class */ (function (_super) {
    tslib_1.__extends(WANConfigurationList, _super);
    function WANConfigurationList() {
        var _this = _super.call(this, "WAN Configuration List", WANConfigurationList.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WANConfigurationList.UUID = "00000211-0000-1000-8000-0026BB765291";
    return WANConfigurationList;
}(Characteristic_1.Characteristic));
exports.WANConfigurationList = WANConfigurationList;
Characteristic_1.Characteristic.WANConfigurationList = WANConfigurationList;
/**
 * Characteristic "WAN Status List"
 */
var WANStatusList = /** @class */ (function (_super) {
    tslib_1.__extends(WANStatusList, _super);
    function WANStatusList() {
        var _this = _super.call(this, "WAN Status List", WANStatusList.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WANStatusList.UUID = "00000212-0000-1000-8000-0026BB765291";
    return WANStatusList;
}(Characteristic_1.Characteristic));
exports.WANStatusList = WANStatusList;
Characteristic_1.Characteristic.WANStatusList = WANStatusList;
/**
 * Characteristic "Water Level"
 */
var WaterLevel = /** @class */ (function (_super) {
    tslib_1.__extends(WaterLevel, _super);
    function WaterLevel() {
        var _this = _super.call(this, "Water Level", WaterLevel.UUID, {
            format: "float" /* Formats.FLOAT */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            unit: "percentage" /* Units.PERCENTAGE */,
            minValue: 0,
            maxValue: 100,
            minStep: 1,
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WaterLevel.UUID = "000000B5-0000-1000-8000-0026BB765291";
    return WaterLevel;
}(Characteristic_1.Characteristic));
exports.WaterLevel = WaterLevel;
Characteristic_1.Characteristic.WaterLevel = WaterLevel;
/**
 * Characteristic "Wi-Fi Capabilities"
 * @since iOS 14
 */
var WiFiCapabilities = /** @class */ (function (_super) {
    tslib_1.__extends(WiFiCapabilities, _super);
    function WiFiCapabilities() {
        var _this = _super.call(this, "Wi-Fi Capabilities", WiFiCapabilities.UUID, {
            format: "uint32" /* Formats.UINT32 */,
            perms: ["pr" /* Perms.PAIRED_READ */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WiFiCapabilities.UUID = "0000022C-0000-1000-8000-0026BB765291";
    return WiFiCapabilities;
}(Characteristic_1.Characteristic));
exports.WiFiCapabilities = WiFiCapabilities;
Characteristic_1.Characteristic.WiFiCapabilities = WiFiCapabilities;
/**
 * Characteristic "Wi-Fi Configuration Control"
 * @since iOS 14
 */
var WiFiConfigurationControl = /** @class */ (function (_super) {
    tslib_1.__extends(WiFiConfigurationControl, _super);
    function WiFiConfigurationControl() {
        var _this = _super.call(this, "Wi-Fi Configuration Control", WiFiConfigurationControl.UUID, {
            format: "tlv8" /* Formats.TLV8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */, "pw" /* Perms.PAIRED_WRITE */, "tw" /* Perms.TIMED_WRITE */, "wr" /* Perms.WRITE_RESPONSE */],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WiFiConfigurationControl.UUID = "0000022D-0000-1000-8000-0026BB765291";
    return WiFiConfigurationControl;
}(Characteristic_1.Characteristic));
exports.WiFiConfigurationControl = WiFiConfigurationControl;
Characteristic_1.Characteristic.WiFiConfigurationControl = WiFiConfigurationControl;
/**
 * Characteristic "Wi-Fi Satellite Status"
 */
var WiFiSatelliteStatus = /** @class */ (function (_super) {
    tslib_1.__extends(WiFiSatelliteStatus, _super);
    function WiFiSatelliteStatus() {
        var _this = _super.call(this, "Wi-Fi Satellite Status", WiFiSatelliteStatus.UUID, {
            format: "uint8" /* Formats.UINT8 */,
            perms: ["ev" /* Perms.NOTIFY */, "pr" /* Perms.PAIRED_READ */],
            minValue: 0,
            maxValue: 2,
            validValues: [0, 1, 2],
        }) || this;
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WiFiSatelliteStatus.UUID = "0000021E-0000-1000-8000-0026BB765291";
    WiFiSatelliteStatus.UNKNOWN = 0;
    WiFiSatelliteStatus.CONNECTED = 1;
    WiFiSatelliteStatus.NOT_CONNECTED = 2;
    return WiFiSatelliteStatus;
}(Characteristic_1.Characteristic));
exports.WiFiSatelliteStatus = WiFiSatelliteStatus;
Characteristic_1.Characteristic.WiFiSatelliteStatus = WiFiSatelliteStatus;
//# sourceMappingURL=CharacteristicDefinitions.js.map