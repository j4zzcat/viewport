// Shell.js Core object

// Dependencies
import { clone } from "mixme";
import { plugandplay } from "plug-and-play";
import { error, load } from "./utils/index.js";
// Plugins
import router from "./plugins/router.js";
import configPlugin from "./plugins/config.js";
import args from "./plugins/args.js";
import help from "./plugins/help.js";

const Shell = function (config) {
  this.plugins = plugandplay({
    chain: this,
  });
  this.plugins.register(router);
  this.plugins.register(configPlugin);
  this.plugins.register(args);
  this.plugins.register(help);
  config = clone(config || {});
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

export default Shell;
