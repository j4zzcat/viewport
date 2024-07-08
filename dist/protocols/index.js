"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolManagerError = exports.RTSPProtocolManager = exports.UnifiProtocolManager = void 0;
var unifi_1 = require("./unifi");
Object.defineProperty(exports, "UnifiProtocolManager", { enumerable: true, get: function () { return unifi_1.UnifiProtocolManager; } });
var rtsp_1 = require("./rtsp");
Object.defineProperty(exports, "RTSPProtocolManager", { enumerable: true, get: function () { return rtsp_1.RTSPProtocolManager; } });
var ProtocolManagerError = /** @class */ (function (_super) {
    __extends(ProtocolManagerError, _super);
    function ProtocolManagerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProtocolManagerError;
}(Error));
exports.ProtocolManagerError = ProtocolManagerError;
