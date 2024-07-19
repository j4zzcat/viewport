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

/*
 * SimpleReflector acts as a proxy/reflector server to retrieve video streams
 * from Unifi cameras and deliver them to a Simple Player over WebSocket. It
 * initializes a WebSocketServer on port 4001, listens for connections, and
 * establishes the stream from Unifi Protect to the client. The video stream
 * is sent in the correct format directly to the client without transcoding,
 * ensuring low latency.
 */

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

            /*
             * Start the interaction with the client.
             */

            try {

                let url = new URL(`unifi:/${req.url}`);

                /*
                 * This initial request is expected to arrive over WebSocket and formatted as follows:
                 * ws://server:port/<unifi-controller-ip>/<camera-id>
                 */

                // @ts-ignore
                let clientId = `${ws._socket.remoteAddress}:${ws._socket.remotePort}`;
                let controller = url.host;
                let username = url.username;
                let password = url.password;
                let cameraId = url.pathname.slice(1);

                let logger = this._logger.child({mdc: { clientId: clientId, controller: controller, cameraId: cameraId}});
                logger.info(`Client '${clientId}' asks for '${url}'`);

                /*
                 * Get or create an instance of ProtectApi, fully initialized.
                 * This is done asynchronously.
                 */

                let protectApi = await this.getOrCreateProtectApi(controller, username, password);
                logger.debug("Wiring the livestream to the client's WebSocket")

                /*
                 * Create a new instance of the livestream controller of this particular
                 * Unifi Protect controller. This anchor object is used to start and stop
                 * the actual H.264 fMP4 stream of a specific camera id.
                 */
                let livestream = protectApi.createLivestream();

                livestream.on("close", () => {
                    logger.info("Livestream closed");
                    ws.close();
                });

                /*
                 * Listen for the Codec event, so that it can be transmitted
                 * as the first messagr to the client.
                 */
                livestream.on("codec", (codec) => {

                    /*
                     * This is the first outgoing message to the client
                     */
                    ws.send(codec);
                    logger.debug(`The livestream codec is '${codec}'`);

                    /*
                     * Now start listening for the H.264 fMP4 stream and simply
                     * send it over WebSocket to the client.
                     */
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

    /*
     * Login and bootstrap Unifi Protect controller, i.e., NVR and the likes.
     * Once created and properly initialized, the instance is kept in a cache.
     */
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