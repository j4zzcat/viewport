'use strict';

var mixme = require('mixme');
var plugAndPlay = require('plug-and-play');
var path = require('node:path');
var node_url = require('node:url');
var stream = require('node:stream');
var pad = require('pad');

/*
Format errors
*/
function error () {
  if (typeof arguments[0] === "string") {
    arguments[0] = {
      message: arguments[0],
    };
  }
  if (Array.isArray(arguments[0])) {
    arguments[0] = {
      message: arguments[0],
    };
  }
  const options = {};
  for (const arg of arguments) {
    if (!mixme.is_object_literal(arg)) {
      throw Error(
        `Invalid Error Argument: expect an object literal, got ${JSON.stringify(
          arg
        )}.`
      );
    }
    mixme.mutate(options, arg);
  }
  if (Array.isArray(options.message)) {
    options.message = options.message
      .filter(function (i) {
        return i;
      })
      .join(" ");
  }
  const error = new Error(options.message);
  if (options.command) {
    error.command = options.command;
  }
  return error;
}

async function load (module, namespace = "default") {
  module =
    module.substr(0, 1) === "." ? path.resolve(process.cwd(), module) : module;
  const mod = await import(module);
  return mod[namespace];
}

// filedirname(import.meta.url)
function filedirname (url) {
  const __filename = node_url.fileURLToPath(url);
  const __dirname = path.dirname(__filename);
  return { __filename, __dirname };
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  error: error,
  filedirname: filedirname,
  load: load
});

// Plugin "router"


var router = {
  name: "shell/plugins/router",
  hooks: {
    "shell:init": {
      after: "shell/plugins/config",
      handler: function ({ shell }) {
        shell.route = route.bind(shell);
      },
    },
    "shell:config:set": [
      {
        handler: function ({ config, command }, handler) {
          if (command.length) {
            return handler;
          }
          if (config.router == null) {
            config.router = {};
          }
          config.router.handler ??= "shell/routes/help";
          config.router.promise ??= false;
          config.router.stdin ??= process.stdin;
          config.router.stdout ??= process.stdout;
          config.router.stdout_end ??= false;
          config.router.stderr ??= process.stderr;
          if (config.router.stderr_end == null) {
            config.router.stderr_end = false;
          }
          if (!config.router.stdin instanceof stream.Readable) {
            throw error([
              "Invalid Configuration Property:",
              "router.stdin must be an instance of stream.Readable,",
              `got ${JSON.stringify(config.router.stdin)}`,
            ]);
          }
          if (!config.router.stdout instanceof stream.Writable) {
            throw error([
              "Invalid Configuration Property:",
              "router.stdout must be an instance of stream.Writable,",
              `got ${JSON.stringify(config.router.stdout)}`,
            ]);
          }
          if (!config.router.stderr instanceof stream.Writable) {
            throw error([
              "Invalid Configuration Property:",
              "router.stderr must be an instance of stream.Writable,",
              `got ${JSON.stringify(config.router.stderr)}`,
            ]);
          }
          return handler;
        },
      },
      {
        handler: function ({ config, command }, handler) {
          if (!config.handler) {
            return handler;
          }
          if (
            typeof config.handler !== "function" &&
            typeof config.handler !== "string"
          ) {
            throw error([
              "Invalid Route Configuration:",
              "accept string or function",
              !command.length
                ? "in application,"
                : `in command ${JSON.stringify(command.join(" "))},`,
              `got ${JSON.stringify(config.handler)}`,
            ]);
          }
          return handler;
        },
      },
    ],
  },
};

