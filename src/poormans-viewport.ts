import {ProtectPlatform} from "homebridge-unifi-protect/dist/protect-platform";
import {
    AccessoryName,
    AccessoryPluginConstructor,
    API, CameraController, Categories, ConstructorArgs, Controller, ControllerConstructor, ControllerServiceMap, HAP,
    LegacyCameraSource,
    Logging,
    LogLevel,
    PlatformAccessory,
    PlatformConfig,
    PlatformIdentifier,
    PlatformName, PlatformPluginConstructor, PluginIdentifier,
    Service,
    UnknownContext,
    User,
    WithUUID
} from 'homebridge'
import {ProtectNvr} from "homebridge-unifi-protect/dist/protect-nvr";
import {ProtectNvrOptions} from "homebridge-unifi-protect/dist/protect-options";
import {HAPLegacyTypes} from "homebridge/lib/api";
import {setTimeout} from 'node:timers/promises';

import * as shell from "shelljs";
import {Accessory} from "hap-nodejs";

const USERID = 'viewport-1';
const PASSWORD = shell.exec('security find-generic-password -l dev-user -a unifi-protect -w', {silent: true}).split('\n')[0];

// @ts-ignore
class MockedLogging implements Logging {
    prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;

        // Necessary to bind the instance to the callable use case
        return new Proxy(this, {
            apply: (target, thisArg, argumentsList) => {
                // @ts-ignore
                return target.log(...argumentsList);
            }
        });
    }

    debug(message: string, ...parameters: any[]): void {
        console.log('Debug ' + message);
    }

    error(message: string, ...parameters: any[]): void {
        console.log('Error ' + message);
    }

    info(message: string, ...parameters: any[]): void {
        console.log('Info ' + message);
    }

    log(level: LogLevel, message: string, ...parameters: any[]): void {
        console.log(message);
    }

    success(message: string, ...parameters: any[]): void {
        console.log(message);
    }

    warn(message: string, ...parameters: any[]): void {
        console.log('Warn ' + message);
    }
}

class MockedPlatformConfig implements PlatformConfig {
    platform: PlatformName = "dummy"
    controllers = [
        {
            address: "192.168.4.10",
            name: "nvr",
            username: USERID,
            password: PASSWORD
        } as ProtectNvrOptions
    ];
}

class MockedUUID {
    generate(s: string): string {
        console.log(s);
        return s;
    }
}

class MockedHAP {
    uuid = new MockedUUID()
}

class MockedPlatformAccessory implements PlatformAccessory {
    constructor(name: string, uuid: string) {
        this.context = {
            nvr: "dummy"
        }
    }

    on(event: "identify", listener: () => void): this {
        throw new Error("Method not implemented.");
    }
    emit(event: "identify"): boolean {
        throw new Error("Method not implemented.");
    }
    _associatedPlugin?: string;
    _associatedPlatform?: string;
    _associatedHAPAccessory: Accessory;
    displayName: string;
    UUID: string;
    category: Categories;
    services: Service[];
    reachable: boolean;
    context: UnknownContext;
    addService(service: Service): Service;
    addService<S extends Service>(serviceConstructor: S, ...constructorArgs: ConstructorArgs<S>): Service;
    addService(service: any, ...rest?: any[]): import("homebridge").Service {
        throw new Error("Method not implemented.");
    }
    removeService(service: Service): void {
        throw new Error("Method not implemented.");
    }
    getService<T extends WithUUID<Service>>(name: string | T): Service {
        throw new Error("Method not implemented.");
    }
    getServiceByUUIDAndSubType<T extends WithUUID<Service>>(uuid: string | T, subType: string): Service {
        throw new Error("Method not implemented.");
    }
    getServiceById<T extends WithUUID<Service>>(uuid: string | T, subType: string): Service {
        throw new Error("Method not implemented.");
    }
    updateReachability(reachable: boolean): void {
        throw new Error("Method not implemented.");
    }
    configureCameraSource(cameraSource: LegacyCameraSource): CameraController {
        throw new Error("Method not implemented.");
    }
    configureController(controller: ControllerConstructor | Controller<ControllerServiceMap>): void {
        throw new Error("Method not implemented.");
    }
    removeController(controller: Controller<ControllerServiceMap>): void {
        throw new Error("Method not implemented.");
    }
    // [EventEmitter.captureRejectionSymbol]?<K>(error: Error, event: string | symbol, ...args: any[]): void {
    //     throw new Error("Method not implemented.");
    // }
    addListener<K>(eventName: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    once<K>(eventName: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    removeListener<K>(eventName: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    off<K>(eventName: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(eventName?: string | symbol): this {
        throw new Error("Method not implemented.");
    }
    setMaxListeners(n: number): this {
        throw new Error("Method not implemented.");
    }
    getMaxListeners(): number {
        throw new Error("Method not implemented.");
    }
    listeners<K>(eventName: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    rawListeners<K>(eventName: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    listenerCount<K>(eventName: string | symbol, listener?: Function): number {
        throw new Error("Method not implemented.");
    }
    prependListener<K>(eventName: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    prependOnceListener<K>(eventName: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    eventNames(): (string | symbol)[] {
        throw new Error("Method not implemented.");
    }
}

class MockedHomebridgeAPI implements API {
    readonly hap: HAP = new MockedHAP() as HAP;
    readonly hapLegacyTypes: HAPLegacyTypes;
    readonly platformAccessory: typeof PlatformAccessory
    readonly serverVersion: string;
    readonly user: typeof User;
    readonly version: number;

    constructor() {
        // @ts-ignore
        this.platformAccessory = MockedPlatformAccessory;
    }

    on(event: string, listener: () => void): this {
        console.log(event);
        console.log(listener);
        if( event == "didFinishLaunching" )
            listener.call({}, {});
        return this;
    };

    publishCameraAccessories(pluginIdentifier: PluginIdentifier, accessories: PlatformAccessory[]): void {
    }

    publishExternalAccessories(pluginIdentifier: PluginIdentifier, accessories: PlatformAccessory[]): void {
    }

    registerAccessory(accessoryName: AccessoryName, constructor: AccessoryPluginConstructor): void;
    registerAccessory(pluginIdentifier: PluginIdentifier, accessoryName: AccessoryName, constructor: AccessoryPluginConstructor): void;
    registerAccessory(accessoryName: AccessoryName | PluginIdentifier, _constructor: AccessoryPluginConstructor | AccessoryName, constructor?: AccessoryPluginConstructor): void {
    }

    registerPlatform(platformName: PlatformName, constructor: PlatformPluginConstructor): void;
    registerPlatform(pluginIdentifier: PluginIdentifier, platformName: PlatformName, constructor: PlatformPluginConstructor): void;
    registerPlatform(platformName: PlatformName | PluginIdentifier, _constructor: PlatformPluginConstructor | PlatformName, constructor?: PlatformPluginConstructor): void {
    }

    registerPlatformAccessories(pluginIdentifier: PluginIdentifier, platformName: PlatformName, accessories: PlatformAccessory[]): void {
    }

    unregisterPlatformAccessories(pluginIdentifier: PluginIdentifier, platformName: PlatformName, accessories: PlatformAccessory[]): void {
    }

    updatePlatformAccessories(accessories: PlatformAccessory[]): void {
    }

    versionGreaterOrEqual(version: string): boolean {
        return false;
    }
}

const mocked_logging = new MockedLogging("dummy");
const mocked_platform_config = new MockedPlatformConfig();
const mocked_homebridge_api = new MockedHomebridgeAPI();

// @ts-ignore
const protect_platform = new ProtectPlatform( mocked_logging, mocked_platform_config, mocked_homebridge_api );

