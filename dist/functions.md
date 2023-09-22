<a name="abs"></a>

## abs(num) ⇒ <code>number</code>
Find the absolute value of the provided argument `value`.

**Kind**: global function  
**Returns**: <code>number</code> - the absolute value of the `value` argument  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | a numeric value |

**Example**  
```js
abs(-1) // returns 1
```
<a name="and"></a>

## and(firstOperand, [...additionalOperands]) ⇒ <code>boolean</code>
Finds the logical AND result of all parameters.
If the parameters are not boolean they will be cast to boolean as per the type coercion rules

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical result of applying AND to all parameters  

| Param | Type | Description |
| --- | --- | --- |
| firstOperand | <code>any</code> | logical expression |
| [...additionalOperands] | <code>any</code> | any number of additional expressions |

**Example**  
```js
and(10 > 8, length("foo") < 5) // returns true
and(`null`, length("foo") < 5) // returns false
```
<a name="avg"></a>

## avg(elements) ⇒ <code>number</code>
Finds the average of the elements in an array.
An empty array will return an average of `null`.

**Kind**: global function  
**Returns**: <code>number</code> - average value  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>Array.&lt;number&gt;</code> | array of numeric values |

**Example**  
```js
avg(`[]`) // returns null
avg([1, 2, 3]) // returns 2
```
<a name="casefold"></a>

## casefold(input) ⇒ <code>string</code>
Generates a lower-case string of the `input` string using locale-specific mappings.
e.g. Strings with German letter <span>&#223;</span> can be compared to "ss"

**Kind**: global function  
**Returns**: <code>string</code> - A new string converted to lower case  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | string to casefold |

**Example**  
```js
casefold("AbC") // returns "abc"
```
<a name="charCode"></a>

## charCode(codePoint) ⇒ <code>number</code>
Create a string created from the specified code unit.

**Kind**: global function  
**Returns**: <code>number</code> - A string from a given code point  

| Param | Type | Description |
| --- | --- | --- |
| codePoint | <code>integer</code> | unicode code point value |

**Example**  
```js
charCode(65) // "A"
charCode(65) == "\u0041" // true
```
<a name="ceil"></a>

## ceil(num) ⇒ <code>integer</code>
Finds the next highest integer value of the argument `num` by rounding up if necessary.

**Kind**: global function  
**Returns**: <code>integer</code> - The smallest integer greater than or equal to num  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | numeric value |

**Example**  
```js
ceil(10) // returns 10
ceil(10.4) // return 11
```
<a name="codePoint"></a>

## codePoint(str) ⇒ <code>integer</code>
Retrieve the code point from the first character of a string

**Kind**: global function  
**Returns**: <code>integer</code> - unicode code point value  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | source string |

**Example**  
```js
codePoint("ABC") // 65
```
<a name="contains"></a>

## contains(subject, search) ⇒ <code>boolean</code>
Determines if the given `subject` contains the `search` string.
If `subject` is an array, this function returns true if one of the elements
in the array is equal to the provided `search` value. If `subject`
is a string, this function returns true if the string contains the
`search` value.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if found  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>array</code> \| <code>string</code> | the subject in which the element has to be searched |
| search | <code>string</code> \| <code>boolean</code> \| <code>number</code> \| <code>date</code> | element to search |

**Example**  
```js
contains([1, 2, 3, 4], 2) // returns true
contains([1, 2, 3, 4], -1) // returns false
contains("Abcd", "d") // returns true
contains("Abcd", "x") // returns false
```
<a name="datedif"></a>

## datedif(start_date, end_date, unit) ⇒ <code>integer</code>
Return difference between two date values.
The measurement of the difference is determined by the `unit` parameter. One of:

* `y` the number of whole years between start_date and end_date
* `m` the number of whole months between start_date and end_date.
* `d` the number of days between start_date and end_date
* `md` the number of days between start_date and end_date after subtracting whole months.
* `ym` the number of whole months between start_date and end_date
after subtracting whole years.
* `yd` the number of days between start_date and end_date, assuming start_date
and end_date were no more than one year apart

**Kind**: global function  
**Returns**: <code>integer</code> - The number of days/months/years difference  

