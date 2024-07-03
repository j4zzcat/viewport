"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Units = exports.Topics = exports.TargetUpdates = exports.TargetCategory = exports.StreamRequestTypes = exports.SiriAudioSessionEvents = exports.ServiceEventTypes = exports.SRTPCryptoSuites = exports.ResourceRequestReason = exports.RemoteControllerEvents = exports.Protocols = exports.Perms = exports.PacketDataType = exports.MediaContainerType = exports.HDSStatus = exports.HDSProtocolSpecificErrorReason = exports.HAPStatus = exports.HAPServerEventTypes = exports.H264Profile = exports.H264Level = exports.Formats = exports.EventTriggerOption = exports.DefaultControllerType = exports.DataStreamStatus = exports.DataStreamServerEvent = exports.DataStreamConnectionEvent = exports.DataFormatTags = exports.CharacteristicEventTypes = exports.ChangeReason = exports.Categories = exports.CameraControllerEvents = exports.ButtonType = exports.ButtonState = exports.AudioStreamingSamplerate = exports.AudioStreamingCodecType = exports.AudioSamplerate = exports.AudioRecordingSamplerate = exports.AudioRecordingCodecType = exports.AudioCodecTypes = exports.AudioBitrate = exports.AdaptiveLightingControllerMode = exports.AdaptiveLightingControllerEvents = exports.AccessoryEventTypes = exports.AccessLevel = exports.AccessControlEvent = exports.Access = exports.LogLevel = exports.PlatformAccessoryEvent = exports.PluginType = exports.APIEvent = void 0;
/**
 * Export API const enums
 */
var api_1 = require("./api");
Object.defineProperty(exports, "APIEvent", { enumerable: true, get: function () { return api_1.APIEvent; } });
Object.defineProperty(exports, "PluginType", { enumerable: true, get: function () { return api_1.PluginType; } });
/**
 * Export Platform Accessory const enums
 */
var platformAccessory_1 = require("./platformAccessory");
Object.defineProperty(exports, "PlatformAccessoryEvent", { enumerable: true, get: function () { return platformAccessory_1.PlatformAccessoryEvent; } });
/**
 * Export Logger const enums
 */
var logger_1 = require("./logger");
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return logger_1.LogLevel; } });
/**
 * Export the CONST ENUMS from hap-nodejs
 * These get converted to their string value at compile time
 * and can be safely used directly.
 */
