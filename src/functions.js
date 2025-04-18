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
import { dataTypes, typeNameTable } from './dataTypes.js';
import {
  getProperty, debugAvailable, toBoolean, strictDeepEqual,
} from './utils.js';
import { evaluationError, functionError, typeError } from './errors.js';

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

function validNumber(n, context) {
  if (Number.isNaN(n) || !Number.isFinite(n)) {
    throw evaluationError(`Call to "${context}()" resulted in an invalid number`);
  }
  return n;
}

export default function functions(
  runtime,
  isObject,
  toNumber,
  getType,
  isArrayType,
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
    TYPE_ARRAY_ARRAY,
  } = dataTypes;

  function toInteger(num) {
    let n = valueOf(num);
    // functions that require an integer parameter will have declared
    // the parameters as a number, so any strings will have already been
    // converted to number before the function call.
    // However, a few functions accept a string | integer. Attempt to convert
    // to integer in these cases, but failure isn't an error.
    if (getType(n) === TYPE_STRING) n = toNumber(n);
    n = Math.trunc(num);
    if (Number.isNaN(n)) return num;
    return n;
  }

  function toJSON(arg, indent) {
    const value = valueOf(arg);
    if (getType(value) === TYPE_STRING) {
      return arg;
    }
    const offset = indent ? toInteger(indent) : 0;
    return JSON.stringify(value, null, offset);
  }

  function balanceArrays(listOfArrays) {
    const maxLen = Math.max(...listOfArrays.map(a => (Array.isArray(a) ? a.length : 0)));
    const allArrays = listOfArrays.map(a => {
      if (Array.isArray(a)) {
        return a.concat(Array(maxLen - a.length).fill(null));
      }
      return Array(maxLen).fill(a);
    });
    // convolve allArrays
    const arrays = [];
    for (let i = 0; i < maxLen; i += 1) {
      const row = [];
      for (let j = 0; j < allArrays.length; j += 1) {
        row.push(allArrays[j][i]);
      }
      arrays.push(row);
    }
    return arrays;
  }

  function evaluate(args, fn) {
    if (args.some(Array.isArray)) {
      return balanceArrays(args).map(a => evaluate(a, fn));
    }
    return fn(...args);
  }

  function datedifFn(date1Arg, date2Arg, unitArg) {
    const unit = toString(unitArg).toLowerCase();
    const date1 = getDateObj(date1Arg);
    const date2 = getDateObj(date2Arg);
    if (date2 === date1) return 0;
    if (date2 < date1) throw functionError('end_date must be >= start_date in datedif()');

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
    throw functionError(`Unrecognized unit parameter "${unit}" for datedif()`);
  }

  function endsWithFn(searchArg, suffixArg) {
    const searchStr = valueOf(searchArg);
    const suffix = valueOf(suffixArg);
    // make sure the comparison is based on code points
    const search = Array.from(searchStr).reverse();
    const ending = Array.from(suffix).reverse();
    return ending.every((c, i) => c === search[i]);
  }

  function eomonthFn(dateArg, monthsArg) {
    const jsDate = getDateObj(dateArg);
    const months = toInteger(monthsArg);
    // We can give the constructor a month value > 11 and it will increment the years
    // Since day is 1-based, giving zero will yield the last day of the previous month
    const newDate = new Date(jsDate.getFullYear(), jsDate.getMonth() + months + 1, 0);
    return getDateNum(newDate);
  }

  function findFn(queryArg, textArg, offsetArg) {
    const query = Array.from(toString(queryArg));
    const text = Array.from(toString(textArg));
    const offset = toInteger(offsetArg);
    if (offset < 0) throw evaluationError('find() start position must be >= 0');
    if (query.length === 0) {
      // allow an empty string to be found at any position -- including the end
      if (offset > text.length) return null;
      return offset;
    }
    for (let i = offset; i < text.length; i += 1) {
      if (text.slice(i, i + query.length).every((c, j) => c === query[j])) {
        return i;
      }
    }
    return null;
  }

  function properFn(arg) {
    const capitalize = word => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    const original = toString(arg);
    // split the string by whitespace, punctuation, and numbers
    const wordParts = original.match(/[\s\d\p{P}]+|[^\s\d\p{P}]+/gu);
    if (wordParts !== null) return wordParts.map(w => capitalize(w)).join('');
    return capitalize(original);
  }

  function reptFn(textArg, countArg) {
    const text = toString(textArg);
    const count = toInteger(countArg);
    if (count < 0) throw evaluationError('rept() count must be greater than or equal to 0');
    return text.repeat(count);
  }

  function searchFn(findTextString, withinTextString, startPosInt = 0) {
    const findText = toString(findTextString);
    const withinText = toString(withinTextString);
    const startPos = toInteger(startPosInt);
    if (startPos < 0) throw functionError('search() startPos must be greater than or equal to 0');
    if (findText === null || withinText === null || withinText.length === 0) return [];

    // Process as an array of code points
    // Find escapes and wildcards
    const globString = Array.from(findText).reduce((acc, cur) => {
      if (acc.escape) return { escape: false, result: acc.result.concat(cur) };
      if (cur === '\\') return { escape: true, result: acc.result };
      if (cur === '?') return { escape: false, result: acc.result.concat('dot') };
      if (cur === '*') {
        // consecutive * are treated as a single *
        if (acc.result.slice(-1).pop() === 'star') return acc;
        return { escape: false, result: acc.result.concat('star') };
      }
      return { escape: false, result: acc.result.concat(cur) };
    }, { escape: false, result: [] }).result;

    const testMatch = (array, glob, match) => {
      // we've consumed the entire glob, so we're done
      if (glob.length === 0) return match;
      // we've consumed the entire array, but there's still glob left -- no match
      if (array.length === 0) return null;
      const testChar = array[0];
      let [globChar, ...nextGlob] = glob;
      const isStar = globChar === 'star';
      if (isStar) {
        // '*' is at the end of the match -- so we're done matching
        if (glob.length === 1) return match;
        // we'll check for a match past the * and if not found, we'll process the *
        [globChar, ...nextGlob] = glob.slice(1);
      }
      if (testChar === globChar || globChar === 'dot') {
        return testMatch(array.slice(1), nextGlob, match.concat(testChar));
      }
      // no match, so consume wildcard *
      if (isStar) return testMatch(array.slice(1), glob, match.concat(testChar));

      return null;
    };
    // process code points
    const within = Array.from(withinText);
    for (let i = startPos; i < within.length; i += 1) {
      const result = testMatch(within.slice(i), globString, []);
      if (result !== null) return [i, result.join('')];
    }
    return [];
  }

  function splitFn(strArg, separatorArg) {
    const str = toString(strArg);
    const separator = toString(separatorArg);
    // for empty separator, return an array of code points
    return separator.length === 0 ? Array.from(str) : str.split(separator);
  }

  function startsWithFn(subjectString, prefixString) {
    const subject = Array.from(toString(subjectString));
    const prefix = Array.from(toString(prefixString));
    if (prefix.length > subject.length) return false;
    for (let i = 0; i < prefix.length; i += 1) {
      if (prefix[i] !== subject[i]) return false;
    }
    return true;
  }

  function substituteFn(source, oldString, replacementString, nearest) {
    const src = Array.from(toString(source));
    const old = Array.from(toString(oldString));
    const replacement = Array.from(toString(replacementString));

    if (old.length === 0) return source;

    // no third parameter? replace all instances
    let replaceAll = true;
    let whch = 0;
    if (nearest > -1) {
      replaceAll = false;
      whch = nearest + 1;
    }

    let found = 0;
    const result = [];
    // find the instances to replace
    for (let j = 0; j < src.length;) {
      const match = old.every((c, i) => src[j + i] === c);
      if (match) found += 1;
      if (match && (replaceAll || found === whch)) {
        result.push(...replacement);
        j += old.length;
      } else {
        result.push(src[j]);
        j += 1;
      }
    }
    return result.join('');
  }

  function truncFn(number, d) {
    const digits = toInteger(d);

    const method = number >= 0 ? Math.floor : Math.ceil;
    return method(number * 10 ** digits) / 10 ** digits;
  }

  function weekdayFn(date, type) {
    const jsDate = getDateObj(date);
    const day = jsDate.getDay();
    // day is in range [0-7) with 0 mapping to sunday
    switch (toInteger(type)) {
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
        throw functionError(`Unsupported returnType: "${type}" for weekday()`);
    }
  }

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
     * Find the absolute (non-negative) value of the provided argument `value`.
     * @param {number|number[]} value A numeric value
     * @return {number|number[]} If `value < 0`, returns `-value`, otherwise returns `value`
     * @function abs
     * @example
     * abs(-1) // returns 1
     */
    abs: {
      _func: args => evaluate(args, Math.abs),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },
    /**
     * Compute the inverse cosine (in radians) of a number.
     * @param {number|number[]} cosine A number between -1 and 1, inclusive,
     * representing the angle's cosine value.
     * @return {number|number[]} The inverse cosine angle in radians between 0 and PI
     * @function acos
     * @example
     * acos(0) => 1.5707963267948966
     */
    acos: {
      _func: args => evaluate(args, n => validNumber(Math.acos(n), 'acos')),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Finds the logical AND result of all parameters.
     * If the parameters are not boolean they will be <<_type_coercion_rules,cast to boolean>>.
     * Note the related <<_and_operator, And Operator>>.
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
        let result = toBoolean(valueOf(resolvedArgs[0]));
        resolvedArgs.slice(1).forEach(arg => {
          result = result && toBoolean(valueOf(arg));
        });
        return result;
      },
      _signature: [{ types: [TYPE_ANY], variadic: true }],
    },

    /**
     * Compute the inverse sine (in radians) of a number.
     * @param {number|number[]} sine A number between -1 and 1, inclusive,
     * representing the angle's sine value.
     * @return {number|number[]} The inverse sine angle in radians between -PI/2 and PI/2
     * @function asin
     * @example
     * Math.asin(0) => 0
     */
    asin: {
      _func: args => evaluate(args, n => validNumber(Math.asin(n), 'asin')),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Compute the angle in the plane (in radians) between the positive
     * x-axis and the ray from (0, 0) to the point (x, y)
     * @param {number|number[]} y The y coordinate of the point
     * @param {number|number[]} x The x coordinate of the point
     * @return {number|number[]} The angle in radians (between -PI and PI),
     * between the positive x-axis and the ray from (0, 0) to the point (x, y).
     * @function atan2
     * @example
     * atan2(20,10) => 1.1071487177940904
     */
    atan2: {
      _func: args => evaluate(args, Math.atan2),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Finds the average of the elements in an array.
     * Non-numeric values (text, boolean, null, object) are ignored.
     * If there are nested arrays, they are flattened.
     * If the array is empty, an evaluation error is thrown
     * @param {any[]} elements array of values
     * @return {number} average value
     * @function avg
     * @example
     * avg([1, 2, 3]) // returns 2
     */
    avg: {
      _func: resolvedArgs => {
        let sum = 0;
        const filtered = resolvedArgs
          .flat(Infinity)
          .filter(a => getType(a) === TYPE_NUMBER);

        if (filtered.length === 0) throw evaluationError('avg() requires at least one argument');
        filtered.forEach(a => {
          sum += a;
        });
        return sum / filtered.length;
      },
      _signature: [{ types: [TYPE_ARRAY] }],
    },

    /**
     * Finds the average of the elements in an array, converting strings and booleans to number.
     * If any conversions to number fail, a type error is thrown.
     * If there are nested arrays, they are flattened.
     * If the array is empty, an evaluation error is thrown
     * @param {number[]} elements array of numeric values
     * @return {number} average value
     * @function avgA
     * @example
     * avgA([1, 2, "3", null()]) // returns 2
     */
    avgA: {
      _func: resolvedArgs => {
        let sum = 0;
        let filtered;
        try {
          filtered = resolvedArgs
            .flat(Infinity)
            .filter(a => getType(a) !== TYPE_NULL)
            .map(toNumber);
        } catch (_e) {
          throw typeError('avgA() received non-numeric parameters');
        }
        if (filtered.length === 0) throw evaluationError('avg() requires at least one argument');
        filtered.forEach(a => {
          sum += a;
        });
        return sum / filtered.length;
      },
      _signature: [{ types: [TYPE_ARRAY] }],
    },

    /**
     * Generates a lower-case string of the `input` string using locale-specific mappings.
     * e.g. Strings with German letter <span>&#223;</span> (eszett) can be compared to "ss"
     * @param {string|string[]} input string to casefold
     * @returns {string|string[]} A new string converted to lower case
     * @function casefold
     * @example
     * casefold("AbC") // returns "abc"
     */
    casefold: {
      _func: (args, _data, interpreter) => evaluate(args, s => toString(s)
        .toLocaleUpperCase(interpreter.language)
        .toLocaleLowerCase(interpreter.language)),
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
      ],
    },

    /**
     * Finds the next highest integer value of the argument `num` by rounding up if necessary.
     * i.e. ceil() rounds toward positive infinity.
     * @param {number|number[]} num numeric value
     * @return {integer|integer[]} The smallest integer greater than or equal to num
     * @function ceil
     * @example
     * ceil(10) // returns 10
     * ceil(10.4) // return 11

     */
    ceil: {
      _func: args => evaluate(args, Math.ceil),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },
    /**
     * Retrieve the first code point from a string
     * @param {string|string[]} str source string.
     * @return {integer|integer[]} Unicode code point value.
     * If the input string is empty, returns `null`.
     * @function codePoint
     * @example
     * codePoint("ABC") // 65
     */
    codePoint: {
      _func: args => evaluate(args, arg => {
        const text = toString(arg);
        return text.length === 0 ? null : text.codePointAt(0);
      }),
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
      ],
    },

    /**
     * Determines if the given `subject` contains `search`.
     * If `subject` is an array, this function returns true if one of the elements
     * in the array is equal to the `search` value. If `subject`
     * is a string, return true if the string contains the
     * `search` value.
     * @param {array|string} subject The element to be searched
     * @param {any} search element to find.
     * If `subject` is an array, search for an exact match for `search` in the array.
     * If `subject` is a string, `search` must also be a string.
     * @return {boolean} true if found
     * @function contains
     * @example
     * contains([1, 2, 3, 4], 2) // returns true
     * contains([1, 2, 3, 4], -1) // returns false
     * contains("Abcd", "d") // returns true
     * contains("Abcd", "x") // returns false

     */
    contains: {
      _func: resolvedArgs => {
        const subject = valueOf(resolvedArgs[0]);
        const search = valueOf(resolvedArgs[1]);
        if (isArrayType(resolvedArgs[0])) {
          return subject.some(s => strictDeepEqual(s, search));
        }
        const source = Array.from(subject);
        if (getType(search) !== TYPE_STRING) {
          throw typeError('contains() requires a string search value for string subjects');
        }
        if (search === '') return true;
        const searchLen = Array.from(search).length;
        for (let i = 0; i < source.length; i += 1) {
          if (source.slice(i, i + searchLen).join('') === search) return true;
        }
        return false;
      },
      _signature: [{ types: [TYPE_STRING, TYPE_ARRAY] },
        { types: [TYPE_ANY] }],
    },
    /**
     * Compute the cosine (in radians) of a number.
     * @param {number|number[]} angle A number representing an angle in radians
     * @return {number|number[]} The cosine of the angle, between -1 and 1, inclusive.
     * @function cos
     * @example
     * cos(1.0471975512) => 0.4999999999970535
     */
    cos: {
      _func: args => evaluate(args, Math.cos),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Return difference between two date values.
     * The measurement of the difference is determined by the `unit` parameter. One of:
     *
     * * `y` the number of whole years between `start_date` and `end_date`
     * * `m` the number of whole months between `start_date` and `end_date`.
     * * `d` the number of days between `start_date` and `end_date`
     * * `ym` the number of whole months between `start_date` and `end_date`
     * after subtracting whole years.
     * * `yd` the number of days between `start_date` and `end_date`, assuming `start_date`
     * and `end_date` were no more than one year apart
     * @param {number|number[]} start_date The starting <<_date_and_time_values, date/time value>>.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [toDate]{@link todate}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @param {number|number[]} end_date The end <<_date_and_time_values, date/time value>> -- must
     * be greater or equal to start_date. If not, an error will be thrown.
     * @param {string|string[]} unit Case-insensitive string representing the unit of
     * time to measure.  An unrecognized unit will result in an error.
     * @returns {integer|integer[]} The number of days/months/years difference
     * @function datedif
     * @example
     * datedif(datetime(2001, 1, 1), datetime(2003, 1, 1), "y") // returns 2
     * datedif(datetime(2001, 6, 1), datetime(2003, 8, 15), "D") // returns 805
     * // 805 days between June 1, 2001, and August 15, 2003
     * datedif(datetime(2001, 6, 1), datetime(2003, 8, 15), "YD") // returns 75
     * // 75 days between June 1 and August 15, ignoring the years of the dates (75)
     */
    datedif: {
      _func: args => evaluate(args, datedifFn),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
      ],
    },

    /**
     * Generate a date/time value from individual date/time parts.
     * If any of the units are greater than their normal range,
     * the overflow will be added to the next greater unit.
     * e.g. specifying 25 hours will increment the day value by 1.
     * Similarly,
     * negative values will decrement the next greater unit.
     * e.g. datetime(year, month, day - 30) will return a date 30 days earlier.
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
     * @returns {number} A <<_date_and_time_values, date/time value>>
     * to be used with other date/time functions
     * @function datetime
     * @example
     * datetime(2010, 10, 10) // returns representation of October 10, 2010
     * datetime(2010, 2, 28) // returns representation of February 28, 2010
     * datetime(2023,13,5) | year(@) & "/" & month(@) // returns 2024/1
     */
    datetime: {
      _func: args => {
        const year = toInteger(args[0]);
        const month = toInteger(args[1]) - 1; // javascript months start from 0
        const day = toInteger(args[2]);
        const hours = args.length > 3 ? toInteger(args[3]) : 0;
        const minutes = args.length > 4 ? toInteger(args[4]) : 0;
        const seconds = args.length > 5 ? toInteger(args[5]) : 0;
        const ms = args.length > 6 ? toInteger(args[6]) : 0;

        const baseDate = new Date(year, month, day, hours, minutes, seconds, ms);

        return getDateNum(baseDate);
      },
      _signature: [
        { types: [TYPE_NUMBER] },
        { types: [TYPE_NUMBER] },
        { types: [TYPE_NUMBER] },
        { types: [TYPE_NUMBER], optional: true },
        { types: [TYPE_NUMBER], optional: true },
        { types: [TYPE_NUMBER], optional: true },
        { types: [TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Finds the day of the month for a date value
     * @param {number|number[]} date <<_date_and_time_values, date/time value>> generated using the
     * [datetime]{@link datetime}, [toDate]{@link todate}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer|integer[]} The day of the month ranging from 1 to 31.
     * @function day
     * @example
     * day(datetime(2008,5,23)) // returns 23
     */
    day: {
      _func: args => evaluate(args, a => getDateObj(a).getDate()),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Debug a json-formula expression.
     * The `debug()` function allows users to inspect a sub-expression within a formula.
     * @param {any} arg The expression to return from `debug()` function,
     * and the default expression to be debugged. May be any type except an expression.
     * @param {any|expression} [displayValue=arg] Optionally override the value to be debugged.
     * `displayValue` may be an expression to
     * be evaluated with the context of `arg`.
     * @returns {any} The value of the `arg` parameter
     * @function debug
     * @example
     * avg(([1,2,3] * [2,3,4]).debug(@)).round(@,3) // 6.667
     * avg(debug([1,2,3] * [2,3,4],&"average of: " &toString(@))).round(@,3) // 6.667
     */
    debug: {
      _func: resolvedArgs => {
        const arg = resolvedArgs[0];
        if (resolvedArgs.length > 1) {
          if (getType(resolvedArgs[1]) === TYPE_EXPREF) {
            debug.push(runtime.interpreter.visit(resolvedArgs[1], arg));
          } else {
            debug.push(resolvedArgs[1]);
          }
        } else {
          debug.push(toJSON(resolvedArgs[0]));
        }
        return arg;
      },
      _signature: [
        { types: [TYPE_ANY] },
        { types: [TYPE_ANY, TYPE_EXPREF], optional: true },
      ],
    },

    /**
     * Performs a depth-first search of a nested hierarchy to
     * return an array of key values that match a `name`.
     * The name can be either a key into an object or an array index.
     * This is similar to the Descendant Accessor operator (`..`) from [E4X](https://ecma-international.org/publications-and-standards/standards/ecma-357/).
     * @param {object|array|null} object The starting object or array where we start the search
     * @param {string|integer} name The name (or index position) of the elements to find.
     * If `name` is a string, search for nested objects with a matching key.
     * If `name` is an integer, search for nested arrays with a matching index.
     * @returns {any[]} The array of matched elements
     * @function deepScan
     * @example
     * deepScan({a : {b1 : {c : 2}, b2 : {c : 3}}}, "c") // returns [2, 3]
     */
    deepScan: {
      _func: resolvedArgs => {
        const [source, n] = resolvedArgs;
        const [name, checkArrays] = getType(n) === TYPE_NUMBER
          ? [toInteger(n), true] : [toString(n), false];
        const items = [];
        function scan(node) {
          if (node === null) return;
          if (isArrayType(node)) {
            if (checkArrays && node[name] !== undefined) items.push(node[name]);
            node.forEach(scan);
          } else if (isObject(node)) {
            Object.entries(node).forEach(([k, v]) => {
              if (!checkArrays && k === name) items.push(v);
              scan(v);
            });
          }
        }
        scan(source);
        return items;
      },
      _signature: [
        { types: [TYPE_OBJECT, TYPE_ARRAY, TYPE_NULL] },
        { types: [TYPE_STRING, TYPE_NUMBER] },
      ],
    },

    /**
     * Determines if the `subject` string ends with a specific `suffix`
     * @param {string|string[]} subject source string in which to search
     * @param {string|string[]} suffix search string
     * @return {boolean|boolean[]} true if the `suffix` value is at the end of the `subject`
     * @function endsWith
     * @example
     * endsWith("Abcd", "d") // returns true
     * endsWith("Abcd", "A") // returns false
     */
    endsWith: {
      _func: args => evaluate(args, endsWithFn),
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
      ],
    },

    /**
     * Returns an array of `[key, value]` pairs from an object or array.
     * The `fromEntries()` function may be used to convert an array to an object.
     * @param {object|array} obj source object or array
     * @returns {any[]} an array of arrays where each child array has two elements
     * representing the key and value of a pair
     * @function entries
     * @example
     * entries({a: 1, b: 2}) // returns [["a", 1], ["b", 2]]
     * entries([4,5]) // returns [["0", 4],["1", 5]]
     */
    entries: {
      _func: args => {
        const obj = valueOf(args[0]);
        return Object.entries(obj);
      },
      _signature: [
        {
          types: [
            TYPE_ARRAY,
            TYPE_OBJECT,
          ],
        },
      ],
    },

    /**
     * Finds the date value of the end of a month, given `startDate` plus `monthAdd` months
     * @param {number|number[]} startDate The base date to start from.
     * <<_date_and_time_values, Date/time values>> can be generated using the
     * [datetime]{@link datetime}, [toDate]{@link todate}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @param {integer|integer[]} monthAdd Number of months to add to start date
     * @return {number|number[]} the date of the last day of the month
     * @function eomonth
     * @example
     * eomonth(datetime(2011, 1, 1), 1) | [month(@), day(@)] // returns [2, 28]
     * eomonth(datetime(2011, 1, 1), -3) | [month(@), day(@)] // returns [10, 31]
     */
    eomonth: {
      _func: args => evaluate(args, eomonthFn),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Finds e (the base of natural logarithms) raised to a power. (i.e. e^x)
     * @param {number|number[]} x A numeric expression representing the power of e.
     * @returns {number|number[]} e (the base of natural logarithms) raised to power x
     * @function exp
     * @example
     * exp(10) // returns 22026.465794806718
     */
    exp: {
      _func: args => evaluate(args, Math.exp),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Return constant boolean false value.
     * Expressions may also use the JSON literal: `` `false` ``
     * @returns {boolean} constant boolean value `false`
     * @function false
     */
    false: {
      _func: () => false,
      _signature: [],
    },

    /**
     * Finds and returns the index of query in text from a start position
     * @param {string|string[]} findText string to search
     * @param {string|string[]} withinText text to be searched
     * @param {integer|integer[]} [start=0] zero-based position to start searching.
     * If specified, `start` must be greater than or equal to 0
     * @returns {integer|null|integer[]} The position of the found string, null if not found.
     * @function find
     * @example
     * find("m", "abm") // returns 2
     * find("M", "abMcdM", 3) // returns 5
     * find("M", "ab") // returns `null`
     * find("M", "abMcdM", 2) // returns 2
     */
    find: {
      _func: resolvedArgs => {
        const args = resolvedArgs.slice();
        if (args.length < 3) args.push(0);
        return evaluate(args, findFn);
      },
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER], optional: true },
      ],
    },

    /**
     * Calculates the next lowest integer value of the argument `num` by rounding down if necessary.
     * i.e. floor() rounds toward negative infinity.
     * @param {number|number[]} num numeric value
     * @return {integer|integer[]} The largest integer smaller than or equal to num
     * @function floor
     * @example
     * floor(10.4) // returns 10
     * floor(10) // returns 10
     */
    floor: {
      _func: args => evaluate(args, Math.floor),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Create a string from a code point.
     * @param {integer|integer[]} codePoint An integer or array of integers
     * between 0 and 0x10FFFF (inclusive) representing Unicode code point(s).
     * @return {string} A string from the given code point(s)
     * @function fromCodePoint
     * @example
     * fromCodePoint(65) // "A"
     * fromCodePoint(65) == "\u0041" // true
     */
    fromCodePoint: {
      _func: args => {
        try {
          const points = Array.isArray(args[0]) ? args[0] : [args[0]];
          return String.fromCodePoint(...points.map(toInteger));
        } catch (e) {
          throw evaluationError(`Invalid code point: "${args[0]}"`);
        }
      },
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Returns an object by transforming a list of key-value `pairs` into an object.
     * `fromEntries()` is the inverse operation of `entries()`.
     * If the nested arrays are not of the form: `[key, value]`
     * (where key is a string), an error will be thrown.
     * @param {any[]} pairs A nested array of key-value pairs to create the object from
     * The nested arrays must have exactly two values, where the first value is a string.
     * If a key is specified more than once, the last occurrence will override any previous value.
     * @returns {object} An object constructed from the provided key-value pairs
     * @function fromEntries
     * @example
     * fromEntries([["a", 1], ["b", 2]]) // returns {a: 1, b: 2}
     */
    fromEntries: {
      _func: args => {
        const array = args[0];
        // validate beyond the TYPE_ARRAY_ARRAY check
        if (!array.every(a => {
          if (!Array.isArray(a)) return false;
          if (a.length !== 2) return false;
          if (getType(a[0]) !== TYPE_STRING) return false;
          return true;
        })) {
          throw typeError('fromEntries() requires an array of key value pairs');
        }
        return Object.fromEntries(array);
      },
      _signature: [
        { types: [TYPE_ARRAY_ARRAY, TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Compute the nearest 32-bit single precision float representation of a number
     * @param {number|number[]} num input to be rounded
     * @return {number|number[]} The rounded representation of `num`
     * @function fround
     * @example
     * fround(2147483650.987) => 2147483648
     * fround(100.44444444444444444444) => 100.44444274902344
     */
    fround: {
      _func: args => evaluate(args, Math.fround),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Determine if an object has a property or if an array index is in range.
     * @param {object|array|null} subject source object or array.
     * When querying for <<_hidden_properties,hidden properties>>, `subject` may be any data type.
     * @param {string|integer} name The name (or index position) of the element to find.
     * if `subject` is an array, `name` must be an integer;
     * if `subject` is an object, `name` must be a string.
     * @returns {boolean} true if the element exists
     * @function hasProperty
     * @example
     * hasProperty({a: 1, b: 2}, "a") // returns true
     * hasProperty(["apples", "oranges"], 3) // returns false
     * hasProperty(`null`, "a") // returns false
     */
    hasProperty: {
      _func: args => {
        let key = args[1];
        const keyType = getType(key);

        // if the object/array has a getter for this property then don't validate types
        if (args[0] !== null && Object.getOwnPropertyDescriptor(args[0], key)?.get) return true;
        const obj = valueOf(args[0]);
        if (obj === null) return false;
        const isArray = isArrayType(obj);
        if (!(isArray || getType(obj) === TYPE_OBJECT)) {
          throw typeError('First parameter to hasProperty() must be either an object or array.');
        }

        if (isArray) {
          if (keyType !== TYPE_NUMBER) throw TypeError('hasProperty(): Array index must be an integer');
          key = toInteger(key);
        } else if (keyType !== TYPE_STRING) throw TypeError('hasProperty(): Object key must be a string');
        const result = getProperty(obj, key);
        return result !== undefined;
      },
      _signature: [
        { types: [TYPE_ANY] },
        { types: [TYPE_STRING, TYPE_NUMBER] },
      ],
    },
    /**
     * Extract the hour from a <<_date_and_time_values, date/time value>>
     * @param {number|number[]} date The datetime/time for which the hour is to be returned.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [toDate]{@link todate}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer|integer[]} value between 0 and 23
     * @function hour
     * @example
     * hour(datetime(2008,5,23,12, 0, 0)) // returns 12
     * hour(time(12, 0, 0)) // returns 12
     */
    hour: {
      _func: args => evaluate(args, a => getDateObj(a).getHours()),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
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
        unresolvedArgs
          .forEach(arg => {
            if (arg.type === 'ExpressionReference') {
              throw typeError('"if()" does not accept an expression reference argument.');
            }
          });

        const condition = interpreter.visit(conditionNode, data);
        if (toBoolean(valueOf(condition))) {
          return interpreter.visit(leftBranchNode, data);
        }
        return interpreter.visit(rightBranchNode, data);
      },
      _signature: [
        { types: [TYPE_ANY] },
        { types: [TYPE_ANY] },
        { types: [TYPE_ANY] }],
    },

    /**
     * Combines all the elements from the provided
     * array, joined together using the `glue` argument as a separator between each array element.
     * @param {any[]} array array of values that will be converted to strings using `toString()`
     * @param {string} glue
     * @return {string} String representation of the array
     * @function join
     * @example
     * join(["a", "b", "c"], ",") // returns "a,b,c"
     * join(["apples", "bananas"], " and ") // returns "apples and bananas"
     * join([1, 2, 3, null()], "|") // returns "1|2|3|null"
     */
    join: {
      _func: resolvedArgs => {
        const listJoin = resolvedArgs[0];
        const joinChar = resolvedArgs[1];
        return listJoin.map(a => toJSON(a)).join(joinChar);
      },
      _signature: [
        { types: [TYPE_ARRAY] },
        { types: [TYPE_STRING] },
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
      _func: resolvedArgs => Object.keys(resolvedArgs[0]),
      _signature: [{ types: [TYPE_OBJECT] }],
    },
    /**
     * Return a substring from the start of a string or the left-most elements of an array
     * @param {string|array} subject The source text/array of code points/elements
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
        const numEntries = args.length > 1 ? toInteger(args[1]) : 1;
        if (numEntries < 0) throw evaluationError('left() requires a non-negative number of elements');
        if (isArrayType(args[0])) return args[0].slice(0, numEntries);
        const text = Array.from(toString(args[0]));
        return text.slice(0, numEntries).join('');
      },
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY] },
        { types: [TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Calculates the length of the input argument based on types:
     *
     * * string: returns the number of unicode code points
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
     * length(`{}`) // returns 0
     * length({a : 3, b : 4}) // returns 2
     */
    length: {
      _func: resolvedArgs => {
        const arg = valueOf(resolvedArgs[0]);
        if (isObject(arg)) return Object.keys(arg).length;
        // Array.from splits a string into code points
        // If we didn't do this, then String.length would return the number of UTF-16 code units
        return isArrayType(arg) ? arg.length : Array.from(toString(arg)).length;
      },
      _signature: [{ types: [TYPE_STRING, TYPE_ARRAY, TYPE_OBJECT] }],
    },

    /**
     * Compute the natural logarithm (base e) of a number
     * @param {number|number[]} num A number greater than zero
     * @return {number|number[]} The natural log value
     * @function log
     * @example
     * log(10) // 2.302585092994046
     */
    log: {
      _func: args => evaluate(args, a => validNumber(Math.log(a), 'log')),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Compute the base 10 logarithm of a number.
     * @param {number|number[]} num A number greater than or equal to zero
     * @return {number|number[]} The base 10 log result
     * @function log10
     * @example
     * log10(100000) // 5
     */
    log10: {
      _func: args => evaluate(args, a => validNumber(Math.log10(a), 'log10')),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Converts all the alphabetic code points in a string to lowercase.
     * @param {string|string[]} input input string
     * @returns {string|string[]} the lower case value of the input string
     * @function lower
     * @example
     * lower("E. E. Cummings") // returns "e. e. cummings"
     */
    lower: {
      _func: args => evaluate(args, a => toString(a).toLowerCase()),
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
      ],
    },

    /**
     * Apply an expression to every element in an array and return the array of results.
     * An input array of length N will return an array of length N.
     * @param {array} elements array of elements to process
     * @param {expression} expr expression to evaluate
     * @return {array} the mapped array
     * @function map
     * @example
     * map([1, 2, 3, 4], &(@ + 1)) // returns [2, 3, 4, 5]
     * map(["doe", "nick", "chris"], &length(@)) // returns [3, 4, 5]
     */
    map: {
      _func: resolvedArgs => {
        const exprefNode = resolvedArgs[1];
        return resolvedArgs[0].map(arg => runtime.interpreter.visit(exprefNode, arg));
      },
      _signature: [{ types: [TYPE_ARRAY] }, { types: [TYPE_EXPREF] }],
    },

    /**
     * Calculates the largest value in the input numbers.
     * Any values that are not numbers (null, boolean, strings, objects) will be ignored.
     * If any parameters are arrays, the arrays will be flattened.
     * If no numbers are provided, the function will return zero.
     * @param {...(array|any)} collection values/array(s) in which the maximum
     * element is to be calculated
     * @return {number} the largest value found
     * @function max
     * @example
     * max([1, 2, 3], [4, 5, 6]) // returns 6
     * max([\"a\", \"a1\", \"b\"], null(), true())) // returns 0
     * max(8, 10, 12, "14") // returns 12
     */
    max: {
      _func: args => {
        // flatten the args into a single array
        const array = args
          .flat(Infinity)
          .filter(a => typeof valueOf(a) === 'number');

        if (array.length === 0) return 0;

        return Math.max(...array);
      },
      _signature: [{
        types: [TYPE_ARRAY, TYPE_ANY],
        variadic: true,
      }],
    },

    /**
     * Calculates the largest value in the input values, coercing parameters to numbers.
     * Null values are ignored.
     * If any parameters cannot be converted to a number,
     * the function will fail with a type error.
     * If any parameters are arrays, the arrays will be flattened.
     * If no numbers are provided, the function will return zero.
     * @param {...(any)} collection values/array(s) in which the maximum
     * element is to be calculated
     * @return {number} the largest value found
     * @function maxA
     * @example
     * maxA([1, 2, 3], [4, 5, 6]) // returns 6
     * maxA(["a", "a1", "b", null()]) // error
     * maxA(8, 10, 12, "14") // returns 14
     */
    maxA: {
      _func: args => {
        // flatten the args into a single array
        const array = args
          .flat(Infinity)
          .filter(a => valueOf(a) !== null)
          .map(toNumber);

        if (array.find(a => a === null)) {
          throw evaluationError('maxA() received non-numeric parameters');
        }
        if (array.length === 0) return 0;

        return Math.max(...array);
      },
      _signature: [{
        types: [TYPE_ARRAY, TYPE_ANY],
        variadic: true,
      }],
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
     * Extracts a substring from text, or a subset from an array.
     * @param {string|array} subject the text string or array of elements from which to extract.
     * @param {integer} startPos the zero-based position of the first code point
     * or element to extract.
     * @param {integer} length The number of code points or elements to return from the
     * string or array.
     * If greater then the length of `subject` the length of the subject is used.
     * @return {string|array} The resulting substring or array subset of elements
     * @function mid
     * @example
     * mid("Fluid Flow", 0, 5) // returns "Fluid"
     * mid("Fluid Flow", 6, 20) // returns "Flow"
     * mid("Fluid Flow", 20, 5) // returns ""
     * mid([0,1,2,3,4,5,6,7,8,9], 2, 3) // returns [2,3,4]
     */
    mid: {
      _func: args => {
        const startPos = toInteger(args[1]);
        const numEntries = toInteger(args[2]);
        if (startPos < 0) throw evaluationError('mid() requires a non-negative start position');
        if (numEntries < 0) throw evaluationError('mid() requires a non-negative length parameter');
        if (isArrayType(args[0])) {
          return args[0].slice(startPos, startPos + numEntries);
        }
        const text = Array.from(toString(args[0]));
        return text.slice(startPos, startPos + numEntries).join('');
      },
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY] },
        { types: [TYPE_NUMBER] },
        { types: [TYPE_NUMBER] },
      ],
    },

    /**
     * Extract the milliseconds of the time value in a <<_date_and_time_values, date/time value>>.
     * @param {number|number[]} date datetime/time for which the millisecond is to be returned.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [toDate]{@link todate}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer|integer[]} The number of milliseconds: 0 through 999
     * @function millisecond
     * @example
     * millisecond(datetime(2008, 5, 23, 12, 10, 53, 42)) // returns 42
     */
    millisecond: {
      _func: args => evaluate(args, a => getDateObj(a).getMilliseconds()),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Calculates the smallest value in the input numbers.
     * Any values that are not numbers (null, boolean, string, object) will be ignored.
     * If any parameters are arrays, the arrays will be flattened.
     * If no numbers are provided, the function will return zero.
     * @param {...(any[]|any)} collection
     * Values/arrays to search for the minimum value
     * @return {number} the smallest value found
     * @function min
     * @example
     * min([1, 2, 3], [4, 5, 6]) // returns 1
     * min("4", 8, 10, 12, null()) // returns 8
     */
    min: {
      _func: args => {
        // flatten the args into a single array
        const array = args
          .flat(Infinity)
          .filter(a => typeof valueOf(a) === 'number');
        if (array.length === 0) return 0;

        return Math.min(...array);
      },
      _signature: [{
        types: [TYPE_ARRAY, TYPE_ANY],
        variadic: true,
      }],
    },

    /**
     * Calculates the smallest value in the input values, coercing parameters to numbers.
     * Null values are ignored.
     * If any parameters cannot be converted to a number,
     * the function will fail with a type error.
     * If any parameters are arrays, the arrays will be flattened.
     * If no numbers are provided, the function will return zero.
     * @param {...(any[]|any)} collection values/array(s) in which the maximum
     * element is to be calculated
     * @return {number} the largest value found
     * @function minA
     * @example
     * minA([1, 2, 3], [4, 5, 6]) // returns 1
     * minA("4", 8, 10, 12, null()) // returns 4
     */
    minA: {
      _func: args => {
        // flatten the args into a single array
        const array = args
          .flat(Infinity)
          .filter(a => valueOf(a) !== null)
          .map(toNumber);

        if (array.find(a => a === null)) {
          throw evaluationError('minA() received non-numeric parameters');
        }
        if (array.length === 0) return 0;

        return Math.min(...array);
      },
      _signature: [{
        types: [TYPE_ARRAY, TYPE_ANY],
        variadic: true,
      }],
    },

    /**
     * Extract the minute (0 through 59) from a <<_date_and_time_values, date/time value>>
     * @param {number|number[]} date A datetime/time value.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [toDate]{@link todate}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer|integer[]} Number of minutes in the time portion of the date/time value
     * @function minute
     * @example
     * minute(datetime(2008,5,23,12, 10, 0)) // returns 10
     * minute(time(12, 10, 0)) // returns 10
     */
    minute: {
      _func: args => evaluate(args, a => getDateObj(a).getMinutes()),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Return the remainder when one number is divided by another number.
     * @param {number|number[]} dividend The number for which to find the remainder.
     * @param {number|number[]} divisor The number by which to divide number.
     * @return {number|number[]} Computes the remainder of `dividend`/`divisor`.
     * If `dividend` is negative, the result will also be negative.
     * If `dividend` is zero, an error is thrown.
     * @function mod
     * @example
     * mod(3, 2) // returns 1
     * mod(-3, 2) // returns -1
     */
    mod: {
      _func: args => evaluate(args, (a, b) => {
        const result = a % b;
        if (Number.isNaN(result)) throw evaluationError(`Bad parameter for mod: '${a} % ${b}'`);
        return result;
      }),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Finds the month of a date.
     * @param {number|number[]} date source <<_date_and_time_values, date/time value>>.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [toDate]{@link todate}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer|integer[]} The month number value, ranging from 1 (January) to 12 (December)
     * @function month
     * @example
     * month(datetime(2008,5,23)) // returns 5
     */
    month: {
      // javascript months start from 0
      _func: args => evaluate(args, a => getDateObj(a).getMonth() + 1),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Compute logical NOT of a value. If the parameter is not boolean
     * it will be <<_type_coercion_rules,cast to boolean>>
     * Note the related <<_not_operator, unary NOT operator>>.
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
      _func: resolveArgs => !toBoolean(valueOf(resolveArgs[0])),
      _signature: [{ types: [TYPE_ANY] }],
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
      _func: resolvedArgs => {
        const result = resolvedArgs.find(arg => getType(arg) !== TYPE_NULL);
        return result === undefined ? null : result;
      },
      _signature: [{ types: [TYPE_ANY], variadic: true }],
    },
    /**
     * Retrieve the current date/time.
     * @return {number} representation of the <<_date_and_time_values, current date/time value>>.
     * @function now
     */
    now: {
      _func: () => getDateNum(Date.now()),
      _signature: [],
    },

    /**
     * Return constant null value.
     * Expressions may also use the JSON literal: `` `null` ``
     * @returns {boolean} True
     * @function null
     */
    null: {
      _func: () => null,
      _signature: [],
    },

    /**
     * Determines the logical OR result of a set of parameters.
     * If the parameters are not boolean they will be <<_type_coercion_rules,cast to
     * boolean>>.
     * Note the related <<_or_operator, Or Operator>>.
     * @param {any} first logical expression
     * @param {...any} [operand] any number of additional expressions
     * @returns {boolean} The logical result of applying OR to all parameters
     * @example
     * or((x / 2) == y, (y * 2) == x) // true
     * @function or
     */
    or: {
      _func: resolvedArgs => {
        let result = toBoolean(valueOf(resolvedArgs[0]));
        resolvedArgs.slice(1).forEach(arg => {
          result = result || toBoolean(valueOf(arg));
        });
        return result;
      },
      _signature: [{ types: [TYPE_ANY], variadic: true }],
    },

    /**
     * Computes `a` raised to a power `x`. (a^x)
     * @param {number|number[]} a The base number -- can be any real number.
     * @param {number|number[]} x The exponent to which the base number is raised.
     * @return {number|number[]}
     * @function power
     * @example
     * power(10, 2) // returns 100 (10 raised to power 2)
     */
    power: {
      _func: args => evaluate(args, (a, b) => validNumber(a ** b, 'power')),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Apply proper casing to a string.  Proper casing is where the first letter of each
     * word is converted to an
     * uppercase letter and the rest of the letters in the word converted to lowercase.
     * Words are demarcated by whitespace, punctuation, or numbers.
     * Specifically, any character(s) matching the regular expression: `[\s\d\p{P}]+`.
     * @param {string|string[]} text source string
     * @returns {string|string[]} source string with proper casing applied.
     * @function proper
     * @example
     * proper("this is a TITLE") // returns "This Is A Title"
     * proper("2-way street") // returns "2-Way Street"
     * proper("76BudGet") // returns "76Budget"
     */
    proper: {
      _func: args => evaluate(args, properFn),
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
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
     * @param {array} elements array of elements on which the expression will be evaluated
     * @param {expression} expr reducer expression to be executed on each element
     * @param {any} initialValue the accumulated value to pass to the first array element
     * @return {any}
     * @function reduce
     * @example
     * reduce([1, 2, 3], &(accumulated + current)) // returns 6
     * // find maximum entry by age
     * reduce(
     *   [{age: 10, name: "Joe"},{age: 20, name: "John"}],
     *   &max(@.accumulated.age, @.current.age), @[0].age)
     * reduce([3, 3, 3], &accumulated * current, 1) // returns 27
     */
    reduce: {
      _func: resolvedArgs => {
        const exprefNode = resolvedArgs[1];
        return resolvedArgs[0].reduce(
          (accumulated, current, index, array) => runtime.interpreter.visit(exprefNode, {
            accumulated, current, index, array,
          }),
          resolvedArgs.length === 3 ? resolvedArgs[2] : null,
        );
      },
      _signature: [
        { types: [TYPE_ARRAY] },
        { types: [TYPE_EXPREF] },
        { types: [TYPE_ANY], optional: true },
      ],
    },

    /**
     * Register a function.  The registered function may take one parameter.
     * If more parameters are needed, combine them in an array or object.
     * A function may not be re-registered with a different definition.
     * Note that implementations are not required to provide `register()` in order to be conformant.
     * Built-in functions may not be overridden.
     * @param {string} functionName Name of the function to register.
     * `functionName` must begin with an underscore or uppercase letter and follow the regular
     * expression pattern:
     * `{caret}{startsb}_A-Z{endsb}{startsb}_a-zA-Z0-9${endsb}{asterisk}$`
     * @param {expression} expr Expression to execute with this function call
     * @return {{}} returns an empty object
     * @function register
     * @example
     * register("_product", &@[0] * @[1]) // can now call: _product([2,21]) => returns 42
     * register("_ltrim", &split(@,"").reduce(@, &accumulated & current | if(@ = " ", "", @), ""))
     * // _ltrim("  abc  ") => returns "abc  "
     */
    register: {
      _func: resolvedArgs => {
        const functionName = resolvedArgs[0];
        const exprefNode = resolvedArgs[1];

        if (!/^[_A-Z][_a-zA-Z0-9$]*$/.test(functionName)) throw functionError(`Invalid function name: "${functionName}"`);
        if (functionMap[functionName]
          && functionMap[functionName]._exprefNode.value !== exprefNode.value) {
          // custom functions can be re-registered as long as the expression is the same
          throw functionError(`Cannot override function: "${functionName}" with a different definition`);
        }
        functionMap[functionName] = {
          _func: args => runtime.interpreter.visit(exprefNode, ...args),
          _signature: [{ types: [TYPE_ANY], optional: true }],
          _exprefNode: exprefNode,
        };
        return {};
      },
      _signature: [
        { types: [TYPE_STRING] },
        { types: [TYPE_EXPREF] },
      ],
    },

    /**
     * Register a function that accepts multiple parameters.
     * A function may not be re-registered with a different definition.
     * Note that implementations are not required to provide `registerWithParams()`
     * in order to be conformant.
     * Built-in functions may not be overridden.
     * @param {string} functionName Name of the function to register.
     * `functionName` must begin with an underscore or uppercase letter and follow the regular
     * expression pattern:
     * `{caret}{startsb}_A-Z{endsb}{startsb}_a-zA-Z0-9${endsb}{asterisk}$`
     * @param {expression} expr Expression to execute with this function call.
     * Parameters are passed as an array.
     * @return {{}} returns an empty object
     * @function registerWithParams
     * @example
     * registerWithParams("Product", &@[0] * @[1])
     * // can now call: Product(2,21) => returns 42
     * registerWithParams(
     *   "Ltrim",
     *   &split(@[0],"").reduce(@, &accumulated & current | if(@ = " ", "", @), "")
     *  )
     * // Ltrim("  abc  ") => returns "abc  "
     */
    registerWithParams: {
      _func: resolvedArgs => {
        const functionName = resolvedArgs[0];
        const exprefNode = resolvedArgs[1];

        if (!/^[_A-Z][_a-zA-Z0-9$]*$/.test(functionName)) throw functionError(`Invalid function name: "${functionName}"`);
        if (functionMap[functionName]
          && functionMap[functionName]._exprefNode.value !== exprefNode.value) {
          // custom functions can be re-registered as long as the expression is the same
          throw functionError(`Cannot override function: "${functionName}" with a different definition`);
        }
        functionMap[functionName] = {
          _func: args => runtime.interpreter.visit(exprefNode, args),
          _signature: [{ types: [TYPE_ANY], optional: true, variadic: true }],
          _exprefNode: exprefNode,
        };
        return {};
      },
      _signature: [
        { types: [TYPE_STRING] },
        { types: [TYPE_EXPREF] },
      ],
    },

    /**
     * Generates text (or an array) where we substitute elements at a given start position and
     * length, with new text (or array elements).
     * @param {string|array} subject original text or array
     * @param {integer} start zero-based index in the original text
     * from where to begin the replacement.  Must be greater than or equal to 0.
     * @param {integer} length number of code points to be replaced.
     * If `start` + `length` is greater than the length of `subject`,
     * all text past `start` will be replaced.
     * @param {any} replacement Replacement to insert at the start index.
     * If `subject` is an array, and `replacement` is an array, the `replacement` array
     * elements will be inserted into the `subject` array.
     * If `subject` is an array and replacement is not an array, the `replacement` will be
     * inserted as a single element in `subject`
     * If `subject` is a string, the `replacement` will be coerced to a string.
     * @returns {string|array} the resulting text or array
     * @function replace
     * @example
     * replace("abcdefghijk", 5, 5, "*") // returns abcde*k
     * replace("2009",2,2,"10") // returns  2010
     * replace("123456",0,3,"@") // returns @456
     * replace(["blue","black","white","red"], 1, 2, ["green"]) // returns ["blue","green","red"]
     */
    replace: {
      _func: args => {
        const startPos = toInteger(args[1]);
        const numElements = toInteger(args[2]);
        if (startPos < 0) throw evaluationError('replace() start position must be greater than or equal to 0');
        if (numElements < 0) throw evaluationError('replace() length must be greater than or equal to 0');
        if (isArrayType(args[0])) {
          const sourceArray = valueOf(args[0]);
          let replacement = valueOf(args[3]);
          if (!isArrayType(replacement)) replacement = [replacement];
          sourceArray.splice(startPos, numElements, ...replacement);
          return sourceArray;
        }
        const subject = Array.from(toString(args[0]));
        if (isArrayType(args[3]) || getType(args[3]) === TYPE_OBJECT) throw typeError('replace() replacement must not be an array or object');
        const newText = toString(args[3]);

        subject.splice(startPos, numElements, newText);
        return subject.join('');
      },
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY] },
        { types: [TYPE_NUMBER] },
        { types: [TYPE_NUMBER] },
        { types: [TYPE_ANY] },
      ],
    },

    /**
     * Return text repeated `count` times.
     * @param {string|string[]} text text to repeat
     * @param {integer|integer[]} count number of times to repeat the text.
     * Must be greater than or equal to 0.
     * @returns {string|string[]} Text generated from the repeated text.
     * if `count` is zero, returns an empty string.
     * @function rept
     * @example
     * rept("x", 5) // returns "xxxxx"
     */
    rept: {
      _func: args => evaluate(args, reptFn),
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Reverses the order of an array or the order of code points in a string
     * @param {string|array} subject the source to be reversed
     * @return {array} The resulting reversed array or string
     * @function reverse
     * @example
     * reverse(["a", "b", "c"]) // returns ["c", "b", "a"]
     */
    reverse: {
      _func: resolvedArgs => {
        const originalStr = valueOf(resolvedArgs[0]);
        const typeName = getType(originalStr);
        if (typeName === TYPE_STRING) {
          return Array.from(originalStr).reverse().join('');
        }
        const reversedArray = resolvedArgs[0].slice(0);
        return reversedArray.reverse();
      },
      _signature: [{ types: [TYPE_STRING, TYPE_ARRAY] }],
    },

    /**
     * Generates a string from the right-most code points of a string or
     * a subset of elements from the end of an array
     * @param {string|array} subject The text/array containing the code points/elements to extract
     * @param {integer} [elements=1] number of elements to pick
     * @return {string|array} The extracted substring or array subset
     * Returns null if the number of elements is less than 0
     * @function right
     * @example
     * right("Sale Price", 4) // returns "rice"
     * right("Sweden") // returns "n"
     * right([4, 5, 6], 2) // returns [5, 6]
     */
    right: {
      _func: args => {
        const numEntries = args.length > 1 ? toInteger(args[1]) : 1;
        if (numEntries < 0) throw evaluationError('right() count must be greater than or equal to 0');
        if (args[0] instanceof Array) {
          if (numEntries === 0) return [];
          return args[0].slice(numEntries * -1);
        }
        if (numEntries === 0) return '';
        const text = Array.from(toString(args[0]));
        return text.slice(numEntries * -1).join('');
      },
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY] },
        { types: [TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Round a number to a specified precision:
     *
     * * If `precision` is greater than zero, round to the specified number of decimal places.
     * * If `precision` is 0, round to the nearest integer.
     * * If `precision` is less than 0, round to the left of the decimal point.
     * @param {number|number[]} num number to round
     * @param {integer|integer[]} [precision=0] precision to use for the rounding operation.
     * @returns {number|number[]} rounded value. Rounding a half value will round up.
     * @function round
     * @example
     * round(2.15, 1) // returns 2.2
     * round(626.3,-3) // returns 1000 (Rounds 626.3 to the nearest multiple of 1000)
     * round(626.3, 0) // returns 626
     * round(1.98,-1) // returns 0 (Rounds 1.98 to the nearest multiple of 10)
     * round(-50.55,-2) // -100 (round -50.55 to the nearest multiple of 100)
     * round(1.95583) // 2
     * round(-1.5) // -1
     */
    round: {
      _func: resolvedArgs => {
        const args = resolvedArgs.slice();
        if (args.length < 2)args.push(0);
        return evaluate(args, (a, n) => {
          const digits = toInteger(n);
          return round(a, digits);
        });
      },
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER], optional: true },
      ],
    },

    /**
     * Perform a wildcard search.  The search is case-sensitive and supports two forms of wildcards:
     * `{asterisk}` finds a sequence of code points and `?` finds a single code point.
     * To use `{asterisk}` or `?` or `{backslash}` as text values,
     * precede them with an escape (`{backslash}`) character.
     * Note that the wildcard search is not greedy.
     * e.g. `search("a{asterisk}b", "abb")` will return `[0, "ab"]` Not `[0, "abb"]`
     * @param {string|string[]} findText the search string -- which may include wild cards.
     * @param {string|string[]} withinText The string to search.
     * @param {integer|integer[]} [startPos=0] The zero-based position of withinText
     * to start searching.
     * A negative value is not allowed.
     * @returns {array} returns an array with two values:
     *
     * * The start position of the found text and the text string that was found.
     * * If a match was not found, an empty array is returned.
     * @function search
     * @example
     * search("a?c", "acabc") // returns [2, "abc"]
     */
    search: {
      _func: resolvedArgs => {
        const args = resolvedArgs.slice();
        if (args.length < 2) args.push(0);
        return evaluate(args, searchFn);
      },
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER], optional: true },
      ],

    },

    /**
     * Extract the seconds of the time value in a <<_date_and_time_values, date/time value>>.
     * @param {number|number[]} date datetime/time for which the second is to be returned.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [toDate]{@link todate}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer|integer[]} The number of seconds: 0 through 59
     * @function second
     * @example
     * second(datetime(2008,5,23,12, 10, 53)) // returns 53
     * second(time(12, 10, 53)) // returns 53
     */
    second: {
      _func: args => evaluate(args, a => getDateObj(a).getSeconds()),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Computes the sign of a number passed as argument.
     * @param {number|number[]} num any number
     * @return {number|number[]} returns 1 or -1, indicating the sign of `num`.
     * If the `num` is 0, it will return 0.
     * @function sign
     * @example
     * sign(5) // 1
     * sign(-5) // -1
     * sign(0) // 0
     */
    sign: {
      _func: args => evaluate(args, Math.sign),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Computes the sine of a number in radians
     * @param {number|number[]} angle A number representing an angle in radians.
     * @return {number|number[]} The sine of `angle`, between -1 and 1, inclusive
     * @function sin
     * @example
     * sin(0) // 0
     * sin(1) // 0.8414709848078965
     */
    sin: {
      _func: args => evaluate(args, Math.sin),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * This function accepts an array values and returns an
     * array with the elements in sorted order.
     * If there are mixed data types, the values will be grouped in order:
     * numbers, strings, booleans, nulls
     * String sorting is based on code points and is not locale-sensitive.
     * If the sort encounters any objects or arrays, it will throw an evaluation error.
     * @param {any[]} list to be sorted
     * @return {any[]} The ordered result
     * @function sort
     * @example
     * sort([1, 2, 4, 3, 1]) // returns [1, 1, 2, 3, 4]
     * sort(["20", 20, true(), "100", null(), 100]) // returns [20, 100, "100", "20", true, null]
     */
    sort: {
      _func: resolvedArgs => {
        /*
        numbers sort first
        strings sort second
        Booleans sort third
        nulls sort last
        */
        const typeVals = resolvedArgs[0].map(value => {
          const type = getType(value);
          if (![TYPE_NUMBER, TYPE_STRING, TYPE_BOOLEAN, TYPE_NULL].includes(type)) {
            throw evaluationError('Bad datatype for sort');
          }
          return { type, value };
        });

        const sortFunction = (a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        };

        const sorted = typeVals
          .filter(v => v.type === TYPE_NUMBER)
          .map(v => v.value)
          .sort(sortFunction);

        sorted.push(
          ...typeVals
            .filter(v => v.type === TYPE_STRING)
            .map(v => v.value)
            .sort(),
        );

        sorted.push(...typeVals.filter(v => v.type === TYPE_BOOLEAN).map(v => v.value));
        sorted.push(...typeVals.filter(v => v.type === TYPE_NULL).map(v => v.value));
        return sorted;
      },
      _signature: [{ types: [TYPE_ARRAY] }],
    },

    /**
     * Sort an array using an expression to find the sort key. For each element
     * in the array, the expression is applied and the resulting
     * value is used as the sort value. If the result of
     * evaluating the expression against the current array element results in type
     * other than a number or a string, a <<_errors, TypeError>> will occur.
     * @param {array} elements Array to be sorted
     * @param {expression} expr The comparison expression
     * @return {array} The sorted array
     * @function sortBy
     * @example
     * // returns ["e", "def", "abcd"]
     * sortBy(["abcd", "e", "def"], &length(@))
     *
     * // returns [{year: 1910}, {year: 2010}, {year: 2020}]
     * sortBy([{year: 2010}, {year: 2020}, {year: 1910}], &year)
     *
     * // returns [5, -10, -11, -15, 30]
     * sortBy([-15, 30, -10, -11, 5], &abs(@))
     */
    sortBy: {
      _func: resolvedArgs => {
        const sortedArray = resolvedArgs[0].slice(0);
        if (sortedArray.length === 0) {
          return sortedArray;
        }
        const exprefNode = resolvedArgs[1];
        const requiredType = getType(
          runtime.interpreter.visit(exprefNode, sortedArray[0]),
        );
        if (![TYPE_NUMBER, TYPE_STRING].includes(requiredType)) {
          throw typeError('Bad data type for sortBy()');
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
          const typeA = getType(exprA);
          const exprB = runtime.interpreter.visit(exprefNode, b[1]);
          const typeB = getType(exprB);
          if (typeA !== requiredType) {
            throw typeError(`sortBy expected ${typeNameTable[requiredType]}, received ${typeNameTable[typeA]}`);
          } else if (typeB !== requiredType) {
            throw typeError(`sortyBy expected ${typeNameTable[requiredType]}, received ${typeNameTable[typeB]}`);
          }
          if (exprA > exprB) return 1;
          if (exprA < exprB) return -1;
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
     * Split a string into an array, given a separator
     * @param {string|string[]} string string to split
     * @param {string|string[]} separator separator where the split(s) should occur
     * @return {string[]|string[][]} The array of separated strings
     * @function split
     * @example
     * split("abcdef", "") // returns ["a", "b", "c", "d", "e", "f"]
     * split("abcdef", "e") // returns ["abcd", "f"]
     */
    split: {
      _func: args => evaluate(args, splitFn),
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
      ],
    },

    /**
     * Find the square root of a number
     * @param {number|number[]} num source number
     * @return {number|number[]} The calculated square root value
     * @function sqrt
     * @example
     * sqrt(4) // returns 2
     */
    sqrt: {
      _func: args => evaluate(args, arg => validNumber(Math.sqrt(arg), 'sqrt')),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
      ],
    },

    /**
     * Determine if a string starts with a prefix.
     * @param {string|string[]} subject string to search
     * @param {string|string[]} prefix prefix to search for
     * @return {boolean|boolean[]} true if `prefix` matches the start of `subject`
     * @function startsWith
     * @example
     * startsWith("jack is at home", "jack") // returns true
     */
    startsWith: {
      _func: args => evaluate(args, startsWithFn),
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
      ],
    },
    /**
     * Estimates standard deviation based on a sample.
     * `stdev` assumes that its arguments are a sample of the entire population.
     * If your data represents a entire population,
     * then compute the standard deviation using [stdevp]{@link stdevp}.
     * Non-numeric values (text, boolean, null etc) are ignored.
     * If there are nested arrays, they are flattened.
     * @param {any[]} values The array containing numbers comprising the population.
     * Array size must be greater than 1.
     * @returns {number} [Standard deviation](https://en.wikipedia.org/wiki/Standard_deviation)
     * @function stdev
     * @example
     * stdev([1345, 1301, 1368]) // returns 34.044089061098404
     * stdevp([1345, 1301, 1368]) // returns 27.797
     */
    stdev: {
      _func: args => {
        const values = args.flat(Infinity)
          .filter(a => getType(a) === TYPE_NUMBER);

        if (values.length <= 1) throw evaluationError('stdev() must have at least two values');
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const sumSquare = values.reduce((a, b) => a + b * b, 0);
        const result = Math.sqrt((sumSquare - values.length * mean * mean) / (values.length - 1));
        return validNumber(result, 'stdev');
      },
      _signature: [
        { types: [TYPE_ARRAY] },
      ],
    },

    /**
     * Estimates standard deviation based on a sample.
     * `stdev` assumes that its arguments are a sample of the entire population.
     * If your data represents a entire population,
     * then compute the standard deviation using [stdevpA]{@link stdevpA}.
     * Nested arrays are flattened.
     * Null values are ignored. All other parameters are converted to number.
     * If conversion to number fails, a type error is thrown.
     * @param {number[]} numbers The array of numbers comprising the population.
     * Array size must be greater than 1.
     * @returns {number} [Standard deviation](https://en.wikipedia.org/wiki/Standard_deviation)
     * @function stdevA
     * @example
     * stdevA([1345, "1301", 1368]) // returns 34.044089061098404
     * stdevpA([1345, 1301, "1368"]) // returns 27.797
     */
    stdevA: {
      _func: args => {
        let values;
        try {
          values = args.flat(Infinity)
            .filter(a => getType(a) !== TYPE_NULL)
            .map(toNumber);
        } catch (_e) {
          throw evaluationError('stdevA() received non-numeric parameters');
        }

        if (values.length <= 1) throw evaluationError('stdevA() must have at least two values');
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const sumSquare = values.reduce((a, b) => a + b * b, 0);
        const result = Math.sqrt((sumSquare - values.length * mean * mean) / (values.length - 1));
        return validNumber(result, 'stdevA');
      },
      _signature: [
        { types: [TYPE_ARRAY] },
      ],
    },

    /**
     * Calculates standard deviation based on the entire population given as arguments.
     * `stdevp` assumes that its arguments are the entire population.
     * If your data represents a sample of the population,
     * then compute the standard deviation using [stdev]{@link stdev}.
     * Non-numeric values (text, boolean, null etc) are ignored.
     * If there are nested arrays, they are flattened.
     * @param {any[]} values The array containing numbers comprising the population.
     * An empty array is not allowed.
     * @returns {number} Calculated standard deviation
     * @function stdevp
     * @example
     * stdevp([1345, 1301, 1368]) // returns 27.797
     * stdev([1345, 1301, 1368]) // returns 34.044
     */
    stdevp: {
      _func: args => {
        const values = args[0]
          .flat(Infinity)
          .filter(a => getType(a) === TYPE_NUMBER);

        if (values.length === 0) throw evaluationError('stdevp() must have at least one value');

        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const meanSumSquare = values.reduce((a, b) => a + b * b, 0) / values.length;
        const result = Math.sqrt(meanSumSquare - mean * mean);
        return validNumber(result, 'stdevp');
      },
      _signature: [
        { types: [TYPE_ARRAY] },
      ],
    },

    /**
     * Calculates standard deviation based on the entire population given as arguments.
     * `stdevpA` assumes that its arguments are the entire population.
     * If your data represents a sample of the population,
     * then compute the standard deviation using [stdevA]{@link stdevA}.
     * Nested arrays are flattened.
     * Null values are ignored. All other parameters are converted to number.
     * If conversion to number fails, a type error is thrown.
     * @param {number[]} numbers The array of numbers comprising the population.
     * An empty array is not allowed.
     * @returns {number} Calculated standard deviation
     * @function stdevp
     * @example
     * stdevpA([1345, "1301", 1368]) // returns 27.797
     * stdevA([1345, 1301, "1368"]) // returns 34.044
     */
    stdevpA: {
      _func: args => {
        const values = args[0]
          .flat(Infinity)
          .filter(a => getType(a) !== TYPE_NULL)
          .map(toNumber);

        if (values.length === 0) throw evaluationError('stdevp() must have at least one value');

        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const meanSumSquare = values.reduce((a, b) => a + b * b, 0) / values.length;
        const result = Math.sqrt(meanSumSquare - mean * mean);
        return validNumber(result, 'stdevp');
      },
      _signature: [
        { types: [TYPE_ARRAY] },
      ],
    },

    /**
     * Generates a string from the input `text`,
     * with text `old` replaced by text `new` (when searching from the left).
     * If there is no match, or if `old` has length 0, `text` is returned unchanged.
     * Note that `old` and `new` may have different lengths.
     * @param {string|string[]} text The text for which to substitute code points.
     * @param {string|string[]} old The text to replace.
     * @param {string|string[]} new The text to replace `old` with.
     * If `new` is an empty string, then occurrences of `old` are removed from `text`.
     * @param {integer|integer[]} [which]
     * The zero-based occurrence of `old` text to replace with `new` text.
     * If `which` parameter is omitted, every occurrence of `old` is replaced with `new`.
     * @returns {string|string[]} replaced string
     * @function substitute
     * @example
     * substitute("Sales Data", "Sales", "Cost") // returns "Cost Data"
     * substitute("Quarter 1, 2001", "1", "2", 1)" // returns "Quarter 1, 2002"
     * substitute("Quarter 1, 2011", "1", "2", 2)" // returns "Quarter 1, 2012"
     */
    substitute: {
      _func: resolvedArgs => {
        const args = resolvedArgs.slice();
        let n;
        if (args.length > 3) {
          if (Array.isArray(args[3])) {
            n = args[3].map(toInteger);
            if (n.find(o => o < 0) !== undefined) throw evaluationError('substitute() which parameter must be greater than or equal to 0');
          } else {
            n = toInteger(args[3]);
            if (n < 0) throw evaluationError('substitute() which parameter must be greater than or equal to 0');
          }
          args[3] = n;
        }
        return evaluate(args, substituteFn);
      },
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER], optional: true },
      ],
    },

    /**
     * Calculates the sum of the provided array.
     * An empty array will produce a return value of 0.
     * Any values that are not numbers (null, boolean, strings, objects) will be ignored.
     * If any parameters are arrays, the arrays will be flattened.
     * @param {any[]} collection array of values
     * @return {number} The computed sum
     * @function sum
     * @example
     * sum([1, 2, 3]) // returns 6
     */
    sum: {
      _func: resolvedArgs => {
        let sum = 0;
        resolvedArgs[0]
          .flat(Infinity)
          .filter(a => getType(a) === TYPE_NUMBER)
          .forEach(arg => {
            sum += arg * 1;
          });

        return sum;
      },
      _signature: [{ types: [TYPE_ARRAY] }],
    },

    /**
     * Computes the tangent of a number in radians
     * @param {number|number[]} angle A number representing an angle in radians.
     * @return {number|number[]} The tangent of `angle`
     * @function tan
     * @example
     * tan(0) // 0
     * tan(1) // 1.5574077246549023
     */
    tan: {
      _func: args => evaluate(args, Math.tan),
      _signature: [{ types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] }],
    },

    /**
     * Construct and returns a <<_date_and_time_values, time value>>.
     * If any of the units are greater or less than their normal range,
     * the overflow/underflow will be added/subtracted from the next greater unit.
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
        const hours = toInteger(args[0]);
        const minutes = args.length > 1 ? toInteger(args[1]) : 0;
        const seconds = args.length > 2 ? toInteger(args[2]) : 0;
        // Since time values are interchangeable with date and datetime values, it"s consistent
        // to create them at the epoch
        const epochTime = new Date(1970, 0, 1, hours, minutes, seconds);
        return getDateNum(epochTime);
      },
      _signature: [
        { types: [TYPE_NUMBER] },
        { types: [TYPE_NUMBER], optional: true },
        { types: [TYPE_NUMBER], optional: true },
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
      _func: resolvedArgs => (isArrayType(resolvedArgs[0]) ? resolvedArgs[0] : [resolvedArgs[0]]),
      _signature: [{ types: [TYPE_ANY] }],
    },

    /**
     * Converts the provided string to a date/time value.
     *
     * @param {string} ISOString An [ISO8601 formatted string]{@link https://www.iso.org/iso-8601-date-and-time-format.html}.
     * (limited to the [RFC 3339]{@link https://www.rfc-editor.org/rfc/rfc3339} profile)
     * If the string does not include a timezone offset (or trailing 'Z'),
     * it will be assumed to be local time
     * @return {number} The resulting <<_date_and_time_values, date/time number>>.
     * If conversion fails, return null.
     * @function toDate
     * @example
     * toDate("20231110T130000+04:00") // returns 19671.375
     * toDate("2023-11-10T13:00:00+04:00") // returns 19671.375
     * toDate("20231110") | year(@) & "/" & month(@) // returns "2023/11"
     */
    toDate: {
      _func: resolvedArgs => {
        // expand compact notation so that the Date() constructor will
        // accept the value
        const iso = toString(resolvedArgs[0])
          .replace(/(\d\d\d\d)(\d\d)(\d\d)/, '$1-$2-$3')
          .replace(/T(\d\d)(\d\d)(\d\d)/, 'T$1:$2:$3');
        const dateparts = iso.split(/[\D,zZ]+/);
        let d;
        if (dateparts.length <= 3) {
          if (dateparts.length < 3 || dateparts.find(x => x === '') === '') {
            debug.push(`Failed to convert "${resolvedArgs[0]}" to a date`);
            return null;
          }
        }
        if (dateparts.length < 7) {
          // no timezone component, so assume local time
          // The date constructor always parses an ISO string as
          // UTC -- with or without a trailing 'z'
          // But if there's no timezone component, it needs to be local time

          const range = [99999, 12, 31, 23, 59, 59, 999];
          // check that the date parts are in range
          for (let i = 0; i < dateparts.length; i += 1) {
            if (dateparts[i] > range[i]) {
              debug.push(`Failed to convert "${resolvedArgs[0]}" to a date`);
              return null;
            }
          }
          // account for zero-based date month parts
          d = new Date(...dateparts.map((x, i) => (i === 1 ? x - 1 : x * 1)));
        } else {
          d = new Date(iso);
        }
        if (d instanceof Date && Number.isFinite(d.getTime())) return getDateNum(d);
        debug.push(`Failed to convert "${resolvedArgs[0]}" to a date`);

        return null;
      },
      _signature: [{ types: [TYPE_STRING] }],
    },

    /**
     * Returns a <<_date_and_time_values, date/time>> value representing
     * the start of the current day. i.e. midnight
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
     * Converts the provided arg to a number.
     * The conversions follow the <<_type_coercion_rules,type coercion rules>> but will also:
     * * Convert non-numeric strings to zero
     * * Convert arrays to arrays of numbers
     *
     * @param {any|any[]} value to convert to number
     * @param {integer|integer[]} [base=10] If the input `arg` is a string,
     * the base to use to convert to number.
     * One of: 2, 8, 10, 16. Defaults to 10.
     * @return {number} The resulting number.  If conversion to number fails, return null.
     * @function toNumber
     * @example
     * toNumber(1) // returns 1
     * toNumber("10") // returns 10
     * toNumber({a: 1}) // returns null
     * toNumber(true()) // returns 1
     * toNumber("10f") // returns null
     * toNumber("FF", 16) // returns 255
     */
    toNumber: {
      _func: resolvedArgs => {
        const toNumberFn = (value, base) => {
          const num = valueOf(value);
          if (getType(num) === TYPE_STRING && base !== 10) {
            let digitCheck;
            if (base === 2) digitCheck = /^\s*(\+|-)?[01.]+\s*$/;
            else if (base === 8) digitCheck = /^\s*(\+|-)?[0-7.]+\s*$/;
            else if (base === 16) digitCheck = /^\s*(\+|-)?[0-9A-Fa-f.]+\s*$/;
            else throw evaluationError(`Invalid base: "${base}" for toNumber()`);

            if (num === '') return 0;
            if (!digitCheck.test(num)) {
              debug.push(`Failed to convert "${num}" base "${base}" to number`);
              return null;
            }
            const parts = num.split('.').map(p => p.trim());

            let decimal = 0;
            if (parts.length > 1) {
              decimal = parseInt(parts[1], base) * base ** -parts[1].length;
            }

            const result = parseInt(parts[0], base) + decimal;
            if (parts.length > 2 || Number.isNaN(result)) {
              debug.push(`Failed to convert "${num}" base "${base}" to number`);
              return null;
            }
            return result;
          }
          try {
            return toNumber(num);
          } catch (e) {
            const errorString = arg => {
              const v = toJSON(arg);
              return v.length > 50 ? `${v.substring(0, 20)} ...` : v;
            };

            debug.push(`Failed to convert "${errorString(num)}" to number`);
            return null;
          }
        };
        let base = 10;
        if (resolvedArgs.length > 1) {
          base = Array.isArray(resolvedArgs[1])
            ? resolvedArgs.map(toInteger)
            : toInteger(resolvedArgs[1]);
        }
        return evaluate([resolvedArgs[0], base], toNumberFn);
      },
      _signature: [
        { types: [TYPE_ANY] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER], optional: true },
      ],
    },

    /**
     * Returns the argument converted to a string.
     * If the argument is a string, it will be returned unchanged.
     * Otherwise, returns the JSON encoded value of the argument.
     * @param {any} arg Value to be converted to a string
     * @param {integer} [indent=0] Indentation to use when converting
     * objects and arrays to a JSON string
     * @return {string} The result string.
     * @function toString
     * @example
     * toString(1) // returns "1"
     * toString(true()) // returns "true"
     * toString({sum: 12 + 13}) // "{"sum":25}"
     * toString("hello") // returns "hello"
     */
    toString: {
      _func: resolvedArgs => toJSON(resolvedArgs[0], resolvedArgs.length > 1 ? resolvedArgs[1] : 0),
      _signature: [{ types: [TYPE_ANY] }, { types: [TYPE_NUMBER], optional: true }],
    },

    /**
     * Remove leading and trailing spaces (U+0020), and replace all internal multiple spaces
     * with a single space.  Note that other whitespace characters are left intact.
     * @param {string|string[]} text string to trim
     * @return {string|string[]} trimmed string
     * @function trim
     * @example
     * trim("   ab    c   ") // returns "ab c"
     */
    trim: {
      _func: args => evaluate(args, s => toString(s).split(' ').filter(x => x).join(' ')),
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
      ],
    },

    /**
     * Return constant boolean true value.
     * Expressions may also use the JSON literal: `` `true` ``
     * @returns {boolean} True
     * @function true
     */
    true: {
      _func: () => true,
      _signature: [],
    },

    /**
     * Truncates a number to an integer by removing the fractional part of the number.
     * i.e. it rounds towards zero.
     * @param {number|number[]} numA number to truncate
     * @param {integer|integer[]} [numB=0]
     * A number specifying the number of decimal digits to preserve.
     * @return {number|number[]} Truncated value
     * @function trunc
     * @example
     * trunc(8.9) // returns 8
     * trunc(-8.9) // returns -8
     * trunc(8.912, 2) // returns 8.91
     */
    trunc: {
      _func: resolvedArgs => {
        const args = resolvedArgs.slice();
        if (args.length < 2) args.push(0);
        return evaluate(args, truncFn);
      },
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER], optional: true },
      ],
    },

    /**
     * Finds the type name of the given `subject` argument as a string value.
     * The return value will be one of the following:
     *
     * * number
     * * string
     * * boolean
     * * array
     * * object
     * * null
     * @param {any} subject type to evaluate
     * @return {string} The type name
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
        [TYPE_ARRAY_NUMBER]: 'array',
        [TYPE_ARRAY_STRING]: 'array',
        [TYPE_ARRAY_ARRAY]: 'array',
        [TYPE_OBJECT]: 'object',
        [TYPE_BOOLEAN]: 'boolean',
        [TYPE_EXPREF]: 'expref',
        [TYPE_NULL]: 'null',
      }[getType(resolvedArgs[0])]),
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
        // represented by class objects with a valueOf(), we'll locate them in the valueArray
        // but return the original class object.
        const valueArray = args[0].map(a => valueOf(a));
        return args[0]
          .filter(
            (v, index) => valueArray.findIndex(
              lookup => strictDeepEqual(lookup, valueOf(v)),
            ) === index,
          );
      },
      _signature: [
        { types: [TYPE_ARRAY] },
      ],
    },

    /**
     * Converts all the alphabetic code points in a string to uppercase.
     * @param {string|string[]} input input string
     * @returns {string|string[]} the upper case value of the input string
     * @function upper
     * @example
     * upper("abcd") // returns "ABCD"
     */
    upper: {
      _func: args => evaluate(args, a => toString(a).toUpperCase()),
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
      ],
    },

    /**
     * Perform an indexed lookup on an object or array
     * @param {object | array | null} subject on which to perform the lookup.
     * When querying for <<_hidden_properties,hidden properties>>, `subject` may be any data type.
     * @param {string | integer} index if `subject` is an object, `index` must be a string
     * indicating the key name to search for.
     * If `subject` is an array, then index must be an integer indicating the offset into the array
     * @returns {any} the result of the lookup -- or `null` if not found.
     * @function value
     * @example
     * value({a: 1, b:2, c:3}, "a") // returns 1
     * value([1, 2, 3, 4], 2) // returns 3
     */
    value: {
      _func: args => {
        const indexType = getType(args[1]);
        let index = args[1];
        const subjectArray = isArrayType(args[0]);
        // if the object/array has a getter for this property then don't validate types
        // just return the value.
        if (args[0] !== null && Object.getOwnPropertyDescriptor(args[0], index)?.get) {
          return getProperty(args[0], index);
        }
        const obj = valueOf(args[0]);
        if (obj === null) return null;
        if (!(getType(obj) === TYPE_OBJECT || subjectArray)) {
          throw typeError('First parameter to value() must be one of: object, array, null.');
        }
        if (subjectArray) {
          if (indexType !== TYPE_NUMBER) throw typeError('value() requires an integer index for arrays');
          index = toInteger(index);
        } else if (indexType !== TYPE_STRING) {
          throw typeError('value() requires a string index for objects');
        }
        const result = getProperty(args[0], index);
        if (result === undefined) {
          if (subjectArray) {
            debug.push(
              `Index: ${index} out of range for array size: ${obj.length}`,
            );
          } else debugAvailable(debug, obj, index);
          return null;
        }
        return result;
      },
      _signature: [
        { types: [TYPE_ANY] },
        { types: [TYPE_STRING, TYPE_NUMBER] },
      ],
    },

    /**
     * Generates an array of the values of the provided object.
     * Note that because JSON objects are
     * inherently unordered, the values associated with the provided object are
     * also unordered.
     * @param {object} obj source object
     * @return {array} array of the values
     * @function values
     * @example
     * values({a : 3, b : 4}) // returns [3, 4]
     */
    values: {
      _func: resolvedArgs => Object.values(resolvedArgs[0]),
      _signature: [{ types: [TYPE_OBJECT] }],
    },

    /**
     * Extract the day of the week from a date.
     * The specific numbering of the day of week is controlled by the `returnType` parameter:
     *
     * * 1 : Sunday (1), Monday (2), ..., Saturday (7)
     * * 2 : Monday (1), Tuesday (2), ..., Sunday(7)
     * * 3 : Monday (0), Tuesday (1), ...., Sunday(6)
     * @param {number|number[]} date <<_date_and_time_values, date/time value>> for
     * which the day of the week is to be returned.
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [toDate]{@link todate}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @param {integer|integer[]} [returnType=1] Determines the
     * representation of the result.
     * An unrecognized returnType will result in a error.
     * @returns {integer|integer[]} day of the week
     * @function weekday
     * @example
     * weekday(datetime(2006,5,21)) // 1
     * weekday(datetime(2006,5,21), 2) // 7
     * weekday(datetime(2006,5,21), 3) // 6
     */
    weekday: {
      _func: resolvedArgs => {
        const args = resolvedArgs.slice();
        if (args.length < 2) args.push(1);
        return evaluate(args, weekdayFn);
      },
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
        { types: [TYPE_NUMBER], optional: true },
      ],
    },

    /**
     * Finds the year of a datetime value
     * @param {number|number[]} date input <<_date_and_time_values, date/time value>>
     * Date/time values can be generated using the
     * [datetime]{@link datetime}, [toDate]{@link todate}, [today]{@link today}, [now]{@link now}
     * and [time]{@link time} functions.
     * @return {integer|integer[]} The year value
     * @function year
     * @example
     * year(datetime(2008,5,23)) // returns 2008
     */
    year: {
      _func: args => evaluate(args, a => getDateObj(a).getFullYear()),
      _signature: [
        { types: [TYPE_NUMBER, TYPE_ARRAY_NUMBER] },
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
