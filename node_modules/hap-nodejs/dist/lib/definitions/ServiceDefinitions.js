"use strict";
// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY
// V=880
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuritySystem = exports.ProtocolInformation = exports.PowerManagement = exports.Pairing = exports.Outlet = exports.OccupancySensor = exports.NFCAccess = exports.MotionSensor = exports.Microphone = exports.LockMechanism = exports.LockManagement = exports.LightSensor = exports.Lightbulb = exports.LeakSensor = exports.IrrigationSystem = exports.InputSource = exports.HumiditySensor = exports.HumidifierDehumidifier = exports.HeaterCooler = exports.GarageDoorOpener = exports.FirmwareUpdate = exports.FilterMaintenance = exports.Faucet = exports.Fanv2 = exports.Fan = exports.Doorbell = exports.Door = exports.Diagnostics = exports.DataStreamTransportManagement = exports.ContactSensor = exports.CloudRelay = exports.CarbonMonoxideSensor = exports.CarbonDioxideSensor = exports.CameraRTPStreamManagement = exports.CameraRecordingManagement = exports.CameraOperatingMode = exports.CameraControl = exports.BridgingState = exports.BridgeConfiguration = exports.Battery = exports.AudioStreamManagement = exports.Assistant = exports.AssetUpdate = exports.AirQualitySensor = exports.AirPurifier = exports.AccessoryRuntimeInformation = exports.AccessoryMetrics = exports.AccessoryInformation = exports.AccessControl = exports.AccessCode = void 0;
exports.WindowCovering = exports.Window = exports.WiFiTransport = exports.WiFiSatellite = exports.WiFiRouter = exports.Valve = exports.Tunnel = exports.TransferTransportManagement = exports.TimeInformation = exports.ThreadTransport = exports.Thermostat = exports.TemperatureSensor = exports.TelevisionSpeaker = exports.Television = exports.TargetControlManagement = exports.TargetControl = exports.TapManagement = exports.Switch = exports.StatelessProgrammableSwitch = exports.StatefulProgrammableSwitch = exports.Speaker = exports.SmokeSensor = exports.SmartSpeaker = exports.Slats = exports.SiriEndpoint = exports.Siri = exports.ServiceLabel = void 0;
var tslib_1 = require("tslib");
var Characteristic_1 = require("../Characteristic");
var Service_1 = require("../Service");
/**
 * Service "Access Code"
 * @since iOS 15
 */
var AccessCode = /** @class */ (function (_super) {
    tslib_1.__extends(AccessCode, _super);
    function AccessCode(displayName, subtype) {
        var _this = _super.call(this, displayName, AccessCode.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.AccessCodeControlPoint);
        _this.addCharacteristic(Characteristic_1.Characteristic.AccessCodeSupportedConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfigurationState);
        return _this;
    }
    AccessCode.UUID = "00000260-0000-1000-8000-0026BB765291";
    return AccessCode;
}(Service_1.Service));
exports.AccessCode = AccessCode;
Service_1.Service.AccessCode = AccessCode;
/**
 * Service "Access Control"
 */
var AccessControl = /** @class */ (function (_super) {
    tslib_1.__extends(AccessControl, _super);
    function AccessControl(displayName, subtype) {
        var _this = _super.call(this, displayName, AccessControl.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.AccessControlLevel);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PasswordSetting);
        return _this;
    }
    AccessControl.UUID = "000000DA-0000-1000-8000-0026BB765291";
    return AccessControl;
}(Service_1.Service));
exports.AccessControl = AccessControl;
Service_1.Service.AccessControl = AccessControl;
/**
 * Service "Accessory Information"
 */
var AccessoryInformation = /** @class */ (function (_super) {
    tslib_1.__extends(AccessoryInformation, _super);
    function AccessoryInformation(displayName, subtype) {
        var _this = _super.call(this, displayName, AccessoryInformation.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Identify);
        _this.addCharacteristic(Characteristic_1.Characteristic.Manufacturer);
        _this.addCharacteristic(Characteristic_1.Characteristic.Model);
        if (!_this.testCharacteristic(Characteristic_1.Characteristic.Name)) { // workaround for Name characteristic collision in constructor
            _this.addCharacteristic(Characteristic_1.Characteristic.Name).updateValue("Unnamed Service");
        }
        _this.addCharacteristic(Characteristic_1.Characteristic.SerialNumber);
        _this.addCharacteristic(Characteristic_1.Characteristic.FirmwareRevision);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.AccessoryFlags);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.AppMatchingIdentifier);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ConfiguredName);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HardwareFinish);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HardwareRevision);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ProductData);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SoftwareRevision);
        return _this;
    }
    AccessoryInformation.UUID = "0000003E-0000-1000-8000-0026BB765291";
    return AccessoryInformation;
}(Service_1.Service));
exports.AccessoryInformation = AccessoryInformation;
Service_1.Service.AccessoryInformation = AccessoryInformation;
/**
 * Service "Accessory Metrics"
 */
var AccessoryMetrics = /** @class */ (function (_super) {
    tslib_1.__extends(AccessoryMetrics, _super);
    function AccessoryMetrics(displayName, subtype) {
        var _this = _super.call(this, displayName, AccessoryMetrics.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.MetricsBufferFullState);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedMetrics);
        return _this;
    }
    AccessoryMetrics.UUID = "00000270-0000-1000-8000-0026BB765291";
    return AccessoryMetrics;
}(Service_1.Service));
exports.AccessoryMetrics = AccessoryMetrics;
Service_1.Service.AccessoryMetrics = AccessoryMetrics;
/**
 * Service "Accessory Runtime Information"
 */
var AccessoryRuntimeInformation = /** @class */ (function (_super) {
    tslib_1.__extends(AccessoryRuntimeInformation, _super);
    function AccessoryRuntimeInformation(displayName, subtype) {
        var _this = _super.call(this, displayName, AccessoryRuntimeInformation.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Ping);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ActivityInterval);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HeartBeat);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SleepInterval);
        return _this;
    }
    AccessoryRuntimeInformation.UUID = "00000239-0000-1000-8000-0026BB765291";
    return AccessoryRuntimeInformation;
}(Service_1.Service));
exports.AccessoryRuntimeInformation = AccessoryRuntimeInformation;
Service_1.Service.AccessoryRuntimeInformation = AccessoryRuntimeInformation;
/**
 * Service "Air Purifier"
 */
var AirPurifier = /** @class */ (function (_super) {
    tslib_1.__extends(AirPurifier, _super);
    function AirPurifier(displayName, subtype) {
        var _this = _super.call(this, displayName, AirPurifier.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentAirPurifierState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetAirPurifierState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockPhysicalControls);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationSpeed);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SwingMode);
        return _this;
    }
    AirPurifier.UUID = "000000BB-0000-1000-8000-0026BB765291";
    return AirPurifier;
}(Service_1.Service));
exports.AirPurifier = AirPurifier;
Service_1.Service.AirPurifier = AirPurifier;
/**
 * Service "Air Quality Sensor"
 */
