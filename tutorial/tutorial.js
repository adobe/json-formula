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

/* global window, document */
import Formula from '../src/json-formula.js';
import createForm from './Form.js';
import stringToNumber from '../src/stringToNumber.js';

window.addEventListener('load', () => {
  const dataElement = document.getElementById('data');
  const expression = document.getElementById('expression');
  const result = document.getElementById('result');
  const debug = document.getElementById('debug');
  const debugInfo = [];
  // keep one instance active for the entire session so that any registered
  // functions are retained
  const formula = new Formula({}, stringToNumber, debugInfo);
  const defaultData = `{
    "address": {
      "street": "12 Oak St",
      "city": "San Jose",
      "state": "CA",
      "country": "USA",
      "phone": "1234561234"
    },
    "items": [
      {
        "desc": "pens",
        "quantity": 2,
        "price": 3.23
      },
      {
        "desc": "pencils",
        "quantity": 3,
        "price": 1.34
      }
    ],
    "tax": 1.13
  }`;

  const params = new URLSearchParams(document.location.search);
  if (params.has('sample')) {
    const sampleJSON = JSON.parse(atob(params.get('sample')));
    if (sampleJSON.data) dataElement.value = JSON.stringify(sampleJSON.data, null, 2);
    if (sampleJSON.expression) expression.value = sampleJSON.expression;
    if (sampleJSON.description) {
      document.getElementById('description-row').style.display = 'table-row';
      document.getElementById('description').innerText = sampleJSON.description;
    }
    Array.from(document.getElementsByClassName('controls')).forEach(c => c.classList.add('hidden'));
  } else {
    const d = window.localStorage.getItem('data');
    if (d) dataElement.value = d;
    else dataElement.value = defaultData;
    const exp = window.localStorage.getItem('expression');
    if (exp) expression.value = exp;
    else expression.value = 'sum(items[*].price * items[*].quantity)';
  }

  function run() {
    // save for next time...
    window.localStorage.setItem('data', dataElement.value);
    window.localStorage.setItem('expression', expression.value);
    const input = expression.value;
    const useFields = document.getElementById('use-fields').checked;
    let jsonData;
    try {
      jsonData = JSON.parse(dataElement.value);
      if (useFields) {
        jsonData = createForm(jsonData);
      }
    } catch (e) {
      result.value = e.toString();
      return;
    }

    try {
      const jsonResult = formula.search(input, jsonData, {});
      debug.innerHTML = debugInfo.join('\n');
      let r = jsonResult;
      if (jsonResult !== null && jsonResult !== undefined) {
        r = jsonResult.valueOf.call(jsonResult);
      }
      if (typeof r === 'object') {
        result.value = JSON.stringify(r, null, 2);
      } else {
        result.value = r;
      }
    } catch (e) {
      result.value = e.toString();
      debug.innerHTML = debugInfo.join('\n');
    }
  }

  dataElement.addEventListener('blur', run);
  expression.addEventListener('blur', run);
  document.getElementById('data-reset').addEventListener(
    'click',
    () => {
      dataElement.value = defaultData;
      if (params.has('sample')) {
        expression.value = 'sum(items[*].price * items[*].quantity)';
        document.getElementById('description-row').style.display = 'none';
        Array.from(document.getElementsByClassName('controls')).forEach(c => c.classList.remove('hidden'));
        window.history.pushState({}, document.title, '/');
        run();
      }
    },
  );
  document.getElementById('canned').addEventListener('change', e => {
    expression.value = e.target.value;
    run();
  });
  run();

  fetch('../antlr/JsonFormula.g4').then(r => {
    r.text().then(g4 => {
      // remove comments and processing directives.
      const strippedGrammar = g4
        .replace(/[\s\S.]*grammar/m, 'grammar')
        .replace(/#.*/g, '');
      document.getElementById('grammar-out').innerHTML = strippedGrammar;
    });
  });
});
