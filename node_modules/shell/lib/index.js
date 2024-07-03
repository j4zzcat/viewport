// Shell.js
// Usage: `shell(config)`

import Shell from "./Shell.js";

const shell = function (config) {
  const shell = new Shell(config);
  return shell;
};

export { shell, Shell };
export * as utils from "./utils/index.js";
