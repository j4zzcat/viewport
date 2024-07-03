"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
/**
 * This example light gives an example how a light with AdaptiveLighting (in AUTOMATIC mode) support
 * can look like.
 * This example not only exposes the ColorTemperature characteristic but also shows how
 * ColorTemperature and Hue/Saturation characteristics can be combined on a Lightbulb service.
 *
 * The example also uses the new Promise based onGet and onSet handlers instead of the "old"
 * SET/GET event handlers.
 *
 * AdaptiveLighting setup is pretty much at the end of the file, don't miss it.
 */
var lightUUID = __1.uuid.generate("hap-nodejs:accessories:light-adaptive-lighting");
var accessory = exports.accessory = new __1.Accessory("Light Example", lightUUID);
// this section stores the basic state of the lightbulb
var on = false;
var brightness = 100;
var colorTemperature = 140; // 140 is the lowest color temperature in mired as by the HAP spec (you can lower the minimum though)
var hue = 0; // we start with white color
var saturation = 0;
// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
// @ts-expect-error: Core/BridgeCore API
accessory.username = "AA:BB:CC:DD:EE:FF";
// @ts-expect-error: Core/BridgeCore API
accessory.pincode = "031-45-154";
accessory.category = 5 /* Categories.LIGHTBULB */;
accessory.getService(__1.Service.AccessoryInformation)
    .setCharacteristic(__1.Characteristic.Manufacturer, "HAP-NodeJS")
    .setCharacteristic(__1.Characteristic.Model, "Light with AdaptiveLighting")
    .setCharacteristic(__1.Characteristic.FirmwareRevision, "1.0.0");
var lightbulbService = accessory.addService(__1.Service.Lightbulb, "Light Example");
lightbulbService.getCharacteristic(__1.Characteristic.On)
    .onGet(function () {
    console.log("Light power is currently " + on);
    return on;
})
    .onSet(function (value) {
    console.log("Light power was turn to " + on);
    on = value;
});
lightbulbService.getCharacteristic(__1.Characteristic.Brightness) // Brightness characteristic is required for adaptive lighting
    .updateValue(brightness) // ensure default value is set
    .onGet(function () {
    console.log("Light brightness is currently " + brightness);
    return brightness;
})
    .onSet(function (value) {
    console.log("Light brightness was set to " + value + "%");
    brightness = value;
});
lightbulbService.getCharacteristic(__1.Characteristic.ColorTemperature) // ColorTemperature characteristic is required for adaptive lighting
    .onGet(function () {
    console.log("Light color temperature is currently " + colorTemperature);
    return colorTemperature;
})
    .onSet(function (value) {
    console.log("Light color temperature was set to " + value);
    colorTemperature = value;
    // following statements are only needed when using ColorTemperature characteristic in combination with Hue/Saturation
    var color = __1.ColorUtils.colorTemperatureToHueAndSaturation(colorTemperature);
    // save internal values for read handlers
    hue = color.hue;
    saturation = color.saturation;
    // and notify HomeKit devices about changed values
    lightbulbService.getCharacteristic(__1.Characteristic.Hue).updateValue(hue);
    lightbulbService.getCharacteristic(__1.Characteristic.Saturation).updateValue(saturation);
});
lightbulbService.getCharacteristic(__1.Characteristic.Hue)
    .onGet(function () {
    console.log("Light hue is currently " + hue);
    return hue;
})
    .onSet(function (value) {
    console.log("Light hue was set to " + value);
    hue = value;
    colorTemperature = 140; // setting color temperature to lowest possible value
});
lightbulbService.getCharacteristic(__1.Characteristic.Saturation)
    .onGet(function () {
    console.log("Light saturation is currently " + saturation);
    return saturation;
})
    .onSet(function (value) {
    console.log("Light saturation was set to " + value);
    saturation = value;
    colorTemperature = 140; // setting color temperature to lowest possible value
});
var adaptiveLightingController = new __1.AdaptiveLightingController(lightbulbService, {
    // options object is optional, default mode is AUTOMATIC, can be set to MANUAL to do transitions yourself
    // look into the docs for more information
    controllerMode: 1 /* AdaptiveLightingControllerMode.AUTOMATIC */,
});
accessory.configureController(adaptiveLightingController);
//# sourceMappingURL=Light-AdaptiveLighting_accessory.js.map