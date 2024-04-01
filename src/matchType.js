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
import { isClass } from './utils.js';

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
  TYPE_CLASS,
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

export function getType(inputObj, useValueOf = true) {
  if (inputObj === null) return TYPE_NULL;
  let obj = inputObj;
  if (useValueOf) {
    // check for the case where there's a child named 'valueOf' that's not a function
    // if so, then it's an object...
    if (typeof inputObj.valueOf === 'function') obj = inputObj.valueOf();
    else return TYPE_OBJECT;
  }
  if (isClass(obj)) return TYPE_CLASS;
  switch (Object.prototype.toString.call(obj)) {
    case '[object String]':
      return TYPE_STRING;
    case '[object Number]':
      return TYPE_NUMBER;
    case '[object Array]':
      if (obj.length === 0) return TYPE_EMPTY_ARRAY;
      if (obj.every(a => isArray(getType(a)))) return TYPE_ARRAY_ARRAY;
      if (obj.every(a => getType(a) === TYPE_NUMBER)) return TYPE_ARRAY_NUMBER;
      if (obj.every(a => getType(a) === TYPE_STRING)) return TYPE_ARRAY_STRING;
      return TYPE_ARRAY;
    case '[object Boolean]':
      return TYPE_BOOLEAN;
    case '[object Null]':
      return TYPE_NULL;
    default: // '[object Object]':
      // Check if it's an expref.  If it has, it's been
      // tagged with a jmespathType attr of 'Expref';
      if (obj.jmespathType === TOK_EXPREF) {
        return TYPE_EXPREF;
      }
      return TYPE_OBJECT;
  }
}

export function isArrayType(t) {
  return [
    TYPE_ARRAY, TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING, TYPE_ARRAY_ARRAY, TYPE_EMPTY_ARRAY,
  ].includes(getType(t));
}

export function getTypeName(arg) {
  return typeNameTable[getType(arg)];
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
  const exactMatch = expectedList.length > 1;
  const expected = expectedList[0];
  let wrongType = false;

  // Can't coerce objects and arrays to any other type
  if (isArray(actual)) {
    if ([TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING].includes(expected)) {
      if (argValue.some(a => {
        const t = getType(a);
        // can't coerce arrays or objects to numbers or strings
        return isArray(t) || isObject(t);
      })) wrongType = true;
    }
  }
  // nothing coerces to a class or object
  if (exactMatch && [TYPE_CLASS, TYPE_OBJECT].includes(expected)) wrongType = true;

  if (wrongType || exactMatch) {
    throw typeError(`${context} cannot process type: ${typeNameTable[actual]}`);
  }
  // Can't coerce Objects and arrays to anything other than boolean
  if (isObject(actual) && expected === TYPE_BOOLEAN) {
    return Object.keys(argValue).length === 0;
  }
  // no exact match, see if we can coerce an array type
  if (isArray(actual)) {
    const toArray = a => (Array.isArray(a) ? a : [a]);
    if (expected === TYPE_BOOLEAN) return argValue.length > 0;
    if (expected === TYPE_ARRAY_STRING) return argValue.map(toString);
    if (expected === TYPE_ARRAY_NUMBER) return argValue.map(toNumber);
    if (expected === TYPE_ARRAY_ARRAY) return argValue.map(toArray);
  }

  if (!isArray(actual) && !isObject(actual)) {
    if (expected === TYPE_ARRAY_STRING) return actual === TYPE_NULL ? [] : [toString(argValue)];
    if (expected === TYPE_ARRAY_NUMBER) return actual === TYPE_NULL ? [] : [toNumber(argValue)];
    if (expected === TYPE_ARRAY) return actual === TYPE_NULL ? [] : [argValue];
    if ([TYPE_ARRAY_ARRAY, TYPE_EMPTY_ARRAY].includes(expected) && actual === TYPE_NULL) return [];
    if (expected === TYPE_NUMBER) return toNumber(argValue);
    if (expected === TYPE_STRING) return toString(argValue);
    if (expected === TYPE_BOOLEAN) return !!argValue;
    if (expected === TYPE_OBJECT && actual === TYPE_NULL) return {};
  }

  throw typeError(`${context} expected argument to be type ${typeNameTable[expected]} but received type ${typeNameTable[actual]} instead.`);
}
