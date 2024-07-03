import "./CharacteristicDefinitions";
import { Access } from "../Characteristic";
export interface GeneratedCharacteristic {
    id: string;
    UUID: string;
    name: string;
    className: string;
    deprecatedClassName?: string;
    since?: string;
    deprecatedNotice?: string;
    format: string;
    units?: string;
    properties: number;
    maxValue?: number;
    minValue?: number;
    stepValue?: number;
    maxLength?: number;
    validValues?: Record<string, string>;
    validBitMasks?: Record<string, string>;
    adminOnlyAccess?: Access[];
    classAdditions?: string[];
}
export interface GeneratedService {
    id: string;
    UUID: string;
    name: string;
    className: string;
    deprecatedClassName?: string;
    since?: string;
    deprecatedNotice?: string;
    requiredCharacteristics: string[];
    optionalCharacteristics?: string[];
}
//# sourceMappingURL=generate-definitions.d.ts.map