| Param | Type | Description |
| --- | --- | --- |
| start_date | <code>number</code> | The starting date. Date/time values can be generated using the [datetime](#datetime), [today](#today), [now](#now) and [time](#time) functions. |
| end_date | <code>number</code> | The end date -- must be greater or equal to start_date. |
| unit | <code>string</code> |  |

**Example**  
```js
datedif(datetime(2001, 1, 1), datetime(2003, 1, 1), "y") // returns 2
datedif(datetime(2001, 6, 1), datetime(2003, 8, 15), "D") // returns 805
// 805 days between June 1, 2001, and August 15, 2003
datedif(datetime(2001, 6, 1), datetime(2003, 8, 15), "YD") // returns 75
// 75 days between June 1 and August 15, ignoring the years of the dates (75)
```
<a name="datetime"></a>

## datetime(year, month, day, [hours], [minutes], [seconds], [milliseconds]) ⇒ <code>number</code>
Return a date/time value.

**Kind**: global function  
**Returns**: <code>number</code> - A date/time numeric value to be used with other date/time functions  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| year | <code>integer</code> |  | The year to use for date construction. Values from 0 to 99 map to the years 1900 to 1999. All other values are the actual year |
| month | <code>integer</code> |  | The month: beginning with 1 for January to 12 for December. |
| day | <code>integer</code> |  | The day of the month. |
| [hours] | <code>integer</code> | <code>0</code> | Integer value between 0 and 23 representing the hour of the day. |
| [minutes] | <code>integer</code> | <code>0</code> | Integer value representing the minute segment of a time. |
| [seconds] | <code>integer</code> | <code>0</code> | Integer value representing the second segment of a time. |
| [milliseconds] | <code>integer</code> | <code>0</code> | Integer value representing the millisecond segment of a time. |

**Example**  
```js
datetime(2010, 10, 10) // returns representation of October 10, 2010
datetime(2010, 2, 28) // returns representation of February 28, 2010
```
<a name="day"></a>

## day(date) ⇒ <code>integer</code>
Finds the day of a date

**Kind**: global function  
**Returns**: <code>integer</code> - The day of the month ranging from 1 to 31.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>number</code> | of the day you are trying to find. Date/time values can be generated using the [datetime](#datetime), [today](#today), [now](#now) and [time](#time) functions. |

**Example**  
```js
day(datetime(2008,5,23)) // returns 23
```
<a name="deepScan"></a>

## deepScan(object, name) ⇒ <code>Array.&lt;any&gt;</code>
Searches a nested hierarchy of objects to return an array of key values that match a `name`.
The name can be either a key into an object or an array index.
This is similar to the JSONPath deep scan operator (..)

**Kind**: global function  
**Returns**: <code>Array.&lt;any&gt;</code> - The array of matched elements  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> \| <code>array</code> | The starting object or array where we start the search |
| name | <code>string</code> \| <code>integer</code> | The name (or index position) of the elements to find |

**Example**  
```js
deepScan({a : {b1 : {c : 2}, b2 : {c : 3}}}, "c") // returns [2, 3]
```
<a name="endsWith"></a>

## endsWith(subject, suffix) ⇒ <code>boolean</code>
Determines if the `subject` string ends with a specific `suffix`

**Kind**: global function  
**Returns**: <code>boolean</code> - true if the `suffix` value is at the end of the `subject`  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>string</code> | source string in which to search |
| suffix | <code>string</code> | search string |

**Example**  
```js
endsWith("Abcd", "d") // returns true
endsWith("Abcd", "A") // returns false
```
<a name="entries"></a>

## entries(obj) ⇒ <code>Array.&lt;any&gt;</code>
Returns an array of `[key, value]` pairs from an object.
The `fromEntries()` function may be used to convert the array back to an object.

**Kind**: global function  
**Returns**: <code>Array.&lt;any&gt;</code> - an array of arrays where each child array has two elements
representing the key and value of a pair  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | source object |

**Example**  
```js
entries({a: 1, b: 2}) // returns [["a", 1], ["b", 2]]
```
<a name="eomonth"></a>

## eomonth(startDate, monthAdd) ⇒ <code>integer</code>
Finds the serial number of the end of a month, given `startDate` plus `monthAdd` months

**Kind**: global function  
**Returns**: <code>integer</code> - the number of days in the computed month  

| Param | Type | Description |
| --- | --- | --- |
| startDate | <code>number</code> | The base date to start from. Date/time values can be generated using the [datetime](#datetime), [today](#today), [now](#now) and [time](#time) functions. |
| monthAdd | <code>integer</code> | Number of months to add to start date |

**Example**  
```js
eomonth(datetime(2011, 1, 1), 1) | [month(@), day(@)] // returns [2, 28]
eomonth(datetime(2011, 1, 1), -3) | [month(@), day(@)] // returns [10, 31]
```
<a name="exp"></a>

## exp(x) ⇒ <code>number</code>
Finds e (the base of natural logarithms) raised to a power x. (i.e. e<sup>x</sup>)

**Kind**: global function  
**Returns**: <code>number</code> - e (the base of natural logarithms) raised to a power x  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | A numeric expression representing the power of e. |

**Example**  
```js
exp(10) // returns 22026.465794806718
```
<a name="false"></a>

## false() ⇒ <code>boolean</code>
Return constant boolean false value.
Note that expressions may also use the JSON literal false: `` `false` ``

**Kind**: global function  
**Returns**: <code>boolean</code> - constant boolean value `false`  
<a name="find"></a>

## find(query, text, [start]) ⇒ <code>integer</code> \| [<code>null</code>](#null)
finds and returns the index of query in text from a start position

**Kind**: global function  
**Returns**: <code>integer</code> \| [<code>null</code>](#null) - The position of the found string, null if not found.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>string</code> |  | string to search |
| text | <code>string</code> |  | text to be searched |
| [start] | <code>integer</code> | <code>0</code> | zero-based position to start searching |

**Example**  
```js
find("m", "abm") // returns 2
find("M", "abMcdM", 3) // returns 5
find("M", "ab") // returns `null`
find("M", "abMcdM", 2) // returns 2
```
<a name="fromEntries"></a>

## fromEntries(pairs) ⇒ <code>object</code>
returns an object by transforming a list of key-value `pairs` into an object.
`fromEntries()` is the inverse operation of `entries()`.

**Kind**: global function  
**Returns**: <code>object</code> - An object constructed from the provided key-value pairs  

| Param | Type | Description |
| --- | --- | --- |
| pairs | <code>Array.&lt;any&gt;</code> | A nested array of key-value pairs to create the object from |

**Example**  
```js
fromEntries([["a", 1], ["b", 2]]) // returns {a: 1, b: 2}
```
<a name="floor"></a>

## floor(num) ⇒ <code>integer</code>
Calculates the next lowest integer value of the argument `num` by rounding down if necessary.

**Kind**: global function  
**Returns**: <code>integer</code> - The largest integer smaller than or equal to num  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | numeric value |

**Example**  
```js
floor(10.4) // returns 10
floor(10) // returns 10
```
<a name="hour"></a>

## hour(date) ⇒ <code>integer</code>
Extract the hour from a date/time representation

**Kind**: global function  
**Returns**: <code>integer</code> - value between 0 and 23  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>number</code> | The datetime/time for which the hour is to be returned. Date/time values can be generated using the [datetime](#datetime), [today](#today), [now](#now) and [time](#time) functions. |

**Example**  
```js
hour(datetime(2008,5,23,12, 0, 0)) // returns 12
hour(time(12, 0, 0)) // returns 12
```
<a name="if"></a>

## if(condition, result1, result2) ⇒ <code>any</code>
Return one of two values `result1` or `result2`, depending on the `condition`

**Kind**: global function  
**Returns**: <code>any</code> - either result1 or result2  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>any</code> | boolean result of a logical expression |
| result1 | <code>any</code> | if condition is true |
| result2 | <code>any</code> | if condition is false |

**Example**  
```js
if(true(), 1, 2) // returns 1
if(false(), 1, 2) // returns 2
```
<a name="join"></a>

## join(glue, stringsarray) ⇒ <code>string</code>
Combines all the elements from the provided
array, joined together using the `glue` argument as a separator between each.

**Kind**: global function  
**Returns**: <code>string</code> - String representation of the array  

| Param | Type | Description |
| --- | --- | --- |
| glue | <code>string</code> |  |
| stringsarray | <code>Array.&lt;string&gt;</code> | array of strings or values that can be coerced to strings |

**Example**  
```js
join(",", ["a", "b", "c"]) // returns "a,b,c"
join(" and ", ["apples", "bananas"]) // returns "apples and bananas"
```
<a name="keys"></a>

## keys(obj) ⇒ <code>array</code>
Generates an array of the keys of the input object. If the
object is null, the value return an empty array

**Kind**: global function  
**Returns**: <code>array</code> - the array of all the key names  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | the object to examine |

**Example**  
```js
keys({a : 3, b : 4}) // returns ["a", "b"]
```
<a name="left"></a>

## left(subject, [elements]) ⇒ <code>string</code> \| <code>array</code>
Return a substring from the start of a string or the left-most elements of an array

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| subject | <code>string</code> \| <code>array</code> |  | The source text/array of characters/elements |
| [elements] | <code>integer</code> | <code>1</code> | number of elements to pick |

**Example**  
```js
left("Sale Price", 4) // returns "Sale"
left("Sweden") // returns "S"
left([4, 5, 6], 2) // returns [4, 5]
```
<a name="length"></a>

## length(subject) ⇒ <code>integer</code>
Calculates the length of the input argument based on types:

* string: returns the number of code points
* array: returns the number of array elements
* object: returns the number of key-value pairs

**Kind**: global function  
**Returns**: <code>integer</code> - the length of the input subject  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>string</code> \| <code>array</code> \| <code>object</code> | subject whose length to calculate |

**Example**  
```js
length(`[]`) // returns 0
length("") // returns 0
length("abcd") // returns 4
length([1, 2, 3, 4]) // returns 4
length({}) // returns 0
length({a : 3, b : 4}) // returns 2
```
<a name="lower"></a>

## lower(input) ⇒ <code>string</code>
Converts all the alphabetic characters in a string to lowercase. If the value
is not a string it will be converted into string.

**Kind**: global function  
**Returns**: <code>string</code> - the lower case value of the input string  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | input string |

**Example**  
```js
lower("E. E. Cummings") // returns e. e. cummings
```
<a name="map"></a>

## map(expr, elements) ⇒ <code>array</code>
Apply an expression to every element in an array and return the array of results.
An input array of length N will return an array of length N.

**Kind**: global function  
**Returns**: <code>array</code> - the mapped array  

| Param | Type | Description |
| --- | --- | --- |
| expr | <code>expression</code> | expression to evaluate |
| elements | <code>array</code> | array of elements to process |

**Example**  
```js
map(&(@ + 1), [1, 2, 3, 4]) // returns [2, 3, 4, 5]
map(&length(@), ["doe", "nick", "chris"]) // returns [3, 4, 5]
```
<a name="max"></a>

## max(collection) ⇒ <code>number</code>
Calculates the largest value in the provided `collection` arguments.
If all collections are empty `null` is returned.
max() can work on numbers or strings.
If a mix of numbers and strings are provided, all values with be coerced to
the type of the first value.

**Kind**: global function  
**Returns**: <code>number</code> - the largest value found  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> | array in which the maximum element is to be calculated |

**Example**  
```js
max([1, 2, 3], [4, 5, 6], 7) // returns 7
max(`[]`) // returns null
max(["a", "a1", "b"]) // returns "b"
```
<a name="merge"></a>

## merge(...args) ⇒ <code>object</code>
Accepts one or more objects, and returns a single object with
all objects merged.
The first object is copied, and then
and each key value pair from each subsequent object
are added to the first object.  Duplicate keys in subsequent objects will
override those found in earlier objects.

**Kind**: global function  
**Returns**: <code>object</code> - The combined object  

| Param | Type |
| --- | --- |
| ...args | <code>object</code> | 

**Example**  
```js
merge({a: 1, b: 2}, {c : 3, d: 4}) // returns {a :1, b: 2, c: 3, d: 4}
merge({a: 1, b: 2}, {a : 3, d: 4}) // returns {a :3, b: 2, d: 4}
```
<a name="mid"></a>

## mid(subject, startPos, length) ⇒ <code>string</code> \| <code>array</code>
Extracts a substring from source text, or a subset of an array.
or in case of array, extracts a subset of the array from start till the length
number of elements.
Returns null if the `startPos` is greater than the length of the array

**Kind**: global function  
**Returns**: <code>string</code> \| <code>array</code> - The resulting substring or array subset  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>string</code> \| <code>array</code> | the text string or array of characters or elements to extract. |
| startPos | <code>integer</code> | the zero-position of the first character or element to extract. |
| length | <code>integer</code> | The number of characters or elements to return from the string or array. If greater then the length of `subject` the argument is set to the length of the subject. |

**Example**  
```js
mid("Fluid Flow", 0, 5) // returns "Fluid"
mid("Fluid Flow", 6, 20) // returns "Flow"
mid("Fluid Flow, 20, 5) // returns ""
mid([0,1,2,3,4,5,6,7,8,9], 2, 3) // returns [2,3,4]
```
<a name="min"></a>

## min(collection) ⇒ <code>number</code>
Calculates the smallest value in the input arguments.
If all collections are empty `null` is returned.
min() can work on numbers or strings.
If a mix of numbers and strings are provided, the type of the first value will be used.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>...Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| <code>number</code> \| <code>string</code> | to search for the minimum value |

**Example**  
```js
min([1, 2, 3], [4, 5, 6], 7) // returns 1
min(`[]`) // returns null
min(["a", "a1", "b"]) // returns "a"
```
<a name="minute"></a>

## minute(date) ⇒ <code>integer</code>
Extract the minute (0 through 59) from a time/datetime representation

**Kind**: global function  
**Returns**: <code>integer</code> - Number of minutes in the time portion of the date/time value  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>number</code> | A datetime/time value. Date/time values can be generated using the [datetime](#datetime), [today](#today), [now](#now) and [time](#time) functions. |

**Example**  
```js
minute(datetime(2008,5,23,12, 10, 0)) // returns 10
minute(time(12, 10, 0)) // returns 10
```
<a name="mod"></a>

## mod(dividend, divisor) ⇒ <code>number</code>
Return the remainder when one number is divided by another number.

**Kind**: global function  
**Returns**: <code>number</code> - Computes the remainder of `dividend`/`divisor`.
If `dividend` is negative, the result will also be negative.  

| Param | Type | Description |
| --- | --- | --- |
| dividend | <code>number</code> | The number for which to find the remainder. |
| divisor | <code>number</code> | The number by which to divide number. |

**Example**  
```js
mod(3, 2) // returns 1
mod(-3, 2) // returns -1
```
<a name="month"></a>

## month(date) ⇒ <code>number</code>
Finds the month of a date.

**Kind**: global function  
**Returns**: <code>number</code> - The month number as an integer, ranging from 1 (January) to 12 (December).  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>number</code> | source date value. Date/time values can be generated using the [datetime](#datetime), [today](#today), [now](#now) and [time](#time) functions. |

**Example**  
```js
month(datetime(2008,5,23)) // returns 5
```
<a name="not"></a>

## not(value) ⇒ <code>boolean</code>
Compute logical NOT of a value. If the parameter is not boolean it will be cast to boolean
as per the type coercion rules.
Note the related unary not operator: `!`

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical NOT applied to the input parameter  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | any data type |

**Example**  
```js
not(length("bar") > 0) // returns false
not(false()) // returns true
not("abcd") // returns false
not("") // returns true
```
<a name="notNull"></a>

## notNull(...argument) ⇒ <code>any</code>
Finds the first argument that does not resolve to `null`.
This function accepts one or more arguments, and will evaluate
them in order until a non-null argument is encountered. If all
arguments values resolve to null, then return a null value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...argument | <code>any</code> | 

**Example**  
```js
notNull(1, 2, 3, 4, `null`) // returns 1
notNull(`null`, 2, 3, 4, `null`) // returns 2
```
<a name="now"></a>

## now() ⇒ <code>number</code>
Retrieve the current date/time.

**Kind**: global function  
**Returns**: <code>number</code> - representation of current date/time as a number  
<a name="null"></a>

## null() ⇒ <code>boolean</code>
Return constant null value.
Note that expressions may also use the JSON literal null: `` `null` ``

**Kind**: global function  
**Returns**: <code>boolean</code> - True  
<a name="or"></a>

## or(first, [...operand]) ⇒ <code>boolean</code>
Determines the logical OR result of a set of parameters.
If the parameters are not boolean they will be cast to
boolean as per the type coercion rules.
Note the related 'or' operator: `A || B`.

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical result of applying OR to all parameters  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>any</code> | logical expression |
| [...operand] | <code>any</code> | any number of additional expressions |

**Example**  
```js
or((x / 2) == y, (y * 2) == x) // true
```
<a name="power"></a>

## power(a, x) ⇒ <code>number</code>
Computes `a` raised to a power `x`. (a<sup>x</sup>)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | The base number -- can be any real number. |
| x | <code>number</code> | The exponent to which the base number is raised. |

**Example**  
```js
power(10, 2) // returns 100 (10 raised to power 2)
```
<a name="proper"></a>

## proper(text) ⇒ <code>string</code>
Apply proper casing to a string.  Proper casing is where the first letter of each
word is converted to an
uppercase letter and the rest of the letters in the word converted to lowercase.

**Kind**: global function  
**Returns**: <code>string</code> - source string with proper casing applied.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | source string |

**Example**  
```js
proper("this is a TITLE") // returns "This Is A Title"
proper("2-way street") // returns "2-Way Street"
proper("76BudGet") // returns "76Budget"
```
<a name="random"></a>

## random() ⇒ <code>number</code>
Generate a pseudo random number.

**Kind**: global function  
**Returns**: <code>number</code> - A value greater than or equal to zero, and less than one.  
**Example**  
```js
random() // 0.022585461160693265
```
<a name="reduce"></a>

## reduce(expr, elements, initialValue) ⇒ <code>any</code>
Executes a user-supplied reducer expression on each element of an
array, in order, passing in the return value from the expression from the preceding element.
The final result of running the reducer across all elements of the input array is a
single value.
The expression can access the following properties of the current object:

* accumulated: accumulated value based on the previous expression.
For the first array element use the `initialValue` parameter.  If not provided, then `null`
* current: current element to process
* index: index of the current element in the array
* array: original array

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| expr | <code>expression</code> | reducer expression to be executed on each element |
| elements | <code>array</code> | array of elements on which the expression will be evaluated |
| initialValue | <code>any</code> | the accumulated value to pass to the first array element |

**Example**  
```js
reduce(&(accumulated + current), [1, 2, 3]) // returns 6
// find maximum entry by age
reduce(
  &max(@.accumulated.age, @.current.age),
  [{age: 10, name: "Joe"},{age: 20, name: "John"}], @[0].age
)
reduce(&accumulated * current, [3, 3, 3], 1) // returns 27
```
<a name="register"></a>

## register(functionName, expr) ⇒ <code>Object</code>
Register a function.  The registered function may take one parameter.
If more parameters are needed, combine them in an array or object.

**Kind**: global function  
**Returns**: <code>Object</code> - returns an empty object  

| Param | Type | Description |
| --- | --- | --- |
| functionName | <code>string</code> | Name of the function to register |
| expr | <code>expression</code> | Expression to execute with this function call |

**Example**  
```js
register("product", &@[0] * @[1]) // can now call: product([2,21]) => returns 42
```
<a name="replace"></a>

## replace(text, start, length, replacement) ⇒ <code>string</code>
Generates text where an old text is substituted at a given start position and
length, with a new text.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | original text |
| start | <code>integer</code> | zero-based index in the original text from where to begin the replacement. |
| length | <code>integer</code> | number of characters to be replaced |
| replacement | <code>string</code> | string to insert at the start index |

**Example**  
```js
replace("abcdefghijk", 5, 5, "*") // returns abcde*k
replace("2009",2,2,"10") // returns  2010
replace("123456",0,3,"@") // returns @456
```
<a name="rept"></a>

## rept(text, count) ⇒ <code>string</code>
Return text repeated `count` times.

**Kind**: global function  
**Returns**: <code>string</code> - Text generated from the repeated text  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | text to repeat |
| count | <code>integer</code> | number of times to repeat the text |

**Example**  
```js
rept("x", 5) // returns "xxxxx"
```
<a name="reverse"></a>

## reverse(argument) ⇒ <code>array</code>
Reverses the order of an array or string

**Kind**: global function  
**Returns**: <code>array</code> - The resulting reversed array or string  

| Param | Type | Description |
| --- | --- | --- |
| argument | <code>string</code> \| <code>array</code> | the source to be reversed |

**Example**  
```js
reverse(["a", "b", "c"]) // returns ["c", "b", "a"]
```
<a name="right"></a>

## right(subject, [elements]) ⇒ <code>string</code> \| <code>array</code>
Generates a string from the right-most characters of a string or
a subset of elements from the end of an array

**Kind**: global function  
**Returns**: <code>string</code> \| <code>array</code> - The extracted characters or array subset
Returns null if the number of elements is less than 0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| subject | <code>string</code> \| <code>array</code> |  | The text/array containing the characters/elements to extract |
| [elements] | <code>integer</code> | <code>1</code> | number of elements to pick |

**Example**  
```js
right("Sale Price", 4) // returns "rice"
right("Sweden") // returns "n"
right([4, 5, 6], 2) // returns [5, 6]
```
<a name="round"></a>

## round(num, precision) ⇒ <code>number</code>
Round a number to a specified precision:

* If `precision` is greater than zero, round to the specified number of decimal places.
* If `precision` is 0, round to the nearest integer.
* If `precision` is less than 0, round to the left of the decimal point.

**Kind**: global function  
**Returns**: <code>number</code> - rounded value  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | number to round |
| precision | <code>integer</code> | precision to use for the rounding operation. |

**Example**  
```js
round(2.15, 1) // returns 2.2
round(626.3,-3) // returns 1000 (Rounds 626.3 to the nearest multiple of 1000)
round(626.3, 0) // returns 626
round(1.98,-1) // returns 0 (Rounds 1.98 to the nearest multiple of 10)
round(-50.55,-2) // -100 (round -50.55 to the nearest multiple of 100)
```
<a name="search"></a>

## search(findText, withinText, [startPos]) ⇒ <code>array</code>
Perform a wildcard search.  The search is case-sensitive and supports two forms of wildcards:
`*` finds a sequence of characters and `?` finds a single character.
To use `*` or `?` as text values, precede them with a tilde (`~`) character.
Note that the wildcard search is not greedy.
e.g. `search("a{asterisk}b", "abb")` will return `[0, "ab"]` Not `[0, "abb"]`

**Kind**: global function  
**Returns**: <code>array</code> - returns an array with two values:

* The start position of the found text and the text string that was found.
* If a match was not found, an empty array is returned.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| findText | <code>string</code> |  | the search string -- which may include wild cards. |
| withinText | <code>string</code> |  | The string to search. |
| [startPos] | <code>integer</code> | <code>0</code> | The zero-based position of withinText to start searching. |

**Example**  
```js
search("a?c", "acabc") // returns [2, "abc"]
```
<a name="second"></a>

## second(date) ⇒ <code>integer</code>
Extract the seconds of the time value in a time/datetime representation

**Kind**: global function  
**Returns**: <code>integer</code> - The number of seconds: 0 through 59  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>number</code> | datetime/time for which the second is to be returned. Date/time values can be generated using the [datetime](#datetime), [today](#today), [now](#now) and [time](#time) functions. |

**Example**  
```js
second(datetime(2008,5,23,12, 10, 53)) // returns 53
second(time(12, 10, 53)) // returns 53
```
<a name="sort"></a>

## sort(list) ⇒ <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code>
This function accepts an array of strings or numbers and returns a
re-orderd array with the elements in sorted order.
String sorting is based on code points. Locale is not taken into account.

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> - The ordered result  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> | to be sorted |

**Example**  
```js
sort([1, 2, 4, 3, 1]) // returns [1, 1, 2, 3, 4]
```
<a name="sortBy"></a>

## sortBy(elements, expr) ⇒ <code>array</code>
Sort an array using an expression to find the sort key. For each element
in the array, the expression is applied and the resulting
value is used as the sort value. If the result of
evaluating the expression against the current array element results in type
other than a number or a string, a type-error will occur.

**Kind**: global function  
**Returns**: <code>array</code> - The sorted array  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>array</code> | Array to be sorted |
| expr | <code>expression</code> | The comparision expression |

**Example**  
```js
sortBy(["abcd", "e", "def"], &length(@)) // returns ["e", "def", "abcd"]

// returns [{year: 1910}, {year: 2010}, {year: 2020}]
sortBy([{year: 2010}, {year: 2020}, {year: 1910}], &year)
sortBy([-15, 30, -10, -11, 5], &abs(@)) // [5, -10, -11, -15, 30]
```
<a name="split"></a>

## split(string, separator) ⇒ <code>Array.&lt;string&gt;</code>
split a string into an array, given a separator

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | string to split |
| separator | <code>string</code> | separator where the split(s) should occur |

**Example**  
```js
split("abcdef", "") // returns ["a", "b", "c", "d", "e", "f"]
split("abcdef", "e") // returns ["abcd", "f"]
```
<a name="sqrt"></a>

## sqrt(num) ⇒ <code>number</code>
Return the square root of a number

**Kind**: global function  
**Returns**: <code>number</code> - the calculated square root value  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | source number |

**Example**  
```js
sqrt(4) // returns 2
```
<a name="startsWith"></a>

## startsWith(subject, prefix) ⇒ <code>boolean</code>
Determine if a string starts with a prefix.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if `prefix` matches the start of `subject`  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>string</code> | string to search |
| prefix | <code>string</code> | prefix to search for |

**Example**  
```js
startsWith("jack is at home", "jack") // returns true
```
<a name="stdev"></a>

## stdev(numbers) ⇒ <code>number</code>
Estimates standard deviation based on a sample.
`stdev` assumes that its arguments are a sample of the entire population.
If your data represents a entire population,
then compute the standard deviation using [stdevp](#stdevp).

**Kind**: global function  
**Returns**: <code>number</code> - [Standard deviation](https://en.wikipedia.org/wiki/Standard_deviation)  

| Param | Type | Description |
| --- | --- | --- |
| numbers | <code>Array.&lt;number&gt;</code> | The array of numbers comprising the population |

**Example**  
```js
stdev([1345, 1301, 1368]) // returns 34.044089061098404
stdevp([1345, 1301, 1368]) // returns 27.797
```
<a name="stdevp"></a>

## stdevp(numbers) ⇒ <code>number</code>
Calculates standard deviation based on the entire population given as arguments.
`stdevp` assumes that its arguments are the entire population.
If your data represents a sample of the population,
then compute the standard deviation using [stdev](#stdev).

**Kind**: global function  
**Returns**: <code>number</code> - Calculated standard deviation  

| Param | Type | Description |
| --- | --- | --- |
| numbers | <code>Array.&lt;number&gt;</code> | The array of numbers comprising the population |

**Example**  
```js
stdevp([1345, 1301, 1368]) // returns 27.797
stdev([1345, 1301, 1368]) // returns 34.044
```
<a name="substitute"></a>

## substitute(text, old, new, [which]) ⇒ <code>string</code>
Generates a string from the input `text`,
with text `old` replaced by text `new` (when searching from the left).
If there is no match, or if `old` has length 0, `text` is returned unchanged.
Note that `old` and `new` may have different lengths. If `which` < 1, return `text` unchanged

**Kind**: global function  
**Returns**: <code>string</code> - replaced string  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text for which to substitute characters. |
| old | <code>string</code> | The text to replace. |
| new | <code>string</code> | The text to replace `old` with. |
| [which] | <code>integer</code> | The one-based occurrence of `old` text to replace with `new` text. If `which` parameter is omitted, every occurrence of `old` is replaced with `new`. |

**Example**  
```js
substitute("Sales Data", "Sales", "Cost") // returns "Cost Data"
substitute("Quarter 1, 2008", "1", "2", 1) // returns "Quarter 2, 2008"
substitute("Quarter 1, 1008", "1", "2", 2) // returns "Quarter 1, 2008"
```
<a name="sum"></a>

## sum(collection) ⇒ <code>number</code>
Calculates the sum of the provided array.
An empty array will produce a return value of 0.

**Kind**: global function  
**Returns**: <code>number</code> - The sum of elements  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array.&lt;number&gt;</code> | array of elements |

**Example**  
```js
sum([1, 2, 3]) // returns 6
```
<a name="time"></a>

## time(hours, [minutes], [seconds]) ⇒ <code>number</code>
Construct and returns a time value.

**Kind**: global function  
**Returns**: <code>number</code> - Returns a date/time value representing the fraction
of the day consumed by the given time  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hours | <code>integer</code> |  | Zero-based integer value between 0 and 23 representing the hour of the day. |
| [minutes] | <code>integer</code> | <code>0</code> | Zero-based integer value representing the minute segment of a time. |
| [seconds] | <code>integer</code> | <code>0</code> | Zero-based integer value representing the seconds segment of a time. |

**Example**  
```js
time(12, 0, 0) | [hour(@), minute(@), second(@)] // returns [12, 0, 0]
```
<a name="toArray"></a>

## toArray(arg) ⇒ <code>array</code>
Converts the provided argument to an array.
The conversion happens as per the following rules:

* array - Returns the provided value.
* number/string/object/boolean/null - Returns a one element array containing the argument.

**Kind**: global function  
**Returns**: <code>array</code> - The resulting array  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>any</code> | parameter to turn into an array |

**Example**  
```js
toArray(1) // returns [1]
toArray(null()) // returns [`null`]
```
<a name="today"></a>

## today() ⇒ <code>number</code>
Returns a date/time value representing the start of the current day. i.e. midnight

**Kind**: global function  
**Returns**: <code>number</code> - today at midnight  
<a name="toNumber"></a>

## toNumber(arg) ⇒ <code>number</code>
Converts the provided arg to a number. The conversion happens as per the type coercion rules.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>any</code> | to convert to number |

**Example**  
```js
toNumber(1) // returns 1
toNumber("10") // returns 10
toNumber({a: 1}) // returns null
toNumber(true()) // returns 1
toNumber("10f") // returns 0
```
<a name="toString"></a>

## toString(arg) ⇒ <code>string</code>
Converts the provided argument to a string.
The conversion happens as per the type coercion rules.

**Kind**: global function  
**Returns**: <code>string</code> - The result string  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>any</code> | Value to be converted to a string |

**Example**  
```js
toString(1) // returns "1"
toString(true()) // returns "true"
toString({sum: 12 + 13}) // "{"sum":25}"
```
<a name="trim"></a>

## trim(text) ⇒ <code>string</code>
Remove leading and trailing spaces, and replace all internal multiple spaces
with a single space.

**Kind**: global function  
**Returns**: <code>string</code> - trimmed string  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | string to trim |

**Example**  
```js
trim("   ab    c   ") // returns "ab c"
```
<a name="true"></a>

## true() ⇒ <code>boolean</code>
Return constant boolean true value.
Note that expressions may also use the JSON literal true: `` `true` ``

**Kind**: global function  
**Returns**: <code>boolean</code> - True  
<a name="trunc"></a>

## trunc(numA, [numB]) ⇒ <code>number</code>
Truncates a number to an integer by removing the fractional part of the number.

**Kind**: global function  
**Returns**: <code>number</code> - Truncated value  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| numA | <code>number</code> |  | number to truncate |
| [numB] | <code>integer</code> | <code>0</code> | A number specifying the number of decimal digits to preserve. |

**Example**  
```js
trunc(8.9) // returns 8
trunc(-8.9) // returns -8
trunc(8.912, 2) // returns 8.91
```
<a name="type"></a>

## type(subject) ⇒ <code>string</code>
Finds the JavaScript type of the given `subject` argument as a string value.
The return value MUST be one of the following:

* number
* string
* boolean
* array
* object
* null

**Kind**: global function  
**Returns**: <code>string</code> - The type of the subject  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>any</code> | type to evaluate |

**Example**  
```js
type(1) // returns "number"
type("") // returns "string"
```
<a name="unique"></a>

## unique(input) ⇒ <code>array</code>
Find the set of unique elements within an array

**Kind**: global function  
**Returns**: <code>array</code> - array with duplicate elements removed  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>array</code> | input array |

**Example**  
```js
unique([1, 2, 3, 4, 1, 1, 2]) // returns [1, 2, 3, 4]
```
<a name="upper"></a>

## upper(input) ⇒ <code>string</code>
Converts all the alphabetic characters in a string to uppercase.
If the value is not a string it will be converted into string
according to the type coercion rules.

**Kind**: global function  
**Returns**: <code>string</code> - the upper case value of the input string  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | input string |

**Example**  
```js
upper("abcd") // returns "ABCD"
```
<a name="value"></a>

## value(object, index) ⇒ <code>any</code>
Perform an indexed lookup on an object or array

**Kind**: global function  
**Returns**: <code>any</code> - the result of the lookup -- or `null` if not found.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> \| <code>array</code> | on which to perform the lookup |
| index | <code>string</code> \| <code>integer</code> | a named child for an object or an integer offset for an array |

**Example**  
```js
value({a: 1, b:2, c:3}, "a") // returns 1
value([1, 2, 3, 4], 2) // returns 3
```
<a name="values"></a>

## values(obj) ⇒ <code>array</code>
Generates an array of the values of the provided object.
Note that because JSON objects are
inherently unordered, the values associated with the provided object are
also unordered.

**Kind**: global function  
**Returns**: <code>array</code> - array of the key values  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | source object |

**Example**  
```js
values({a : 3, b : 4}) // returns [3, 4]
```
<a name="weekday"></a>

## weekday(date, [returnType]) ⇒ <code>integer</code>
Extract the day of the week from a date.
The specific numbering of the day of week is controlled by the `returnType` parameter:

* 1 : Sunday (1), Monday (2), ..., Saturday (7)
* 2 : Monday (1), Tuesday (2), ..., Sunday(7)
* 3 : Monday (0), Tuesday (2), ...., Sunday(6)

**Kind**: global function  
**Returns**: <code>integer</code> - day of the week  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>number</code> |  | datetime for which the day of the week is to be returned. Date/time values can be generated using the [datetime](#datetime), [today](#today), [now](#now) and [time](#time) functions. |
| [returnType] | <code>integer</code> | <code>1</code> | Determines the representation of the result |

**Example**  
```js
weekday(datetime(2006,5,21)) // 1
weekday(datetime(2006,5,21), 2) // 7
weekday(datetime(2006,5,21), 3) // 6
```
<a name="year"></a>

## year(date) ⇒ <code>integer</code>
Finds the year of a datetime value

**Kind**: global function  
**Returns**: <code>integer</code> - The year value  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>number</code> | input date/time value. Date/time values can be generated using the [datetime](#datetime), [today](#today), [now](#now) and [time](#time) functions. |

**Example**  
```js
year(datetime(2008,5,23)) // returns 2008
```
<a name="zip"></a>

## zip(...arrays) ⇒ <code>array</code>
Generates a convolved (zipped) array containing grouped arrays of values from
the array arguments from index 0, 1, 2, etc.
This function accepts a variable number of arguments.
The length of the returned array is equal to the length of the shortest array.

**Kind**: global function  
**Returns**: <code>array</code> - An array of arrays with elements zipped together  

| Param | Type | Description |
| --- | --- | --- |
| ...arrays | <code>array</code> | array of arrays to zip together |

**Example**  
```js
zip([1, 2, 3], [4, 5, 6, 7]) // returns [[1, 4], [2, 5], [3, 6]]
```
<a name="encodeUrlComponent"></a>

## encodeUrlComponent(uriComponent) ⇒ <code>string</code>
Encode a URL component as per: [encodeUrlComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

**Kind**: global function  
**Returns**: <code>string</code> - encoded value  

| Param | Type | Description |
| --- | --- | --- |
| uriComponent | <code>string</code> | to encode |

**Example**  
```js
encodeURIComponent("a=b") // returns "a%3Db"
```
<a name="encodeUrl"></a>

## encodeUrl(uri) ⇒ <code>string</code>
Encode a URL as per: [encodeURI()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)

**Kind**: global function  
**Returns**: <code>string</code> - encoded value  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | to encode |

**Example**  
```js
encodeUrl("https://example.com/&a=4% of 15") // returns ("a=b") // https://example.com/&a=4%25%20of%2015
```
<a name="decodeUrlComponent"></a>

## decodeUrlComponent(encodedString) ⇒ <code>string</code>
Decode a URL component as per: [decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)

**Kind**: global function  
**Returns**: <code>string</code> - decoded value  

| Param | Type | Description |
| --- | --- | --- |
| encodedString | <code>string</code> | to decode |

**Example**  
```js
decodeUrlComponent("%3B%2C%2F%3F%3A%40%26%3D%2B%24") // ";,/?:@&=+$"
```
<a name="decodeUrl"></a>

## decodeUrl(encodedURL) ⇒ <code>string</code>
Decode a URL as per: [decodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)

**Kind**: global function  
**Returns**: <code>string</code> - decoded URL  

| Param | Type | Description |
| --- | --- | --- |
| encodedURL | <code>string</code> | to decode |

**Example**  
```js
decodeUrl("https://example.com/?foo=%5Ba%25%5D") // "https://example.com/?foo=[a%]"
```
