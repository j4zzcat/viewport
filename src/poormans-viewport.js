"use strict";
exports.__esModule = true;
var protect_platform_1 = require("homebridge-unifi-protect/dist/protect-platform");
var shell = require("shelljs");
var USERID = 'viewport-1';
var PASSWORD = shell.exec('security find-generic-password -l dev-user -a unifi-protect -w', { silent: true }).split('\n')[0];
// @ts-ignore
var MockedLogging = /** @class */ (function () {
    function MockedLogging(prefix) {
        this.prefix = prefix;
        // Necessary to bind the instance to the callable use case
        return new Proxy(this, {
            apply: function (target, thisArg, argumentsList) {
                // @ts-ignore
                return target.log.apply(target, argumentsList);
            }
        });
    }
    MockedLogging.prototype.debug = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        console.log('Debug ' + message);
    };
    MockedLogging.prototype.error = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        console.log('Error ' + message);
    };
    MockedLogging.prototype.info = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        console.log('Info ' + message);
    };
    MockedLogging.prototype.log = function (level, message) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        console.log(message);
    };
    MockedLogging.prototype.success = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        console.log(message);
    };
    MockedLogging.prototype.warn = function (message) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        console.log('Warn ' + message);
    };
    return MockedLogging;
}());
var MockedPlatformConfig = /** @class */ (function () {
    function MockedPlatformConfig() {
        this.platform = "dummy";
        this.controllers = [
            {
                address: "192.168.4.10",
                name: "nvr",
                username: USERID,
                password: PASSWORD
            }
        ];
    }
    return MockedPlatformConfig;
}());
var MockedHomebridgeAPI = /** @class */ (function () {
    function MockedHomebridgeAPI() {
    }
    MockedHomebridgeAPI.prototype.on = function (event, listener) {
        console.log(event);
        console.log(listener);
        if (event == "didFinishLaunching")
            listener.call({}, {});
        return this;
    };
    ;
    MockedHomebridgeAPI.prototype.publishCameraAccessories = function (pluginIdentifier, accessories) {
    };
    MockedHomebridgeAPI.prototype.publishExternalAccessories = function (pluginIdentifier, accessories) {
    };
    MockedHomebridgeAPI.prototype.registerAccessory = function (accessoryName, _constructor, constructor) {
    };
    MockedHomebridgeAPI.prototype.registerPlatform = function (platformName, _constructor, constructor) {
    };
    MockedHomebridgeAPI.prototype.registerPlatformAccessories = function (pluginIdentifier, platformName, accessories) {
    };
    MockedHomebridgeAPI.prototype.unregisterPlatformAccessories = function (pluginIdentifier, platformName, accessories) {
    };
    MockedHomebridgeAPI.prototype.updatePlatformAccessories = function (accessories) {
    };
    MockedHomebridgeAPI.prototype.versionGreaterOrEqual = function (version) {
        return false;
    };
    return MockedHomebridgeAPI;
}());
var mocked_logging = new MockedLogging("dummy");
var mocked_platform_config = new MockedPlatformConfig();
var mocked_homebridge_api = new MockedHomebridgeAPI();
// @ts-ignore
var protect_platform = new protect_platform_1.ProtectPlatform(mocked_logging, mocked_platform_config, mocked_homebridge_api);
