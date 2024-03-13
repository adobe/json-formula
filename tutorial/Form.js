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

/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
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
  }
  const f = new Field();
  Object.defineProperty(f, '$name', { get: () => name });
  Object.defineProperty(f, '$value', { get: () => value });
  Object.defineProperty(f, '$readonly', { get: () => readonly });
  Object.defineProperty(f, '$required', { get: () => required });

  return f;
}

function createFieldset(fsname, isObj, fields, children) {
  class FieldsetObj {
    _add(k, v) {
      this[k] = v;
      children.push(v);
    }

    valueOf() { return Object.fromEntries(children.map(f => [f.$name, f.$value])); }
  }
  class FieldsetArray extends Array {
    _add(k, v) {
      this[k] = v;
      children.push(v);
    }

    valueOf() { return children; }
  }
  const fieldset = isObj ? new FieldsetObj() : new FieldsetArray();
  Object.defineProperty(fieldset, '$name', { get: () => fsname });
  Object.defineProperty(fieldset, '$fields', { get: () => fields });
  Object.defineProperty(fieldset, '$value', { get: () => fieldset.valueOf() });

  return fieldset;
}

function createFields(parent, childref, child) {
  const result = [];
  if (child instanceof Array) {
    // parent._add(childref, createFieldset(childref, false));
    parent._add(childref, createFieldset(childref, false, result, []));
    child.forEach((item, index) => {
      const fields = createFields(parent[childref], index, item);
      result.push(...fields);
    });
  } else if (child !== null && typeof child === 'object') {
    parent._add(childref, createFieldset(childref, true, result, []));
    Object.keys(child).forEach(k => {
      const fields = createFields(parent[childref], k, child[k]);
      result.push(...fields);
    });
  } else {
    const field = createField(childref, child);
    parent._add(childref, field);
    result.push(field);
  }
  return result;
}

export default function createForm(dataRoot) {
  // if it's not an object or array (a scalar) then don't bother trying to create a form
  if (dataRoot === null || typeof dataRoot !== 'object') return dataRoot;

  const allFields = [];
  const form = createFieldset('', !Array.isArray(dataRoot), allFields, []);
  Object.entries(dataRoot).forEach(([k, v]) => {
    allFields.push(...createFields(form, k, v));
  });
  return form;
}
