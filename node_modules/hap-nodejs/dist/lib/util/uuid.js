"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLongForm = exports.toShortForm = exports.write = exports.unparse = exports.isValid = exports.generate = exports.BASE_UUID = void 0;
var tslib_1 = require("tslib");
var crypto_1 = tslib_1.__importDefault(require("crypto"));
exports.BASE_UUID = "-0000-1000-8000-0026BB765291";
// http://stackoverflow.com/a/25951500/66673
function generate(data) {
    var sha1sum = crypto_1.default.createHash("sha1");
    sha1sum.update(data);
    var s = sha1sum.digest("hex");
    var i = -1;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        i += 1;
        switch (c) {
            case "y":
                return ((parseInt("0x" + s[i], 16) & 0x3) | 0x8).toString(16);
            case "x":
            default:
                return s[i];
        }
    });
}
exports.generate = generate;
var VALID_UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isValid(UUID) {
    return VALID_UUID_REGEX.test(UUID);
}
exports.isValid = isValid;
function unparse(buf, offset) {
    if (offset === void 0) { offset = 0; }
    if (typeof buf === "string" && isValid(buf)) {
        /*
          This check was added to fix backwards compatibility with the old style CameraSource API.
          The old StreamController implementation would not unparse the HAP provided sessionId for the current streaming session.
          This was changed when the new Controller API was introduced, which now turns the sessionId Buffer into a string
          and passes it to the implementor of the Camera.
          Old style CameraSource implementations would use this unparse function to turn the Buffer into a string.
          As the sessionId is already a string we just return it here.
    
          The buf attribute being a also type of "string" as actually an error. Also I don't know who decided to
          not unparse the sessionId. I'm only here to fix things.
         */
        return buf;
    }
    var i = offset;
    return buf.toString("hex", i, (i += 4)) + "-" +
        buf.toString("hex", i, (i += 2)) + "-" +
        buf.toString("hex", i, (i += 2)) + "-" +
        buf.toString("hex", i, (i += 2)) + "-" +
        buf.toString("hex", i, i + 6);
}
exports.unparse = unparse;
function write(uuid, buf, offset) {
    if (offset === void 0) { offset = 0; }
    var buffer = Buffer.from(uuid.replace(/-/g, ""), "hex");
    if (buf) {
        buffer.copy(buf, offset);
        return buf;
    }
    else {
        return buffer;
    }
}
exports.write = write;
var SHORT_FORM_REGEX = /^0*([0-9a-f]{1,8})-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
function toShortForm(uuid, base) {
    if (base === void 0) { base = exports.BASE_UUID; }
    if (!isValid(uuid)) {
        throw new TypeError("uuid was not a valid UUID or short form UUID");
    }
    if (base && !isValid("00000000" + base)) {
        throw new TypeError("base was not a valid base UUID");
    }
    if (base && !uuid.endsWith(base)) {
        return uuid.toUpperCase();
    }
    return uuid.replace(SHORT_FORM_REGEX, "$1").toUpperCase();
}
exports.toShortForm = toShortForm;
var VALID_SHORT_REGEX = /^[0-9a-f]{1,8}$/i;
function toLongForm(uuid, base) {
    if (base === void 0) { base = exports.BASE_UUID; }
    if (isValid(uuid)) {
        return uuid.toUpperCase();
    }
    if (!VALID_SHORT_REGEX.test(uuid)) {
        throw new TypeError("uuid was not a valid UUID or short form UUID");
    }
    if (!isValid("00000000" + base)) {
        throw new TypeError("base was not a valid base UUID");
    }
    return (("00000000" + uuid).substr(-8) + base).toUpperCase();
}
exports.toLongForm = toLongForm;
//# sourceMappingURL=uuid.js.map