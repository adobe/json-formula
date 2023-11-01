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

import Lexer from './Lexer.js';
import tokenDefinitions from './tokenDefinitions.js';
import { syntaxError } from './errors.js';

/* eslint-disable no-underscore-dangle */
const {
  TOK_JSON,
  TOK_COLON,
  TOK_EOF,
  TOK_IDENTIFIER,
  TOK_QUOTEDIDENTIFIER,
  TOK_RBRACKET,
  TOK_RPAREN,
  TOK_COMMA,
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
  TOK_STRING,
  TOK_INT,
} = tokenDefinitions;

const bindingPower = {
  [TOK_EOF]: 0,
  [TOK_IDENTIFIER]: 0,
  [TOK_QUOTEDIDENTIFIER]: 0,
  [TOK_RBRACKET]: 0,
  [TOK_RPAREN]: 0,
  [TOK_COMMA]: 0,
  [TOK_RBRACE]: 0,
  [TOK_NUMBER]: 0,
  [TOK_INT]: 0,
  [TOK_CURRENT]: 0,
  [TOK_GLOBAL]: 0,
  [TOK_EXPREF]: 0,
  [TOK_PIPE]: 1,
  [TOK_OR]: 2,
  [TOK_AND]: 3,
  [TOK_CONCATENATE]: 5,
  [TOK_ADD]: 6,
  [TOK_SUBTRACT]: 6,
  [TOK_MULTIPLY]: 7,
  [TOK_DIVIDE]: 7,
  [TOK_UNION]: 7,
  [TOK_EQ]: 5,
  [TOK_GT]: 5,
  [TOK_LT]: 5,
  [TOK_GTE]: 5,
  [TOK_LTE]: 5,
  [TOK_NE]: 5,
  [TOK_FLATTEN]: 9,
  [TOK_STAR]: 20,
  [TOK_FILTER]: 21,
  [TOK_NOT]: 30,
  [TOK_UNARY_MINUS]: 30,
  [TOK_DOT]: 40,
  [TOK_LBRACE]: 50,
  [TOK_LBRACKET]: 55,
  [TOK_LPAREN]: 60,
};

export default class Parser {
  constructor(allowedGlobalNames = []) {
    this._allowedGlobalNames = allowedGlobalNames;
  }

  parse(expression, debug) {
    this.debug = debug;
    this._loadTokens(expression);
    this.index = 0;
    const ast = this.expression(0);
    if (this._lookahead(0) !== TOK_EOF) {
      const t = this._lookaheadToken(0);
      throw syntaxError(`Unexpected token type: ${t.type}, value: ${t.value}`);
    }
    return ast;
  }

  _loadTokens(expression) {
    const lexer = new Lexer(this._allowedGlobalNames, this.debug);
    const tokens = lexer.tokenize(expression);
    tokens.push({ type: TOK_EOF, value: '', start: expression.length });
    this.tokens = tokens;
  }

  expression(rbp) {
    const leftToken = this._lookaheadToken(0);
    this._advance();
    let left = this.nud(leftToken);
    let currentToken = this._lookahead(0, left.type);
    while (rbp < bindingPower[currentToken]) {
      this._advance();
      left = this.led(currentToken, left);
      currentToken = this._lookahead(0, left.type);
    }
    return left;
  }

  _lookahead(number, previous) {
    const next = this.tokens[this.index + number].type;
    // disambiguate multiply and star
    if (next === TOK_STAR) {
      if ([
        undefined,
        TOK_LBRACKET,
        TOK_DOT,
        TOK_PIPE,
        TOK_AND,
        TOK_OR,
        TOK_COMMA,
        TOK_NOT,
        TOK_MULTIPLY,
        TOK_ADD,
        TOK_SUBTRACT,
        TOK_DIVIDE,
        TOK_LPAREN,
        TOK_CONCATENATE,
        TOK_UNION,
        TOK_GT,
        TOK_GTE,
        TOK_LT,
        TOK_LTE,
        TOK_EQ,
        TOK_NE].includes(previous)) return TOK_STAR;
      return TOK_MULTIPLY;
    }
    return next;
  }

