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
  : '(' expression ')' # parenExpression
  | expression bracketExpression # bracketedExpression
  | bracketExpression # indexedExpression
  | objectExpression # objExpression
  | expression '.' chainedExpression # chainExpression
  | '!' expression # notExpression
  | '-' expression # unaryMinusExpression
  | expression ('*' | '/') expression	# multDivExpression
  | expression ('+' | '-' | '~') expression	# addSubtractUnionExpression
  | expression '&' expression	# concatenationExpression
  | expression COMPARATOR expression # comparisonExpression
  | expression '&&' expression # andExpression
  | expression '||' expression # orExpression
  | expression '|' expression # pipeExpression
  | identifier # identifierExpression
  | wildcard # wildcardExpression
  | arrayExpression # arrExpression
  | JSON_FRAGMENT # literalExpression
  | functionExpression # functionCallExpression
  | STRING # rawStringExpression
  | (REAL_OR_EXPONENT_NUMBER | INT) # numberLiteral
  | currentNode # currentNodeExpression
  ;

chainedExpression
  : identifier
  | arrayExpression
  | objectExpression
  | functionExpression
  | wildcard
  ;

wildcard : '*' ;

arrayExpression : '[' expression (',' expression)* ']' ;

objectExpression
  : '{' keyvalExpr (',' keyvalExpr)* '}'  #nonEmptyObject
  ;

keyvalExpr : identifier ':' expression ;

bracketExpression
  : '[' '*' ']' # bracketStar
  | '[' slice ']' # bracketSlice
  | '[' ']' # bracketFlatten
  | '[?' expression ']' # filter
  | '[' signedInt ']' # select
  ;

slice : start=signedInt? ':' stop=signedInt? (':' step=signedInt?)? ;

COMPARATOR
  : '<'
  | '<='
  | '=='
  | '='
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

identifier
  : NAME
  | QUOTED_NAME
  ;

signedInt
  : '-'? INT+
  ;

NAME : [a-zA-Z_$] [a-zA-Z0-9_$]* ;

QUOTED_NAME : '\'' (ESC | ~ ['\\])* '\'';

JSON_FRAGMENT
  : '`' (STRING | ~ [\\`]+)* '`'
  ;

STRING : '"' (ESC | ~["\\])* '"' ;

fragment ESC : '\\' (UNICODE | [bfnrt\\`'"/]);

fragment UNICODE
  : 'u' HEX HEX HEX HEX
  ;

fragment HEX
  : [0-9a-fA-F]
  ;

REAL_OR_EXPONENT_NUMBER
  : INT? '.' [0-9] + EXP?
  | INT EXP
  ;

INT
  : [0-9]+
  ;

fragment EXP
  : [Ee] [+\-]? INT
  ;

WS
  : [ \t\n\r] + -> skip
  ;