var AirQualitySensor = /** @class */ (function (_super) {
    tslib_1.__extends(AirQualitySensor, _super);
    function AirQualitySensor(displayName, subtype) {
        var _this = _super.call(this, displayName, AirQualitySensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.AirQuality);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.NitrogenDioxideDensity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.OzoneDensity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PM10Density);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PM2_5Density);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SulphurDioxideDensity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.VOCDensity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    AirQualitySensor.UUID = "0000008D-0000-1000-8000-0026BB765291";
    return AirQualitySensor;
}(Service_1.Service));
exports.AirQualitySensor = AirQualitySensor;
Service_1.Service.AirQualitySensor = AirQualitySensor;
/**
 * Service "Asset Update"
 */
var AssetUpdate = /** @class */ (function (_super) {
    tslib_1.__extends(AssetUpdate, _super);
    function AssetUpdate(displayName, subtype) {
        var _this = _super.call(this, displayName, AssetUpdate.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.AssetUpdateReadiness);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedAssetTypes);
        return _this;
    }
    AssetUpdate.UUID = "00000267-0000-1000-8000-0026BB765291";
    return AssetUpdate;
}(Service_1.Service));
exports.AssetUpdate = AssetUpdate;
Service_1.Service.AssetUpdate = AssetUpdate;
/**
 * Service "Assistant"
 */
var Assistant = /** @class */ (function (_super) {
    tslib_1.__extends(Assistant, _super);
    function Assistant(displayName, subtype) {
        var _this = _super.call(this, displayName, Assistant.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.Identifier);
        if (!_this.testCharacteristic(Characteristic_1.Characteristic.Name)) { // workaround for Name characteristic collision in constructor
            _this.addCharacteristic(Characteristic_1.Characteristic.Name).updateValue("Unnamed Service");
        }
        return _this;
    }
    Assistant.UUID = "0000026A-0000-1000-8000-0026BB765291";
    return Assistant;
}(Service_1.Service));
exports.Assistant = Assistant;
Service_1.Service.Assistant = Assistant;
/**
 * Service "Audio Stream Management"
 */
var AudioStreamManagement = /** @class */ (function (_super) {
    tslib_1.__extends(AudioStreamManagement, _super);
    function AudioStreamManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, AudioStreamManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedAudioStreamConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SelectedAudioStreamConfiguration);
        return _this;
    }
    AudioStreamManagement.UUID = "00000127-0000-1000-8000-0026BB765291";
    return AudioStreamManagement;
}(Service_1.Service));
exports.AudioStreamManagement = AudioStreamManagement;
Service_1.Service.AudioStreamManagement = AudioStreamManagement;
/**
 * Service "Battery"
 */
var Battery = /** @class */ (function (_super) {
    tslib_1.__extends(Battery, _super);
    function Battery(displayName, subtype) {
        var _this = _super.call(this, displayName, Battery.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.BatteryLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ChargingState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Battery.UUID = "00000096-0000-1000-8000-0026BB765291";
    return Battery;
}(Service_1.Service));
exports.Battery = Battery;
// noinspection JSDeprecatedSymbols
Service_1.Service.BatteryService = Battery;
Service_1.Service.Battery = Battery;
/**
 * Service "Bridge Configuration"
 * @deprecated Removed and not used anymore
 */
var BridgeConfiguration = /** @class */ (function (_super) {
    tslib_1.__extends(BridgeConfiguration, _super);
    function BridgeConfiguration(displayName, subtype) {
        var _this = _super.call(this, displayName, BridgeConfiguration.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfigureBridgedAccessoryStatus);
        _this.addCharacteristic(Characteristic_1.Characteristic.DiscoverBridgedAccessories);
        _this.addCharacteristic(Characteristic_1.Characteristic.DiscoveredBridgedAccessories);
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfigureBridgedAccessory);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    BridgeConfiguration.UUID = "000000A1-0000-1000-8000-0026BB765291";
    return BridgeConfiguration;
}(Service_1.Service));
exports.BridgeConfiguration = BridgeConfiguration;
// noinspection JSDeprecatedSymbols
Service_1.Service.BridgeConfiguration = BridgeConfiguration;
/**
 * Service "Bridging State"
 * @deprecated Removed and not used anymore
 */
var BridgingState = /** @class */ (function (_super) {
    tslib_1.__extends(BridgingState, _super);
    function BridgingState(displayName, subtype) {
        var _this = _super.call(this, displayName, BridgingState.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Reachable);
        _this.addCharacteristic(Characteristic_1.Characteristic.LinkQuality);
        _this.addCharacteristic(Characteristic_1.Characteristic.AccessoryIdentifier);
        _this.addCharacteristic(Characteristic_1.Characteristic.Category);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    BridgingState.UUID = "00000062-0000-1000-8000-0026BB765291";
    return BridgingState;
}(Service_1.Service));
exports.BridgingState = BridgingState;
// noinspection JSDeprecatedSymbols
Service_1.Service.BridgingState = BridgingState;
/**
 * Service "Camera Control"
 * @deprecated This service has no usage anymore and will be ignored by iOS
 */
var CameraControl = /** @class */ (function (_super) {
    tslib_1.__extends(CameraControl, _super);
    function CameraControl(displayName, subtype) {
        var _this = _super.call(this, displayName, CameraControl.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.On);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentHorizontalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentVerticalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetHorizontalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetVerticalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.NightVision);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.OpticalZoom);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.DigitalZoom);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ImageRotation);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ImageMirroring);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    CameraControl.UUID = "00000111-0000-1000-8000-0026BB765291";
    return CameraControl;
}(Service_1.Service));
exports.CameraControl = CameraControl;
// noinspection JSDeprecatedSymbols
Service_1.Service.CameraControl = CameraControl;
/**
 * Service "Camera Operating Mode"
 */
var CameraOperatingMode = /** @class */ (function (_super) {
    tslib_1.__extends(CameraOperatingMode, _super);
    function CameraOperatingMode(displayName, subtype) {
        var _this = _super.call(this, displayName, CameraOperatingMode.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.EventSnapshotsActive);
        _this.addCharacteristic(Characteristic_1.Characteristic.HomeKitCameraActive);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CameraOperatingModeIndicator);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ManuallyDisabled);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.NightVision);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PeriodicSnapshotsActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ThirdPartyCameraActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.DiagonalFieldOfView);
        return _this;
    }
    CameraOperatingMode.UUID = "0000021A-0000-1000-8000-0026BB765291";
    return CameraOperatingMode;
}(Service_1.Service));
exports.CameraOperatingMode = CameraOperatingMode;
Service_1.Service.CameraOperatingMode = CameraOperatingMode;
/**
 * Service "Camera Recording Management"
 */
