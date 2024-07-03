/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from "events";
import { SessionIdentifier } from "../../types";
import { CameraRecordingConfiguration, CameraRecordingOptions, CameraStreamingOptions, EventTriggerOption, PrepareStreamRequest, PrepareStreamResponse, RecordingManagement, RecordingManagementState, RecordingPacket, RTPStreamManagement, RTPStreamManagementState, SnapshotRequest, StreamingRequest } from "../camera";
import { HDSProtocolSpecificErrorReason } from "../datastream";
import { CameraOperatingMode, CameraRecordingManagement, DataStreamTransportManagement, Doorbell, Microphone, MotionSensor, OccupancySensor, Speaker } from "../definitions";
import { HAPStatus } from "../HAPServer";
import { Service } from "../Service";
import { ControllerIdentifier, ControllerServiceMap, SerializableController, StateChangeDelegate } from "./Controller";
/**
 * @group Camera
 */
export interface CameraControllerOptions {
    /**
     * Amount of parallel camera streams the accessory is capable of running.
     * As of the official HAP specification non SecureVideo cameras have a minimum required amount of 2 (but 1 is also fine).
     * Secure Video cameras just expose 1 stream.
     *
     * Default value: 1
     */
    cameraStreamCount?: number;
    /**
     * Delegate which handles the actual RTP/RTCP video/audio streaming and Snapshot requests.
     */
    delegate: CameraStreamingDelegate;
    /**
     * Options regarding video/audio streaming
     */
    streamingOptions: CameraStreamingOptions;
    /**
     * When supplying this option, it will enable support for HomeKit Secure Video.
     * This will create the {@link Service.CameraRecordingManagement}, {@link Service.CameraOperatingMode}
     * and {@link Service.DataStreamTransportManagement} services.
     *
     * NOTE: The controller only initializes the required characteristics for the {@link Service.CameraOperatingMode}.
     *   You may add optional characteristics, if required, by accessing the service directly `CameraController.recordingManagement.operatingModeService`.
     */
    recording?: {
        /**
         * Options regarding Recordings (Secure Video)
         */
        options: CameraRecordingOptions;
        /**
          * Delegate which handles the audio/video recording data streaming on motion.
          */
        delegate: CameraRecordingDelegate;
    };
    /**
     * This config section configures optional sensors for the camera.
     * It e.g. may be used to set up a {@link EventTriggerOption.MOTION} trigger when configuring Secure Video.
     *
     * You may either specify and provide the desired {@link Service}s or specify their creation and maintenance using a `boolean` flag.
     * In this case the controller will create and maintain the service for you.
     * Otherwise, when you supply an already created instance of the {@link Service}, you are responsible yourself to manage the service
     * (e.g. creating, restoring, adding to the accessory, ...).
     *
     * The services can be accessed through the documented property after the call to {@link Accessory.configureController} has returned.
     */
    sensors?: {
        /**
         * Define if a {@link Service.MotionSensor} should be created/associated with the controller.
         *
         * You may access the created service via the {@link CameraController.motionService} property to configure listeners.
         *
         * ## HomeKit Secure Video:
         *
         * If supplied, this sensor will be used as a {@link EventTriggerOption.MOTION} trigger.
         * The characteristic {@link Characteristic.StatusActive} will be added, which is used to enable or disable the sensor.
         */
        motion?: Service | boolean;
        /**
         * Define if a {@link Service.OccupancySensor} should be created/associated with the controller.
         *
         * You may access the created service via the {@link CameraController.occupancyService} property to configure listeners.
         *
         * ## HomeKit Secure Video:
         *
         * The characteristic {@link Characteristic.StatusActive} will be added, which is used to enable or disable the sensor.
         */
        occupancy?: Service | boolean;
    };
}
/**
 * @group Camera
 */
export type SnapshotRequestCallback = (error?: Error | HAPStatus, buffer?: Buffer) => void;
/**
 * @group Camera
 */
export type PrepareStreamCallback = (error?: Error, response?: PrepareStreamResponse) => void;
/**
 * @group Camera
 */
export type StreamRequestCallback = (error?: Error) => void;
/**
 * @group Camera
 */
export declare const enum ResourceRequestReason {
    /**
     * The reason describes periodic resource requests.
     * In the example of camera image snapshots those are the typical preview images every 10 seconds.
     */
    PERIODIC = 0,
    /**
     * The resource request is the result of some event.
     * In the example of camera image snapshots, requests are made due to e.g. a motion event or similar.
     */
    EVENT = 1
}
/**
 * @group Camera
 */