// Method `route(context, ...users_arguments)`
// https://shell.js.org/api/route/
const route = function (context = {}, ...args) {
  // Normalize arguments
  if (Array.isArray(context)) {
    context = {
      argv: context,
    };
  } else if (!mixme.is_object_literal(context)) {
    throw error([
      "Invalid Router Arguments:",
      "first argument must be a context object or the argv array,",
      `got ${JSON.stringify(context)}`,
    ]);
  }
  const appconfig = this.config().get();
  const route_load = (handler) => {
    if (typeof handler === "string") {
      return this.load(handler);
    } else if (typeof handler === "function") {
      return handler;
    } else {
      throw error(
        `Invalid Handler: expect a string or a function, got ${handler}`
      );
    }
  };
  const route_call = (handler, command, params, err, args) => {
    const config = this.config().get();
    context = {
      // argv: process.argv.slice(2),
      stdin: config.router.stdin,
      stdout: config.router.stdout,
      stdout_end: config.router.stdout_end,
      stderr: config.router.stderr,
      stderr_end: config.router.stderr_end,
      ...context,
      command: command,
      error: err,
      params: params,
      args: args,
    };
    return this.plugins.call_sync({
      name: "shell:router:call",
      args: context,
      handler: (context) => {
        if (!config.router.promise) {
          return handler.call(this, context, ...args);
        }
        try {
          // Otherwise wrap result in a promise
          const result = handler.call(this, context, ...args);
          if (result && typeof result.then === "function") {
            return result;
          }
          return new Promise(function (resolve, reject) {
            return resolve(result);
          });
        } catch (err) {
          return new Promise(function (resolve, reject) {
            return reject(err);
          });
        }
      },
    });
  };
  const route_error = (err, command) => {
    context.argv = command.length ? ["help", ...command] : ["--help"];
    const params = this.parse(context.argv);
    const handler = route_load(this._config.router.handler);
    if (handler.then) {
      return handler.then(function (handler) {
        return route_call(handler, command, params, err, args);
      });
    } else {
      return route_call(handler, command, params, err, args);
    }
  };
  const route_from_config = (config, command, params) => {
    let err;
    let handler = config.handler;
    if (!handler) {
      // Provide an error message if leaf command without a handler
      if (!Object.keys(config.commands).length) {
        // Object.keys(config.commands).length or
        err = config.root
          ? error([
              "Missing Application Handler:",
              'a "handler" definition is required when no child command is defined',
            ])
          : error([
              "Missing Command Handler:",
              `a \"handler\" definition ${JSON.stringify(
                params[appconfig.command]
              )} is required when no child command is defined`,
            ]);
      }
      // Convert argument to an help command
      // context.argv = command.length ? ['help', ...command] : ['--help'];
      // params = this.parse(context.argv);
      // handler = this.config.router.handler;
      return route_error(err, command);
    }
    // Loader is
    // - asynchronous and return a promise which fullfill with the handler function
    // - synchronous and return the handler function
    handler = route_load(handler);
    if (handler.then) {
      return handler
        .then(function (handler) {
          return route_call(handler, command, params, err, args);
        })
        .catch(async (err) => {
          return route_error(
            `Fail to load route. Message is: ${err.message}`,
            command
          );
        });
    } else {
      try {
        const res = route_call(handler, command, params, err, args);
        if (res?.catch) {
          return res.catch(async (err) => {
            await route_error(
              `Fail to load route. Message is: ${err.message}`,
              command
            );
            throw err;
          });
        } else {
          return res;
        }
      } catch (err) {
        route_error(`Fail to load route. Message is: ${err.message}`, command);
        throw err;
      }
    }
  };
  let params;
  try {
    // Read arguments
    params = this.parse(context.argv);
  } catch (err) {
    return route_error(err, err.command || []);
  }
  // Print help
  let command = this.helping(params);
  if (command) {
    // this seems wrong, must be the handler of the command
    const handler = route_load(appconfig.router.handler);
    if (handler.then) {
      return handler.then(function (handler) {
        return route_call(handler, command, params, undefined, args);
      });
    } else {
      return route_call(handler, command, params, undefined, args);
    }
  } else {
    // Return undefined if not parsing command based arguments
    // Load a command route
    command = params[appconfig.command];
    if (appconfig.extended) {
      // TODO: not tested yet, construct a commands array like in flatten mode when extended is activated
      // command = (for i in [0...params.length] then params[i][appconfig.command]) if appconfig.extended
      command = [];
      for (const param in params) {
        command.push[appconfig.command];
      }
    }
    const config = this.config(command).get();
    return route_from_config(config, command || [], params);
  }
};

