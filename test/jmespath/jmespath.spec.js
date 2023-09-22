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

import JsonFormula from '../../src/json-formula.js';
import createForm from '../../tutorial/Form.js';
import stringToNumber from '../../src/stringToNumber.js';
import testGrammar from '../testGrammar.js';

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
        given, expression: c.expression, result: c.result, error: c.error,
      }]);
    });
  });
  return tests;
}

const jsonFormula = new JsonFormula(functions, stringToNumber);

function executeTest(desc, tst) {
  const grammarResult = testGrammar(tst.expression);
  if (grammarResult === 'error') expect(tst.error).toBe('syntax');
  else expect(tst.error).not.toBe('syntax');

  let result;
  try {
    result = jsonFormula.search(tst.expression, tst.given);
  } catch (e) {
    expect(tst.error).not.toBeUndefined();
    return;
  }
  expect(result).toEqual(tst.result === undefined ? tst.error : tst.result);
}

function executeTestWithFields(desc, tst) {
  const root = createForm(tst.given);
  let result;
  try {
    const jsonResult = jsonFormula.search(
      tst.expression,
      root,
      { $form: root, $: {} },
    );
    result = JSON.parse(JSON.stringify(jsonResult));
  } catch (e) {
    expect(tst.error).not.toBeUndefined();
    return;
  }
  expect(result).toEqual(tst.result === undefined ? tst.error : tst.result);
}

const suites = [
  'basic', 'boolean',
  'current', 'escape',
  'filters', 'functions',
  'identifiers', 'indices',
  'literal', 'multiselect',
  'pipe', 'slice',
  'syntax', 'unicode',
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
