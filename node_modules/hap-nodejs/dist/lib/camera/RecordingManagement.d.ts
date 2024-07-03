/// <reference types="node" />
import { AudioBitrate, VideoCodecType } from ".";
import { CameraRecordingDelegate, StateChangeDelegate } from "../controller";
import { DataStreamManagement } from "../datastream";
import { CameraOperatingMode, CameraRecordingManagement } from "../definitions";
import { Service } from "../Service";
import { H264CodecParameters, H264Level, H264Profile, Resolution } from "./RTPStreamManagement";
/**
 * Describes options passed to the {@link RecordingManagement}.
 *
 * @group Camera
 */
export interface CameraRecordingOptions {
    /**
     * The size of the prebuffer in milliseconds. It must be at least 4000 ms.
     * A sensible value for this property is in the interval [4000, 8000].
     *
     * In order to provide some context to recording event, it is a good user experience
     * to also have the recording of a few seconds before the event occurs.
     * This exactly is the prebuffer. A camera will constantly store the last
     * x seconds (the `prebufferLength`) to provide more context to a given event.
     */
    prebufferLength: number;
    /**
     * This property can be used to override the automatic heuristic of the {@link CameraController}
     * which derives the {@link EventTriggerOption}s from application state.
     *
     * {@link EventTriggerOption}s are derived automatically as follows:
     * * {@link EventTriggerOption.MOTION} is enabled when a {@link Service.MotionSensor} is configured (via {@link CameraControllerOptions.sensors}).
     * * {@link EventTriggerOption.DOORBELL} is enabled when the {@link DoorbellController} is used.
     *
     * Note: This property is **ADDITIVE**. Meaning if the {@link CameraController} decides to add
     * a certain {@link EventTriggerOption} it will still do so. This option can only be used to
     * add **additional** {@link EventTriggerOption}s!
     */
    overrideEventTriggerOptions?: EventTriggerOption[];
    /**
     * List of supported media {@link MediaContainerConfiguration}s (or a single one).
     */
    mediaContainerConfiguration: MediaContainerConfiguration | MediaContainerConfiguration[];
    video: VideoRecordingOptions;
    audio: AudioRecordingOptions;
}
/**
 * Describes the Event trigger.
 *
 * @group Camera
 */
export declare const enum EventTriggerOption {
    /**
     * The Motion trigger. If enabled motion should trigger the start of a recording.
     */
    MOTION = 1,
    /**
     * The Doorbell trigger. If enabled a doorbell button press should trigger the start of a recording.
     *
     * Note: While the doorbell is defined by the HomeKit specification and HAP-NodeJS supports (and the
     * {@link RecordingManagement} advertises support for it), HomeKit HomeHubs will (as of now, iOS 15-16)
     * never enable Doorbell triggers. Seemingly this is currently unsupported by Apple.
     * See https://github.com/homebridge/HAP-NodeJS/issues/976#issuecomment-1280301989.
     */
    DOORBELL = 2
}
/**
 * @group Camera
 */
export declare const enum MediaContainerType {
    FRAGMENTED_MP4 = 0
}
/**
 * @group Camera
 */
export interface MediaContainerConfiguration {
    /**
     * The type of media container.
     */
    type: MediaContainerType;
    /**
     * The length in milliseconds of every individual recording fragment.
     * A typical value of HomeKit Secure Video cameras is 4000ms.
     */
    fragmentLength: number;
}
/**
 * @group Camera
 */
export interface VideoRecordingOptions {
    type: VideoCodecType;
    parameters: H264CodecParameters;
    /**
     * Required resolutions to be supported are:
     * * 1920x1080
     * * 1280x720
     *
     * The following frame rates are required to be supported:
     * * 15 fps
     * * 24fps or 30fps
     */
    resolutions: Resolution[];
}
/**
 * @group Camera
 */
export type AudioRecordingOptions = {
    /**
     * List (or single entry) of supported {@link AudioRecordingCodec}s.
     */
    codecs: AudioRecordingCodec | AudioRecordingCodec[];
};
/**
 * @group Camera
 */
export type AudioRecordingCodec = {
    type: AudioRecordingCodecType;
    /**
     * The count of audio channels. Must be at least `1`.
     * Defaults to `1`.
     */
    audioChannels?: number;
    /**
     * The supported bitrate mode. Defaults to {@link AudioBitrate.VARIABLE}.
     */
    bitrateMode?: AudioBitrate;
    samplerate: AudioRecordingSamplerate[] | AudioRecordingSamplerate;
};
/**
 * This type describes the SelectedCameraRecordingConfiguration (written by the device to {@link Characteristic.SelectedCameraRecordingConfiguration}).
 *
 * @group Camera
 */
export interface CameraRecordingConfiguration {
    /**
     * The size of the prebuffer in milliseconds.
     * This value is less or equal of the value advertised in the {@link Characteristic.SupportedCameraRecordingConfiguration}.
     */
    prebufferLength: number;
    /**
     * List of the enabled {@link EventTriggerOption}s.
     */
    eventTriggerTypes: EventTriggerOption[];
    /**
     * The selected {@link MediaContainerConfiguration}.
     */
    mediaContainerConfiguration: MediaContainerConfiguration;
    /**
     * The selected video codec configuration.
     */
    videoCodec: {
        type: VideoCodecType.H264;
        parameters: SelectedH264CodecParameters;
        resolution: Resolution;
    };
    /**
     * The selected audio codec configuration.
     */
    audioCodec: AudioRecordingCodec & {
        bitrate: number;
        samplerate: AudioRecordingSamplerate;
    };
}
/**
 * @group Camera
 */