var CameraRecordingManagement = /** @class */ (function (_super) {
    tslib_1.__extends(CameraRecordingManagement, _super);
    function CameraRecordingManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, CameraRecordingManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.SelectedCameraRecordingConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedAudioRecordingConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedCameraRecordingConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedVideoRecordingConfiguration);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RecordingAudioActive);
        return _this;
    }
    CameraRecordingManagement.UUID = "00000204-0000-1000-8000-0026BB765291";
    return CameraRecordingManagement;
}(Service_1.Service));
exports.CameraRecordingManagement = CameraRecordingManagement;
// noinspection JSDeprecatedSymbols
Service_1.Service.CameraEventRecordingManagement = CameraRecordingManagement;
Service_1.Service.CameraRecordingManagement = CameraRecordingManagement;
/**
 * Service "Camera RTP Stream Management"
 */
var CameraRTPStreamManagement = /** @class */ (function (_super) {
    tslib_1.__extends(CameraRTPStreamManagement, _super);
    function CameraRTPStreamManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, CameraRTPStreamManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SelectedRTPStreamConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SetupEndpoints);
        _this.addCharacteristic(Characteristic_1.Characteristic.StreamingStatus);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedAudioStreamConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedRTPConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedVideoStreamConfiguration);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Active);
        return _this;
    }
    CameraRTPStreamManagement.UUID = "00000110-0000-1000-8000-0026BB765291";
    return CameraRTPStreamManagement;
}(Service_1.Service));
exports.CameraRTPStreamManagement = CameraRTPStreamManagement;
Service_1.Service.CameraRTPStreamManagement = CameraRTPStreamManagement;
/**
 * Service "Carbon Dioxide Sensor"
 */
var CarbonDioxideSensor = /** @class */ (function (_super) {
    tslib_1.__extends(CarbonDioxideSensor, _super);
    function CarbonDioxideSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, CarbonDioxideSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CarbonDioxideDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CarbonDioxideLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CarbonDioxidePeakLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    CarbonDioxideSensor.UUID = "00000097-0000-1000-8000-0026BB765291";
    return CarbonDioxideSensor;
}(Service_1.Service));
exports.CarbonDioxideSensor = CarbonDioxideSensor;
Service_1.Service.CarbonDioxideSensor = CarbonDioxideSensor;
/**
 * Service "Carbon Monoxide Sensor"
 */
var CarbonMonoxideSensor = /** @class */ (function (_super) {
    tslib_1.__extends(CarbonMonoxideSensor, _super);
    function CarbonMonoxideSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, CarbonMonoxideSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CarbonMonoxideDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CarbonMonoxideLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CarbonMonoxidePeakLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    CarbonMonoxideSensor.UUID = "0000007F-0000-1000-8000-0026BB765291";
    return CarbonMonoxideSensor;
}(Service_1.Service));
exports.CarbonMonoxideSensor = CarbonMonoxideSensor;
Service_1.Service.CarbonMonoxideSensor = CarbonMonoxideSensor;
/**
 * Service "Cloud Relay"
 */
var CloudRelay = /** @class */ (function (_super) {
    tslib_1.__extends(CloudRelay, _super);
    function CloudRelay(displayName, subtype) {
        var _this = _super.call(this, displayName, CloudRelay.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.RelayControlPoint);
        _this.addCharacteristic(Characteristic_1.Characteristic.RelayState);
        _this.addCharacteristic(Characteristic_1.Characteristic.RelayEnabled);
        return _this;
    }
    CloudRelay.UUID = "0000005A-0000-1000-8000-0026BB765291";
    return CloudRelay;
}(Service_1.Service));
exports.CloudRelay = CloudRelay;
// noinspection JSDeprecatedSymbols
Service_1.Service.Relay = CloudRelay;
Service_1.Service.CloudRelay = CloudRelay;
/**
 * Service "Contact Sensor"
 */
var ContactSensor = /** @class */ (function (_super) {
    tslib_1.__extends(ContactSensor, _super);
    function ContactSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, ContactSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ContactSensorState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    ContactSensor.UUID = "00000080-0000-1000-8000-0026BB765291";
    return ContactSensor;
}(Service_1.Service));
exports.ContactSensor = ContactSensor;
Service_1.Service.ContactSensor = ContactSensor;
/**
 * Service "Data Stream Transport Management"
 */
var DataStreamTransportManagement = /** @class */ (function (_super) {
    tslib_1.__extends(DataStreamTransportManagement, _super);
    function DataStreamTransportManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, DataStreamTransportManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SetupDataStreamTransport);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedDataStreamTransportConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.Version);
        return _this;
    }
    DataStreamTransportManagement.UUID = "00000129-0000-1000-8000-0026BB765291";
    return DataStreamTransportManagement;
}(Service_1.Service));
exports.DataStreamTransportManagement = DataStreamTransportManagement;
Service_1.Service.DataStreamTransportManagement = DataStreamTransportManagement;
/**
 * Service "Diagnostics"
 */
var Diagnostics = /** @class */ (function (_super) {
    tslib_1.__extends(Diagnostics, _super);
    function Diagnostics(displayName, subtype) {
        var _this = _super.call(this, displayName, Diagnostics.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedDiagnosticsSnapshot);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SelectedDiagnosticsModes);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SupportedDiagnosticsModes);
        return _this;
    }
    Diagnostics.UUID = "00000237-0000-1000-8000-0026BB765291";
    return Diagnostics;
}(Service_1.Service));
exports.Diagnostics = Diagnostics;
Service_1.Service.Diagnostics = Diagnostics;
/**
 * Service "Door"
 */
var Door = /** @class */ (function (_super) {
    tslib_1.__extends(Door, _super);
    function Door(displayName, subtype) {
        var _this = _super.call(this, displayName, Door.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentPosition);
        _this.addCharacteristic(Characteristic_1.Characteristic.PositionState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetPosition);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ObstructionDetected);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HoldPosition);
        return _this;
    }
    Door.UUID = "00000081-0000-1000-8000-0026BB765291";
    return Door;
}(Service_1.Service));
exports.Door = Door;
Service_1.Service.Door = Door;
/**
 * Service "Doorbell"
 */
var Doorbell = /** @class */ (function (_super) {
    tslib_1.__extends(Doorbell, _super);
    function Doorbell(displayName, subtype) {
        var _this = _super.call(this, displayName, Doorbell.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchEvent);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Brightness);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Mute);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.OperatingStateResponse);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Volume);
        return _this;
    }
    Doorbell.UUID = "00000121-0000-1000-8000-0026BB765291";
    return Doorbell;
}(Service_1.Service));
exports.Doorbell = Doorbell;
Service_1.Service.Doorbell = Doorbell;
/**
 * Service "Fan"
 */
var Fan = /** @class */ (function (_super) {
    tslib_1.__extends(Fan, _super);
    function Fan(displayName, subtype) {
        var _this = _super.call(this, displayName, Fan.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.On);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationDirection);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationSpeed);
        return _this;
    }
    Fan.UUID = "00000040-0000-1000-8000-0026BB765291";
    return Fan;
}(Service_1.Service));
exports.Fan = Fan;
Service_1.Service.Fan = Fan;
/**
 * Service "Fanv2"
 */
