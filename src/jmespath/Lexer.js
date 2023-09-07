/* eslint-disable no-underscore-dangle */
import tokenDefinitions from './tokenDefinitions.js';

const {
  TOK_UNQUOTEDIDENTIFIER,
  TOK_QUOTEDIDENTIFIER,
  TOK_RBRACKET,
  TOK_RPAREN,
  TOK_COMMA,
  TOK_COLON,
  TOK_CONCATENATE,
  TOK_RBRACE,
  TOK_NUMBER,
  TOK_CURRENT,
  TOK_GLOBAL,
  TOK_EXPREF,
  TOK_PIPE,
  TOK_OR,
  TOK_AND,
  TOK_ADD,
  TOK_SUBTRACT,
  TOK_UNARY_MINUS,
  TOK_MULTIPLY,
  TOK_POWER,
  TOK_DIVIDE,
  TOK_UNION,
  TOK_EQ,
  TOK_GT,
  TOK_LT,
  TOK_GTE,
  TOK_LTE,
  TOK_NE,
  TOK_FLATTEN,
  TOK_STAR,
  TOK_FILTER,
  TOK_DOT,
  TOK_NOT,
  TOK_LBRACE,
  TOK_LBRACKET,
  TOK_LPAREN,
  TOK_LITERAL,
} = tokenDefinitions;

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

function isNum(ch) {
  return (ch >= '0' && ch <= '9') || (ch === '.');
}

function isAlphaNum(ch) {
  return (ch >= 'a' && ch <= 'z')
    || (ch >= 'A' && ch <= 'Z')
    || (ch >= '0' && ch <= '9')
    || ch === '_';
}

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

export default class Lexer {
  constructor(allowedGlobalNames = [], debug = []) {
    this._allowedGlobalNames = allowedGlobalNames;
    this.debug = debug;
  }