  _lookaheadToken(number) {
    return this.tokens[this.index + number];
  }

  _advance() {
    this.index += 1;
  }

  _lookAheadIndex() {
    let idx = 0;
    if (this._lookahead(idx) === TOK_UNARY_MINUS) idx += 1;
    if (this._lookahead(idx) === TOK_INT) idx += 1;
    if (this._lookahead(idx) === TOK_RBRACKET
      || this._lookahead(idx) === TOK_COLON) return true;
    return false;
  }

  _getIndex() {
    return this.index;
  }

  _setIndex(index) {
    this.index = index;
  }

  // eslint-disable-next-line consistent-return
  nud(token) {
    let left;
    let right;
    let expression;
    let node;
    let args;
    switch (token.type) {
      case TOK_STRING:
        return { type: 'String', value: token.value };
      case TOK_JSON:
        return { type: 'Literal', value: token.value };
      case TOK_NUMBER:
        return { type: 'Number', value: token.value };
      case TOK_INT:
        return { type: 'Integer', value: token.value };
      case TOK_IDENTIFIER:
        return { type: 'Identifier', name: token.value };
      case TOK_QUOTEDIDENTIFIER:
        node = { type: 'QuotedIdentifier', name: token.value };
        return node;
      case TOK_NOT:
        right = this.expression(bindingPower.Not);
        return { type: 'NotExpression', children: [right] };
      case TOK_UNARY_MINUS:
        right = this.expression(bindingPower.UnaryMinus);
        return { type: 'UnaryMinusExpression', children: [right] };
      case TOK_STAR:
        left = { type: 'Identity' };
        if (this._lookahead(0) === TOK_RBRACKET) {
          // This can happen in a ArrayExpression,
          // [a, b, *]
          right = { type: 'Identity' };
        } else {
          right = this._parseProjectionRHS(bindingPower.Star);
        }
        return { type: 'ValueProjection', children: [left, right] };
      case TOK_FILTER:
        return this.led(token.type, { type: 'Identity' });
      case TOK_LBRACE:
        return this._parseObjectExpression();
      case TOK_FLATTEN:
        left = { type: TOK_FLATTEN, children: [{ type: 'Identity' }] };
        right = this._parseProjectionRHS(bindingPower.Flatten);
        return { type: 'Projection', children: [left, right] };
      case TOK_LBRACKET:
        if (this._lookAheadIndex()) {
          right = this._parseIndexExpression();
          return this._projectIfSlice({ type: 'Identity' }, right);
        }
        if (this._lookahead(0) === TOK_STAR && this._lookahead(1) === TOK_RBRACKET) {
          this._advance();
          this._advance();
          right = this._parseProjectionRHS(bindingPower.Star);
          return {
            type: 'Projection',
            children: [{ type: 'Identity' }, right],
          };
        }
        return this._parseArrayExpression();

      case TOK_CURRENT:
        return { type: TOK_CURRENT };
      case TOK_GLOBAL:
        return { type: TOK_GLOBAL, name: token.name };
      case TOK_EXPREF:
        expression = this.expression(bindingPower.Expref);
        return { type: 'ExpressionReference', children: [expression] };
      case TOK_LPAREN:
        args = [];
        while (this._lookahead(0) !== TOK_RPAREN) {
          expression = this.expression(0);
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
          return { type: 'ChainedExpression', children: [left, right] };
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
      case TOK_UNION:
        right = this.expression(bindingPower.Union);
        return { type: 'UnionExpression', children: [left, right] };
      case TOK_LPAREN:
        if (left.type !== TOK_IDENTIFIER) {
          throw syntaxError('Bad function syntax. Parenthesis must be preceded by an unquoted identifier');
        }
        name = left.name;
        args = this._parseFunctionArgs();
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
          return { type: 'Projection', children: [left, right], debug: 'Wildcard' };
        }
        right = this._parseIndexExpression();
        return this._projectIfSlice(left, right);
      default:
        this._errorToken(this._lookaheadToken(0));
    }
  }

