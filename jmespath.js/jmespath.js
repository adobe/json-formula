/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import dataTypes from './dataTypes';
import openFormulaFunctions from './openFormulaFunctions';
import functions from './functions';

// Type constants used to define functions.
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
} = dataTypes;

function JsonFormula() {
  const TOK_EOF = 'EOF';
  const TOK_UNQUOTEDIDENTIFIER = 'UnquotedIdentifier';
  const TOK_QUOTEDIDENTIFIER = 'QuotedIdentifier';
  const TOK_RBRACKET = 'Rbracket';
  const TOK_RPAREN = 'Rparen';
  const TOK_COMMA = 'Comma';
  const TOK_COLON = 'Colon';
  const TOK_CONCATENATE = 'Concatenate';
  const TOK_RBRACE = 'Rbrace';
  const TOK_NUMBER = 'Number';
  const TOK_CURRENT = 'Current';
  const TOK_GLOBAL = 'Global';
  const TOK_FIELD = 'Field';
  const TOK_EXPREF = 'Expref';
  const TOK_PIPE = 'Pipe';
  const TOK_OR = 'Or';
  const TOK_AND = 'And';
  const TOK_ADD = 'Add';
  const TOK_SUBTRACT = 'Subtract';
  const TOK_MULTIPLY = 'Multiply';
  const TOK_POWER = 'Power';
  const TOK_DIVIDE = 'Divide';
  const TOK_EQ = 'EQ';
  const TOK_GT = 'GT';
  const TOK_LT = 'LT';
  const TOK_GTE = 'GTE';
  const TOK_LTE = 'LTE';
  const TOK_NE = 'NE';
  const TOK_FLATTEN = 'Flatten';
  const TOK_STAR = 'Star';
  const TOK_FILTER = 'Filter';
  const TOK_DOT = 'Dot';
  const TOK_NOT = 'Not';
  const TOK_LBRACE = 'Lbrace';
  const TOK_LBRACKET = 'Lbracket';
  const TOK_LPAREN = 'Lparen';
  const TOK_LITERAL = 'Literal';

  const TYPE_NAME_TABLE = {
    0: 'number',
    1: 'any',
    2: 'string',
    3: 'array',
    4: 'object',
    5: 'boolean',
    6: 'expression',
    7: 'null',
    8: 'Array<number>',
    9: 'Array<string>',
  };

  let globalTokens = {};
  let stringToNumber = null;

  function isNum(ch, includeSign) {
    return (ch >= '0' && ch <= '9')
             || (includeSign && ch === '-')
             || (ch === '.');
  }

  function isAlphaNum(ch) {
    return (ch >= 'a' && ch <= 'z')
             || (ch >= 'A' && ch <= 'Z')
             || (ch >= '0' && ch <= '9')
             || ch === '_';
  }

  function isOperator(tok) {
    return [
      TOK_CONCATENATE,
      TOK_OR,
      TOK_AND,
      TOK_ADD,
      TOK_SUBTRACT,
      TOK_MULTIPLY,
      TOK_POWER,
      TOK_DIVIDE,
      TOK_EQ,
      TOK_GT,
      TOK_LT,
      TOK_GTE,
      TOK_LTE,
      TOK_NE].includes(tok);
  }
  function isArray(obj) {
    if (obj !== null) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }
    return false;
  }

  function valueOf(a) {
    if (a === null || a === undefined) return a;
    if (isArray(a)) {
      return a.map(i => valueOf(i));
    }
    return a.valueOf();
  }

  function toString(a) {
    if (a === null || a === undefined) return '';
    return a.toString();
  }

  function isObject(obj) {
    if (obj !== null) {
      return Object.prototype.toString.call(obj) === '[object Object]';
    }
    return false;
  }
  function isClass(obj) {
    if (obj === null) return false;
    if (Array.isArray(obj)) return false;
    return typeof obj === 'object' && obj.constructor.name !== 'Object';
  }

  function matchClass(arg, expectedList) {
    return isClass(arg) && expectedList.includes(TYPE_CLASS);
  }

  function getTypeName(inputObj, useValueOf = true) {
    if (inputObj === null) return TYPE_NULL;
    const obj = useValueOf ? inputObj.valueOf() : inputObj;
    switch (Object.prototype.toString.call(obj)) {
      case '[object String]':
        return TYPE_STRING;
      case '[object Number]':
        return TYPE_NUMBER;
      case '[object Array]':
        return TYPE_ARRAY;
      case '[object Boolean]':
        return TYPE_BOOLEAN;
      case '[object Null]':
        return TYPE_NULL;
      case '[object Object]':
        // Check if it's an expref.  If it has, it's been
        // tagged with a jmespathType attr of 'Expref';
        if (obj.jmespathType === TOK_EXPREF) {
          return TYPE_EXPREF;
        }
        return TYPE_OBJECT;
      default:
        return TYPE_OBJECT;
    }
  }

  function getTypeNames(inputObj) {
    // return the types with and without using valueOf
    // needed for the cases where we really need an object passed to a function -- not it's value
    const type1 = getTypeName(inputObj);
    const type2 = getTypeName(inputObj, false);
    return [type1, type2];
  }

  function strictDeepEqual(lhs, rhs) {
    const first = valueOf(lhs);
    const second = valueOf(rhs);
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
      if (first.length !== second.length) {
        return false;
      }
      for (let i = 0; i < first.length; i += 1) {
        if (strictDeepEqual(first[i], second[i]) === false) {
          return false;
        }
      }
      return true;
    }
    if (isObject(first) === true) {
      // An object is equal if it has the same key/value pairs.
      const keysSeen = {};
      for (const key in first) {
        if (hasOwnProperty.call(first, key)) {
          if (strictDeepEqual(first[key], second[key]) === false) {
            return false;
          }
          keysSeen[key] = true;
        }
      }
      // Now check that there aren't any keys in second that weren't
      // in first.
      for (const key2 in second) {
        if (hasOwnProperty.call(second, key2)) {
          if (keysSeen[key2] !== true) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  function isFalse(value) {
    // From the spec:
    // A false value corresponds to the following values:
    // Empty list
    // Empty object
    // Empty string
    // False boolean
    // null value
    // (new) use JS truthy evaluation.  This changes the spec behavior.
    // Where in the past a zero (0) would be True, it's now false

    // First check the scalar values.
    if (value === null) return true;
    // in case it's an object with a valueOf defined
    const obj = valueOf(value);
    if (obj === '' || obj === false || obj === null) {
      return true;
    }
    if (isArray(obj) && obj.length === 0) {
      // Check for an empty array.
      return true;
    }
    if (isObject(obj)) {
      // Check for an empty object.
      for (const key in obj) {
        // If there are any keys, then
        // the object is not empty so the object
        // is not false.
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          return false;
        }
      }
      return true;
    }
    return !obj;
  }

  function objValues(obj) {
    const keys = Object.keys(obj);
    const values = [];
    for (let i = 0; i < keys.length; i += 1) {
      values.push(obj[keys[i]]);
    }
    return values;
  }

  function toNumber(value) {
    const n = valueOf(value); // in case it's an object that implements valueOf()
    if (n === null) return null;
    if (n instanceof Array) return 0;
    if (typeof n === 'number') return n;
    if (typeof n === 'string') {
      const temp = stringToNumber(n);
      return Number.isNaN(temp) ? 0 : temp;
    }
    if (typeof n === 'boolean') return n ? 1 : 0;

    // more coercions needed...
    throw new Error('need to coerce number');
  }

  function applyOperator(first, second, operator) {
    // TODO: fill in remaining operators
    if (isArray(first) && isArray(second)) {
      const len = Math.min(first.length, second.length);
      const result = [];
      let i;
      for (i = 0; i < len; i += 1) {
        if (isArray(first[i]) || isArray(second[i])) {
          result.push(applyOperator(first[i], second[i], operator));
        } else if (operator === '*') {
          result.push(first[i] * second[i]);
        } else if (operator === '&') {
          result.push(first[i] + second[i]);
        } else throw new Error('unimplemented');
      }
      for (i = len; i < Math.max(first.length, second.length); i += 1) {
        // Result of the operator applied with 'null'
        if (operator === '&') result.push('');
        else if (operator === '*') result.push(0);
      }
      return result;
    }

    if (isArray(first) || isArray(second)) {
      const [arr, scalar] = isArray(first) ? [first, second] : [second, first];
      if (operator === '*') return arr.map(a => toNumber(a) * toNumber(scalar));
      if (operator === '&') return arr.map(a => a + scalar);
    }
    if (operator === '*') return toNumber(first) * toNumber(second);
    if (operator === '&') return first + second;
    throw new Error(`unimplemented array operator: ${operator}`);
  }
  function matchType(actuals, expectedList, argValue, context) {
    const actual = actuals[0];
    if (expectedList.findIndex(
      type => type === TYPE_ANY || actual === type,
    ) !== -1
    ) return argValue;
    // Can't coerce Objects to any other type
    if (actual === TYPE_OBJECT) {
      throw new Error(`TypeError: ${context} expected argument to be type ${TYPE_NAME_TABLE[expectedList[0]]} but received type ${TYPE_NAME_TABLE[actual]} instead.`);
    }
    // no exact match in the list of possible types, see if we can coerce an array type
    let expected = -1;
    if (actual === TYPE_ARRAY) {
      if (expectedList.includes(TYPE_ARRAY_STRING) && expectedList.includes(TYPE_ARRAY_NUMBER)) {
        // choose the array type based on the first element
        if (argValue.length > 0 && typeof argValue[0] === 'string') expected = TYPE_ARRAY_STRING;
        else expected = TYPE_ARRAY_NUMBER;
      }
    }
    if (expected === -1 && [TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER, TYPE_ARRAY].includes(actual)) {
      expected = expectedList.find(
        e => [TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER, TYPE_ARRAY].includes(e),
      );
    }
    // no match, just take the first type
    if (expected === -1) [expected] = expectedList;
    if (expected === TYPE_ANY) return argValue;
    if (expected === TYPE_ARRAY_STRING
        || expected === TYPE_ARRAY_NUMBER
        || expected === TYPE_ARRAY) {
      if (expected === TYPE_ARRAY) {
        if (actual === TYPE_ARRAY_NUMBER || actual === TYPE_ARRAY_STRING) return argValue;
        return argValue === null ? [] : [argValue];
      }
      // The expected type can either just be array,
      // or it can require a specific subtype (array of numbers).
      const subtype = expected === TYPE_ARRAY_NUMBER ? TYPE_NUMBER : TYPE_STRING;
      if (actual === TYPE_ARRAY) {
        // Otherwise we need to check subtypes.
        // We're going to modify the array, so take a copy
        const returnArray = argValue.slice();
        for (let i = 0; i < returnArray.length; i += 1) {
          const indexType = getTypeNames(returnArray[i]);
          returnArray[i] = matchType(indexType, [subtype], returnArray[i], context);
        }
        return returnArray;
      }
      if ([TYPE_NUMBER, TYPE_STRING, TYPE_NULL, TYPE_BOOLEAN].includes(subtype)) {
        return [matchType(actuals, [subtype], argValue, context)];
      }
    } else {
      if (expected === TYPE_NUMBER) {
        if ([TYPE_STRING, TYPE_BOOLEAN, TYPE_NULL].includes(actual)) return toNumber(argValue);
        /* TYPE_ARRAY, TYPE_EXPREF, TYPE_OBJECT, TYPE_ARRAY, TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING */
        return 0;
      }
      if (expected === TYPE_STRING) {
        if (actual === TYPE_NULL || actual === TYPE_OBJECT) return '';
        return argValue.toString();
      }
      if (expected === TYPE_BOOLEAN) {
        return !!argValue;
      }
      if (expected === TYPE_OBJECT && actuals[1] === TYPE_OBJECT) {
        return argValue;
      }
    }
    throw new Error('unhandled argument');
  }

  let trimLeft;
  if (typeof String.prototype.trimLeft === 'function') {
    trimLeft = str => str.trimLeft();
  } else {
    trimLeft = str => str.match(/^\s*(.*)/)[1];
  }

  // The "&", "[", "<", ">" tokens
  // are not in basicToken because
  // there are two token variants
  // ("&&", "[?", "<=", ">=").  This is specially handled
  // below.

  const basicTokens = {
    '.': TOK_DOT,
    // "*": TOK_STAR,
    ',': TOK_COMMA,
    ':': TOK_COLON,
    '{': TOK_LBRACE,
    '}': TOK_RBRACE,
    ']': TOK_RBRACKET,
    '(': TOK_LPAREN,
    ')': TOK_RPAREN,
    '@': TOK_CURRENT,
  };

  const globalStartToken = '$';
  const operatorStartToken = {
    '<': true,
    '>': true,
    '=': true,
    '!': true,
  };

  const skipChars = {
    ' ': true,
    '\t': true,
    '\n': true,
  };

  function isIdentifier(stream, pos) {
    const ch = stream[pos];
    // $ is special -- it's allowed to be part of an identifier if it's the first character
    if (ch === '$') {
      return stream.length > pos && isAlphaNum(stream[pos + 1]);
    }
    // return whether character 'isAlpha'
    return (ch >= 'a' && ch <= 'z')
            || (ch >= 'A' && ch <= 'Z')
            || ch === '_';
  }

  function isGlobal(prev, stream, pos) {
    // global tokens occur only at the start of an expression
    if (prev !== null && prev === TOK_DOT) return false;
    const ch = stream[pos];
    if (ch !== globalStartToken) return false;
    // $ is special -- it's allowed to be part of an identifier if it's the first character
    let i = pos + 1;
    while (i < stream.length && isAlphaNum(stream[i])) i += 1;
    const global = stream.slice(pos, i);
    return !!globalTokens[global];
  }

  function Lexer() {
  }
  Lexer.prototype = {
    tokenize(stream) {
      const tokens = [];
      this._current = 0;
      let start;
      let identifier;
      let token;
      while (this._current < stream.length) {
        const prev = tokens.length ? tokens.slice(-1)[0].type : null;

        if (isGlobal(prev, stream, this._current)) {
          tokens.push(this._consumeGlobal(stream));
        } else if (isIdentifier(stream, this._current)) {
          start = this._current;
          identifier = this._consumeUnquotedIdentifier(stream);
          tokens.push({
            type: TOK_UNQUOTEDIDENTIFIER,
            value: identifier,
            start,
          });
        } else if (basicTokens[stream[this._current]] !== undefined) {
          tokens.push({
            type: basicTokens[stream[this._current]],
            value: stream[this._current],
            start: this._current,
          });
          this._current += 1;
        } else if ((stream[this._current] === '-' && ![TOK_NUMBER, TOK_RPAREN, TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER].includes(prev)) || isNum(stream[this._current], false)) {
          token = this._consumeNumber(stream);
          tokens.push(token);
        } else if (stream[this._current] === '[') {
          // No need to increment this._current.  This happens
          // in _consumeLBracket
          token = this._consumeLBracket(stream);
          tokens.push(token);
        } else if (stream[this._current] === '"') {
          start = this._current;
          identifier = this._consumeQuotedIdentifier(stream);
          tokens.push({
            type: TOK_QUOTEDIDENTIFIER,
            value: identifier,
            start,
          });
        } else if (stream[this._current] === "'") {
          start = this._current;
          identifier = this._consumeRawStringLiteral(stream);
          tokens.push({
            type: TOK_LITERAL,
            value: identifier,
            start,
          });
        } else if (stream[this._current] === '`') {
          start = this._current;
          const literal = this._consumeLiteral(stream);
          tokens.push({
            type: TOK_LITERAL,
            value: literal,
            start,
          });
        } else if (operatorStartToken[stream[this._current]] !== undefined) {
          tokens.push(this._consumeOperator(stream));
        } else if (skipChars[stream[this._current]] !== undefined) {
          // Ignore whitespace.
          this._current += 1;
        } else if (stream[this._current] === '&') {
          start = this._current;
          this._current += 1;
          if (stream[this._current] === '&') {
            this._current += 1;
            tokens.push({ type: TOK_AND, value: '&&', start });
          } else if (prev === TOK_COMMA || prev === TOK_LPAREN) {
            // based on previous token we'll know if this & is a JMESPath expression-type
            // or if it's a concatenation operator
            // if we're a function arg then it's an expression-type
            tokens.push({ type: TOK_EXPREF, value: '&', start });
          } else {
            tokens.push({ type: TOK_CONCATENATE, value: '&', start });
          }
        } else if (stream[this._current] === '+') {
          start = this._current;
          this._current += 1;
          tokens.push({ type: TOK_ADD, value: '+', start });
        } else if (stream[this._current] === '-') {
          start = this._current;
          this._current += 1;
          tokens.push({ type: TOK_SUBTRACT, value: '-', start });
        } else if (stream[this._current] === '*') {
          start = this._current;
          this._current += 1;
          // based on previous token we'll know if this asterix is a star -- not a multiply
          // might be better to list the prev tokens that are valid for multiply?
          const prevToken = tokens.length && tokens.slice(-1)[0].type;
          if (tokens.length === 0 || [
            TOK_LBRACKET,
            TOK_DOT,
            TOK_PIPE,
            TOK_AND,
            TOK_OR,
            TOK_COMMA,
            TOK_COLON,
          ].includes(prevToken)) {
            tokens.push({ type: TOK_STAR, value: '*', start });
          } else {
            tokens.push({ type: TOK_MULTIPLY, value: '*', start });
          }
        } else if (stream[this._current] === '/') {
          start = this._current;
          this._current += 1;
          tokens.push({ type: TOK_DIVIDE, value: '/', start });
        } else if (stream[this._current] === '^') {
          start = this._current;
          this._current += 1;
          tokens.push({ type: TOK_POWER, value: '^', start });
        } else if (stream[this._current] === '|') {
          start = this._current;
          this._current += 1;
          if (stream[this._current] === '|') {
            this._current += 1;
            tokens.push({ type: TOK_OR, value: '||', start });
          } else {
            tokens.push({ type: TOK_PIPE, value: '|', start });
          }
        } else {
          const error = new Error(`Unknown character:${stream[this._current]}`);
          error.name = 'LexerError';
          throw error;
        }
      }
      return tokens;
    },

    _consumeUnquotedIdentifier(stream) {
      const start = this._current;
      this._current += 1;
      while (this._current < stream.length && isAlphaNum(stream[this._current])) {
        this._current += 1;
      }
      return stream.slice(start, this._current);
    },

    _consumeQuotedIdentifier(stream) {
      const start = this._current;
      this._current += 1;
      const maxLength = stream.length;
      while (stream[this._current] !== '"' && this._current < maxLength) {
        // You can escape a double quote and you can escape an escape.
        let current = this._current;
        if (stream[current] === '\\' && (stream[current + 1] === '\\'
                                               || stream[current + 1] === '"')) {
          current += 2;
        } else {
          current += 1;
        }
        this._current = current;
      }
      this._current += 1;
      return JSON.parse(stream.slice(start, this._current));
    },

    _consumeRawStringLiteral(stream) {
      const start = this._current;
      this._current += 1;
      const maxLength = stream.length;
      while (stream[this._current] !== "'" && this._current < maxLength) {
        // You can escape a single quote and you can escape an escape.
        let current = this._current;
        if (stream[current] === '\\' && (stream[current + 1] === '\\'
                                               || stream[current + 1] === "'")) {
          current += 2;
        } else {
          current += 1;
        }
        this._current = current;
      }
      this._current += 1;
      const literal = stream.slice(start + 1, this._current - 1);
      return literal.replace("\\'", "'");
    },

    _consumeNumber(stream) {
      const start = this._current;
      this._current += 1;
      const maxLength = stream.length;
      while (isNum(stream[this._current], false) && this._current < maxLength) {
        this._current += 1;
      }
      const n = stream.slice(start, this._current);
      let value;
      if (n.includes('.')) {
        value = parseFloat(n);
      } else {
        value = parseInt(n, 10);
      }
      return { type: TOK_NUMBER, value, start };
    },

    _consumeLBracket(stream) {
      const start = this._current;
      this._current += 1;
      if (stream[this._current] === '?') {
        this._current += 1;
        return { type: TOK_FILTER, value: '[?', start };
      }
      if (stream[this._current] === ']') {
        this._current += 1;
        return { type: TOK_FLATTEN, value: '[]', start };
      }
      return { type: TOK_LBRACKET, value: '[', start };
    },

    _consumeGlobal(stream) {
      const start = this._current;
      this._current += 1;
      while (this._current < stream.length && isAlphaNum(stream[this._current])) this._current += 1;
      const global = stream.slice(start, this._current);

      return { type: TOK_GLOBAL, value: globalTokens[global], start };
    },

    _consumeOperator(stream) {
      const start = this._current;
      const startingChar = stream[start];
      this._current += 1;
      if (startingChar === '!') {
        if (stream[this._current] === '=') {
          this._current += 1;
          return { type: TOK_NE, value: '!=', start };
        }
        return { type: TOK_NOT, value: '!', start };
      }
      if (startingChar === '<') {
        if (stream[this._current] === '=') {
          this._current += 1;
          return { type: TOK_LTE, value: '<=', start };
        }
        return { type: TOK_LT, value: '<', start };
      }
      if (startingChar === '>') {
        if (stream[this._current] === '=') {
          this._current += 1;
          return { type: TOK_GTE, value: '>=', start };
        }
        return { type: TOK_GT, value: '>', start };
      }
      // startingChar is '='
      if (stream[this._current] === '=') {
        this._current += 1;
        return { type: TOK_EQ, value: '==', start };
      }
      return { type: TOK_EQ, value: '=', start };
    },

    _consumeLiteral(stream) {
      this._current += 1;
      const start = this._current;
      const maxLength = stream.length;
      let literal;
      while (stream[this._current] !== '`' && this._current < maxLength) {
        // You can escape a literal char or you can escape the escape.
        let current = this._current;
        if (stream[current] === '\\' && (stream[current + 1] === '\\'
                                               || stream[current + 1] === '`')) {
          current += 2;
        } else {
          current += 1;
        }
        this._current = current;
      }
      let literalString = trimLeft(stream.slice(start, this._current));
      literalString = literalString.replace('\\`', '`');
      if (this._looksLikeJSON(literalString)) {
        literal = JSON.parse(literalString);
      } else {
        // Try to JSON parse it as "<literal>"
        literal = JSON.parse(`"${literalString}"`);
      }
      // +1 gets us to the ending "`", +1 to move on to the next char.
      this._current += 1;
      return literal;
    },

    _looksLikeJSON(literalString) {
      const startingChars = '[{"';
      const jsonLiterals = ['true', 'false', 'null'];
      const numberLooking = '-0123456789';

      if (literalString === '') {
        return false;
      }
      if (startingChars.indexOf(literalString[0]) >= 0) {
        return true;
      }
      if (jsonLiterals.indexOf(literalString) >= 0) {
        return true;
      }
      if (numberLooking.indexOf(literalString[0]) >= 0) {
        try {
          JSON.parse(literalString);
          return true;
        } catch (ex) {
          return false;
        }
      } else {
        return false;
      }
    },
  };

  const bindingPower = {};
  bindingPower[TOK_EOF] = 0;
  bindingPower[TOK_UNQUOTEDIDENTIFIER] = 0;
  bindingPower[TOK_QUOTEDIDENTIFIER] = 0;
  bindingPower[TOK_RBRACKET] = 0;
  bindingPower[TOK_RPAREN] = 0;
  bindingPower[TOK_COMMA] = 0;
  bindingPower[TOK_RBRACE] = 0;
  bindingPower[TOK_NUMBER] = 0;
  bindingPower[TOK_CURRENT] = 0;
  bindingPower[TOK_GLOBAL] = 0;
  bindingPower[TOK_FIELD] = 0;
  bindingPower[TOK_EXPREF] = 0;
  bindingPower[TOK_PIPE] = 1;
  bindingPower[TOK_OR] = 2;
  bindingPower[TOK_AND] = 3;
  bindingPower[TOK_ADD] = 6;
  bindingPower[TOK_SUBTRACT] = 6;
  bindingPower[TOK_CONCATENATE] = 7;
  bindingPower[TOK_MULTIPLY] = 7;
  bindingPower[TOK_DIVIDE] = 7;
  bindingPower[TOK_POWER] = 7;
  bindingPower[TOK_EQ] = 5;
  bindingPower[TOK_GT] = 5;
  bindingPower[TOK_LT] = 5;
  bindingPower[TOK_GTE] = 5;
  bindingPower[TOK_LTE] = 5;
  bindingPower[TOK_NE] = 5;
  bindingPower[TOK_FLATTEN] = 9;
  bindingPower[TOK_STAR] = 20;
  bindingPower[TOK_FILTER] = 21;
  bindingPower[TOK_DOT] = 40;
  bindingPower[TOK_NOT] = 45;
  bindingPower[TOK_LBRACE] = 50;
  bindingPower[TOK_LBRACKET] = 55;
  bindingPower[TOK_LPAREN] = 60;

  function Parser() {
  }

  Parser.prototype = {
    parse(expression) {
      this._loadTokens(expression);
      this.index = 0;
      const ast = this.expression(0);
      if (this._lookahead(0) !== TOK_EOF) {
        const t = this._lookaheadToken(0);
        const error = new Error(
          `Unexpected token type: ${t.type}, value: ${t.value}`,
        );
        error.name = 'ParserError';
        throw error;
      }
      return ast;
    },

    _loadTokens(expression) {
      const lexer = new Lexer();
      const tokens = lexer.tokenize(expression);
      tokens.push({ type: TOK_EOF, value: '', start: expression.length });
      this.tokens = tokens;
    },

    expression(rbp) {
      const leftToken = this._lookaheadToken(0);
      this._advance();
      let left = this.nud(leftToken);
      let currentToken = this._lookahead(0);
      while (rbp < bindingPower[currentToken]) {
        this._advance();
        left = this.led(currentToken, left);
        currentToken = this._lookahead(0);
      }
      return left;
    },

    _lookahead(number) {
      return this.tokens[this.index + number].type;
    },

    _lookaheadToken(number) {
      return this.tokens[this.index + number];
    },

    _advance() {
      this.index += 1;
    },

    // eslint-disable-next-line consistent-return
    nud(token) {
      let left;
      let right;
      let expression;
      let node;
      let args;
      switch (token.type) {
        case TOK_LITERAL:
          return { type: 'Literal', value: token.value };
        case TOK_NUMBER:
          return { type: 'Number', value: token.value };
        case TOK_UNQUOTEDIDENTIFIER:
          return { type: 'Field', name: token.value };
        case TOK_QUOTEDIDENTIFIER:
          node = { type: 'Field', name: token.value };
          if (this._lookahead(0) === TOK_LPAREN) {
            throw new Error('Quoted identifier not allowed for function names.');
          }
          return node;
        case TOK_NOT:
          right = this.expression(bindingPower.Not);
          return { type: 'NotExpression', children: [right] };
        case TOK_STAR:
          left = { type: 'Identity' };
          if (this._lookahead(0) === TOK_RBRACKET) {
            // This can happen in a multiselect,
            // [a, b, *]
            right = { type: 'Identity' };
          } else {
            right = this._parseProjectionRHS(bindingPower.Star);
          }
          return { type: 'ValueProjection', children: [left, right] };
        case TOK_FILTER:
          return this.led(token.type, { type: 'Identity' });
        case TOK_LBRACE:
          return this._parseMultiselectHash();
        case TOK_FLATTEN:
          left = { type: TOK_FLATTEN, children: [{ type: 'Identity' }] };
          right = this._parseProjectionRHS(bindingPower.Flatten);
          return { type: 'Projection', children: [left, right] };
        case TOK_LBRACKET:
          // seeing a comma means that we are not a projection -- assume a list
          // but the cases of [0] and [] are still ambiguous
          // the better solution is to force us down the index expression path
          // after pipe and after identifier
          if (this._lookahead(1) === TOK_COMMA || isOperator(this._lookahead(1))) {
            return this._parseMultiselectList();
          }
          if (this._lookahead(0) === TOK_NUMBER || this._lookahead(0) === TOK_COLON) {
            right = this._parseIndexExpression();
            return this._projectIfSlice({ type: 'Identity' }, right);
          }
          if (this._lookahead(0) === TOK_STAR
                       && this._lookahead(1) === TOK_RBRACKET) {
            this._advance();
            this._advance();
            right = this._parseProjectionRHS(bindingPower.Star);
            return {
              type: 'Projection',
              children: [{ type: 'Identity' }, right],
            };
          }
          return this._parseMultiselectList();
        case TOK_CURRENT:
          return { type: TOK_CURRENT };
        case TOK_GLOBAL:
          return { type: TOK_GLOBAL, value: token.value };
        case TOK_FIELD:
          return { type: TOK_FIELD };
        case TOK_EXPREF:
          expression = this.expression(bindingPower.Expref);
          return { type: 'ExpressionReference', children: [expression] };
        case TOK_LPAREN:
          args = [];
          while (this._lookahead(0) !== TOK_RPAREN) {
            if (this._lookahead(0) === TOK_CURRENT) {
              expression = { type: TOK_CURRENT };
              this._advance();
            } else {
              expression = this.expression(0);
            }
            args.push(expression);
          }
          this._match(TOK_RPAREN);
          return args[0];
        default:
          this._errorToken(token);
      }
    },

    // eslint-disable-next-line consistent-return
    led(tokenName, left) {
      let condition;
      let right;
      let name;
      let args;
      let expression;
      let node;
      let rbp;
      let leftNode;
      let rightNode;
      let token;
      switch (tokenName) {
        case TOK_CONCATENATE:
          right = this.expression(bindingPower.Concatenate);
          return { type: 'ConcatenateExpression', children: [left, right] };
        case TOK_DOT:
          rbp = bindingPower.Dot;
          if (this._lookahead(0) !== TOK_STAR) {
            right = this._parseDotRHS(rbp);
            return { type: 'Subexpression', children: [left, right] };
          }
          // Creating a projection.
          this._advance();
          right = this._parseProjectionRHS(rbp);
          return { type: 'ValueProjection', children: [left, right] };
        case TOK_PIPE:
          right = this.expression(bindingPower.Pipe);
          return { type: TOK_PIPE, children: [left, right] };
        case TOK_OR:
          right = this.expression(bindingPower.Or);
          return { type: 'OrExpression', children: [left, right] };
        case TOK_AND:
          right = this.expression(bindingPower.And);
          return { type: 'AndExpression', children: [left, right] };
        case TOK_ADD:
          right = this.expression(bindingPower.Add);
          return { type: 'AddExpression', children: [left, right] };
        case TOK_SUBTRACT:
          right = this.expression(bindingPower.Subtract);
          return { type: 'SubtractExpression', children: [left, right] };
        case TOK_MULTIPLY:
          right = this.expression(bindingPower.Multiply);
          return { type: 'MultiplyExpression', children: [left, right] };
        case TOK_DIVIDE:
          right = this.expression(bindingPower.Divide);
          return { type: 'DivideExpression', children: [left, right] };
        case TOK_POWER:
          right = this.expression(bindingPower.Power);
          return { type: 'PowerExpression', children: [left, right] };
        case TOK_LPAREN:
          name = left.name;
          args = [];
          while (this._lookahead(0) !== TOK_RPAREN) {
            if (this._lookahead(0) === TOK_CURRENT) {
              expression = { type: TOK_CURRENT };
              this._advance();
            } else {
              expression = this.expression(0);
            }
            if (this._lookahead(0) === TOK_COMMA) {
              this._match(TOK_COMMA);
            }
            args.push(expression);
          }
          this._match(TOK_RPAREN);
          node = { type: 'Function', name, children: args };
          return node;
        case TOK_FILTER:
          condition = this.expression(0);
          this._match(TOK_RBRACKET);
          if (this._lookahead(0) === TOK_FLATTEN) {
            right = { type: 'Identity' };
          } else {
            right = this._parseProjectionRHS(bindingPower.Filter);
          }
          return { type: 'FilterProjection', children: [left, right, condition] };
        case TOK_FLATTEN:
          leftNode = { type: TOK_FLATTEN, children: [left] };
          rightNode = this._parseProjectionRHS(bindingPower.Flatten);
          return { type: 'Projection', children: [leftNode, rightNode] };
        case TOK_EQ:
        case TOK_NE:
        case TOK_GT:
        case TOK_GTE:
        case TOK_LT:
        case TOK_LTE:
          return this._parseComparator(left, tokenName);
        case TOK_LBRACKET:
          token = this._lookaheadToken(0);
          if (token.type === TOK_NUMBER || token.type === TOK_COLON) {
            right = this._parseIndexExpression();
            return this._projectIfSlice(left, right);
          }
          this._match(TOK_STAR);
          this._match(TOK_RBRACKET);
          right = this._parseProjectionRHS(bindingPower.Star);
          return { type: 'Projection', children: [left, right] };
        default:
          this._errorToken(this._lookaheadToken(0));
      }
    },

    _match(tokenType) {
      if (this._lookahead(0) === tokenType) {
        this._advance();
      } else {
        const t = this._lookaheadToken(0);
        const error = new Error(`Expected ${tokenType}, got: ${t.type}`);
        error.name = 'ParserError';
        throw error;
      }
    },

    _errorToken(token) {
      const error = new Error(`Invalid token (${
        token.type}): "${
        token.value}"`);
      error.name = 'ParserError';
      throw error;
    },

    _parseIndexExpression() {
      if (this._lookahead(0) === TOK_COLON || this._lookahead(1) === TOK_COLON) {
        return this._parseSliceExpression();
      }
      const node = {
        type: 'Index',
        value: this._lookaheadToken(0).value,
      };
      this._advance();
      this._match(TOK_RBRACKET);
      return node;
    },

    _projectIfSlice(left, right) {
      const indexExpr = { type: 'IndexExpression', children: [left, right] };
      if (right.type === 'Slice') {
        return {
          type: 'Projection',
          children: [indexExpr, this._parseProjectionRHS(bindingPower.Star)],
        };
      }
      return indexExpr;
    },

    _parseSliceExpression() {
      // [start:end:step] where each part is optional, as well as the last
      // colon.
      const parts = [null, null, null];
      let index = 0;
      let currentToken = this._lookahead(0);
      while (currentToken !== TOK_RBRACKET && index < 3) {
        if (currentToken === TOK_COLON) {
          index += 1;
          this._advance();
        } else if (currentToken === TOK_NUMBER) {
          parts[index] = this._lookaheadToken(0).value;
          this._advance();
        } else {
          const t = this._lookahead(0);
          const error = new Error(`Syntax error, unexpected token: ${
            t.value}(${t.type})`);
          error.name = 'Parsererror';
          throw error;
        }
        currentToken = this._lookahead(0);
      }
      this._match(TOK_RBRACKET);
      return {
        type: 'Slice',
        children: parts,
      };
    },

    _parseComparator(left, comparator) {
      const right = this.expression(bindingPower[comparator]);
      return { type: 'Comparator', name: comparator, children: [left, right] };
    },

    // eslint-disable-next-line consistent-return
    _parseDotRHS(rbp) {
      const lookahead = this._lookahead(0);
      const exprTokens = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER, TOK_STAR];
      if (exprTokens.indexOf(lookahead) >= 0) {
        return this.expression(rbp);
      }
      if (lookahead === TOK_LBRACKET) {
        this._match(TOK_LBRACKET);
        return this._parseMultiselectList();
      }
      if (lookahead === TOK_LBRACE) {
        this._match(TOK_LBRACE);
        return this._parseMultiselectHash();
      }
    },

    _parseProjectionRHS(rbp) {
      let right;
      if (bindingPower[this._lookahead(0)] < 10) {
        right = { type: 'Identity' };
      } else if (this._lookahead(0) === TOK_LBRACKET) {
        right = this.expression(rbp);
      } else if (this._lookahead(0) === TOK_FILTER) {
        right = this.expression(rbp);
      } else if (this._lookahead(0) === TOK_DOT) {
        this._match(TOK_DOT);
        right = this._parseDotRHS(rbp);
      } else {
        const t = this._lookaheadToken(0);
        const error = new Error(`Sytanx error, unexpected token: ${
          t.value}(${t.type})`);
        error.name = 'ParserError';
        throw error;
      }
      return right;
    },

    _parseMultiselectList() {
      const expressions = [];
      while (this._lookahead(0) !== TOK_RBRACKET) {
        const expression = this.expression(0);
        expressions.push(expression);
        if (this._lookahead(0) === TOK_COMMA) {
          this._match(TOK_COMMA);
          if (this._lookahead(0) === TOK_RBRACKET) {
            throw new Error('Unexpected token Rbracket');
          }
        }
      }
      this._match(TOK_RBRACKET);
      return { type: 'MultiSelectList', children: expressions };
    },

    _parseMultiselectHash() {
      const pairs = [];
      const identifierTypes = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER];
      let keyToken; let keyName; let value; let
        node;
      for (;;) {
        keyToken = this._lookaheadToken(0);
        if (identifierTypes.indexOf(keyToken.type) < 0) {
          throw new Error(`Expecting an identifier token, got: ${
            keyToken.type}`);
        }
        keyName = keyToken.value;
        this._advance();
        this._match(TOK_COLON);
        value = this.expression(0);
        node = { type: 'KeyValuePair', name: keyName, value };
        pairs.push(node);
        if (this._lookahead(0) === TOK_COMMA) {
          this._match(TOK_COMMA);
        } else if (this._lookahead(0) === TOK_RBRACE) {
          this._match(TOK_RBRACE);
          break;
        }
      }
      return { type: 'MultiSelectHash', children: pairs };
    },
  };

  function TreeInterpreter(runtime) {
    this.runtime = runtime;
  }

  TreeInterpreter.prototype = {
    search(node, value) {
      return this.visit(node, value);
    },

    visit(node, value) {
      let matched;
      let current;
      let result;
      let first;
      let second;
      let field;
      let left;
      let right;
      let collected;
      let i;
      let child;
      let base;
      let index;
      let sliceParams;
      let computed;
      let start;
      let stop;
      let step;
      let values;
      let filtered;
      let finalResults;
      let original;
      let merged;
      let resolvedArgs;
      let refNode;

      switch (node.type) {
        case 'Field':
          if (value !== null && isObject(value)) {
            field = value[node.name];
            if (field === undefined) {
              return null;
            }
            return field;
          }
          return null;
        case 'Subexpression':
          result = this.visit(node.children[0], value);
          for (i = 1; i < node.children.length; i += 1) {
            result = this.visit(node.children[1], result);
            if (result === null) {
              return null;
            }
          }
          return result;
        case 'IndexExpression':
          left = this.visit(node.children[0], value);
          right = this.visit(node.children[1], left);
          return right;
        case 'Index':
          if (!isArray(value)) {
            return null;
          }
          index = node.value;
          if (index < 0) {
            index = value.length + index;
          }
          result = value[index];
          if (result === undefined) {
            result = null;
          }
          return result;
        case 'Slice':
          if (!isArray(value)) {
            return null;
          }
          sliceParams = node.children.slice(0);
          computed = this.computeSliceParams(value.length, sliceParams);
          [start, stop, step] = computed;
          result = [];
          if (step > 0) {
            for (i = start; i < stop; i += step) {
              result.push(value[i]);
            }
          } else {
            for (i = start; i > stop; i += step) {
              result.push(value[i]);
            }
          }
          return result;
        case 'Projection':
          // Evaluate left child.
          base = this.visit(node.children[0], value);
          if (!isArray(base)) {
            return null;
          }
          collected = [];
          for (i = 0; i < base.length; i += 1) {
            current = this.visit(node.children[1], base[i]);
            if (current !== null) {
              collected.push(current);
            }
          }
          return collected;
        case 'ValueProjection':
          // Evaluate left child.
          base = this.visit(node.children[0], value);
          if (!isObject(valueOf(base))) {
            return null;
          }
          collected = [];
          values = objValues(base);
          for (i = 0; i < values.length; i += 1) {
            current = this.visit(node.children[1], values[i]);
            if (current !== null) {
              collected.push(current);
            }
          }
          return collected;
        case 'FilterProjection':
          base = this.visit(node.children[0], value);
          if (!isArray(base)) {
            return null;
          }
          filtered = [];
          finalResults = [];
          for (i = 0; i < base.length; i += 1) {
            matched = this.visit(node.children[2], base[i]);
            if (!isFalse(matched)) {
              filtered.push(base[i]);
            }
          }
          for (let j = 0; j < filtered.length; j += 1) {
            current = this.visit(node.children[1], filtered[j]);
            if (current !== null) {
              finalResults.push(current);
            }
          }
          return finalResults;
        case 'Comparator':
          first = this.visit(node.children[0], value);
          second = this.visit(node.children[1], value);
          switch (node.name) {
            case TOK_EQ:
              result = strictDeepEqual(first, second);
              break;
            case TOK_NE:
              result = !strictDeepEqual(first, second);
              break;
            case TOK_GT:
              result = first > second;
              break;
            case TOK_GTE:
              result = first >= second;
              break;
            case TOK_LT:
              result = first < second;
              break;
            case TOK_LTE:
              result = first <= second;
              break;
            default:
              throw new Error(`Unknown comparator: ${node.name}`);
          }
          return result;
        case TOK_FLATTEN:
          original = this.visit(node.children[0], value);
          if (!isArray(original)) {
            return null;
          }
          merged = [];
          for (i = 0; i < original.length; i += 1) {
            current = original[i];
            if (isArray(current)) {
              merged.push(...current);
            } else {
              merged.push(current);
            }
          }
          return merged;
        case 'Identity':
          return value;
        case 'MultiSelectList':
          if (value === null) {
            return null;
          }
          collected = [];
          for (i = 0; i < node.children.length; i += 1) {
            collected.push(this.visit(node.children[i], value));
          }
          return collected;
        case 'MultiSelectHash':
          if (value === null) {
            return null;
          }
          collected = {};
          for (i = 0; i < node.children.length; i += 1) {
            child = node.children[i];
            collected[child.name] = this.visit(child.value, value);
          }
          return collected;
        case 'OrExpression':
          matched = this.visit(node.children[0], value);
          if (isFalse(matched)) {
            matched = this.visit(node.children[1], value);
          }
          return matched;
        case 'AndExpression':
          first = this.visit(node.children[0], value);

          if (isFalse(first) === true) {
            return first;
          }
          return this.visit(node.children[1], value);
        case 'AddExpression':
          first = this.visit(node.children[0], value);
          return toNumber(first) + toNumber(this.visit(node.children[1], value));
        case 'ConcatenateExpression':
          first = this.visit(node.children[0], value);
          second = this.visit(node.children[1], value);
          first = matchType(getTypeNames(first), [TYPE_STRING, TYPE_ARRAY_STRING], first, 'concatenate');
          second = matchType(getTypeNames(second), [TYPE_STRING, TYPE_ARRAY_STRING], second, 'concatenate');
          return applyOperator(first, second, '&');
        case 'SubtractExpression':
          first = this.visit(node.children[0], value);
          return first - this.visit(node.children[1], value);
        case 'MultiplyExpression':
          first = this.visit(node.children[0], value);
          second = this.visit(node.children[1], value);
          return applyOperator(first, second, '*');
        case 'DivideExpression':
          first = this.visit(node.children[0], value);
          return first / this.visit(node.children[1], value);
        case 'PowerExpression':
          first = this.visit(node.children[0], value);
          return first ** this.visit(node.children[1], value);
        case 'NotExpression':
          first = this.visit(node.children[0], value);
          return isFalse(first);
        case 'Literal':
          return node.value;
        case 'Number':
          return node.value;
        case TOK_PIPE:
          left = this.visit(node.children[0], value);
          return this.visit(node.children[1], left);
        case TOK_CURRENT:
          return value;
        case TOK_GLOBAL:
          return node.value;
        case 'Function':
          // Special case for if()
          // we need to make sure the results are called only after the condition is evaluated
          // Otherwise we end up with both results invoked -- which could include side effects
          if (node.name === 'if') {
            return this.runtime.callFunction(node.name, node.children, value);
          }
          resolvedArgs = [];
          for (i = 0; i < node.children.length; i += 1) {
            resolvedArgs.push(this.visit(node.children[i], value));
          }
          return this.runtime.callFunction(node.name, resolvedArgs);
        case 'ExpressionReference':
          [refNode] = node.children;
          // Tag the node with a specific attribute so the type
          // checker verify the type.
          refNode.jmespathType = TOK_EXPREF;
          return refNode;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    },

    computeSliceParams(arrayLength, sliceParams) {
      let start = sliceParams[0];
      let stop = sliceParams[1];
      let step = sliceParams[2];
      const computed = [null, null, null];
      if (step === null) {
        step = 1;
      } else if (step === 0) {
        const error = new Error('Invalid slice, step cannot be 0');
        error.name = 'RuntimeError';
        throw error;
      }
      const stepValueNegative = step < 0;

      if (start === null) {
        start = stepValueNegative ? arrayLength - 1 : 0;
      } else {
        start = this.capSliceRange(arrayLength, start, step);
      }

      if (stop === null) {
        stop = stepValueNegative ? -1 : arrayLength;
      } else {
        stop = this.capSliceRange(arrayLength, stop, step);
      }
      computed[0] = start;
      computed[1] = stop;
      computed[2] = step;
      return computed;
    },

    capSliceRange(arrayLength, actualValue, step) {
      if (actualValue < 0) {
        actualValue += arrayLength;
        if (actualValue < 0) {
          actualValue = step < 0 ? -1 : 0;
        }
      } else if (actualValue >= arrayLength) {
        actualValue = step < 0 ? arrayLength - 1 : arrayLength;
      }
      return actualValue;
    },
  };

  function Runtime() {}

  Runtime.prototype = {
    addFunctions(customFunctions = {}) {
      this.functionTable = {
        ...functions(
          this._interpreter,
          isObject,
          isArray,
          toNumber,
          getTypeName,
          valueOf,
          toString,
        ),
        ...openFormulaFunctions(this._interpreter, valueOf, toString, toNumber),
        ...customFunctions,
      };
    },

    callFunction(name, resolvedArgs, data) {
      const functionEntry = this.functionTable[name];
      if (functionEntry === undefined) {
        throw new Error(`Unknown function: ${name}()`);
      }
      this._validateArgs(name, resolvedArgs, functionEntry._signature);
      return functionEntry._func.call(this, resolvedArgs, data);
    },

    _validateArgs(name, args, signature) {
      // Validating the args requires validating
      // the correct arity and the correct type of each arg.
      // If the last argument is declared as variadic, then we need
      // a minimum number of args to be required.  Otherwise it has to
      // be an exact amount.
      if (signature.length === 0) {
        return;
      }
      let pluralized;
      if (signature[signature.length - 1].variadic) {
        if (args.length < signature.length) {
          pluralized = signature.length === 1 ? ' argument' : ' arguments';
          throw new Error(`ArgumentError: ${name}() `
                                + `takes at least${signature.length}${pluralized
                                } but received ${args.length}`);
        }
      } else if (args.length !== signature.length && !signature[signature.length - 1].optional) {
        pluralized = signature.length === 1 ? ' argument' : ' arguments';
        throw new Error(`ArgumentError: ${name}() `
                            + `takes ${signature.length}${pluralized
                            } but received ${args.length}`);
      }
      let currentSpec;
      let actualType;
      const limit = Math.min(signature.length, args.length);
      for (let i = 0; i < limit; i += 1) {
        currentSpec = signature[i].types;
        // First check for a match using matchClass
        // this check will not call valueOf or toString on the object, and so
        // will not trigger a dependency
        if (!matchClass(args[i], currentSpec)) {
          actualType = getTypeNames(args[i]);
          args[i] = matchType(actualType, currentSpec, args[i], name);
        }
      }
    },
  };

  function compile(stream) {
    const parser = new Parser();
    const ast = parser.parse(stream);
    return ast;
  }

  function tokenize(stream) {
    const lexer = new Lexer();
    return lexer.tokenize(stream);
  }

  function search(data, globals, expression, customFunctions, stringToNumberFn) {
    const parser = new Parser();
    // This needs to be improved.  Both the interpreter and runtime depend on
    // each other.  The runtime needs the interpreter to support exprefs.
    // There's likely a clean way to avoid the cyclic dependency.
    const runtime = new Runtime(customFunctions);
    const interpreter = new TreeInterpreter(runtime);
    runtime._interpreter = interpreter;
    runtime.addFunctions(customFunctions);
    if (globals) globalTokens = globals;
    stringToNumber = stringToNumberFn || (str => {
      const n = +str;
      return Number.isNaN(n) ? 0 : n;
    });
    const node = parser.parse(expression);
    return interpreter.search(node, data);
  }
  this.tokenize = tokenize;
  this.compile = compile;
  this.search = search;
  this.strictDeepEqual = strictDeepEqual;
}

export default new JsonFormula();