var Fanv2 = /** @class */ (function (_super) {
    tslib_1.__extends(Fanv2, _super);
    function Fanv2(displayName, subtype) {
        var _this = _super.call(this, displayName, Fanv2.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentFanState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetFanState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockPhysicalControls);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationDirection);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationSpeed);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SwingMode);
        return _this;
    }
    Fanv2.UUID = "000000B7-0000-1000-8000-0026BB765291";
    return Fanv2;
}(Service_1.Service));
exports.Fanv2 = Fanv2;
Service_1.Service.Fanv2 = Fanv2;
/**
 * Service "Faucet"
 */
var Faucet = /** @class */ (function (_super) {
    tslib_1.__extends(Faucet, _super);
    function Faucet(displayName, subtype) {
        var _this = _super.call(this, displayName, Faucet.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        return _this;
    }
    Faucet.UUID = "000000D7-0000-1000-8000-0026BB765291";
    return Faucet;
}(Service_1.Service));
exports.Faucet = Faucet;
Service_1.Service.Faucet = Faucet;
/**
 * Service "Filter Maintenance"
 */
var FilterMaintenance = /** @class */ (function (_super) {
    tslib_1.__extends(FilterMaintenance, _super);
    function FilterMaintenance(displayName, subtype) {
        var _this = _super.call(this, displayName, FilterMaintenance.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.FilterChangeIndication);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.FilterLifeLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ResetFilterIndication);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    FilterMaintenance.UUID = "000000BA-0000-1000-8000-0026BB765291";
    return FilterMaintenance;
}(Service_1.Service));
exports.FilterMaintenance = FilterMaintenance;
Service_1.Service.FilterMaintenance = FilterMaintenance;
/**
 * Service "Firmware Update"
 */
var FirmwareUpdate = /** @class */ (function (_super) {
    tslib_1.__extends(FirmwareUpdate, _super);
    function FirmwareUpdate(displayName, subtype) {
        var _this = _super.call(this, displayName, FirmwareUpdate.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.FirmwareUpdateReadiness);
        _this.addCharacteristic(Characteristic_1.Characteristic.FirmwareUpdateStatus);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StagedFirmwareVersion);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SupportedFirmwareUpdateConfiguration);
        return _this;
    }
    FirmwareUpdate.UUID = "00000236-0000-1000-8000-0026BB765291";
    return FirmwareUpdate;
}(Service_1.Service));
exports.FirmwareUpdate = FirmwareUpdate;
Service_1.Service.FirmwareUpdate = FirmwareUpdate;
/**
 * Service "Garage Door Opener"
 */
var GarageDoorOpener = /** @class */ (function (_super) {
    tslib_1.__extends(GarageDoorOpener, _super);
    function GarageDoorOpener(displayName, subtype) {
        var _this = _super.call(this, displayName, GarageDoorOpener.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentDoorState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetDoorState);
        _this.addCharacteristic(Characteristic_1.Characteristic.ObstructionDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockCurrentState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockTargetState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    GarageDoorOpener.UUID = "00000041-0000-1000-8000-0026BB765291";
    return GarageDoorOpener;
}(Service_1.Service));
exports.GarageDoorOpener = GarageDoorOpener;
Service_1.Service.GarageDoorOpener = GarageDoorOpener;
/**
 * Service "Heater-Cooler"
 */
var HeaterCooler = /** @class */ (function (_super) {
    tslib_1.__extends(HeaterCooler, _super);
    function HeaterCooler(displayName, subtype) {
        var _this = _super.call(this, displayName, HeaterCooler.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentHeaterCoolerState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetHeaterCoolerState);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTemperature);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockPhysicalControls);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationSpeed);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SwingMode);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CoolingThresholdTemperature);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HeatingThresholdTemperature);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TemperatureDisplayUnits);
        return _this;
    }
    HeaterCooler.UUID = "000000BC-0000-1000-8000-0026BB765291";
    return HeaterCooler;
}(Service_1.Service));
exports.HeaterCooler = HeaterCooler;
Service_1.Service.HeaterCooler = HeaterCooler;
/**
 * Service "Humidifier-Dehumidifier"
 */
var HumidifierDehumidifier = /** @class */ (function (_super) {
    tslib_1.__extends(HumidifierDehumidifier, _super);
    function HumidifierDehumidifier(displayName, subtype) {
        var _this = _super.call(this, displayName, HumidifierDehumidifier.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentHumidifierDehumidifierState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetHumidifierDehumidifierState);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentRelativeHumidity);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockPhysicalControls);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RelativeHumidityDehumidifierThreshold);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RelativeHumidityHumidifierThreshold);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationSpeed);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SwingMode);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.WaterLevel);
        return _this;
    }
    HumidifierDehumidifier.UUID = "000000BD-0000-1000-8000-0026BB765291";
    return HumidifierDehumidifier;
}(Service_1.Service));
exports.HumidifierDehumidifier = HumidifierDehumidifier;
Service_1.Service.HumidifierDehumidifier = HumidifierDehumidifier;
/**
 * Service "Humidity Sensor"
 */
var HumiditySensor = /** @class */ (function (_super) {
    tslib_1.__extends(HumiditySensor, _super);
    function HumiditySensor(displayName, subtype) {
        var _this = _super.call(this, displayName, HumiditySensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentRelativeHumidity);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    HumiditySensor.UUID = "00000082-0000-1000-8000-0026BB765291";
    return HumiditySensor;
}(Service_1.Service));
exports.HumiditySensor = HumiditySensor;
Service_1.Service.HumiditySensor = HumiditySensor;
/**
 * Service "Input Source"
 */
var InputSource = /** @class */ (function (_super) {
    tslib_1.__extends(InputSource, _super);
    function InputSource(displayName, subtype) {
        var _this = _super.call(this, displayName, InputSource.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfiguredName);
        _this.addCharacteristic(Characteristic_1.Characteristic.InputSourceType);
        _this.addCharacteristic(Characteristic_1.Characteristic.IsConfigured);
        if (!_this.testCharacteristic(Characteristic_1.Characteristic.Name)) { // workaround for Name characteristic collision in constructor
            _this.addCharacteristic(Characteristic_1.Characteristic.Name).updateValue("Unnamed Service");
        }
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentVisibilityState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Identifier);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.InputDeviceType);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetVisibilityState);
        return _this;
    }
    InputSource.UUID = "000000D9-0000-1000-8000-0026BB765291";
    return InputSource;
}(Service_1.Service));
exports.InputSource = InputSource;
Service_1.Service.InputSource = InputSource;
/**
 * Service "Irrigation-System"
 */
