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
import dataTypes from './dataTypes';

// get the offset in MS, given a date and timezone
// timezone is an IANA name. e.g. 'America/New_York'
function offsetMS(dateObj, timeZone) {
  const tzOffset = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' }).format(dateObj);
  const offset = /GMT([+\-−])?(\d{1,2}):?(\d{0,2})?/.exec(tzOffset);
  if (!offset) return 0;
  const [sign, hours, minutes] = offset.slice(1);
  const result = (((hours || 0) * 60) + 1 * (minutes || 0)) * 60 * 1000;
  return sign === '-' ? result * -1 : result;
}

function round(num, digits) {
  const precision = 10 ** digits;
  return Math.round(num * precision) / precision;
}

const MS_IN_DAY = 24 * 60 * 60 * 1000;

// If we create a non-UTC date, then we need to adjust from the default JavaScript timezone
// to the default timezone
export function adjustTimeZone(dateObj, timeZone) {
  if (dateObj === null) return null;
  let baseDate = Date.UTC(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
    dateObj.getHours(),
    dateObj.getMinutes(),
    dateObj.getSeconds(),
    dateObj.getMilliseconds(),
  );
  baseDate += offsetMS(dateObj, timeZone);

  // get the offset for the default JS environment
  // return days since the epoch
  return new Date(baseDate);
}

