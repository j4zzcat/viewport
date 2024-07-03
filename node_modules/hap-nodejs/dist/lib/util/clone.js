"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
var tslib_1 = require("tslib");
/**
 * A simple clone function that also allows you to pass an "extend" object whose properties will be
 * added to the cloned copy of the original object passed.
 * @group Utils
 */
function clone(object, extend) {
    var e_1, _a, e_2, _b;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var cloned = {};
    try {
        for (var _c = tslib_1.__values(Object.entries(object)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = tslib_1.__read(_d.value, 2), key = _e[0], value = _e[1];
            cloned[key] = value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (extend) {
        try {
            for (var _f = tslib_1.__values(Object.entries(extend)), _g = _f.next(); !_g.done; _g = _f.next()) {
                var _h = tslib_1.__read(_g.value, 2), key = _h[0], value = _h[1];
                cloned[key] = value;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return cloned;
}
exports.clone = clone;
//# sourceMappingURL=clone.js.map