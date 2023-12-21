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
import stringToNumber from '../src/stringToNumber.js';
import testGrammar from './testGrammar.js';

const sampleData = require('./sampleData.json');
const tests = require('./tests.json');
const docSamples = require('./docSamples.json');
const specSamples = require('./specSamples.json');
const precedence = require('./precedence.json');

const jsonFormula = new JsonFormula({}, stringToNumber);

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
      @,
      &merge(accumulated, fromEntries([[current, 1 + value(accumulated, current)]])),
      fromEntries(map(@, &[@, 0]))
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
// in case running only specific tests update the filter clause
// eslint-disable-next-line no-unused-vars
const filterClause = ([_desc, _tst]) => true;

[tests, docSamples, specSamples, precedence].forEach(testSuite => {
  const filtered = testSuite.filter(filterClause);

  test.each(filtered)('%s', (_desc, tst) => {
    if (tst.fieldsOnly) return;
    const language = tst.language || 'en-US';
    let data;
    if (typeof tst.data === 'string') {
      data = jsonFormula.search(tst.data, sampleData, {}, language);
    } else {
      data = tst.data || {};
    }
    let result;
    try {
      result = jsonFormula.search(
        tst.expression,
        data,
        {
          $: 42,
          $$: 43,
          $days: [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
          ],
        },
        language,
      );
    } catch (e) {
      expect(tst.error).toBeDefined();
      expect(tst.error).toBe(e.name);
      return;
    }
    if (typeof result === 'number') {
      expect(result).toBeCloseTo(tst.expected, 5);
    } else {
      expect(result).toEqual(tst.expected);
    }
  });
});

// run again -- with field definitions
[tests, docSamples, specSamples, precedence].forEach(testSuite => {
  const filtered = testSuite.filter(filterClause);

  test.each(filtered)('%s', (_desc, tst) => {
    const grammarResult = testGrammar(tst.expression);
    if (grammarResult === 'error') expect(tst.error).toBe('syntax');
    else expect(tst.error).not.toBe('syntax');

    const language = tst.language || 'en-US';
    let data;
    if (typeof tst.data === 'string') {
      data = jsonFormula.search(tst.data, sampleData, {}, language);
    } else {
      data = tst.data || {};
    }
    let jsonResult;
    try {
      const root = createForm(data);
      jsonResult = jsonFormula.search(
        tst.expression,
        root,
        {
          $form: root,
          $: 42,
          $$: 43,
          $days: [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
          ],
        },
        language,
      );
    } catch (e) {
      expect(tst.error).toBeDefined();
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
});

test.each(precedence)('%s', (_desc, tst) => {
  // check that the precedence computed by antlr matches our implementation
  const grammarResult = testGrammar(tst.expression);
  const tree = grammarResult.toStringTree()
    // clean up extra brackets to make the output easier to read
    .replace(/\[[0-9 ]*\]/g, '')
    .replace(/ /g, '')
    .replace(/\(\(([^(]+)\)\)/g, '$1')
    .replace(/\(([`0-9]+)\)/g, '$1')
    .replace(/\(\((true\(\)|false\(\))\)\)/g, '$1')
    .replace(/^\(\(/, '')
    .replace(/\)<EOF>\)/, '');
  expect(tree).toBe(tst.precedence);
});