// Plugin "config"


// Internal types
const types = ["string", "boolean", "integer", "array"];

const builder_main = function (commands) {
  const ctx = this;
  const builder = {
    get: function () {
      const config = ctx.config(commands).raw();
      return mixme.clone(config.main);
    },
    set: function (value) {
      const config = ctx.config(commands).raw();
      if (value === void 0) {
        // Do nothing if value is undefined
        return builder;
      }
      if (typeof value === "string") {
        // Cast string to object
        value = {
          name: value,
        };
      }
      // Unset the property if null
      if (value === null) {
        config.main = void 0;
        return builder;
      } else if (!mixme.is_object_literal(value)) {
        throw error([
          "Invalid Main Configuration:",
          "accepted values are string, null and object,",
          `got \`${JSON.stringify(value)}\``,
        ]);
      }
      // Ensure there is no conflict with command
      // Get root configuration to extract command name
      if (value.name === ctx.config([]).raw().command) {
        throw error([
          "Conflicting Main Value:",
          "main name is conflicting with the command name,",
          `got \`${JSON.stringify(value.name)}\``,
        ]);
      }
      config.main = value;
      return builder;
    },
  };
  return builder;
};

const builder_options = function (commands) {
  const ctx = this;
  const builder = function (name) {
    return {
      get: function (properties) {
        // Initialize options with cascaded options
        const options = builder.show();
        const option = options[name];
        if (typeof properties === "string") {
          properties = [properties];
        }
        if (!Array.isArray(properties)) {
          return option;
        }
        const copy = {};
        for (const property of properties) {
          copy[property] = option[property];
        }
        return copy;
      },
      remove: function (name) {
        const config = ctx.config(commands).raw();
        return delete config.options[name];
      },
      set: function () {
        const config = ctx.config(commands).raw();
        let values = null;
        if (arguments.length === 2) {
          values = {
            [arguments[0]]: arguments[1],
          };
        } else if (arguments.length === 1) {
          values = arguments[0];
        } else {
          throw error([
            "Invalid Commands Set Arguments:",
            "expect 1 or 2 arguments, got 0",
          ]);
        }
        if (config.options && !mixme.is_object_literal(config.options)) {
          throw error([
            "Invalid Options:",
            `expect an object, got ${JSON.stringify(config.options)}`,
          ]);
        }
        const option = (config.options[name] = mixme.merge(
          config.options[name],
          values
        ));
        if (!ctx._config.extended) {
          if (!option.disabled && commands.length) {
            // Compare the current command with the options previously registered
            const collide =
              ctx.collision[name] &&
              ctx.collision[name].filter(function (cmd, i) {
                return commands[i] !== cmd;
              }).length === 0;
            if (collide) {
              throw error([
                "Invalid Option Configuration:",
                `option ${JSON.stringify(name)}`,
                `in command ${JSON.stringify(commands.join(" "))}`,
                `collide with the one in ${
                  ctx.collision[name].length === 0
                    ? "application"
                    : JSON.stringify(ctx.collision[name].join(" "))
                },`,
                "change its name or use the extended property",
              ]);
            }
          }
          // Associate options with their declared command
          ctx.collision[name] = commands;
        }
        // Normalize option
        option.name = name;
        if (option.type == null) {
          option.type = "string";
        }
        if (types.indexOf(option.type) === -1) {
          throw error([
            "Invalid Option Configuration:",
            `supported options types are ${JSON.stringify(types)},`,
            `got ${JSON.stringify(option.type)}`,
            `for option ${JSON.stringify(name)}`,
            commands.length
              ? `in command ${JSON.stringify(commands.join(" "))}`
              : void 0,
          ]);
        }
        if (typeof option.enum === "string") {
          // config.shortcuts[option.shortcut] = option.name if option.shortcut and not option.disabled
          option.enum = [option.enum];
        }
        if (option.enum && !Array.isArray(option.enum)) {
          throw error([
            "Invalid Option Configuration:",
            'option property "enum" must be a string or an array,',
            `got ${option.enum}`,
          ]);
        }
        return this;
      },
    };
  };
  builder.__proto__ = {
    get_cascaded: function () {
      const options = {};
      let config = ctx.config().raw();
      for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        for (const name in config.options) {
          const option = config.options[name];
          if (!option.cascade) {
            continue;
          }
          const cascade_is_number = typeof option.cascade === "number";
          if (cascade_is_number && commands.length > option.cascade + i) {
            continue;
          }
          options[name] = mixme.clone(option);
        }
        config = config.commands[command];
      }
      return options;
    },
    show: function () {
      // Initialize options with cascaded options
      let options = builder.get_cascaded();
      for (const name in options) {
        const option = options[name];
        option.transient = true;
      }
      // Get app/command configuration
      const config = ctx.config(commands).raw();
      // Merge cascaded with local options
      options = mixme.merge(options, config.options);
      for (const name in options) {
        const option = options[name];
        if (option.disabled) {
          delete options[name];
        }
      }
      return options;
    },
    list: function () {
      return Object.keys(builder.show()).sort();
    },
  };
  return builder;
};

