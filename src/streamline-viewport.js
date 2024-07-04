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
exports.__esModule = true;
var shell = require("shelljs");
var unifi_protect_1 = require("unifi-protect");
var USERID = 'viewport-1';
var PASSWORD = shell.exec('security find-generic-password -l dev-user -a unifi-protect -w', { silent: true }).split('\n')[0];
function login(ufp) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Set a listener to wait for the bootstrap event to occur.
                    ufp.once("bootstrap", function (bootstrapJSON) {
                        // Once we've bootstrapped the Protect controller, output the bootstrap JSON and we're done.
                        // process.stdout.write(util.inspect(bootstrapJSON, {
                        //     colors: true,
                        //     depth: null,
                        //     sorted: true
                        // }) + "\n", () => process.exit(0));
                        //console.log("Logged in");
                    });
                    return [4 /*yield*/, ufp.login("192.168.4.10", USERID, PASSWORD)];
                case 1:
                    // Login to the Protect controller.
                    if (!(_a.sent())) {
                        console.log("Invalid login credentials.");
                        process.exit(0);
                    }
                    ;
                    return [4 /*yield*/, ufp.getBootstrap()];
                case 2:
                    // Bootstrap the controller. It will emit a message once it's received the bootstrap JSON, or you can alternatively wait for the promise to resolve.
                    if (!(_a.sent())) {
                        console.log("Unable to bootstrap the Protect controller.");
                        process.exit(0);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Create a new Protect API instance.
var ufp = new unifi_protect_1.ProtectApi();
login(ufp);
var pls = ufp.createLivestream();
pls.on("close", function () {
    console.log("close");
    process.exit(0);
});
pls.on("codec", function (codec) {
    //console.log(codec);
});
pls.on("initsegment", function (buffer) {
    //console.log(buffer);
});
pls.on("message", function (buffer) {
    console.log(buffer);
});
pls.on("segment", function (buffer) {
    //console.log(buffer);
});
pls.start("667b554f024e4603e400041b", 0);
