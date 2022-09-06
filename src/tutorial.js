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

/* global window, document, fetch */
import { jsonFormula } from './json-formula';
import createForm from './Form';
import stringToNumber from './jmespath/stringToNumber';

window.addEventListener('load', () => {
  const dataElement = document.getElementById('data');
  const expression = document.getElementById('expression');
  const result = document.getElementById('result');
  const debug = document.getElementById('debug');

  const d = window.localStorage.getItem('data');
  if (d) dataElement.value = d;
  const exp = window.localStorage.getItem('expression');
  if (exp) expression.value = exp;

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

    const debugInfo = [];
    try {
      const jsonResult = jsonFormula(
        jsonData,
        { $form: jsonData, $: {} },
        input,
        true,
        stringToNumber,
        debugInfo,
      );
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
  document.getElementById('canned').addEventListener('change', e => {
    expression.value = e.target.value;
    run();
  });
  run();

  fetch('../antlr/JSONFormula.g4').then(r => {
    r.text().then(g4 => {
      document.getElementById('grammar-out').innerHTML = g4;
    });
  });
});