var hap_nodejs_1 = require("hap-nodejs");
Object.defineProperty(exports, "Access", { enumerable: true, get: function () { return hap_nodejs_1.Access; } });
Object.defineProperty(exports, "AccessControlEvent", { enumerable: true, get: function () { return hap_nodejs_1.AccessControlEvent; } });
Object.defineProperty(exports, "AccessLevel", { enumerable: true, get: function () { return hap_nodejs_1.AccessLevel; } });
Object.defineProperty(exports, "AccessoryEventTypes", { enumerable: true, get: function () { return hap_nodejs_1.AccessoryEventTypes; } });
Object.defineProperty(exports, "AdaptiveLightingControllerEvents", { enumerable: true, get: function () { return hap_nodejs_1.AdaptiveLightingControllerEvents; } });
Object.defineProperty(exports, "AdaptiveLightingControllerMode", { enumerable: true, get: function () { return hap_nodejs_1.AdaptiveLightingControllerMode; } });
Object.defineProperty(exports, "AudioBitrate", { enumerable: true, get: function () { return hap_nodejs_1.AudioBitrate; } });
Object.defineProperty(exports, "AudioCodecTypes", { enumerable: true, get: function () { return hap_nodejs_1.AudioCodecTypes; } });
Object.defineProperty(exports, "AudioRecordingCodecType", { enumerable: true, get: function () { return hap_nodejs_1.AudioRecordingCodecType; } });
Object.defineProperty(exports, "AudioRecordingSamplerate", { enumerable: true, get: function () { return hap_nodejs_1.AudioRecordingSamplerate; } });
Object.defineProperty(exports, "AudioSamplerate", { enumerable: true, get: function () { return hap_nodejs_1.AudioSamplerate; } });
Object.defineProperty(exports, "AudioStreamingCodecType", { enumerable: true, get: function () { return hap_nodejs_1.AudioStreamingCodecType; } });
Object.defineProperty(exports, "AudioStreamingSamplerate", { enumerable: true, get: function () { return hap_nodejs_1.AudioStreamingSamplerate; } });
Object.defineProperty(exports, "ButtonState", { enumerable: true, get: function () { return hap_nodejs_1.ButtonState; } });
Object.defineProperty(exports, "ButtonType", { enumerable: true, get: function () { return hap_nodejs_1.ButtonType; } });
Object.defineProperty(exports, "CameraControllerEvents", { enumerable: true, get: function () { return hap_nodejs_1.CameraControllerEvents; } });
Object.defineProperty(exports, "Categories", { enumerable: true, get: function () { return hap_nodejs_1.Categories; } });
Object.defineProperty(exports, "ChangeReason", { enumerable: true, get: function () { return hap_nodejs_1.ChangeReason; } });
Object.defineProperty(exports, "CharacteristicEventTypes", { enumerable: true, get: function () { return hap_nodejs_1.CharacteristicEventTypes; } });
// CharacteristicWarningType,
Object.defineProperty(exports, "DataFormatTags", { enumerable: true, get: function () { return hap_nodejs_1.DataFormatTags; } });
Object.defineProperty(exports, "DataStreamConnectionEvent", { enumerable: true, get: function () { return hap_nodejs_1.DataStreamConnectionEvent; } });
Object.defineProperty(exports, "DataStreamServerEvent", { enumerable: true, get: function () { return hap_nodejs_1.DataStreamServerEvent; } });
Object.defineProperty(exports, "DataStreamStatus", { enumerable: true, get: function () { return hap_nodejs_1.DataStreamStatus; } });
Object.defineProperty(exports, "DefaultControllerType", { enumerable: true, get: function () { return hap_nodejs_1.DefaultControllerType; } });
Object.defineProperty(exports, "EventTriggerOption", { enumerable: true, get: function () { return hap_nodejs_1.EventTriggerOption; } });
Object.defineProperty(exports, "Formats", { enumerable: true, get: function () { return hap_nodejs_1.Formats; } });
Object.defineProperty(exports, "H264Level", { enumerable: true, get: function () { return hap_nodejs_1.H264Level; } });
Object.defineProperty(exports, "H264Profile", { enumerable: true, get: function () { return hap_nodejs_1.H264Profile; } });
// HAPHTTPCode,
// HAPPairingHTTPCode,
Object.defineProperty(exports, "HAPServerEventTypes", { enumerable: true, get: function () { return hap_nodejs_1.HAPServerEventTypes; } });
Object.defineProperty(exports, "HAPStatus", { enumerable: true, get: function () { return hap_nodejs_1.HAPStatus; } });
Object.defineProperty(exports, "HDSProtocolSpecificErrorReason", { enumerable: true, get: function () { return hap_nodejs_1.HDSProtocolSpecificErrorReason; } });
Object.defineProperty(exports, "HDSStatus", { enumerable: true, get: function () { return hap_nodejs_1.HDSStatus; } });
Object.defineProperty(exports, "MediaContainerType", { enumerable: true, get: function () { return hap_nodejs_1.MediaContainerType; } });
Object.defineProperty(exports, "PacketDataType", { enumerable: true, get: function () { return hap_nodejs_1.PacketDataType; } });
Object.defineProperty(exports, "Perms", { enumerable: true, get: function () { return hap_nodejs_1.Perms; } });
Object.defineProperty(exports, "Protocols", { enumerable: true, get: function () { return hap_nodejs_1.Protocols; } });
Object.defineProperty(exports, "RemoteControllerEvents", { enumerable: true, get: function () { return hap_nodejs_1.RemoteControllerEvents; } });
Object.defineProperty(exports, "ResourceRequestReason", { enumerable: true, get: function () { return hap_nodejs_1.ResourceRequestReason; } });
Object.defineProperty(exports, "SRTPCryptoSuites", { enumerable: true, get: function () { return hap_nodejs_1.SRTPCryptoSuites; } });
Object.defineProperty(exports, "ServiceEventTypes", { enumerable: true, get: function () { return hap_nodejs_1.ServiceEventTypes; } });
Object.defineProperty(exports, "SiriAudioSessionEvents", { enumerable: true, get: function () { return hap_nodejs_1.SiriAudioSessionEvents; } });
Object.defineProperty(exports, "StreamRequestTypes", { enumerable: true, get: function () { return hap_nodejs_1.StreamRequestTypes; } });
Object.defineProperty(exports, "TargetCategory", { enumerable: true, get: function () { return hap_nodejs_1.TargetCategory; } });
Object.defineProperty(exports, "TargetUpdates", { enumerable: true, get: function () { return hap_nodejs_1.TargetUpdates; } });
Object.defineProperty(exports, "Topics", { enumerable: true, get: function () { return hap_nodejs_1.Topics; } });
Object.defineProperty(exports, "Units", { enumerable: true, get: function () { return hap_nodejs_1.Units; } });
//# sourceMappingURL=index.js.map