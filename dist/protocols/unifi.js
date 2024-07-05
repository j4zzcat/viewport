"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnifiProtocolManager = void 0;
var logger_1 = require("../logger");
var NVR = /** @class */ (function () {
    function NVR() {
    }
    return NVR;
}());
var NVRCache = /** @class */ (function () {
    function NVRCache() {
        this._nvrs = new Map();
    }
    NVRCache.prototype.getOrCreate = function (host, port, username, password) {
        var key = "".concat(username, ":").concat(password, "@").concat(host, ":").concat(port);
        if (this._nvrs.has(key)) {
            return this._nvrs.get(key);
        }
        else {
        }
    };
    return NVRCache;
}());
var UnifiProtocolManager = /** @class */ (function () {
    function UnifiProtocolManager() {
        this._supportedProtocols = ['unifi'];
        this._nvrCache = new NVRCache();
    }
    UnifiProtocolManager.prototype.canHandle = function (url) {
        return this._supportedProtocols.includes(url.protocol.split(':')[0]);
    };
    UnifiProtocolManager.prototype.createTranscoder = function (url) {
        logger_1.logger.info("Creating transcoder for ".concat(url));
        var nvr = this._nvrCache.getOrCreate(url.host, url.port, url.username, url.password);
        return undefined;
    };
    return UnifiProtocolManager;
}());
exports.UnifiProtocolManager = UnifiProtocolManager;
