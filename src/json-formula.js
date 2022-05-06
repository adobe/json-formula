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

export class Formula {
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
