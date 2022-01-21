/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import Lexer from './Lexer';
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
} = dataTypes;

function JsonFormula() {
  let toNumber;

  function getToNumber(stringToNumber) {
    return value => {
      const n = getValueOf(value); // in case it's an object that implements valueOf()
      if (n === null) return null;
      if (n instanceof Array) return 0;
      if (typeof n === 'number') return n;
      if (typeof n === 'string') {
        const temp = stringToNumber(n);
        return Number.isNaN(temp) ? 0 : temp;
      }
      if (typeof n === 'boolean') return n ? 1 : 0;

      // more coercions needed...
      throw new Error('need to coerce number');
    };
  }

  function toString(a) {
    if (a === null || a === undefined) return '';
    return a.toString();
  }

  function isClass(obj) {
    if (obj === null) return false;
    if (Array.isArray(obj)) return false;
    return typeof obj === 'object' && obj.constructor.name !== 'Object';
  }

  function matchClass(arg, expectedList) {
    return isClass(arg) && expectedList.includes(TYPE_CLASS);
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
        ...openFormulaFunctions(this._interpreter, getValueOf, toString, toNumber),
        ...customFunctions,
      };
    }

    callFunction(name, resolvedArgs, data) {
      function _validateArgs(argName, args, signature) {
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
        let currentSpec;
        let actualType;
        const limit = Math.min(signature.length, args.length);
        for (let i = 0; i < limit; i += 1) {
          currentSpec = signature[i].types;
          // First check for a match using matchClass
          // this check will not call valueOf or toString on the object, and so
          // will not trigger a dependency
          if (!matchClass(args[i], currentSpec)) {
            actualType = getTypeNames(args[i]);
            args[i] = matchType(actualType, currentSpec, args[i], argName, toNumber);
          }
        }
      }

      const functionEntry = this.functionTable[name];
      if (functionEntry === undefined) {
        throw new Error(`Unknown function: ${name}()`);
      }
      _validateArgs(name, resolvedArgs, functionEntry._signature);
      return functionEntry._func.call(this, resolvedArgs, data);
    }
  }

  function compile(stream, allowedGlobalNames = []) {
    const parser = new Parser(allowedGlobalNames);
    const ast = parser.parse(stream);
    return ast;
  }

  function tokenize(stream) {
    const lexer = new Lexer();
    return lexer.tokenize(stream);
  }

  function search(node, data, globals, customFunctions, stringToNumberFn) {
    // This needs to be improved.  Both the interpreter and runtime depend on
    // each other.  The runtime needs the interpreter to support exprefs.
    // There's likely a clean way to avoid the cyclic dependency.
    const runtime = new Runtime(customFunctions);
    const interpreter = new TreeInterpreter(runtime, globals, toNumber);
    runtime._interpreter = interpreter;
    runtime.addFunctions(customFunctions);
    const defaultStringToNumber = (str => {
      const n = +str;
      return Number.isNaN(n) ? 0 : n;
    });
    toNumber = getToNumber(stringToNumberFn || defaultStringToNumber);

    return interpreter.search(node, data);
  }
  this.tokenize = tokenize;
  this.compile = compile;
  this.search = search;
  this.strictDeepEqual = strictDeepEqual;
}

export default new JsonFormula();
