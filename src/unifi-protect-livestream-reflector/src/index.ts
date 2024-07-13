/* 
 * This file is part of Viewport. 
 * By Sharon Dagan <https://github.com/j4zzcat>, (C) Copyright 2024.  
 *
 * Viewport is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This software is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * This software. If not, see <https://www.gnu.org/licenses/>.
 */

import {ProtectApi} from "unifi-protect";
import {WebSocket, WebSocketServer} from "ws";
import {DefaultLogger} from "./logger";

let Logger = new DefaultLogger();
let wss = new WebSocketServer({port: 4001});

let logger = Logger.createLogger({class: "UnifiProtectLivestreamReflector"});
wss.once("listening", () => {
    // @ts-ignore
    logger.info(`WebSocketServer listening on port ${wss.address().port}`);
});


wss.on("connection", (ws:WebSocket, req) => {
    let url = new URL(`unifi:/${req.url}`);
    let clientId = `${ws._socket.remoteAddress}:${ws._socket.remotePort}`;
    let controller = url.host;
    let username = url.username;
    let password = url.password;
    let cameraId = url.pathname.slice(1);

    let logger = Logger.createLogger({clientId: clientId, cameraId: cameraId});
    Logger.redact(password);

    logger.info(`Client '${clientId}' asks for '${url}'`);

    let protectApi = new ProtectApi();

    logger.debug(`Logging-in to the Protect Controller at '${controller}'`)
    protectApi.login(controller, username, password).then( (success)=> {
        if(success == true) {
            protectApi.getBootstrap().then((success) => {
                if(success == true) {
                    logger.debug("Wiring the livestream to the client's WebSocket")

                    let livestream = protectApi.createLivestream();
                    livestream.on("close", () => {
                        logger.info("Livestream closed");
                        // ws.close();
                    });

                    livestream.on("codec", (codec) => {
                        logger.debug(`The livestream codec is '${codec}'`);
                    });

                    livestream.on("message", (buffer) => {
                        ws.send(buffer);
                    });

                    ws.on("close", (ws, code, reason) => {
                        logger.info(`Client - close ${code} ${reason}`);
                        livestream.stop();
                    });

                    ws.on("error", (ws, error) => {
                        logger.error(`Client - error: ${error}`);
                        livestream.stop();
                    });

                    logger.info(`Starting the livestream for camera id '${cameraId}'`);
                    livestream.start(cameraId, 0);

                } else {
                    logger.error("Unable to bootstrap the Protect controller");
                }
            });
        } else {
            logger.error("Invalid login credentials");
        }
    });
});
