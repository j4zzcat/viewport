// Plugin "args"

// Dependencies
import { is_object_literal } from "mixme";
import { error } from "../utils/index.js";

// Method `parse([arguments])`
// https://shell.js.org/api/parse/
const parse = function (argv = process, options = {}) {
  const appconfig = this.config().get();
  if (options.extended == null) {
    options.extended = appconfig.extended;
  }
  let index = 0;
  // Remove node and script argv elements
  if (argv === process) {
    index = 2;
    argv = argv.argv;
  } else if (!Array.isArray(argv)) {
    throw error([
      "Invalid Arguments:",
      "parse require arguments or process as first argument,",
      `got ${JSON.stringify(process)}`,
    ]);
  }
  // Extracted arguments
  const full_params = [];
  const parse = function (config, command) {
    const params = {};
    full_params.push(params);
    if (command != null) {
      // Add command name provided by parent
      params[appconfig.command] = command;
    }
    // Read options
    /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
    while (true) {
      if (argv.length === index || argv[index][0] !== "-") {
        break;
      }
      let key = argv[index++];
      let shortcut = key[1] !== "-";
      key = key.substring(shortcut ? 1 : 2, key.length);
      if (shortcut) {
        shortcut = key;
      }
      if (shortcut) {
        key = config.shortcuts[shortcut];
      }
      let option;
      if (config.options[key]) option = config.options[key];
      if (!shortcut && config.strict && !option) {
        const err = error([
          "Invalid Argument:",
          `the argument ${shortcut ? "-" : "--"}${key} is not a valid option`,
        ]);
        err.command = full_params.slice(1).map(function (params) {
          return params[appconfig.command];
        });
        throw err;
      }
      if (shortcut && !option) {
        throw error([
          "Invalid Shortcut Argument:",
          `the "-${shortcut}" argument is not a valid option`,
          Array.isArray(config.command)
            ? `in command "${config.command.join(" ")}"`
            : void 0,
        ]);
      }
      // Auto discovery
      if (!option) {
        const type =
          argv[index] && argv[index][0] !== "-" ? "string" : "boolean";
        option = {
          name: key,
          type: type,
        };
      }
      switch (option.type) {
        case "boolean": {
          params[key] = true;
          break;
        }
        case "string": {
          const valueStr = argv[index++];
          if (!(valueStr != null && valueStr[0] !== "-")) {
            throw error([
              "Invalid Option:",
              `no value found for option ${JSON.stringify(key)}`,
            ]);
          }
          params[key] = valueStr;
          break;
        }
        case "integer": {
          const valueInt = argv[index++];
          if (!(valueInt != null && valueInt[0] !== "-")) {
            throw error([
              "Invalid Option:",
              `no value found for option ${JSON.stringify(key)}`,
            ]);
          }
          params[key] = parseInt(valueInt, 10);
          if (isNaN(params[key])) {
            throw error([
              "Invalid Option:",
              `value of ${JSON.stringify(key)} is not an integer,`,
              `got ${JSON.stringify(valueInt)}`,
            ]);
          }
          break;
        }
        case "array": {
          const valueAr = argv[index++];
          if (!(valueAr != null && valueAr[0] !== "-")) {
            throw error([
              "Invalid Option:",
              `no value found for option ${JSON.stringify(key)}`,
            ]);
          }
          if (params[key] == null) {
            params[key] = [];
          }
          params[key].push(...valueAr.split(","));
        }
      }
    }
    // Check if help is requested
    // TODO: this doesnt seem right, also, the test in help.parse seems wrong as well
    let helping = false;
    for (const name in config.options) {
      const option = config.options[name];
      if (option.help !== true) {
        continue;
      }
      if (params[option.name]) {
        helping = true;
      }
    }
    if (helping) {
      return params;
    }
    // Check against required options
    for (const name in config.options) {
      const option = config.options[name];
      // Handler required
      const required =
        typeof option.required === "function"
          ? !!option.required.call(null, {
              config: config,
              command: command,
            })
          : !!option.required;
      if (required && params[option.name] == null) {
        throw error([
          "Required Option:",
          `the \"${option.name}\" option must be provided`,
        ]);
      }
      // Handle enum
      if (option.enum) {
        let values = params[option.name];
        if (!required && values !== void 0) {
          if (!Array.isArray(values)) {
            values = [values];
          }
          for (const value of values) {
            if (option.enum.indexOf(value) === -1) {
              throw error([
                "Invalid Argument Value:",
                `the value of option \"${option.name}\"`,
                `must be one of ${JSON.stringify(option.enum)},`,
                `got ${JSON.stringify(value)}`,
              ]);
            }
          }
        }
      }
    }
    // We still have some argument to parse
    if (argv.length !== index) {
      // Store the full command in the return array
      const leftover = argv.slice(index);
      if (config.main) {
        params[config.main.name] = leftover;
      } else {
        command = argv[index++];
        if (!config.commands[command]) {
          // Validate the command
          throw error([
            "Invalid Argument:",
            `fail to interpret all arguments \"${leftover.join(" ")}\"`,
          ]);
        }
        // Parse child configuration
        parse(config.commands[command], command);
      }
    } else if (config.main) {
      params[config.main.name] = [];
    }
    // NOTE: legacy versions used to inject an help command
    // when parsing arguments which doesn't hit a sub command
    // See the associated tests in "help/parse.coffee"
    // Happens with global options without a command
    // if Object.keys(config.commands).length and not command
    //   params[appconfig.command] = 'help'
    // Check against required main
    const main = config.main;
    if (main) {
      const required =
        typeof main.required === "function"
          ? !!main.required.call(null, {
              config: config,
              command: command,
            })
          : !!main.required;
      if (required && params[main.name].length === 0) {
        throw error([
          "Required Main Argument:",
          `no suitable arguments for ${JSON.stringify(main.name)}`,
        ]);
      }
    }
    // Apply default values
    for (const name in config.options) {
      const option = config.options[name];
      if (option.default != null) {
        if (params[option.name] == null) {
          params[option.name] = option.default;
        }
      }
    }
    // Return params object associated with this command
    return params;
  };
  // Start the parser
  parse(appconfig, null);
  if (!options.extended) {
    const params = {};
    if (Object.keys(appconfig.commands).length) {
      params[appconfig.command] = [];
    }
    for (const command_params of full_params) {
      for (const k in command_params) {
        const v = command_params[k];
        if (k === appconfig.command) {
          params[k].push(v);
        } else {
          params[k] = v;
        }
      }
    }
    return params;
  } else {
    return full_params;
  }
};