const config = function (command = []) {
  const ctx = this;
  if (typeof command === "string") {
    command = [command];
  }
  // command = [...pcommand, ...command]
  let lconfig = this._config;
  for (const name of command) {
    // A new command doesn't have a config registered yet
    if (!lconfig.commands[name]) lconfig.commands[name] = {};
    lconfig = lconfig.commands[name];
  }
  return {
    main: builder_main.call(this, command),
    options: builder_options.call(this, command),
    get: function () {
      let source = ctx._config;
      let strict = source.strict;
      for (const name of command) {
        if (!source.commands[name]) {
          // TODO: create a more explicit message,
          // including somehting like "command #{name} is not registered",
          // also ensure it is tested
          throw error(["Invalid Command"]);
        }
        // A new command doesn't have a config registered yet
        if (source.commands[name] == null) {
          source.commands[name] = {};
        }
        source = source.commands[name];
        if (source.strict) {
          strict = source.strict;
        }
      }
      const config = mixme.clone(source);
      config.strict = strict;
      if (command.length) {
        config.command = command;
      }
      for (const name in config.commands) {
        config.commands[name] = ctx.config([...command, name]).get();
      }
      config.options = this.options.show();
      config.shortcuts = {};
      for (const name in config.options) {
        const option = config.options[name];
        if (option.shortcut) {
          config.shortcuts[option.shortcut] = option.name;
        }
      }
      if (config.main != null) {
        config.main = this.main.get();
      }
      return config;
    },
    set: function () {
      let values;
      if (arguments.length === 2) {
        values = {
          [arguments[0]]: arguments[1],
        };
      } else if (arguments.length === 1) {
        values = arguments[0];
      } else {
        throw error([
          "Invalid Commands Set Arguments:",
          "expect 1 or 2 arguments, got 0",
        ]);
      }
      lconfig = ctx._config;
      for (const name of command) {
        // A new command doesn't have a config registered yet
        lconfig = lconfig.commands[name];
      }
      mixme.mutate(lconfig, values);
      ctx.plugins.call_sync({
        name: "shell:config:set",
        args: {
          config: lconfig,
          command: command,
          values: values,
        },
        handler: ({ config, command }) => {
          if (!command.length) {
            if (config.extended == null) {
              config.extended = false;
            }
            if (typeof config.extended !== "boolean") {
              throw error([
                "Invalid Configuration:",
                "extended must be a boolean,",
                `got ${JSON.stringify(config.extended)}`,
              ]);
            }
            config.root = true;
            if (config.name == null) {
              config.name = "myapp";
            }
            if (Object.keys(config.commands).length) {
              if (config.command == null) {
                config.command = "command";
              }
            }
            if (config.strict == null) {
              config.strict = false;
            }
          } else {
            if (config.name && config.name !== command.slice(-1)[0]) {
              throw error([
                "Incoherent Command Name:",
                `key ${JSON.stringify(
                  config.name
                )} is not equal with name ${JSON.stringify(config.name)}`,
              ]);
            }
            if (config.command != null) {
              throw error([
                "Invalid Command Configuration:",
                "command property can only be declared at the application level,",
                `got command ${JSON.stringify(config.command)}`,
              ]);
            }
            if (config.extended != null) {
              throw error([
                "Invalid Command Configuration:",
                "extended property cannot be declared inside a command",
              ]);
            }
            config.name = command.slice(-1)[0];
          }
          if (config.commands == null) {
            config.commands = {};
          } else if (!mixme.is_object_literal(config.commands)) {
            throw error([
              "Invalid Command Configuration",
              "commands must be an object,",
              `got ${JSON.stringify(config.commands)}`,
            ]);
          }
          if (config.options == null) {
            config.options = {};
          }
          if (config.shortcuts == null) {
            config.shortcuts = {};
          }
          for (const key in config.options) {
            this.options(key).set(config.options[key]);
          }
          for (const key in config.commands) {
            ctx.config([...command, key]).set(config.commands[key]);
          }
          return this.main.set(config.main);
        },
      });
      return this;
    },
    raw: function () {
      return lconfig;
    },
  };
};

