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

const functions = require('./functions.json');

function toTestFmt(nm) {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const t = require(`./${nm}.json`);
  const tests = [];
  t.forEach(tst => {
    const { given, comment = '' } = tst;
    tst.cases.forEach(c => {
      const s = [c.comment || comment, c.expression].filter(x => typeof x === 'string' && x).join(' -> ');
      tests.push([s, {
        given,
        expression: c.expression,
        result: c.result,
        error: c.error,
        data: c.data,
        fieldsOnly: c.fieldsOnly,
        language: c.language,
        precedence: c.precedence,
      }]);
    });
  });
  return tests;
}

const jsonFormula = new JsonFormula(functions, stringToNumber);

function getData(tst) {
  let data = tst.given;
  if (tst.data) {
    if (typeof tst.data === 'string') {
      data = jsonFormula.search(tst.data, tst.given, {}, 'en-US');
    } else {
      data = tst.data;
    }
  }
  return data;
}

const globals = {
  $days: [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  ],
  $: 42,
  $$: 43,
};

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

function executeTest(desc, tst) {
  if (tst.fieldsOnly) return;
  const grammarResult = testGrammar(tst.expression);
  if (grammarResult === 'SyntaxError') expect(tst.error).not.toBeUndefined();
  if (tst.error === 'SyntaxError') expect(grammarResult).toBe('SyntaxError');

  let result;
  const data = getData(tst);
  globals.$form = data;
  const language = tst.language || 'en-US';

  try {
    result = jsonFormula.search(tst.expression, data, globals, language);
  } catch (e) {
    expect(tst.error).not.toBeUndefined();
    expect(e.name).toBe(tst.error);
    return;
  }
  if (typeof result === 'number') {
    expect(result).toBeCloseTo(tst.result, 5);
  } else {
    expect(result).toEqual(tst.result);
  }
}

function executeTestWithFields(desc, tst) {
  const data = getData(tst);
  const root = createForm(data);
  let result;
  globals.$form = data;
  const language = tst.language || 'en-US';

  try {
    const jsonResult = jsonFormula.search(
      tst.expression,
      root,
      globals,
      language,
    );
    // stringify/parse so that the comparison doesn't get confused by field objects
    result = JSON.parse(JSON.stringify(jsonResult));
  } catch (e) {
    expect(tst.error).not.toBeUndefined();
    expect(e.name).toBe(tst.error);
    return;
  }
  // expect(result).toEqual(tst.result === undefined ? tst.error : tst.result);
  if (typeof result === 'number') {
    expect(result).toBeCloseTo(tst.result, 5);
  } else {
    expect(result).toEqual(tst.result);
  }
}

const suites = [
  'basic', 'boolean',
  'current', 'docSamples', 'escape',
  'filters', 'functions',
  'identifiers', 'indices',
  'literal', 'multiselect',
  'pipe', 'slice', 'specSamples',
  'syntax', 'tests', 'unicode',
  'wildcard',
];

suites.forEach(suite => {
  describe(suite, () => {
    const tests = toTestFmt(suite);
    if (tests.length) {
      test.each(tests)('%s', executeTest);
    }
  });

  describe(`${suite} with fields`, () => {
    const tests = toTestFmt(suite);
    if (tests.length) {
      test.each(tests)('%s', executeTestWithFields);
    }
  });
});

describe('test precedence', () => {
  const tests = toTestFmt('precedence');
  test.each(tests)('%s', (_desc, tst) => {
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
});
