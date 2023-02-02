/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
import TreeInterpreter from './TreeInterpreter.js';
import Parser from './Parser.js';
import dataTypes from './dataTypes.js';
import { matchType, getTypeName, getTypeNames } from './matchType.js';
import openFormulaFunctions from './openFormulaFunctions.js';
import functions from './functions.js';
import {
  isArray, isObject, strictDeepEqual, getValueOf,
} from './utils.js';

// Type constants used to define functions.
const {
  TYPE_CLASS,
  TYPE_ANY,
} = dataTypes;

function getToNumber(stringToNumber, debug = []) {
  return value => {
    const n = getValueOf(value); // in case it's an object that implements valueOf()
    if (n === null) return null;
    if (n instanceof Array) {
      debug.push('Converted array to zero');
      return 0;
    }
    const type = typeof n;
    if (type === 'number') return n;
    if (type === 'string') return stringToNumber(n, debug);
    if (type === 'boolean') return n ? 1 : 0;
    debug.push('Converted object to zero');
    return 0;
  };
}
function toString(a) {
  if (a === null || a === undefined) return '';
  // don't call a 'toString' method, since we could have a child named 'toString()'
  return a.toString();
}

const defaultStringToNumber = (str => {
  const n = +str;
  return Number.isNaN(n) ? 0 : n;
});

function isClass(obj) {
  if (obj === null) return false;
  if (Array.isArray(obj)) return false;
  return obj.constructor.name !== 'Object';
}

function matchClass(arg, expectedList) {
  // checking isClass() generates a dependency -- so call it only if necessary
  return expectedList.includes(TYPE_CLASS) && isClass(arg);
}

class Runtime {
  constructor(debug, toNumber, customFunctions = {}) {
    this.strictDeepEqual = strictDeepEqual;
    this.toNumber = toNumber;
    this.functionTable = functions(
      this,
      isObject,
      isArray,
      toNumber,
      getTypeName,
      getValueOf,
      toString,
      debug,
    );

    Object.entries(
      openFormulaFunctions(getValueOf, toString, toNumber, debug),
    ).forEach(([fname, func]) => {
      this.functionTable[fname] = func;
    });

    Object.entries(customFunctions).forEach(([fname, func]) => {
      // Provide the runtime to custom functions so that
      // they can implement lambda functions
      // eslint-disable-next-line no-param-reassign
      func._runtime = this;
      this.functionTable[fname] = func;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _validateArgs(argName, args, signature, bResolved) {
    // Validating the args requires validating
    // the correct arity and the correct type of each arg.
    // If the last argument is declared as variadic, then we need
    // a minimum number of args to be required.  Otherwise it has to
    // be an exact amount.
    if (signature.length === 0) {
      return;
    }
    let pluralized;
    const argsNeeded = signature.filter(arg => !arg.optional).length;
    if (signature[signature.length - 1].variadic) {
      if (args.length < signature.length) {
        pluralized = signature.length === 1 ? ' argument' : ' arguments';
        throw new Error(`ArgumentError: ${argName}() `
        + `takes at least${signature.length}${pluralized
        } but received ${args.length}`);
      }
    } else if (args.length < argsNeeded || args.length > signature.length) {
      pluralized = signature.length === 1 ? ' argument' : ' arguments';
      throw new Error(`ArgumentError: ${argName}() `
      + `takes ${signature.length}${pluralized
      } but received ${args.length}`);
    }
    // if the arguments are unresolved, there's no point in validating types
    if (!bResolved) return;
    let currentSpec;
    let actualType;
    const limit = Math.min(signature.length, args.length);
    for (let i = 0; i < limit; i += 1) {
      currentSpec = signature[i].types;
      // Try to avoid checks that will introspect the object and generate dependencies
      if (!matchClass(args[i], currentSpec) && !currentSpec.includes(TYPE_ANY)) {
        actualType = getTypeNames(args[i]);
        // eslint-disable-next-line no-param-reassign
        args[i] = matchType(actualType, currentSpec, args[i], argName, this.toNumber, toString);
      }
    }
  }

  callFunction(name, resolvedArgs, data, interpreter, bResolved = true) {
    // this check will weed out 'valueOf', 'toString' etc
    if (!Object.prototype.hasOwnProperty.call(this.functionTable, name)) throw new Error(`Unknown function: ${name}()`);

    const functionEntry = this.functionTable[name];
    this._validateArgs(name, resolvedArgs, functionEntry._signature, bResolved);
    return functionEntry._func.call(this, resolvedArgs, data, interpreter);
  }
}

export default class Formula {
  constructor(debug, customFunctions, stringToNumberFn) {
    this.debug = debug;
    this.toNumber = getToNumber(stringToNumberFn || defaultStringToNumber, debug);
    this.runtime = new Runtime(debug, this.toNumber, customFunctions);
  }

  compile(stream, allowedGlobalNames = []) {
    let ast;
    try {
      const parser = new Parser(allowedGlobalNames);
      ast = parser.parse(stream, this.debug);
    } catch (e) {
      this.debug.push(e.toString());
      throw e;
    }
    return ast;
  }

  search(node, data, globals = {}, language = 'en-US') {
    // This needs to be improved.  Both the interpreter and runtime depend on
    // each other.  The runtime needs the interpreter to support exprefs.
    // There's likely a clean way to avoid the cyclic dependency.
    this.runtime.interpreter = new TreeInterpreter(
      this.runtime,
      globals,
      this.toNumber,
      toString,
      this.debug,
      language,
    );

    try {
      return this.runtime.interpreter.search(node, data);
    } catch (e) {
      this.debug.push(e.message || e.toString());
      throw e;
    }
  }
}
