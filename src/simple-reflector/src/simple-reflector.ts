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

import {ProtectApi, ProtectLivestream} from "unifi-protect";
import {WebSocket, WebSocketServer} from "ws";
import winston from 'winston';
const { combine, timestamp, json } = winston.format;

const Logger = winston.createLogger({
    level: "debug",
    format: combine(timestamp(), json()),
    transports: [new winston.transports.Console()]
});

class SimpleReflector {
    private _logger = Logger.child({source: SimpleReflector.name});
    private _wss: WebSocketServer;
    private _protectApis = new Map<string, ProtectApi>();

    public constructor() {
        this.initialize()
    }

    private initialize() {
        this._wss = new WebSocketServer({port: 4001});

        this._wss.once("listening", () => {
            // @ts-ignore
            this._logger.info(`WebSocketServer listening on port ${this._wss.address().port}`);
        });

        this._wss.on("connection", async (ws: WebSocket, req) => {
            try {
                let url = new URL(`unifi:/${req.url}`);
                // @ts-ignore
                let clientId = `${ws._socket.remoteAddress}:${ws._socket.remotePort}`;
                let controller = url.host;
                let username = url.username;
                let password = url.password;
                let cameraId = url.pathname.slice(1);

                let logger = this._logger.child({clientId: clientId, controller: controller, cameraId: cameraId});
                logger.info(`Client '${clientId}' asks for '${url}'`);

                let protectApi = await this.getOrCreateProtectApi(controller, username, password);
                logger.debug("Wiring the livestream to the client's WebSocket")

                let livestream = protectApi.createLivestream();
                livestream.on("close", () => {
                    logger.info("Livestream closed");
                    ws.close();
                });

                livestream.on("codec", (codec) => {
                    logger.debug(`The livestream codec is '${codec}'`);
                    ws.send(codec);

                    livestream.on("message", (buffer) => {
                        try {
                            ws.send(buffer);
                        } catch (e) {
                            logger.error(e);
                        }
                    });
                });

                ws.on("close", (ws, code, reason) => {
                    logger.info(`Socket closed, code: ${code}, reason: ${reason}`);

                    livestream.stop();
                    logger.info("Livestream stopped");
                });

                ws.on("error", (ws, error) => {
                    logger.error(error);
                    livestream.stop();
                });

                logger.info(`Starting the livestream`);
                await livestream.start(cameraId, 0);

            } catch (e) {
                this._logger.error(e);
            }
        }); // on "connection"
    }

    private async getOrCreateProtectApi(controller, username, password): Promise<ProtectApi> {
        let key = `${username}:${controller}`;
        let protectApi = this._protectApis.get(key);
        if(protectApi == undefined) {
            protectApi = new ProtectApi();
            this._logger.debug(`Logging-in to the Protect Controller at '${controller}'`)
            if (await protectApi.login(controller, username, password) == false) {
                throw new Error("Invalid login credentials");
            }

            if (await protectApi.getBootstrap() == false) {
                throw new Error("Unable to bootstrap the Protect controller");
            }

            this._protectApis.set(key, protectApi);

        } else {
            // Todo If needed, refresh the cached ProtectApi instance, as it might get stale
            // Todo Maybe by bootstrapping again?
        }

        return protectApi;
    }
}

const dummy = new SimpleReflector();