"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = void 0;
var tslib_1 = require("tslib");
/**
 * Function wrapper to ensure a function/callback is only called once.
 *
 * @group Utils
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function once(func) {
    var called = false;
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (called) {
            throw new Error("This callback function has already been called by someone else; it can only be called one time.");
        }
        else {
            called = true;
            return func.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false));
        }
    });
}
exports.once = once;
//# sourceMappingURL=once.js.map