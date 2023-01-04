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
     * Returns the logical AND result of all parameters.
     * If the parameters are not boolean they will be cast to boolean as per the following rules
     * * null -> false
     * * number -> false if the number is 0, true otherwise
     * * string -> false if the string is empty, true otherwise. String "false" resolves to true
     * * array -> true
     * * object -> true
     * @param {any} firstOperand logical expression
     * @param {...any} [additionalOperands] any number of additional expressions
     * @returns {boolean} The logical result of applying AND to all parameters
     * @example
     * and(10 > 8, length('foo') < 5) // returns true
     * @example
     * and(`null`, length('foo') < 5) // returns false
     * @function
     * @category openFormula
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
     * Returns a lower-case string of the `input` string using locale-specific mappings.
     * e.g. Strings with German lowercase letter 'ß' can be compared to 'ss'
     * @param {string} input string to casefold
     * @returns {string} A new string converted to lower case
     * @function casefold
     * @example
     * casefold('AbC') // returns 'abc'
     * @category JSONFormula
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
     * Return difference between two date values.
     * @param {number} start_date The starting date.
     * Dates should be entered by using the [datetime]{@link datetime} function
     * @param {number} end_date The end date -- must be greater or equal to start_date.
     * Dates should be entered by using the [datetime]{@link datetime} function
     * @param {string} unit  One of:
     * * `y` the number of whole years between start_date and end_date
     * * `m` the number of whole months between start_date and end_date.
     * * `d` the number of days between start_date and end_date
     * * `md` the number of days between start_date and end_date after subtracting whole months.
     * * `ym` the number of whole months between start_date and end_date
     * after subtracting whole years.
     * * `yd` the number of days between start_date and end_date, assuming start_date
     * and end_date were no more than one year apart
     * @returns {integer} The number of days/months/years difference
     * @function
     * @category openFormula
     * @example
     * datedif(datetime(2001, 1, 1), datetime(2003, 1, 1), 'y') // returns 2
     * @example
     * datedif(datetime(2001, 6, 1), datetime(2003, 8, 15), 'D') // returns 440
     * // 440 days between June 1, 2001, and August 15, 2002 (440)
     * @example
     * datedif(datetime(2001, 6, 1), datetime(2003, 8, 15), 'YD') // returns 440
     * // 75 days between June 1 and August 15, ignoring the years of the dates (75)
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
     * Return a date/time value.
     * @param {integer} year Integer value representing the year.
     * Values from 0 to 99 map to the years 1900 to 1999. All other values are the actual year
     * @param {integer} month Integer value representing the month, beginning with 1 for
     * January to 12 for December.
     * @param {integer} day Integer value representing the day of the month.
     * @param {integer} [hours] Integer value between 0 and 23 representing the hour of the day.
     * Defaults to 0.
     * @param {integer} [minutes] Integer value representing the minute segment of a time.
     * The default is 0 minutes past the hour.
     * @param {integer} [seconds] Integer value representing the second segment of a time.
     * The default is 0 seconds past the minute.
     * @param {integer} [milliseconds] Integer value representing the millisecond segment of a time.
     * The default is 0 milliseconds past the second.
     * @param {string} [timeZoneName] according to IANA time zone names. e.g. "America/Toronto"
     * @returns {number} A date/time value represented by number of seconds since 1 January 1970.
     * @kind function
     * @function
     * @category JSONFormula
     * @example
     * datetime(2010, 10, 10) // returns representation of October 10, 2010
     * @example
     * datetime(2010, 2, 28) // returns representation of February 28, 2010
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
     * Returns the day of a date, represented by a serial number.
     * The day is given as an integer ranging from 1 to 31.
     * @param {number} The date of the day you are trying to find.
     * Dates should be entered by using the [datetime]{@link datetime} function
     * @return {number}
     * @function day
     * @category openFormula
     * @example
     * day(datetime(2008,5,23)) //returns 23
     */
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

    /**
     * Searches a nested hierarchy of objects to return an array of elements that match a `name`.
     * The name can be either a key into a map or an array index.
     * This is similar to the JSONPath deep scan operator (..)
     * @param {object} object The starting object or array where we start the search
     * @param {string} name The name (or index position) of the elements to find
     * @returns {any}
     * @function
     * @category JSONFormula
     * @example
     * deepScan({a : {b1 : {c : 2}, b2 : {c : 3}}}, 'c') //returns [2, 3]
     */
    deepScan: {
      _func: resolvedArgs => {
        const [source, n] = resolvedArgs;
        const name = n.toString();
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
     * returns an array of a given object's property `[key, value]` pairs.
     * @param {object} obj Object whose `[key, value]` pairs need to be extracted
     * @returns {any[]} an array of [key, value] pairs
     * @function entries
     * @category JSONFormula
     * @example
     * entries({a: 1, b: 2}) //returns [['a', 1], ['b', 2]]
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
     * Returns the serial number of the end of a month, given `startDate` plus `monthAdd` months
     * @param {number} startDate The base date to start from.
     * Dates should be entered by using the [datetime]{@link datetime} function
     * @param {integer} monthAdd Number of months to add to start date
     * @return {integer} the number of days in the computed month
     * @function
     * @category openFormula
     * @example
     * eomonth(datetime(2011, 1, 1), 1) //returns datetime(2011, 2, 28)
     * @example
     * eomonth(datetime(2011, 1, 1), -3) //returns datetime(2010, 10, 31)
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

    /**
     * Returns e (the base of natural logarithms) raised to a power x. (i.e. e<sup>x</sup>)
     * @param x {number} A numeric expression representing the power of e.
     * @returns {number} e (the base of natural logarithms) raised to a power x
     * @function exp
     * @category openFormula
     * @example
     * exp(10) //returns e^10
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
     * Return constant boolean false value.
     * Note that expressions may also use the JSON literal false: `` `false` ``
     * @returns {boolean} constant boolean value `false`
     * @function
     * @category openFormula
     */
    false: {
      _func: () => false,
      _signature: [],
    },

    /**
     * finds and returns the index of query in text from a start position
     * @param {string} query string to search
     * @param {string} text text in which the query has to be searched
     * @param {number} [start] starting position: defaults to 0
     * @returns {number|null} the index of the query to be searched in the text. If not found
     * returns null
     * @function
     * @category openFormula
     * @example
     * find('m', 'abm') //returns 2
     * @example
     * find('M', 'abMcdM', 3) //returns 2
     * @example
     * find('M', 'ab') //returns `null`
     * @example
     * find('M', 'abMcdM', 2) //returns 2
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

    /**
     * returns an object by transforming a list of key-value `pairs` into an object.
     * @param {any[]} pairs list of key-value pairs to create the object from
     * @returns {object}
     * @category JSONFormula
     * @function fromEntries
     * @example
     * fromEntries([['a', 1], ['b', 2]]) //returns {a: 1, b: 2}
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
     * Extract the hour (0 through 23) from a time/datetime representation
     * @param {number} The datetime/time for which the hour is to be returned.
     * Dates should be specified using the [datetime]{@link datetime} or [time]{@link time} function
     * @return {number}
     * @function hour
     * @category openFormula
     * @example
     * hour(datetime(2008,5,23,12, 0, 0)) //returns 12
     * hour(time(12, 0, 0)) //returns 12
     */
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

    /**
     * Return one of two values `result1` or `result2`, depending on the `condition`
     * @returns {boolean} True
     * @param {any} condition logical expression to evaluate
     * @param {any} result1 if logical condition is true
     * @param {any} result2 if logical condition is false
     * @return {any} either result1 or result2
     * @function
     * @category openFormula
     * @example
     * if(true(), 1, 2) // returns 1
     * @example
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
     * Return a selected number of text characters from the left or
     * in case of array selected number of elements from the start
     * @param {string|array} subject The text/array of characters/elements to extract.
     * @param {number} [elements] number of elements to pick. Defaults to 1
     * @return {string|array}
     * @function left
     * @category openFormula
     * @example
     * left('Sale Price', 4) //returns 'Sale'
     * @example
     * left('Sweden') // returns 'S'
     * @example
     * left([4, 5, 6], 2) // returns [4, 5]
     */
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

    /**
     * Converts all the alphabetic characters in a string to lowercase. If the value
     * is not a string it will be converted into string
     * using the default toString method
     * @param {string} input input string
     * @returns {string} the lower case value of the input string
     * @function lower
     * @category openFormula
     * @example
     * lower('E. E. Cummings') //returns e. e. cummings
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
     * Returns extracted text, given an original text, starting position, and length.
     * or in case of array, extracts a subset of the array from start till the length
     * number of elements.
     * Returns null if the `startPos` is greater than the length of the array
     * @param {string|array} subject the text string or array of characters or elements to extract.
     * @param {number} startPos the position of the first character or element to extract.
     * The position starts with 0
     * @param {number} length The number of characters or elements to return from text. If it
     * is greater then the length of `subject` the argument is set to the length of the subject.
     * @return {string|array}
     * @function mid
     * @category openFormula
     * @example
     * mid("Fluid Flow",1,5) //returns 'Fluid'
     * @example
     * mid("Fluid Flow",7,20) //returns 'Flow'
     * @example
     * mid("Fluid Flow",20,5) //returns `null`
     */
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

    /**
     * Extract the minute (0 through 59) from a time/datetime representation
     * @param {number} The datetime/time for which the minute is to be returned.
     * Dates should be specified using the [datetime]{@link datetime} or [time]{@link time} function
     * @return {number}
     * @function minute
     * @category openFormula
     * @example
     * month(datetime(2008,5,23,12, 10, 0)) //returns 10
     * month(time(12, 10, 0)) //returns 10
     */
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

    /**
     * Return the remainder when one number is divided by another number.
     * The sign is the same as divisor
     * @param {number} dividend The number for which to find the remainder.
     * @param {number} divisor The number by which to divide number.
     * @return {number} Computes the remainder of `dividend`/`divisor`.
     * @function mod
     * @category openFormula
     * @example
     * mod(3, 2) //returns 1
     * @example
     * mod(-3, 2) //returns 1
     */
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

    /**
     * Returns the month of a date represented by a serial number.
     * The month is given as an integer, ranging from 1 (January) to 12 (December).
     * @param {number} The date for which the month is to be returned.
     * Dates should be entered by using the [datetime]{@link datetime} function
     * @return {number}
     * @function month
     * @category openFormula
     * @example
     * month(datetime(2008,5,23)) //returns 5
     */
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

    /**
     * Compute logical NOT of a `value`. If the parameter is not boolean it will be cast to boolean
     * as per the following rules
     * * null -> false
     * * number -> false if the number is 0, true otherwise
     * * string -> false if the string is empty, true otherwise. String "false" resolves to true
     * * array -> true
     * * object -> true
     * Note that it is also possible to use the logical and operator: `A && B`
     * @param {any} value - any data type
     * @returns {boolean} The logical NOT applied to the input parameter
     * @example
     * not(length('bar') > 0) // returns false
     * @example
     * not(false()) // returns true
     * @example
     * not('abcd') // returns false
     * @example
     * not('') // returns true
     * @function
     * @category openFormula
     */
    not: {
      _func: resolveArgs => !valueOf(resolveArgs[0]),
      _signature: [{ types: [dataTypes.TYPE_ANY] }],
    },

    /**
     * returns the time since epoch with days as exponent and time of day as fraction
     * @return {number} representation of current time as a number
     * @function now
     * @category openFormula
     */
    now: {
      _func: () => Date.now() / MS_IN_DAY,
      _signature: [],
    },

    /**
     * Return constant null value.
     * Note that expressions may also use the JSON literal null: `` `null` ``
     * @returns {boolean} True
     * @function
     * @category JSONFormula
     */
    null: {
      _func: () => null,
      _signature: [],
    },

    /**
     * Returns the logical OR result of two parameters.
     * If the parameters are not boolean they will be cast to boolean as per the following rules
     * * null -> false
     * * number -> false if the number is 0, true otherwise
     * * string -> false if the string is empty, true otherwise. String "false" resolves to true
     * * array -> true
     * * object -> true
     * @param {any} first logical expression
     * @param {...any} [operand] any number of additional expressions
     * @returns {boolean} The logical result of applying OR to all parameters
     * @example
     * or((x / 2) == y, (y * 2) == x)
     * // true
     * @function
     * @category openFormula
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
     * @param {number} a The base number. It can be any real number.
     * @param {number} x The exponent to which the base number is raised.
     * @return {number}
     * @function power
     * @category openFormula
     * @example
     * power(10, 2) //returns 100 (10 raised to power 2)
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
     * Return the input string with the first letter of each word converted to an
     * uppercase letter and the rest of the letters in the word converted to lowercase.
     * @param {string} text the text to partially capitalize.
     * @returns {string}
     * @function proper
     * @category openFormula
     * @example
     * proper('this is a TITLE') //returns 'This Is A Title'
     * @example
     * proper('2-way street') //returns '2-Way Street'
     * @example
     * proper('76BudGet') //returns '76Budget'
     */
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

    /**
     * Returns text where an old text is substituted at a given start position and
     * length, with a new text.
     * @param {string} text original text
     * @param {number} start index in the original text from where to begin the replacement.
     * @param {number} length number of characters to be replaced
     * @param {string} replacement string to replace at the start index
     * @returns {string}
     * @function replace
     * @category openFormula
     * @example
     * replace('abcdefghijk', 6, 5, '*') //returns abcde*k
     * @example
     * replace('2009',3,2,'10') //returns  2010
     * @example
     * replace('123456',1,3,'@') //returns @456
     */
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

    /**
     * Return text repeated Count times.
     * @param {string} text text to repeat
     * @param {number} count number of times to repeat the text
     * @returns {string}
     * @function rept
     * @category openFormula
     * @example
     * rept('x', 5) //returns 'xxxxx'
     */
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

    /**
     * Return a selected number of text characters from the right of a `subject` or
     * in case of array selected number of elements from the end of `subject` array
     * Returns null if the number of elements is less than 0
     * @param {string|array} subject The text/array containing the characters/elements to extract.
     * @param {number} [elements] number of elements to pick. Defaults to 1
     * @return {string|array}
     * @function right
     * @category openFormula
     * @example
     * right('Sale Price', 4) //returns 'rice'
     * @example
     * left('Sweden') // returns 'n'
     * @example
     * left([4, 5, 6], 2) // returns [5, 6]
     */
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

    /**
     * Round a number to a specified `precision`.
     * ### Remarks
     * * If `precision` is greater than zero, round to the specified number of decimal places.
     * * If `precision` is 0, round to the nearest integer.
     * * If `precision` is less than 0, round to the left of the decimal point.
     * @param {number} num number to round off
     * @param {number} precision number is rounded to the specified precision.
     * @returns {number}
     * @function round
     * @category openFormula
     * @example
     * round(2.15, 1) //returns 2.2
     * @example
     * round(626.3,-3) //returns 1000 (Rounds 626.3 to the nearest multiple of 1000)
     * @example
     * round(626.3, 0) //returns 626
     * @example
     * round(1.98,-1) //returns 0 (Rounds 1.98 to the nearest multiple of 10)
     * @example
     * round(-50.55,-2) // -100 (round -50.55 to the nearest multiple of 100)
     */
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

    /**
     * Perform a wildcard search.  The search is case-sensitive and supports two forms of wildcards:
     * "*" finds a a sequence of characters and "?" finds a single character.
     * To use "*" or "?" as text values, precede them with a tilde ("~") character.
     * Note that the wildcard search is not greedy.
     * e.g. search('a*b', 'abb') will return [0, 'ab'] Not [0, 'abb']
     * @param {string} findText the search string -- which may include wild cards.
     * @param {string} withinText The string to search.
     * @param {integer} startPos The zero-based position of withinText to start searching.
     * Defaults to zero.
     * @returns {array} returns an array with two values:
     * The start position of the found text and the text string that was found.
     * If a match was not found, an empty array is returned.
     * @function search
     * @category openFormula
     * @example
     * search('a?c', 'acabc') //returns [2, 'abc']
     */
    search: {
      _func: args => {
        const findText = toString(args[0]);
        const withinText = toString(args[1]);
        const startPos = toNumber(args[2]);
        if (findText === null || withinText === null || withinText.length === 0) return [];
        // escape all characters that would otherwise create a regular expression
        const reString = findText.replace(/([[.\\^$()+{])/g, '\\$1')
          // add the single character wildcard
          .replace(/~?\?/g, match => match === '~?' ? '\\?' : '.')
          // add the multi-character wildcard
          .replace(/~?\*/g, match => match === '~*' ? '\\*' : '.*?')
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
     * Extract the second (0 through 59) from a time/datetime representation
     * @param {number} The datetime/time for which the second is to be returned.
     * Dates should be specified using the [datetime]{@link datetime} or [time]{@link time} function
     * @return {number}
     * @function second
     * @category openFormula
     * @example
     * second(datetime(2008,5,23,12, 10, 53)) //returns 53
     * second(time(12, 10, 53)) //returns 53
     */
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

    /**
     * split a string into an array, given a separator
     * @param {string} string string to split
     * @param {string} separator separator where the split should occur
     * @return {string[]}
     * @function split
     * @category openFormula
     * @example
     * split('abcdef', '') //returns ['a', 'b', 'c', 'd', 'e', 'f']
     * @example
     * split('abcdef', 'e') //returns ['abcd', 'f']
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
     * @param {number} num number whose square root has to be calculated
     * @return {number}
     * @function sqrt
     * @category openFormula
     * @example
     * sqrt(4) //returns 2
     */
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

    /**
     * Estimates standard deviation based on a sample.
     * `stdev` assumes that its arguments are a sample of the entire population.
     * If your data represents a entire population,
     * then compute the standard deviation using [stdevp]{@link stdevp}.
     * @param {number[]} numbers The array of numbers comprising the population
     * @returns {number}
     * @category openFormula
     * @function stdev
     * @example
     * stdev([1345, 1301, 1368]) //returns 34.044089061098404
     * stdevp([1345, 1301, 1368]) //returns 27.797
     */
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

    /**
     * Calculates standard deviation based on the entire population given as arguments.
     * `stdevp` assumes that its arguments are the entire population.
     * If your data represents a sample of the population,
     * then compute the standard deviation using [stdev]{@link stdev}.
     * @param {number[]} numbers The array of numbers comprising the population
     * @returns {number}
     * @category openFormula
     * @function stdevp
     * @example
     * stdevp([1345, 1301, 1368]) //returns 27.797
     * stdev([1345, 1301, 1368]) //returns 34.044
     */
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

    /**
     * Returns input `text`, with text `old` replaced by text `new` (when searching from the left).
     * If `which` parameter is omitted, every occurrence of `old` is replaced with `new`;
     * If `which` is provided, only that occurrence of `old` is replaced by `new`
     * (starting the count from 1).
     * If there is no match, or if `old` has length 0, `text` is returned unchanged.
     * Note that `old` and `new` may have different lengths. If `which` < 1, return `text` unchanged
     * @param {string} text The text for which to substitute characters.
     * @param {string} old The text to replace.
     * @param {string} new The text to replace `old` with.
     * @param {integer} [which] The one-based occurrence of `old` text to replace with `new` text.
     * @returns {string} replaced string
     * @function
     * @category openFormula
     * @example
     * substitute('Sales Data', 'Sales', 'Cost') //returns 'Cost Data'
     * @example
     * substitute('Quarter 1, 2008', '1', '2', 1) //returns 'Quarter 2, 2008'
     * @example
     * substitute('Quarter 1, 1008', '1', '2', 2) //returns 'Quarter 1, 2008'
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
     * Construct and returns time from hours, minutes, and seconds.
     * @param {integer} hours Integer value between 0 and 23 representing the hour of the day.
     * Defaults to 0.
     * @param {integer} minutes Integer value representing the minute segment of a time.
     * The default is 0 minutes past the hour.
     * @param {integer} seconds Integer value representing the second segment of a time.
     * The default is 0 seconds past the minute.
     * @return {number} Returns the fraction of the day consumed by the given time
     * @function time
     * @category openFormula
     * @example
     * time(12, 0, 0) //returns 0.5 (half day)
     */
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

    /**
     * returns the number of days since epoch
     * @return number
     * @function today
     * @category openFormula
     */
    today: {
      _func: () => Math.floor(Date.now() / MS_IN_DAY),
      _signature: [],
    },

    /**
     * Remove leading and trailing spaces, and replace all internal multiple spaces
     * with a single space.
     * @param {string} text string to trim
     * @return {string} removes all leading and trailing space.
     * Any other sequence of 2 or more spaces is replaced with a single space.
     * @function trim
     * @category openFormula
     * @example
     * trim('   ab    c   ') //returns 'ab c'
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
     * @function
     * @category openFormula
     */
    true: {
      _func: () => true,
      _signature: [],
    },

    /**
     * Truncates a number to an integer by removing the fractional part of the number.
     * @param {number} numA number to truncate
     * @param {number} [numB] A number specifying the precision of the truncation. Default is 0
     * @return {number}
     * @function trunc
     * @category openFormula
     * @example
     * trunc(8.9) //returns 8
     * trunc(-8.9) //returns -8
     * trunc(8.912, 2) //returns 8.91
     */
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

    /**
     * takes an array and returns unique elements within it
     * @param {array} input input array
     * @return {array} array with duplicate elements removed
     * @function unique
     * @category JSONFormula
     * @example
     * unique([1, 2, 3, 4, 1, 1, 2]) //returns [1, 2, 3, 4]
     */
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

    /**
     * Converts all the alphabetic characters in a string to uppercase.
     * If the value is not a string it will be converted into string
     * using the default toString method
     * @param {string} input input string
     * @returns {string} the upper case value of the input string
     * @function upper
     * @category openFormula
     * @example
     * upper('abcd') //returns 'ABCD'
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
     * Perform an indexed lookup on a map or array
     * @param {map | array} object on which to perform the lookup
     * @param {string | integer} index: a named child for a map or an integer offset for an array
     * @returns {any} the result of the lookup -- or `null` if not found.
     * @function
     * @category JSONFormula
     * @example
     * value({a: 1, b:2, c:3}, a) //returns 1
     * @example
     * value([1, 2, 3, 4], 2) //returns 3
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
     * Extract the day of the week from a date; if text, uses current locale to convert to a date.
     * @param {number} The datetime for which the day of the week is to be returned.
     * Dates should be entered by using the [datetime]{@link datetime} function
     * @param {number} [returnType] A number that determines the
     * numeral representation (a number from 0 to 7) of the
     * day of week. Default is 1. Supports the following values
     * * 1 : Sunday (1), Monday (2), ..., Saturday (7)
     * * 2 : Monday (1), Tuesday (2), ..., Sunday(7)
     * * 3 : Monday (0), Tuesday (2), ...., Sunday(6)
     * @returns {number} day of the week
     * @function weekday
     * @category openFormula
     * @example
     * weekday(datetime(2006,5,21)) // 1
     * @example
     * weekday(datetime(2006,5,21), 2) // 7
     * @example
     * weekday(datetime(2006,5,21), 3) // 6
     */
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

    /**
     * Returns the year of a date represented by a serial number.
     * @param {number} The date for which the year is to be returned.
     * Dates should be entered by using the [datetime]{@link datetime} function
     * @return {number}
     * @function year
     * @category openFormula
     * @example
     * year(datetime(2008,5,23)) //returns 2008
     */
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
