"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitEventOnce = exports.PromiseTimeout = void 0;
/**
 * @group Utils
 */
function PromiseTimeout(timeout) {
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve(); }, timeout);
    });
}
exports.PromiseTimeout = PromiseTimeout;
// eslint-disable-next-line @typescript-eslint/ban-types
function awaitEventOnce(element, event, timeout) {
    if (timeout === void 0) { timeout = 5000; }
    return new Promise(function (resolve, reject) {
        // eslint-disable-next-line prefer-const
        var timeoutId;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var resolveListener = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(timeoutId);
            resolve(args.length ? (args.length === 1 ? args[0] : args) : undefined);
        };
        timeoutId = setTimeout(function () {
            element.removeListener(event, resolveListener);
            reject(new Error("awaitEvent for event ".concat(event, " timed out!")));
        }, timeout);
        element.once(event, resolveListener);
    });
}
exports.awaitEventOnce = awaitEventOnce;
//# sourceMappingURL=promise-utils.js.map