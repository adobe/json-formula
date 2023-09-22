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

/**
 * Returns an instance of JSON JsonFormula Expression that can be executed later on with
 * multiple instances of JSON Data. The instance of the class has a single search
 * function that can be used to evaluate the expression on a json payload. The advantage
 * of using this over {jsonJsonFormula} function is that it can be performant if a single expression
 * has to be used for multiple json data instances.
 */
export default class JsonFormula {
  /**
   * @param customFunctions {*} custom functions needed by a hosting application.
   * @param stringToNumber {function} A function that converts string values to numbers.
   * Can be used to convert currencies/dates to numbers
   * @param language
   * @param debug {array} will be populated with any errors/warnings
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
   * @param json {object} the json data on which the expression needs to be evaluated
   * @param globals {*} global objects that can be accessed via custom functions.
   * @returns {*} the result of the expression being evaluated
   */
  search(expression, json, globals = {}, language = 'en-US') {
    const ast = this.compile(expression, Object.keys(globals));
    return this.run(ast, json, language, globals);
  }

  /**
   * Execute a previously compiled expression against a json object and return the result
   * @param ast {object} The abstract syntax tree returned from compile()
   * @param json {object} the json data on which the expression needs to be evaluated
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

  /*
   * Creates a compiled expression that can be executed later on with some data.
   * @param expression {string} the expression to evaluate
   * @param allowedGlobalNames {string[]} A list of names of the global variables
   * being used in the expression.
   * @param debug {array} will be populated with any errors/warnings
   */
  compile(expression, allowedGlobalNames = []) {
    this.debug.length = 0;
    return this.formula.compile(expression, allowedGlobalNames);
  }
}

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
