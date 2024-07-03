"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessory = void 0;
var __1 = require("..");
var UUID = __1.uuid.generate("hap-nodejs:accessories:wifi-router");
exports.accessory = new __1.Accessory("Wi-Fi Router", UUID);
// @ts-expect-error: Core/BridgeCore API
exports.accessory.username = "FA:3C:ED:D2:1A:A2";
// @ts-expect-error: Core/BridgeCore API
exports.accessory.pincode = "031-45-154";
exports.accessory.category = 33 /* Categories.ROUTER */;
exports.accessory.on("identify" /* AccessoryEventTypes.IDENTIFY */, function (paired, callback) {
    console.log("Identify the '%s'", exports.accessory.displayName);
    callback();
});
exports.accessory.addService(__1.Service.WiFiRouter);
//# sourceMappingURL=Wi-FiRouter_accessory.js.map