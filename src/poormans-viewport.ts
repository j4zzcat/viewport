import {ProtectPlatform} from "homebridge-unifi-protect/dist/protect-platform";
import {
    AccessoryName,
    AccessoryPluginConstructor,
    API, HAP,
    Logging,
    LogLevel,
    PlatformAccessory,
    PlatformConfig,
    PlatformIdentifier,
    PlatformName, PlatformPluginConstructor, PluginIdentifier,
    User
} from 'homebridge'
import {ProtectNvr} from "homebridge-unifi-protect/dist/protect-nvr";
import {ProtectNvrOptions} from "homebridge-unifi-protect/dist/protect-options";
import {HAPLegacyTypes} from "homebridge/lib/api";
import { setTimeout } from 'node:timers/promises';

import * as shell from "shelljs";

const USERID = 'viewport-1';
const PASSWORD = shell.exec('security find-generic-password -l dev-user -a unifi-protect -w', { silent: true }).split('\n')[0];

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

class MockedHomebridgeAPI implements API {
    readonly hap: HAP;
    readonly hapLegacyTypes: HAPLegacyTypes;
    readonly platformAccessory: typeof PlatformAccessory;
    readonly serverVersion: string;
    readonly user: typeof User;
    readonly version: number;

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
const mocked_homebridge_api = new MockedHomebridgeAPI()

// @ts-ignore
const protect_platform = new ProtectPlatform( mocked_logging, mocked_platform_config, mocked_homebridge_api );

