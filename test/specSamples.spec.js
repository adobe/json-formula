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
import testGrammar from './testGrammar.js';

const specSamples = require('./specSamples.json');

const jsonFormula = new JsonFormula(functions, stringToNumber);

test.each(specSamples)('%s', (expr, data, expected) => {
  const language = 'en-US';
  let result;
  try {
    const grammarResult = testGrammar(expr);
    expect(grammarResult).not.toBe('error');

    result = jsonFormula.search(
      expr,
      data,
      {
        $days: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
      },
      language,
    );
  } catch (e) {
    expect(expected).toBe('syntax');
    return;
  }
  if (typeof result === 'number') {
    expect(result).toBeCloseTo(expected, 5);
  } else {
    expect(result).toEqual(expected);
  }
});
