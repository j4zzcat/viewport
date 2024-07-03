"use strict";
var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, e_7, _g, e_8, _h, e_9, _j, e_10, _k, e_11, _l, e_12, _m, e_13, _o, e_14, _p, e_15, _q, e_16, _r, e_17, _s, e_18, _t, e_19, _u, e_20, _v, e_21, _w;
var _x, _y, _z, _0, _1, _2, _3;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-use-before-define */
require("./CharacteristicDefinitions");
var assert_1 = tslib_1.__importDefault(require("assert"));
var commander_1 = require("commander");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var simple_plist_1 = tslib_1.__importDefault(require("simple-plist"));
var Characteristic_1 = require("../Characteristic");
var uuid_1 = require("../util/uuid");
var generator_configuration_1 = require("./generator-configuration");
// noinspection JSUnusedLocalSymbols
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var temp = Characteristic_1.Characteristic; // this to have "../Characteristic" not being only type import, otherwise this would not result in a require statement
var command = new commander_1.Command("generate-definitions")
    .version("1.0.0")
    .option("-f, --force")
    .option("-m, --metadata <path>", "Define a custom location for the plain-metadata.config file", "/System/Library/PrivateFrameworks/HomeKitDaemon.framework/Resources/plain-metadata.config")
    .requiredOption("-s, --simulator <path>", "Define the path to the accessory simulator.");
