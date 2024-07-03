import path from "node:path";

export default async function (module, namespace = "default") {
  module =
    module.substr(0, 1) === "." ? path.resolve(process.cwd(), module) : module;
  const mod = await import(module);
  return mod[namespace];
}
