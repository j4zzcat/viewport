import { mutate, is_object_literal } from "mixme";

/*
Format errors
*/
export default function () {
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
    if (!is_object_literal(arg)) {
      throw Error(
        `Invalid Error Argument: expect an object literal, got ${JSON.stringify(
          arg
        )}.`
      );
    }
    mutate(options, arg);
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
