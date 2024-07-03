import type { DataStreamTransportManagement } from "../definitions";
import { DataStreamConnection, DataStreamServerEvent, GlobalEventHandler, GlobalRequestHandler, Protocols, Topics } from "./DataStreamServer";
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare const enum DataStreamStatus {
    SUCCESS = 0,
    GENERIC_ERROR = 1,
    BUSY = 2
}
/**
 * @group HomeKit Data Streams (HDS)
 */
export declare class DataStreamManagement {
    private readonly dataStreamServer;
    private readonly dataStreamTransportManagementService;
    private readonly supportedDataStreamTransportConfiguration;
    private lastSetupDataStreamTransportResponse;
    constructor(service?: DataStreamTransportManagement);
    destroy(): void;
    /**
     * @returns the DataStreamTransportManagement service
     */
    getService(): DataStreamTransportManagement;
    /**
     * Registers a new event handler to handle incoming event messages.
     * The handler is only called for a connection if for the give protocol no ProtocolHandler
     * was registered on the connection level.
     *
     * @param protocol - name of the protocol to register the handler for
     * @param event - name of the event (also referred to as topic. See {@link Topics} for some known ones)
     * @param handler - function to be called for every occurring event
     */
    onEventMessage(protocol: string | Protocols, event: string | Topics, handler: GlobalEventHandler): this;
    /**
     * Removes a registered event handler.
     *
     * @param protocol - name of the protocol to unregister the handler for
     * @param event - name of the event (also referred to as topic. See {@link Topics} for some known ones)
     * @param handler - registered event handler
     */
    removeEventHandler(protocol: string | Protocols, event: string | Topics, handler: GlobalEventHandler): this;
    /**
     * Registers a new request handler to handle incoming request messages.
     * The handler is only called for a connection if for the give protocol no ProtocolHandler
     * was registered on the connection level.
     *
     * @param protocol - name of the protocol to register the handler for
     * @param request - name of the request (also referred to as topic. See {@link Topics} for some known ones)
     * @param handler - function to be called for every occurring request
     */
    onRequestMessage(protocol: string | Protocols, request: string | Topics, handler: GlobalRequestHandler): this;
    /**
     * Removes a registered request handler.
     *
     * @param protocol - name of the protocol to unregister the handler for
     * @param request - name of the request (also referred to as topic. See {@link Topics} for some known ones)
     * @param handler - registered request handler
     */
    removeRequestHandler(protocol: string | Protocols, request: string | Topics, handler: GlobalRequestHandler): this;
    /**
     * Forwards any event listener for an DataStreamServer event to the DataStreamServer instance
     *
     * @param event - the event to register for
     * @param listener - the event handler
     */
    onServerEvent(event: DataStreamServerEvent, listener: (connection: DataStreamConnection) => void): this;
    private handleSetupDataStreamTransportWrite;
    private buildSupportedDataStreamTransportConfigurationTLV;
    private constructService;
    private setupServiceHandlers;
}
//# sourceMappingURL=DataStreamManagement.d.ts.map