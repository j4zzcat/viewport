"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
// Generate a consistent UUID for TV that will remain the same even when
// restarting our server. We use the `uuid.generate` helper function to create a deterministic
// UUID based on an arbitrary "namespace" and the word "tv".
var tvUUID = __1.uuid.generate("hap-nodejs:accessories:tv");
// This is the Accessory that we'll return to HAP-NodeJS.
var tv = exports.accessory = new __1.Accessory("TV", tvUUID);
// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
// @ts-expect-error: Core/BridgeCore API
tv.username = "A3:FB:3D:4D:2E:AC";
// @ts-expect-error: Core/BridgeCore API
tv.pincode = "031-45-154";
tv.category = 31 /* Categories.TELEVISION */;
// Add the actual TV Service and listen for change events from iOS.
var televisionService = tv.addService(__1.Service.Television, "Television", "Television");
televisionService
    .setCharacteristic(__1.Characteristic.ConfiguredName, "Television");
televisionService
    .setCharacteristic(__1.Characteristic.SleepDiscoveryMode, __1.Characteristic.SleepDiscoveryMode.ALWAYS_DISCOVERABLE);
televisionService
    .getCharacteristic(__1.Characteristic.Active)
    .on("set" /* CharacteristicEventTypes.SET */, function (newValue, callback) {
    console.log("set Active => setNewValue: " + newValue);
    callback(null);
});
televisionService
    .setCharacteristic(__1.Characteristic.ActiveIdentifier, 1);
televisionService
    .getCharacteristic(__1.Characteristic.ActiveIdentifier)
    .on("set" /* CharacteristicEventTypes.SET */, function (newValue, callback) {
    console.log("set Active Identifier => setNewValue: " + newValue);
    callback(null);
});
televisionService
    .getCharacteristic(__1.Characteristic.RemoteKey)
    .on("set" /* CharacteristicEventTypes.SET */, function (newValue, callback) {
    console.log("set Remote Key => setNewValue: " + newValue);
    callback(null);
});
televisionService
    .getCharacteristic(__1.Characteristic.PictureMode)
    .on("set" /* CharacteristicEventTypes.SET */, function (newValue, callback) {
    console.log("set PictureMode => setNewValue: " + newValue);
    callback(null);
});
televisionService
    .getCharacteristic(__1.Characteristic.PowerModeSelection)
    .on("set" /* CharacteristicEventTypes.SET */, function (newValue, callback) {
    console.log("set PowerModeSelection => setNewValue: " + newValue);
    callback(null);
});
// Speaker
var speakerService = tv.addService(__1.Service.TelevisionSpeaker);
speakerService
    .setCharacteristic(__1.Characteristic.Active, __1.Characteristic.Active.ACTIVE)
    .setCharacteristic(__1.Characteristic.VolumeControlType, __1.Characteristic.VolumeControlType.ABSOLUTE);
speakerService.getCharacteristic(__1.Characteristic.VolumeSelector)
    .on("set" /* CharacteristicEventTypes.SET */, function (newValue, callback) {
    console.log("set VolumeSelector => setNewValue: " + newValue);
    callback(null);
});
// HDMI 1
var inputHDMI1 = tv.addService(__1.Service.InputSource, "hdmi1", "HDMI 1");
inputHDMI1
    .setCharacteristic(__1.Characteristic.Identifier, 1)
    .setCharacteristic(__1.Characteristic.ConfiguredName, "HDMI 1")
    .setCharacteristic(__1.Characteristic.IsConfigured, __1.Characteristic.IsConfigured.CONFIGURED)
    .setCharacteristic(__1.Characteristic.InputSourceType, __1.Characteristic.InputSourceType.HDMI);
// HDMI 2
var inputHDMI2 = tv.addService(__1.Service.InputSource, "hdmi2", "HDMI 2");
inputHDMI2
    .setCharacteristic(__1.Characteristic.Identifier, 2)
    .setCharacteristic(__1.Characteristic.ConfiguredName, "HDMI 2")
    .setCharacteristic(__1.Characteristic.IsConfigured, __1.Characteristic.IsConfigured.CONFIGURED)
    .setCharacteristic(__1.Characteristic.InputSourceType, __1.Characteristic.InputSourceType.HDMI);
// Netflix
var inputNetflix = tv.addService(__1.Service.InputSource, "netflix", "Netflix");
inputNetflix
    .setCharacteristic(__1.Characteristic.Identifier, 3)
    .setCharacteristic(__1.Characteristic.ConfiguredName, "Netflix")
    .setCharacteristic(__1.Characteristic.IsConfigured, __1.Characteristic.IsConfigured.CONFIGURED)
    .setCharacteristic(__1.Characteristic.InputSourceType, __1.Characteristic.InputSourceType.APPLICATION);
televisionService.addLinkedService(inputHDMI1);
televisionService.addLinkedService(inputHDMI2);
televisionService.addLinkedService(inputNetflix);
var accessControl = new __1.AccessControlManagement(true);
accessControl.on("update-control-level" /* AccessControlEvent.ACCESS_LEVEL_UPDATED */, function (level) {
    console.log("New access control level of " + level);
});
accessControl.on("update-password" /* AccessControlEvent.PASSWORD_SETTING_UPDATED */, function (password, passwordRequired) {
    if (passwordRequired) {
        console.log("A required password was specified");
    }
    else {
        console.log("No password set!");
    }
});
tv.addService(accessControl.getService());
//# sourceMappingURL=TV_accessory.js.map