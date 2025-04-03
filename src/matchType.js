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
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { dataTypes, typeNameTable } from './dataTypes.js';
import tokenDefinitions from './tokenDefinitions.js';
import { typeError } from './errors.js';
// import { isClass } from './utils.js';

const {
  TYPE_NUMBER,
  TYPE_ANY,
  TYPE_STRING,
  TYPE_ARRAY,
  TYPE_OBJECT,
  TYPE_BOOLEAN,
  TYPE_EXPREF,
  TYPE_NULL,
  TYPE_ARRAY_NUMBER,
  TYPE_ARRAY_STRING,
  TYPE_ARRAY_ARRAY,
  TYPE_EMPTY_ARRAY,
} = dataTypes;

const {
  TOK_EXPREF,
} = tokenDefinitions;

function isArray(t) {
  return [
    TYPE_ARRAY, TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING, TYPE_ARRAY_ARRAY, TYPE_EMPTY_ARRAY,
  ].includes(t);
}

export function getType(inputObj) {
  function simpleType(obj) {
    if (obj === null) return TYPE_NULL;
    const t = typeof obj;
    if (t === 'string') return TYPE_STRING;
    if (t === 'number') return TYPE_NUMBER;
    if (t === 'boolean') return TYPE_BOOLEAN;
    if (Array.isArray(obj)) {
      if (obj.length === 0) return TYPE_EMPTY_ARRAY;
      if (obj.flat(Infinity).every(a => getType(a) === TYPE_NUMBER)) return TYPE_ARRAY_NUMBER;
      if (obj.flat(Infinity).every(a => getType(a) === TYPE_STRING)) return TYPE_ARRAY_STRING;
      if (obj.every(a => isArray(getType(a)))) return TYPE_ARRAY_ARRAY;
      return TYPE_ARRAY;
    }
    // Check if it's an expref.  If it has, it's been
    // tagged with a jmespathType attr of 'Expref';
    if (obj.jmespathType === TOK_EXPREF) return TYPE_EXPREF;
    return TYPE_OBJECT;
  }
  let type = simpleType(inputObj);
  if (type !== TYPE_OBJECT) return type;
  // if inputObj is a class, then convert it to its base type via JSON
  const obj = JSON.parse(JSON.stringify(inputObj));
  type = simpleType(obj);
  return type;
}

export function isArrayType(t) {
  return [
    TYPE_ARRAY, TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING, TYPE_ARRAY_ARRAY, TYPE_EMPTY_ARRAY,
  ].includes(getType(t));
}

export function getTypeName(arg) {
  return typeNameTable[getType(arg)];
}

function supportedConversion(from, to) {
  const pairs = {
    [TYPE_NUMBER]: [
      TYPE_STRING,
      TYPE_ARRAY,
      TYPE_ARRAY_NUMBER,
      TYPE_BOOLEAN,
    ],
    [TYPE_BOOLEAN]: [
      TYPE_STRING,
      TYPE_NUMBER,
      TYPE_ARRAY,
    ],
    [TYPE_ARRAY]: [TYPE_BOOLEAN, TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER],
    [TYPE_ARRAY_NUMBER]: [TYPE_BOOLEAN, TYPE_ARRAY_STRING, TYPE_ARRAY],
    [TYPE_ARRAY_STRING]: [TYPE_BOOLEAN, TYPE_ARRAY_NUMBER, TYPE_ARRAY],
    [TYPE_ARRAY_ARRAY]: [TYPE_BOOLEAN],
    [TYPE_EMPTY_ARRAY]: [TYPE_BOOLEAN],

    [TYPE_OBJECT]: [TYPE_BOOLEAN],
    [TYPE_NULL]: [
      TYPE_STRING,
      TYPE_NUMBER,
      TYPE_BOOLEAN,
    ],
    [TYPE_STRING]: [
      TYPE_NUMBER,
      TYPE_ARRAY_STRING,
      TYPE_ARRAY,
      TYPE_BOOLEAN],
  };
  return pairs[from].includes(to);
}

export function matchType(expectedList, argValue, context, toNumber, toString) {
  const actual = getType(argValue);
  if (argValue?.jmespathType === TOK_EXPREF && !expectedList.includes(TYPE_EXPREF)) {
    throw typeError(`${context} does not accept an expression reference argument.`);
  }
  const isObject = t => t === TYPE_OBJECT;
  const match = (expect, found) => expect === found
    || expect === TYPE_ANY
    || (expect === TYPE_ARRAY && isArray(found))
    || (isArray(expect) && found === TYPE_EMPTY_ARRAY);

  if (expectedList.some(type => match(type, actual))) return argValue;

  // if the function allows multiple types, we can't coerce the type and we need an exact match
  // Of the set of expected types, filter out the ones that can be coerced from the actual type
  const filteredList = expectedList.filter(t => supportedConversion(actual, t));
  if (filteredList.length === 0) {
    throw typeError(`${context} expected argument to be type ${typeNameTable[expectedList[0]]} but received type ${typeNameTable[actual]} instead.`);
  }
  const exactMatch = filteredList.length > 1;
  const expected = filteredList[0];
  let wrongType = false;

  // Can't coerce objects and arrays to any other type
  if (isArray(actual)) {
    if ([TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING].includes(expected)) {
      if (argValue.flat(Infinity).some(a => {
        const t = getType(a);
        // can't coerce arrays or objects to numbers or strings
        return isArray(t) || isObject(t);
      })) wrongType = true;
    }
  }
  // nothing coerces to an object
  if (exactMatch && expected === TYPE_OBJECT) wrongType = true;

  if (exactMatch) {
    throw typeError(`${context} cannot process type: ${typeNameTable[actual]}. Must be one of: ${expectedList.map(t => typeNameTable[t]).join(', ')}.`);
  }
  if (wrongType) {
    throw typeError(`${context} expected argument to be type ${typeNameTable[expected]} but received type ${typeNameTable[actual]} instead.`);
  }
  // Can't coerce Objects and arrays to anything other than boolean
  if (isObject(actual) && expected === TYPE_BOOLEAN) {
    return Object.keys(argValue).length === 0;
  }

  // no exact match, see if we can coerce an array type
  if (isArray(actual)) {
    const toArray = a => (Array.isArray(a) ? a : [a]);
    const coerceString = a => (Array.isArray(a) ? a.map(coerceString) : toString(a));
    const coerceNumber = a => (Array.isArray(a) ? a.map(coerceNumber) : toNumber(a));

    if (expected === TYPE_BOOLEAN) return argValue.length > 0;
    if (expected === TYPE_ARRAY_STRING) return argValue.map(coerceString);
    if (expected === TYPE_ARRAY_NUMBER) return argValue.map(coerceNumber);
    if (expected === TYPE_ARRAY_ARRAY) return argValue.map(toArray);
  }

  if (!isArray(actual) && !isObject(actual)) {
    if (expected === TYPE_ARRAY_STRING) return [toString(argValue)];
    if (expected === TYPE_ARRAY_NUMBER) return [toNumber(argValue)];
    if (expected === TYPE_ARRAY) return [argValue];
    if (expected === TYPE_NUMBER) return toNumber(argValue);
    if (expected === TYPE_STRING) return toString(argValue);
    if (expected === TYPE_BOOLEAN) return !!argValue;
  }

  throw typeError(`${context} expected argument to be type ${typeNameTable[expected]} but received type ${typeNameTable[actual]} instead.`);
}