var IrrigationSystem = /** @class */ (function (_super) {
    tslib_1.__extends(IrrigationSystem, _super);
    function IrrigationSystem(displayName, subtype) {
        var _this = _super.call(this, displayName, IrrigationSystem.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.ProgramMode);
        _this.addCharacteristic(Characteristic_1.Characteristic.InUse);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RemainingDuration);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        return _this;
    }
    IrrigationSystem.UUID = "000000CF-0000-1000-8000-0026BB765291";
    return IrrigationSystem;
}(Service_1.Service));
exports.IrrigationSystem = IrrigationSystem;
Service_1.Service.IrrigationSystem = IrrigationSystem;
/**
 * Service "Leak Sensor"
 */
var LeakSensor = /** @class */ (function (_super) {
    tslib_1.__extends(LeakSensor, _super);
    function LeakSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, LeakSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.LeakDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    LeakSensor.UUID = "00000083-0000-1000-8000-0026BB765291";
    return LeakSensor;
}(Service_1.Service));
exports.LeakSensor = LeakSensor;
Service_1.Service.LeakSensor = LeakSensor;
/**
 * Service "Lightbulb"
 */
var Lightbulb = /** @class */ (function (_super) {
    tslib_1.__extends(Lightbulb, _super);
    function Lightbulb(displayName, subtype) {
        var _this = _super.call(this, displayName, Lightbulb.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.On);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Brightness);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CharacteristicValueActiveTransitionCount);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CharacteristicValueTransitionControl);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ColorTemperature);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Hue);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Saturation);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SupportedCharacteristicValueTransitionConfiguration);
        return _this;
    }
    Lightbulb.UUID = "00000043-0000-1000-8000-0026BB765291";
    return Lightbulb;
}(Service_1.Service));
exports.Lightbulb = Lightbulb;
Service_1.Service.Lightbulb = Lightbulb;
/**
 * Service "Light Sensor"
 */
var LightSensor = /** @class */ (function (_super) {
    tslib_1.__extends(LightSensor, _super);
    function LightSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, LightSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentAmbientLightLevel);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    LightSensor.UUID = "00000084-0000-1000-8000-0026BB765291";
    return LightSensor;
}(Service_1.Service));
exports.LightSensor = LightSensor;
Service_1.Service.LightSensor = LightSensor;
/**
 * Service "Lock Management"
 */
var LockManagement = /** @class */ (function (_super) {
    tslib_1.__extends(LockManagement, _super);
    function LockManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, LockManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.LockControlPoint);
        _this.addCharacteristic(Characteristic_1.Characteristic.Version);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.AdministratorOnlyAccess);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.AudioFeedback);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentDoorState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockManagementAutoSecurityTimeout);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockLastKnownAction);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Logs);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.MotionDetected);
        return _this;
    }
    LockManagement.UUID = "00000044-0000-1000-8000-0026BB765291";
    return LockManagement;
}(Service_1.Service));
exports.LockManagement = LockManagement;
Service_1.Service.LockManagement = LockManagement;
/**
 * Service "Lock Mechanism"
 */
var LockMechanism = /** @class */ (function (_super) {
    tslib_1.__extends(LockMechanism, _super);
    function LockMechanism(displayName, subtype) {
        var _this = _super.call(this, displayName, LockMechanism.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.LockCurrentState);
        _this.addCharacteristic(Characteristic_1.Characteristic.LockTargetState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    LockMechanism.UUID = "00000045-0000-1000-8000-0026BB765291";
    return LockMechanism;
}(Service_1.Service));
exports.LockMechanism = LockMechanism;
Service_1.Service.LockMechanism = LockMechanism;
/**
 * Service "Microphone"
 */
var Microphone = /** @class */ (function (_super) {
    tslib_1.__extends(Microphone, _super);
    function Microphone(displayName, subtype) {
        var _this = _super.call(this, displayName, Microphone.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Mute);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Volume);
        return _this;
    }
    Microphone.UUID = "00000112-0000-1000-8000-0026BB765291";
    return Microphone;
}(Service_1.Service));
exports.Microphone = Microphone;
Service_1.Service.Microphone = Microphone;
/**
 * Service "Motion Sensor"
 */
var MotionSensor = /** @class */ (function (_super) {
    tslib_1.__extends(MotionSensor, _super);
    function MotionSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, MotionSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.MotionDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    MotionSensor.UUID = "00000085-0000-1000-8000-0026BB765291";
    return MotionSensor;
}(Service_1.Service));
exports.MotionSensor = MotionSensor;
Service_1.Service.MotionSensor = MotionSensor;
/**
 * Service "NFC Access"
 * @since iOS 15
 */
var NFCAccess = /** @class */ (function (_super) {
    tslib_1.__extends(NFCAccess, _super);
    function NFCAccess(displayName, subtype) {
        var _this = _super.call(this, displayName, NFCAccess.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfigurationState);
        _this.addCharacteristic(Characteristic_1.Characteristic.NFCAccessControlPoint);
        _this.addCharacteristic(Characteristic_1.Characteristic.NFCAccessSupportedConfiguration);
        return _this;
    }
    NFCAccess.UUID = "00000266-0000-1000-8000-0026BB765291";
    return NFCAccess;
}(Service_1.Service));
exports.NFCAccess = NFCAccess;
Service_1.Service.NFCAccess = NFCAccess;
/**
 * Service "Occupancy Sensor"
 */
var OccupancySensor = /** @class */ (function (_super) {
    tslib_1.__extends(OccupancySensor, _super);
    function OccupancySensor(displayName, subtype) {
        var _this = _super.call(this, displayName, OccupancySensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.OccupancyDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    OccupancySensor.UUID = "00000086-0000-1000-8000-0026BB765291";
    return OccupancySensor;
}(Service_1.Service));
exports.OccupancySensor = OccupancySensor;
Service_1.Service.OccupancySensor = OccupancySensor;
/**
 * Service "Outlet"
 * @since iOS 13
 */
var Outlet = /** @class */ (function (_super) {
    tslib_1.__extends(Outlet, _super);
    function Outlet(displayName, subtype) {
        var _this = _super.call(this, displayName, Outlet.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.On);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.OutletInUse);
        return _this;
    }
    Outlet.UUID = "00000047-0000-1000-8000-0026BB765291";
    return Outlet;
}(Service_1.Service));
exports.Outlet = Outlet;
Service_1.Service.Outlet = Outlet;
/**
 * Service "Pairing"
 */
var Pairing = /** @class */ (function (_super) {
    tslib_1.__extends(Pairing, _super);
    function Pairing(displayName, subtype) {
        var _this = _super.call(this, displayName, Pairing.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ListPairings);
        _this.addCharacteristic(Characteristic_1.Characteristic.PairSetup);
        _this.addCharacteristic(Characteristic_1.Characteristic.PairVerify);
        _this.addCharacteristic(Characteristic_1.Characteristic.PairingFeatures);
        return _this;
    }
    Pairing.UUID = "00000055-0000-1000-8000-0026BB765291";
    return Pairing;
}(Service_1.Service));
exports.Pairing = Pairing;
Service_1.Service.Pairing = Pairing;
/**
 * Service "Power Management"
 */
var PowerManagement = /** @class */ (function (_super) {
    tslib_1.__extends(PowerManagement, _super);
    function PowerManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, PowerManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.WakeConfiguration);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SelectedSleepConfiguration);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SupportedSleepConfiguration);
        return _this;
    }
    PowerManagement.UUID = "00000221-0000-1000-8000-0026BB765291";
    return PowerManagement;
}(Service_1.Service));
exports.PowerManagement = PowerManagement;
Service_1.Service.PowerManagement = PowerManagement;
/**
 * Service "Protocol Information"
 */
