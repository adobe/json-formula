/*
Copyright 2014 James Saryerwinnie

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
import TreeInterpreter from './TreeInterpreter.js';
import Parser from './Parser.js';
import dataTypes from './dataTypes.js';
import { matchType, getType, getTypes } from './matchType.js';
import functions from './functions.js';
import {
  isArray, isObject, strictDeepEqual, getValueOf, isClass,
} from './utils.js';
import {
  evaluationError, typeError, functionError,
} from './errors.js';

// Type constants used to define functions.
const {
  TYPE_CLASS,
  TYPE_ARRAY,
  TYPE_OBJECT,
} = dataTypes;

function getToNumber(stringToNumber, debug = []) {
  return value => {
    const n = getValueOf(value); // in case it's an object that implements valueOf()
    if (n === null) return 0;
    if (n instanceof Array) {
      throw typeError('Failed to convert array to number');
    }
    const type = typeof n;
    if (type === 'number') return n;
    if (type === 'string') return stringToNumber(n, debug);
    if (type === 'boolean') return n ? 1 : 0;
    throw typeError('Failed to convert object to number');
  };
}
function toString(a) {
  if (a === null || a === undefined) return '';
  const type = getType(a);
  if (type === TYPE_ARRAY || type === TYPE_OBJECT) {
    return JSON.stringify(a);
  }
  return a.toString();
}

const defaultStringToNumber = (str => {
  const n = +str;
  return Number.isNaN(n) ? 0 : n;
});

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
      getType,
      getValueOf,
      toString,
      debug,
    );

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
    if (signature.length === 0 && args.length > 0) {
      throw functionError(`${argName}() does not accept parameters`);
    }

    if (signature.length === 0) {
      return;
    }
    let pluralized;
    const argsNeeded = signature.filter(arg => !arg.optional).length;
    const lastArg = signature[signature.length - 1];
    if (lastArg.variadic) {
      if (args.length < signature.length) {
        pluralized = signature.length === 1 ? ' argument' : ' arguments';
        throw functionError(`${argName}() takes at least ${signature.length}${pluralized
        } but received ${args.length}`);
      }
    } else if (args.length < argsNeeded || args.length > signature.length) {
      pluralized = signature.length === 1 ? ' argument' : ' arguments';
      throw functionError(`${argName}() takes ${signature.length}${pluralized
      } but received ${args.length}`);
    }
    // if the arguments are unresolved, there's no point in validating types
    if (!bResolved) return;
    let currentSpec;
    let actualType;
    const limit = signature[signature.length - 1].variadic ? args.length
      : Math.min(signature.length, args.length);

    for (let i = 0; i < limit; i += 1) {
      currentSpec = i > signature.length - 1 ? signature[signature.length - 1].types
        : signature[i].types;
      // Try to avoid checks that will introspect the object and generate dependencies
      if (!matchClass(args[i], currentSpec)) {
        actualType = getTypes(args[i]);
        // eslint-disable-next-line no-param-reassign
        args[i] = matchType(actualType, currentSpec, args[i], argName, this.toNumber, toString);
      }
    }
  }

  callFunction(name, resolvedArgs, data, interpreter, bResolved = true) {
    // this check will weed out 'valueOf', 'toString' etc
    if (!Object.prototype.hasOwnProperty.call(this.functionTable, name)) {
      throw functionError(`No such function: ${name}()`);
    }

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
    const parser = new Parser(allowedGlobalNames);
    return parser.parse(stream, this.debug);
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
      if (e.name === 'Error') throw evaluationError(e.message || e.toString());
      throw e;
    }
  }
}
