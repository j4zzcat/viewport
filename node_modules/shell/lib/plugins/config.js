// Plugin "config"

// Dependencies
import { clone, is_object_literal, merge, mutate } from "mixme";
import { error } from "../utils/index.js";

// Internal types
const types = ["string", "boolean", "integer", "array"];

const builder_main = function (commands) {
  const ctx = this;
  const builder = {
    get: function () {
      const config = ctx.config(commands).raw();
      return clone(config.main);
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
      } else if (!is_object_literal(value)) {
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
        if (config.options && !is_object_literal(config.options)) {
          throw error([
            "Invalid Options:",
            `expect an object, got ${JSON.stringify(config.options)}`,
          ]);
        }
        const option = (config.options[name] = merge(
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
          options[name] = clone(option);
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
      options = merge(options, config.options);
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
      const config = clone(source);
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
      mutate(lconfig, values);
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
          } else if (!is_object_literal(config.commands)) {
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

export default {
  name: "shell/plugins/config",
  hooks: {
    "shell:init": function ({ shell }) {
      shell.collision = {};
      shell.config = config.bind(shell);
    },
  },
};
