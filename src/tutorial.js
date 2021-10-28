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

window.addEventListener('load', () => {
  const data = document.getElementById('data');
  const expression = document.getElementById('expression');
  const result = document.getElementById('result');
  const allFields = [];

  const d = window.localStorage.getItem('data');
  if (d) data.value = d;
  const exp = window.localStorage.getItem('expression');
  if (exp) expression.value = exp;

  /*
    Field class allows objects to evaluate correctly according to context.
    - if used in an expression, will return a value or string.
    - for JSON.stringify() returns a scalar
    - BUT also allows explicit access to properties. e.g. field.required, field.name etc.

    Should allow us to eliminate getFieldProperty()
  */

  function createField(name, value, readonly = false, required = true) {
    class Field {
      valueOf() { return value; }

      toString() { return value.toString(); }

      toJSON() { return value; }

      equals(compare) {
        if (compare === null || compare === undefined) return this.valueOf() === compare;

        return this.valueOf() === compare.valueOf();
      }

      // Use getters and scope variables so that the children are not enumerable
      get value() { return value; }

      get name() { return name; }

      get readonly() { return readonly; }

      get required() { return required; }

      get '@value'() { return value; }

      get '@name'() { return name; }

      get '@readonly'() { return readonly; }

      get '@required'() { return required; }
    }
    const newField = new Field();
    allFields.push(newField);
    return newField;
  }
  function createFields(parent, childref, child) {
    if (child instanceof Array) {
      child.forEach((item, index) => {
        createFields(child, index, item);
      });
    } else if (child !== null && typeof child === 'object') {
      Object.keys(child).forEach(k => {
        createFields(child, k, child[k]);
      });
    } else {
      // eslint-disable-next-line no-param-reassign
      parent[childref] = createField(childref, parent[childref]);
    }
  }

  class Root {
    constructor(dataRoot) {
      Object.keys(dataRoot).forEach(key => {
        this[key] = dataRoot[key];
      });
    }

    get fields() { return allFields; }
  }

  function run() {
    // save for next time...
    window.localStorage.setItem('data', data.value);
    window.localStorage.setItem('expression', expression.value);
    const input = expression.value;

    let json;
    try {
      json = JSON.parse(data.value);
      const root = new Root(json);
      json.$ = root;
      if (document.getElementById('use-fields').checked) {
        createFields(null, null, json);
      }
    } catch (e) {
      result.value = e.toString();
      return;
    }

    try {
      const jsonResult = jsonFormula(json, input, true);
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

  data.addEventListener('blur', run);
  expression.addEventListener('blur', run);
  run();

  fetch('../antlr/JSONFormula.g4').then(r => {
    r.text().then(g4 => {
      document.getElementById('grammar-out').innerHTML = g4;
    });
  });
});
