grammar JsonFormula;

formula : expression EOF ;

expression
  : expression '.' chainedExpression # chainExpression
  | expression indexExpression # bracketedExpression
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
  | JSON_FRAGMENT # literalExpression
  | functionExpression # functionCallExpression
  | expression '|' expression # pipeExpression
  | STRING # rawStringExpression
  | '-'? (REAL_OR_EXPONENT_NUMBER | INT) # numberLiteral
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
  : '[' '*' ']' # bracketStar
  | '[' slice ']' # bracketSlice
  | '[' ']' # bracketFlatten
  | '[?' expression ']' # filter
  | '[' expression ']' # select
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

identifier
  : NAME
  | QUOTED_NAME
  ;

NAME : [@a-zA-Z_$] [a-zA-Z0-9_$]* ;

QUOTED_NAME : '\'' (ESC | ~ ['\\])* '\'';

JSON_FRAGMENT
  : '`' (STRING | ~ [\\`]+)* '`'
  ;

STRING : '"' (ESC | ~["\\])* '"' ;

fragment ESC : '\\' (~[u] | UNICODE);

fragment UNICODE
  : 'u' HEX HEX HEX HEX
  ;

fragment HEX
  : [0-9a-fA-F]
  ;

REAL_OR_EXPONENT_NUMBER
  : INT '.' [0-9] + EXP?
  | INT EXP
  ;

INT
  : '0'
  | [1-9] [0-9]*
  ;

fragment EXP
  : [Ee] [+\-]? INT
  ;

WS
  : [ \t\n\r] + -> skip
  ;