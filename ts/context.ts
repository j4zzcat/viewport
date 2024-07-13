import {DefaultLogger} from "./utils/logger";
import {Logger} from "winston";
import {PluginRegistry} from "./utils/plugin";
import {MainCommandLine} from "./frontend/cli";
import {Backend} from "./backend/backend";
import {UnifiNvr, UnifiStreamController, UnifiStreamProvider, UnifiStreamsProxy} from "./backend/unifi";
import {RTSPStreamProvider} from "./backend/rtsp";
import {GridLayoutManager} from "./backend/layout";
import {WebSocketServer} from "ws";

export class DefaultContext {
    private readonly _logger: DefaultLogger;

    constructor() {
        this._logger = new DefaultLogger();
    }

    public get rootLogger() { return this._logger };
    public createChildLogger(clazz: string): Logger {
        return this._logger.createLogger(clazz);
    }

    private createLoggingProxy<T extends object>(obj: T): T {
        const _logger = this.createChildLogger("LoggingProxy");
        _logger.debug(`Wrapping object ${obj} with logging`);

        return new Proxy(obj, {
            get(target, prop, receiver) {
                const original = Reflect.get(target, prop, receiver);
                if (typeof original === "function") {
                    return (...args: any[]): any => {
                        receiver._logger.debug(`${String(prop)}: ${JSON.stringify(args)}`);
                        return (original as Function).apply(target, args);
                    };
                }
                return original;
            }
        });
    }

    public async createUnifiNvr(host: string, username:string , password: string): Promise<UnifiNvr> {
        return new UnifiNvr(host, username, password);
    }

    public async createPluginRegistry(): Promise<PluginRegistry> {
        return new PluginRegistry();
    }

    public createMainCommandLine(): MainCommandLine {
        return new MainCommandLine();
    }

    public async createBackend(): Promise<Backend> {
        return new Backend();
    }

    public async createUnifiStreamProvider(): Promise<UnifiStreamProvider> {
        return new UnifiStreamProvider();
    }

    public async createUnifiStreamController(
        unifiStreamsProxy: UnifiStreamsProxy,
        unifiNvr: UnifiNvr,
        cameraName: string,
        cameraId: string): Promise<UnifiStreamController> {

        return new UnifiStreamController(
            unifiStreamsProxy,
            unifiNvr,
            cameraName,
            cameraId
        );
    }

    public createRTSPStreamProvider(): RTSPStreamProvider {
        return new RTSPStreamProvider();
    }

    public createGridLayoutManager(): GridLayoutManager {
        return new GridLayoutManager();
    }

    public createUnifiStreamsProxy() {
        return this.createLoggingProxy(new UnifiStreamsProxy());
    }

    public createWebSocketServer(port: number): WebSocketServer {
        return new WebSocketServer({port: port});
    }
}

export let context = new DefaultContext();