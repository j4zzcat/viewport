"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessory = void 0;
var __1 = require("..");
var UUID = __1.uuid.generate("hap-nodejs:accessories:wifi-satellite");
exports.accessory = new __1.Accessory("Wi-Fi Satellite", UUID);
// @ts-expect-error: Core/BridgeCore API
exports.accessory.username = "FA:3C:ED:5A:1A:A2";
// @ts-expect-error: Core/BridgeCore API
exports.accessory.pincode = "031-45-154";
exports.accessory.category = 33 /* Categories.ROUTER */;
exports.accessory.on("identify" /* AccessoryEventTypes.IDENTIFY */, function (paired, callback) {
    console.log("Identify the '%s'", exports.accessory.displayName);
    callback();
});
var satellite = exports.accessory.addService(__1.Service.WiFiSatellite);
satellite.getCharacteristic(__1.Characteristic.WiFiSatelliteStatus)
    .updateValue(__1.Characteristic.WiFiSatelliteStatus.CONNECTED);
//# sourceMappingURL=Wi-FiSatellite_accessory.js.map