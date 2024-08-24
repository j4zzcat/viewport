/* 
 * This file is part of Viewport. 
 * By Sharon Dagan <https://github.com/j4zzcat>, Copyright (C) 2024.  
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
import winston from 'winston';
const { combine, timestamp, json } = winston.format;

const Logger = winston.createLogger({
    level: "debug",
    format: combine(timestamp(), json()),
    transports: [new winston.transports.Console()]
});

/*
 * SimpleReflector server acts as a proxy to get video streams from Unifi cameras
 * and send them to a Simple Player over WebSocket. It sets up a WebSocketServer
 * on port 4001, listens for connections, and forwards the stream from Unifi Protect
 * to the client. The video stream is sent directly to the client without any changes,
 * ensuring low latency.
 */

class SimpleReflector {
    private _logger = Logger.child({source: SimpleReflector.name});
    private _wss: WebSocketServer;
    private _protectApis = new Map<string, ProtectApi>();

    public constructor(host: string, port: number) {
        this.initialize(host, port)
    }

    private initialize(host: string, port: number) {
        this._wss = new WebSocketServer({host: host, port: port});

        this._wss.once("listening", () => {
            // @ts-ignore
            this._logger.info(`Simple Unifi Reflector is ready, WS: ${host}:${this._wss.address().port}`);
        });

        this._wss.on("connection", async (ws: WebSocket, req) => {

            /*
             * Start the interaction with the client.
             */

            try {

                /*
                 * This initial request is expected to arrive over WebSocket and formatted as follows:
                 * ws://reflector:port/<username>:<password>@<controller>/<camera-id>
                 */
                this._logger.debug(`Received url: '${req.url}'`);
                let url = new URL(`unifi://${req.url.slice(1)}`);

                // @ts-ignore
                let clientId = `${ws._socket.remoteAddress}:${ws._socket.remotePort}`;
                let controller = url.host;
                let username = url.username;
                let password = url.password;
                let cameraId = url.pathname.slice(1);

                // let logger = this._logger.child({context: { clientId: clientId, cameraId: cameraId}});
                let logger = this._logger.child({});
                logger.debug(`Client '${clientId}' asks for '${url}'`);

                /*
                 * Get or create an instance of ProtectApi, fully initialized.
                 * This is done asynchronously.
                 */

                let protectApi = await this.getOrCreateProtectApi(controller, username, password);
                logger.debug("Wiring the livestream to the client's WebSocket")

                /*
                 * Create a new instance of the livestream controller of this particular
                 * Unifi Protect controller. This anchor object is used to start and stop
                 * the actual H.264 fMP4 stream of a specific camera.
                 */
                let livestream = protectApi.createLivestream();

                livestream.on("close", () => {
                    logger.debug("Livestream closed");
                    ws.close();
                });

                /*
                 * Listen for the Codec event. Once established, it is sent
                 * as the first message to the client.
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
                            // Todo better error handling
                            logger.error(e);
                        }
                    });
                });

                ws.on("close", (ws, code, reason) => {
                    logger.debug(`Socket closed, code: ${code}, reason: ${reason}`);

                    livestream.stop();
                    logger.info(`Stopping 'fmp4' livestream for client: '${clientId}'`);
                });

                ws.on("error", (ws, error) => {
                    logger.error(error);
                    livestream.stop();
                    logger.info(`Stopping livestream for client: '${clientId}'`);
                });

                logger.info(`Starting 'fmp4' livestream for client: '${clientId}'`);
                await livestream.start(cameraId, 0);

            } catch (e) {
                this._logger.error(e);
            }
        }); // on "connection"
    }

    /*
     * Login and bootstrap the Unifi Protect controller.
     * Once created and properly initialized, the instance is kept in a cache
     * to avoid unnecessary re-initialization calls.
     */
    private async getOrCreateProtectApi(
        controller: string,
        username: string,
        password: string): Promise<ProtectApi> {

        let key = `${username}:${controller}`;
        let protectApi = this._protectApis.get(key);
        if(protectApi == undefined) {
            protectApi = new ProtectApi();
            this._logger.debug(`Logging-in to the Protect Controller at '${controller}'`)
            if (await protectApi.login(controller, username, password) == false) {
                throw new Error("Invalid login credentials");
            }

            if (await protectApi.getBootstrap() == false) {
                throw new Error("Unable to bootstrap ProtectApi");
            }

            this._protectApis.set(key, protectApi);

        } else {
            this._logger.debug(`Reusing ProtectApi instance`)
        }

        return protectApi;
    }
}

const args = process.argv.slice(2)
const host = args[0] || "127.0.0.1";
const port = Number(args[1]) || 4001
const dummy = new SimpleReflector(host, port);