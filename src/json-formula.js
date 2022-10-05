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
import jmespath from './jmespath/jmespath';

/**
 * Returns an instance of JSON Formula Expression that can be executed later on with
 * multiple instances of JSON Data.
 * The instance of the class has a single search function that can be used to evaluate the expression
 * on a json payload.
 * The advantage of using this over {jsonFormula} function is that it can be performant if a single expression
 * has to be used for multiple json data instances.
 */
export class Formula {
  /**
   * Creates a Formula instance that can be executed later on with some data.
   * @param expression {string} the expression to evaluate
   * @param customFunctions {*} custom functions that the expressions uses.
   * @param stringToNumber {function} A function that converts string values to numbers. Can be used to convert currencies/dates to numbers
   * @param allowedGlobalNames {string[]} A list of names of the global variables being used in the expression.
   * @param debug {boolean} whether to return/log the debugging information
   * @param language
   */
  constructor(
    expression,
    customFunctions = {},
    stringToNumber = null,
    allowedGlobalNames = [],
    debug = [],
    language = 'en-US',
  ) {
    this.expression = expression;
    this.customFunctions = customFunctions;
    this.stringToNumber = stringToNumber;
    this.node = jmespath.compile(expression, allowedGlobalNames, debug);
    this.debug = debug;
    this.language = language;
  }

  /**
   * Evaluates the Formula on a particular json payload and return the result
   * @param json {object} the json data on which the expression needs to be evaluated
   * @param globals {*} global objects that can be accessed via custom functions.
   * @returns {*} the result of the expression being evaluated
   */
  search(json, globals) {
    return jmespath.search(
      this.node,
      json,
      globals,
      { ...this.customFunctions },
      this.stringToNumber,
      this.debug,
      this.language,
    );
  }
}

/**
 * Executes an expression on a given json and returns the result
 *
 * @param json {object} the json data on which the expression needs to be evaluated
 * @param globals {*} global objects that can be accessed via custom functions.
 * @param expression {string} the expression to evaluate
 * @param customFunctions {*} custom functions that the expressions uses.
 * @param stringToNumber {function} A function that converts string values to numbers. Can be used to convert currencies/dates to numbers
 * @param debug {boolean} whether to return/log the debugging information
 * @param language
 * @returns {*}
 */
// eslint-disable-next-line import/prefer-default-export
export function jsonFormula(
  json,
  globals,
  expression,
  customFunctions = {},
  stringToNumber = null,
  debug = [],
  language = 'en-US',
) {
  const formula = new Formula(
    expression,
    customFunctions,
    stringToNumber,
    Object.keys(globals),
    debug,
    language,
  );
  return formula.search(
    json,
    globals,
    { ...customFunctions },
    stringToNumber,
    debug,
    language,
  );
}
