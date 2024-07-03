import { Accessory } from "./Accessory";
import { Characteristic } from "./Characteristic";
import { Service } from "./Service";
/**
 * @group Utils
 * @deprecated Legacy Accessory Loader
 */
export declare function parseCharacteristicJSON(json: any): Characteristic;
/**
 * @group Utils
 * @deprecated Legacy Accessory Loader
 */
export declare function parseServiceJSON(json: any): Service;
/**
 * Accepts object-literal JSON structures from previous versions of HAP-NodeJS and parses them into
 * newer-style structures of Accessory/Service/Characteristic objects.
 * @group Utils
 * @deprecated Legacy Accessory Loader
 */
export declare function parseAccessoryJSON(json: any): Accessory;
/**
 * Loads all accessories from the given folder. Handles object-literal-style accessories, "accessory factories",
 * and new-API style modules.
 * @group Utils
 * @deprecated Legacy Accessory Loader
 */
export declare function loadDirectory(dir: string): Accessory[];
//# sourceMappingURL=AccessoryLoader.d.ts.map