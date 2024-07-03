"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HapStatusError = void 0;
var tslib_1 = require("tslib");
var HAPServer_1 = require("../HAPServer");
/**
 * Throws a HAP status error that is sent back to HomeKit.
 *
 * @example
 * ```ts
 * throw new HapStatusError(HAPStatus.OPERATION_TIMED_OUT);
 * ```
 *
 * @group Utils
 */
var HapStatusError = /** @class */ (function (_super) {
    tslib_1.__extends(HapStatusError, _super);
    function HapStatusError(status) {
        var _this = _super.call(this, "HAP Status Error: " + status) || this;
        Object.setPrototypeOf(_this, HapStatusError.prototype);
        if ((0, HAPServer_1.IsKnownHAPStatusError)(status)) {
            _this.hapStatus = status;
        }
        else {
            _this.hapStatus = -70402 /* HAPStatus.SERVICE_COMMUNICATION_FAILURE */;
        }
        return _this;
    }
    return HapStatusError;
}(Error));
exports.HapStatusError = HapStatusError;
//# sourceMappingURL=hapStatusError.js.map