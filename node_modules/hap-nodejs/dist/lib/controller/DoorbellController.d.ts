import { EventTriggerOption } from "../camera";
import { Service } from "../Service";
import { CameraController, CameraControllerOptions, CameraControllerServiceMap } from "./CameraController";
import { ControllerServiceMap } from "./Controller";
/**
 * Options which are additionally supplied for a {@link DoorbellController}.
 *
 * @group Doorbell
 */
export interface DoorbellOptions {
    /**
     * Name used to for the {@link Service.Doorbell} service.
     */
    name?: string;
    /**
     * This property may be used to supply an external {@link Service.Doorbell}.
     * This is particularly handy when one is migrating from an existing implementation
     * to a `DoorbellController` and want to avoid loosing users automation by removing and deleting the service.
     *
     * NOTE: You are responsible for managing the service yourself (e.g. creation, restoring, adding to accessory, ...)
     */
    externalDoorbellService?: Service;
}
/**
 * The `DoorbellController` to efficiently manage doorbell implementations with HAP-NodeJS.
 *
 * NOTICE: We subclass from the {@link CameraController} here and deliberately do not introduce/set an
 * own/custom ControllerType for Doorbells, as Cameras and Doorbells are pretty much the same thing
 * and would collide otherwise.
 * As the possibility exists, both the CameraController and DoorbellController are written to support migration
 * from one to another. Meaning a serialized CameraController can be initialized as a DoorbellController
 * (on startup in {@link initWithServices}) and vice versa.
 *
 * @group Doorbell
 */
export declare class DoorbellController extends CameraController {
    private doorbellService?;
    private doorbellServiceExternallySupplied;
    /**
     * Temporary storage. Erased after init.
     */
    private doorbellOptions?;
    /**
     * Initializes a new `DoorbellController`.
     * @param options - The {@link CameraControllerOptions} and optional {@link DoorbellOptions}.
     */
    constructor(options: CameraControllerOptions & DoorbellOptions);
    /**
     * Call this method to signal a doorbell button press.
     */
    ringDoorbell(): void;
    constructServices(): CameraControllerServiceMap;
    initWithServices(serviceMap: CameraControllerServiceMap): void | CameraControllerServiceMap;
    protected migrateFromDoorbell(serviceMap: ControllerServiceMap): boolean;
    protected retrieveEventTriggerOptions(): Set<EventTriggerOption>;
    handleControllerRemoved(): void;
    configureServices(): void;
}
//# sourceMappingURL=DoorbellController.d.ts.map