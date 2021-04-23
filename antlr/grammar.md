# Grammar changes

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

Change openformula equality operator from "=" to "=="
Remove intersection operator: "!"
Openformula uses ";" as a parameter separator (parm_separator).
  e.g. IF(condition; result1; result2)
  We will use commas for consistency with JMESPath functions

JMESPath uses "!=" openformula uses "<>"
Support both "!=" and "<>"


# Issues
JMESPath sum is different than openformula.  JMESPath takes only array.
We will always use openformula sum().  JMESPath sum() is unreachable.
