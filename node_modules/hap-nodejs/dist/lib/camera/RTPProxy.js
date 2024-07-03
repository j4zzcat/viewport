"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dgram_1 = tslib_1.__importDefault(require("dgram"));
/**
 * RTPProxy to proxy unencrypted RTP and RTCP
 *
 * At early days of HomeKit camera support, HomeKit allowed for unencrypted RTP stream.
 * The proxy was created to deal with RTCP and SSRC related stuff from external streams back in that days.
 * Later HomeKit removed support for unencrypted stream so it’s mostly no longer useful anymore, only really for testing
 * with a custom HAP controller.
 * @group Camera
 */
var RTPProxy = /** @class */ (function () {
    function RTPProxy(options) {
        this.options = options;
        this.startingPort = 10000;
        this.type = options.isIPV6 ? "udp6" : "udp4";
        this.startingPort = 10000;
        this.outgoingAddress = options.outgoingAddress;
        this.outgoingPort = options.outgoingPort;
        this.incomingPayloadType = 0;
        this.outgoingSSRC = options.outgoingSSRC;
        this.disabled = options.disabled;
        this.incomingSSRC = null;
        this.outgoingPayloadType = null;
    }
    RTPProxy.prototype.setup = function () {
        var _this = this;
        return this.createSocketPair(this.type)
            .then(function (sockets) {
            _this.incomingRTPSocket = sockets[0];
            _this.incomingRTCPSocket = sockets[1];
            return _this.createSocket(_this.type);
        }).then(function (socket) {
            _this.outgoingSocket = socket;
            _this.onBound();
        });
    };
    RTPProxy.prototype.destroy = function () {
        if (this.incomingRTPSocket) {
            this.incomingRTPSocket.close();
        }
        if (this.incomingRTCPSocket) {
            this.incomingRTCPSocket.close();
        }
        if (this.outgoingSocket) {
            this.outgoingSocket.close();
        }
    };
    RTPProxy.prototype.incomingRTPPort = function () {
        var address = this.incomingRTPSocket.address();
        if (typeof address !== "string") {
            return address.port;
        }
        throw new Error("Unsupported socket!");
    };
    RTPProxy.prototype.incomingRTCPPort = function () {
        var address = this.incomingRTCPSocket.address();
        if (typeof address !== "string") {
            return address.port;
        }
        throw new Error("Unsupported socket!");
    };
    RTPProxy.prototype.outgoingLocalPort = function () {
        var address = this.outgoingSocket.address();
        if (typeof address !== "string") {
            return address.port;
        }
        throw new Error("Unsupported socket!");
    };
    RTPProxy.prototype.setServerAddress = function (address) {
        this.serverAddress = address;
    };
    RTPProxy.prototype.setServerRTPPort = function (port) {
        this.serverRTPPort = port;
    };
    RTPProxy.prototype.setServerRTCPPort = function (port) {
        this.serverRTCPPort = port;
    };
    RTPProxy.prototype.setIncomingPayloadType = function (pt) {
        this.incomingPayloadType = pt;
    };
    RTPProxy.prototype.setOutgoingPayloadType = function (pt) {
        this.outgoingPayloadType = pt;
    };
    RTPProxy.prototype.sendOut = function (msg) {
        // Just drop it if we're not setup yet, I guess.
        if (!this.outgoingAddress || !this.outgoingPort) {
            return;
        }
        this.outgoingSocket.send(msg, this.outgoingPort, this.outgoingAddress);
    };
    RTPProxy.prototype.sendBack = function (msg) {
        // Just drop it if we're not setup yet, I guess.
        if (!this.serverAddress || !this.serverRTCPPort) {
            return;
        }
        this.outgoingSocket.send(msg, this.serverRTCPPort, this.serverAddress);
    };
    RTPProxy.prototype.onBound = function () {
        var _this = this;
        if (this.disabled) {
            return;
        }
        this.incomingRTPSocket.on("message", function (msg) {
            _this.rtpMessage(msg);
        });
        this.incomingRTCPSocket.on("message", function (msg) {
            _this.rtcpMessage(msg);
        });
        this.outgoingSocket.on("message", function (msg) {
            _this.rtcpReply(msg);
        });
    };
    RTPProxy.prototype.rtpMessage = function (msg) {
        if (msg.length < 12) {
            // Not a proper RTP packet. Just forward it.
            this.sendOut(msg);
            return;
        }
        var mpt = msg.readUInt8(1);
        var pt = mpt & 0x7F;
        if (pt === this.incomingPayloadType) {
            mpt = (mpt & 0x80) | this.outgoingPayloadType;
            msg.writeUInt8(mpt, 1);
        }
        if (this.incomingSSRC === null) {
            this.incomingSSRC = msg.readUInt32BE(4);
        }
        msg.writeUInt32BE(this.outgoingSSRC, 8);
        this.sendOut(msg);
    };
    RTPProxy.prototype.processRTCPMessage = function (msg, transform) {
        var rtcpPackets = [];
        var offset = 0;
        while ((offset + 4) <= msg.length) {
            var pt = msg.readUInt8(offset + 1);
            var len = msg.readUInt16BE(offset + 2) * 4;
            if ((offset + 4 + len) > msg.length) {
                break;
            }
            var packet = msg.slice(offset, offset + 4 + len);
            packet = transform(pt, packet);
            if (packet) {
                rtcpPackets.push(packet);
            }
            offset += 4 + len;
        }
        if (rtcpPackets.length > 0) {
            return Buffer.concat(rtcpPackets);
        }
        return null;
    };
    RTPProxy.prototype.rtcpMessage = function (msg) {
        var _this = this;
        var processed = this.processRTCPMessage(msg, function (pt, packet) {
            if (pt !== 200 || packet.length < 8) {
                return packet;
            }
            if (_this.incomingSSRC === null) {
                _this.incomingSSRC = packet.readUInt32BE(4);
            }
            packet.writeUInt32BE(_this.outgoingSSRC, 4);
            return packet;
        });
        if (processed) {
            this.sendOut(processed);
        }
    };
    RTPProxy.prototype.rtcpReply = function (msg) {
        var _this = this;
        var processed = this.processRTCPMessage(msg, function (pt, packet) {
            if (pt !== 201 || packet.length < 12) {
                return packet;
            }
            // Assume source 1 is the one we want to edit.
            packet.writeUInt32BE(_this.incomingSSRC, 8);
            return packet;
        });
        if (processed) {
            this.sendOut(processed);
        }
    };
    RTPProxy.prototype.createSocket = function (type) {
        var _this = this;
        return new Promise(function (resolve) {
            var retry = function () {
                var socket = dgram_1.default.createSocket(type);
                var bindErrorHandler = function () {
                    if (_this.startingPort === 65535) {
                        _this.startingPort = 10000;
                    }
                    else {
                        ++_this.startingPort;
                    }
                    socket.close();
                    retry();
                };
                socket.once("error", bindErrorHandler);
                socket.on("listening", function () {
                    resolve(socket);
                });
                socket.bind(_this.startingPort);
            };
            retry();
        });
    };
    RTPProxy.prototype.createSocketPair = function (type) {
        var _this = this;
        return new Promise(function (resolve) {
            var retry = function () {
                var socket1 = dgram_1.default.createSocket(type);
                var socket2 = dgram_1.default.createSocket(type);
                var state = { socket1: 0, socket2: 0 };
                var recheck = function () {
                    if (state.socket1 === 0 || state.socket2 === 0) {
                        return;
                    }
                    if (state.socket1 === 2 && state.socket2 === 2) {
                        resolve([socket1, socket2]);
                        return;
                    }
                    if (_this.startingPort === 65534) {
                        _this.startingPort = 10000;
                    }
                    else {
                        ++_this.startingPort;
                    }
                    socket1.close();
                    socket2.close();
                    retry();
                };
                socket1.once("error", function () {
                    state.socket1 = 1;
                    recheck();
                });
                socket2.once("error", function () {
                    state.socket2 = 1;
                    recheck();
                });
                socket1.once("listening", function () {
                    state.socket1 = 2;
                    recheck();
                });
                socket2.once("listening", function () {
                    state.socket2 = 2;
                    recheck();
                });
                socket1.bind(_this.startingPort);
                socket2.bind(_this.startingPort + 1);
            };
            retry();
        });
    };
    return RTPProxy;
}());
exports.default = RTPProxy;
//# sourceMappingURL=RTPProxy.js.map