var ProtocolInformation = /** @class */ (function (_super) {
    tslib_1.__extends(ProtocolInformation, _super);
    function ProtocolInformation(displayName, subtype) {
        var _this = _super.call(this, displayName, ProtocolInformation.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Version);
        return _this;
    }
    ProtocolInformation.UUID = "000000A2-0000-1000-8000-0026BB765291";
    return ProtocolInformation;
}(Service_1.Service));
exports.ProtocolInformation = ProtocolInformation;
Service_1.Service.ProtocolInformation = ProtocolInformation;
/**
 * Service "Security System"
 */
var SecuritySystem = /** @class */ (function (_super) {
    tslib_1.__extends(SecuritySystem, _super);
    function SecuritySystem(displayName, subtype) {
        var _this = _super.call(this, displayName, SecuritySystem.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SecuritySystemCurrentState);
        _this.addCharacteristic(Characteristic_1.Characteristic.SecuritySystemTargetState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SecuritySystemAlarmType);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    SecuritySystem.UUID = "0000007E-0000-1000-8000-0026BB765291";
    return SecuritySystem;
}(Service_1.Service));
exports.SecuritySystem = SecuritySystem;
Service_1.Service.SecuritySystem = SecuritySystem;
/**
 * Service "Service Label"
 */
var ServiceLabel = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceLabel, _super);
    function ServiceLabel(displayName, subtype) {
        var _this = _super.call(this, displayName, ServiceLabel.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ServiceLabelNamespace);
        return _this;
    }
    ServiceLabel.UUID = "000000CC-0000-1000-8000-0026BB765291";
    return ServiceLabel;
}(Service_1.Service));
exports.ServiceLabel = ServiceLabel;
Service_1.Service.ServiceLabel = ServiceLabel;
/**
 * Service "Siri"
 */
var Siri = /** @class */ (function (_super) {
    tslib_1.__extends(Siri, _super);
    function Siri(displayName, subtype) {
        var _this = _super.call(this, displayName, Siri.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SiriInputType);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.MultifunctionButton);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SiriEnable);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SiriEngineVersion);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SiriLightOnUse);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SiriListening);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SiriTouchToUse);
        return _this;
    }
    Siri.UUID = "00000133-0000-1000-8000-0026BB765291";
    return Siri;
}(Service_1.Service));
exports.Siri = Siri;
Service_1.Service.Siri = Siri;
/**
 * Service "Siri Endpoint"
 */
var SiriEndpoint = /** @class */ (function (_super) {
    tslib_1.__extends(SiriEndpoint, _super);
    function SiriEndpoint(displayName, subtype) {
        var _this = _super.call(this, displayName, SiriEndpoint.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SiriEndpointSessionStatus);
        _this.addCharacteristic(Characteristic_1.Characteristic.Version);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ActiveIdentifier);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ManuallyDisabled);
        return _this;
    }
    SiriEndpoint.UUID = "00000253-0000-1000-8000-0026BB765291";
    return SiriEndpoint;
}(Service_1.Service));
exports.SiriEndpoint = SiriEndpoint;
Service_1.Service.SiriEndpoint = SiriEndpoint;
/**
 * Service "Slats"
 */
var Slats = /** @class */ (function (_super) {
    tslib_1.__extends(Slats, _super);
    function Slats(displayName, subtype) {
        var _this = _super.call(this, displayName, Slats.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentSlatState);
        _this.addCharacteristic(Characteristic_1.Characteristic.SlatType);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SwingMode);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetTiltAngle);
        return _this;
    }
    Slats.UUID = "000000B9-0000-1000-8000-0026BB765291";
    return Slats;
}(Service_1.Service));
exports.Slats = Slats;
// noinspection JSDeprecatedSymbols
Service_1.Service.Slat = Slats;
Service_1.Service.Slats = Slats;
/**
 * Service "Smart Speaker"
 */
var SmartSpeaker = /** @class */ (function (_super) {
    tslib_1.__extends(SmartSpeaker, _super);
    function SmartSpeaker(displayName, subtype) {
        var _this = _super.call(this, displayName, SmartSpeaker.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentMediaState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetMediaState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.AirPlayEnable);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ConfiguredName);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Mute);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Volume);
        return _this;
    }
    SmartSpeaker.UUID = "00000228-0000-1000-8000-0026BB765291";
    return SmartSpeaker;
}(Service_1.Service));
exports.SmartSpeaker = SmartSpeaker;
Service_1.Service.SmartSpeaker = SmartSpeaker;
/**
 * Service "Smoke Sensor"
 */
var SmokeSensor = /** @class */ (function (_super) {
    tslib_1.__extends(SmokeSensor, _super);
    function SmokeSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, SmokeSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SmokeDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    SmokeSensor.UUID = "00000087-0000-1000-8000-0026BB765291";
    return SmokeSensor;
}(Service_1.Service));
exports.SmokeSensor = SmokeSensor;
Service_1.Service.SmokeSensor = SmokeSensor;
/**
 * Service "Speaker"
 * @since iOS 10
 */
var Speaker = /** @class */ (function (_super) {
    tslib_1.__extends(Speaker, _super);
    function Speaker(displayName, subtype) {
        var _this = _super.call(this, displayName, Speaker.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Mute);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Volume);
        return _this;
    }
    Speaker.UUID = "00000113-0000-1000-8000-0026BB765291";
    return Speaker;
}(Service_1.Service));
exports.Speaker = Speaker;
Service_1.Service.Speaker = Speaker;
/**
 * Service "Stateful Programmable Switch"
 */
var StatefulProgrammableSwitch = /** @class */ (function (_super) {
    tslib_1.__extends(StatefulProgrammableSwitch, _super);
    function StatefulProgrammableSwitch(displayName, subtype) {
        var _this = _super.call(this, displayName, StatefulProgrammableSwitch.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchEvent);
        _this.addCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchOutputState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    StatefulProgrammableSwitch.UUID = "00000088-0000-1000-8000-0026BB765291";
    return StatefulProgrammableSwitch;
}(Service_1.Service));
exports.StatefulProgrammableSwitch = StatefulProgrammableSwitch;
Service_1.Service.StatefulProgrammableSwitch = StatefulProgrammableSwitch;
/**
 * Service "Stateless Programmable Switch"
 */
var StatelessProgrammableSwitch = /** @class */ (function (_super) {
    tslib_1.__extends(StatelessProgrammableSwitch, _super);
    function StatelessProgrammableSwitch(displayName, subtype) {
        var _this = _super.call(this, displayName, StatelessProgrammableSwitch.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchEvent);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ServiceLabelIndex);
        return _this;
    }
    StatelessProgrammableSwitch.UUID = "00000089-0000-1000-8000-0026BB765291";
    return StatelessProgrammableSwitch;
}(Service_1.Service));
exports.StatelessProgrammableSwitch = StatelessProgrammableSwitch;
Service_1.Service.StatelessProgrammableSwitch = StatelessProgrammableSwitch;
/**
 * Service "Switch"
 */
