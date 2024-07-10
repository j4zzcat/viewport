import {DefaultLogger} from "./utils/logger";
import {Logger} from "winston";
import {CachingFactory, ICacheable} from "./utils/cache";
import {PluginRegistry} from "./utils/plugin";
import {MainCommandLine} from "./frontend/cli";
import {Backend} from "./backend/backend";
import {UnifiNvr, UnifiStreamController, UnifiStreamProvider} from "./backend/unifi";
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

    public createCachingFactory<T extends ICacheable>(
        ctor: { new(): T },
        keyGenerator: (...args: any[]) => string = (...args: any[]) => { return args.join(':')}): CachingFactory<T> {

        return new CachingFactory<T>(ctor, keyGenerator);
    }

    public createPluginRegistry() {
        return new PluginRegistry();
    }

    public createMainCommandLine(): MainCommandLine {
        return new MainCommandLine();
    }

    public createBackend(): Backend {
        return new Backend();
    }

    public createUnifiStreamProvider(): UnifiStreamProvider {
        return new UnifiStreamProvider();
    }

    public createUnifiStreamController(
        cameraName: string,
        cameraId: string,
        unifiStreamProvider: UnifiStreamProvider,
        unifiNvr: UnifiNvr): UnifiStreamController {

        return new UnifiStreamController(
            cameraName,
            cameraId,
            unifiStreamProvider,
            unifiNvr
        );
    }

    public createRTSPStreamProvider(): RTSPStreamProvider {
        return new RTSPStreamProvider();
    }

    public createGridLayoutManager(): GridLayoutManager {
        return new GridLayoutManager();
    }

    public createWebSocketServer(port: number): WebSocketServer {
        return new WebSocketServer({port: port});
    }
}

export let context = new DefaultContext();