'use strict';

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function camelize(source) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var target = {};
  if (is_object_literal(source)) {
    var d = typeof depth === "number" && depth > 0 ? depth - 1 : depth;
    for (var _i = 0, _Object$keys = Object.keys(source); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      var value = source[key];
      if (depth) {
        key = camelize_str(key);
      }
      target[key] = camelize(value, d);
    }
  } else {
    target = source;
  }
  return target;
}
function camelize_str(str) {
  return str.replace(/[_.-](\w|$)/g, function (_, x) {
    return x.toUpperCase();
  });
}
function compare(el1, el2) {
  if (is_object_literal(el1)) {
    if (!is_object_literal(el2)) {
      return false;
    }
    var keys1 = Object.keys(el1).sort();
    var keys2 = Object.keys(el2).sort();
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (var i = 0; i < keys1.length; i++) {
      var key = keys1[i];
      if (key !== keys2[i]) {
        return false;
      }
      if (!compare(el1[key], el2[key])) {
        return false;
      }
    }
  } else if (Array.isArray(el1)) {
    if (!Array.isArray(el2)) {
      return false;
    }
    if (el1.length !== el2.length) {
      return false;
    }
    for (var _i2 = 0; _i2 < el1.length; _i2++) {
      if (!compare(el1[_i2], el2[_i2])) {
        return false;
      }
    }
  } else if (el1 !== el2) {
    return false;
  }
  return true;
}
function clone(target) {
  if (Array.isArray(target)) {
    return target.map(function (element) {
      return clone(element);
    });
  } else if (target && _typeof(target) === "object") {
    return mutate({}, target);
  } else {
    return target;
  }
}
function is_object(obj) {
  return obj && _typeof(obj) === "object" && !Array.isArray(obj);
}
function is_object_literal(obj) {
  var test = obj;
  if (_typeof(obj) !== "object" || obj === null) {
    return false;
  } else {
    if (Object.getPrototypeOf(test) === null) {
      return true;
    }
    while (Object.getPrototypeOf(test = Object.getPrototypeOf(test)) !== null) {
    }
    return Object.getPrototypeOf(obj) === test;
  }
}
function merge() {
  return mutate.apply(void 0, [{}].concat(Array.prototype.slice.call(arguments)));
}
function mutate() {
  var target = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (is_object_literal(source)) {
      if (!is_object_literal(target)) {
        target = {};
      }
      for (var _i3 = 0, _Object$keys2 = Object.keys(source); _i3 < _Object$keys2.length; _i3++) {
        var name = _Object$keys2[_i3];
        if (/__proto__|prototype/.test(name)) {
          // See
          // https://github.com/adaltas/node-mixme/issues/1
          // https://github.com/adaltas/node-mixme/issues/2
          // continue if /__proto__|constructor|prototype|eval|function|\*|\+|;|\s|\(|\)|!/.test name
          // Unless proven wrong, I consider ok to copy any properties named eval
          // or function, we are not executing those, only copying.
          continue;
        }
        target[name] = mutate(target[name], source[name]);
      }
    } else if (Array.isArray(source)) {
      target = source.map(function (element) {
        return clone(element);
      });
    } else if (source !== undefined) {
      target = source;
    }
  }
  return target;
}
function snake_case(source) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var target = {};
  if (is_object_literal(source)) {
    var d = typeof depth === "number" && depth > 0 ? depth - 1 : depth;
    for (var _i4 = 0, _Object$keys3 = Object.keys(source); _i4 < _Object$keys3.length; _i4++) {
      var key = _Object$keys3[_i4];
      var value = source[key];
      if (depth) {
        key = snake_case_str(key);
      }
      target[key] = snake_case(value, d);
    }
  } else {
    target = source;
  }
  return target;
}
function snake_case_str(str) {
  return str.replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase();
}

exports.camelize = camelize;
exports.camelize_str = camelize_str;
exports.clone = clone;
exports.compare = compare;
exports.is_object = is_object;
exports.is_object_literal = is_object_literal;
exports.merge = merge;
exports.mutate = mutate;
exports.snake_case = snake_case;
exports.snake_case_str = snake_case_str;
