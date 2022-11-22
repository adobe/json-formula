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

NOTICE:
This file is substantially modified from the original source taken from:
https://github.com/jmespath/jmespath.js

*/

/* eslint-disable no-underscore-dangle */
import dataTypes from './dataTypes';

export default function functions(
  interpreter,
  isObject,
  isArray,
  toNumber,
  getTypeName,
  valueOf,
  toString,
) {
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
  } = dataTypes;

  function createKeyFunction(exprefNode, allowedTypes) {
    return x => {
      const current = interpreter.visit(exprefNode, x);
      if (allowedTypes.indexOf(getTypeName(current)) < 0) {
        const msg = `TypeError: expected one of ${allowedTypes
        }, received ${getTypeName(current)}`;
        throw new Error(msg);
      }
      return current;
    };
  }

  return {
    // name: [function, <signature>]
    // The <signature> can be:
    //
    // {
    //   args: [[type1, type2], [type1, type2]],
    //   variadic: true|false
    // }
    //
    // Each arg in the arg list is a list of valid types
    // (if the function is overloaded and supports multiple
    // types.  If the type is "any" then no type checking
    // occurs on the argument.  Variadic is optional
    // and if not provided is assumed to be false.
    /**
     * Returns the absolute value of the provided argument `value`.
     * @param {number} value argument whose absolute value has to be returned
     * @return {number} returns the absolute value of the `value` argument
     * @function abs
     * @example
     * abs(-1) //returns 1
     * @category jmespath
     */
    abs: {
      _func: resolvedArgs => Math.abs(resolvedArgs[0]),
      _signature: [{ types: [TYPE_NUMBER] }],
    },
    /**
     * Returns the average of the elements in the provided array.
     * An empty array will produce a return value of `null`.
     * @param {number[]} elements array of elements whose average has to be computed
     * @return {number} average value
     * @function avg
     * @example
     * avg([]) //returns null
     * @example
     * avg([1, 2, 3]) //returns 2
     * @category jmespath
     */
    avg: {
      _func: resolvedArgs => {
        let sum = 0;
        const inputArray = resolvedArgs[0];
        inputArray.forEach(a => {
          sum += a;
        });
        return sum / inputArray.length;
      },
      _signature: [{ types: [TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Returns the next highest integer value of the argument `num` by rounding up if necessary.
     * @param {number} num number whose next highest integer value has to be computed
     * @return {number}
     * @function ceil
     * @example
     * ceil(10) //returns 10
     * @example
     * ceil(10.4) //return 11
     * @category jmespath
     */
    ceil: {
      _func: resolvedArgs => Math.ceil(resolvedArgs[0]),
      _signature: [{ types: [TYPE_NUMBER] }],
    },
    /**
     * Returns true if the given `subject` contains the provided `search` string.
     * If `subject` is an array, this function returns true if one of the elements
     * in the array is equal to the provided `search` value. If the provided `subject`
     *  is a string, this function returns true if the string contains the provided
     * `search` argument.
     * @param {array|string} subject the subject in which the element has to be searched
     * @param {string|boolean|number|date} search element to search
     * @return {boolean}
     * @function contains
     * @example
     * contains([1, 2, 3, 4], 2) //returns true
     * @example
     * contains([1, 2, 3, 4], -1) //returns false
     * @example
     * contains('Abcd', 'd') //returns true
     * @example
     * contains('Abcd', 'x') //returns false
     * @category jmespath
     */
    contains: {
      _func: resolvedArgs => valueOf(resolvedArgs[0]).indexOf(valueOf(resolvedArgs[1])) >= 0,
      _signature: [{ types: [TYPE_STRING, TYPE_ARRAY] },
        { types: [TYPE_ANY] }],
    },
    /**
     * Returns true if the `subject` ends with the `suffix`, otherwise this function returns false.
     * @param {string} subject subject in which the `suffix` is being searched for
     * @param {string} suffix suffix to search in the subject
     * @return {boolean}
     * @function endsWith
     * @example
     * endsWith('Abcd', 'd') //returns true
     * @example
     * endsWith('Abcd', 'A') //returns false
     * @category jmespath
     */
    endsWith: {
      _func: resolvedArgs => {
        const searchStr = valueOf(resolvedArgs[0]);
        const suffix = valueOf(resolvedArgs[1]);
        return searchStr.indexOf(suffix, searchStr.length - suffix.length) !== -1;
      },
      _signature: [{ types: [TYPE_STRING] }, { types: [TYPE_STRING] }],
    },

    /**
     * Returns the next lowest integer value of the argument `num` by rounding down if necessary.
     * @param {number} num number whose next lowest integer value has to be returned
     * @return {number}
     * @function floor
     * @example
     * floor(10.4) //returns 10
     * @example
     * floor(10) //returns 10
     * @category jmespath
     */
    floor: {
      _func: resolvedArgs => Math.floor(resolvedArgs[0]),
      _signature: [{ types: [TYPE_NUMBER] }],
    },

    /**
     * Returns all the elements from the provided `stringsarray`
     * array joined together using the `glue` argument as a separator between each.
     * @param {string} glue
     * @param {string[]} stringsarray
     * @return {string}
     * @function join
     * @example
     * join(',', ['a', 'b', 'c']) //returns 'a,b,c'
     * @category jmespath
     */
    join: {
      _func: resolvedArgs => {
        const joinChar = resolvedArgs[0];
        const listJoin = resolvedArgs[1];
        return listJoin.join(joinChar);
      },
      _signature: [
        { types: [TYPE_STRING] },
        { types: [TYPE_ARRAY_STRING] },
      ],
    },

    /**
     * Returns an array containing the keys of the provided object `obj`. If the passed
     * object is null, the value returned is an empty array
     * @param {object} obj the object whose keys need to be extracted
     * @return {array}
     * @function keys
     * @example
     * keys({a : 3, b : 4}) //returns ['a', 'b']
     * @category jmespath
     */
    keys: {
      _func: resolvedArgs => {
        if (resolvedArgs[0] === null) return [];
        return Object.keys(resolvedArgs[0]);
      },
      _signature: [{ types: [TYPE_ANY] }],
    },

    /**
     * Returns the length of the given argument `subject` using the following types rules:
     * * string: returns the number of code points in the string
     * * array: returns the number of elements in the array
     * * object: returns the number of key-value pairs in the object
     * @param {string | array | object} subject subject whose length has to be calculated
     * @return {number}
     * @function length
     * @example
     * length([]) //returns 0
     * @example
     * length('') //returns 0
     * @example
     * length('abcd') //returns 4
     * @example
     * length([1, 2, 3, 4]) //returns 4
     * @example
     * length({}) // returns 0
     * @example
     * length({a : 3, b : 4}) //returns 2
     * @category jmespath
     */
    length: {
      _func: resolvedArgs => {
        const arg = valueOf(resolvedArgs[0]);
        if (isObject(arg)) return Object.keys(arg).length;

        return isArray(arg) ? arg.length : toString(arg).length;
      },
      _signature: [{ types: [TYPE_STRING, TYPE_ARRAY, TYPE_OBJECT] }],
    },

    /**
     * Apply the `expr` to every element in the `elements` array and return the array of results.
     * An elements of length N will produce a return array of length N. Unlike a projection,
     * `[*].bar`, `map()` will include the result of applying the `expr` for every element
     * in the elements array, even if the result is `null`.
     * @param {expression} expr expression to evaluate on each element
     * @param {array} elements array of elements on which the expression will be evaluated
     * @return {array}
     * @function map
     * @example
     * map(&(@ + 1), [1, 2, 3, 4]) // returns [2, 3, 4, 5]
     * @example
     * map(&length(@), ['doe', 'nick', 'chris']) // returns [3,4, 5]
     * @category jmespath
     */
    map: {
      _func: resolvedArgs => {
        const exprefNode = resolvedArgs[0];
        return resolvedArgs[1].map(arg => interpreter.visit(exprefNode, arg));
      },
      _signature: [{ types: [TYPE_EXPREF] }, { types: [TYPE_ARRAY] }],
    },

    /**
     * Returns the highest found number in the provided array argument `collection`
     * An empty array will produce a return value of null.
     * @param {number[]|string[]} collection array in which the maximum number has to be looked
     * @return {number}
     * @function max
     * @example
     * max([1, 2, 3]) //returns 3
     * @example
     * max([]) // returns null
     * @example
     * max(['a', 'a1', 'b']) // returns 'b'
     * @category jmespath
     */
    max: {
      _func: resolvedArgs => {
        if (resolvedArgs[0].length > 0) {
          const typeName = getTypeName(resolvedArgs[0][0]);
          if (typeName === TYPE_NUMBER) {
            return resolvedArgs[0].reduce(
              (prev, cur) => (toNumber(prev) >= toNumber(cur) ? prev : cur),
              resolvedArgs[0][0],
            );
          }
          return resolvedArgs[0].reduce(
            (a, b) => (toString(b).localeCompare(toString(a)) < 0 ? a : b),
            resolvedArgs[0][0],
          );
        }
        return null;
      },
      _signature: [{ types: [TYPE_ARRAY, TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING] }],
    },

    /**
     * Returns the maximum element in an array using the expression `expr` as the comparison key.
     * The entire element is returned.
     * @param {array} elements the array in which the maximum element is to be found
     * @param {expression} expr the expr to use as the `comparison` key
     * @return {any}
     * @function maxBy
     * @example
     * maxBy(['abcd', 'e', 'def'], &length(@)) //returns 'abcd'
     * @example
     * maxBy([{year: 2010}, {year: 2020}, {year: 1910}], &year) //returns {year: 2020}
     * @category jmespath
     */
    maxBy: {
      _func: resolvedArgs => {
        const exprefNode = resolvedArgs[1];
        const resolvedArray = resolvedArgs[0];
        const keyFunction = createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
        let maxNumber = -Infinity;
        let maxRecord;
        let current;
        resolvedArray.forEach(arg => {
          current = keyFunction(arg);
          if (current > maxNumber) {
            maxNumber = current;
            maxRecord = arg;
          }
        });
        return maxRecord;
      },
      _signature: [{ types: [TYPE_ARRAY] }, { types: [TYPE_EXPREF] }],
    },

    /**
     * Accepts 0 or more objects as arguments, and returns a single object with
     * subsequent objects merged. Each subsequent object’s key/value pairs are
     * added to the preceding object. This function is used to combine multiple
     * objects into one. You can think of this as the first object being the base object,
     * and each subsequent argument being overrides that are applied to the base object.
     * @param {...object} args
     * @return {object}
     * @function merge
     * @example
     * merge({a: 1, b: 2}, {c : 3, d: 4}) // returns {a :1, b: 2, c: 3, d: 4}
     * @example
     * merge({a: 1, b: 2}, {a : 3, d: 4}) // returns {a :3, b: 2, d: 4}
     * @category jmespath
     */
    merge: {
      _func: resolvedArgs => {
        const merged = {};
        resolvedArgs.forEach(current => {
          Object.entries(current).forEach(([key, value]) => {
            merged[key] = value;
          });
        });
        return merged;
      },
      _signature: [{ types: [TYPE_OBJECT], variadic: true }],
    },

    /**
     * Returns the lowest found number in the provided `collection` argument. If the array is empty
     * `null` is returned
     * @param {number[]|string[]} collection array in which the minimum element is to be calculated
     * @return {number}
     * @function min
     * @example
     * min([1, 2, 3]) //returns 1
     * @example
     * min([]) // returns null
     * @example
     * min(['a', 'a1', 'b']) // returns 'a'
     * @category jmespath
     */
    min: {
      _func: resolvedArgs => {
        if (resolvedArgs[0].length > 0) {
          const typeName = getTypeName(resolvedArgs[0][0]);
          if (typeName === TYPE_NUMBER) {
            return resolvedArgs[0].reduce(
              (prev, cur) => (toNumber(prev) <= toNumber(cur) ? prev : cur),
              resolvedArgs[0][0],
            );
          }
          const elements = resolvedArgs[0];
          let minElement = elements[0];
          for (let i = 1; i < elements.length; i += 1) {
            if (toString(elements[i]).localeCompare(toString(minElement)) < 0) {
              minElement = elements[i];
            }
          }
          return minElement;
        }
        return null;
      },
      _signature: [{ types: [TYPE_ARRAY, TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING] }],
    },

    /**
     * Returns the minimum element in `elements` array using the expression `expr` as the comparison key.
     * @param {array} elements
     * @param {expression} expr expression that returns either a string or a number
     * @return {any}
     * @function minBy
     * @example
     * minBy(['abcd', 'e', 'def'], &length(@)) //returns 'e'
     * @example
     * minBy([{year: 2010}, {year: 2020}, {year: 1910}], &year) //returns {year: 1910}
     * @category jmespath
     */
    minBy: {
      _func: resolvedArgs => {
        const exprefNode = resolvedArgs[1];
        const resolvedArray = resolvedArgs[0];
        const keyFunction = createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
        let minNumber = Infinity;
        let minRecord;
        let current;
        resolvedArray.forEach(arg => {
          current = keyFunction(arg);
          if (current < minNumber) {
            minNumber = current;
            minRecord = arg;
          }
        });
        return minRecord;
      },
      _signature: [{ types: [TYPE_ARRAY] }, { types: [TYPE_EXPREF] }],
    },

    /**
     * Returns the first argument that does not resolve to `null`.
     * This function accepts one or more arguments, and will evaluate
     * them in order until a non null argument is encounted. If all
     * arguments values resolve to null, then a value of null is returned.
     * @param {...any} argument
     * @return {any}
     * @function notNull
     * @example
     * notNull(1, 2, 3, 4, `null`) //returns 1
     * @example
     * notNull(`null`, 2, 3, 4, `null`) //returns 2
     * @category jmespath
     */
    notNull: {
      _func: resolvedArgs => resolvedArgs.find(arg => getTypeName(arg) !== TYPE_NULL) || null,
      _signature: [{ types: [TYPE_ANY], variadic: true }],
    },

    /**
     * executes a user-supplied reducer expression `expr` on each element of the
     * array, in order, passing in the return value from the calculation on the preceding element.
     * The final result of running the reducer across all elements of the `elements` array is a single value.
     * The expression can access the following properties
     * * accumulated : accumulated value till now based on the previous calculations. The initial value is `null`
     * * current: current element to process
     * * index: index of the `current` element in the array
     * * array: original array
     * @param {expression} expr reducer expr to be executed on each element
     * @param {array} elements array of elements on which the expression will be evaluated
     * @return {any}
     * @function reduce
     * @example
     * reduce(&(accumulated + current), [1, 2, 3]) //returns 6
     * @example
     * reduce(&(accumulated - current), [3, 3, 3]) //returns -9
     * @example
     * reduce(&if(accumulated == `null`, current, accumulated * current), [3, 3, 3]) //returns 27
     * @category jmespath
     */
    reduce: {
      _func: resolvedArgs => {
        const exprefNode = resolvedArgs[0];
        return resolvedArgs[1].reduce(
            (accumulated, current, index, array) => interpreter.visit(exprefNode, {
              accumulated, current, index, array,
            }),
            resolvedArgs.length === 3 ? resolvedArgs[2] : null,
        );
      },
      _signature: [
        { types: [TYPE_EXPREF] },
        { types: [TYPE_ARRAY] },
        { types: [TYPE_ANY], optional: true },
      ],
    },

    /**
     * Reverses the order of the `argument`.
     * @param {string|array} argument
     * @return {array}
     * @function reverse
     * @example
     * reverse(['a', 'b', 'c']) //returns ['c', 'b', 'a']
     * @category jmespath
     */
    reverse: {
      _func: resolvedArgs => {
        const originalStr = valueOf(resolvedArgs[0]);
        const typeName = getTypeName(originalStr);
        if (typeName === TYPE_STRING) {
          let reversedStr = '';
          for (let i = originalStr.length - 1; i >= 0; i -= 1) {
            reversedStr += originalStr[i];
          }
          return reversedStr;
        }
        const reversedArray = resolvedArgs[0].slice(0);
        reversedArray.reverse();
        return reversedArray;
      },
      _signature: [{ types: [TYPE_STRING, TYPE_ARRAY] }],
    },


    /**
     * This function accepts an array `list` argument and returns the sorted elements of
     * the `list` as an array. The array must be a list of strings or numbers.
     * Sorting strings is based on code points. Locale is not taken into account.
     * @param {number[]|string[]} list
     * @return {number[]|string[]}
     * @function sort
     * @example
     * sort([1, 2, 4, 3, 1]) // returns [1, 1, 2, 3, 4]
     * @category jmespath
     */
    sort: {
      _func: resolvedArgs => {
        const sortedArray = resolvedArgs[0].slice(0);
        if (sortedArray.length > 0) {
          const normalize = getTypeName(resolvedArgs[0][0]) === TYPE_NUMBER ? toNumber : toString;
          sortedArray.sort((a, b) => {
            const va = normalize(a);
            const vb = normalize(b);
            if (va < vb) return -1;
            if (va > vb) return 1;
            return 0;
          });
        }
        return sortedArray;
      },
      _signature: [{ types: [TYPE_ARRAY, TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Sort an array using an expression `expr` as the sort key. For each element
     * in the array of elements, the `expr` expression is applied and the resulting
     * value is used as the key used when sorting the elements. If the result of
     * evaluating the `expr` against the current array element results in type
     * other than a number or a string, a type error will occur.
     * @param {array} elements
     * @param {expression} expr
     * @return {array}
     * @function sortBy
     * @example
     * sortBy(['abcd', 'e', 'def'], &length(@)) //returns ['e', 'def', 'abcd']
     * @example
     * sortBy([{year: 2010}, {year: 2020}, {year: 1910}], &year) //returns [{year: 1910}, {year: 2010}, {year: 2020}]
     * @category jmespath
     */
    sortBy: {
      _func: resolvedArgs => {
        const sortedArray = resolvedArgs[0].slice(0);
        if (sortedArray.length === 0) {
          return sortedArray;
        }
        const exprefNode = resolvedArgs[1];
        const requiredType = getTypeName(
            interpreter.visit(exprefNode, sortedArray[0]),
        );
        if ([TYPE_NUMBER, TYPE_STRING].indexOf(requiredType) < 0) {
          throw new Error('TypeError');
        }
        // In order to get a stable sort out of an unstable
        // sort algorithm, we decorate/sort/undecorate (DSU)
        // by creating a new list of [index, element] pairs.
        // In the cmp function, if the evaluated elements are
        // equal, then the index will be used as the tiebreaker.
        // After the decorated list has been sorted, it will be
        // undecorated to extract the original elements.
        const decorated = [];
        for (let i = 0; i < sortedArray.length; i += 1) {
          decorated.push([i, sortedArray[i]]);
        }
        decorated.sort((a, b) => {
          const exprA = interpreter.visit(exprefNode, a[1]);
          const exprB = interpreter.visit(exprefNode, b[1]);
          if (getTypeName(exprA) !== requiredType) {
            throw new Error(
                `TypeError: expected ${requiredType}, received ${
                    getTypeName(exprA)}`,
            );
          } else if (getTypeName(exprB) !== requiredType) {
            throw new Error(
                `TypeError: expected ${requiredType}, received ${
                    getTypeName(exprB)}`,
            );
          }
          if (exprA > exprB) {
            return 1;
          }
          if (exprA < exprB) {
            return -1;
          }
          // If they're equal compare the items by their
          // order to maintain relative order of equal keys
          // (i.e. to get a stable sort).
          return a[0] - b[0];
        });
        // Undecorate: extract out the original list elements.
        for (let j = 0; j < decorated.length; j += 1) {
          [, sortedArray[j]] = decorated[j];
        }
        return sortedArray;
      },
      _signature: [{ types: [TYPE_ARRAY] }, { types: [TYPE_EXPREF] }],
    },

    /**
     * Returns true if the `subject` starts with the `prefix`, otherwise this function returns false.
     * @param {string} subject subject in which the `prefix` is being searched for
     * @param {string} prefix prefix to search in the subject
     * @return {boolean}
     * @function startsWith
     * @example
     * startsWith('jack is at home', 'jack') // returns true
     * @category jmespath
     */
    startsWith: {
      _func: resolvedArgs => valueOf(resolvedArgs[0]).startsWith(valueOf(resolvedArgs[1])),
      _signature: [{ types: [TYPE_STRING] }, { types: [TYPE_STRING] }],
    },

    /**
     * Returns the sum of the provided `collection` array argument.
     * An empty array will produce a return value of 0.
     * @param {number[]} collection array whose element's sum has to be computed
     * @return {number}
     * @function sum
     * @example
     * sum([1, 2, 3]) //returns 6
     * @category jmespath
     */
    sum: {
      _func: resolvedArgs => {
        let sum = 0;
        resolvedArgs[0].forEach(arg => {
          sum += arg * 1;
        });
        return sum;
      },
      _signature: [{ types: [TYPE_ARRAY_NUMBER] }],
    },

    /**
     * converts the passed `arg` to an array. The conversion happens as per the following rules
     * * array - Returns the passed in value.
     * * number/string/object/boolean - Returns a one element array containing the passed in argument.
     * @param {any} arg
     * @return {array}
     * @function toArray
     * @example
     * toArray(1) // returns [1]
     * @example
     * toArray(null()) // returns [`null`]
     * @category jmespath
     */
    toArray: {
      _func: resolvedArgs => {
        if (getTypeName(resolvedArgs[0]) === TYPE_ARRAY) {
          return resolvedArgs[0];
        }
        return [resolvedArgs[0]];
      },

      _signature: [{ types: [TYPE_ANY] }],
    },

    /**
     * converts the passed arg to a number. The conversion happens as per the following rules
     * * string - Returns the parsed number.
     * * number - Returns the passed in value.
     * * array - null
     * * object - null
     * * boolean - null
     * * null - null
     * @param {any} arg
     * @return {number}
     * @function toNumber
     * @example
     * toNumber(1) //returns 1
     * @example
     * toNumber('10') //returns 10
     * @example
     * toNumber({a: 1}) //returns null
     * @example
     * toNumber(true()) //returns null
     * @category jmespath
     */
    toNumber: {
      _func: resolvedArgs => {
        const typeName = getTypeName(resolvedArgs[0]);
        if (typeName === TYPE_NUMBER) {
          return resolvedArgs[0];
        }
        if (typeName === TYPE_STRING) {
          return toNumber(resolvedArgs[0]);
        }
        return null;
      },
      _signature: [{ types: [TYPE_ANY] }],
    },

    /**
     * converts the passed `arg` to a string. The conversion happens as per the following rules
     * * string - Returns the passed in value.
     * * number/array/object/boolean - The JSON encoded value of the object.
     * @param {any} arg
     * @return {string}
     * @function toString
     * @example
     * toString(1) //returns '1'
     * @example
     * toString(true()) //returns 'true'
     * @category jmespath
     */
    toString: {
      _func: resolvedArgs => {
        if (getTypeName(resolvedArgs[0]) === TYPE_STRING) {
          return resolvedArgs[0];
        }
        return JSON.stringify(resolvedArgs[0]);
      },

      _signature: [{ types: [TYPE_ANY] }],
    },

    /**
     * Returns the JavaScript type of the given `subject` argument as a string value.
     *
     * The return value MUST be one of the following:
     * * number
     * * string
     * * boolean
     * * array
     * * object
     * * null
     * @param {any} subject
     * @return {string}
     *
     * @function type
     * @example
     * type(1) //returns 'number'
     * @example
     * type('') //returns 'string'
     * @category jmespath
     */
    type: {
      _func: resolvedArgs => ({
        [TYPE_NUMBER]: 'number',
        [TYPE_STRING]: 'string',
        [TYPE_ARRAY]: 'array',
        [TYPE_OBJECT]: 'object',
        [TYPE_BOOLEAN]: 'boolean',
        [TYPE_EXPREF]: 'expref',
        [TYPE_NULL]: 'null',
      }[getTypeName(resolvedArgs[0])]),
      _signature: [{ types: [TYPE_ANY] }],
    },


    /**
     * Returns the values of the provided object `obj`. Note that because JSON hashes are
     * inherently unordered, the values associated with the provided object obj are
     * inherently unordered.
     * @param {object} obj
     * @return {array}
     * @function values
     * @example
     * values({a : 3, b : 4}) //returns [3, 4]
     * @category jmespath
     */
    values: {
      _func: resolvedArgs => {
        const arg = valueOf(resolvedArgs[0]);
        if (arg === null) return [];
        return Object.values(arg);
      },
      _signature: [{ types: [TYPE_ANY] }],
    },

    /**
     * Returns a convolved (zipped) array containing grouped arrays of values from
     * the array arguments from index 0, 1, 2, etc.
     * This function accepts a variable number of arguments.
     * The length of the returned array is equal to the length of the shortest array.
     * @param {...array} arrays array of arrays to zip together
     * @return {array} An array of arrays with elements zipped together
     * @function zip
     * @example
     * zip([1, 2, 3], [4, 5, 6]) //returns [[1, 4], [2, 5], [3, 6]]
     * @category jmespath
     */
    zip: {
      _func: args => {
        const count = args.reduce((min, current) => Math.min(min, current.length), args[0].length);
        const result = new Array(count);
        for (let i = 0; i < count; i += 1) {
          result[i] = [];
          args.forEach(a => {
            result[i].push(a[i]);
          });
        }
        return result;
      },
      _signature: [{ types: [TYPE_ARRAY], variadic: true }],
    },
  };
}
