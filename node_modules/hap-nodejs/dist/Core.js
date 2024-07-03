"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var node_persist_1 = tslib_1.__importDefault(require("node-persist"));
var _1 = require("./");
console.log("HAP-NodeJS v".concat((0, _1.HAPLibraryVersion)(), " starting..."));
console.warn("DEPRECATION NOTICE: The use of Core and BridgeCore are deprecated and are scheduled to be remove in October 2020. " +
    "For more information and some guidance on how to migrate, have a look at https://github.com/homebridge/HAP-NodeJS/wiki/Deprecation-of-Core-and-BridgeCore");
// Initialize our storage system
node_persist_1.default.initSync();
// Our Accessories will each have their own HAP server; we will assign ports sequentially
var targetPort = 51826;
// Load up all accessories in the /accessories folder
var dir = path_1.default.join(__dirname, "accessories");
var accessories = _1.AccessoryLoader.loadDirectory(dir);
// Publish them all separately (as opposed to BridgedCore which publishes them behind a single Bridge accessory)
accessories.forEach(function (accessory) {
    // To push Accessories separately, we'll need a few extra properties
    // @ts-expect-error: Core/BridgeCore API
    if (!accessory.username) {
        throw new Error("Username not found on accessory '" + accessory.displayName +
            "'. Core.js requires all accessories to define a unique 'username' property.");
    }
    // @ts-expect-error: Core/BridgeCore API
    if (!accessory.pincode) {
        throw new Error("Pincode not found on accessory '" + accessory.displayName +
            "'. Core.js requires all accessories to define a 'pincode' property.");
    }
    // publish this Accessory on the local network
    accessory.publish({
        port: targetPort++,
        // @ts-expect-error: Core/BridgeCore API
        username: accessory.username,
        // @ts-expect-error: Core/BridgeCore API
        pincode: accessory.pincode,
        category: accessory.category,
    });
});
var signals = { "SIGINT": 2, "SIGTERM": 15 };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Object.keys(signals).forEach(function (signal) {
    process.on(signal, function () {
        for (var i = 0; i < accessories.length; i++) {
            accessories[i].unpublish();
        }
        setTimeout(function () {
            process.exit(128 + signals[signal]);
        }, 1000);
    });
});
//# sourceMappingURL=Core.js.map