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

expression :  SIGNED_INT # topLevelInt
            | NUMBER # topLevelNumber
            | RAW_STRING # topLevelString
            | expression binary_op expression # binaryExpression
            | unary_op expression # unaryExpression
            | expression postfix_op # postfix
            | '(' expression ')' # braceExpression
            | function_call # functionCall
            | jmesPathExpression # jmesPath
      ;

SIGNED_INT : '-'? INT ;

NUMBER
:   SIGNED_INT '.'? [0-9]*
;

unary_op : '+' | '-';

binary_op : COMPARATOR | '<>' | '+' | '-' | '&' | '*' | '/' | '^' ;

postfix_op : '%';

FUNCTIONS:
  'AND'   | 'and' |
  'FALSE' |
  'if'    | 'IF'  |
  'not'   | 'NOT' |
  'or'    | 'OR'  |
  'sum'   | 'SUM' |
  'TRUE'
  ;

function_call : FUNCTIONS '(' expression_list ')';

parameter : expression;

nonempty_expr_list : parameter | nonempty_expr_list parm_separator parameter;

expression_list :  /* empty */ | nonempty_expr_list;

parm_separator : ',';

// JMESPath definition starts here
jmesPathExpression
  : jmesPathExpression '.' chainedExpression # chainExpression
  | jmesPathExpression bracketSpecifier # bracketedExpression
  | bracketSpecifier # bracketExpression
  | jmesPathExpression COMPARATOR jmesPathExpression # comparisonExpression
  | jmesPathExpression '&&' jmesPathExpression # andExpression
  | jmesPathExpression '||' jmesPathExpression # orExpression
  | identifier # identifierExpression
  | '!' jmesPathExpression # notExpression
  | '(' jmesPathExpression ')' # parenExpression
  | wildcard # wildcardExpression
  | multiSelectList # multiSelectListExpression
  | multiSelectHash # multiSelectHashExpression
  | literal # literalExpression
  | functionExpression # functionCallExpression
  | jmesPathExpression '|' jmesPathExpression # pipeExpression
  | RAW_STRING # rawStringExpression
  | currentNode # currentNodeExpression
  ;

chainedExpression
  : identifier #chainedIdentifier
  | multiSelectList #chainedMultiSelectList
  | multiSelectHash #chainedMultiSelectHash
  | functionExpression #chainedFunctionExpression
  | wildcard #chainedWildcard
  ;

wildcard : '*' ;

multiSelectList : '[' jmesPathExpression (',' jmesPathExpression)* ']' ;

multiSelectHash : '{' keyvalExpr (',' keyvalExpr)* '}' ;

keyvalExpr : identifier ':' jmesPathExpression ;

bracketSpecifier
  : '[' SIGNED_INT ']' # bracketIndex
  | '[' '*' ']' # bracketStar
  | '[' slice ']' # bracketSlice
  | '[' ']' # bracketFlatten
  | '[?' jmesPathExpression ']' # select
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
  ;

functionArg
  : jmesPathExpression
  | expressionType
  ;

currentNode : '@' ;

expressionType : '&' jmesPathExpression ;

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

NAME : [a-zA-Z_] [a-zA-Z0-9_]* ;

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