"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var speakerUUID = __1.uuid.generate("hap-nodejs:accessories:smart-speaker");
var speaker = exports.accessory = new __1.Accessory("SmartSpeaker", speakerUUID);
// @ts-expect-error: Core/BridgeCore API
speaker.username = "89:A8:E4:1E:95:EE";
// @ts-expect-error: Core/BridgeCore API
speaker.pincode = "676-54-344";
speaker.category = 26 /* Categories.SPEAKER */;
var service = new __1.Service.SmartSpeaker("Smart Speaker", "");
var currentMediaState = __1.Characteristic.CurrentMediaState.PAUSE;
var targetMediaState = __1.Characteristic.TargetMediaState.PAUSE;
// ConfigureName is used to listen for Name changes inside the Home App.
// A device manufacturer would probably need to adjust the name of the device in the AirPlay 2 protocol (or something)
service.setCharacteristic(__1.Characteristic.ConfiguredName, "Smart Speaker");
service.setCharacteristic(__1.Characteristic.Mute, false);
service.setCharacteristic(__1.Characteristic.Volume, 100);
service.getCharacteristic(__1.Characteristic.CurrentMediaState)
    .on("get" /* CharacteristicEventTypes.GET */, function (callback) {
    console.log("Reading CurrentMediaState: " + currentMediaState);
    callback(undefined, currentMediaState);
})
    .updateValue(currentMediaState); // init value
service.getCharacteristic(__1.Characteristic.TargetMediaState)
    .on("set" /* CharacteristicEventTypes.SET */, function (value, callback) {
    console.log("Setting TargetMediaState to: " + value);
    targetMediaState = value;
    currentMediaState = targetMediaState;
    callback();
    service.setCharacteristic(__1.Characteristic.CurrentMediaState, targetMediaState);
})
    .on("get" /* CharacteristicEventTypes.GET */, function (callback) {
    console.log("Reading TargetMediaState: " + targetMediaState);
    callback(undefined, targetMediaState);
})
    .updateValue(targetMediaState);
service.getCharacteristic(__1.Characteristic.ConfiguredName)
    .on("set" /* CharacteristicEventTypes.SET */, function (value, callback) {
    console.log("Name was changed to: '".concat(value, "'"));
    callback();
});
speaker.addService(service);
//# sourceMappingURL=SmartSpeaker_accessory.js.map