/* eslint-disable no-param-reassign */
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
/* eslint-disable class-methods-use-this */
/* eslint-disable-next-line max-classes-per-file */
import { jsonFormula } from './json-formula';
import Form from './Form';

window.addEventListener('load', () => {
  const dataElement = document.getElementById('data');
  const expression = document.getElementById('expression');
  const result = document.getElementById('result');

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
    let root = null;
    const fieldData = {};
    let jsonData;
    try {
      jsonData = JSON.parse(dataElement.value);
      if (useFields) {
        root = new Form(fieldData, jsonData);
      }
    } catch (e) {
      result.value = e.toString();
      return;
    }

    try {
      const jsonResult = jsonFormula(
        useFields ? fieldData.data : jsonData,
        { $form: root, $: {} },
        input,
        true,
      );
      const r = jsonResult === null || jsonResult === undefined ? jsonResult : jsonResult.valueOf();
      if (typeof r === 'object') {
        result.value = JSON.stringify(r, null, 2);
      } else {
        result.value = r;
      }
    } catch (e) {
      result.value = e.toString();
    }
  }

  dataElement.addEventListener('blur', run);
  expression.addEventListener('blur', run);
  run();

  fetch('../antlr/JSONFormula.g4').then(r => {
    r.text().then(g4 => {
      document.getElementById('grammar-out').innerHTML = g4;
    });
  });
});