command.parse(process.argv);
var options = command.opts();
var metadataFile = options.metadata;
var simulator = options.simulator;
if (!fs_1.default.existsSync(metadataFile)) {
    console.warn("The metadata file at '".concat(metadataFile, "' does not exist!"));
    process.exit(1);
}
if (!fs_1.default.existsSync(simulator)) {
    console.warn("The simulator app directory '".concat(simulator, "' does not exist!"));
    process.exit(1);
}
var defaultPlist = path_1.default.resolve(simulator, "Contents/Frameworks/HAPAccessoryKit.framework/Resources/default.metadata.plist");
var defaultMfiPlist = path_1.default.resolve(simulator, "Contents/Frameworks/HAPAccessoryKit.framework/Resources/default_mfi.metadata.plist");
var plistData = simple_plist_1.default.readFileSync(metadataFile);
var simulatorPlistData = simple_plist_1.default.readFileSync(defaultPlist);
var simulatorMfiPlistData = fs_1.default.existsSync(defaultMfiPlist) ? simple_plist_1.default.readFileSync(defaultMfiPlist) : undefined;
if (plistData.SchemaVersion !== 1) {
    console.warn("Detected unsupported schema version ".concat(plistData.SchemaVersion, "!"));
}
if (plistData.PlistDictionary.SchemaVersion !== 1) {
    console.warn("Detect unsupported PlistDictionary schema version ".concat(plistData.PlistDictionary.SchemaVersion, "!"));
}
console.log("Parsing version ".concat(plistData.Version, "..."));
var shouldParseCharacteristics = checkWrittenVersion("./CharacteristicDefinitions.ts", plistData.Version);
var shouldParseServices = checkWrittenVersion("./ServiceDefinitions.ts", plistData.Version);
if (!options.force && (!shouldParseCharacteristics || !shouldParseServices)) {
    console.log("Parsed schema version " + plistData.Version + " is older than what's already generated. " +
        "User --force option to generate and overwrite nonetheless!");
    process.exit(1);
}
var undefinedUnits = ["micrograms/m^3", "ppm"];
var characteristics;
var simulatorCharacteristics = new Map();
var services;
var units;
var categories;
var properties = new Map();
try {
    characteristics = checkDefined(plistData.PlistDictionary.HAP.Characteristics);
    services = checkDefined(plistData.PlistDictionary.HAP.Services);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    units = checkDefined(plistData.PlistDictionary.HAP.Units);
    categories = checkDefined(plistData.PlistDictionary.HomeKit.Categories);
    var props = checkDefined(plistData.PlistDictionary.HAP.Properties);
    try {
        // noinspection JSUnusedLocalSymbols
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (var _4 = tslib_1.__values(Object.entries(props).sort(function (_a, _b) {
            var _c = tslib_1.__read(_a, 2), a = _c[0], aDef = _c[1];
            var _d = tslib_1.__read(_b, 2), b = _d[0], bDef = _d[1];
            return aDef.Position - bDef.Position;
        })), _5 = _4.next(); !_5.done; _5 = _4.next()) {
            var _6 = tslib_1.__read(_5.value, 2), id = _6[0], definition = _6[1];
            var perm = characteristicPerm(id);
            if (perm) {
                var num = 1 << definition.Position;
                properties.set(num, perm);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_5 && !_5.done && (_a = _4.return)) _a.call(_4);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var _7 = tslib_1.__values(simulatorPlistData.Characteristics), _8 = _7.next(); !_8.done; _8 = _7.next()) {
            var characteristic = _8.value;
            simulatorCharacteristics.set(characteristic.UUID, characteristic);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_8 && !_8.done && (_b = _7.return)) _b.call(_7);
        }
        finally { if (e_2) throw e_2.error; }
    }
    if (simulatorMfiPlistData) {
        try {
            for (var _9 = tslib_1.__values(simulatorMfiPlistData.Characteristics), _10 = _9.next(); !_10.done; _10 = _9.next()) {
                var characteristic = _10.value;
                simulatorCharacteristics.set(characteristic.UUID, characteristic);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_10 && !_10.done && (_c = _9.return)) _c.call(_9);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
}
catch (error) {
    console.log("Unexpected structure of the plist file!");
    throw error;
}
try {
    // first step is to check if we are up to date on categories
    for (var _11 = tslib_1.__values(Object.values(categories)), _12 = _11.next(); !_12.done; _12 = _11.next()) {
        var definition = _12.value;
        if (definition.Identifier > 36) {
            console.log("Detected a new category '".concat(definition.DefaultDescription, "' with id ").concat(definition.Identifier));
        }
    }
}
catch (e_4_1) { e_4 = { error: e_4_1 }; }
finally {
    try {
        if (_12 && !_12.done && (_d = _11.return)) _d.call(_11);
    }
    finally { if (e_4) throw e_4.error; }
}
var characteristicOutput = fs_1.default.createWriteStream(path_1.default.join(__dirname, "CharacteristicDefinitions.ts"));
characteristicOutput.write("// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY\n");
characteristicOutput.write("// V=".concat(plistData.Version, "\n"));
characteristicOutput.write("\n");
characteristicOutput.write("import { Access, Characteristic, Formats, Perms, Units } from \"../Characteristic\";\n\n");
/**
 * Characteristics
 */
var generatedCharacteristics = {}; // indexed by id
var writtenCharacteristicEntries = {}; // indexed by class name
try {
    for (var _13 = tslib_1.__values(Object.entries(characteristics)), _14 = _13.next(); !_14.done; _14 = _13.next()) {
        var _15 = tslib_1.__read(_14.value, 2), id = _15[0], definition = _15[1];
        try {
            if (generator_configuration_1.CharacteristicHidden.has(id)) {
                continue;
            }
            // "Carbon dioxide Detected" -> "Carbon Dioxide Detected"
            var name = ((_x = generator_configuration_1.CharacteristicNameOverrides.get(id)) !== null && _x !== void 0 ? _x : definition.DefaultDescription).split(" ").map(function (entry) { return entry[0].toUpperCase() + entry.slice(1); }).join(" ");
            var deprecatedName = generator_configuration_1.CharacteristicDeprecatedNames.get(id);
            // "Target Door State" -> "TargetDoorState", "PM2.5" -> "PM2_5"
            var className = name.replace(/[\s-]/g, "").replace(/[.]/g, "_");
            var deprecatedClassName = deprecatedName === null || deprecatedName === void 0 ? void 0 : deprecatedName.replace(/[\s-]/g, "").replace(/[.]/g, "_");
            var longUUID = (0, uuid_1.toLongForm)(definition.ShortUUID);
            var simulatorCharacteristic = simulatorCharacteristics.get(longUUID);
            var validValues = ((_y = simulatorCharacteristic === null || simulatorCharacteristic === void 0 ? void 0 : simulatorCharacteristic.Constraints) === null || _y === void 0 ? void 0 : _y.ValidValues) || {};
            var validValuesOverride = generator_configuration_1.CharacteristicValidValuesOverride.get(id);
            if (validValuesOverride) {
                try {
                    for (var _16 = (e_6 = void 0, tslib_1.__values(Object.entries(validValuesOverride))), _17 = _16.next(); !_17.done; _17 = _16.next()) {
                        var _18 = tslib_1.__read(_17.value, 2), key = _18[0], value = _18[1];
                        validValues[key] = value;
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_17 && !_17.done && (_f = _16.return)) _f.call(_16);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            try {
                for (var _19 = (e_7 = void 0, tslib_1.__values(Object.entries(validValues))), _20 = _19.next(); !_20.done; _20 = _19.next()) {
                    var _21 = tslib_1.__read(_20.value, 2), value = _21[0], name_1 = _21[1];
                    var constName = name_1.toUpperCase().replace(/[^\w]+/g, "_");
                    if (/^[1-9]/.test(constName)) {
                        constName = "_" + constName; // variables can't start with a number
                    }
                    validValues[value] = constName;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_20 && !_20.done && (_g = _19.return)) _g.call(_19);
                }
                finally { if (e_7) throw e_7.error; }
            }
            var validBits = (_z = simulatorCharacteristic === null || simulatorCharacteristic === void 0 ? void 0 : simulatorCharacteristic.Constraints) === null || _z === void 0 ? void 0 : _z.ValidBits;
            var validBitMasks = undefined;
            if (validBits) {
                validBitMasks = {};
                try {
                    for (var _22 = (e_8 = void 0, tslib_1.__values(Object.entries(validBits))), _23 = _22.next(); !_23.done; _23 = _22.next()) {
                        var _24 = tslib_1.__read(_23.value, 2), value = _24[0], name_2 = _24[1];
                        var constName = name_2.toUpperCase().replace(/[^\w]+/g, "_");
                        if (/^[1-9]/.test(constName)) {
                            constName = "_" + constName; // variables can't start with a number
                        }
                        validBitMasks["" + (1 << parseInt(value, 10))] = constName + "_BIT_MASK";
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_23 && !_23.done && (_h = _22.return)) _h.call(_22);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
            var generatedCharacteristic = {
                id: id,
                UUID: longUUID,
                name: name,
                className: className,
                deprecatedClassName: deprecatedClassName,
                since: generator_configuration_1.CharacteristicSinceInformation.get(id),
                format: definition.Format,
                units: definition.Units,
                properties: definition.Properties,
                minValue: definition.MinValue,
                maxValue: definition.MaxValue,
                stepValue: definition.StepValue,
                maxLength: definition.MaxLength,
                validValues: validValues,
                validBitMasks: validBitMasks,
                classAdditions: generator_configuration_1.CharacteristicClassAdditions.get(id),
            };
            // call any handler which wants to manually override properties of the generated characteristic
            (_0 = generator_configuration_1.CharacteristicOverriding.get(id)) === null || _0 === void 0 ? void 0 : _0(generatedCharacteristic);
            generatedCharacteristics[id] = generatedCharacteristic;
            writtenCharacteristicEntries[className] = generatedCharacteristic;
            if (deprecatedClassName) {
                writtenCharacteristicEntries[deprecatedClassName] = generatedCharacteristic;
            }
        }
        catch (error) {
            throw new Error("Error thrown generating characteristic '" + id + "' (" + definition.DefaultDescription + "): " + error.message);
        }
    }
}
catch (e_5_1) { e_5 = { error: e_5_1 }; }
finally {
    try {
        if (_14 && !_14.done && (_e = _13.return)) _e.call(_13);
    }
    finally { if (e_5) throw e_5.error; }
}
try {
    for (var CharacteristicManualAdditions_1 = tslib_1.__values(generator_configuration_1.CharacteristicManualAdditions), CharacteristicManualAdditions_1_1 = CharacteristicManualAdditions_1.next(); !CharacteristicManualAdditions_1_1.done; CharacteristicManualAdditions_1_1 = CharacteristicManualAdditions_1.next()) {
        var _25 = tslib_1.__read(CharacteristicManualAdditions_1_1.value, 2), id = _25[0], generated = _25[1];
        generatedCharacteristics[id] = generated;
        writtenCharacteristicEntries[generated.className] = generated;
        if (generated.deprecatedClassName) {
            writtenCharacteristicEntries[generated.deprecatedClassName] = generated;
        }
    }
}
catch (e_9_1) { e_9 = { error: e_9_1 }; }
finally {
    try {
        if (CharacteristicManualAdditions_1_1 && !CharacteristicManualAdditions_1_1.done && (_j = CharacteristicManualAdditions_1.return)) _j.call(CharacteristicManualAdditions_1);
    }
    finally { if (e_9) throw e_9.error; }
}
try {
    for (var _26 = tslib_1.__values(Object.values(generatedCharacteristics)
        .sort(function (a, b) { return a.className.localeCompare(b.className); })), _27 = _26.next(); !_27.done; _27 = _26.next()) {
        var generated = _27.value;
        try {
            characteristicOutput.write("/**\n");
            characteristicOutput.write(" * Characteristic \"" + generated.name + "\"\n");
            if (generated.since) {
                characteristicOutput.write(" * @since iOS " + generated.since + "\n");
            }
            if (generated.deprecatedNotice) {
                characteristicOutput.write(" * @deprecated " + generated.deprecatedNotice + "\n");
            }
            characteristicOutput.write(" */\n");
            characteristicOutput.write("export class " + generated.className + " extends Characteristic {\n\n");
            characteristicOutput.write("  public static readonly UUID: string = \"" + generated.UUID + "\";\n\n");
            var classAdditions = generated.classAdditions;
            if (classAdditions) {
                characteristicOutput.write(classAdditions.map(function (line) { return "  " + line + "\n"; }).join("") + "\n");
            }
            var validValuesEntries = Object.entries((_1 = generated.validValues) !== null && _1 !== void 0 ? _1 : {});
            if (validValuesEntries.length) {
                try {
                    for (var validValuesEntries_1 = (e_11 = void 0, tslib_1.__values(validValuesEntries)), validValuesEntries_1_1 = validValuesEntries_1.next(); !validValuesEntries_1_1.done; validValuesEntries_1_1 = validValuesEntries_1.next()) {
                        var _28 = tslib_1.__read(validValuesEntries_1_1.value, 2), value = _28[0], name = _28[1];
                        if (!name) {
                            continue;
                        }
                        characteristicOutput.write("  public static readonly ".concat(name, " = ").concat(value, ";\n"));
                    }
                }
                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                finally {
                    try {
                        if (validValuesEntries_1_1 && !validValuesEntries_1_1.done && (_l = validValuesEntries_1.return)) _l.call(validValuesEntries_1);
                    }
                    finally { if (e_11) throw e_11.error; }
                }
                characteristicOutput.write("\n");
            }
            if (generated.validBitMasks) {
                try {
                    for (var _29 = (e_12 = void 0, tslib_1.__values(Object.entries(generated.validBitMasks))), _30 = _29.next(); !_30.done; _30 = _29.next()) {
                        var _31 = tslib_1.__read(_30.value, 2), value = _31[0], name = _31[1];
                        characteristicOutput.write("  public static readonly ".concat(name, " = ").concat(value, ";\n"));
                    }
                }
                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                finally {
                    try {
                        if (_30 && !_30.done && (_m = _29.return)) _m.call(_29);
                    }
                    finally { if (e_12) throw e_12.error; }
                }
                characteristicOutput.write("\n");
            }
            characteristicOutput.write("  constructor() {\n");
            characteristicOutput.write("    super(\"" + generated.name + "\", " + generated.className + ".UUID, {\n");
            characteristicOutput.write("      format: Formats." + characteristicFormat(generated.format) + ",\n");
            characteristicOutput.write("      perms: [" + generatePermsString(generated.id, generated.properties) + "],\n");
            if (generated.units && !undefinedUnits.includes(generated.units)) {
                characteristicOutput.write("      unit: Units." + characteristicUnit(generated.units) + ",\n");
            }
            if (generated.minValue != null) {
                characteristicOutput.write("      minValue: " + generated.minValue + ",\n");
            }
            if (generated.maxValue != null) {
                characteristicOutput.write("      maxValue: " + generated.maxValue + ",\n");
            }
            if (generated.stepValue != null) {
                characteristicOutput.write("      minStep: " + generated.stepValue + ",\n");
            }
            if (generated.maxLength != null) {
                characteristicOutput.write("      maxLen: " + generated.maxLength + ",\n");
            }
            if (validValuesEntries.length) {
                characteristicOutput.write("      validValues: [" + Object.keys(generated.validValues).join(", ") + "],\n");
            }
            if (generated.adminOnlyAccess) {
                characteristicOutput.write("      adminOnlyAccess: ["
                    + generated.adminOnlyAccess.map(function (value) { return "Access." + characteristicAccess(value); }).join(", ") + "],\n");
            }
            characteristicOutput.write("    });\n");
            characteristicOutput.write("    this.value = this.getDefaultValue();\n");
            characteristicOutput.write("  }\n");
            characteristicOutput.write("}\n");
            if (generated.deprecatedClassName) {
                characteristicOutput.write("// noinspection JSDeprecatedSymbols\n");
                characteristicOutput.write("Characteristic." + generated.deprecatedClassName + " = " + generated.className + ";\n");
            }
            if (generated.deprecatedNotice) {
                characteristicOutput.write("// noinspection JSDeprecatedSymbols\n");
            }
            characteristicOutput.write("Characteristic." + generated.className + " = " + generated.className + ";\n\n");
        }
        catch (error) {
            throw new Error("Error thrown writing characteristic '" + generated.id + "' (" + generated.className + "): " + error.message);
        }
    }
}
catch (e_10_1) { e_10 = { error: e_10_1 }; }
finally {
    try {
        if (_27 && !_27.done && (_k = _26.return)) _k.call(_26);
    }
    finally { if (e_10) throw e_10.error; }
}
characteristicOutput.end();
var characteristicProperties = Object.entries(writtenCharacteristicEntries).sort(function (_a, _b) {
    var _c = tslib_1.__read(_a, 1), a = _c[0];
    var _d = tslib_1.__read(_b, 1), b = _d[0];
    return a.localeCompare(b);
});
rewriteProperties("Characteristic", characteristicProperties);
writeCharacteristicTestFile();
/**
 * Services
 */
var serviceOutput = fs_1.default.createWriteStream(path_1.default.join(__dirname, "ServiceDefinitions.ts"));
serviceOutput.write("// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY\n");
serviceOutput.write("// V=".concat(plistData.Version, "\n"));
serviceOutput.write("\n");
serviceOutput.write("import { Characteristic } from \"../Characteristic\";\n");
serviceOutput.write("import { Service } from \"../Service\";\n\n");
var generatedServices = {}; // indexed by id
var writtenServiceEntries = {}; // indexed by class name
try {
    for (var _32 = tslib_1.__values(Object.entries(services)), _33 = _32.next(); !_33.done; _33 = _32.next()) {
        var _34 = tslib_1.__read(_33.value, 2), id = _34[0], definition = _34[1];
        try {
            // "Carbon dioxide Sensor" -> "Carbon Dioxide Sensor"
            var name = ((_2 = generator_configuration_1.ServiceNameOverrides.get(id)) !== null && _2 !== void 0 ? _2 : definition.DefaultDescription).split(" ").map(function (entry) { return entry[0].toUpperCase() + entry.slice(1); }).join(" ");
            var deprecatedName = generator_configuration_1.ServiceDeprecatedNames.get(id);
            var className = name.replace(/[\s-]/g, "").replace(/[.]/g, "_");
            var deprecatedClassName = deprecatedName === null || deprecatedName === void 0 ? void 0 : deprecatedName.replace(/[\s-]/g, "").replace(/[.]/g, "_");
            var longUUID = (0, uuid_1.toLongForm)(definition.ShortUUID);
            var requiredCharacteristics = definition.Characteristics.Required;
            var optionalCharacteristics = definition.Characteristics.Optional;
            var configurationOverride = generator_configuration_1.ServiceCharacteristicConfigurationOverrides.get(id);
            if (configurationOverride) {
                if (configurationOverride.removedRequired) {
                    try {
                        for (var _35 = (e_14 = void 0, tslib_1.__values(configurationOverride.removedRequired)), _36 = _35.next(); !_36.done; _36 = _35.next()) {
                            var entry = _36.value;
                            var index = requiredCharacteristics.indexOf(entry);
                            if (index !== -1) {
                                requiredCharacteristics.splice(index, 1);
                            }
                        }
                    }
                    catch (e_14_1) { e_14 = { error: e_14_1 }; }
                    finally {
                        try {
                            if (_36 && !_36.done && (_p = _35.return)) _p.call(_35);
                        }
                        finally { if (e_14) throw e_14.error; }
                    }
                }
                if (configurationOverride.removedOptional) {
                    try {
                        for (var _37 = (e_15 = void 0, tslib_1.__values(configurationOverride.removedOptional)), _38 = _37.next(); !_38.done; _38 = _37.next()) {
                            var entry = _38.value;
                            var index = optionalCharacteristics.indexOf(entry);
                            if (index !== -1) {
                                optionalCharacteristics.splice(index, 1);
                            }
                        }
                    }
                    catch (e_15_1) { e_15 = { error: e_15_1 }; }
                    finally {
                        try {
                            if (_38 && !_38.done && (_q = _37.return)) _q.call(_37);
                        }
                        finally { if (e_15) throw e_15.error; }
                    }
                }
                if (configurationOverride.addedRequired) {
                    try {
                        for (var _39 = (e_16 = void 0, tslib_1.__values(configurationOverride.addedRequired)), _40 = _39.next(); !_40.done; _40 = _39.next()) {
                            var entry = _40.value;
                            if (!requiredCharacteristics.includes(entry)) {
                                requiredCharacteristics.push(entry);
                            }
                        }
                    }
                    catch (e_16_1) { e_16 = { error: e_16_1 }; }
                    finally {
                        try {
                            if (_40 && !_40.done && (_r = _39.return)) _r.call(_39);
                        }
                        finally { if (e_16) throw e_16.error; }
                    }
                }
                if (configurationOverride.addedOptional) {
                    try {
                        for (var _41 = (e_17 = void 0, tslib_1.__values(configurationOverride.addedOptional)), _42 = _41.next(); !_42.done; _42 = _41.next()) {
                            var entry = _42.value;
                            if (!optionalCharacteristics.includes(entry)) {
                                optionalCharacteristics.push(entry);
                            }
                        }
                    }
                    catch (e_17_1) { e_17 = { error: e_17_1 }; }
                    finally {
                        try {
                            if (_42 && !_42.done && (_s = _41.return)) _s.call(_41);
                        }
                        finally { if (e_17) throw e_17.error; }
                    }
                }
            }
            var generatedService = {
                id: id,
                UUID: longUUID,
                name: name,
                className: className,
                deprecatedClassName: deprecatedClassName,
                since: generator_configuration_1.ServiceSinceInformation.get(id),
                requiredCharacteristics: requiredCharacteristics,
                optionalCharacteristics: optionalCharacteristics,
            };
            generatedServices[id] = generatedService;
            writtenServiceEntries[className] = generatedService;
            if (deprecatedClassName) {
                writtenServiceEntries[deprecatedClassName] = generatedService;
            }
        }
        catch (error) {
            throw new Error("Error thrown generating service '" + id + "' (" + definition.DefaultDescription + "): " + error.message);
        }
    }
}
catch (e_13_1) { e_13 = { error: e_13_1 }; }
finally {
    try {
        if (_33 && !_33.done && (_o = _32.return)) _o.call(_32);
    }
    finally { if (e_13) throw e_13.error; }
}
try {
    for (var ServiceManualAdditions_1 = tslib_1.__values(generator_configuration_1.ServiceManualAdditions), ServiceManualAdditions_1_1 = ServiceManualAdditions_1.next(); !ServiceManualAdditions_1_1.done; ServiceManualAdditions_1_1 = ServiceManualAdditions_1.next()) {
        var _43 = tslib_1.__read(ServiceManualAdditions_1_1.value, 2), id = _43[0], generated = _43[1];
        generatedServices[id] = generated;
        writtenServiceEntries[generated.className] = generated;
        if (generated.deprecatedClassName) {
            writtenServiceEntries[generated.deprecatedClassName] = generated;
        }
    }
}
catch (e_18_1) { e_18 = { error: e_18_1 }; }
finally {
    try {
        if (ServiceManualAdditions_1_1 && !ServiceManualAdditions_1_1.done && (_t = ServiceManualAdditions_1.return)) _t.call(ServiceManualAdditions_1);
    }
    finally { if (e_18) throw e_18.error; }
}
try {
    for (var _44 = tslib_1.__values(Object.values(generatedServices)
        .sort(function (a, b) { return a.className.localeCompare(b.className); })), _45 = _44.next(); !_45.done; _45 = _44.next()) {
        var generated = _45.value;
        try {
            serviceOutput.write("/**\n");
            serviceOutput.write(" * Service \"" + generated.name + "\"\n");
            if (generated.since) {
                serviceOutput.write(" * @since iOS " + generated.since + "\n");
            }
            if (generated.deprecatedNotice) {
                serviceOutput.write(" * @deprecated " + generated.deprecatedNotice + "\n");
            }
            serviceOutput.write(" */\n");
            serviceOutput.write("export class " + generated.className + " extends Service {\n\n");
            serviceOutput.write("  public static readonly UUID: string = \"" + generated.UUID + "\";\n\n");
            serviceOutput.write("  constructor(displayName?: string, subtype?: string) {\n");
            serviceOutput.write("    super(displayName, " + generated.className + ".UUID, subtype);\n\n");
            serviceOutput.write("    // Required Characteristics\n");
            try {
                for (var _46 = (e_20 = void 0, tslib_1.__values(generated.requiredCharacteristics)), _47 = _46.next(); !_47.done; _47 = _46.next()) {
                    var required = _47.value;
                    var characteristic = generatedCharacteristics[required];
                    if (!characteristic) {
                        console.warn("Could not find required characteristic " + required + " for " + generated.className);
                        continue;
                    }
                    if (required === "name") {
                        serviceOutput.write("    if (!this.testCharacteristic(Characteristic.Name)) { // workaround for Name characteristic collision in constructor\n");
                        serviceOutput.write("      this.addCharacteristic(Characteristic.Name).updateValue(\"Unnamed Service\");\n");
                        serviceOutput.write("    }\n");
                    }
                    else {
                        serviceOutput.write("    this.addCharacteristic(Characteristic." + characteristic.className + ");\n");
                    }
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (_47 && !_47.done && (_v = _46.return)) _v.call(_46);
                }
                finally { if (e_20) throw e_20.error; }
            }
            if ((_3 = generated.optionalCharacteristics) === null || _3 === void 0 ? void 0 : _3.length) {
                serviceOutput.write("\n    // Optional Characteristics\n");
                try {
                    for (var _48 = (e_21 = void 0, tslib_1.__values(generated.optionalCharacteristics)), _49 = _48.next(); !_49.done; _49 = _48.next()) {
                        var optional = _49.value;
                        var characteristic = generatedCharacteristics[optional];
                        if (!characteristic) {
                            console.warn("Could not find optional characteristic " + optional + " for " + generated.className);
                            continue;
                        }
                        serviceOutput.write("    this.addOptionalCharacteristic(Characteristic." + characteristic.className + ");\n");
                    }
                }
                catch (e_21_1) { e_21 = { error: e_21_1 }; }
                finally {
                    try {
                        if (_49 && !_49.done && (_w = _48.return)) _w.call(_48);
                    }
                    finally { if (e_21) throw e_21.error; }
                }
            }
            serviceOutput.write("  }\n}\n");
            if (generated.deprecatedClassName) {
                serviceOutput.write("// noinspection JSDeprecatedSymbols\n");
                serviceOutput.write("Service." + generated.deprecatedClassName + " = " + generated.className + ";\n");
            }
            if (generated.deprecatedNotice) {
                serviceOutput.write("// noinspection JSDeprecatedSymbols\n");
            }
            serviceOutput.write("Service." + generated.className + " = " + generated.className + ";\n\n");
        }
        catch (error) {
            throw new Error("Error thrown writing service '" + generated.id + "' (" + generated.className + "): " + error.message);
        }
    }
}
catch (e_19_1) { e_19 = { error: e_19_1 }; }
finally {
    try {
        if (_45 && !_45.done && (_u = _44.return)) _u.call(_44);
    }
    finally { if (e_19) throw e_19.error; }
}
serviceOutput.end();
var serviceProperties = Object.entries(writtenServiceEntries).sort(function (_a, _b) {
    var _c = tslib_1.__read(_a, 1), a = _c[0];
    var _d = tslib_1.__read(_b, 1), b = _d[0];
    return a.localeCompare(b);
});
rewriteProperties("Service", serviceProperties);
writeServicesTestFile();
// ------------------------ utils ------------------------
function checkDefined(input) {
    if (!input) {
        throw new Error("value is undefined!");
    }
    return input;
}
function characteristicFormat(format) {
    var e_22, _a;
    try {
        // @ts-expect-error: forceConsistentCasingInFileNames compiler option
        for (var _b = tslib_1.__values(Object.entries(Characteristic_1.Formats)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = tslib_1.__read(_c.value, 2), key = _d[0], value = _d[1];
            if (value === format) {
                return key;
            }
        }
    }
    catch (e_22_1) { e_22 = { error: e_22_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_22) throw e_22.error; }
    }
    throw new Error("Unknown characteristic format '" + format + "'");
}
function characteristicUnit(unit) {
    var e_23, _a;
    try {
        // @ts-expect-error: forceConsistentCasingInFileNames compiler option
        for (var _b = tslib_1.__values(Object.entries(Characteristic_1.Units)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = tslib_1.__read(_c.value, 2), key = _d[0], value = _d[1];
            if (value === unit) {
                return key;
            }
        }
    }
    catch (e_23_1) { e_23 = { error: e_23_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_23) throw e_23.error; }
    }
    throw new Error("Unknown characteristic format '" + unit + "'");
}
function characteristicAccess(access) {
    var e_24, _a;
    try {
        // @ts-expect-error: forceConsistentCasingInFileNames compiler option
        for (var _b = tslib_1.__values(Object.entries(Characteristic_1.Access)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = tslib_1.__read(_c.value, 2), key = _d[0], value = _d[1];
            if (value === access) {
                return key;
            }
        }
    }
    catch (e_24_1) { e_24 = { error: e_24_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_24) throw e_24.error; }
    }
    throw new Error("Unknown access for '" + access + "'");
}
function characteristicPerm(id) {
    switch (id) {
        case "aa":
            return "ADDITIONAL_AUTHORIZATION";
        case "hidden":
            return "HIDDEN";
        case "notify":
            return "NOTIFY";
        case "read":
            return "PAIRED_READ";
        case "timedWrite":
            return "TIMED_WRITE";
        case "write":
            return "PAIRED_WRITE";
        case "writeResponse":
            return "WRITE_RESPONSE";
        case "broadcast": // used for bluetooth
            return undefined;
        case "adminOnly":
            return undefined; // TODO add support for it (currently unused though)
        default:
            throw new Error("Received unknown perms id: " + id);
    }
}
function generatePermsString(id, propertiesBitMap) {
    var e_25, _a;
    var perms = [];
    try {
        for (var properties_1 = tslib_1.__values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
            var _b = tslib_1.__read(properties_1_1.value, 2), bitMap = _b[0], name = _b[1];
            if (name === "ADDITIONAL_AUTHORIZATION") {
                // aa set by homed just signals that aa may be supported. Setting up aa will always require a custom made app though
                continue;
            }
            if ((propertiesBitMap | bitMap) === propertiesBitMap) { // if it stays the same the bit is set
                perms.push("Perms." + name);
            }
        }
    }
    catch (e_25_1) { e_25 = { error: e_25_1 }; }
    finally {
        try {
            if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
        }
        finally { if (e_25) throw e_25.error; }
    }
    var result = perms.join(", ");
    (0, assert_1.default)(!!result, "perms string cannot be empty (" + propertiesBitMap + ")");
    return result;
}
function checkWrittenVersion(filePath, parsingVersion) {
    filePath = path_1.default.resolve(__dirname, filePath);
    var content = fs_1.default.readFileSync(filePath, { encoding: "utf8" }).split("\n", 3);
    var v = content[1];
    if (!v.startsWith("// V=")) {
        throw new Error("Could not detect definition version for '" + filePath + "'");
    }
    var version = parseInt(v.replace("// V=", ""), 10);
    return parsingVersion >= version;
}
function rewriteProperties(className, properties) {
    var filePath = path_1.default.resolve(__dirname, "../" + className + ".ts");
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error("File '" + filePath + "' does not exist!");
    }
    var file = fs_1.default.readFileSync(filePath, { encoding: "utf8" });
    var lines = file.split("\n");
    var i = 0;
    var importStart = -1;
    var importEnd = -1;
    var foundImport = false;
    for (; i < lines.length; i++) {
        var line = lines[i];
        if (line === "import type {") {
            importStart = i; // save last import start;
        }
        else if (line === "} from \"./definitions\";") {
            importEnd = i;
            foundImport = true;
            break;
        }
    }
    if (!foundImport) {
        throw new Error("Could not find import section!");
    }
    var startIndex = -1;
    var stopIndex = -1;
    for (; i < lines.length; i++) {
        if (lines[i] === "  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-") {
            startIndex = i;
            break;
        }
    }
    if (startIndex === -1) {
        throw new Error("Could not find start pattern in file!");
    }
    for (; i < lines.length; i++) {
        if (lines[i] === "  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=") {
            stopIndex = i;
            break;
        }
    }
    if (stopIndex === -1) {
        throw new Error("Could not find stop pattern in file!");
    }
    var importSize = importEnd - importStart - 1;
    var newImports = properties
        .filter(function (_a) {
        var _b = tslib_1.__read(_a, 2), key = _b[0], value = _b[1];
        return key === value.className;
    })
        .map(function (_a) {
        var _b = tslib_1.__read(_a, 1), key = _b[0];
        return "  " + key + ",";
    });
    lines.splice.apply(lines, tslib_1.__spreadArray([importStart + 1, importSize], tslib_1.__read(newImports), false)); // remove current imports
    var importDelta = newImports.length - importSize;
    startIndex += importDelta;
    stopIndex += importDelta;
    var amount = stopIndex - startIndex - 1;
    var newContentLines = properties.map(function (_a) {
        var _b = tslib_1.__read(_a, 2), key = _b[0], value = _b[1];
        var line = "";
        var deprecatedNotice = value.deprecatedNotice;
        if (key !== value.className) {
            deprecatedNotice = "Please use {@link " + className + "." + value.className + "}." // prepend deprecated notice
                + (deprecatedNotice ? " " + deprecatedNotice : "");
        }
        line += "  /**\n";
        line += "   * @group " + className + " Definitions\n";
        if (deprecatedNotice) {
            line += "   * @deprecated " + deprecatedNotice + "\n";
        }
        line += "   */\n";
        line += "  public static " + key + ": typeof " + value.className + ";";
        return line;
    });
    lines.splice.apply(lines, tslib_1.__spreadArray([startIndex + 1, amount], tslib_1.__read(newContentLines), false)); // insert new lines
    var resultContent = lines.join("\n");
    fs_1.default.writeFileSync(filePath, resultContent, { encoding: "utf8" });
}
function writeCharacteristicTestFile() {
    var e_26, _a;
    var characteristics = Object.values(generatedCharacteristics).sort(function (a, b) { return a.className.localeCompare(b.className); });
    var testOutput = fs_1.default.createWriteStream(path_1.default.resolve(__dirname, "./CharacteristicDefinitions.spec.ts"), { encoding: "utf8" });
    testOutput.write("// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY\n");
    testOutput.write("import \"./\";\n\n");
    testOutput.write("import { Characteristic } from \"../Characteristic\";\n\n");
    testOutput.write("describe(\"CharacteristicDefinitions\", () => {");
    try {
        for (var characteristics_1 = tslib_1.__values(characteristics), characteristics_1_1 = characteristics_1.next(); !characteristics_1_1.done; characteristics_1_1 = characteristics_1.next()) {
            var generated = characteristics_1_1.value;
            testOutput.write("\n");
            testOutput.write("  describe(\"" + generated.className + "\", () => {\n");
            // first test is just calling the constructor
            testOutput.write("    it(\"should be able to construct\", () => {\n");
            testOutput.write("      new Characteristic." + generated.className + "();\n");
            if (generated.deprecatedClassName) {
                testOutput.write("      // noinspection JSDeprecatedSymbols\n");
                testOutput.write("      new Characteristic." + generated.deprecatedClassName + "();\n");
            }
            testOutput.write("    });\n");
            testOutput.write("  });\n");
        }
    }
    catch (e_26_1) { e_26 = { error: e_26_1 }; }
    finally {
        try {
            if (characteristics_1_1 && !characteristics_1_1.done && (_a = characteristics_1.return)) _a.call(characteristics_1);
        }
        finally { if (e_26) throw e_26.error; }
    }
    testOutput.write("});\n");
    testOutput.end();
}
function writeServicesTestFile() {
    var e_27, _a;
    var services = Object.values(generatedServices).sort(function (a, b) { return a.className.localeCompare(b.className); });
    var testOutput = fs_1.default.createWriteStream(path_1.default.resolve(__dirname, "./ServiceDefinitions.spec.ts"), { encoding: "utf8" });
    testOutput.write("// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY\n");
    testOutput.write("import \"./\";\n\n");
    testOutput.write("import { Characteristic } from \"../Characteristic\";\n");
    testOutput.write("import { Service } from \"../Service\";\n\n");
    testOutput.write("describe(\"ServiceDefinitions\", () => {");
    try {
        for (var services_1 = tslib_1.__values(services), services_1_1 = services_1.next(); !services_1_1.done; services_1_1 = services_1.next()) {
            var generated = services_1_1.value;
            testOutput.write("\n");
            testOutput.write("  describe(\"" + generated.className + "\", () => {\n");
            // first test is just calling the constructor
            testOutput.write("    it(\"should be able to construct\", () => {\n");
            testOutput.write("      const service0 = new Service." + generated.className + "();\n");
            testOutput.write("      const service1 = new Service." + generated.className + "(\"test name\");\n");
            testOutput.write("      const service2 = new Service." + generated.className + "(\"test name\", \"test sub type\");\n\n");
            testOutput.write("      expect(service0.displayName).toBe(\"\");\n");
            testOutput.write("      expect(service0.testCharacteristic(Characteristic.Name)).toBe(" + generated.requiredCharacteristics.includes("name") + ");\n");
            testOutput.write("      expect(service0.subtype).toBeUndefined();\n\n");
            testOutput.write("      expect(service1.displayName).toBe(\"test name\");\n");
            testOutput.write("      expect(service1.testCharacteristic(Characteristic.Name)).toBe(true);\n");
            testOutput.write("      expect(service1.getCharacteristic(Characteristic.Name).value).toBe(\"test name\");\n");
            testOutput.write("      expect(service1.subtype).toBeUndefined();\n\n");
            testOutput.write("      expect(service2.displayName).toBe(\"test name\");\n");
            testOutput.write("      expect(service2.testCharacteristic(Characteristic.Name)).toBe(true);\n");
            testOutput.write("      expect(service2.getCharacteristic(Characteristic.Name).value).toBe(\"test name\");\n");
            testOutput.write("      expect(service2.subtype).toBe(\"test sub type\");\n");
            if (generated.deprecatedClassName) {
                testOutput.write("      // noinspection JSDeprecatedSymbols\n");
                testOutput.write("\n      new Service." + generated.deprecatedClassName + "();\n");
            }
            testOutput.write("    });\n");
            testOutput.write("  });\n");
        }
    }
    catch (e_27_1) { e_27 = { error: e_27_1 }; }
    finally {
        try {
            if (services_1_1 && !services_1_1.done && (_a = services_1.return)) _a.call(services_1);
        }
        finally { if (e_27) throw e_27.error; }
    }
    testOutput.write("});\n");
    testOutput.end();
}
//# sourceMappingURL=generate-definitions.js.map