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

export default function openFormulaFunctions(valueOf, toString, toNumber) {
  return {
  /**
   * Return a lower-case string using locale-specific mappings.
   * e.g. Strings with German lowercase letter 'ß' can be compared to 'ss'
   * @param {string} input string to casefold
   * @returns {string} A new string converted to lower case
   * @function
   */
    casefold: {
      _func: (args, data, interpreter) => {
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
     */
    not: {
      _func: resolveArgs => !valueOf(resolveArgs[0]),
      _signature: [{ types: [dataTypes.TYPE_ANY] }],
    },

    /**
     * Return constant boolean true value.
     * Note that expressions may also use the JSON literal true: `` `true` ``
     * @returns {boolean} True
     * @function
     */
    true: {
      _func: () => true,
      _signature: [],
    },

    /**
     * Return constant boolean false value.
     * Note that expressions may also use the JSON literal false: `` `false` ``
     * @returns {boolean} False
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
    lower: {
      _func: args => {
        const value = toString(args[0]);
        return value.toLowerCase();
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },
    upper: {
      _func: args => {
        const value = toString(args[0]);
        return value.toUpperCase();
      },
      _signature: [
        { types: [dataTypes.TYPE_STRING] },
      ],
    },
    exp: {
      _func: args => {
        const value = toNumber(args[0]);
        return Math.exp(value);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
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
        return Math.round(number * 10 ** digits) / 10 ** digits;
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
    date: {
      _func: args => {
        const year = toNumber(args[0]);
        const month = toNumber(args[1]);
        const day = toNumber(args[2]);
        // javascript months starts from 0
        const jsDate = Date.UTC(year, month - 1, day);
        return Math.floor(jsDate / 86400000);
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    day: {
      _func: args => {
        const date = toNumber(args[0]);
        const jsDate = new Date(date * 86400000);
        return jsDate.getUTCDate();
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    month: {
      _func: args => {
        const date = toNumber(args[0]);
        const jsDate = new Date(date * 86400000);
        // javascript months start from 0
        return jsDate.getUTCMonth() + 1;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    year: {
      _func: args => {
        const date = toNumber(args[0]);
        const jsDate = new Date(date * 86400000);
        return jsDate.getUTCFullYear();
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
        const time = toNumber(args[0]);
        if (time < 0) {
          return null;
        }
        const hour = (time * 86400) / 3600;
        return hour % 24;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    minute: {
      _func: args => {
        const time = toNumber(args[0]);
        if (time < 0) {
          return null;
        }
        const minute = (time * 1440);
        return minute % 60;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    second: {
      _func: args => {
        const time = toNumber(args[0]);
        if (time < 0) {
          return null;
        }
        const seconds = (time * 86400);
        return seconds % 60;
      },
      _signature: [
        { types: [dataTypes.TYPE_NUMBER] },
      ],
    },
    now: {
      _func: () => {
        const localDateTime = new Date();
        const year = localDateTime.getFullYear();
        const month = localDateTime.getMonth();
        const date = localDateTime.getDate();
        const hours = localDateTime.getHours();
        const minutes = localDateTime.getMinutes();
        const seconds = localDateTime.getSeconds();
        return Date.UTC(year, month, date, hours, minutes, seconds) / 86400000;
      },
      _signature: [],
    },
    today: {
      _func: () => {
        const localDateTime = new Date();
        const year = localDateTime.getFullYear();
        const month = localDateTime.getMonth();
        const date = localDateTime.getDate();
        return Math.floor(Date.UTC(year, month, date) / 86400000);
      },
      _signature: [],
    },
    weekday: {
      _func: args => {
        const date = toNumber(args[0]);
        const type = args.length > 1 ? toNumber(args[1]) : 1;
        const jsDate = new Date(date * 86400000);
        const day = jsDate.getUTCDay();
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
  };
}
