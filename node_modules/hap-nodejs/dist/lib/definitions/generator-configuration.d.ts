import { GeneratedCharacteristic, GeneratedService } from "./generate-definitions";
export declare const CharacteristicHidden: Set<string>;
export declare const CharacteristicNameOverrides: Map<string, string>;
export declare const CharacteristicDeprecatedNames: Map<string, string>;
export declare const CharacteristicValidValuesOverride: Map<string, Record<string, string>>;
export declare const CharacteristicClassAdditions: Map<string, string[]>;
export declare const CharacteristicOverriding: Map<string, (generated: GeneratedCharacteristic) => void>;
export declare const CharacteristicManualAdditions: Map<string, GeneratedCharacteristic>;
export declare const ServiceNameOverrides: Map<string, string>;
export declare const ServiceDeprecatedNames: Map<string, string>;
interface CharacteristicConfigurationOverride {
    addedRequired?: string[];
    removedRequired?: string[];
    addedOptional?: string[];
    removedOptional?: string[];
}
export declare const ServiceCharacteristicConfigurationOverrides: Map<string, CharacteristicConfigurationOverride>;
export declare const ServiceManualAdditions: Map<string, GeneratedService>;
export declare const CharacteristicSinceInformation: Map<string, string>;
export declare const ServiceSinceInformation: Map<string, string>;
export {};
//# sourceMappingURL=generator-configuration.d.ts.map