var Switch = /** @class */ (function (_super) {
    tslib_1.__extends(Switch, _super);
    function Switch(displayName, subtype) {
        var _this = _super.call(this, displayName, Switch.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.On);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Switch.UUID = "00000049-0000-1000-8000-0026BB765291";
    return Switch;
}(Service_1.Service));
exports.Switch = Switch;
Service_1.Service.Switch = Switch;
/**
 * Service "Tap Management"
 */
var TapManagement = /** @class */ (function (_super) {
    tslib_1.__extends(TapManagement, _super);
    function TapManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, TapManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.CryptoHash);
        _this.addCharacteristic(Characteristic_1.Characteristic.TapType);
        _this.addCharacteristic(Characteristic_1.Characteristic.Token);
        return _this;
    }
    TapManagement.UUID = "0000022E-0000-1000-8000-0026BB765291";
    return TapManagement;
}(Service_1.Service));
exports.TapManagement = TapManagement;
Service_1.Service.TapManagement = TapManagement;
/**
 * Service "Target Control"
 */
var TargetControl = /** @class */ (function (_super) {
    tslib_1.__extends(TargetControl, _super);
    function TargetControl(displayName, subtype) {
        var _this = _super.call(this, displayName, TargetControl.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.ActiveIdentifier);
        _this.addCharacteristic(Characteristic_1.Characteristic.ButtonEvent);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    TargetControl.UUID = "00000125-0000-1000-8000-0026BB765291";
    return TargetControl;
}(Service_1.Service));
exports.TargetControl = TargetControl;
Service_1.Service.TargetControl = TargetControl;
/**
 * Service "Target Control Management"
 */
var TargetControlManagement = /** @class */ (function (_super) {
    tslib_1.__extends(TargetControlManagement, _super);
    function TargetControlManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, TargetControlManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetControlSupportedConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetControlList);
        return _this;
    }
    TargetControlManagement.UUID = "00000122-0000-1000-8000-0026BB765291";
    return TargetControlManagement;
}(Service_1.Service));
exports.TargetControlManagement = TargetControlManagement;
Service_1.Service.TargetControlManagement = TargetControlManagement;
/**
 * Service "Television"
 */
var Television = /** @class */ (function (_super) {
    tslib_1.__extends(Television, _super);
    function Television(displayName, subtype) {
        var _this = _super.call(this, displayName, Television.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.ActiveIdentifier);
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfiguredName);
        _this.addCharacteristic(Characteristic_1.Characteristic.RemoteKey);
        _this.addCharacteristic(Characteristic_1.Characteristic.SleepDiscoveryMode);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Brightness);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ClosedCaptions);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.DisplayOrder);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentMediaState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetMediaState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PictureMode);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PowerModeSelection);
        return _this;
    }
    Television.UUID = "000000D8-0000-1000-8000-0026BB765291";
    return Television;
}(Service_1.Service));
exports.Television = Television;
Service_1.Service.Television = Television;
/**
 * Service "Television Speaker"
 */
var TelevisionSpeaker = /** @class */ (function (_super) {
    tslib_1.__extends(TelevisionSpeaker, _super);
    function TelevisionSpeaker(displayName, subtype) {
        var _this = _super.call(this, displayName, TelevisionSpeaker.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Mute);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Volume);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.VolumeControlType);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.VolumeSelector);
        return _this;
    }
    TelevisionSpeaker.UUID = "00000113-0000-1000-8000-0026BB765291";
    return TelevisionSpeaker;
}(Service_1.Service));
exports.TelevisionSpeaker = TelevisionSpeaker;
Service_1.Service.TelevisionSpeaker = TelevisionSpeaker;
/**
 * Service "Temperature Sensor"
 */
var TemperatureSensor = /** @class */ (function (_super) {
    tslib_1.__extends(TemperatureSensor, _super);
    function TemperatureSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, TemperatureSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTemperature);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        return _this;
    }
    TemperatureSensor.UUID = "0000008A-0000-1000-8000-0026BB765291";
    return TemperatureSensor;
}(Service_1.Service));
exports.TemperatureSensor = TemperatureSensor;
Service_1.Service.TemperatureSensor = TemperatureSensor;
/**
 * Service "Thermostat"
 */
var Thermostat = /** @class */ (function (_super) {
    tslib_1.__extends(Thermostat, _super);
    function Thermostat(displayName, subtype) {
        var _this = _super.call(this, displayName, Thermostat.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentHeatingCoolingState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetHeatingCoolingState);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTemperature);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetTemperature);
        _this.addCharacteristic(Characteristic_1.Characteristic.TemperatureDisplayUnits);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentRelativeHumidity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetRelativeHumidity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CoolingThresholdTemperature);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HeatingThresholdTemperature);
        return _this;
    }
    Thermostat.UUID = "0000004A-0000-1000-8000-0026BB765291";
    return Thermostat;
}(Service_1.Service));
exports.Thermostat = Thermostat;
Service_1.Service.Thermostat = Thermostat;
/**
 * Service "Thread Transport"
 */
var ThreadTransport = /** @class */ (function (_super) {
    tslib_1.__extends(ThreadTransport, _super);
    function ThreadTransport(displayName, subtype) {
        var _this = _super.call(this, displayName, ThreadTransport.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTransport);
        _this.addCharacteristic(Characteristic_1.Characteristic.ThreadControlPoint);
        _this.addCharacteristic(Characteristic_1.Characteristic.ThreadNodeCapabilities);
        _this.addCharacteristic(Characteristic_1.Characteristic.ThreadStatus);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CCAEnergyDetectThreshold);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CCASignalDetectThreshold);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.EventRetransmissionMaximum);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.EventTransmissionCounters);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.MACRetransmissionMaximum);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.MACTransmissionCounters);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ReceiverSensitivity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ReceivedSignalStrengthIndication);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SignalToNoiseRatio);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ThreadOpenThreadVersion);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TransmitPower);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.MaximumTransmitPower);
        return _this;
    }
    ThreadTransport.UUID = "00000701-0000-1000-8000-0026BB765291";
    return ThreadTransport;
}(Service_1.Service));
exports.ThreadTransport = ThreadTransport;
Service_1.Service.ThreadTransport = ThreadTransport;
/**
 * Service "Time Information"
 * @deprecated Removed and not used anymore
 */
