<!---
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
 --->

# Setup

Copy the antlr jar file to a system folder

> sudo cp bin/antlr-4.9.2-complete.jar /usr/local/lib/

Setup CLASSPATH and aliases in a startup script (.bashrc / .zshrc ...)

```
export CLASSPATH=".:/usr/local/lib/antlr-4.9.2-complete.jar:$CLASSPATH"
# command to generate lexer and parser
alias antlr4='java -Xmx500M -cp "/usr/local/lib/antlr-4.9.2-complete.jar:$CLASSPATH" org.antlr.v4.Tool'
# test command
alias grun='java -Xmx500M -cp "/usr/local/lib/antlr-4.9.2-complete.jar:$CLASSPATH" org.antlr.v4.gui.TestRig'
```

[re]generate grammar: `source generate.sh`

Debug JSONFormula:
- populate debug.txt with the expression to test
> cd antlr4
> antlr4 JSONFormula.g4
> javac *.java
> grun JSONFormula formula -tokens -tree ./src/test/debug.txt

To compare with the jmespath equivalent:
> cd antlr4
> antlr4 jmespath.g4
> javac *.java
> grun jmespath jmesPathExpression -tokens -tree ./src/debug.txt


# Grammar changes

openformula string literals are double quotes.
JMESPath uses single quotes
JEMSPath uses double quotes to escape path names.
e.g. for:
```
{
  "a": {
    "c.d": 40
  }
}
```
In JMESPath you reference "c.d" via: `a."c.d"`
We propose to use single quotes for literal strings.


Change openformula equals operator from "=" to "=="
Remove intersection operator: "!"
Openformula uses ";" as a parameter separator (parm_separator).
  e.g. IF(condition; result1; result2)
  We will use commas (as per Excel)

JMESPath uses "!=" openformula uses "<>"
Support both "!=" and "<>"

Replace openformula comparison_op with JMESPATH COMPARATOR

# Issues
JMESPath sum is different than openformula.  JMESPath takes only array.
We will always use openformula sum().  JMESPath sum() is unreachable.
