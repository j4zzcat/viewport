// Plugin "router"

// Dependencies
import stream from "node:stream";
import { is_object_literal } from "mixme";
import { error } from "../utils/index.js";

export default {
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
  } else if (!is_object_literal(context)) {
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