export interface CameraStreamingDelegate {
    /**
     * This method is called when a HomeKit controller requests a snapshot image for the given camera.
     * The handler must respect the desired image height and width given in the {@link SnapshotRequest}.
     * The returned Buffer (via the callback) must be encoded in jpeg.
     *
     * HAP-NodeJS will complain about slow running handlers after 5 seconds and terminate the request after 15 seconds.
     *
     * @param request - Request containing image size.
     * @param callback - Callback supplied with the resulting Buffer
     */
    handleSnapshotRequest(request: SnapshotRequest, callback: SnapshotRequestCallback): void;
    prepareStream(request: PrepareStreamRequest, callback: PrepareStreamCallback): void;
    handleStreamRequest(request: StreamingRequest, callback: StreamRequestCallback): void;
}
/**
 * A `CameraRecordingDelegate` is responsible for handling recordings of a HomeKit Secure Video camera.
 *
 * It is responsible for maintaining the prebuffer (see {@link CameraRecordingOptions.prebufferLength},
 * once recording was activated (see {@link updateRecordingActive}).
 *
 * Before recording is considered enabled two things must happen:
 * - Recording must be enabled by the user. Signaled through {@link updateRecordingActive}.
 * - Recording configurations must be selected by a HomeKit controller through {@link updateRecordingConfiguration}.
 *
 * A typical recording event scenario happens as follows:
 * - The camera is in idle mode, maintaining the prebuffer (the duration of the prebuffer depends on the selected {@link CameraRecordingConfiguration}).
 * - A recording event is triggered (e.g. motion or doorbell button press) and the camera signals it through
 *   the respective characteristics (e.g. {@link Characteristic.MotionDetected} or {@link Characteristic.ProgrammableSwitchEvent}).
 *   Further, the camera saves the content of the prebuffer and starts recording the video.
 *   The camera should continue to store the recording until it runs out of space.
 *   In any case the camera should preserve recordings which are nearest to the triggered event.
 *   A stored recording might be completely deleted if a stream request wasn't initiated for eight seconds.
 * - A HomeKit Controller will open a new recording session to download the next recording.
 *   This results in a call to {@link handleRecordingStreamRequest}.
 * - Once the recording event is finished the camera will reset the state accordingly
 *   (e.g. in the {@link Service.MotionSensor} or {@link Service.Doorbell} service).
 *   It will continue to send the remaining fragments of the currently ongoing recording stream request.
 * - The camera will either reach the end of the recording (and signal this via {@link RecordingPacket.isLast}. Also see {@link acknowledgeStream})
 *   or it will continue to stream til the HomeKit Controller closes
 *   the stream {@link closeRecordingStream} with reason {@link HDSProtocolSpecificErrorReason.NORMAL}.
 * - The camera goes back into idle mode.
 *
 * @group Camera
 */
