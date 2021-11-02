/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/*
    Field class allows objects to evaluate correctly according to context.
    - if used in an expression, will return a value or string.
    - for JSON.stringify() returns a scalar
    - BUT also allows explicit access to properties. e.g. field.required, field.name etc.

    Should allow us to eliminate getFieldProperty()
  */

const allFields = [];
allFields.length = 0;

function createField(name, value, readonly = false, required = true) {
  class Field {
    valueOf() { return value; }

    toString() { return value.toString(); }

    toJSON() { return value; }

    // Use getters and scope variables so that the children are not enumerable
    get '$value'() { return value; }

    get '$name'() { return name; }

    get '$readonly'() { return readonly; }

    get '$required'() { return required; }
  }
  const newField = new Field();
  allFields.push(newField);
  return newField;
}
function createFields(parent, childref, child) {
  if (child instanceof Array) {
    parent[childref] = [];
    child.forEach((item, index) => {
      createFields(parent[childref], index, item);
    });
  } else if (child !== null && typeof child === 'object') {
    parent[childref] = {};
    Object.keys(child).forEach(k => {
      createFields(parent[childref], k, child[k]);
    });
  } else {
    // eslint-disable-next-line no-param-reassign
    parent[childref] = createField(childref, child);
  }
}

let fd;

export default class Form {
  constructor(fieldData, dataRoot) {
    fd = fieldData;
    createFields(fieldData, 'data', dataRoot);
    Object.keys(fieldData.data).forEach(k => {
      this[k] = fieldData.data[k];
    });
  }

  valueOf() { return fd.data; }

  stringify() { return JSON.stringify(fd.data, null, 2); }

  get '$fields'() { return allFields; }
}
