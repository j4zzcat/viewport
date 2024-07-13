import {context} from "../context";
import {BasePlugin} from "../utils/plugin";
import {ProtectApi, ProtectLivestream} from "unifi-protect";
import {IStreamController, IStreamProvider} from "./backend";
import {WebSocket} from "ws";
import {promises} from "dns";

export class UnifiStreamProvider extends BasePlugin implements IStreamProvider {
    private _logger = context.createChildLogger(UnifiStreamProvider.name);

    private _unifiStreamsProxy = context.createUnifiStreamsProxy();
    private _unifiNvrsById = new Map<string, UnifiNvr>();
    private _unifiStreamsById = new Map<string, IStreamController>();

    constructor() {
        super("unifi");
    }

    dispose() {
        this._unifiStreamsProxy.dispose();

        this._unifiStreamsById.forEach((unifiStreamController, key) => {
            unifiStreamController.stop();
            unifiStreamController.dispose();
        });

        this._unifiNvrsById.forEach((unifiNvr, key) => {
            unifiNvr.dispose();
        });
    }

    /**
     * Handles URLs in the form of unifi://.../camera/...
     */
    public async canHandle(url: URL): Promise<boolean> {
        if(url.protocol.split(':')[0] == "unifi" &&
            decodeURI(url.pathname).split('/')[1] == "camera") {
            return true;
        } else {
            return false;
        }
    }

    public async createStreamControllers(url: URL): Promise<IStreamController[]> {
        let splitPathname = decodeURI(url.pathname).split('/');
        if(splitPathname[2].trim().length == 0) {
            throw new Error(`Expecting url.pathname to specify either '/camera/_all' or /camera/camera1,camera2... but got '${splitPathname[2]}'`);
        }

        this._logger.debug(`Creating (or getting from the cache) UnifiNVR for url '${url}'`);
        let unifiNvr = await this.getOrCreateUnifiNvr(url.host, url.username, url.password);

        this._logger.debug(`Processing requested cameras`);
        let cameraNames = splitPathname[2];
        let cameras = await this.getCameras(unifiNvr, cameraNames);

        this._logger.debug(`Found '${cameras.length}' cameras: '${cameras.map((val) => val.name)}'`);
        this._logger.info(`Creating '${cameras.length}' Streams`);

        let unifiStreams = [];
        for(let camera of cameras) {
            this._logger.debug(`Creating Stream to handle camera: '${camera.name}'`);

            let unifiStream = await context.createUnifiStreamController(this._unifiStreamsProxy, unifiNvr, camera.name, camera.id );
            this._unifiStreamsById.set(unifiStream.id, unifiStream);
            unifiStreams.push(unifiStream);
        }

        return unifiStreams;
    }

    private async getOrCreateUnifiNvr(host, username, password): Promise<UnifiNvr> {
        const key = `${username}:${host}`
        let unifiNvr = this._unifiNvrsById.get(key);
        if(unifiNvr == undefined) {
            unifiNvr = await context.createUnifiNvr(host, username, password)
            this._unifiNvrsById.set(key, unifiNvr);
        };

        return unifiNvr;
    }

    private async getCameras(unifiNvr, cameraNames) {
        const cameras = [];

        if(cameraNames == "_all") {
            this._logger.debug("Requested '_all', collecting all cameras");

            for(let camera of unifiNvr.cameras) {
                cameras.push({
                    id: camera.id,
                    name: camera.name
                });
            }
        } else {
            const cameraNameList: string[] = cameraNames.split(',').map(val => val.trim());
            for(let cameraName of cameraNameList) {
                this._logger.debug(`Getting camera named '${cameraName}'`);
                let camera = unifiNvr.cameras.filter((val) => cameraNames == val.name);

                if(camera.length == 1) {
                    cameras.push({
                        id: camera[0].id,
                        name: camera[0].name
                    });
                } else {
                    this._logger.error(`Cannot find camera named '${cameraName}' in UnifiNVR '${unifiNvr.host}'`);
                    throw new Error(`Camera '${cameraName}' not found`);
                }
            }
        }

        return cameras;
    }
}

export class UnifiStreamController implements IStreamController {
    private _logger = context.createChildLogger(UnifiStreamController.name);

    private readonly _unifiStreamsProxy: UnifiStreamsProxy;
    private readonly _unifiNvr: UnifiNvr;
    private readonly _cameraName: string;
    private readonly _cameraId: string;
    private _livestream: ProtectLivestream;
    private _codec: string;
    private _container: string;
    private _endpoint: string;