var TimeInformation = /** @class */ (function (_super) {
    tslib_1.__extends(TimeInformation, _super);
    function TimeInformation(displayName, subtype) {
        var _this = _super.call(this, displayName, TimeInformation.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTime);
        _this.addCharacteristic(Characteristic_1.Characteristic.DayoftheWeek);
        _this.addCharacteristic(Characteristic_1.Characteristic.TimeUpdate);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    TimeInformation.UUID = "00000099-0000-1000-8000-0026BB765291";
    return TimeInformation;
}(Service_1.Service));
exports.TimeInformation = TimeInformation;
// noinspection JSDeprecatedSymbols
Service_1.Service.TimeInformation = TimeInformation;
/**
 * Service "Transfer Transport Management"
 */
var TransferTransportManagement = /** @class */ (function (_super) {
    tslib_1.__extends(TransferTransportManagement, _super);
    function TransferTransportManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, TransferTransportManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedTransferTransportConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SetupTransferTransport);
        return _this;
    }
    TransferTransportManagement.UUID = "00000203-0000-1000-8000-0026BB765291";
    return TransferTransportManagement;
}(Service_1.Service));
exports.TransferTransportManagement = TransferTransportManagement;
Service_1.Service.TransferTransportManagement = TransferTransportManagement;
/**
 * Service "Tunnel"
 */
var Tunnel = /** @class */ (function (_super) {
    tslib_1.__extends(Tunnel, _super);
    function Tunnel(displayName, subtype) {
        var _this = _super.call(this, displayName, Tunnel.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.AccessoryIdentifier);
        _this.addCharacteristic(Characteristic_1.Characteristic.TunnelConnectionTimeout);
        _this.addCharacteristic(Characteristic_1.Characteristic.TunneledAccessoryAdvertising);
        _this.addCharacteristic(Characteristic_1.Characteristic.TunneledAccessoryConnected);
        _this.addCharacteristic(Characteristic_1.Characteristic.TunneledAccessoryStateNumber);
        return _this;
    }
    Tunnel.UUID = "00000056-0000-1000-8000-0026BB765291";
    return Tunnel;
}(Service_1.Service));
exports.Tunnel = Tunnel;
// noinspection JSDeprecatedSymbols
Service_1.Service.TunneledBTLEAccessoryService = Tunnel;
Service_1.Service.Tunnel = Tunnel;
/**
 * Service "Valve"
 */
var Valve = /** @class */ (function (_super) {
    tslib_1.__extends(Valve, _super);
    function Valve(displayName, subtype) {
        var _this = _super.call(this, displayName, Valve.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.InUse);
        _this.addCharacteristic(Characteristic_1.Characteristic.ValveType);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.IsConfigured);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RemainingDuration);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ServiceLabelIndex);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SetDuration);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        return _this;
    }
    Valve.UUID = "000000D0-0000-1000-8000-0026BB765291";
    return Valve;
}(Service_1.Service));
exports.Valve = Valve;
Service_1.Service.Valve = Valve;
/**
 * Service "Wi-Fi Router"
 */
var WiFiRouter = /** @class */ (function (_super) {
    tslib_1.__extends(WiFiRouter, _super);
    function WiFiRouter(displayName, subtype) {
        var _this = _super.call(this, displayName, WiFiRouter.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfiguredName);
        _this.addCharacteristic(Characteristic_1.Characteristic.ManagedNetworkEnable);
        _this.addCharacteristic(Characteristic_1.Characteristic.NetworkAccessViolationControl);
        _this.addCharacteristic(Characteristic_1.Characteristic.NetworkClientProfileControl);
        _this.addCharacteristic(Characteristic_1.Characteristic.NetworkClientStatusControl);
        _this.addCharacteristic(Characteristic_1.Characteristic.RouterStatus);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedRouterConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.WANConfigurationList);
        _this.addCharacteristic(Characteristic_1.Characteristic.WANStatusList);
        return _this;
    }
    WiFiRouter.UUID = "0000020A-0000-1000-8000-0026BB765291";
    return WiFiRouter;
}(Service_1.Service));
exports.WiFiRouter = WiFiRouter;
Service_1.Service.WiFiRouter = WiFiRouter;
/**
 * Service "Wi-Fi Satellite"
 */
var WiFiSatellite = /** @class */ (function (_super) {
    tslib_1.__extends(WiFiSatellite, _super);
    function WiFiSatellite(displayName, subtype) {
        var _this = _super.call(this, displayName, WiFiSatellite.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.WiFiSatelliteStatus);
        return _this;
    }
    WiFiSatellite.UUID = "0000020F-0000-1000-8000-0026BB765291";
    return WiFiSatellite;
}(Service_1.Service));
exports.WiFiSatellite = WiFiSatellite;
Service_1.Service.WiFiSatellite = WiFiSatellite;
/**
 * Service "Wi-Fi Transport"
 */
var WiFiTransport = /** @class */ (function (_super) {
    tslib_1.__extends(WiFiTransport, _super);
    function WiFiTransport(displayName, subtype) {
        var _this = _super.call(this, displayName, WiFiTransport.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTransport);
        _this.addCharacteristic(Characteristic_1.Characteristic.WiFiCapabilities);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.WiFiConfigurationControl);
        return _this;
    }
    WiFiTransport.UUID = "0000022A-0000-1000-8000-0026BB765291";
    return WiFiTransport;
}(Service_1.Service));
exports.WiFiTransport = WiFiTransport;
Service_1.Service.WiFiTransport = WiFiTransport;
/**
 * Service "Window"
 */
var Window = /** @class */ (function (_super) {
    tslib_1.__extends(Window, _super);
    function Window(displayName, subtype) {
        var _this = _super.call(this, displayName, Window.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentPosition);
        _this.addCharacteristic(Characteristic_1.Characteristic.PositionState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetPosition);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ObstructionDetected);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HoldPosition);
        return _this;
    }
    Window.UUID = "0000008B-0000-1000-8000-0026BB765291";
    return Window;
}(Service_1.Service));
exports.Window = Window;
Service_1.Service.Window = Window;
/**
 * Service "Window Covering"
 */
var WindowCovering = /** @class */ (function (_super) {
    tslib_1.__extends(WindowCovering, _super);
    function WindowCovering(displayName, subtype) {
        var _this = _super.call(this, displayName, WindowCovering.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentPosition);
        _this.addCharacteristic(Characteristic_1.Characteristic.PositionState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetPosition);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentHorizontalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetHorizontalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ObstructionDetected);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HoldPosition);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentVerticalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetVerticalTiltAngle);
        return _this;
    }
    WindowCovering.UUID = "0000008C-0000-1000-8000-0026BB765291";
    return WindowCovering;
}(Service_1.Service));
exports.WindowCovering = WindowCovering;
Service_1.Service.WindowCovering = WindowCovering;
//# sourceMappingURL=ServiceDefinitions.js.map