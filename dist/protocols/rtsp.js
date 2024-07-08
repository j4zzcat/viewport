"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTSPProtocolManager = void 0;
var RTSPProtocolManager = /** @class */ (function () {
    function RTSPProtocolManager() {
    }
    RTSPProtocolManager.prototype.canHandle = function (url) {
        return false;
    };
    RTSPProtocolManager.prototype.createTranscoder = function (url) {
        return undefined;
    };
    return RTSPProtocolManager;
}());
exports.RTSPProtocolManager = RTSPProtocolManager;
