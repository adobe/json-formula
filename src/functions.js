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

/* eslint-disable no-underscore-dangle */
import dataTypes from './dataTypes.js';
import { getProperty, debugAvailable } from './utils.js';

function round(num, digits) {
  const precision = 10 ** digits;
  return Math.round(num * precision) / precision;
}

const MS_IN_DAY = 24 * 60 * 60 * 1000;

function getDateObj(dateNum) {
  return new Date(Math.round(dateNum * MS_IN_DAY));
}

function getDateNum(dateObj) {
  return dateObj / MS_IN_DAY;
}

export default function functions(
  runtime,
  isObject,
  isArray,
  toNumber,
  getTypeName,
  valueOf,
  toString,
  debug,
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

  const functionMap = {
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
     * Find the absolute value of the provided argument `value`.
     * @param {number} num a numeric value
     * @return {number} the absolute value of the `value` argument
     * @function abs
     * @example
     * abs(-1) // returns 1
     */
    abs: {
      _func: resolvedArgs => Math.abs(resolvedArgs[0]),
      _signature: [{ types: [TYPE_NUMBER] }],
    },
    /**
     * Finds the logical AND result of all parameters.
     * If the parameters are not boolean they will be cast to boolean as per the type coercion rules
     * @param {any} firstOperand logical expression
     * @param {...any} [additionalOperands] any number of additional expressions
     * @returns {boolean} The logical result of applying AND to all parameters
     * @example
     * and(10 > 8, length("foo") < 5) // returns true
     * and(`null`, length("foo") < 5) // returns false
     * @function and
     */
    and: {
      _func: resolvedArgs => {
        let result = !!valueOf(resolvedArgs[0]);
        resolvedArgs.slice(1).forEach(arg => {
          result = result && !!valueOf(arg);
        });
        return result;
      },
      _signature: [{ types: [dataTypes.TYPE_ANY], variadic: true }],
    },

    /**
     * Finds the average of the elements in an array.
     * An empty array will return an average of `null`.
     * @param {number[]} elements array of numeric values
     * @return {number} average value
     * @function avg
     * @example
     * avg(`[]`) // returns null
     * avg([1, 2, 3]) // returns 2
     */
    avg: {
      _func: resolvedArgs => {
        let sum = 0;
        const inputArray = resolvedArgs[0];
        if (inputArray.length === 0) return null;
        inputArray.forEach(a => {
          sum += a;
        });
        return sum / inputArray.length;
      },
      _signature: [{ types: [TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Generates a lower-case string of the `input` string using locale-specific mappings.
     * e.g. Strings with German letter <span>&#223;</span> can be compared to "ss"
     * @param {string} input string to casefold
     * @returns {string} A new string converted to lower case
     * @function casefold
     * @example
     * casefold("AbC") // returns "abc"
     */
    casefold: {
      _func: (args, _data, interpreter) => {
        const str = toString(args[0]);
        return str.toLocaleUpperCase(interpreter.language).toLocaleLowerCase(interpreter.language);
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },

    /**
     * Create a string created from the specified code unit.
     * @param {integer} codePoint unicode code point value
     * @return {number} A string from a given code point
     * @function charCode
     * @example
     * charCode(65) // "A"
     * charCode(65) == "\u0041" // true
     */
    charCode: {
      _func: args => {
        const code = args[0];
        return !Number.isInteger(code) ? null : String.fromCharCode(code);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Finds the next highest integer value of the argument `num` by rounding up if necessary.
     * @param {number} num numeric value
     * @return {integer} The smallest integer greater than or equal to num
     * @function ceil
     * @example
     * ceil(10) // returns 10
     * ceil(10.4) // return 11

     */
    ceil: {
      _func: resolvedArgs => Math.ceil(resolvedArgs[0]),
      _signature: [{ types: [TYPE_NUMBER] }],
    },
    /**
     * Retrieve the code point from the first character of a string
     * @param {string} str source string
     * @return {integer} unicode code point value
     * @function codePoint
     * @example
     * codePoint("ABC") // 65
     */
    codePoint: {
      _func: args => {
        const text = toString(args[0]);
        return text.length === 0 ? null : text.codePointAt(0);
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },

    /**
     * Determines if the given `subject` contains the `search` string.
     * If `subject` is an array, this function returns true if one of the elements
     * in the array is equal to the provided `search` value. If `subject`
     * is a string, this function returns true if the string contains the
     * `search` value.
     * @param {array|string} subject the subject in which the element has to be searched
     * @param {string|boolean|number|date} search element to search
     * @return {boolean} true if found
     * @function contains
     * @example
     * contains([1, 2, 3, 4], 2) // returns true
     * contains([1, 2, 3, 4], -1) // returns false
     * contains("Abcd", "d") // returns true
     * contains("Abcd", "x") // returns false

     */
    contains: {
      _func: resolvedArgs => valueOf(resolvedArgs[0]).indexOf(valueOf(resolvedArgs[1])) >= 0,
      _signature: [{ types: [TYPE_STRING, TYPE_ARRAY] },
        { types: [TYPE_ANY] }],
    },
    /**
     * Return difference between two date values.
     * The measurement of the difference is determined by the `unit` parameter. One of:
     *
     * * `y` the number of whole years between start_date and end_date
     * * `m` the number of whole months between start_date and end_date.
     * * `d` the number of days between start_date and end_date
     * * `md` the number of days between start_date and end_date after subtracting whole months.
     * * `ym` the number of whole months between start_date and end_date
     * after subtracting whole years.
     * * `yd` the number of days between start_date and end_date, assuming start_date
     * and end_date were no more than one year apart
     * @param {number} start_date The starting date.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @param {number} end_date The end date -- must be greater or equal to start_date.
     * @param {string} unit
     * @returns {integer} The number of days/months/years difference
     * @function datedif
     * @example
     * datedif(datetime(2001, 1, 1), datetime(2003, 1, 1), "y") // returns 2
     * datedif(datetime(2001, 6, 1), datetime(2003, 8, 15), "D") // returns 805
     * // 805 days between June 1, 2001, and August 15, 2003
     * datedif(datetime(2001, 6, 1), datetime(2003, 8, 15), "YD") // returns 75
     * // 75 days between June 1 and August 15, ignoring the years of the dates (75)
     */
    datedif: {
      _func: args => {
        const unit = toString(args[2]).toLowerCase();
        const date1 = getDateObj(args[0]);
        const date2 = getDateObj(args[1]);
        if (date2 === date1) return 0;
        if (date2 < date1) return null;
        if (unit === 'd') return Math.floor(getDateNum(date2 - date1));
        const yearDiff = date2.getFullYear() - date1.getFullYear();
        let monthDiff = date2.getMonth() - date1.getMonth();
        const dayDiff = date2.getDate() - date1.getDate();

        if (unit === 'y') {
          let y = yearDiff;
          if (monthDiff < 0) y -= 1;
          if (monthDiff === 0 && dayDiff < 0) y -= 1;
          return y;
        }
        if (unit === 'm') {
          return yearDiff * 12 + monthDiff + (dayDiff < 0 ? -1 : 0);
        }
        if (unit === 'ym') {
          if (dayDiff < 0) monthDiff -= 1;
          if (monthDiff <= 0 && yearDiff > 0) return 12 + monthDiff;
          return monthDiff;
        }
        if (unit === 'yd') {
          if (dayDiff < 0) monthDiff -= 1;
          if (monthDiff < 0) date2.setFullYear(date1.getFullYear() + 1);
          else date2.setFullYear(date1.getFullYear());
          return Math.floor(getDateNum(date2 - date1));
        }
        throw new TypeError(`Unrecognized unit parameter "${unit}" for datedif()`);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_STRING] },
      ],
    },

    /**
     * Return a date/time value.
     * @param {integer} year The year to use for date construction.
     * Values from 0 to 99 map to the years 1900 to 1999. All other values are the actual year
     * @param {integer} month The month: beginning with 1 for
     * January to 12 for December.
     * @param {integer} day The day of the month.
     * @param {integer} [hours=0] Integer value between 0 and 23 representing the hour of the day.
     * @param {integer} [minutes=0] Integer value representing the minute segment of a time.
     * @param {integer} [seconds=0] Integer value representing the second segment of a time.
     * @param {integer} [milliseconds=0] Integer value representing the
     * millisecond segment of a time.
     * @returns {number} A date/time numeric value to be used with other date/time functions
     * @function datetime
     * @example
     * datetime(2010, 10, 10) // returns representation of October 10, 2010
     * datetime(2010, 2, 28) // returns representation of February 28, 2010
     */
    datetime: {
      _func: args => {
        const year = args[0];
        const month = args[1] - 1; // javascript months start from 0
        const day = args[2];
        const hours = args.length > 3 ? args[3] : 0;
        const minutes = args.length > 4 ? args[4] : 0;
        const seconds = args.length > 5 ? args[5] : 0;
        const ms = args.length > 6 ? args[6] : 0;

        const baseDate = new Date(year, month, day, hours, minutes, seconds, ms);

        return getDateNum(baseDate);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Finds the day of a date
     * @param {number} date of the day you are trying to find.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer} The day of the month ranging from 1 to 31.
     * @function day
     * @example
     * day(datetime(2008,5,23)) // returns 23
     */
    day: {
      _func: args => getDateObj(args[0]).getDate(),
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Searches a nested hierarchy of objects to return an array of key values that match a `name`.
     * The name can be either a key into an object or an array index.
     * This is similar to the JSONPath deep scan operator (..)
     * @param {object|array} object The starting object or array where we start the search
     * @param {string|integer} name The name (or index position) of the elements to find
     * @returns {any[]} The array of matched elements
     * @function deepScan
     * @example
     * deepScan({a : {b1 : {c : 2}, b2 : {c : 3}}}, "c") // returns [2, 3]
     */
    deepScan: {
      _func: resolvedArgs => {
        const [source, n] = resolvedArgs;
        const name = toString(n);
        const items = [];
        if (source === null) return items;
        function scan(node) {
          Object.entries(node).forEach(([k, v]) => {
            if (k === name) items.push(v);
            if (typeof v === 'object') scan(v);
          });
        }
        scan(source);
        return items;
      },
      _signature: [
        { types: [dataTypes.TYPE_OBJECT, dataTypes.TYPE_ARRAY, dataTypes.TYPE_NULL] },
        { types: [dataTypes.TYPE_STRING, dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Determines if the `subject` string ends with a specific `suffix`
     * @param {string} subject source string in which to search
     * @param {string} suffix search string
     * @return {boolean} true if the `suffix` value is at the end of the `subject`
     * @function endsWith
     * @example
     * endsWith("Abcd", "d") // returns true
     * endsWith("Abcd", "A") // returns false

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
     * Returns an array of `[key, value]` pairs from an object.
     * The `fromEntries()` function may be used to convert the array back to an object.
     * @param {object} obj source object
     * @returns {any[]} an array of arrays where each child array has two elements
     * representing the key and value of a pair
     * @function entries
     * @example
     * entries({a: 1, b: 2}) // returns [["a", 1], ["b", 2]]
     */
    entries: {
      _func: args => {
        const obj = valueOf(args[0]);
        return Object.entries(obj);
      },
      _signature: [
        {
          types: [
            dataTypes.TYPE_NUMBER,
            dataTypes.TYPE_STRING,
            dataTypes.TYPE_ARRAY,
            dataTypes.TYPE_OBJECT,
            dataTypes.TYPE_BOOLEAN,
          ],
        },
      ],
    },

    /**
     * Finds the serial number of the end of a month, given `startDate` plus `monthAdd` months
     * @param {number} startDate The base date to start from.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @param {integer} monthAdd Number of months to add to start date
     * @return {integer} the number of days in the computed month
     * @function eomonth
     * @example
     * eomonth(datetime(2011, 1, 1), 1) | [month(@), day(@)] // returns [2, 28]
     * eomonth(datetime(2011, 1, 1), -3) | [month(@), day(@)] // returns [10, 31]
     */
    eomonth: {
      _func: args => {
        const jsDate = getDateObj(args[0]);
        const months = args[1];
        // We can give the constructor a month value > 11 and it will increment the years
        // Since day is 1-based, giving zero will yield the last day of the previous month
        const newDate = new Date(jsDate.getFullYear(), jsDate.getMonth() + months + 1, 0);
        return getDateNum(newDate);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Finds e (the base of natural logarithms) raised to a power x. (i.e. e<sup>x</sup>)
     * @param x {number} A numeric expression representing the power of e.
     * @returns {number} e (the base of natural logarithms) raised to a power x
     * @function exp
     * @example
     * exp(10) // returns 22026.465794806718
     */
    exp: {
      _func: args => Math.exp(args[0]),
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Return constant boolean false value.
     * Note that expressions may also use the JSON literal false: `` `false` ``
     * @returns {boolean} constant boolean value `false`
     * @function false
     */
    false: {
      _func: () => false,
      _signature: [],
    },

    /**
     * finds and returns the index of query in text from a start position
     * @param {string} query string to search
     * @param {string} text text to be searched
     * @param {integer} [start=0] zero-based position to start searching
     * @returns {integer|null} The position of the found string, null if not found.
     * @function find
     * @example
     * find("m", "abm") // returns 2
     * find("M", "abMcdM", 3) // returns 5
     * find("M", "ab") // returns `null`
     * find("M", "abMcdM", 2) // returns 2
     */
    find: {
      _func: args => {
        const query = args[0];
        const text = toString(args[1]);
        const startPos = args.length > 2 ? args[2] : 0;
        const result = text.indexOf(query, startPos);
        if (result === -1) {
          return null;
        }
        return result;
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
        { types: [dataTypes.TYPE_STRING] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * returns an object by transforming a list of key-value `pairs` into an object.
     * `fromEntries()` is the inverse operation of `entries()`.
     * @param {any[]} pairs A nested array of key-value pairs to create the object from
     * @returns {object} An object constructed from the provided key-value pairs
     * @function fromEntries
     * @example
     * fromEntries([["a", 1], ["b", 2]]) // returns {a: 1, b: 2}
     */
    fromEntries: {
      _func: args => {
        const array = args[0];
        return Object.fromEntries(array);
      },
      _signature: [
        { types: [dataTypes.TYPE_ARRAY_ARRAY] },
      ],
    },

    /**
     * Calculates the next lowest integer value of the argument `num` by rounding down if necessary.
     * @param {number} num numeric value
     * @return {integer} The largest integer smaller than or equal to num
     * @function floor
     * @example
     * floor(10.4) // returns 10
     * floor(10) // returns 10
     */
    floor: {
      _func: resolvedArgs => Math.floor(resolvedArgs[0]),
      _signature: [{ types: [TYPE_NUMBER] }],
    },
    /**
     * Extract the hour from a date/time representation
     * @param {number} date The datetime/time for which the hour is to be returned.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer} value between 0 and 23
     * @function hour
     * @example
     * hour(datetime(2008,5,23,12, 0, 0)) // returns 12
     * hour(time(12, 0, 0)) // returns 12
     */
    hour: {
      _func: args => {
        if (args[0] < 0) {
          return null;
        }

        return getDateObj(args[0]).getHours();
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Return one of two values `result1` or `result2`, depending on the `condition`
     * @param {any} condition boolean result of a logical expression
     * @param {any} result1 if condition is true
     * @param {any} result2 if condition is false
     * @return {any} either result1 or result2
     * @function if

     * @example
     * if(true(), 1, 2) // returns 1
     * if(false(), 1, 2) // returns 2
     */
    if: {
      _func: (unresolvedArgs, data, interpreter) => {
        const conditionNode = unresolvedArgs[0];
        const leftBranchNode = unresolvedArgs[1];
        const rightBranchNode = unresolvedArgs[2];
        const condition = interpreter.visit(conditionNode, data);
        if (valueOf(condition)) {
          return interpreter.visit(leftBranchNode, data);
        }
        return interpreter.visit(rightBranchNode, data);
      },
      _signature: [
        { types: [dataTypes.TYPE_ANY] },
        { types: [dataTypes.TYPE_ANY] },
        { types: [dataTypes.TYPE_ANY] }],
    },

    /**
     * Combines all the elements from the provided
     * array, joined together using the `glue` argument as a separator between each.
     * @param {string} glue
     * @param {string[]} stringsarray array of strings or values that can be coerced to strings
     * @return {string} String representation of the array
     * @function join
     * @example
     * join(",", ["a", "b", "c"]) // returns "a,b,c"
     * join(" and ", ["apples", "bananas"]) // returns "apples and bananas"
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
     * Generates an array of the keys of the input object. If the
     * object is null, the value return an empty array
     * @param {object} obj the object to examine
     * @return {array} the array of all the key names
     * @function keys
     * @example
     * keys({a : 3, b : 4}) // returns ["a", "b"]
     */
    keys: {
      _func: resolvedArgs => {
        if (resolvedArgs[0] === null) return [];
        return Object.keys(resolvedArgs[0]);
      },
      _signature: [{ types: [TYPE_ANY] }],
    },
    /**
     * Return a substring from the start of a string or the left-most elements of an array
     * @param {string|array} subject The source text/array of characters/elements
     * @param {integer} [elements=1] number of elements to pick
     * @return {string|array}
     * @function left
     * @example
     * left("Sale Price", 4) // returns "Sale"
     * left("Sweden") // returns "S"
     * left([4, 5, 6], 2) // returns [4, 5]
     */
    left: {
      _func: args => {
        const numEntries = args.length > 1 ? args[1] : 1;
        if (numEntries < 0) return null;
        if (args[0] instanceof Array) {
          return args[0].slice(0, numEntries);
        }
        const text = toString(args[0]);
        return text.substr(0, numEntries);
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING, dataTypes.TYPE_ARRAY] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Calculates the length of the input argument based on types:
     *
     * * string: returns the number of code points
     * * array: returns the number of array elements
     * * object: returns the number of key-value pairs
     * @param {string | array | object} subject subject whose length to calculate
     * @return {integer} the length of the input subject
     * @function length
     * @example
     * length(`[]`) // returns 0
     * length("") // returns 0
     * length("abcd") // returns 4
     * length([1, 2, 3, 4]) // returns 4
     * length({}) // returns 0
     * length({a : 3, b : 4}) // returns 2
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
     * Converts all the alphabetic characters in a string to lowercase. If the value
     * is not a string it will be converted into string.
     * @param {string} input input string
     * @returns {string} the lower case value of the input string
     * @function lower
     * @example
     * lower("E. E. Cummings") // returns e. e. cummings
     */
    lower: {
      _func: args => {
        const value = toString(args[0]);
        return value.toLowerCase();
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },

    /**
     * Apply an expression to every element in an array and return the array of results.
     * An input array of length N will return an array of length N.
     * @param {expression} expr expression to evaluate
     * @param {array} elements array of elements to process
     * @return {array} the mapped array
     * @function map
     * @example
     * map(&(@ + 1), [1, 2, 3, 4]) // returns [2, 3, 4, 5]
     * map(&length(@), ["doe", "nick", "chris"]) // returns [3, 4, 5]

     */
    map: {
      _func: resolvedArgs => {
        const exprefNode = resolvedArgs[0];
        return resolvedArgs[1].map(arg => runtime.interpreter.visit(exprefNode, arg));
      },
      _signature: [{ types: [TYPE_EXPREF] }, { types: [TYPE_ARRAY] }],
    },

    /**
     * Calculates the largest value in the provided `collection` arguments.
     * If all collections are empty `null` is returned.
     * max() can work on numbers or strings.
     * If a mix of numbers and strings are provided, all values with be coerced to
     * the type of the first value.
     * @param {(number[]|string[])} collection array in which the maximum
     * element is to be calculated
     * @return {number} the largest value found
     * @function max
     * @example
     * max([1, 2, 3], [4, 5, 6], 7) // returns 7
     * max(`[]`) // returns null
     * max(["a", "a1", "b"]) // returns "b"
     */
    max: {
      _func: args => {
        // flatten the args into a single array
        const array = args.reduce((prev, cur) => {
          if (Array.isArray(cur)) prev.push(...cur);
          else prev.push(cur);
          return prev;
        }, []);

        const first = array.find(r => r !== null);
        if (array.length === 0 || first === undefined) return null;
        // use the first value to determine the comparison type
        const isNumber = getTypeName(first, true) === TYPE_NUMBER;
        const compare = isNumber
          ? (prev, cur) => {
            const current = toNumber(cur);
            return prev <= current ? current : prev;
          }
          : (prev, cur) => {
            const current = toString(cur);
            return prev.localeCompare(current) === 1 ? prev : current;
          };

        return array.reduce(compare, isNumber ? toNumber(first) : toString(first));
      },
      _signature: [{ types: [TYPE_ARRAY, TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING], variadic: true }],
    },

    /**
     * Accepts one or more objects, and returns a single object with
     * all objects merged.
     * The first object is copied, and then
     * and each key value pair from each subsequent object
     * are added to the first object.  Duplicate keys in subsequent objects will
     * override those found in earlier objects.
     * @param {...object} args
     * @return {object} The combined object
     * @function merge
     * @example
     * merge({a: 1, b: 2}, {c : 3, d: 4}) // returns {a :1, b: 2, c: 3, d: 4}
     * merge({a: 1, b: 2}, {a : 3, d: 4}) // returns {a :3, b: 2, d: 4}
     */
    merge: {
      _func: resolvedArgs => {
        const merged = {};
        resolvedArgs.forEach(current => {
          if (current === null) return;
          Object.entries(current || {}).forEach(([key, value]) => {
            merged[key] = value;
          });
        });
        return merged;
      },
      _signature: [{ types: [TYPE_OBJECT, TYPE_NULL], variadic: true }],
    },

    /**
     * Extracts a substring from source text, or a subset of an array.
     * or in case of array, extracts a subset of the array from start till the length
     * number of elements.
     * Returns null if the `startPos` is greater than the length of the array
     * @param {string|array} subject the text string or array of characters or elements to extract.
     * @param {integer} startPos the zero-position of the first character or element to extract.
     * @param {integer} length The number of characters or elements to return from the
     * string or array.
     * If greater then the length of `subject` the argument is set to the length of the subject.
     * @return {string|array} The resulting substring or array subset
     * @function mid
     * @example
     * mid("Fluid Flow", 0, 5) // returns "Fluid"
     * mid("Fluid Flow", 6, 20) // returns "Flow"
     * mid("Fluid Flow, 20, 5) // returns ""
     * mid([0,1,2,3,4,5,6,7,8,9], 2, 3) // returns [2,3,4]
     */
    mid: {
      _func: args => {
        const startPos = args[1];
        const numEntries = args[2];
        if (startPos < 0) return null;
        if (args[0] instanceof Array) {
          return args[0].slice(startPos, startPos + numEntries);
        }
        const text = toString(args[0]);
        return text.substr(startPos, numEntries);
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING, dataTypes.TYPE_ARRAY] },
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Calculates the smallest value in the input arguments.
     * If all collections are empty `null` is returned.
     * min() can work on numbers or strings.
     * If a mix of numbers and strings are provided, the type of the first value will be used.
     * @param {...number[]|string[]|number|string} collection to search for the minimum value
     * @return {number}
     * @function min
     * @example
     * min([1, 2, 3], [4, 5, 6], 7) // returns 1
     * min(`[]`) // returns null
     * min(["a", "a1", "b"]) // returns "a"
     */
    min: {
      _func: args => {
        // flatten the args into a single array
        const array = args.reduce((prev, cur) => {
          if (Array.isArray(cur)) prev.push(...cur);
          else prev.push(cur);
          return prev;
        }, []);

        const first = array.find(r => r !== null);
        if (array.length === 0 || first === undefined) return null;
        // use the first value to determine the comparison type
        const isNumber = getTypeName(first, true) === TYPE_NUMBER;
        const compare = isNumber
          ? (prev, cur) => {
            const current = toNumber(cur);
            return prev <= current ? prev : current;
          }
          : (prev, cur) => {
            const current = toString(cur);
            return prev.localeCompare(current) === 1 ? current : prev;
          };

        return array.reduce(compare, isNumber ? toNumber(first) : toString(first));
      },
      _signature: [{ types: [TYPE_ARRAY, TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING], variadic: true }],
    },

    /**
     * Extract the minute (0 through 59) from a time/datetime representation
     * @param {number} date A datetime/time value.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer} Number of minutes in the time portion of the date/time value
     * @function minute
     * @example
     * minute(datetime(2008,5,23,12, 10, 0)) // returns 10
     * minute(time(12, 10, 0)) // returns 10
     */
    minute: {
      _func: args => {
        if (args[0] < 0) {
          return null;
        }
        return getDateObj(args[0]).getMinutes();
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Return the remainder when one number is divided by another number.
     * @param {number} dividend The number for which to find the remainder.
     * @param {number} divisor The number by which to divide number.
     * @return {number} Computes the remainder of `dividend`/`divisor`.
     * If `dividend` is negative, the result will also be negative.
     * @function mod
     * @example
     * mod(3, 2) // returns 1
     * mod(-3, 2) // returns -1
     */
    mod: {
      _func: args => {
        const p1 = args[0];
        const p2 = args[1];
        return p1 % p2;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Finds the month of a date.
     * @param {number} date source date value.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {number} The month number as an integer, ranging from 1 (January) to 12 (December).
     * @function month
     * @example
     * month(datetime(2008,5,23)) // returns 5
     */
    month: {
      // javascript months start from 0
      _func: args => getDateObj(args[0]).getMonth() + 1,
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Compute logical NOT of a value. If the parameter is not boolean it will be cast to boolean
     * as per the type coercion rules.
     * Note the related unary not operator: `!`
     * @param {any} value - any data type
     * @returns {boolean} The logical NOT applied to the input parameter
     * @example
     * not(length("bar") > 0) // returns false
     * not(false()) // returns true
     * not("abcd") // returns false
     * not("") // returns true
     * @function not
     */
    not: {
      _func: resolveArgs => !valueOf(resolveArgs[0]),
      _signature: [{ types: [dataTypes.TYPE_ANY] }],
    },

    /**
     * Finds the first argument that does not resolve to `null`.
     * This function accepts one or more arguments, and will evaluate
     * them in order until a non-null argument is encountered. If all
     * arguments values resolve to null, then return a null value.
     * @param {...any} argument
     * @return {any}
     * @function notNull
     * @example
     * notNull(1, 2, 3, 4, `null`) // returns 1
     * notNull(`null`, 2, 3, 4, `null`) // returns 2
     */
    notNull: {
      _func: resolvedArgs => resolvedArgs.find(arg => getTypeName(arg) !== TYPE_NULL) || null,
      _signature: [{ types: [TYPE_ANY], variadic: true }],
    },
    /**
     * Retrieve the current date/time.
     * @return {number} representation of current date/time as a number
     * @function now
     */
    now: {
      _func: () => getDateNum(Date.now()),
      _signature: [],
    },

    /**
     * Return constant null value.
     * Note that expressions may also use the JSON literal null: `` `null` ``
     * @returns {boolean} True
     * @function null
     */
    null: {
      _func: () => null,
      _signature: [],
    },

    /**
     * Determines the logical OR result of a set of parameters.
     * If the parameters are not boolean they will be cast to
     * boolean as per the type coercion rules.
     * Note the related 'or' operator: `A || B`.
     * @param {any} first logical expression
     * @param {...any} [operand] any number of additional expressions
     * @returns {boolean} The logical result of applying OR to all parameters
     * @example
     * or((x / 2) == y, (y * 2) == x) // true
     * @function or
     */
    or: {
      _func: resolvedArgs => {
        let result = !!valueOf(resolvedArgs[0]);
        resolvedArgs.slice(1).forEach(arg => {
          result = result || !!valueOf(arg);
        });
        return result;
      },
      _signature: [{ types: [dataTypes.TYPE_ANY], variadic: true }],
    },

    /**
     * Computes `a` raised to a power `x`. (a<sup>x</sup>)
     * @param {number} a The base number -- can be any real number.
     * @param {number} x The exponent to which the base number is raised.
     * @return {number}
     * @function power
     * @example
     * power(10, 2) // returns 100 (10 raised to power 2)
     */
    power: {
      _func: args => {
        const type = getTypeName(args[0]);
        if (type === dataTypes.TYPE_ARRAY
              || type === dataTypes.TYPE_ARRAY_STRING || type === dataTypes.TYPE_ARRAY_NUMBER) {
          return args[0].map(a => toNumber(a) ** args[1]);
        }
        return args[0] ** args[1];
      },
      _signature: [
        {
          types: [dataTypes.TYPE_NUMBER, dataTypes.TYPE_ARRAY_NUMBER,
            dataTypes.TYPE_ARRAY_STRING],
        },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Apply proper casing to a string.  Proper casing is where the first letter of each
     * word is converted to an
     * uppercase letter and the rest of the letters in the word converted to lowercase.
     * @param {string} text source string
     * @returns {string} source string with proper casing applied.
     * @function proper
     * @example
     * proper("this is a TITLE") // returns "This Is A Title"
     * proper("2-way street") // returns "2-Way Street"
     * proper("76BudGet") // returns "76Budget"
     */
    proper: {
      _func: args => {
        const capitalize = word => (/\w/.test(word)
          ? `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`
          : word);
        const original = toString(args[0]);
        const wordParts = original.match(/\W+|\w+/g);
        if (wordParts === null) return original;
        const words = wordParts.map(word => {
          const digitParts = word.match(/\d+|[^\d]+/g);
          if (digitParts === null) return capitalize(word);
          return digitParts.map(part => capitalize(part)).join('');
        });
        return words.join('');
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },

    /**
     * Generate a pseudo random number.
     * @returns {number} A value greater than or equal to zero, and less than one.
     * @function random
     * @example
     * random() // 0.022585461160693265
     */
    random: {
      _func: () => Math.random(),
      _signature: [],
    },
    /**
     * Executes a user-supplied reducer expression on each element of an
     * array, in order, passing in the return value from the expression from the preceding element.
     * The final result of running the reducer across all elements of the input array is a
     * single value.
     * The expression can access the following properties of the current object:
     *
     * * accumulated: accumulated value based on the previous expression.
     * For the first array element use the `initialValue` parameter.  If not provided, then `null`
     * * current: current element to process
     * * index: index of the current element in the array
     * * array: original array
     * @param {expression} expr reducer expression to be executed on each element
     * @param {array} elements array of elements on which the expression will be evaluated
     * @param {any} initialValue the accumulated value to pass to the first array element
     * @return {any}
     * @function reduce
     * @example
     * reduce(&(accumulated + current), [1, 2, 3]) // returns 6
     * // find maximum entry by age
     * reduce(
     *   &max(@.accumulated.age, @.current.age),
     *   [{age: 10, name: "Joe"},{age: 20, name: "John"}], @[0].age
     * )
     * reduce(&accumulated * current, [3, 3, 3], 1) // returns 27
     */
    reduce: {
      _func: resolvedArgs => {
        const exprefNode = resolvedArgs[0];
        return resolvedArgs[1].reduce(
          (accumulated, current, index, array) => runtime.interpreter.visit(exprefNode, {
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
     * Register a function.  The registered function may take one parameter.
     * If more parameters are needed, combine them in an array or object.
     * @param {string} functionName Name of the function to register
     * @param {expression} expr Expression to execute with this function call
     * @return {{}} returns an empty object
     * @function register
     * @example
     * register("product", &@[0] * @[1]) // can now call: product([2,21]) => returns 42
     */
    register: {
      _func: resolvedArgs => {
        const functionName = resolvedArgs[0];
        const exprefNode = resolvedArgs[1];

        if (functionMap[functionName] && !functionMap[functionName].custom) {
          // custom functions can be re-registered
          // but not any other functions
          debug.push(`Cannot override function: "${functionName}"`);
          return {};
        }
        functionMap[functionName] = {
          _func: args => runtime.interpreter.visit(exprefNode, ...args),
          _signature: [{ types: [TYPE_ANY], optional: true }],
          _custom: true,
        };
        return {};
      },
      _signature: [
        { types: [TYPE_STRING] },
        { types: [TYPE_EXPREF] },
      ],
    },

    /**
     * Generates text where an old text is substituted at a given start position and
     * length, with a new text.
     * @param {string} text original text
     * @param {integer} start zero-based index in the original text
     * from where to begin the replacement.
     * @param {integer} length number of characters to be replaced
     * @param {string} replacement string to insert at the start index
     * @returns {string}
     * @function replace
     * @example
     * replace("abcdefghijk", 5, 5, "*") // returns abcde*k
     * replace("2009",2,2,"10") // returns  2010
     * replace("123456",0,3,"@") // returns @456
     */
    replace: {
      _func: args => {
        const oldText = toString(args[0]);
        const startNum = args[1];
        const numChars = args[2];
        const newText = toString(args[3]);
        if (startNum < 0) {
          return null;
        }

        const lhs = oldText.substr(0, startNum);
        const rhs = oldText.substr(startNum + numChars);
        return lhs + newText + rhs;
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_STRING] },
      ],
    },

    /**
     * Return text repeated `count` times.
     * @param {string} text text to repeat
     * @param {integer} count number of times to repeat the text
     * @returns {string} Text generated from the repeated text
     * @function rept
     * @example
     * rept("x", 5) // returns "xxxxx"
     */
    rept: {
      _func: args => {
        const text = toString(args[0]);
        const count = args[1];
        if (count < 0) {
          return null;
        }
        return text.repeat(count);
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Reverses the order of an array or string
     * @param {string|array} argument the source to be reversed
     * @return {array} The resulting reversed array or string
     * @function reverse
     * @example
     * reverse(["a", "b", "c"]) // returns ["c", "b", "a"]
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
     * Generates a string from the right-most characters of a string or
     * a subset of elements from the end of an array
     * @param {string|array} subject The text/array containing the characters/elements to extract
     * @param {integer} [elements=1] number of elements to pick
     * @return {string|array} The extracted characters or array subset
     * Returns null if the number of elements is less than 0
     * @function right
     * @example
     * right("Sale Price", 4) // returns "rice"
     * right("Sweden") // returns "n"
     * right([4, 5, 6], 2) // returns [5, 6]
     */
    right: {
      _func: args => {
        const numEntries = args.length > 1 ? args[1] : 1;
        if (numEntries < 0) return null;
        if (args[0] instanceof Array) {
          if (numEntries === 0) return [];
          return args[0].slice(numEntries * -1);
        }
        const text = toString(args[0]);
        const start = text.length - numEntries;
        return text.substr(start, numEntries);
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING, dataTypes.TYPE_ARRAY] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Round a number to a specified precision:
     *
     * * If `precision` is greater than zero, round to the specified number of decimal places.
     * * If `precision` is 0, round to the nearest integer.
     * * If `precision` is less than 0, round to the left of the decimal point.
     * @param {number} num number to round
     * @param {integer} precision precision to use for the rounding operation.
     * @returns {number} rounded value
     * @function round
     * @example
     * round(2.15, 1) // returns 2.2
     * round(626.3,-3) // returns 1000 (Rounds 626.3 to the nearest multiple of 1000)
     * round(626.3, 0) // returns 626
     * round(1.98,-1) // returns 0 (Rounds 1.98 to the nearest multiple of 10)
     * round(-50.55,-2) // -100 (round -50.55 to the nearest multiple of 100)
     */
    round: {
      _func: args => round(args[0], args[1]),
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Perform a wildcard search.  The search is case-sensitive and supports two forms of wildcards:
     * `*` finds a sequence of characters and `?` finds a single character.
     * To use `*` or `?` as text values, precede them with a tilde (`~`) character.
     * Note that the wildcard search is not greedy.
     * e.g. `search("a{asterisk}b", "abb")` will return `[0, "ab"]` Not `[0, "abb"]`
     * @param {string} findText the search string -- which may include wild cards.
     * @param {string} withinText The string to search.
     * @param {integer} [startPos=0] The zero-based position of withinText to start searching.
     * @returns {array} returns an array with two values:
     *
     * * The start position of the found text and the text string that was found.
     * * If a match was not found, an empty array is returned.
     * @function search
     * @example
     * search("a?c", "acabc") // returns [2, "abc"]
     */
    search: {
      _func: args => {
        const findText = toString(args[0]);
        const withinText = toString(args[1]);
        const startPos = args.length > 2 ? args[2] : 0;
        if (findText === null || withinText === null || withinText.length === 0) return [];
        // escape all characters that would otherwise create a regular expression
        const reString = findText.replace(/([[.\\^$()+{])/g, '\\$1')
          // add the single character wildcard
          .replace(/~?\?/g, match => (match === '~?' ? '\\?' : '.'))
          // add the multi-character wildcard
          .replace(/~?\*/g, match => (match === '~*' ? '\\*' : '.*?'))
          // get rid of the escape characters
          .replace(/~~/g, '~');
        const re = new RegExp(reString);
        const result = withinText.substring(startPos).match(re);
        if (result === null) return [];
        return [result.index + startPos, result[0]];
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
        { types: [dataTypes.TYPE_STRING] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
      ],

    },

    /**
     * Extract the seconds of the time value in a time/datetime representation
     * @param {number} date datetime/time for which the second is to be returned.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer} The number of seconds: 0 through 59
     * @function second
     * @example
     * second(datetime(2008,5,23,12, 10, 53)) // returns 53
     * second(time(12, 10, 53)) // returns 53
     */
    second: {
      _func: args => (args[0] < 0 ? null : getDateObj(args[0]).getSeconds()),
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * This function accepts an array of strings or numbers and returns a
     * re-orderd array with the elements in sorted order.
     * String sorting is based on code points. Locale is not taken into account.
     * @param {number[]|string[]} list to be sorted
     * @return {number[]|string[]} The ordered result
     * @function sort
     * @example
     * sort([1, 2, 4, 3, 1]) // returns [1, 1, 2, 3, 4]
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
     * Sort an array using an expression to find the sort key. For each element
     * in the array, the expression is applied and the resulting
     * value is used as the sort value. If the result of
     * evaluating the expression against the current array element results in type
     * other than a number or a string, a type-error will occur.
     * @param {array} elements Array to be sorted
     * @param {expression} expr The comparision expression
     * @return {array} The sorted array
     * @function sortBy
     * @example
     * sortBy(["abcd", "e", "def"], &length(@)) // returns ["e", "def", "abcd"]
     *
     * // returns [{year: 1910}, {year: 2010}, {year: 2020}]
     * sortBy([{year: 2010}, {year: 2020}, {year: 1910}], &year)
     * sortBy([-15, 30, -10, -11, 5], &abs(@)) // [5, -10, -11, -15, 30]
     */
    sortBy: {
      _func: resolvedArgs => {
        const sortedArray = resolvedArgs[0].slice(0);
        if (sortedArray.length === 0) {
          return sortedArray;
        }
        const exprefNode = resolvedArgs[1];
        const requiredType = getTypeName(
          runtime.interpreter.visit(exprefNode, sortedArray[0]),
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
          const exprA = runtime.interpreter.visit(exprefNode, a[1]);
          const exprB = runtime.interpreter.visit(exprefNode, b[1]);
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
          // If they"re equal compare the items by their
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
     * split a string into an array, given a separator
     * @param {string} string string to split
     * @param {string} separator separator where the split(s) should occur
     * @return {string[]}
     * @function split
     * @example
     * split("abcdef", "") // returns ["a", "b", "c", "d", "e", "f"]
     * split("abcdef", "e") // returns ["abcd", "f"]
     */
    split: {
      _func: args => {
        const str = toString(args[0]);
        const separator = toString(args[1]);
        return str.split(separator);
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
        { types: [dataTypes.TYPE_STRING] },
      ],
    },

    /**
         * Return the square root of a number
         * @param {number} num source number
         * @return {number} the calculated square root value
         * @function sqrt
         * @example
         * sqrt(4) // returns 2
         */
    sqrt: {
      _func: args => {
        const result = Math.sqrt(args[0]);
        return Number.isNaN(result) ? null : result;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Determine if a string starts with a prefix.
     * @param {string} subject string to search
     * @param {string} prefix prefix to search for
     * @return {boolean} true if `prefix` matches the start of `subject`
     * @function startsWith
     * @example
     * startsWith("jack is at home", "jack") // returns true
     */
    startsWith: {
      _func: resolvedArgs => valueOf(resolvedArgs[0]).startsWith(valueOf(resolvedArgs[1])),
      _signature: [{ types: [TYPE_STRING] }, { types: [TYPE_STRING] }],
    },
    /**
     * Estimates standard deviation based on a sample.
     * `stdev` assumes that its arguments are a sample of the entire population.
     * If your data represents a entire population,
     * then compute the standard deviation using [stdevp]{@link stdevp}.
     * @param {number[]} numbers The array of numbers comprising the population
     * @returns {number} [Standard deviation](https://en.wikipedia.org/wiki/Standard_deviation)
     * @function stdev
     * @example
     * stdev([1345, 1301, 1368]) // returns 34.044089061098404
     * stdevp([1345, 1301, 1368]) // returns 27.797
     */
    stdev: {
      _func: args => {
        const values = args[0];
        if (values.length <= 1) {
          return null;
        }
        const coercedValues = values.map(value => toNumber(value));
        const mean = coercedValues.reduce((a, b) => a + b, 0) / values.length;
        const sumSquare = coercedValues.reduce((a, b) => a + b * b, 0);
        const result = Math.sqrt((sumSquare - values.length * mean * mean) / (values.length - 1));
        if (Number.isNaN(result)) {
          // this would never happen
          return null;
        }
        return result;
      },
      _signature: [
        { types: [dataTypes.TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Calculates standard deviation based on the entire population given as arguments.
     * `stdevp` assumes that its arguments are the entire population.
     * If your data represents a sample of the population,
     * then compute the standard deviation using [stdev]{@link stdev}.
     * @param {number[]} numbers The array of numbers comprising the population
     * @returns {number} Calculated standard deviation
     * @function stdevp
     * @example
     * stdevp([1345, 1301, 1368]) // returns 27.797
     * stdev([1345, 1301, 1368]) // returns 34.044
     */
    stdevp: {
      _func: args => {
        const values = args[0];
        if (values.length === 0) {
          return null;
        }
        const coercedValues = values.map(value => toNumber(value));
        const mean = coercedValues.reduce((a, b) => a + b, 0) / values.length;
        const meanSumSquare = coercedValues.reduce((a, b) => a + b * b, 0) / values.length;
        const result = Math.sqrt(meanSumSquare - mean * mean);
        return Number.isNaN(result) ? null : result;
      },
      _signature: [
        { types: [dataTypes.TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Generates a string from the input `text`,
     * with text `old` replaced by text `new` (when searching from the left).
     * If there is no match, or if `old` has length 0, `text` is returned unchanged.
     * Note that `old` and `new` may have different lengths. If `which` < 1, return `text` unchanged
     * @param {string} text The text for which to substitute characters.
     * @param {string} old The text to replace.
     * @param {string} new The text to replace `old` with.
     * @param {integer} [which] The one-based occurrence of `old` text to replace with `new` text.
     * If `which` parameter is omitted, every occurrence of `old` is replaced with `new`.
     * @returns {string} replaced string
     * @function substitute
     * @example
     * substitute("Sales Data", "Sales", "Cost") // returns "Cost Data"
     * substitute("Quarter 1, 2008", "1", "2", 1) // returns "Quarter 2, 2008"
     * substitute("Quarter 1, 1008", "1", "2", 2) // returns "Quarter 1, 2008"
     */
    substitute: {
      _func: args => {
        const src = toString(args[0]);
        const old = args[1];
        const replacement = args[2];
        // no third parameter? replace all instances
        if (args.length <= 3) return src.replaceAll(old, replacement);
        const whch = args[3];
        if (whch < 1) return src;
        // find the instance to replace
        let pos = -1;
        for (let i = 0; i < whch; i += 1) {
          pos += 1;
          const nextFind = src.slice(pos).indexOf(old);
          // no instance to match "Which"
          if (nextFind === -1) return src;
          pos += nextFind;
        }
        return src.slice(0, pos) + src.slice(pos).replace(old, replacement);
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
        { types: [dataTypes.TYPE_STRING] },
        { types: [dataTypes.TYPE_STRING] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Calculates the sum of the provided array.
     * An empty array will produce a return value of 0.
     * @param {number[]} collection array of elements
     * @return {number} The sum of elements
     * @function sum
     * @example
     * sum([1, 2, 3]) // returns 6
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
     * Construct and returns a time value.
     * @param {integer} hours Zero-based integer value between 0 and 23 representing
     * the hour of the day.
     * @param {integer} [minutes=0] Zero-based integer value representing
     * the minute segment of a time.
     * @param {integer} [seconds=0] Zero-based integer value representing the seconds
     * segment of a time.
     * @return {number} Returns a date/time value representing the fraction
     * of the day consumed by the given time
     * @function time
     * @example
     * time(12, 0, 0) | [hour(@), minute(@), second(@)] // returns [12, 0, 0]
     */
    time: {
      _func: args => {
        const hours = args[0];
        const minutes = args.length > 1 ? args[1] : 0;
        const seconds = args.length > 2 ? args[2] : 0;
        if (hours < 0 || minutes < 0 || seconds < 0) return null;
        // Since time values are interchangeable with date and datetime values, it"s consistent
        // to create them at the epoch
        const epochTime = new Date(1970, 0, 1, hours, minutes, seconds);
        return getDateNum(epochTime);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Converts the provided argument to an array.
     * The conversion happens as per the following rules:
     *
     * * array - Returns the provided value.
     * * number/string/object/boolean/null - Returns a one element array containing the argument.
     * @param {any} arg parameter to turn into an array
     * @return {array} The resulting array
     * @function toArray
     * @example
     * toArray(1) // returns [1]
     * toArray(null()) // returns [`null`]
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
     * Returns a date/time value representing the start of the current day. i.e. midnight
     * @return {number} today at midnight
     * @function today
     */
    today: {
      _func: () => {
        const now = new Date(Date.now());
        // We used to take the floor() to truncate h/m/s from Date.now(), but that would return
        // today at UTC time.  We want today in local time.
        // i.e. UTC time could be a day ahead or behind
        // But note that means that the result is not an integer.
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return getDateNum(today);
      },
      _signature: [],
    },

    /**
     * Converts the provided arg to a number. The conversion happens as per the type coercion rules.
     *
     * @param {any} arg to convert to number
     * @return {number}
     * @function toNumber
     * @example
     * toNumber(1) // returns 1
     * toNumber("10") // returns 10
     * toNumber({a: 1}) // returns null
     * toNumber(true()) // returns 1
     * toNumber("10f") // returns 0
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
        if (typeName === TYPE_BOOLEAN) {
          if (resolvedArgs[0] === true) {
            return 1;
          }
          return 0;
        }
        return null;
      },
      _signature: [{ types: [TYPE_ANY] }],
    },

    /**
     * Converts the provided argument to a string.
     * The conversion happens as per the type coercion rules.
     * @param {any} arg Value to be converted to a string
     * @return {string} The result string
     * @function toString
     * @example
     * toString(1) // returns "1"
     * toString(true()) // returns "true"
     * toString({sum: 12 + 13}) // "{"sum":25}"
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
     * Remove leading and trailing spaces, and replace all internal multiple spaces
     * with a single space.
     * @param {string} text string to trim
     * @return {string} trimmed string
     * @function trim
     * @example
     * trim("   ab    c   ") // returns "ab c"
     */
    trim: {
      _func: args => {
        const text = toString(args[0]);
        // only removes the space character
        // other whitespace characters like \t \n left intact
        return text.split(' ').filter(x => x).join(' ');
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },

    /**
     * Return constant boolean true value.
     * Note that expressions may also use the JSON literal true: `` `true` ``
     * @returns {boolean} True
     * @function true
     */
    true: {
      _func: () => true,
      _signature: [],
    },

    /**
         * Truncates a number to an integer by removing the fractional part of the number.
         * @param {number} numA number to truncate
         * @param {integer} [numB=0] A number specifying the number of decimal digits to preserve.
         * @return {number} Truncated value
         * @function trunc
         * @example
         * trunc(8.9) // returns 8
         * trunc(-8.9) // returns -8
         * trunc(8.912, 2) // returns 8.91
         */
    trunc: {
      _func: args => {
        const number = args[0];
        const digits = args.length > 1 ? args[1] : 0;
        const method = number >= 0 ? Math.floor : Math.ceil;
        return method(number * 10 ** digits) / 10 ** digits;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Finds the JavaScript type of the given `subject` argument as a string value.
     * The return value MUST be one of the following:
     *
     * * number
     * * string
     * * boolean
     * * array
     * * object
     * * null
     * @param {any} subject type to evaluate
     * @return {string} The type of the subject
     *
     * @function type
     * @example
     * type(1) // returns "number"
     * type("") // returns "string"
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
     * Find the set of unique elements within an array
     * @param {array} input input array
     * @return {array} array with duplicate elements removed
     * @function unique
     * @example
     * unique([1, 2, 3, 4, 1, 1, 2]) // returns [1, 2, 3, 4]
     */
    unique: {
      _func: args => {
        // create an array of values for searching.  That way if the array elements are
        // represented by objects with a valueOf(), then we"ll locate them in the valueArray
        const valueArray = args[0].map(a => valueOf(a));
        return args[0].filter((v, index) => valueArray.indexOf(valueOf(v)) === index);
      },
      _signature: [
        { types: [dataTypes.TYPE_ARRAY] },
      ],
    },

    /**
     * Converts all the alphabetic characters in a string to uppercase.
     * If the value is not a string it will be converted into string
     * according to the type coercion rules.
     * @param {string} input input string
     * @returns {string} the upper case value of the input string
     * @function upper
     * @example
     * upper("abcd") // returns "ABCD"
     */
    upper: {
      _func: args => toString(args[0]).toUpperCase(),
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },

    /**
     * Perform an indexed lookup on an object or array
     * @param {object | array} object on which to perform the lookup
     * @param {string | integer} index a named child for an object or an integer offset for an array
     * @returns {any} the result of the lookup -- or `null` if not found.
     * @function value
     * @example
     * value({a: 1, b:2, c:3}, "a") // returns 1
     * value([1, 2, 3, 4], 2) // returns 3
     */
    value: {
      _func: args => {
        const obj = args[0] || {};
        const index = args[1];
        const result = getProperty(obj, index);

        if (result === undefined) {
          debugAvailable(debug, obj, index);
          return null;
        }
        return result;
      },
      _signature: [
        { types: [dataTypes.TYPE_OBJECT, dataTypes.TYPE_ARRAY, dataTypes.TYPE_NULL] },
        { types: [dataTypes.TYPE_STRING, dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Generates an array of the values of the provided object.
     * Note that because JSON objects are
     * inherently unordered, the values associated with the provided object are
     * also unordered.
     * @param {object} obj source object
     * @return {array} array of the key values
     * @function values
     * @example
     * values({a : 3, b : 4}) // returns [3, 4]
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
     * Extract the day of the week from a date.
     * The specific numbering of the day of week is controlled by the `returnType` parameter:
     *
     * * 1 : Sunday (1), Monday (2), ..., Saturday (7)
     * * 2 : Monday (1), Tuesday (2), ..., Sunday(7)
     * * 3 : Monday (0), Tuesday (2), ...., Sunday(6)
     * @param {number} date datetime for which the day of the week is to be returned.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @param {integer} [returnType=1] Determines the
     * representation of the result
     * @returns {integer} day of the week
     * @function weekday
     * @example
     * weekday(datetime(2006,5,21)) // 1
     * weekday(datetime(2006,5,21), 2) // 7
     * weekday(datetime(2006,5,21), 3) // 6
     */
    weekday: {
      _func: args => {
        const date = args[0];
        const type = args.length > 1 ? args[1] : 1;
        const jsDate = getDateObj(date);
        const day = jsDate.getDay();
        // day is in range [0-7) with 0 mapping to sunday
        switch (type) {
          case 1:
            // range = [1, 7], sunday = 1
            return day + 1;
          case 2:
            // range = [1, 7] sunday = 7
            return ((day + 6) % 7) + 1;
          case 3:
            // range = [0, 6] sunday = 6
            return (day + 6) % 7;
          default:
            return null;
        }
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Finds the year of a datetime value
     * @param {number} date input date/time value.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer} The year value
     * @function year
     * @example
     * year(datetime(2008,5,23)) // returns 2008
     */
    year: {
      _func: args => getDateObj(args[0]).getFullYear(),
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * Generates a convolved (zipped) array containing grouped arrays of values from
     * the array arguments from index 0, 1, 2, etc.
     * This function accepts a variable number of arguments.
     * The length of the returned array is equal to the length of the shortest array.
     * @param {...array} arrays array of arrays to zip together
     * @return {array} An array of arrays with elements zipped together
     * @function zip
     * @example
     * zip([1, 2, 3], [4, 5, 6, 7]) // returns [[1, 4], [2, 5], [3, 6]]
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
  return functionMap;
}