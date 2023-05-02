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
import JsonFormula from '../src/json-formula.js';
import createForm from '../tutorial/Form.js';
import functions from '../src/jmespath/openFormulaFunctions.js';
import stringToNumber from '../src/jmespath/stringToNumber.js';

const sampleData = require('./sampleData.json');
const tests = require('./tests.json');

const jsonFormula = new JsonFormula(functions, stringToNumber);

/*
Register the 'summarize' function.  Given:
{"array": ["a", "b", "c", "d", "a", "b"]}
The expression:
summarize(array)
returns:
{
  "a": 2,
  "b": 2,
  "c": 1,
  "d": 1
}
*/
jsonFormula.search(
  `register("summarize",
    &reduce(
      &merge(accumulated, fromEntries([[current, 1 + value(accumulated, current)]])),
      @,
      fromEntries(map(&[@, 0], @))
    )
  )`,
  {},
);

/*
Register the 'localDate' function.  Given:
"yyyy-mm-dd" return a date value.
*/
jsonFormula.search(
  `register(
    "localDate",
    &split(@, "-") | datetime(@[0], @[1], @[2]))`,
  {},
);

/*
Register the 'product' function to multiply two parameters.
product([4,5]) // 20
*/
jsonFormula.search(
  'register("product", &@[0] * [1])',
  {},
);

const filtered = tests //.filter(([_desc]) => _desc === 'value(1)')

test.each(filtered)('%s', (_desc, tst) => {
  if (tst.fieldsOnly) return;
  const language = tst.language || 'en-US';
  const data = jsonFormula.search(tst.data, sampleData, {}, language);
  let result;
  try {
    result = jsonFormula.search(tst.expression, data, { $: 42 }, language);
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

// run again -- with field definitions
test.each(filtered)('%s', (_desc, tst) => {
  const language = tst.language || 'en-US';
  const data = jsonFormula.search(tst.data, sampleData, {}, language);
  let jsonResult;
  try {
    const root = createForm(data);
    jsonResult = jsonFormula.search(
      tst.expression,
      root,
      { $form: root, $: { valueOf: () => 42 } },
      language,
    );
  } catch (e) {
    expect(tst.error).toBe('syntax');
    return;
  }
  // stringify/parse so that the comparison doesn't get confused by field objects
  const result = JSON.parse(JSON.stringify(jsonResult));
  if (typeof result === 'number') {
    expect(result).toBeCloseTo(tst.expected, 5);
  } else {
    expect(result).toEqual(tst.expected);
  }
});