var configPlugin = {
  name: "shell/plugins/config",
  hooks: {
    "shell:init": function ({ shell }) {
      shell.collision = {};
      shell.config = config.bind(shell);
    },
  },
};

// Plugin "args"


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
  if (!mixme.is_object_literal(options)) {
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
        } else if (typeof value === "undefined" || value === null) ; else {
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

var args = {
  name: "shell/plugins/args",
  hooks: {
    "shell:init": function ({ shell }) {
      shell.parse = parse.bind(shell);
      shell.compile = compile.bind(shell);
    },
  },
};

// Plugin "help"


var help = {
  name: "shell/plugins/help",
  hooks: {
    "shell:init": {
      after: "shell/plugins/config",
      handler: function ({ shell }) {
        shell.helping = helping.bind(shell);
        shell.help = help$1.bind(shell);
      },
    },
    "shell:config:set": [
      {
        handler: function ({ config, command }, handler) {
          if (command.length) {
            return handler;
          }
          if (config.commands == null) {
            config.commands = {};
          }
          if (!command.length) {
            if (config.description == null) {
              config.description = "No description yet";
            }
          }
          // No "help" option for command "help"
          if (!command.length || !config.help) {
            if (config.options == null) {
              config.options = {};
            }
            config.options["help"] = mixme.merge(config.options["help"], {
              cascade: true,
              shortcut: "h",
              description: "Display help information",
              type: "boolean",
              help: true,
            });
          }
          if (!command.length && Object.keys(config.commands).length) {
            command = {
              name: "help",
              description: "Display help information",
              main: {
                name: "name",
                description: "Help about a specific command",
              },
              help: true,
              handler: "shell/routes/help",
              options: {
                help: {
                  disabled: true,
                },
              },
            };
            config.commands[command.name] = mixme.merge(
              command,
              config.commands[command.name]
            );
          }
          return function () {
            handler.call(this, ...arguments);
            return config.description != null
              ? config.description
              : (config.description = `No description yet for the ${config.name} command`);
          };
        },
      },
      {
        handler: function ({ config, command }, handler) {
          if (!command.length) {
            return handler;
          }
          return function () {
            handler.call(this, ...arguments);
            return config.description != null
              ? config.description
              : (config.description = `No description yet for the ${config.name} command`);
          };
        },
      },
    ],
  },
};

// Method `helping(params)`
// https://shell.js.org/api/helping/
const helping = function (params, options = {}) {
  params = mixme.clone(params);
  const appconfig = this.config().get();
  let commands;
  if (options.extended == null) {
    options.extended = appconfig.extended;
  }
  if (!options.extended) {
    if (!mixme.is_object_literal(params)) {
      throw error([
        "Invalid Arguments:",
        "`helping` expect a params object as first argument",
        "in flatten mode,",
        `got ${JSON.stringify(params)}`,
      ]);
    }
  } else {
    if (
      !(
        Array.isArray(params) &&
        !params.some(function (cparams) {
          return !mixme.is_object_literal(cparams);
        })
      )
    ) {
      throw error([
        "Invalid Arguments:",
        "`helping` expect a params array with literal objects as first argument",
        "in extended mode,",
        `got ${JSON.stringify(params)}`,
      ]);
    }
  }
  // Extract the current commands from the arguments
  if (!options.extended) {
    if (
      params[appconfig.command] &&
      !Array.isArray(params[appconfig.command])
    ) {
      throw error([
        "Invalid Arguments:",
        `parameter ${JSON.stringify(
          appconfig.command
        )} must be an array in flatten mode,`,
        `got ${JSON.stringify(params[appconfig.command])}`,
      ]);
    }
    // In flatten mode, extract the commands from params
    commands = params[appconfig.command] || [];
  } else {
    commands = params.slice(1).map(function (cparams) {
      return cparams[appconfig.command];
    });
  }
  // Handle help command
  // if this is the help command, transform the leftover into a new command
  if (
    commands.length &&
    appconfig.commands &&
    appconfig.commands[commands[0]].help
  ) {
    // Note, when argv equals ['help'], there is no leftover and main is null
    const leftover = !options.extended
      ? params[appconfig.commands[commands[0]].main.name]
      : params[1][appconfig.commands[commands[0]].main.name];
    if (leftover) {
      return leftover;
    } else {
      return [];
    }
  }
  // Handle help option:
  // search if the help option is provided and for which command it apply
  const search = function (config, commands, params) {
    const cparams = !options.extended ? params : params.shift();
    // Search the help option
    const helping = Object.values(config.options)
      .filter(function (options) {
        return options.help;
        // Check if it is present in the extracted arguments
      })
      .some(function (options) {
        return cparams[options.name] != null;
      });
    if (helping) {
      if (options.extended && commands.length) {
        throw error([
          "Invalid Argument:",
          "`help` must be associated with a leaf command",
        ]);
      }
      return true;
    }
    if (!(commands != null ? commands.length : void 0)) {
      // Helping is not requested and there are no more commands to search
      return false;
    }
    const command = commands.shift();
    if (options.extended && params.length === 0) {
      return false;
    }
    config = config.commands[command];
    return search(config, commands, params);
  };
  const helping = search(appconfig, mixme.clone(commands), params);
  if (helping) {
    return commands;
  } else {
    return null;
  }
};

// Method `help(commands, options)`
// https://shell.js.org/api/help/
const help$1 = function (commands = [], options = {}) {
  if (options.indent == null) {
    options.indent = "  ";
  }
  if (options.columns == null) {
    options.columns = 28;
  }
  if (options.columns < 10) {
    throw error([
      "Invalid Help Column Option:",
      "must exceed a size of 10 columns,",
      `got ${JSON.stringify(options.columns)}`,
    ]);
  }
  if (process.stdout.columns == null) {
    if (options.one_column == null) {
      options.one_column = false;
    }
  }
  if (options.one_column == null) {
    options.one_column =
      process.stdout.columns - options.columns < options.columns;
  }
  if (typeof commands === "string") {
    commands = commands.split(" ");
  }
  if (!Array.isArray(commands)) {
    throw error([
      "Invalid Help Arguments:",
      "expect commands to be an array as first argument,",
      `got ${JSON.stringify(commands)}`,
    ]);
  }
  const appconfig = this.config().get();
  let config = appconfig;
  const configs = [config];
  for (const i in commands) {
    const command = commands[i];
    config = config.commands[command];
    if (!config) {
      throw error([
        "Invalid Command:",
        `argument \"${commands
          .slice(0, i + 1)
          .join(" ")}\" is not a valid command`,
      ]);
    }
    configs.push(config);
  }
  // Init
  const content = [];
  content.push("");
  // Name
  content.push("NAME");
  const name = configs
    .map(function (config) {
      return config.name;
    })
    .join(" ");
  const nameDescription = configs[configs.length - 1].description;
  if (options.one_column) {
    content.push(
      ...[`${name}`, `${nameDescription}`].map(function (l) {
        return `${options.indent}${l}`;
      })
    );
  } else {
    content.push(`${options.indent}${name} - ${nameDescription}`);
  }
  // Synopsis
  content.push("");
  content.push("SYNOPSIS");
  const synopsis = [];
  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];
    synopsis.push(config.name);
    // Find if there are options other than help
    if (
      Object.values(config.options).some(function (option) {
        return !option.help;
      })
    ) {
      synopsis.push(`[${config.name} options]`);
    }
    // Is current config
    if (i === configs.length - 1) {
      // There are more subcommand
      if (Object.keys(config.commands).length) {
        synopsis.push(`<${appconfig.command}>`);
      } else if (config.main) {
        synopsis.push(`{${config.main.name}}`);
      }
    }
  }
  content.push(`${options.indent}${synopsis.join(" ")}`);
  // Options
  for (const config of configs.slice(0).reverse()) {
    if (Object.keys(config.options).length || config.main) {
      content.push("");
      if (configs.length === 1) {
        content.push("OPTIONS");
      } else {
        content.push(`OPTIONS for ${config.name}`);
      }
    }
    if (config.main) {
      const description =
        config.main.description ||
        `No description yet for the ${config.main.name} option.`;
      if (options.one_column) {
        content.push(
          ...[`${config.main.name}`, `${description}`].map(function (l) {
            return `${options.indent}${l}`;
          })
        );
      } else {
        let line = `${options.indent}   ${config.main.name}`;
        line = pad(line, options.columns);
        if (line.length > options.columns) {
          content.push(line);
          line = " ".repeat(options.columns);
        }
        line += description;
        content.push(line);
      }
    }
    for (const name of Object.keys(config.options).sort()) {
      const option = config.options[name];
      let description =
        option.description ||
        `No description yet for the ${option.name} option.`;
      if (option.required) {
        description += " Required.";
      }
      if (options.one_column) {
        content.push(
          ...[
            option.shortcut ? `-${option.shortcut}` : void 0,
            `--${option.name}`,
            `${description}`,
          ]
            .filter(function (l) {
              return l;
            })
            .map(function (l) {
              return `${options.indent}${l}`;
            })
        );
      } else {
        const shortcut = option.shortcut ? `-${option.shortcut} ` : "   ";
        let line = `${options.indent}${shortcut}--${option.name}`;
        line = pad(line, options.columns);
        if (line.length > options.columns) {
          content.push(line);
          line = " ".repeat(options.columns);
        }
        line += description;
        content.push(line);
      }
    }
  }
  // Command
  config = configs[configs.length - 1];
  if (Object.keys(config.commands).length) {
    content.push("");
    content.push("COMMANDS");
    for (const name in config.commands) {
      const command = config.commands[name];
      let line = pad(
        `${options.indent}${[command.name].join(" ")}`,
        options.columns
      );
      if (line.length > options.columns) {
        content.push(line);
        line = " ".repeat(options.columns);
      }
      line +=
        command.description ||
        `No description yet for the ${command.name} command.`;
      content.push(line);
    }
    // Detailed command information
    if (options.extended) {
      for (const name in config.commands) {
        const command = config.commands[name];
        content.push("");
        content.push(`COMMAND \"${command.name}\"`);
        // Raw command, no main, no child commands
        if (
          !Object.keys(command.commands).length &&
          !(command.main && command.main.required)
        ) {
          let line = `${command.name}`;
          line = pad(`${options.indent}${line}`, options.columns);
          if (line.length > options.columns) {
            content.push(line);
            line = " ".repeat(options.columns);
          }
          line +=
            command.description ||
            `No description yet for the ${command.name} command.`;
          content.push(line);
        }
        // Command with main
        if (command.main) {
          let line = `${command.name} {${command.main.name}}`;
          line = pad(`${options.indent}${line}`, options.columns);
          if (line.length > options.columns) {
            content.push(line);
            line = " ".repeat(options.columns);
          }
          line +=
            command.main.description ||
            `No description yet for the ${command.main.name} option.`;
          content.push(line);
        }
        // Command with child commands
        if (Object.keys(command.commands).length) {
          let line = [`${command.name}`];
          if (Object.keys(command.options).length) {
            line.push(`[${command.name} options]`);
          }
          line.push(`<${command.command}>`);
          content.push(`${options.indent}${line.join(" ")}`);
          commands = Object.keys(command.commands);
          if (commands.length === 1) {
            content.push(
              `${options.indent}Where command is ${Object.keys(
                command.commands
              )}.`
            );
          } else if (commands.length > 1) {
            content.push(
              `${options.indent}Where command is one of ${Object.keys(
                command.commands
              ).join(", ")}.`
            );
          }
        }
      }
    }
  }
  // Add examples
  config = configs[configs.length - 1];
  // has_help_option = Object.values(config.options).some (option) -> option.name is 'help'
  const has_help_command = Object.values(config.commands).some(function (
    command
  ) {
    return command.name === "help";
  });
  content.push("");
  content.push("EXAMPLES");
  const cmd = configs
    .map(function (config) {
      return config.name;
    })
    .join(" ");
  {
    if (options.one_column) {
      content.push(
        ...[`${cmd} --help`, "Show this message"].map(function (l) {
          return `${options.indent}${l}`;
        })
      );
    } else {
      let line = pad(`${options.indent}${cmd} --help`, options.columns);
      if (line.length > options.columns) {
        content.push(line);
        line = " ".repeat(options.columns);
      }
      line += "Show this message";
      content.push(line);
    }
  }
  if (has_help_command) {
    if (options.one_column) {
      content.push(
        ...[`${cmd} help`, "Show this message"].map(function (l) {
          return `${options.indent}${l}`;
        })
      );
    } else {
      let line = pad(`${options.indent}${cmd} help`, options.columns);
      if (line.length > options.columns) {
        content.push(line);
        line = " ".repeat(options.columns);
      }
      line += "Show this message";
      content.push(line);
    }
  }
  content.push("");
  return content.join("\n");
};