export default function openFormulaFunctions(valueOf, toString, toNumber, debug = []) {
  return {
  /**
   * Return a lower-case string using locale-specific mappings.
   * e.g. Strings with German lowercase letter 'ß' can be compared to 'ss'
   * @param {string} input string to casefold
   * @returns {string} A new string converted to lower case
   * @category functions
   * @function
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
     * Returns the logical AND result of all parameters
     * @param {any} first logical expression -- will be cast to boolean
     * @param {...any} operand any number of additional expressions
     * @returns {boolean} The logical result of applying AND to all parameters
     * @category functions
     * @example
     * and(10 > 8, length('foo') < 5)
     * // true
     * @function
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
     * Returns the logical OR result of two parameters
     * @param {any} first logical expression -- will be cast to boolean
     * @param {...any} operand any number of additional expressions
     * @returns {boolean} The logical result of applying OR to all parameters
     * @example
     * or((x / 2) == y, (y * 2) == x)
     * // true
     * @function
     * @category functions
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
     * Compute logical NOT
     * Note that it is also possible to use the logical and operator: `A && B`
     * @param {any} - any data type -- will be cast to boolean
     * @returns {boolean} The logical NOT applied to the input parameter
     * @example
     * not(length('bar') > 0)
     * // false
     * @function
     * @category functions
     */
    not: {
      _func: resolveArgs => !valueOf(resolveArgs[0]),
      _signature: [{ types: [dataTypes.TYPE_ANY] }],
    },

    /**
     * Return constant null value.
     * Note that expressions may also use the JSON literal null: `` `null` ``
     * @returns {boolean} True
     * @category functions
     * @function
     */
    null: {
      _func: () => null,
      _signature: [],
    },

    /**
     * Return constant boolean true value.
     * Note that expressions may also use the JSON literal true: `` `true` ``
     * @returns {boolean} True
     * @function
     * @category functions
     */
    true: {
      _func: () => true,
      _signature: [],
    },

    /**
     * Return constant boolean false value.
     * Note that expressions may also use the JSON literal false: `` `false` ``
     * @returns {boolean} False
     * @category functions
     * @function
     */
    false: {
      _func: () => false,
      _signature: [],
    },

    /**
     * Return one of two values, depending on a condition
     * @returns {boolean} True
     * @param {any} condition logical expression to evaluate
     * @param {any} result1 if logical condition is true
     * @param {any} result2 if logical condition is false
     * @return {any} either result1 or result2
     * @category functions
     * @function
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
     * Returns input `text`, with text `old` replaced by text `new` (when searching from the left).
     * If `which` parameter is omitted, every occurrence of `old` is replaced with `new`;
     * If `which` is provided, only that occurrence of `old` is replaced by `new`
     * (starting the count from 1).
     * If there is no match, or if `old` has length 0, `text` is returned unchanged.
     * Note that `old` and `new` may have different lengths. If `which` < 1, return `text` unchanged
     * @param {string} text
     * @param {string} old text
     * @param {string} new text
     * @param {integer} which (optional) which occurence to replace
     * @returns {string} replaced string
     * @category functions
     * @function
     */
    substitute: {
      _func: args => {
        const src = toString(args[0]);
        const old = toString(args[1]);
        const replacement = toString(args[2]);
        // no third parameter? replace all instances
        if (args.length <= 3) return src.replaceAll(old, replacement);
        const whch = toNumber(args[3]);
        if (whch < 1) return src;
        // find the instance to replace
        let pos = -1;
        for (let i = 0; i < whch; i += 1) {
          pos += 1;
          const nextFind = src.slice(pos).indexOf(old);
          // no instance to match 'Which'
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
     * Perform an indexed lookup on a map or array
     * @param {map | array} object on which to perform the lookup
     * @param {string | integer} index: a named child for a map or an integer offset for an array
     * @returns {any} the result of the lookup -- or `null` if not found.
     * @category functions
     * @function
     */
    value: {
      _func: args => {
        const obj = args[0] || {};
        const index = args[1];
        const result = obj[index];
        if (result === undefined) {
          debug.push(`Failed to find: '${index}'`);
          const available = Object.keys(obj).map(a => `'${a}'`).toString();
          if (available.length) debug.push(`Available fields: ${available}`);

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
     * Converts all the alphabetic characters in a string to lowercase. If the value 
     * is not a string it will be converted into string
     * using the default toString method
     * @param {string} input input string
     * @returns {string} the lower case value of the input string
     * @category functions
     * @function
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
     * Converts all the alphabetic characters in a string to uppercase.
     * If the value is not a string it will be converted into string
     * using the default toString method
     * @param {string} input input string
     * @returns {string} the upper case value of the input string
     * @category functions
     * @function
     */
    upper: {
      _func: args => {
        const value = toString(args[0]);
        return value.toUpperCase();
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },
    /**
     * Returns e (the base of natural logarithms) raised to a power x
     * @param x A numeric expression representing the power of e.
     * @returns {number}  e (the base of natural logarithms) raised to a power x
     * @category functions
     * @function
     */
    exp: {
      _func: args => {
        const value = toNumber(args[0]);
        return Math.exp(value);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    /**
     * Computes `a` raised to a power `x`
     * @param {number} a
     * @param {number} x
     * @function power
     * @category functions
     */
    power: {
      _func: args => {
        const base = toNumber(args[0]);
        const power = toNumber(args[1]);
        return base ** power;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },

    /**
     * finds and returns the index of query in text from a start position
     * @param {string} query string to search
     * @param {string} text text in which the query has to be searched
     * @param {number} [start] starting position: defaults to 0
     * @returns {number|null} the index of the query to be searched in the text. If not found
     * returns null
     * @category functions
     * @function find
     */
    find: {
      _func: args => {
        const query = toString(args[0]);
        const text = toString(args[1]);
        const startPos = args.length > 2 ? toNumber(args[2]) : 0;
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
    left: {
      _func: args => {
        const numEntries = args.length > 1 ? toNumber(args[1]) : 1;
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
    right: {
      _func: args => {
        const numEntries = args.length > 1 ? toNumber(args[1]) : 1;
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
    mid: {
      _func: args => {
        const startPos = toNumber(args[1]);
        const numEntries = toNumber(args[2]);
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
    mod: {
      _func: args => {
        const p1 = toNumber(args[0]);
        const p2 = toNumber(args[1]);
        return p1 % p2;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    proper: {
      _func: args => {
        const text = toString(args[0]);
        const words = text.split(' ');
        const properWords = words.map(word => word.charAt(0).toUpperCase()
          + word.slice(1).toLowerCase());
        return properWords.join(' ');
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },
    rept: {
      _func: args => {
        const text = toString(args[0]);
        const count = toNumber(args[1]);
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
    replace: {
      _func: args => {
        const oldText = toString(args[0]);
        const startNum = toNumber(args[1]);
        const numChars = toNumber(args[2]);
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
    round: {
      _func: args => {
        const number = toNumber(args[0]);
        const digits = toNumber(args[1]);
        return round(number, digits);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    sqrt: {
      _func: args => {
        const result = Math.sqrt(toNumber(args[0]));
        if (Number.isNaN(result)) {
          return null;
        }
        return result;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    stdevp: {
      _func: args => {
        const values = args[0] || [];
        if (values.length === 0) {
          return null;
        }
        const coercedValues = values.map(value => toNumber(value));
        const mean = coercedValues.reduce((a, b) => a + b, 0) / values.length;
        const meanSumSquare = coercedValues.reduce((a, b) => a + b * b, 0) / values.length;
        const result = Math.sqrt(meanSumSquare - mean * mean);
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
    stdev: {
      _func: args => {
        const values = args[0] || [];
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
    trunc: {
      _func: args => {
        const number = toNumber(args[0]);
        const digits = args.length > 1 ? toNumber(args[1]) : 0;
        const method = number >= 0 ? Math.floor : Math.ceil;
        return method(number * 10 ** digits) / 10 ** digits;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
      ],
    },
    charCode: {
      _func: args => {
        const code = toNumber(args[0]);
        if (!Number.isInteger(code)) {
          return null;
        }
        return String.fromCharCode(code);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    codePoint: {
      _func: args => {
        const text = toString(args[0]);
        if (text.length === 0) {
          return null;
        }
        return text.codePointAt(0);
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },
    /**
     * Return a date/time value.
     * @param {integer} year
     * @param {integer} day
     * @param {integer} hours
     * @param {integer} (optional) minutes
     * @param {integer} (optional) seconds
     * @param {integer} (optional) milliseconds
     * @param {string} (optional) time zone name --
     * according to IANA time zone names. e.g. "America/Toronto"
     * @returns {number} the new date/time value
     * @category functions
     * @kind function
     * @function
     */
    datetime: {
      _func: args => {
        const year = toNumber(args[0]);
        const month = toNumber(args[1]);
        const day = toNumber(args[2]);
        const hours = args.length > 3 ? toNumber(args[3]) : 0;
        const minutes = args.length > 4 ? toNumber(args[4]) : 0;
        const seconds = args.length > 5 ? toNumber(args[5]) : 0;
        const ms = args.length > 6 ? toNumber(args[6]) : 0;
        const tz = args.length > 7 ? toString(args[7]) : null;
        // javascript months starts from 0
        let jsDate = new Date(year, month - 1, day, hours, minutes, seconds, ms);
        if (tz) {
          jsDate = adjustTimeZone(jsDate, tz);
        }
        return jsDate.getTime() / MS_IN_DAY;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
        { types: [dataTypes.TYPE_NUMBER], optional: true },
        { types: [dataTypes.TYPE_STRING], optional: true },
      ],
    },
    /**
     * Return a datetime value.
     * @param {number} start_date The starting date
     * @param {number} end_date The end date -- must be greater or equal to start_date
     * @param {string} unit  One of:
          `y` the number of whole years between start_date and end_date
          `m` the number of whole months between start_date and end_date.
          `d` the number of days between start_date and end_date
          `md` the number of days between start_date and end_date after subtracting whole months.
          `ym` the number of whole months between start_date and end_date
             after subtracting whole years.
          `yd` the number of days between start_date and end_date, assuming start_date
             and end_date were no more than one year apart
      * @returns {integer} The number of days/months/years difference
      * @category functions
      * @function
      */
    datedif: {
      _func: args => {
        const d1 = toNumber(args[0]);
        const d2 = toNumber(args[1]);
        const unit = toString(args[2]).toLowerCase();
        if (d2 === d1) return 0;
        if (d2 < d1) return null;
        if (unit === 'd') return Math.floor(d2 - d1);
        const date1 = new Date(d1 * MS_IN_DAY);
        const date2 = new Date(d2 * MS_IN_DAY);
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
          return Math.floor((date2.getTime() - date1.getTime()) / MS_IN_DAY);
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
      * Summary: Returns the serial number of the end of a month, given date plus MonthAdd months
      * @param {number} startDate The base date to start from
      * @param {integer} monthAdd Number of months to add to start date
      * @return {integer} the number of days in the computed month
      * @category functions
      * @function
      */
    eomonth: {
      _func: args => {
        const date = toNumber(args[0]);
        const months = toNumber(args[1]);
        const jsDate = new Date(date * MS_IN_DAY);
        // We can give the constructor a month value > 11 and it will increment the years
        // Since day is 1-based, giving zero will yield the last day of the previous month
        const newDate = new Date(jsDate.getFullYear(), jsDate.getMonth() + months + 1, 0);
        return newDate.getTime() / MS_IN_DAY;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    day: {
      _func: args => {
        const date = toNumber(args[0]);
        const jsDate = new Date(date * MS_IN_DAY);
        return jsDate.getDate();
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    month: {
      _func: args => {
        const date = toNumber(args[0]);
        const jsDate = new Date(date * MS_IN_DAY);
        // javascript months start from 0ß
        return jsDate.getMonth() + 1;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    year: {
      _func: args => {
        const date = toNumber(args[0]);
        const jsDate = new Date(date * MS_IN_DAY);
        return jsDate.getFullYear();
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    time: {
      _func: args => {
        const hours = toNumber(args[0]);
        const minutes = toNumber(args[1]);
        const seconds = toNumber(args[2]);
        const time = (hours * 3600 + minutes * 60 + seconds) / 86400;
        if (time < 0) {
          return null;
        }
        return time - Math.floor(time);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    hour: {
      _func: args => {
        // grab just the fraction part
        const time = toNumber(args[0]) % 1;
        if (time < 0) {
          return null;
        }
        // Normally we'd round to 15 digits, but since we're also multiplying by 24,
        // a reasonable precision is around 14 digits.

        const hour = round(time * 24, 14);

        return Math.floor(hour % 24);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    minute: {
      _func: args => {
        const time = toNumber(args[0]) % 1;
        if (time < 0) {
          return null;
        }

        // Normally we'd round to 15 digits, but since we're also multiplying by 1440,
        // a reasonable precision is around 10 digits.
        const minute = Math.round(time * 1440, 10);
        return Math.floor(minute % 60);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    second: {
      _func: args => {
        const time = toNumber(args[0]) % 1;
        if (time < 0) {
          return null;
        }

        // Normally we'd round to 15 digits, but since we're also multiplying by 86400,
        // a reasonable precision is around 10 digits.
        const seconds = round(time * 86400, 10);
        return Math.floor(seconds % 60);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    now: {
      _func: () => Date.now() / MS_IN_DAY,
      _signature: [],
    },
    today: {
      _func: () => Math.floor(Date.now() / MS_IN_DAY),
      _signature: [],
    },
    weekday: {
      _func: args => {
        const date = toNumber(args[0]);
        const type = args.length > 1 ? toNumber(args[1]) : 1;
        const jsDate = new Date(date * MS_IN_DAY);
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
    fromEntries: {
      _func: args => {
        const array = args[0];
        return Object.fromEntries(array);
      },
      _signature: [
        { types: [dataTypes.TYPE_ARRAY_ARRAY] },
      ],
    },
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
    unique: {
      _func: args => {
        // create an array of values for searching.  That way if the array elements are
        // represented by objects with a valueOf(), then we'll locate them in the valueArray
        const valueArray = args[0].map(a => valueOf(a));
        return args[0].filter((v, index) => valueArray.indexOf(valueOf(v)) === index);
      },
      _signature: [
        { types: [dataTypes.TYPE_ARRAY] },
      ],
    },
    encodeUrlComponent: {
      _func: args => encodeURIComponent(args[0]),
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },
    encodeUrl: {
      _func: args => encodeURI(args[0]),
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },
    decodeUrlComponent: {
      _func: args => decodeURIComponent(args[0]),
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },
    decodeUrl: {
      _func: args => decodeURI(args[0]),
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },
  };
}
