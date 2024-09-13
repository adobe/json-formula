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

export { dataTypes } from './dataTypes.js';

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
   * @param {string} [language=en-US]
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
   * Evaluates the JsonFormula on a particular json payload and return the result
   * @param {object|array} json the json data on which the expression needs to be evaluated
   * @param {object} [globals={}] global objects that can be accessed via custom functions.
   * @returns {*} the result of the expression being evaluated
   */
  search(expression, json, globals = {}, language = 'en-US') {
    const ast = this.compile(expression, Object.keys(globals));
    return this.run(ast, json, language, globals);
  }

  /**
   * Execute a previously compiled expression against a json object and return the result
   * @param {object} ast The abstract syntax tree returned from compile()
   * @param {object|array} json the json data on which the expression needs to be evaluated
   * @param globals {*} set of objects available in global scope
   * @returns {*} the result of the expression being evaluated
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
   * @param {string[]} [allowedGlobalNames=[]] A list of names of the global variables
   * being used in the expression.
   * @param {array} [debug=[]] will be populated with any errors/warnings
   */
  compile(expression, allowedGlobalNames = []) {
    this.debug.length = 0;
    return this.formula.compile(expression, allowedGlobalNames);
  }
}

/**
 * Compile and execute a json-formula expression.
 * If executing the same expression multiple times, it is more efficient to create a
 * class instance of {JsonFormula} and call the search method multiple times.
* @param {object|array} json the json data on which the expression needs to be evaluated
* @param {object} globals  global objects that can be accessed via custom functions.
* @param {string} expression the expression to evaluate
* @param {object} [customFunctions={}] custom functions needed by a hosting application.
* @param {function} [stringToNumber='null'] A function that converts string values to numbers.
* Can be used to convert currencies/dates to numbers
* @param {string} [language=en-US]
* @param  {array} [debug=[]] will be populated with any errors/warnings
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