// Shell.js Core object


const Shell = function (config) {
  this.plugins = plugAndPlay.plugandplay({
    chain: this,
  });
  this.plugins.register(router);
  this.plugins.register(configPlugin);
  this.plugins.register(args);
  this.plugins.register(help);
  config = mixme.clone(config || {});
  if (!config.plugins) {
    config.plugins = [];
  }
  for (const plugin of config.plugins) {
    this.plugins.register(plugin);
  }
  this._config = config;
  this.plugins.call_sync({
    args: { shell: this },
    name: "shell:init",
  });
  this.config().set(this._config);
  return this;
};

// `load(module)`
// https://shell.js.org/api/load/
Shell.prototype.load = async function (module, namespace = "default") {
  if (typeof module !== "string") {
    throw error(
      [
        "Invalid Load Argument:",
        "load is expecting string,",
        `got ${JSON.stringify(module)}`,
      ].join(" ")
    );
  }
  // Custom loader defined in the configuration
  if (this._config.load) {
    // Provided by the user as a module path
    if (typeof this._config.load === "string") {
      // todo, shall be async and return module.default
      const loader = await load(
        this._config.load /* `, this._config.load.namespace` */
      );
      return loader(module, namespace);
      // Provided by the user as a function
    } else {
      return await this._config.load(module, namespace);
    }
  } else {
    return await load(module, namespace);
  }
};

// Shell.js
// Usage: `shell(config)`


const shell = function (config) {
  const shell = new Shell(config);
  return shell;
};

exports.Shell = Shell;
exports.shell = shell;
exports.utils = index;
