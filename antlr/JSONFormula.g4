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

grammar JsonFormula;

formula : expression EOF ;

expression
  : expression '.' chainedExpression # chainExpression
  | expression chainedBracketSpecifier # bracketedExpression
  | indexExpression # indexedExpression
  | expression ('*' | '/' | '&' | '~') expression	# multDivExpression
  | expression ('+' | '-') expression	# addSubtractExpression
  | expression COMPARATOR expression # comparisonExpression
  | expression '&&' expression # andExpression
  | expression '||' expression # orExpression
  | identifier # identifierExpression
  | '!' expression # notExpression
  | '-' expression # unaryMinusExpression
  | '(' expression ')' # parenExpression
  | wildcard # wildcardExpression
  | multiSelectList # multiSelectListExpression
  | multiSelectHash # multiSelectHashExpression
  | literal # literalExpression
  | functionExpression # functionCallExpression
  | expression '|' expression # pipeExpression
  | (STRING | RAW_STRING) # rawStringExpression
  | (REAL_OR_EXPONENT_NUMBER | SIGNED_INT) # numberLiteral
  | currentNode # currentNodeExpression
  ;

chainedExpression
  : identifier
  | multiSelectList
  | multiSelectHash
  | functionExpression
  | wildcard
  ;

wildcard : '*' ;

multiSelectList : '[' expression (',' expression)* ']' ;

multiSelectHash
  : '{' '}' #emptyHash
  | '{' keyvalExpr (',' keyvalExpr)* '}'  #nonEmptyHash
  ;

keyvalExpr : identifier ':' expression ;

indexExpression
  : '[' SIGNED_INT ']' # bracketIndex
  | '[' '*' ']' # bracketStar
  | '[' slice ']' # bracketSlice
  | '[' ']' # bracketFlatten
  | '[?' expression ']' # select
  ;

chainedBracketSpecifier
  : indexExpression # chainedBracket
  | '[' expression ']' # chainedBracketIndex
  ;

slice : start=expression? ':' stop=expression? (':' step=expression?)? ;

COMPARATOR
  : '<'
  | '<='
  | '=='
  | '>='
  | '>'
  | '!='
  | '<>'
  ;

functionExpression
  : NAME '(' functionArg (',' functionArg)* ')'
  | NAME '(' ')'
  ;

functionArg
  : expression
  | expressionType
  ;

currentNode : '@' ;

expressionType : '&' expression ;

literal : '`' jsonValue '`' ;

identifier
  : NAME
  | QUOTED_NAME
  ;

NAME : [@a-zA-Z_] [a-zA-Z0-9_]* ;

QUOTED_NAME : '\'' (ESC | ~ ['\\])* '\'';

jsonObject
  : '{' jsonObjectPair (',' jsonObjectPair)* '}'
  | '{' '}'
  ;

jsonObjectPair
  : STRING ':' jsonValue
  ;

jsonArray
  : '[' jsonValue (',' jsonValue)* ']'
  | '[' ']'
  ;

jsonValue
  : STRING # jsonStringValue
  | (REAL_OR_EXPONENT_NUMBER | SIGNED_INT) # jsonNumberValue
  | jsonObject # jsonObjectValue
  | jsonArray # jsonArrayValue
  // NAME in this context must be one of true/false/null
  // Enforcing that enumeration in the grammar conflicts with other use of NAME,
  // so rely on the runtime JSON parser to validate
  | NAME # jsonConstantValue
  ;

STRING
  : '"' (ESC | ~ ["\\])* '"'
  ;

fragment ESC
  : '\\' (["\\/bfnrt`] | UNICODE)
  ;

RAW_STRING : '"' (RAW_ESC | ~["\\])* '"' ;

fragment RAW_ESC : '\\' . ;


fragment UNICODE
  : 'u' HEX HEX HEX HEX
  ;

fragment HEX
  : [0-9a-fA-F]
  ;

REAL_OR_EXPONENT_NUMBER
  : '-'? INT '.' [0-9] + EXP?
  | '-'? INT EXP
  ;

SIGNED_INT : '-'? INT ;

fragment INT
  : '0'
  | [1-9] [0-9]*
  ;

fragment EXP
  : [Ee] [+\-]? INT
  ;

WS
  : [ \t\n\r] + -> skip
  ;