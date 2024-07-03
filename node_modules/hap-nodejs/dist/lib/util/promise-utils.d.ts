/// <reference types="node" />
import { EventEmitter } from "events";
/**
 * @group Utils
 */
export declare function PromiseTimeout(timeout: number): Promise<void>;
/**
 * @group Utils
 */
export declare function awaitEventOnce<Obj extends EventEmitter, Event extends string, T>(element: Obj, event: Event, timeout?: number): Promise<T>;
/**
 * @group Utils
 */
export declare function awaitEventOnce<Obj extends EventEmitter, Event extends string>(element: Obj, event: Event, timeout?: number): Promise<void>;
//# sourceMappingURL=promise-utils.d.ts.map