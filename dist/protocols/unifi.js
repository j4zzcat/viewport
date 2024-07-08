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
var utils_1 = require("../utils");
var index_1 = require("./index");
var child_process_1 = require("child_process");
var UnifiTranscoder = /** @class */ (function () {
    function UnifiTranscoder(cameraId, nvr) {
        this._logger = logger_1.logger.child({ 'class': 'UnifiTranscoder' });
        this._nvr = nvr;
        this._cameraId = cameraId;
    }
    UnifiTranscoder.prototype.start = function () {
        var _this = this;
        this._ffmpeg = (0, child_process_1.spawn)('/opt/homebrew/bin/ffmpeg', [
            '-loglevel', '8',
            '-i', 'pipe:',
            '-fflags', 'flush_packets',
            '-max_delay', '5',
            '-flags',
            '-global_header',
            '-hls_time', '5',
            '-hls_list_size', '3',
            '-hls_flags', 'delete_segments',
            '-vcodec', 'copy',
            '-y', '~/.tmp/index.m3u8'
        ]);
        this._ffmpeg.stderr.on('data', function (data) {
            console.error("stderr: ".concat(data));
        });
        this._ffmpeg.on('close', function (code) {
            console.log("child process exited with code ".concat(code));
        });
        this._nvr.addListener(this._cameraId, function (buffer) { return _this._ffmpeg.stdin.write(buffer); });
    };
    UnifiTranscoder.prototype.stop = function () {
    };
    return UnifiTranscoder;
}());
var UnifiNVR = /** @class */ (function () {
    function UnifiNVR() {
        this._logger = logger_1.logger.child({ 'class': 'UnifiNVR' });
    }
    UnifiNVR.prototype.initialize = function (host, username, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._host = host;
                        this._username = username;
                        this._password = password;
                        logger_1.logger.info("Connecting to NVR at '".concat(this._host, "' with username '").concat(this._username, "'..."));
                        this._protectApi = new unifi_protect_1.ProtectApi(new UnifiLoggerDelegate());
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
                        logger_1.logger.info('Connected successfully');
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(UnifiNVR.prototype, "cameras", {
        get: function () {
            return this._protectApi.bootstrap.cameras;
        },
        enumerable: false,
        configurable: true
    });
    UnifiNVR.prototype.addListener = function (cameraId, listener) {
        var _this = this;
        var protectLiveStream = this._protectApi.createLivestream();
        protectLiveStream.start(cameraId, 0);
        protectLiveStream.addListener('codec', function (codec) { return _this._logger.info(codec); });
        protectLiveStream.addListener('message', listener);
    };
    return UnifiNVR;
}());
var UnifiProtocolManager = /** @class */ (function () {
    function UnifiProtocolManager() {
        this._logger = logger_1.logger.child({ 'class': 'UnifiProtocolManager' });
        this._supportedProtocols = ['unifi'];
        this._nvrCache = new utils_1.CachingFactory(UnifiNVR);
    }
    UnifiProtocolManager.prototype.canHandle = function (url) {
        return this._supportedProtocols.includes(url.protocol.split(':')[0]);
    };
    UnifiProtocolManager.prototype.createTranscoders = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var nvr, splitPathname, cameras, filter, _i, _a, camera, filterList, _b, _c, camera, transcoders, _d, cameras_1, camera;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        logger_1.redact.push(url.password);
                        this._logger.info("Creating transcoder(s) for ".concat(url));
                        return [4 /*yield*/, this._nvrCache.getOrCreate(url.host, url.username, url.password)];
                    case 1:
                        nvr = _e.sent();
                        splitPathname = decodeURI(url.pathname).split('/');
                        if (splitPathname[1] != 'camera') {
                            this._logger.error("Expecting url.pathname to start with '/camera' but got '".concat(url.pathname, "'"));
                            throw new index_1.ProtocolManagerError();
                        }
                        cameras = [];
                        filter = splitPathname[2].slice(1, -1);
                        this._logger.debug("Camera filter is '".concat(filter, "'"));
                        if (filter == 'all') {
                            for (_i = 0, _a = nvr.cameras; _i < _a.length; _i++) {
                                camera = _a[_i];
                                cameras.push([camera.id, camera.name]);
                            }
                        }
                        else {
                            filterList = filter.split(',').map(function (val) { return val.trim(); });
                            for (_b = 0, _c = nvr.cameras; _b < _c.length; _b++) {
                                camera = _c[_b];
                                if (filterList.includes(camera.name)) {
                                    cameras.push([camera.id, camera.name]);
                                }
                            }
                        }
                        this._logger.debug("Found these cameras '".concat(cameras, "'"));
                        this._logger.info("Creating '".concat(cameras.length, "' transcoders"));
                        transcoders = [];
                        for (_d = 0, cameras_1 = cameras; _d < cameras_1.length; _d++) {
                            camera = cameras_1[_d];
                            transcoders.push(new UnifiTranscoder(camera[0], nvr));
                        }
                        return [2 /*return*/, transcoders];
                }
            });
        });
    };
    return UnifiProtocolManager;
}());
exports.UnifiProtocolManager = UnifiProtocolManager;
var UnifiLoggerDelegate = /** @class */ (function () {
    function UnifiLoggerDelegate() {
    }
    UnifiLoggerDelegate.prototype.log = function (level, message) {
        logger_1.logger.log(level, message);
    };
    UnifiLoggerDelegate.prototype.debug = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        this.log('debug', message);
    };
    UnifiLoggerDelegate.prototype.error = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        this.log('error', message);
    };
    UnifiLoggerDelegate.prototype.warn = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        this.log('warn', message);
    };
    UnifiLoggerDelegate.prototype.info = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        this.log('info', message);
    };
    return UnifiLoggerDelegate;
}());
