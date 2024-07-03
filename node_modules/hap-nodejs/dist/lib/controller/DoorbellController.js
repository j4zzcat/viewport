"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoorbellController = void 0;
var tslib_1 = require("tslib");
var Characteristic_1 = require("../Characteristic");
var Service_1 = require("../Service");
var CameraController_1 = require("./CameraController");
/**
 * The `DoorbellController` to efficiently manage doorbell implementations with HAP-NodeJS.
 *
 * NOTICE: We subclass from the {@link CameraController} here and deliberately do not introduce/set an
 * own/custom ControllerType for Doorbells, as Cameras and Doorbells are pretty much the same thing
 * and would collide otherwise.
 * As the possibility exists, both the CameraController and DoorbellController are written to support migration
 * from one to another. Meaning a serialized CameraController can be initialized as a DoorbellController
 * (on startup in {@link initWithServices}) and vice versa.
 *
 * @group Doorbell
 */
var DoorbellController = /** @class */ (function (_super) {
    tslib_1.__extends(DoorbellController, _super);
    /**
     * Initializes a new `DoorbellController`.
     * @param options - The {@link CameraControllerOptions} and optional {@link DoorbellOptions}.
     */
    function DoorbellController(options) {
        var _this = _super.call(this, options) || this;
        _this.doorbellServiceExternallySupplied = false;
        _this.doorbellOptions = {
            name: options.name,
            externalDoorbellService: options.externalDoorbellService,
        };
        return _this;
    }
    /**
     * Call this method to signal a doorbell button press.
     */
    DoorbellController.prototype.ringDoorbell = function () {
        this.doorbellService.updateCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchEvent, Characteristic_1.Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS);
    };
    DoorbellController.prototype.constructServices = function () {
        var _a, _b, _c;
        if ((_a = this.doorbellOptions) === null || _a === void 0 ? void 0 : _a.externalDoorbellService) {
            this.doorbellService = this.doorbellOptions.externalDoorbellService;
            this.doorbellServiceExternallySupplied = true;
        }
        else {
            this.doorbellService = new Service_1.Service.Doorbell((_c = (_b = this.doorbellOptions) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "", "");
        }
        this.doorbellService.setPrimaryService();
        var serviceMap = _super.prototype.constructServices.call(this);
        if (!this.doorbellServiceExternallySupplied) {
            serviceMap.doorbell = this.doorbellService;
        }
        return serviceMap;
    };
    DoorbellController.prototype.initWithServices = function (serviceMap) {
        var _a, _b, _c;
        var result = _super.prototype._initWithServices.call(this, serviceMap);
        if ((_a = this.doorbellOptions) === null || _a === void 0 ? void 0 : _a.externalDoorbellService) {
            this.doorbellService = this.doorbellOptions.externalDoorbellService;
            this.doorbellServiceExternallySupplied = true;
            if (result.serviceMap.doorbell) {
                delete result.serviceMap.doorbell;
                result.updated = true;
            }
        }
        else {
            this.doorbellService = result.serviceMap.doorbell;
            if (!this.doorbellService) { // see NOTICE above
                this.doorbellService = new Service_1.Service.Doorbell((_c = (_b = this.doorbellOptions) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "", "");
                result.serviceMap.doorbell = this.doorbellService;
                result.updated = true;
            }
        }
        this.doorbellService.setPrimaryService();
        if (result.updated) {
            return result.serviceMap;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DoorbellController.prototype.migrateFromDoorbell = function (serviceMap) {
        return false;
    };
    DoorbellController.prototype.retrieveEventTriggerOptions = function () {
        var result = _super.prototype.retrieveEventTriggerOptions.call(this);
        result.add(2 /* EventTriggerOption.DOORBELL */);
        return result;
    };
    DoorbellController.prototype.handleControllerRemoved = function () {
        _super.prototype.handleControllerRemoved.call(this);
        this.doorbellService = undefined;
    };
    DoorbellController.prototype.configureServices = function () {
        _super.prototype.configureServices.call(this);
        this.doorbellService.getCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchEvent)
            .onGet(function () { return null; }); // a value of null represent nothing is pressed
        this.doorbellOptions = undefined;
    };
    return DoorbellController;
}(CameraController_1.CameraController));
exports.DoorbellController = DoorbellController;
//# sourceMappingURL=DoorbellController.js.map