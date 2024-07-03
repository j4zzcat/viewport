"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerStorage = void 0;
var tslib_1 = require("tslib");
var util_1 = tslib_1.__importDefault(require("util"));
var debug_1 = tslib_1.__importDefault(require("debug"));
var HAPStorage_1 = require("./HAPStorage");
var debug = (0, debug_1.default)("HAP-NodeJS:ControllerStorage");
/**
 * @group Model
 */
var ControllerStorage = /** @class */ (function () {
    function ControllerStorage(accessory) {
        this.initialized = false;
        this.fileCreated = false;
        this.purgeUnidentifiedAccessoryData = true;
        // ---------------------------------------------------------
        this.trackedControllers = []; // used to track controllers before data was loaded from disk
        this.controllerData = {};
        this.accessoryUUID = accessory.UUID;
    }
    ControllerStorage.prototype.enqueueSaveRequest = function (timeout) {
        var _this = this;
        var _a;
        if (timeout === void 0) { timeout = 0; }
        if (this.parent) {
            this.parent.enqueueSaveRequest(timeout);
            return;
        }
        var plannedTime = Date.now() + timeout;
        if (this.queuedSaveTimeout) {
            if (plannedTime <= ((_a = this.queuedSaveTime) !== null && _a !== void 0 ? _a : 0)) {
                return;
            }
            clearTimeout(this.queuedSaveTimeout);
        }
        this.queuedSaveTimeout = setTimeout(function () {
            _this.queuedSaveTimeout = _this.queuedSaveTime = undefined;
            _this.save();
        }, timeout).unref();
        this.queuedSaveTime = Date.now() + timeout;
    };
    /**
     * Links a bridged accessory to the ControllerStorage of the bridge accessory.
     *
     * @param accessory
     */
    ControllerStorage.prototype.linkAccessory = function (accessory) {
        if (!this.linkedAccessories) {
            this.linkedAccessories = [];
        }
        var storage = accessory.controllerStorage;
        this.linkedAccessories.push(storage);
        storage.parent = this;
        var saved = this.restoredAccessories && this.restoredAccessories[accessory.UUID];
        if (this.initialized) {
            storage.init(saved);
        }
    };
    ControllerStorage.prototype.trackController = function (controller) {
        controller.setupStateChangeDelegate(this.handleStateChange.bind(this, controller)); // setup delegate
        if (!this.initialized) { // track controller if data isn't loaded yet
            this.trackedControllers.push(controller);
        }
        else {
            this.restoreController(controller);
        }
    };
    ControllerStorage.prototype.untrackController = function (controller) {
        var index = this.trackedControllers.indexOf(controller);
        if (index !== -1) { // remove from trackedControllers if storage wasn't initialized yet
            this.trackedControllers.splice(index, 1);
        }
        controller.setupStateChangeDelegate(undefined); // remove association with this storage object
        this.purgeControllerData(controller);
    };
    ControllerStorage.prototype.purgeControllerData = function (controller) {
        delete this.controllerData[controller.controllerId()];
        if (this.initialized) {
            this.enqueueSaveRequest(100);
        }
    };
    ControllerStorage.prototype.handleStateChange = function (controller) {
        var id = controller.controllerId();
        var serialized = controller.serialize();
        if (!serialized) { // can be undefined when controller wishes to delete data
            delete this.controllerData[id];
        }
        else {
            var controllerData = this.controllerData[id];
            if (!controllerData) {
                this.controllerData[id] = {
                    data: serialized,
                };
            }
            else {
                controllerData.data = serialized;
            }
        }
        if (this.initialized) { // only save if data was loaded
            // run save data "async", as handleStateChange call will probably always be caused by a http request
            // this should improve our response time
            this.enqueueSaveRequest(100);
        }
    };
    ControllerStorage.prototype.restoreController = function (controller) {
        if (!this.initialized) {
            throw new Error("Illegal state. Controller data wasn't loaded yet!");
        }
        var controllerData = this.controllerData[controller.controllerId()];
        if (controllerData) {
            try {
                controller.deserialize(controllerData.data);
            }
            catch (error) {
                console.warn("Could not initialize controller of type '".concat(controller.controllerId(), "' from data stored on disk. Resetting to default: ").concat(error.stack));
                controller.handleFactoryReset();
            }
            controllerData.purgeOnNextLoad = undefined;
        }
    };
    /**
     * Called when this particular Storage object is feed with data loaded from disk.
     * This method is only called once.
     *
     * @param data - array of {@link StoredControllerData}. undefined if nothing was stored on disk for this particular storage object
     */
    ControllerStorage.prototype.init = function (data) {
        var _this = this;
        if (this.initialized) {
            throw new Error("ControllerStorage for accessory ".concat(this.accessoryUUID, " was already initialized!"));
        }
        this.initialized = true;
        // storing data into our local controllerData Record
        data && data.forEach(function (saved) { return _this.controllerData[saved.type] = saved.controllerData; });
        var restoredControllers = [];
        this.trackedControllers.forEach(function (controller) {
            _this.restoreController(controller);
            restoredControllers.push(controller.controllerId());
        });
        this.trackedControllers.splice(0, this.trackedControllers.length); // clear tracking list
        var purgedData = false;
        Object.entries(this.controllerData).forEach(function (_a) {
            var _b = tslib_1.__read(_a, 2), id = _b[0], data = _b[1];
            if (data.purgeOnNextLoad) {
                delete _this.controllerData[id];
                purgedData = true;
                return;
            }
            if (!restoredControllers.includes(id)) {
                data.purgeOnNextLoad = true;
            }
        });
        if (purgedData) {
            this.enqueueSaveRequest(500);
        }
    };
    ControllerStorage.prototype.load = function (username) {
        if (this.username) {
            throw new Error("ControllerStorage was already loaded!");
        }
        this.username = username;
        var key = ControllerStorage.persistKey(username);
        var saved = HAPStorage_1.HAPStorage.storage().getItem(key);
        var ownData;
        if (saved) {
            this.fileCreated = true;
            ownData = saved.accessories[this.accessoryUUID];
            delete saved.accessories[this.accessoryUUID];
        }
        this.init(ownData);
        if (this.linkedAccessories) {
            this.linkedAccessories.forEach(function (linkedStorage) {
                var savedData = saved && saved.accessories[linkedStorage.accessoryUUID];
                linkedStorage.init(savedData);
                if (saved) {
                    delete saved.accessories[linkedStorage.accessoryUUID];
                }
            });
        }
        if (saved && Object.keys(saved.accessories).length > 0) {
            if (!this.purgeUnidentifiedAccessoryData) {
                this.restoredAccessories = saved.accessories; // save data for controllers which aren't linked yet
            }
            else {
                debug("Purging unidentified controller data for bridge %s", username);
            }
        }
    };
    ControllerStorage.prototype.save = function () {
        var _a;
        if (this.parent) {
            this.parent.save();
            return;
        }
        if (!this.initialized) {
            throw new Error("ControllerStorage has not yet been loaded!");
        }
        if (!this.username) {
            throw new Error("Cannot save controllerData for a storage without a username!");
        }
        var accessories = (_a = {},
            _a[this.accessoryUUID] = this.controllerData,
            _a);
        if (this.linkedAccessories) { // grab data from all linked storage objects
            this.linkedAccessories.forEach(function (accessory) { return accessories[accessory.accessoryUUID] = accessory.controllerData; });
        }
        // TODO removed accessories won't ever be deleted?
        var accessoryData = this.restoredAccessories || {};
        Object.entries(accessories).forEach(function (_a) {
            var _b = tslib_1.__read(_a, 2), uuid = _b[0], controllerData = _b[1];
            var entries = Object.entries(controllerData);
            if (entries.length > 0) {
                accessoryData[uuid] = entries.map(function (_a) {
                    var _b = tslib_1.__read(_a, 2), id = _b[0], data = _b[1];
                    return ({
                        type: id,
                        controllerData: data,
                    });
                });
            }
        });
        var key = ControllerStorage.persistKey(this.username);
        if (Object.keys(accessoryData).length > 0) {
            var saved = {
                accessories: accessoryData,
            };
            this.fileCreated = true;
            HAPStorage_1.HAPStorage.storage().setItemSync(key, saved);
        }
        else if (this.fileCreated) {
            this.fileCreated = false;
            HAPStorage_1.HAPStorage.storage().removeItemSync(key);
        }
    };
    ControllerStorage.persistKey = function (username) {
        return util_1.default.format("ControllerStorage.%s.json", username.replace(/:/g, "").toUpperCase());
    };
    ControllerStorage.remove = function (username) {
        var key = ControllerStorage.persistKey(username);
        HAPStorage_1.HAPStorage.storage().removeItemSync(key);
    };
    return ControllerStorage;
}());
exports.ControllerStorage = ControllerStorage;
//# sourceMappingURL=ControllerStorage.js.map