    constructor(
        unifiStreamsProxy: UnifiStreamsProxy,
        unifiNvr: UnifiNvr,
        cameraName: string,
        cameraId: string) {

        this._unifiStreamsProxy = unifiStreamsProxy;
        this._unifiNvr = unifiNvr;
        this._cameraName = cameraName;
        this._cameraId = cameraId;

        this._logger.debug(`Stream '${this.id}' created`);
    }

    public get id(): string { return `${this._unifiNvr.host}:${this._cameraId}`; }
    public get codec(): string { return this._codec; }
    public get container(): string { return this._container }
    public get endpoint(): string { return this._endpoint }

    public start() {
        this._logger.debug(`Starting stream controller '${this.id}'...`);
        this._livestream = this._unifiNvr.createLivestream();

        /**
         * The following will get executed when a client first connects to the proxy
         * server asking for the id of this stream, i.e., a client will issue a call
         * to ws://proxy-server:port/nvrHost:cameraId. In return, the client will get
         * the codec of this stream and then a fMPEG video stream of the camera.
         */
        this._unifiStreamsProxy.addTopic(this.id, (ws) => {

            /*
             * When the code below executes, the client had just connected to the proxy asking
             * for this stream's id. The codec is sent and then the video stream follows.
             */
            this._livestream.once("codec", (codec) => {
                ws.send(JSON.stringify({codec: codec}));
                this._livestream.on("message", (buffer) => {
                    ws.send(buffer);
                })
            });

            this._livestream.start(this._cameraId, 0);
        });

        this._logger.debug(`Connecting to Unifi fMPEG web socket for camera ${this._cameraName}`);
    }

    public stop() {
        this._logger.debug(`Stopping stream '${this.id}'`);
    }

    public dispose() {
        this._logger.debug("Stopped");
    }
}

export class UnifiStreamsProxy {
    private _logger = context.createChildLogger(UnifiStreamProvider.name);
    private _topicsByStreamControllerId = new Map<string, (ws) => void>();
    private _webSocketsByStreamControllerId = new Map<string, WebSocket>()
    private _wss;

    constructor() {
        this.initialize();
    }

    private initialize() {
        this._wss = context.createWebSocketServer(9080);

        this._wss.once("listening", () => {
            this._logger.debug(`WebSocketServer listening on port '${this._wss.address().port}'`);
        });

        this._wss.on("connection", (ws, request) => {
            this._logger.debug(`Client '${request.remoteAddress}:${request.remotePort}' wants to connect, request path is '${request.url}'`);
            let callback = this._topicsByStreamControllerId.get(request.url);
            if (callback == undefined) {
                this._logger.warning(`Topic '${request.url} not found.'`);
                ws.send(JSON.stringify({error: `Topic '${request.url}' not found`}))

            } else {
                this._webSocketsByStreamControllerId.set(request.url, ws);

                /*
                 * This callback completes the wiring of the camera's fMPEG videostream to a simple
                 * WebSocket-based protocol.
                 */
                callback(ws);
            }
        });
    }

    public addTopic(id: string, callback: (ws) => void) {
        this._topicsByStreamControllerId.set(id, callback);
    }

    public dispose() {
        this._webSocketsByStreamControllerId.forEach((ws, key) => ws.close());
        this._wss.close();
    }
}

export class UnifiNvr {
    private _logger = context.createChildLogger(UnifiNvr.name);

    private readonly _host;
    private readonly _username;
    private readonly _password;
    private _protectApi = new ProtectApi();

    public constructor(host: string, username: string, password: string) {
        this._host = host;
        this._username = username;
        this._password = password;

        this.initialize();
    }

    // public static _unifiProtectModule;
    public async initialize(): Promise<void> {
        this._logger.debug(`Initializing new ${UnifiNvr.name} instance`);

        // TODO Fix this Jest-induced kludge, it creates a possible race condition
        // if(UnifiNvr._unifiProtectModule == undefined) {
        //     UnifiNvr._unifiProtectModule = await import("unifi-protect");
        // }
        // this._protectApi = new UnifiNvr._unifiProtectModule.ProtectApi();

        this._logger.info(`Connecting to NVR at '${this._host}' with username '${this._username}'...`)
        if(!(await this._protectApi.login(this._host, this._username, this._password))) {
            throw new Error("Invalid login credentials");
        };

        if(!(await this._protectApi.getBootstrap())) {
            throw new Error("Unable to bootstrap the Protect controller");
        }

        this._logger.debug('Connected successfully');
    }

    public get host() { return this._host; };
    public get cameras() { return this._protectApi.bootstrap.cameras; };

    public createLivestream() {
        return this._protectApi.createLivestream();
    }

    public dispose() {
        this._logger.debug("Stopped");
    }
}