export interface CameraRecordingDelegate {
    /**
     * A call to this method notifies the `CameraRecordingDelegate` about a change to the
     * `CameraRecordingManagement.Active` characteristic. This characteristic controls
     * if the camera should react to recording events.
     *
     * If recording is disabled the camera can stop maintaining its prebuffer.
     * If recording is enabled the camera should start recording into its prebuffer.
     *
     * A `CameraRecordingDelegate` should assume active to be `false` on startup.
     * HAP-NodeJS will persist the state of the `Active` characteristic across reboots
     * and will call {@link updateRecordingActive} accordingly on startup, if recording was previously enabled.
     *
     * NOTE: HAP-NodeJS cannot guarantee that a {@link CameraRecordingConfiguration} is present
     * when recording is activated (e.g. the selected configuration might be erased due to changes
     * in the supplied {@link CameraRecordingOptions}, but the camera is still `active`; or we can't otherwise
     * influence the order which a HomeKit Controller might call those characteristics).
     * However, HAP-NodeJS guarantees that if there is a valid {@link CameraRecordingConfiguration},
     * {@link updateRecordingConfiguration} is called before {@link updateRecordingActive} (when enabling)
     * to avoid any unnecessary and potentially expensive reconfigurations.
     *
     * @param active - Specifies if recording is active or not.
     */
    updateRecordingActive(active: boolean): void;
    /**
     * A call to this method signals that the selected (by the HomeKit Controller)
     * recording configuration of the camera has changed.
     *
     * On startup the delegate should assume `configuration = undefined`.
     * HAP-NodeJS will persist the state of both across reboots and will call
     * {@link updateRecordingConfiguration} on startup if there is a **selected configuration** present.
     *
     * NOTE: An update to the recording configuration might happen while there is still a running
     * recording stream. The camera MUST continue to use the previous configuration for the
     * currently running stream and only apply the updated configuration to the next stream.
     *
     * @param configuration - The {@link CameraRecordingConfiguration}. Reconfigure your recording pipeline accordingly.
     *  The parameter might be `undefined` when the selected configuration became invalid. This typically ony happens
     *  e.g. due to a factory reset (when all pairings are removed). Disable the recording pipeline in such a case
     *  even if recording is still enabled for the camera.
     */
    updateRecordingConfiguration(configuration: CameraRecordingConfiguration | undefined): void;
    /**
     * This method is called to stream the next recording event.
     * It is guaranteed that there is only ever one ongoing recording stream request at a time.
     *
     * When this method is called return the currently ongoing (or next in case of a potentially queued)
     * recording via a `AsyncGenerator`. Every `yield` of the generator represents a complete recording `packet`.
     * The first packet MUST always be the {@link PacketDataType.MEDIA_INITIALIZATION} packet.
     * Any following packet will transport the actual mp4 fragments in {@link PacketDataType.MEDIA_FRAGMENT} packets,
     * starting with the content of the prebuffer. Every {@link PacketDataType.MEDIA_FRAGMENT} starts with a key frame
     * and must not be longer than the specified duration set via the `CameraRecordingConfiguration.mediaContainerConfiguration.fragmentLength`
     * **selected** by the HomeKit Controller in {@link updateRecordingConfiguration}.
     *
     * NOTE: You MUST respect the value of {@link Characteristic.RecordingAudioActive} characteristic of the {@link Service.CameraOperatingMode}
     *   service. When the characteristic is set to false you MUST NOT include audio in the mp4 fragments. You can access the characteristic via
     *   the `CameraController.recordingManagement.operatingModeService` property.
     *
     * You might throw an error in this method if encountering a non-recoverable state.
     * You may throw a {@link HDSProtocolError} to manually define the {@link HDSProtocolSpecificErrorReason} for the `DATA_SEND` `CLOSE` event.
     *
     * There are three ways an ongoing recording stream can be closed:
     * - Closed by the Accessory: There are no further fragments to transmit. The delegate MUST signal this by setting {@link RecordingPacket.isLast}
     *   to `true`. Once the HomeKit Controller receives this last fragment it will call {@link acknowledgeStream} to notify the accessory about
     *   the successful transmission.
     * - Closed by the HomeKit Controller (expectedly): After the event trigger has been reset, the accessory continues to stream fragments.
     *   At some point the HomeKit Controller will decide to shut down the stream by calling {@link closeRecordingStream} with a reason
     *   of {@link HDSProtocolSpecificErrorReason.NORMAL}.
     * - Closed by the HomeKit Controller (unexpectedly): A HomeKit Controller might at any point decide to close a recording stream
     *   if it encounters erroneous state. This is signaled by a call to {@link closeRecordingStream} with the respective reason.
     *
     * Once a close of stream is signaled, the `AsyncGenerator` function must return gracefully.
     *
     * For more information about `AsyncGenerator`s you might have a look at:
     * * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
     *
     * NOTE: HAP-NodeJS guarantees that this method is only called with a valid selected {@link CameraRecordingConfiguration}.
     *
     * NOTE: Don't rely on the streamId for unique identification. Two {@link DataStreamConnection}s might share the same identifier space.
     *
     * @param streamId - The streamId of the currently ongoing stream.
     */
    handleRecordingStreamRequest(streamId: number): AsyncGenerator<RecordingPacket>;
    /**
     * This method is called once the HomeKit Controller acknowledges the `endOfStream`.
     * A `endOfStream` is sent by the accessory by setting {@link RecordingPacket.isLast} to `true` in the last packet yielded
     * by the {@link handleRecordingStreamRequest} `AsyncGenerator`.
     *
     * @param streamId - The streamId of the acknowledged stream.
     */
    acknowledgeStream?(streamId: number): void;
    /**
     * This method is called to notify the delegate that a recording stream started via {@link handleRecordingStreamRequest} was closed.
     *
     * The method is also called if an ongoing recording stream is closed gracefully (using {@link HDSProtocolSpecificErrorReason.NORMAL}).
     * In either case, the delegate should stop supplying further fragments to the recording stream.
     * The `AsyncGenerator` function must return without yielding any further {@link RecordingPacket}s.
     * HAP-NodeJS won't send out any fragments from this point onwards.
     *
     * @param streamId - The streamId for which the close event was sent.
     * @param reason - The reason with which the stream was closed.
     *  NOTE: This method is also called in case of a closed connection. This is encoded by setting the `reason` to undefined.
     */
    closeRecordingStream(streamId: number, reason: HDSProtocolSpecificErrorReason | undefined): void;
}
/**
 * @group Camera
 */
export interface CameraControllerServiceMap extends ControllerServiceMap {
    microphone?: Microphone;
    speaker?: Speaker;
    cameraEventRecordingManagement?: CameraRecordingManagement;
    cameraOperatingMode?: CameraOperatingMode;
    dataStreamTransportManagement?: DataStreamTransportManagement;
    motionService?: MotionSensor;
    occupancyService?: OccupancySensor;
    doorbell?: Doorbell;
}
/**
 * @group Camera
 */
