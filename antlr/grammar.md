# Grammar changes

## Quotes
openformula string literals are double quotes.
JMESPath uses single quotes
JMESPath uses double quotes to escape path names.
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

## Operators
Change openformula equality operator from "=" to "=="
Remove intersection operator: "!"
Openformula uses ";" as a parameter separator (parm_separator).
  e.g. IF(condition; result1; result2)
  We will use commas for consistency with JMESPath functions

JMESPath uses "!=" openformula uses "<>"
Support both "!=" and "<>"

## Functions
OpenFormula specifies functions be uppercase.  However...

JMESPath sum is different than openformula.  JMESPath takes only array.
We want to always use openformula sum() and make  JMESPath sum() is reachable.

We could fix this by:
- customize our JMESPATH implementation to remove sum()
- make sure grammar precedence keeps our custom functions ahead of jmespath functions, and allow custom function names to be upper or lower case

For now we've taken the latter approach
