/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import Formula from './interpreter.js';

// data type constants re-exported from dataTypes.js
// which represent the various data types supported by json-formula function params
export { dataTypes } from './dataTypes.js';
/**
@enum {Number}
  // Type constants used to define functions.
  const dataTypes = {
    TYPE_NUMBER: 0,
    TYPE_ANY: 1,
    TYPE_STRING: 2,
    TYPE_ARRAY: 3,
    TYPE_OBJECT: 4,
    TYPE_BOOLEAN: 5,
    TYPE_EXPREF: 6,
    TYPE_NULL: 7,
    TYPE_ARRAY_NUMBER: 8,
    TYPE_ARRAY_STRING: 9,
    TYPE_ARRAY_ARRAY: 10,
    TYPE_EMPTY_ARRAY: 11,
  };
 */

/**
 * @typedef {object} CustomFunctionDefinition
 * @property {Function} _func - The function implementation
 * @property {array} [_signature] - Function signature metadata
 * @example
  // simple custom functions definition
  const customFunctions = {
    true_fn: {
      _func: () => true,
      _signature: [],
    },
    false_fn: {
      _func: () => false,
      _signature: [],
    },
  };
  @example
  // custom function with a signature for its parameters
  const customFunctions = {
    padEnd: {
      _func: args => {
        const src = args[0];
        const length = args[1];
        const padChar = args[2];
        if (Array.isArray(src)) return src.map(s => s.padEnd(length, padChar));
        return src.padEnd(length, padChar);
      },
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_NUMBER] },
        { types: [TYPE_STRING] },
      ],
    }
  }
  // May also register functions is via the `register()` or `registerWithParams()` methods. e.g.

   const regFormula = `${register("${fn_name}", &${code})`;
   // Run the registration formula after which, the registered function may be called
   this.search(regFormula, {});
*/

/**
 * Class represents an instance of a JsonFormula Expression that can be executed later on with
 * multiple instances of JSON Data. The instance of the class has a search
 * function that can be used to evaluate the expression on a json payload.
 */
class JsonFormula {
  /**
   * @param {object} [customFunctions={}] custom functions needed by a hosting application.
   * @param {function} [stringToNumber='null'] A function that converts string values to numbers.
   * Can be used to convert currencies/dates to numbers
   * @param {array} [debug=[]]  will be populated with any errors/warnings
   */
  constructor(
    customFunctions = {},
    stringToNumber = null,
    debug = [],
  ) {
    this.customFunctions = { ...customFunctions };
    this.stringToNumber = stringToNumber;
    this.debug = debug;
    this.formula = new Formula(debug, customFunctions, stringToNumber);
  }

  /**
   * @typedef {object} globals
   * An object where each key **MUST** begin with a `$` character, representing global variables
   * that can be accessed inside a json-formula expression.
   * The value of each key can be of any data type supported by json.
   *
   * @example
   * const globals = {
   *   $num: 42,
   *   $arr: [1, 2, 3],
   *   $days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
   * };
   * jsonFormula({}, globals, '$arr * $num') // returns [42, 84, 126]
  */

  /**
   * Evaluates the JsonFormula on a particular json payload and return the result
   * @param {string} expression the json-formula expression to evaluate
   * @param {object|array} json the json data on which the expression needs to be evaluated
   * @param {object} [globals={}] global objects that can be accessed via custom functions.
   * @param {string} [language=en-US] BCP-47 language tag
   * @returns {*} the result of the expression being evaluated
   * @example
   * const jf = new JsonFormula();
   * const result = jf.search('toDate(d) | day(@) & "/" & month(@)', {d: "2025-11-12"});
   * // returns "12/11"
   */
  search(expression, json, globals = {}, language = 'en-US') {
    const ast = this.compile(expression, Object.keys(globals));
    return this.run(ast, json, language, globals);
  }

  /**
   * Execute a previously compiled expression against a json object and return the result.
   * Use this method for better performance when you will evaluate the same expression
   * multiple times with different data.
   * @param {object} ast The abstract syntax tree returned from compile()
   * @param {object|array} json the json data on which the expression needs to be evaluated
   * @param {string} [language=en-US] BCP-47 language tag
   * @param globals {*} set of objects available in global scope
   * @returns {*} the result of the expression being evaluated
   * @example
   * const globals = {
   *   $days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
   * };
   * const jf = new JsonFormula();
   * const ast = jf.compile('value($days, num)', ['$days']); // compile the expression once
   * const result1 = jf.run(ast, {num: 2}, 'en-US', globals); // returns "Wed"
   * const result2 = jf.run(ast, {num: 3}, 'en-US', globals); // returns "Thu"
   */
  run(ast, json, language, globals) {
    return this.formula.search(
      ast,
      json,
      globals,
      language,
    );
  }

  /**
   * Creates a compiled expression that can be executed later on with some data.
   * @param {string} expression the expression to evaluate
   * @param {string[]} [allowedGlobalNames=[]] An array of names of the global variables
   * being used in the expression.
   */
  compile(expression, allowedGlobalNames = []) {
    this.debug.length = 0;
    return this.formula.compile(expression, allowedGlobalNames);
  }
}

/**
 * Compile and execute a json-formula expression.
 * If executing the same expression multiple times, it is more efficient to create a
 * class instance of JsonFormula and call the search() method or the compile()/run() methods
 * multiple times.
* @param {object|array} json the json data on which the expression needs to be evaluated
* @param {object} globals  global objects that can be accessed via custom functions.
* @param {string} expression the expression to evaluate
* @param {object} [customFunctions={}] custom functions needed by a hosting application.
* @param {function} [stringToNumber='null'] A function that converts string values to numbers.
* Can be used to convert currencies/dates to numbers
* @param  {array} [debug=[]] will be populated with any errors/warnings
* @param {string} [language=en-US] BCP-47 language tag
* @returns {*} the result of the expression being evaluated
 */

export function jsonFormula(
  json,
  globals,
  expression,
  customFunctions = {},
  stringToNumber = null,
  debug = [],
  language = 'en-US',
) {
  return new JsonFormula(customFunctions, stringToNumber, debug)
    .search(expression, json, globals, language);
}

export default JsonFormula;
