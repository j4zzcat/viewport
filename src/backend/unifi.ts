import {Logger} from "../utils/logger";
import {IStreamController, IVideoProvider} from "./backend";
import {BasePlugin} from "../utils/plugin";
import {CachingFactory, ICacheable} from "../utils/cache";
import {WebSocket} from "ws";

export class UnifiVideoProvider extends BasePlugin implements IVideoProvider {
    _logger = Logger.createLogger(UnifiVideoProvider.name);

    private _unifiNvrFactory = new CachingFactory<UnifiNVR>(UnifiNVR, (...args: any[]) => `${args[0]}:${args[1]}`);
    private _webSocketServer = new WebSocket.Server({ port: 8087 });
    private _streamsById = new Map<string, IStreamController>()

    constructor() {
        super('unifi');
        this.createWebSocketServer();
    }

    private createWebSocketServer() {
        const clientId = (request) => `${request.socket.remoteAddress}:${request.socket.remotePort}`

        this._webSocketServer.on("connection", (ws: WebSocket, request) => {
            this._logger.debug(`Client '${clientId(request)}' wants to connect`);

            ws.on("message", (ws: WebSocket, request) => {
                const { type, topic } = JSON.parse(request);
                switch(type) {
                    case "subscribe":
                        this._logger.debug(`Client '${clientId(request)}' wants to subscribe to '${topic}'`);

                        let stream = this._streamsById.get(topic);
                        if(stream != undefined) {
                            this._logger.debug(`Found Stream '${stream.id}'`);
                            stream.start(ws);

                        } else {
                            this._logger.warn(`Can't find stream with topic '${topic}'`);
                            ws.send(JSON.stringify({error: "Unknown stream id"}))
                            ws.close();
                        }

                        break;

                    case "unsubscribe":
                        break;

                    default:
                        ws.send(JSON.stringify({ error: "Unknown message type" }));
                }

            })
        });
    }

    /**
     * Handles URLs in the form of unifi://.../camera/...
     */
    public canHandle(url: URL): boolean {
        if(url.protocol.split(':')[0] == "unifi" &&
            decodeURI(url.pathname).split('/')[1] == "camera") {
            return true;
        } else {
            return false;
        }
    }

    public async getOrCreateStreams(url: URL): Promise<IStreamController[]> {
        let splitPathname = decodeURI(url.pathname).split('/');
        if(splitPathname[2].trim().length == 0) {
            throw new Error(`Expecting url.pathname to specify either '/camera/_all' or /camera/camera1,camera2... but got '${splitPathname[2]}'`);
        }

        this._logger.debug(`Creating (or getting from the cache) UnifiNVR for url '${url}'`);
        let unifiNvr = await this._unifiNvrFactory.getOrCreate(
            url.host,
            url.username,
            url.password);

        this._logger.debug(`Processing requested cameras`);

        const cameras = [];
        const requestedCameras = splitPathname[2];
        this._logger.debug(`Requested cameras: '${requestedCameras}'`);

        if(requestedCameras == "_all") {
            for(let camera of unifiNvr.cameras) {
                cameras.push({
                    id: camera.id,
                    name: camera.name
                });
            }
        } else {
            const requestedCamerasList: string[] = requestedCameras.split(',').map(val => val.trim());
            for(let requestedCamera of requestedCamerasList) {
                let camera = unifiNvr.cameras.filter((val) => requestedCameras == val.name);
                if(camera.length == 1) {
                    cameras.push({
                        id: camera[0].id,
                        name: camera[0].name
                    });
                } else {
                    this._logger.error(`Cannot find camera named '${requestedCamera}' in UnifiNVR at '${unifiNvr.host}'`);
                    throw new Error(`Camera '${requestedCamera}' not found`);
                }
            }
        }

        this._logger.debug(`Found '${cameras.length}' cameras: '${cameras.map((val) => val.name)}'`);
        this._logger.info(`Creating '${cameras.length}' Streams`);
        for(let camera of cameras) {
            this._logger.debug(`Creating Stream to handle camera: '${camera.name}'`);

            let unifiStream = new UnifiStream(camera.name, camera.id, this, unifiNvr);
            this._streamsById.set(unifiStream.id, unifiStream);
        }
    }
}

export class UnifiStream implements IStreamController {
    private _logger = Logger.createLogger(UnifiStream.name);
    private readonly _unifiCameraName;
    private readonly _unifiCameraId;
    private readonly _unifiVideoProvider;
    private readonly _unifiNvr;
    private _codec: string;
    private _container: string;
    private _endpoint: string;

    constructor(cameraName: string, cameraId: string, videoProvider: UnifiVideoProvider, nvr: UnifiNVR) {
        this._unifiCameraName = cameraName;
        this._unifiCameraId = cameraId;
        this._unifiVideoProvider = videoProvider;
        this._unifiNvr = nvr;

        this._logger.debug(`Stream '${this.id}' created`);
    }

    public get id(): string { return `${this._unifiNvr.host}:${this._unifiCameraName}`; }
    public get codec(): string { return this._codec; }
    public get container(): string { return this._container }
    public get endpoint(): string { return this._endpoint }

    public start(ws) {
        this._logger.debug(`Starting stream '${this.id}'...`);

        let livestream = this._unifiNvr.createLivestream();
        livestream.on("message", (buffer) => {
            ws.send(buffer);
        })

        this._logger.debug(`Connecting to Unifi fMPEG web socket for camera ${this._unifiCameraName}`);
    }

    public stop() {
        this._logger.debug(`Stopping stream '${this.id}'`);
    }
}

class UnifiNVR implements ICacheable {
    private _logger = Logger.createLogger(UnifiNVR.name);
    private _host;
    private _username;
    private _protectApi;
    private _livestream;

    static _unifiProtectModule;

    public async initialize(host, username, password): Promise<void> {
        this._logger.debug(`Initializing new ${UnifiNVR.name} instance`);

        this._host = host;
        this._username = username;

        // TODO Fix this Jest-induced kludge, it creates a possible race condition
        if(UnifiNVR._unifiProtectModule == undefined) {
            UnifiNVR._unifiProtectModule = await import("unifi-protect");
        }
        this._protectApi = new UnifiNVR._unifiProtectModule.ProtectApi();

        this._logger.info(`Connecting to NVR at '${this._host}' with username '${this._username}'...`)
        if(!(await this._protectApi.login(this._host, this._username, password))) {
            throw new Error("Invalid login credentials");
        };

        if(!(await this._protectApi.getBootstrap())) {
            throw new Error("Unable to bootstrap the Protect controller");
        }

        this._logger.info('Connected successfully');
    }

    public get host() { return this._host; };
    public get cameras() { return this._protectApi.bootstrap.cameras; };

    public createLivestream() {
        return this._protectApi.createLivestream();
    }
}