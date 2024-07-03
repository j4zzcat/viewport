"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bridge = void 0;
var tslib_1 = require("tslib");
var Accessory_1 = require("./Accessory");
/**
 * Bridge is a special type of HomeKit Accessory that hosts other Accessories "behind" it. This way you
 * can simply publish() the Bridge (with a single HAPServer on a single port) and all bridged Accessories
 * will be hosted automatically, instead of needed to publish() every single Accessory as a separate server.
 *
 * @group Accessory
 */
var Bridge = /** @class */ (function (_super) {
    tslib_1.__extends(Bridge, _super);
    function Bridge(displayName, UUID) {
        var _this = _super.call(this, displayName, UUID) || this;
        _this._isBridge = true;
        return _this;
    }
    return Bridge;
}(Accessory_1.Accessory));
exports.Bridge = Bridge;
//# sourceMappingURL=Bridge.js.map