/// <reference types="node" />
import { Service } from "../Service";
import { CameraStreamingDelegate, PrepareStreamCallback, PrepareStreamRequest, PrepareStreamResponse, SnapshotRequest, SnapshotRequestCallback, StreamController, StreamingRequest, StreamRequest, StreamRequestCallback } from "../..";
import { NodeCallback, SessionIdentifier } from "../../types";
/**
 * @group Camera
 * @deprecated
 */
export type PreparedStreamRequestCallback = (response: PreparedStreamResponse) => void;
/**
 * @group Camera
 * @deprecated
 */
export type PreparedStreamResponse = PrepareStreamResponse;
/**
 * @group Camera
 */
export type Camera = LegacyCameraSource;
/**
 * Interface of and old style CameraSource. See {@link Accessory.configureCameraSource} for more Information.
 *
 * @group Camera
 * @deprecated was replaced by {@link CameraStreamingDelegate} utilized by the {@link CameraController}
 */
export interface LegacyCameraSource {
    services: Service[];
    streamControllers: StreamController[];
    handleSnapshotRequest(request: SnapshotRequest, callback: NodeCallback<Buffer>): void;
    prepareStream(request: PrepareStreamRequest, callback: PreparedStreamRequestCallback): void;
    handleStreamRequest(request: StreamRequest): void;
    handleCloseConnection(connectionID: SessionIdentifier): void;
}
/**
 * @group Camera
 */
export declare class LegacyCameraSourceAdapter implements CameraStreamingDelegate {
    private readonly cameraSource;
    constructor(cameraSource: LegacyCameraSource);
    handleSnapshotRequest(request: SnapshotRequest, callback: SnapshotRequestCallback): void;
    prepareStream(request: PrepareStreamRequest, callback: PrepareStreamCallback): void;
    handleStreamRequest(request: StreamingRequest, callback: StreamRequestCallback): void;
    forwardCloseConnection(sessionID: SessionIdentifier): void;
}
//# sourceMappingURL=Camera.d.ts.map