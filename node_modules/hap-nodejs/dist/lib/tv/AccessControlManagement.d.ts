/// <reference types="node" />
import { EventEmitter } from "events";
import type { AccessControl } from "../definitions";
/**
 * This defines the Access Level for TVs and Speakers. It is pretty much only used for the AirPlay 2 protocol
 * so this information is not really useful.
 *
 * @group Television
 */
export declare const enum AccessLevel {
    /**
     * This access level is set when the users selects "Anyone" or "Anyone On The Same Network"
     * in the Access Control settings.
     */
    ANYONE = 0,
    /**
     * This access level is set when the users selects "Only People Sharing this Home" in the
     * Access Control settings.
     * On this level password setting is ignored.
     * Requests to the HAPServer can only come from Home members anyways, so there is no real use to it.
     * This is pretty much only used for the AirPlay 2 protocol.
     */
    HOME_MEMBERS_ONLY = 1
}
/**
 * @group Television
 */
export declare const enum AccessControlEvent {
    ACCESS_LEVEL_UPDATED = "update-control-level",
    PASSWORD_SETTING_UPDATED = "update-password"
}
/**
 * @group Television
 */
export declare interface AccessControlManagement {
    on(event: "update-control-level", listener: (accessLevel: AccessLevel) => void): this;
    on(event: "update-password", listener: (password: string | undefined, passwordRequired: boolean) => void): this;
    emit(event: "update-control-level", accessLevel: AccessLevel): boolean;
    emit(event: "update-password", password: string | undefined, passwordRequired: boolean): boolean;
}
/**
 * @group Television
 */
export declare class AccessControlManagement extends EventEmitter {
    private readonly accessControlService;
    /**
     * The current access level set for the Home
     */
    private accessLevel;
    private passwordRequired;
    private password?;
    /**
     * Instantiates a new AccessControlManagement.
     *
     * @param {boolean} password - if set to true the service will listen for password settings
     */
    constructor(password?: boolean);
    /**
     * Instantiates a new AccessControlManagement.
     *
     * @param {boolean} password - if set to true the service will listen for password settings
     * @param {AccessControl} service - supply your own instance to sideload the AccessControl service
     */
    constructor(password?: boolean, service?: AccessControl);
    /**
     * @returns the AccessControl service
     */
    getService(): AccessControl;
    /**
     * @returns the current {@link AccessLevel} configured for the Home
     */
    getAccessLevel(): AccessLevel;
    /**
     * @returns the current password configured for the Home or `undefined` if no password is required.
     */
    getPassword(): string | undefined;
    /**
     * This destroys the AccessControlManagement.
     * It unregisters all GET or SET handler it has associated with the given AccessControl service.
     * It removes all event handlers which were registered to this object.
     */
    destroy(): void;
    private handleAccessLevelChange;
    private handlePasswordChange;
    private setupServiceHandlers;
}
//# sourceMappingURL=AccessControlManagement.d.ts.map