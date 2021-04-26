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
import evaluate from "./evaluate.js";

window.addEventListener("load", () => {
  const data = document.getElementById("data");
  const expression = document.getElementById("expression");
  const result = document.getElementById("result");

  /*
    Field class allows objects to evaluate correctly according to context.
    - if used in an expression, will return a value or string.
    - for JSON.stringify() returns a scalar
    - BUT also allows explicit access to properties. e.g. field.required, field.name etc.

    Should allow us to eliminate getFieldProperty()
  */

  function createField(name, value, readonly = false, required = true) {
    class Field {
      valueOf() { return value }
      toString() { return value.toString() }
      toJSON() { return value }
      // Use getters and scope variables so that the children are not enumerable
      get value() { return value }
      get name() { return name }
      get readonly() { return readonly }
      get required() { return required }
      get "@value"() { return value }
      get "@name"() { return name }
      get "@readonly"() { return readonly }
      get "@required"() { return required }
    }
    return new Field();
  }
  function createFields(parent, childref, child) {
    if (child instanceof Array) {
      child.forEach((item, index) => {
        createFields(child, index, item);
      });
    } else if (typeof child === "object") {
      Object.keys(child).forEach(k => {
        createFields(child, k, child[k]);
      })
    } else {
      parent[childref] = createField(childref, parent[childref]);
    }
  }

  function isField(test) {
    return  test !== null &&
      typeof(test) === "object" &&
      test.__proto__.constructor.name === "Field";
  }

  function run() {
    const input = expression.value;

    let json;
    try {
      json = JSON.parse(data.value);
      if (document.getElementById("use-fields").checked) {
        createFields(null, null, json);
      }
    } catch (e) {
      result.value = e.toString();
      return;
    }

    try {
      const r = evaluate(json, input, true);
      if (isField(r)) {
        result.value = r.value;
      } else if (typeof r === "object") {
        result.value = JSON.stringify(r, null, 2);
      } else {
        result.value = r;
      }
    } catch (e) {
      result.value = e.toString();
    }
  }

  data.addEventListener("blur", run);
  expression.addEventListener("blur", run);
  run();

  fetch("../antlr/JSONFormula.g4").then(r => {
    r.text().then((g4 => document.getElementById("grammar-out").innerHTML = g4));
  });
});
