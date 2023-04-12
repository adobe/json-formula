/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import JsonFormula from '../src/json-formula.js';
import functions from '../src/jmespath/openFormulaFunctions.js';
import stringToNumber from '../src/jmespath/stringToNumber.js';

const docSamples = require('./docSamples.json');

const jsonFormula = new JsonFormula(functions, stringToNumber);

test.each(docSamples)('%s', (_desc, tst) => {
  const language = tst.language || 'en-US';
  let result;
  try {
    result = jsonFormula.search(tst.expression, null, {}, language);
  } catch (e) {
    expect(tst.error).toBe('syntax');
    return;
  }
  if (typeof result === 'number') {
    expect(result).toBeCloseTo(tst.expected, 5);
  } else {
    expect(result).toEqual(tst.expected);
  }
});
