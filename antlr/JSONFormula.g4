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

grammar JSONFormula;

formula : expression EOF ;

expression
  : expression '.' chainedExpression # chainExpression
  | expression chainedBracketSpecifier # bracketedExpression
  | bracketSpecifier # bracketExpression
  | expression ('*' | '/' | '&') expression	# multDivExpression
	| expression ('+' | '-') expression	# addSubtractExpression
  | expression COMPARATOR expression # comparisonExpression
  | expression '&&' expression # andExpression
  | expression '||' expression # orExpression
  | identifier # identifierExpression
  | '!' expression # notExpression
  | '(' expression ')' # parenExpression
  | wildcard # wildcardExpression
  | multiSelectList # multiSelectListExpression
  | multiSelectHash # multiSelectHashExpression
  | literal # literalExpression
  | functionExpression # functionCallExpression
  | expression '|' expression # pipeExpression
  | RAW_STRING # rawStringExpression
  | (REAL_OR_EXPONENT_NUMBER | SIGNED_INT) # numberLiteral
  | currentNode # currentNodeExpression
  | form # formExpression
  | currentField # currentFieldExpression

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

multiSelectHash : '{' keyvalExpr (',' keyvalExpr)* '}' ;

keyvalExpr : identifier ':' expression ;

bracketSpecifier
  : '[' SIGNED_INT ']' # bracketIndex
  | '[' '*' ']' # bracketStar
  | '[' slice ']' # bracketSlice
  | '[' ']' # bracketFlatten
  | '[?' expression ']' # select
  ;

chainedBracketSpecifier
  : bracketSpecifier # chainedBracket
  | '[' expression ']' # chainedBracketIndex
  ;

slice : start=SIGNED_INT? ':' stop=SIGNED_INT? (':' step=SIGNED_INT?)? ;

COMPARATOR
  : '<'
  | '<='
  | '=='
  | '>='
  | '>'
  | '!='
  ;

functionExpression
  : NAME '(' functionArg (',' functionArg)* ')'
  | NAME '(' ')'
  | JSON_CONSTANT '(' ')'
  ;

functionArg
  : expression
  | expressionType
  ;

currentNode : '@' ;
form : '$form' ;
currentField : '$field' ;

expressionType : '&' expression ;

RAW_STRING : '\'' (RAW_ESC | ~['\\])* '\'' ;

fragment RAW_ESC : '\\' . ;

literal : '`' jsonValue '`' ;

identifier
  : NAME
  | STRING
  | JSON_CONSTANT
  ;

JSON_CONSTANT
  : 'true'
  | 'false'
  | 'null'
  ;

NAME : [@a-zA-Z_] [a-zA-Z0-9_]* ;

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
  | JSON_CONSTANT # jsonConstantValue
  ;

STRING
  : '"' (ESC | ~ ["\\])* '"'
  ;

fragment ESC
  : '\\' (["\\/bfnrt`] | UNICODE)
  ;

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