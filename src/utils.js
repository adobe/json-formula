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

export function isArray(obj) {
  return Array.isArray(obj);
}

export function isObject(obj) {
  if (obj !== null) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  return false;
}

export function getValueOf(a) {
  if (a === null || a === undefined) return a;
  if (isArray(a)) {
    return a.map(i => getValueOf(i));
  }
  // if we have a child named 'valueOf' then we're an object,
  // and just return the object.
  if (typeof (a.valueOf) !== 'function') return a;
  return a.valueOf();
}

export function toBoolean(param) {
  if (param === null) return false;
  // in case it's an object with a valueOf defined
  const val = getValueOf(param);

  // empty arrays are false
  if (Array.isArray(val)) return val.length > 0;
  // empty objects are false
  if (isObject(val)) return Object.keys(val).length > 0;
  return !!val;
}

export function strictDeepEqual(lhs, rhs) {
  const first = getValueOf(lhs);
  const second = getValueOf(rhs);
  // Check the scalar case first.
  if (first === second) {
    return true;
  }

  // Check if they are the same type.
  const firstType = Object.prototype.toString.call(first);
  if (firstType !== Object.prototype.toString.call(second)) {
    return false;
  }
  // We know that first and second have the same type so we can just check the
  // first type from now on.
  if (isArray(first) === true) {
    // Short circuit if they're not the same length;
    if (first.length !== second.length) return false;
    return first.every((f, i) => strictDeepEqual(f, second[i]));
  }
  if (isObject(first) === true) {
    if (Object.keys(first).length !== Object.keys(second).length) return false;
    // An object is equal if it has the same key/value pairs.
    // eslint-disable-next-line no-restricted-syntax
    for (const key in first) {
      if (hasOwnProperty.call(first, key)) {
        if (strictDeepEqual(first[key], second[key]) === false) return false;
      }
    }
    return true;
  }
  return false;
}

export function getProperty(obj, key) {
  const desc = Object.getOwnPropertyDescriptor(obj, key);
  // if it's a regular enumerable property or if it's configured with a getter,
  // then return it.
  // if it's a built-in property such as length or toString etc. we'll want to ignore it.
  if (desc?.enumerable || !!desc?.get) {
    // for applications that want to track which properties are accessed, allow for a special
    // hook to callback and register this key/value accessor.
    obj[key]?.[Symbol.for('track')]?.(obj, key);
    return obj[key];
  }
  return undefined;
}

export function debugAvailable(debug, obj, key, chainStart = null) {
  try {
    let available = [];
    if (isArray(obj) && obj.length > 0) {
      debug.push(`Failed to find: '${key}' on an array object.`);
      debug.push(`Did you mean to use a projection? e.g. ${chainStart || 'array'}[*].${key}`);
      return;
    }
    debug.push(`Failed to find: '${key}'`);
    if (obj !== null) {
      available = [...available, ...Object.entries(Object.getOwnPropertyDescriptors(obj, key))
        .filter(([k, desc]) => (desc?.enumerable || !!desc?.get) && !/^[0-9]+$/.test(k) && (!k.startsWith('$') || key.startsWith('$')))
        .map(([k]) => `'${k}'`)];
    }
    if (available.length) debug.push(`Available fields: ${available}`);
  // eslint-disable-next-line no-empty
  } catch (e) {}
}

export function isClass(obj) {
  if (obj === null) return false;
  if (Array.isArray(obj)) return false;
  return !['Object', 'Boolean', 'Number', 'String'].includes(obj.constructor.name);
}
