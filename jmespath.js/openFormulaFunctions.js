import dataTypes from './dataTypes';

export default {
  // SUBSTITUTE(Text T ; Text Old ; Text New [; Number Which ])
  substitute: {
    _func: args => {
      const src = args[0].toString();
      const old = args[1].toString();
      const replacement = args[2].toString();
      // no third parameter? replace all instances
      if (args.length <= 3) return src.replace(new RegExp(old, 'g'), replacement);
      const whch = args[3].valueOf();
      // find the instance to replace
      let pos = -1;
      for (let i = 0; i < whch; i += 1) {
        pos += 1;
        const nextFind = src.slice(pos).indexOf(old);
        // no instance to match 'Which'
        if (nextFind === -1) return src;
        pos += nextFind;
      }
      const result = src.slice(0, pos) + src.slice(pos).replace(old, replacement);
      return result;
    },
    _signature: [
      { types: [dataTypes.TYPE_STRING] },
      { types: [dataTypes.TYPE_STRING] },
      { types: [dataTypes.TYPE_STRING] },
      { types: [dataTypes.TYPE_NUMBER], optional: true },
    ],
  },
  value: {
    _func: args => {
      const obj = args[0] || {};
      const index = args[1];
      const result = obj[index];
      return result === undefined ? null : result;
    },
    _signature: [
      { types: [dataTypes.TYPE_OBJECT, dataTypes.TYPE_ARRAY, dataTypes.TYPE_NULL] },
      { types: [dataTypes.TYPE_STRING, dataTypes.TYPE_NUMBER] },
    ],
  },
  lower: {
    _func: args => {
      const value = args[0];
      return value.toLowerCase();
    },
    _signature: [
      { types: [dataTypes.TYPE_STRING] },
    ],
  },
  upper: {
    _func: args => {
      const value = args[0];
      return value.toUpperCase();
    },
    _signature: [
      { types: [dataTypes.TYPE_STRING] },
    ],
  },
  exp: {
    _func: args => {
      const value = args[0];
      return Math.exp(value);
    },
    _signature: [
      { types: [dataTypes.TYPE_NUMBER] },
    ],
  },
  power: {
    _func: args => {
      const base = args[0];
      const power = args[1];
      return base ** power;
    },
    _signature: [
      { types: [dataTypes.TYPE_NUMBER] },
      { types: [dataTypes.TYPE_NUMBER] },
    ],
  },
  find: {
    _func: args => {
      const text = args[0];
      const query = args[1];
      const startPos = args.length > 2 ? args[2] : 0;
      return text.indexOf(query, startPos);
    },
    _signature: [
      { types: [dataTypes.TYPE_STRING] },
      { types: [dataTypes.TYPE_STRING] },
      { types: [dataTypes.TYPE_NUMBER], optional: true },
    ],
  },
  left: {
    _func: args => {
      const text = args[0];
      const numChars = args.length > 1 ? args[1] : 1;
      if (numChars < 0) {
        return null;
      }
      return text.substr(0, numChars);
    },
    _signature: [
      { types: [dataTypes.TYPE_STRING] },
      { types: [dataTypes.TYPE_NUMBER], optional: true },
    ],
  },
  right: {
    _func: args => {
      const text = args[0];
      const numChars = args.length > 1 ? args[1] : 1;
      if (numChars < 0) {
        return null;
      }
      const start = text.length - numChars;
      return text.substr(start, numChars);
    },
    _signature: [
      { types: [dataTypes.TYPE_STRING] },
      { types: [dataTypes.TYPE_NUMBER], optional: true },
    ],
  },
  mid: {
    _func: args => {
      const text = args[0];
      const startPos = args[1];
      if (startPos < 0) {
        return null;
      }
      const numChars = args[2];
      return text.substr(startPos, numChars);
    },
    _signature: [
      { types: [dataTypes.TYPE_STRING] },
      { types: [dataTypes.TYPE_NUMBER] },
      { types: [dataTypes.TYPE_NUMBER] },
    ],
  },
  proper: {
    _func: args => {
      const text = args[0];
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
      const text = args[0];
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
  replace: {
    _func: args => {
      const oldText = args[0];
      const startNum = args[1];
      const numChars = args[2];
      const newText = args[3];
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
      const number = args[0];
      const digits = args[1];
      return Math.round(number * 10 ** digits) / 10 ** digits;
    },
    _signature: [
      { types: [dataTypes.TYPE_NUMBER] },
      { types: [dataTypes.TYPE_NUMBER] },
    ],
  },
  sqrt: {
    _func: args => {
      const result = Math.sqrt(args[0]);
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
      const values = args[0];
      if (values.length === 0) {
        return null;
      }
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const meanSumSquare = values.reduce((a, b) => a + b * b, 0) / values.length;
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
      const values = args[0];
      if (values.length <= 1) {
        return null;
      }
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const sumSquare = values.reduce((a, b) => a + b * b, 0);
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
      const text = args[0];
      // only removes the space character
      // other whitespace characters like \t \n left intact
      const trimmed = text.split(' ').filter(x => x).join(' ');
      return trimmed;
    },
    _signature: [
      { types: [dataTypes.TYPE_STRING] },
    ],
  },
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
  charCode: {
    _func: args => {
      const code = args[0];
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
      const text = args[0];
      if (text.length === 0) {
        return null;
      }
      return text.codePointAt(0);
    },
    _signature: [
      { types: [dataTypes.TYPE_STRING] },
    ],
  },
};