  tokenize(stream) {
    const tokens = [];
    this._current = 0;
    let start;
    let identifier;
    let token;
    while (this._current < stream.length) {
      const prev = tokens.length ? tokens.slice(-1)[0].type : null;

      if (this._isGlobal(prev, stream, this._current)) {
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
      } else if (stream[this._current] === '-' && ![TOK_GLOBAL, TOK_CURRENT, TOK_NUMBER, TOK_RPAREN, TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER, TOK_RBRACKET].includes(prev)) {
        token = this._consumeUnaryMinus(stream);
        tokens.push(token);
      } else if (isNum(stream[this._current])) {
        token = this._consumeNumber(stream);
        tokens.push(token);
      } else if (stream[this._current] === '[') {
        // No need to increment this._current.  This happens
        // in _consumeLBracket
        token = this._consumeLBracket(stream);
        tokens.push(token);
      } else if (stream[this._current] === "'") {
        start = this._current;
        identifier = this._consumeQuotedIdentifier(stream);
        tokens.push({
          type: TOK_QUOTEDIDENTIFIER,
          value: identifier,
          start,
        });
      } else if (stream[this._current] === '"') {
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
      } else if (stream[this._current] === '~') {
        start = this._current;
        this._current += 1;
        tokens.push({ type: TOK_UNION, value: '~', start });
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
  }

  _consumeUnquotedIdentifier(stream) {
    const start = this._current;
    this._current += 1;
    while (this._current < stream.length && isAlphaNum(stream[this._current])) {
      this._current += 1;
    }
    return stream.slice(start, this._current);
  }

  _consumeQuotedIdentifier(stream) {
    const start = this._current;
    this._current += 1;
    const maxLength = stream.length;
    let foundNonAlpha = !isIdentifier(stream, start + 1);
    while (stream[this._current] !== "'" && this._current < maxLength) {
      // You can escape a double quote and you can escape an escape.
      let current = this._current;
      if (!isAlphaNum(stream[current])) foundNonAlpha = true;
      if (stream[current] === '\\' && (stream[current + 1] === '\\'
        || stream[current + 1] === "'")) {
        current += 2;
      } else {
        current += 1;
      }
      this._current = current;
    }
    this._current += 1;
    const val = stream.slice(start, this._current);
    // Check for unnecessary double quotes.
    // json-formula uses double quotes to escape characters that don't belong in names names.
    // e.g. "purchase-order".address
    // If we find a double-quoted entity with spaces or all legal characters, issue a warning
    try {
      if (!foundNonAlpha || val.includes(' ')) {
        this.debug.push(`Suspicious quotes: ${val}`);
        this.debug.push(`Did you intend a literal? "${val.replace(/'/g, '')}"?`);
      }
      // eslint-disable-next-line no-empty
    } catch (e) { }
    return JSON.parse(`"${val.substring(1, val.length - 1)}"`);
  }

  _consumeRawStringLiteral(stream) {
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
    const literal = stream.slice(start + 1, this._current - 1);
    if (this._current > maxLength) {
      throw new Error(`Unterminated string literal at ${start}, "${literal}`);
    }
    return literal.replaceAll('\\"', '"');
  }

  _consumeNumber(stream) {
    const start = this._current;
    this._current += 1;
    const maxLength = stream.length;
    while (isNum(stream[this._current]) && this._current < maxLength) {
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
  }

  _consumeUnaryMinus() {
    const start = this._current;
    this._current += 1;
    return { type: TOK_UNARY_MINUS, value: '-', start };
  }

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
  }

  _isGlobal(prev, stream, pos) {
    // global tokens occur only at the start of an expression
    if (prev !== null && prev === TOK_DOT) return false;
    const ch = stream[pos];
    if (ch !== globalStartToken) return false;
    // $ is special -- it's allowed to be part of an identifier if it's the first character
    let i = pos + 1;
    while (i < stream.length && isAlphaNum(stream[i])) i += 1;
    const global = stream.slice(pos, i);
    return this._allowedGlobalNames.includes(global);
  }

  _consumeGlobal(stream) {
    const start = this._current;
    this._current += 1;
    while (this._current < stream.length && isAlphaNum(stream[this._current])) this._current += 1;
    const global = stream.slice(start, this._current);

    return { type: TOK_GLOBAL, name: global, start };
  }

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
      if (stream[this._current] === '>') {
        this._current += 1;
        return { type: TOK_NE, value: '<>', start };
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
  }

  _consumeLiteral(stream) {
    function _looksLikeJSON(str) {
      if (str === '') return false;
      if ('[{"'.includes(str[0])) return true;
      if (['true', 'false', 'null'].includes(str)) return true;

      if ('-0123456789'.includes(str[0])) {
        try {
          JSON.parse(str);
          return true;
        } catch (ex) {
          return false;
        }
      } else {
        return false;
      }
    }

    this._current += 1;
    const start = this._current;
    const maxLength = stream.length;
    let literal;
    let inQuotes = false;
    while ((inQuotes || stream[this._current] !== '`') && this._current < maxLength) {
      let current = this._current;
      // bypass escaped double quotes when we're inside quotes
      if (inQuotes && stream[current] === '\\' && stream[current + 1] === '"') current += 2;
      else {
        if (stream[current] === '"') inQuotes = !inQuotes;
        if (inQuotes && stream[current + 1] === '`') current += 2;
        else if (stream[current] === '\\' && (stream[current + 1] === '\\'
          || stream[current + 1] === '`')) {
          // You can escape a literal char or you can escape the escape.
          current += 2;
        } else {
          current += 1;
        }
      }
      this._current = current;
    }
    let literalString = stream.slice(start, this._current).trimStart();
    literalString = literalString.replaceAll('\\`', '`');
    if (_looksLikeJSON(literalString)) {
      literal = JSON.parse(literalString);
    } else {
      // Try to JSON parse it as "<literal>"
      literal = JSON.parse(`"${literalString}"`);
    }
    // +1 gets us to the ending "`", +1 to move on to the next char.
    this._current += 1;
    return literal;
  }
}