export interface CameraControllerState {
    streamManagements: RTPStreamManagementState[];
    recordingManagement?: RecordingManagementState;
}
/**
 * @group Camera
 */
export declare const enum CameraControllerEvents {
    /**
     *  Emitted when the mute state or the volume changed. The Apple Home App typically does not set those values
     *  except the mute state. When you adjust the volume in the Camera view it will reset the muted state if it was set previously.
     *  The value of volume has nothing to do with the volume slider in the Camera view of the Home app.
     */
    MICROPHONE_PROPERTIES_CHANGED = "microphone-change",
    /**
     * Emitted when the mute state or the volume changed. The Apple Home App typically does not set those values
     * except the mute state. When you unmute the device microphone it will reset the mute state if it was set previously.
     */
    SPEAKER_PROPERTIES_CHANGED = "speaker-change"
}
/**
 * @group Camera
 */
export declare interface CameraController {
    on(event: "microphone-change", listener: (muted: boolean, volume: number) => void): this;
    on(event: "speaker-change", listener: (muted: boolean, volume: number) => void): this;
    emit(event: "microphone-change", muted: boolean, volume: number): boolean;
    emit(event: "speaker-change", muted: boolean, volume: number): boolean;
}
/**
 * Everything needed to expose a HomeKit Camera.
 *
 * @group Camera
 */
export declare class CameraController extends EventEmitter implements SerializableController<CameraControllerServiceMap, CameraControllerState> {
    private static readonly STREAM_MANAGEMENT;
    private stateChangeDelegate?;
    private readonly streamCount;
    private readonly delegate;
    private readonly streamingOptions;
    /**
     * **Temporary** storage for {@link CameraRecordingOptions} and {@link CameraRecordingDelegate}.
     * This property is reset to `undefined` after the CameraController was fully initialized.
     * You can still access those values via the {@link CameraController.recordingManagement}.
     */
    private recording?;
    /**
     * Temporary storage for the sensor option.
     */
    private sensorOptions?;
    private readonly legacyMode;
    /**
     * @private
     */
    streamManagements: RTPStreamManagement[];
    /**
     * The {@link RecordingManagement} which is responsible for handling HomeKit Secure Video.
     * This property is only present if recording was configured.
     */
    recordingManagement?: RecordingManagement;
    private microphoneService?;
    private speakerService?;
    private microphoneMuted;
    private microphoneVolume;
    private speakerMuted;
    private speakerVolume;
    motionService?: MotionSensor;
    private motionServiceExternallySupplied;
    occupancyService?: OccupancySensor;
    private occupancyServiceExternallySupplied;
    constructor(options: CameraControllerOptions, legacyMode?: boolean);
    /**
     * @private
     */
    controllerId(): ControllerIdentifier;
    /**
     * Call this method if you want to forcefully suspend an ongoing streaming session.
     * This would be adequate if the rtp server or media encoding encountered an unexpected error.
     *
     * @param sessionId - id of the current ongoing streaming session
     */
    forceStopStreamingSession(sessionId: SessionIdentifier): void;
    static generateSynchronisationSource(): number;
    setMicrophoneMuted(muted?: boolean): void;
    setMicrophoneVolume(volume: number): void;
    setSpeakerMuted(muted?: boolean): void;
    setSpeakerVolume(volume: number): void;
    private emitMicrophoneChange;
    private emitSpeakerChange;
    /**
     * @private
     */
    constructServices(): CameraControllerServiceMap;
    /**
     * @private
     */
    initWithServices(serviceMap: CameraControllerServiceMap): void | CameraControllerServiceMap;
    protected _initWithServices(serviceMap: CameraControllerServiceMap): {
        serviceMap: CameraControllerServiceMap;
        updated: boolean;
    };
    protected migrateFromDoorbell(serviceMap: ControllerServiceMap): boolean;
    protected retrieveEventTriggerOptions(): Set<EventTriggerOption>;
    /**
     * @private
     */
    configureServices(): void;
    private rtpStreamManagementDisabledThroughOperatingMode;
    /**
     * @private
     */
    handleControllerRemoved(): void;
    /**
     * @private
     */
    handleFactoryReset(): void;
    /**
     * @private
     */
    serialize(): CameraControllerState | undefined;
    /**
     * @private
     */
    deserialize(serialized: CameraControllerState): void;
    /**
     * @private
     */
    setupStateChangeDelegate(delegate?: StateChangeDelegate): void;
    /**
     * @private
     */
    handleSnapshotRequest(height: number, width: number, accessoryName?: string, reason?: ResourceRequestReason): Promise<Buffer>;
    /**
     * @private
     */
    handleCloseConnection(sessionID: SessionIdentifier): void;
}
//# sourceMappingURL=CameraController.d.ts.map