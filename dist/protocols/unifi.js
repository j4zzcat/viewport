"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnifiProtocolManager = void 0;
var logger_1 = require("../logger");
var unifi_protect_1 = require("unifi-protect");
var NVR = /** @class */ (function () {
    function NVR(host, username, password) {
        this._host = host;
        this._username = username;
        this._password = password;
    }
    NVR.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._protectApi = new unifi_protect_1.ProtectApi(new LoggerDelegate());
                        return [4 /*yield*/, this._protectApi.login(this._host, this._username, this._password)];
                    case 1:
                        if (!(_a.sent())) {
                            logger_1.logger.error("Invalid login credentials.");
                            process.exit(0);
                        }
                        ;
                        return [4 /*yield*/, this._protectApi.getBootstrap()];
                    case 2:
                        if (!(_a.sent())) {
                            logger_1.logger.error("Unable to bootstrap the Protect controller.");
                            process.exit(0);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return NVR;
}());
var NVRCache = /** @class */ (function () {
    function NVRCache() {
        this._nvrMap = new Map();
    }
    NVRCache.prototype.getOrCreate = function (host, username, password) {
        var key = "".concat(username, ":").concat(password, "@").concat(host);
        if (this._nvrMap.has(key)) {
            return this._nvrMap.get(key);
        }
        else {
            var nvr = this.create(host, username, password);
            this._nvrMap.set(key, nvr);
            return nvr;
        }
    };
    NVRCache.prototype.create = function (host, username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var nvr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nvr = new NVR(host, username, password);
                        return [4 /*yield*/, nvr.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, nvr];
                }
            });
        });
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
        var nvr = this._nvrCache.getOrCreate(url.host, url.username, url.password);
        return undefined;
    };
    return UnifiProtocolManager;
}());
exports.UnifiProtocolManager = UnifiProtocolManager;
var LoggerDelegate = /** @class */ (function () {
    function LoggerDelegate() {
    }
    LoggerDelegate.prototype.debug = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        logger_1.logger.debug(message);
    };
    LoggerDelegate.prototype.error = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        logger_1.logger.error(message);
    };
    LoggerDelegate.prototype.info = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        logger_1.logger.info(message);
    };
    LoggerDelegate.prototype.warn = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        logger_1.logger.warn(message);
    };
    return LoggerDelegate;
}());