// Method `compile(command, [options])`
// https://shell.js.org/api/compile/
const compile = function (data, options = {}) {
  let argv = options.script ? [process.execPath, options.script] : [];
  const appconfig = this.config().get();
  if (!is_object_literal(options)) {
    throw error([
      "Invalid Compile Arguments:",
      "2nd argument option must be an object,",
      `got ${JSON.stringify(options)}`,
    ]);
  }
  if (options.extended == null) {
    options.extended = appconfig.extended;
  }
  const keys = {};
  if (typeof data[appconfig.command] === "string") {
    // Convert command parameter to a 1 element array if provided as a string
    data[appconfig.command] = [data[appconfig.command]];
  }
  // Compile
  const compile = function (config, ldata) {
    for (const name in config.options) {
      const option = config.options[name];
      const key = option.name;
      keys[key] = true;
      let value = ldata[key];
      if (value == null) {
        // Apply default value if option missing from params
        value = option.default;
      }
      // Handle required
      const required =
        typeof option.required === "function"
          ? !!option.required.call(null, {
              config: config,
              command: undefined,
            })
          : !!option.required;
      if (required && value == null) {
        throw error([
          "Required Option:",
          `the "${key}" option must be provided`,
        ]);
      }
      // Validate value against option "enum"
      if (value != null && option.enum) {
        if (!Array.isArray(value)) {
          value = [value];
        }
        for (const val of value) {
          if (option.enum.indexOf(val) === -1) {
            throw error([
              "Invalid Parameter Value:",
              `the value of option \"${option.name}\"`,
              `must be one of ${JSON.stringify(option.enum)},`,
              `got ${JSON.stringify(val)}`,
            ]);
          }
        }
      }
      // Serialize
      if (value) {
        switch (option.type) {
          case "boolean": {
            argv.push(`--${key}`);
            break;
          }
          case "string":
          case "integer": {
            argv.push(`--${key}`);
            argv.push(`${value}`);
            break;
          }
          case "array": {
            argv.push(`--${key}`);
            argv.push(`${value.join(",")}`);
          }
        }
      }
    }
    if (config.main) {
      const value = ldata[config.main.name];
      // Handle required
      const required =
        typeof config.main.required === "function"
          ? !!config.main.required.call(null, {
              config: config,
              command: undefined,
            })
          : !!config.main.required;
      if (required && value == null) {
        throw error([
          "Required Main Parameter:",
          `no suitable arguments for ${JSON.stringify(config.main.name)}`,
        ]);
      }
      if (value != null) {
        if (!Array.isArray(value)) {
          throw error([
            "Invalid Parameter Type:",
            `expect main to be an array, got ${JSON.stringify(value)}`,
          ]);
        }
        keys[config.main.name] = value;
        argv = argv.concat(value);
      }
    }
    // Recursive
    const has_child_commands = options.extended
      ? data.length
      : Object.keys(config.commands).length;
    if (has_child_commands) {
      const command = options.extended
        ? data[0][appconfig.command]
        : data[appconfig.command].shift();
      if (!config.commands[command]) {
        throw error([
          "Invalid Command Parameter:",
          `command ${JSON.stringify(command)} is not registed,`,
          `expect one of ${JSON.stringify(
            Object.keys(config.commands).sort()
          )}`,
          Array.isArray(config.command)
            ? `in command ${JSON.stringify(config.command.join(" "))}`
            : void 0,
        ]);
      }
      argv.push(command);
      keys[appconfig.command] = command;
      // Compile child configuration
      compile(
        config.commands[command],
        options.extended ? data.shift() : ldata
      );
    }
    if (options.extended || !has_child_commands) {
      // Handle data not defined in the configuration
      // Note, they are always pushed to the end and associated with the deepest child
      const results = [];
      for (const key in ldata) {
        const value = ldata[key];
        if (keys[key]) {
          continue;
        }
        if (appconfig.strict) {
          throw error(
            [
              "Invalid Parameter:",
              `the property --${key} is not a registered argument`,
            ].join(" ")
          );
        }
        if (typeof value === "boolean") {
          if (value) {
            results.push(argv.push(`--${key}`));
          } else {
            results.push(void 0);
          }
        } else if (typeof value === "undefined" || value === null) {
          // nothing to do
        } else {
          argv.push(`--${key}`);
          results.push(argv.push(`${value}`));
        }
      }
      return results;
    }
  };
  compile(appconfig, options.extended ? data.shift() : data);
  return argv;
};

export default {
  name: "shell/plugins/args",
  hooks: {
    "shell:init": function ({ shell }) {
      shell.parse = parse.bind(shell);
      shell.compile = compile.bind(shell);
    },
  },
};
