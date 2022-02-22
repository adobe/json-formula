import Lexer from './Lexer';
import tokenDefinitions from './tokenDefinitions';

const {
  TOK_LITERAL,
  TOK_COLON,
  TOK_EOF,
  TOK_UNQUOTEDIDENTIFIER,
  TOK_QUOTEDIDENTIFIER,
  TOK_RBRACKET,
  TOK_RPAREN,
  TOK_COMMA,
  TOK_CONCATENATE,
  TOK_RBRACE,
  TOK_NUMBER,
  TOK_CURRENT,
  TOK_GLOBAL,
  TOK_FIELD,
  TOK_EXPREF,
  TOK_PIPE,
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
  TOK_NE,
  TOK_FLATTEN,
  TOK_STAR,
  TOK_FILTER,
  TOK_DOT,
  TOK_NOT,
  TOK_LBRACE,
  TOK_LBRACKET,
  TOK_LPAREN,
} = tokenDefinitions;

/* eslint-disable no-underscore-dangle */
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

const bindingPower = {
  [TOK_EOF]: 0,
  [TOK_UNQUOTEDIDENTIFIER]: 0,
  [TOK_QUOTEDIDENTIFIER]: 0,
  [TOK_RBRACKET]: 0,
  [TOK_RPAREN]: 0,
  [TOK_COMMA]: 0,
  [TOK_RBRACE]: 0,
  [TOK_NUMBER]: 0,
  [TOK_CURRENT]: 0,
  [TOK_GLOBAL]: 0,
  [TOK_FIELD]: 0,
  [TOK_EXPREF]: 0,
  [TOK_PIPE]: 1,
  [TOK_OR]: 2,
  [TOK_AND]: 3,
  [TOK_ADD]: 6,
  [TOK_SUBTRACT]: 6,
  [TOK_CONCATENATE]: 7,
  [TOK_MULTIPLY]: 7,
  [TOK_DIVIDE]: 7,
  [TOK_POWER]: 7,
  [TOK_EQ]: 5,
  [TOK_GT]: 5,
  [TOK_LT]: 5,
  [TOK_GTE]: 5,
  [TOK_LTE]: 5,
  [TOK_NE]: 5,
  [TOK_FLATTEN]: 9,
  [TOK_STAR]: 20,
  [TOK_FILTER]: 21,
  [TOK_DOT]: 40,
  [TOK_NOT]: 45,
  [TOK_LBRACE]: 50,
  [TOK_LBRACKET]: 55,
  [TOK_LPAREN]: 60,
};

export default class Parser {
  constructor(allowedGlobalNames = []) {
    this._allowedGlobalNames = allowedGlobalNames;
  }

  parse(expression, debug) {
    this._loadTokens(expression, debug);
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
  }

  _loadTokens(expression, debug) {
    const lexer = new Lexer(this._allowedGlobalNames, debug);
    const tokens = lexer.tokenize(expression);
    tokens.push({ type: TOK_EOF, value: '', start: expression.length });
    this.tokens = tokens;
  }

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
  }

  _lookahead(number) {
    return this.tokens[this.index + number].type;
  }

  _lookaheadToken(number) {
    return this.tokens[this.index + number];
  }

  _advance() {
    this.index += 1;
  }

  _getIndex() {
    return this.index;
  }

  _setIndex(index) {
    this.index = index
  }

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
        return this._parseUnchainedIndexExpression();
      case TOK_CURRENT:
        return { type: TOK_CURRENT };
      case TOK_GLOBAL:
        return { type: TOK_GLOBAL, name: token.name };
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
  }

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
        if (this._lookahead(0) === TOK_STAR
            && this._lookahead(1) === TOK_RBRACKET) {
          this._advance();
          this._advance();
          right = this._parseProjectionRHS(bindingPower.Star);
          return { type: 'Projection', children: [left, right] };
        }
        right = this._parseChainedIndexExpression();
        return this._projectIfSlice(left, right);
      default:
        this._errorToken(this._lookaheadToken(0));
    }
  }

  _match(tokenType) {
    if (this._lookahead(0) === tokenType) {
      this._advance();
    } else {
      const t = this._lookaheadToken(0);
      const error = new Error(`Expected ${tokenType}, got: ${t.type}`);
      error.name = 'ParserError';
      throw error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _errorToken(token) {
    const error = new Error(`Invalid token (${
      token.type}): "${
      token.value}"`);
    error.name = 'ParserError';
    throw error;
  }

  _parseChainedIndexExpression() {
    const oldIndex = this._getIndex();
    if (this._lookahead(0) === TOK_COLON) {
      return this._parseSliceExpression();
    }
    // look ahead of the first expression to determine the type
    const first = this.expression(0);
    const token = this._lookahead(0);
    if (token === TOK_COLON) {
      // now that we know the type revert back to the old position and parse
      this._setIndex(oldIndex);
      return this._parseSliceExpression();
    }
    this._match(TOK_RBRACKET);
    return {
      type: 'Index',
      value: first,
    };
  }

  _parseUnchainedIndexExpression() {
    const oldIndex = this._getIndex();
    const firstToken = this._lookahead(0);
    if (firstToken === TOK_COLON) {
      const right = this._parseSliceExpression();
      return this._projectIfSlice({ type: 'Identity' }, right);
    }
    const first = this.expression(0);
    const currentToken = this._lookahead(0);
    if (currentToken === TOK_COMMA) {
      this._setIndex(oldIndex);
      return this._parseMultiselectList();
    }
    if (currentToken === TOK_COLON) {
      this._setIndex(oldIndex);
      const right = this._parseSliceExpression();
      return this._projectIfSlice({ type: 'Identity' }, right);
    }
    if (firstToken === TOK_NUMBER) {
      this._match(TOK_RBRACKET);
      return {
        type: 'Index',
        value: first,
      };
    }
    this._setIndex(oldIndex);
    return this._parseMultiselectList();
  }

  _projectIfSlice(left, right) {
    const indexExpr = { type: 'IndexExpression', children: [left, right] };
    if (right.type === 'Slice') {
      return {
        type: 'Projection',
        children: [indexExpr, this._parseProjectionRHS(bindingPower.Star)],
      };
    }
    return indexExpr;
  }

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
      } else {
        parts[index] = this.expression(0);
        // check next token to be either colon or rbracket
        const t = this._lookahead(0);
        if (t !== TOK_COLON && t !== TOK_RBRACKET) {
          const error = new Error(`Syntax error, unexpected token: ${
            t.value}(${t.type})`);
          error.name = 'Parsererror';
          throw error;
        }
      }
      currentToken = this._lookahead(0);
    }
    this._match(TOK_RBRACKET);
    return {
      type: 'Slice',
      children: parts,
    };
  }

  _parseComparator(left, comparator) {
    const right = this.expression(bindingPower[comparator]);
    return { type: 'Comparator', name: comparator, children: [left, right] };
  }

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
  }

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
  }

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
  }

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
  }
}