  _match(tokenType) {
    const token = this._lookaheadToken(0);
    if (token.type === tokenType) {
      this._advance();
      return token;
    }
    throw syntaxError(`Expected ${tokenType}, got: ${token.type}`);
  }

  // eslint-disable-next-line class-methods-use-this
  _errorToken(token) {
    throw syntaxError(`Unexpected token (${
      token.type}): "${
      token.value}"`);
  }

  _parseFunctionArgs() {
    let firstExpression = true;
    const args = [];
    while (this._lookahead(0) !== TOK_RPAREN) {
      if (!firstExpression) {
        this._match(TOK_COMMA);
      }
      args.push(this.expression(0));
      firstExpression = false;
    }
    this._match(TOK_RPAREN);
    return args;
  }

  _parseSignedInt() {
    const first = this._lookaheadToken(0);
    if (first.type === TOK_UNARY_MINUS) {
      this._advance();
      const value = this._match(TOK_INT);
      return {
        type: 'SignedInt',
        value: -value.value,
      };
    }
    if (first.type !== TOK_INT) this._errorToken(first);
    this._advance();
    return {
      type: 'SignedInt',
      value: first.value,
    };
  }

  _parseIndexExpression() {
    const oldIndex = this._getIndex();
    if (this._lookahead(0) === TOK_COLON) {
      return this._parseSliceExpression();
    }
    // look ahead of the first expression to determine the type
    const first = this._parseSignedInt();
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

  _projectIfSlice(left, right) {
    const indexExpr = { type: 'BracketExpression', children: [left, right] };
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
      if (currentToken === TOK_COLON && index < 2) { // there can't be more than 2 colons
        index += 1;
        this._advance();
      } else {
        parts[index] = this._parseSignedInt();
        // check next token to be either colon or rbracket
        const t = this._lookahead(0);
        if (t !== TOK_COLON && t !== TOK_RBRACKET) {
          throw syntaxError(`Unexpected token: ${
            t.value}(${t.type})`);
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

  _parseDotRHS(rbp) {
    const lookahead = this._lookahead(0);
    const exprTokens = [TOK_IDENTIFIER, TOK_QUOTEDIDENTIFIER, TOK_STAR];
    if (exprTokens.indexOf(lookahead) >= 0) {
      return this.expression(rbp);
    }
    if (lookahead === TOK_LBRACKET) {
      this._match(TOK_LBRACKET);
      return this._parseArrayExpression();
    }
    if (lookahead === TOK_LBRACE) {
      this._match(TOK_LBRACE);
      return this._parseObjectExpression();
    }
    throw syntaxError('Expecting one of: "*", "[", "{", name or quoted name after a dot');
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
      throw syntaxError(`Unexpected token: ${
        t.value}(${t.type})`);
    }
    return right;
  }

  _parseArrayExpression() {
    const expressions = [];
    while (this._lookahead(0) !== TOK_RBRACKET) {
      const expression = this.expression(0);
      expressions.push(expression);
      if (this._lookahead(0) === TOK_COMMA) {
        this._match(TOK_COMMA);
        if (this._lookahead(0) === TOK_RBRACKET) {
          throw syntaxError('Unexpected token Rbracket');
        }
      }
    }
    this._match(TOK_RBRACKET);
    return { type: 'ArrayExpression', children: expressions };
  }

  _parseObjectExpression() {
    const pairs = [];
    const identifierTypes = [TOK_IDENTIFIER, TOK_QUOTEDIDENTIFIER];
    let keyToken; let keyName; let value; let
      node;
    if (this._lookahead(0) === TOK_RBRACE) {
      this.debug.push('To create an empty object, use a JSON literal: `{}`');
      throw syntaxError('An empty object expression is not allowed');
    }
    for (;;) {
      keyToken = this._lookaheadToken(0);
      if (identifierTypes.indexOf(keyToken.type) < 0) {
        throw syntaxError(`Expecting an identifier token, got: ${
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
    return { type: 'ObjectExpression', children: pairs };
  }
}
