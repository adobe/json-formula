/* eslint-disable no-underscore-dangle */
import TreeInterpreter from './TreeInterpreter';
import Parser from './Parser';
import dataTypes from './dataTypes';
import { matchType, getTypeName, getTypeNames } from './matchType';
import openFormulaFunctions from './openFormulaFunctions';
import functions from './functions';
import {
  isArray, isObject, strictDeepEqual, getValueOf,
} from './utils';

// Type constants used to define functions.
const {
  TYPE_CLASS,
  TYPE_ANY,
} = dataTypes;

function JsonFormula() {
  let toNumber;

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
    addFunctions(customFunctions = {}) {
      this.functionTable = {
        ...functions(
          this._interpreter,
          isObject,
          isArray,
          toNumber,
          getTypeName,
          getValueOf,
          toString,
        ),
        ...openFormulaFunctions(getValueOf, toString, toNumber),
        ...customFunctions,
      };
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
      if (signature[signature.length - 1].variadic) {
        if (args.length < signature.length) {
          pluralized = signature.length === 1 ? ' argument' : ' arguments';
          throw new Error(`ArgumentError: ${argName}() `
          + `takes at least${signature.length}${pluralized
          } but received ${args.length}`);
        }
      } else if (args.length !== signature.length && !signature[signature.length - 1].optional) {
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
          args[i] = matchType(actualType, currentSpec, args[i], argName, toNumber, toString);
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

  function compile(stream, allowedGlobalNames = [], debug = []) {
    let ast;
    try {
      const parser = new Parser(allowedGlobalNames);
      ast = parser.parse(stream, debug);
    } catch (e) {
      debug.push(e.toString());
      throw e;
    }
    return ast;
  }

  function search(node, data, globals, customFunctions, stringToNumberFn, debug = [], language = 'en-US') {
    // This needs to be improved.  Both the interpreter and runtime depend on
    // each other.  The runtime needs the interpreter to support exprefs.
    // There's likely a clean way to avoid the cyclic dependency.
    const runtime = new Runtime(customFunctions);
    runtime.debug = debug;
    const defaultStringToNumber = (str => {
      const n = +str;
      return Number.isNaN(n) ? 0 : n;
    });
    toNumber = getToNumber(stringToNumberFn || defaultStringToNumber, debug);
    const interpreter = new TreeInterpreter(runtime, globals, toNumber, toString, debug, language);
    runtime._interpreter = interpreter;
    runtime.addFunctions(customFunctions);

    try {
      return interpreter.search(node, data);
    } catch (e) {
      debug.push(e.message || e.toString());
      throw e;
    }
  }
  this.compile = compile;
  this.search = search;
  this.strictDeepEqual = strictDeepEqual;
}

export default new JsonFormula();
