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

/*
  Translated from the BNF specified here:
 https://www.oasis-open.org/committees/download.php/16826/openformula-spec-20060221.html#Expression_Syntax
*/

grammar Openformula;

formula : expression EOF ;

expression :  NUMBER | STRING | formula_variable |
                expression binary_op expression |
                unary_op expression |
                expression postfix_op |
                '(' expression ')' |
                function_call |
                cell_specifier;

// STRING, NUMBER and IDENTIFIER should get replaced from JMESPath definition
STRING
  : '"' [a-z] | [A-Z] [0-9] '"'
  ;
NUMBER: [1-9] [0-9]* ;

IDENTIFIER: STRING ;

formula_variable : IDENTIFIER;

unary_op : '+' | '-';

binary_op : comparison_op | '+' | '-' | '&' | '*' | '/' | '^' |
              intersection_op;

comparison_op : '<' | '>' | '<=' | '>=' | '=' | '<>';

postfix_op : '%';

function_call : IDENTIFIER '(' expression_list ')';

parameter : expression;

nonempty_expr_list : parameter | nonempty_expr_list parm_separator parameter;

expression_list :  /* empty */ | nonempty_expr_list;

intersection_op : '!';   /* intersection operation */

parm_separator : ';';

cell_specifier : '[' STRING ']';