export interface SelectedH264CodecParameters {
    profile: H264Profile;
    level: H264Level;
    bitRate: number;
    /**
     * The selected i-frame interval in milliseconds.
     */
    iFrameInterval: number;
}
/**
 * @group Camera
 */
export declare const enum AudioRecordingCodecType {
    AAC_LC = 0,
    AAC_ELD = 1
}
/**
 * @group Camera
 */
export declare const enum AudioRecordingSamplerate {
    KHZ_8 = 0,
    KHZ_16 = 1,
    KHZ_24 = 2,
    KHZ_32 = 3,
    KHZ_44_1 = 4,
    KHZ_48 = 5
}
/**
 * @group Camera
 */
export declare const enum PacketDataType {
    /**
     * mp4 moov box
     */
    MEDIA_INITIALIZATION = "mediaInitialization",
    /**
     * mp4 moof + mdat boxes
     */
    MEDIA_FRAGMENT = "mediaFragment"
}
/**
 * @group Camera
 */
export interface RecordingPacket {
    /**
     * The `Buffer` containing the data of the packet.
     */
    data: Buffer;
    /**
     * Defines if this `RecordingPacket` is the last one in the recording stream.
     * If `true` this will signal an end of stream and closes the recording stream.
     */
    isLast: boolean;
}
/**
 * @group Camera
 */
export interface RecordingManagementServices {
    recordingManagement: CameraRecordingManagement;
    operatingMode: CameraOperatingMode;
    dataStreamManagement: DataStreamManagement;
}
/**
 * @group Camera
 */
export interface RecordingManagementState {
    /**
     * This property stores a hash of the supported configurations (recording, video and audio) of
     * the recording management. We use this to determine if the configuration was changed by the user.
     * If it was changed, we need to discard the `selectedConfiguration` to signify to HomeKit Controllers
     * that they might reconsider their decision based on the updated configuration.
     */
    configurationHash: {
        algorithm: "sha256";
        hash: string;
    };
    /**
     * The base64 encoded tlv of the {@link CameraRecordingConfiguration}.
     * This value MIGHT be `undefined` if no HomeKit controller has yet selected a configuration.
     */
    selectedConfiguration?: string;
    /**
     * Service `CameraRecordingManagement`; Characteristic `Active`
     */
    recordingActive: boolean;
    /**
     * Service `CameraRecordingManagement`; Characteristic `RecordingAudioActive`
     */
    recordingAudioActive: boolean;
    /**
     * Service `CameraOperatingMode`; Characteristic `EventSnapshotsActive`
     */
    eventSnapshotsActive: boolean;
    /**
     * Service `CameraOperatingMode`; Characteristic `HomeKitCameraActive`
     */
    homeKitCameraActive: boolean;
    /**
     * Service `CameraOperatingMode`; Characteristic `PeriodicSnapshotsActive`
     */
    periodicSnapshotsActive: boolean;
}
/**
 * @group Camera
 */
export declare class RecordingManagement {
    readonly options: CameraRecordingOptions;
    readonly delegate: CameraRecordingDelegate;
    private stateChangeDelegate?;
    private readonly supportedCameraRecordingConfiguration;
    private readonly supportedVideoRecordingConfiguration;
    private readonly supportedAudioRecordingConfiguration;
    /**
     * 32 bit mask of enabled {@link EventTriggerOption}s.
     */
    private readonly eventTriggerOptions;
    readonly recordingManagementService: CameraRecordingManagement;
    readonly operatingModeService: CameraOperatingMode;
    readonly dataStreamManagement: DataStreamManagement;
    /**
     * The currently active recording stream.
     * Any camera only supports one stream at a time.
     */
    private recordingStream?;
    private selectedConfiguration?;
    /**
     * Array of sensor services (e.g. {@link Service.MotionSensor} or {@link Service.OccupancySensor}).
     * Any service in this array owns a {@link Characteristic.StatusActive} characteristic.
     * The value of the {@link Characteristic.HomeKitCameraActive} is mirrored towards the {@link Characteristic.StatusActive} characteristic.
     * The array is initialized my the caller shortly after calling the constructor.
     */
    sensorServices: Service[];
    /**
     * Defines if recording is enabled for this recording management.
     */
    private recordingActive;
    constructor(options: CameraRecordingOptions, delegate: CameraRecordingDelegate, eventTriggerOptions: Set<EventTriggerOption>, services?: RecordingManagementServices);
    private constructService;
    private setupServiceHandlers;
    private handleDataSendOpen;
    private handleSelectedCameraRecordingConfigurationRead;
    private handleSelectedCameraRecordingConfigurationWrite;
    private parseSelectedConfiguration;
    private _supportedCameraRecordingConfiguration;
    private _supportedVideoRecordingConfiguration;
    private _supportedAudioStreamConfiguration;
    private computeConfigurationHash;
    /**
     * @private
     */
    serialize(): RecordingManagementState | undefined;
    /**
     * @private
     */
    deserialize(serialized: RecordingManagementState): void;
    /**
     * @private
     */
    setupStateChangeDelegate(delegate?: StateChangeDelegate): void;
    destroy(): void;
    handleFactoryReset(): void;
}
//# sourceMappingURL=RecordingManagement.d.ts.map