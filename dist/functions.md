<a name="casefold"></a>

## casefold(input) ⇒ <code>string</code>
Returns a lower-case string of the `input` string using locale-specific mappings.
e.g. Strings with German lowercase letter 'ß' can be compared to 'ss'

**Kind**: global function  
**Returns**: <code>string</code> - A new string converted to lower case  
**Category**: JSONFormula  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | string to casefold |

**Example**  
```js
casefold('AbC') // returns 'abc'
```
<a name="datetime"></a>

## datetime(year, month, day, [hours], [minutes], [seconds], [milliseconds]) ⇒ <code>number</code>
Return a date/time value.

**Kind**: global function  
**Returns**: <code>number</code> - A date/time value represented by number of seconds since 1 January 1970.  
**Category**: JSONFormula  

| Param | Type | Description |
| --- | --- | --- |
| year | <code>integer</code> | Integer value representing the year. Values from 0 to 99 map to the years 1900 to 1999. All other values are the actual year |
| month | <code>integer</code> | Integer value representing the month, beginning with 1 for January to 12 for December. |
| day | <code>integer</code> | Integer value representing the day of the month. |
| [hours] | <code>integer</code> | Integer value between 0 and 23 representing the hour of the day. Defaults to 0. |
| [minutes] | <code>integer</code> | Integer value representing the minute segment of a time. The default is 0 minutes past the hour. |
| [seconds] | <code>integer</code> | Integer value representing the second segment of a time. The default is 0 seconds past the minute. |
| [milliseconds] | <code>integer</code> | Integer value representing the millisecond segment of a time. The default is 0 milliseconds past the second. |

**Example**  
```js
datetime(2010, 10, 10) // returns representation of October 10, 2010
```
**Example**  
```js
datetime(2010, 2, 28) // returns representation of February 28, 2010
```
<a name="deepScan"></a>

## deepScan(object, name) ⇒ <code>any</code>
Searches a nested hierarchy of objects to return an array of elements that match a `name`.
The name can be either a key into a map or an array index.
This is similar to the JSONPath deep scan operator (..)

**Kind**: global function  
**Category**: JSONFormula  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The starting object or array where we start the search |
| name | <code>string</code> | The name (or index position) of the elements to find |

**Example**  
```js
deepScan({a : {b1 : {c : 2}, b2 : {c : 3}}}, 'c') //returns [2, 3]
```
<a name="entries"></a>

## entries(obj) ⇒ <code>Array.&lt;any&gt;</code>
returns an array of a given object's property `[key, value]` pairs.

**Kind**: global function  
**Returns**: <code>Array.&lt;any&gt;</code> - an array of [key, value] pairs  
**Category**: JSONFormula  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Object whose `[key, value]` pairs need to be extracted |

**Example**  
```js
entries({a: 1, b: 2}) //returns [['a', 1], ['b', 2]]
```
<a name="fromEntries"></a>

## fromEntries(pairs) ⇒ <code>object</code>
returns an object by transforming a list of key-value `pairs` into an object.

**Kind**: global function  
**Category**: JSONFormula  

| Param | Type | Description |
| --- | --- | --- |
| pairs | <code>Array.&lt;any&gt;</code> | list of key-value pairs to create the object from |

**Example**  
```js
fromEntries([['a', 1], ['b', 2]]) //returns {a: 1, b: 2}
```
<a name="null"></a>

## null() ⇒ <code>boolean</code>
Return constant null value.
Note that expressions may also use the JSON literal null: `` `null` ``

**Kind**: global function  
**Returns**: <code>boolean</code> - True  
**Category**: JSONFormula  
<a name="unique"></a>

## unique(input) ⇒ <code>array</code>
takes an array and returns unique elements within it

**Kind**: global function  
**Returns**: <code>array</code> - array with duplicate elements removed  
**Category**: JSONFormula  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>array</code> | input array |

**Example**  
```js
unique([1, 2, 3, 4, 1, 1, 2]) //returns [1, 2, 3, 4]
```
<a name="value"></a>

## value(object, index:) ⇒ <code>any</code>
Perform an indexed lookup on a map or array

**Kind**: global function  
**Returns**: <code>any</code> - the result of the lookup -- or `null` if not found.  
**Category**: JSONFormula  

| Param | Type | Description |
| --- | --- | --- |
| object | [<code>map</code>](#map) \| <code>array</code> | on which to perform the lookup |
| index: | <code>string</code> \| <code>integer</code> | a named child for a map or an integer offset for an array |

**Example**  
```js
value({a: 1, b:2, c:3}, a) //returns 1
```
**Example**  
```js
value([1, 2, 3, 4], 2) //returns 3
```
<a name="abs"></a>

## abs(value) ⇒ <code>number</code>
Returns the absolute value of the provided argument `value`.

**Kind**: global function  
**Returns**: <code>number</code> - returns the absolute value of the `value` argument  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | argument whose absolute value has to be returned |

**Example**  
```js
abs(-1) //returns 1
```
<a name="avg"></a>

## avg(elements) ⇒ <code>number</code>
Returns the average of the elements in the provided array.
An empty array will produce a return value of `null`.

**Kind**: global function  
**Returns**: <code>number</code> - average value  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>Array.&lt;number&gt;</code> | array of elements whose average has to be computed |

**Example**  
```js
avg([]) //returns null
```
**Example**  
```js
avg([1, 2, 3]) //returns 2
```
<a name="ceil"></a>

## ceil(num) ⇒ <code>number</code>
Returns the next highest integer value of the argument `num` by rounding up if necessary.

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | number whose next highest integer value has to be computed |

**Example**  
```js
ceil(10) //returns 10
```
**Example**  
```js
ceil(10.4) //return 11
```
<a name="contains"></a>

## contains(subject, search) ⇒ <code>boolean</code>
Returns true if the given `subject` contains the provided `search` string.
If `subject` is an array, this function returns true if one of the elements
in the array is equal to the provided `search` value. If the provided `subject`
 is a string, this function returns true if the string contains the provided
`search` argument.

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>array</code> \| <code>string</code> | the subject in which the element has to be searched |
| search | <code>string</code> \| <code>boolean</code> \| <code>number</code> \| <code>date</code> | element to search |

**Example**  
```js
contains([1, 2, 3, 4], 2) //returns true
```
**Example**  
```js
contains([1, 2, 3, 4], -1) //returns false
```
**Example**  
```js
contains('Abcd', 'd') //returns true
```
**Example**  
```js
contains('Abcd', 'x') //returns false
```
<a name="endsWith"></a>

## endsWith(subject, suffix) ⇒ <code>boolean</code>
Returns true if the `subject` ends with the `suffix`, otherwise this function returns false.

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>string</code> | subject in which the `suffix` is being searched for |
| suffix | <code>string</code> | suffix to search in the subject |

**Example**  
```js
endsWith('Abcd', 'd') //returns true
```
**Example**  
```js
endsWith('Abcd', 'A') //returns false
```
<a name="floor"></a>

## floor(num) ⇒ <code>number</code>
Returns the next lowest integer value of the argument `num` by rounding down if necessary.

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | number whose next lowest integer value has to be returned |

**Example**  
```js
floor(10.4) //returns 10
```
**Example**  
```js
floor(10) //returns 10
```
<a name="join"></a>

## join(glue, stringsarray) ⇒ <code>string</code>
Returns all the elements from the provided `stringsarray`
array joined together using the `glue` argument as a separator between each.

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| glue | <code>string</code> | 
| stringsarray | <code>Array.&lt;string&gt;</code> | 

**Example**  
```js
join(',', ['a', 'b', 'c']) //returns 'a,b,c'
```
<a name="keys"></a>

## keys(obj) ⇒ <code>array</code>
Returns an array containing the keys of the provided object `obj`. If the passed
object is null, the value returned is an empty array

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | the object whose keys need to be extracted |

**Example**  
```js
keys({a : 3, b : 4}) //returns ['a', 'b']
```
<a name="length"></a>

## length(subject) ⇒ <code>number</code>
Returns the length of the given argument `subject` using the following types rules:
* string: returns the number of code points in the string
* array: returns the number of elements in the array
* object: returns the number of key-value pairs in the object

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>string</code> \| <code>array</code> \| <code>object</code> | subject whose length has to be calculated |

**Example**  
```js
length([]) //returns 0
```
**Example**  
```js
length('') //returns 0
```
**Example**  
```js
length('abcd') //returns 4
```
**Example**  
```js
length([1, 2, 3, 4]) //returns 4
```
**Example**  
```js
length({}) // returns 0
```
**Example**  
```js
length({a : 3, b : 4}) //returns 2
```
<a name="map"></a>

## map(expr, elements) ⇒ <code>array</code>
Apply the `expr` to every element in the `elements` array and return the array of results.
An elements of length N will produce a return array of length N. Unlike a projection,
`[*].bar`, `map()` will include the result of applying the `expr` for every element
in the elements array, even if the result is `null`.

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| expr | <code>expression</code> | expression to evaluate on each element |
| elements | <code>array</code> | array of elements on which the expression will be evaluated |

**Example**  
```js
map(&(@ + 1), [1, 2, 3, 4]) // returns [2, 3, 4, 5]
```
**Example**  
```js
map(&length(@), ['doe', 'nick', 'chris']) // returns [3,4, 5]
```
<a name="max"></a>

## max(collection) ⇒ <code>number</code>
Returns the highest value in the provided `collection` arguments.
If all collections are empty `null` is returned.
max() can work on numbers or strings.
If a mix of numbers and strings are provided, the type of the first value will be used.

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> | array in which the maximum element is to be calculated |

**Example**  
```js
max([1, 2, 3], [4, 5, 6], 7) //returns 7
```
**Example**  
```js
max([]) // returns null
```
**Example**  
```js
max(['a', 'a1', 'b']) // returns 'b'
```
<a name="merge"></a>

## merge(...args) ⇒ <code>object</code>
Accepts 0 or more objects as arguments, and returns a single object with
subsequent objects merged. Each subsequent object’s key/value pairs are
added to the preceding object. This function is used to combine multiple
objects into one. You can think of this as the first object being the base object,
and each subsequent argument being overrides that are applied to the base object.

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| ...args | <code>object</code> | 

**Example**  
```js
merge({a: 1, b: 2}, {c : 3, d: 4}) // returns {a :1, b: 2, c: 3, d: 4}
```
**Example**  
```js
merge({a: 1, b: 2}, {a : 3, d: 4}) // returns {a :3, b: 2, d: 4}
```
<a name="min"></a>

## min(collection) ⇒ <code>number</code>
Returns the lowest value in the provided `collection` arguments.
If all collections are empty `null` is returned.
min() can work on numbers or strings.
If a mix of numbers and strings are provided, the type of the first value will be used.

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> | array in which the minimum element is to be calculated |

**Example**  
```js
min([1, 2, 3], [4, 5, 6], 7) //returns 1
```
**Example**  
```js
min([]) // returns null
```
**Example**  
```js
min(['a', 'a1', 'b']) // returns 'a'
```
<a name="notNull"></a>

## notNull(...argument) ⇒ <code>any</code>
Returns the first argument that does not resolve to `null`.
This function accepts one or more arguments, and will evaluate
them in order until a non null argument is encounted. If all
arguments values resolve to null, then a value of null is returned.

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| ...argument | <code>any</code> | 

**Example**  
```js
notNull(1, 2, 3, 4, `null`) //returns 1
```
**Example**  
```js
notNull(`null`, 2, 3, 4, `null`) //returns 2
```
<a name="reduce"></a>

## reduce(expr, elements) ⇒ <code>any</code>
executes a user-supplied reducer expression `expr` on each element of the
array, in order, passing in the return value from the calculation on the preceding element.
The final result of running the reducer across all elements of the `elements` array is a
single value.
The expression can access the following properties
* accumulated: accumulated value based on the previous calculations. Initial value is `null`
* current: current element to process
* index: index of the `current` element in the array
* array: original array

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| expr | <code>expression</code> | reducer expr to be executed on each element |
| elements | <code>array</code> | array of elements on which the expression will be evaluated |

**Example**  
```js
reduce(&(accumulated + current), [1, 2, 3]) //returns 6
```
**Example**  
```js
// find maximum entry by age
reduce(
  &max(@.accumulated.age, @.current.age),
  [{age: 10, name: 'Joe'},{age: 20, name: 'John'}], @[0].age
)
```
**Example**  
```js
reduce(&if(accumulated == `null`, current, accumulated * current), [3, 3, 3]) //returns 27
```
<a name="register"></a>

## register(functionName, expr) ⇒ <code>Object</code>
Register a function to allow code re-use.  The registered function may take one parameter.
If more parameters are needed, combine them in an array or map.

**Kind**: global function  
**Returns**: <code>Object</code> - returns an empty object  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| functionName | <code>string</code> | Name of the function to register |
| expr | <code>expression</code> | Expression to execute with this function call |

**Example**  
```js
register('product', &@[0] * @[1]) // can now call: product([2,21]) => returns 42
```
<a name="reverse"></a>

## reverse(argument) ⇒ <code>array</code>
Reverses the order of the `argument`.

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| argument | <code>string</code> \| <code>array</code> | 

**Example**  
```js
reverse(['a', 'b', 'c']) //returns ['c', 'b', 'a']
```
<a name="sort"></a>

## sort(list) ⇒ <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code>
This function accepts an array `list` argument and returns the sorted elements of
the `list` as an array. The array must be a list of strings or numbers.
Sorting strings is based on code points. Locale is not taken into account.

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| list | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> | 

**Example**  
```js
sort([1, 2, 4, 3, 1]) // returns [1, 1, 2, 3, 4]
```
<a name="sortBy"></a>

## sortBy(elements, expr) ⇒ <code>array</code>
Sort an array using an expression `expr` as the sort key. For each element
in the array of elements, the `expr` expression is applied and the resulting
value is used as the key used when sorting the elements. If the result of
evaluating the `expr` against the current array element results in type
other than a number or a string, a type error will occur.

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| elements | <code>array</code> | 
| expr | <code>expression</code> | 

**Example**  
```js
sortBy(['abcd', 'e', 'def'], &length(@)) //returns ['e', 'def', 'abcd']
```
**Example**  
```js
// returns [{year: 1910}, {year: 2010}, {year: 2020}]
sortBy([{year: 2010}, {year: 2020}, {year: 1910}], &year)
```
<a name="startsWith"></a>

## startsWith(subject, prefix) ⇒ <code>boolean</code>
Returns true if the `subject` starts with the `prefix`, otherwise returns false.

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>string</code> | subject in which the `prefix` is being searched for |
| prefix | <code>string</code> | prefix to search in the subject |

**Example**  
```js
startsWith('jack is at home', 'jack') // returns true
```
<a name="sum"></a>

## sum(collection) ⇒ <code>number</code>
Returns the sum of the provided `collection` array argument.
An empty array will produce a return value of 0.

**Kind**: global function  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>Array.&lt;number&gt;</code> | array whose element's sum has to be computed |

**Example**  
```js
sum([1, 2, 3]) //returns 6
```
<a name="toArray"></a>

## toArray(arg) ⇒ <code>array</code>
converts the passed `arg` to an array. The conversion happens as per the following rules
* array - Returns the passed in value.
* number/string/object/boolean - Returns a one element array containing the argument.

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| arg | <code>any</code> | 

**Example**  
```js
toArray(1) // returns [1]
```
**Example**  
```js
toArray(null()) // returns [`null`]
```
<a name="toNumber"></a>

## toNumber(arg) ⇒ <code>number</code>
converts the passed arg to a number. The conversion happens as per the following rules
* string - Returns the parsed number.
* number - Returns the passed in value.
* array - null
* object - null
* boolean - null
* null - null

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| arg | <code>any</code> | 

**Example**  
```js
toNumber(1) //returns 1
```
**Example**  
```js
toNumber('10') //returns 10
```
**Example**  
```js
toNumber({a: 1}) //returns null
```
**Example**  
```js
toNumber(true()) //returns null
```
<a name="toString"></a>

## toString(arg) ⇒ <code>string</code>
converts the passed `arg` to a string. The conversion happens as per the following rules
* string - Returns the passed in value.
* number/array/object/boolean - The JSON encoded value of the object.

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| arg | <code>any</code> | 

**Example**  
```js
toString(1) //returns '1'
```
**Example**  
```js
toString(true()) //returns 'true'
```
<a name="type"></a>

## type(subject) ⇒ <code>string</code>
Returns the JavaScript type of the given `subject` argument as a string value.

The return value MUST be one of the following:
* number
* string
* boolean
* array
* object
* null

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| subject | <code>any</code> | 

**Example**  
```js
type(1) //returns 'number'
```
**Example**  
```js
type('') //returns 'string'
```
<a name="values"></a>

## values(obj) ⇒ <code>array</code>
Returns the values of the provided object `obj`. Note that because JSON hashes are
inherently unordered, the values associated with the provided object obj are
inherently unordered.

**Kind**: global function  
**Category**: jmespath  

| Param | Type |
| --- | --- |
| obj | <code>object</code> | 

**Example**  
```js
values({a : 3, b : 4}) //returns [3, 4]
```
<a name="zip"></a>

## zip(...arrays) ⇒ <code>array</code>
Returns a convolved (zipped) array containing grouped arrays of values from
the array arguments from index 0, 1, 2, etc.
This function accepts a variable number of arguments.
The length of the returned array is equal to the length of the shortest array.

**Kind**: global function  
**Returns**: <code>array</code> - An array of arrays with elements zipped together  
**Category**: jmespath  

| Param | Type | Description |
| --- | --- | --- |
| ...arrays | <code>array</code> | array of arrays to zip together |

**Example**  
```js
zip([1, 2, 3], [4, 5, 6]) //returns [[1, 4], [2, 5], [3, 6]]
```
<a name="and"></a>

## and(firstOperand, [...additionalOperands]) ⇒ <code>boolean</code>
Returns the logical AND result of all parameters.
If the parameters are not boolean they will be cast to boolean as per the following rules
* null -> false
* number -> false if the number is 0, true otherwise
* string -> false if the string is empty, true otherwise. String "false" resolves to true
* array -> true
* object -> true

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical result of applying AND to all parameters  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| firstOperand | <code>any</code> | logical expression |
| [...additionalOperands] | <code>any</code> | any number of additional expressions |

**Example**  
```js
and(10 > 8, length('foo') < 5) // returns true
```
**Example**  
```js
and(`null`, length('foo') < 5) // returns false
```
<a name="datedif"></a>

## datedif(start_date, end_date, unit) ⇒ <code>integer</code>
Return difference between two date values.

**Kind**: global function  
**Returns**: <code>integer</code> - The number of days/months/years difference  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| start_date | <code>number</code> | The starting date. Dates should be entered by using the [datetime](#datetime) function |
| end_date | <code>number</code> | The end date -- must be greater or equal to start_date. Dates should be entered by using the [datetime](#datetime) function |
| unit | <code>string</code> | One of: * `y` the number of whole years between start_date and end_date * `m` the number of whole months between start_date and end_date. * `d` the number of days between start_date and end_date * `md` the number of days between start_date and end_date after subtracting whole months. * `ym` the number of whole months between start_date and end_date after subtracting whole years. * `yd` the number of days between start_date and end_date, assuming start_date and end_date were no more than one year apart |

**Example**  
```js
datedif(datetime(2001, 1, 1), datetime(2003, 1, 1), 'y') // returns 2
```
**Example**  
```js
datedif(datetime(2001, 6, 1), datetime(2003, 8, 15), 'D') // returns 440
// 440 days between June 1, 2001, and August 15, 2002 (440)
```
**Example**  
```js
datedif(datetime(2001, 6, 1), datetime(2003, 8, 15), 'YD') // returns 440
// 75 days between June 1 and August 15, ignoring the years of the dates (75)
```
<a name="day"></a>

## day(The) ⇒ <code>number</code>
Returns the day of a date, represented by a serial number.
The day is given as an integer ranging from 1 to 31.

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | date of the day you are trying to find. Dates should be entered by using the [datetime](#datetime) function |

**Example**  
```js
day(datetime(2008,5,23)) //returns 23
```
<a name="eomonth"></a>

## eomonth(startDate, monthAdd) ⇒ <code>integer</code>
Returns the serial number of the end of a month, given `startDate` plus `monthAdd` months

**Kind**: global function  
**Returns**: <code>integer</code> - the number of days in the computed month  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| startDate | <code>number</code> | The base date to start from. Dates should be entered by using the [datetime](#datetime) function |
| monthAdd | <code>integer</code> | Number of months to add to start date |

**Example**  
```js
eomonth(datetime(2011, 1, 1), 1) //returns datetime(2011, 2, 28)
```
**Example**  
```js
eomonth(datetime(2011, 1, 1), -3) //returns datetime(2010, 10, 31)
```
<a name="exp"></a>

## exp(x) ⇒ <code>number</code>
Returns e (the base of natural logarithms) raised to a power x. (i.e. e<sup>x</sup>)

**Kind**: global function  
**Returns**: <code>number</code> - e (the base of natural logarithms) raised to a power x  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | A numeric expression representing the power of e. |

**Example**  
```js
exp(10) //returns e^10
```
<a name="false"></a>

## false() ⇒ <code>boolean</code>
Return constant boolean false value.
Note that expressions may also use the JSON literal false: `` `false` ``

**Kind**: global function  
**Returns**: <code>boolean</code> - constant boolean value `false`  
**Category**: openFormula  
<a name="find"></a>

## find(query, text, [start]) ⇒ <code>number</code> \| [<code>null</code>](#null)
finds and returns the index of query in text from a start position

**Kind**: global function  
**Returns**: <code>number</code> \| [<code>null</code>](#null) - the index of the query to be searched in the text. If not found
returns null  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | string to search |
| text | <code>string</code> | text in which the query has to be searched |
| [start] | <code>number</code> | starting position: defaults to 0 |

**Example**  
```js
find('m', 'abm') //returns 2
```
**Example**  
```js
find('M', 'abMcdM', 3) //returns 2
```
**Example**  
```js
find('M', 'ab') //returns `null`
```
**Example**  
```js
find('M', 'abMcdM', 2) //returns 2
```
<a name="hour"></a>

## hour(The) ⇒ <code>number</code>
Extract the hour (0 through 23) from a time/datetime representation

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | datetime/time for which the hour is to be returned. Dates should be specified using the [datetime](#datetime) or [time](#time) function |

**Example**  
```js
hour(datetime(2008,5,23,12, 0, 0)) //returns 12
hour(time(12, 0, 0)) //returns 12
```
<a name="if"></a>

## if(condition, result1, result2) ⇒ <code>boolean</code> \| <code>any</code>
Return one of two values `result1` or `result2`, depending on the `condition`

**Kind**: global function  
**Returns**: <code>boolean</code> - True<code>any</code> - either result1 or result2  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>any</code> | logical expression to evaluate |
| result1 | <code>any</code> | if logical condition is true |
| result2 | <code>any</code> | if logical condition is false |

**Example**  
```js
if(true(), 1, 2) // returns 1
```
**Example**  
```js
if(false(), 1, 2) // returns 2
```
<a name="left"></a>

## left(subject, [elements]) ⇒ <code>string</code> \| <code>array</code>
Return a selected number of text characters from the left or
in case of array selected number of elements from the start

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>string</code> \| <code>array</code> | The text/array of characters/elements to extract. |
| [elements] | <code>number</code> | number of elements to pick. Defaults to 1 |

**Example**  
```js
left('Sale Price', 4) //returns 'Sale'
```
**Example**  
```js
left('Sweden') // returns 'S'
```
**Example**  
```js
left([4, 5, 6], 2) // returns [4, 5]
```
<a name="lower"></a>

## lower(input) ⇒ <code>string</code>
Converts all the alphabetic characters in a string to lowercase. If the value
is not a string it will be converted into string.

**Kind**: global function  
**Returns**: <code>string</code> - the lower case value of the input string  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | input string |

**Example**  
```js
lower('E. E. Cummings') //returns e. e. cummings
```
<a name="mid"></a>

## mid(subject, startPos, length) ⇒ <code>string</code> \| <code>array</code>
Returns extracted text, given an original text, starting position, and length.
or in case of array, extracts a subset of the array from start till the length
number of elements.
Returns null if the `startPos` is greater than the length of the array

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>string</code> \| <code>array</code> | the text string or array of characters or elements to extract. |
| startPos | <code>number</code> | the position of the first character or element to extract. The position starts with 0 |
| length | <code>number</code> | The number of characters or elements to return from text. If it is greater then the length of `subject` the argument is set to the length of the subject. |

**Example**  
```js
mid("Fluid Flow",1,5) //returns 'Fluid'
```
**Example**  
```js
mid("Fluid Flow",7,20) //returns 'Flow'
```
**Example**  
```js
mid("Fluid Flow",20,5) //returns `null`
```
<a name="minute"></a>

## minute(The) ⇒ <code>number</code>
Extract the minute (0 through 59) from a time/datetime representation

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | datetime/time for which the minute is to be returned. Dates should be specified using the [datetime](#datetime) or [time](#time) function |

**Example**  
```js
month(datetime(2008,5,23,12, 10, 0)) //returns 10
month(time(12, 10, 0)) //returns 10
```
<a name="mod"></a>

## mod(dividend, divisor) ⇒ <code>number</code>
Return the remainder when one number is divided by another number.
The sign is the same as divisor

**Kind**: global function  
**Returns**: <code>number</code> - Computes the remainder of `dividend`/`divisor`.  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| dividend | <code>number</code> | The number for which to find the remainder. |
| divisor | <code>number</code> | The number by which to divide number. |

**Example**  
```js
mod(3, 2) //returns 1
```
**Example**  
```js
mod(-3, 2) //returns 1
```
<a name="month"></a>

## month(The) ⇒ <code>number</code>
Returns the month of a date represented by a serial number.
The month is given as an integer, ranging from 1 (January) to 12 (December).

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | date for which the month is to be returned. Dates should be entered by using the [datetime](#datetime) function |

**Example**  
```js
month(datetime(2008,5,23)) //returns 5
```
<a name="not"></a>

## not(value) ⇒ <code>boolean</code>
Compute logical NOT of a `value`. If the parameter is not boolean it will be cast to boolean
as per the following rules
* null -> false
* number -> false if the number is 0, true otherwise
* string -> false if the string is empty, true otherwise. String "false" resolves to true
* array -> true
* object -> true
Note that it is also possible to use the logical and operator: `A && B`

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical NOT applied to the input parameter  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | any data type |

**Example**  
```js
not(length('bar') > 0) // returns false
```
**Example**  
```js
not(false()) // returns true
```
**Example**  
```js
not('abcd') // returns false
```
**Example**  
```js
not('') // returns true
```
<a name="now"></a>

## now() ⇒ <code>number</code>
returns the time since epoch with days as exponent and time of day as fraction

**Kind**: global function  
**Returns**: <code>number</code> - representation of current time as a number  
**Category**: openFormula  
<a name="or"></a>

## or(first, [...operand]) ⇒ <code>boolean</code>
Returns the logical OR result of two parameters.
If the parameters are not boolean they will be cast to boolean as per the following rules
* null -> false
* number -> false if the number is 0, true otherwise
* string -> false if the string is empty, true otherwise. String "false" resolves to true
* array -> true
* object -> true

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical result of applying OR to all parameters  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>any</code> | logical expression |
| [...operand] | <code>any</code> | any number of additional expressions |

**Example**  
```js
or((x / 2) == y, (y * 2) == x)
// true
```
<a name="power"></a>

## power(a, x) ⇒ <code>number</code>
Computes `a` raised to a power `x`. (a<sup>x</sup>)

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | The base number. It can be any real number. |
| x | <code>number</code> | The exponent to which the base number is raised. |

**Example**  
```js
power(10, 2) //returns 100 (10 raised to power 2)
```
<a name="proper"></a>

## proper(text) ⇒ <code>string</code>
Return the input string with the first letter of each word converted to an
uppercase letter and the rest of the letters in the word converted to lowercase.

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | the text to partially capitalize. |

**Example**  
```js
proper('this is a TITLE') //returns 'This Is A Title'
```
**Example**  
```js
proper('2-way street') //returns '2-Way Street'
```
**Example**  
```js
proper('76BudGet') //returns '76Budget'
```
<a name="replace"></a>

## replace(text, start, length, replacement) ⇒ <code>string</code>
Returns text where an old text is substituted at a given start position and
length, with a new text.

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | original text |
| start | <code>number</code> | index in the original text from where to begin the replacement. |
| length | <code>number</code> | number of characters to be replaced |
| replacement | <code>string</code> | string to replace at the start index |

**Example**  
```js
replace('abcdefghijk', 6, 5, '*') //returns abcde*k
```
**Example**  
```js
replace('2009',3,2,'10') //returns  2010
```
**Example**  
```js
replace('123456',1,3,'@') //returns @456
```
<a name="rept"></a>

## rept(text, count) ⇒ <code>string</code>
Return text repeated Count times.

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | text to repeat |
| count | <code>number</code> | number of times to repeat the text |

**Example**  
```js
rept('x', 5) //returns 'xxxxx'
```
<a name="right"></a>

## right(subject, [elements]) ⇒ <code>string</code> \| <code>array</code>
Return a selected number of text characters from the right of a `subject` or
in case of array selected number of elements from the end of `subject` array
Returns null if the number of elements is less than 0

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| subject | <code>string</code> \| <code>array</code> | The text/array containing the characters/elements to extract. |
| [elements] | <code>number</code> | number of elements to pick. Defaults to 1 |

**Example**  
```js
right('Sale Price', 4) //returns 'rice'
```
**Example**  
```js
left('Sweden') // returns 'n'
```
**Example**  
```js
left([4, 5, 6], 2) // returns [5, 6]
```
<a name="round"></a>

## round(num, precision) ⇒ <code>number</code>
Round a number to a specified `precision`.
### Remarks
* If `precision` is greater than zero, round to the specified number of decimal places.
* If `precision` is 0, round to the nearest integer.
* If `precision` is less than 0, round to the left of the decimal point.

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | number to round off |
| precision | <code>number</code> | number is rounded to the specified precision. |

**Example**  
```js
round(2.15, 1) //returns 2.2
```
**Example**  
```js
round(626.3,-3) //returns 1000 (Rounds 626.3 to the nearest multiple of 1000)
```
**Example**  
```js
round(626.3, 0) //returns 626
```
**Example**  
```js
round(1.98,-1) //returns 0 (Rounds 1.98 to the nearest multiple of 10)
```
**Example**  
```js
round(-50.55,-2) // -100 (round -50.55 to the nearest multiple of 100)
```
<a name="search"></a>

## search(findText, withinText, startPos) ⇒ <code>array</code>
Perform a wildcard search.  The search is case-sensitive and supports two forms of wildcards:
"*" finds a a sequence of characters and "?" finds a single character.
To use "*" or "?" as text values, precede them with a tilde ("~") character.
Note that the wildcard search is not greedy.
e.g. search('a*b', 'abb') will return [0, 'ab'] Not [0, 'abb']

**Kind**: global function  
**Returns**: <code>array</code> - returns an array with two values:
The start position of the found text and the text string that was found.
If a match was not found, an empty array is returned.  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| findText | <code>string</code> | the search string -- which may include wild cards. |
| withinText | <code>string</code> | The string to search. |
| startPos | <code>integer</code> | The zero-based position of withinText to start searching. Defaults to zero. |

**Example**  
```js
search('a?c', 'acabc') //returns [2, 'abc']
```
<a name="second"></a>

## second(The) ⇒ <code>number</code>
Extract the second (0 through 59) from a time/datetime representation

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | datetime/time for which the second is to be returned. Dates should be specified using the [datetime](#datetime) or [time](#time) function |

**Example**  
```js
second(datetime(2008,5,23,12, 10, 53)) //returns 53
second(time(12, 10, 53)) //returns 53
```
<a name="split"></a>

## split(string, separator) ⇒ <code>Array.&lt;string&gt;</code>
split a string into an array, given a separator

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | string to split |
| separator | <code>string</code> | separator where the split should occur |

**Example**  
```js
split('abcdef', '') //returns ['a', 'b', 'c', 'd', 'e', 'f']
```
**Example**  
```js
split('abcdef', 'e') //returns ['abcd', 'f']
```
<a name="sqrt"></a>

## sqrt(num) ⇒ <code>number</code>
Return the square root of a number

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | number whose square root has to be calculated |

**Example**  
```js
sqrt(4) //returns 2
```
<a name="stdev"></a>

## stdev(numbers) ⇒ <code>number</code>
Estimates standard deviation based on a sample.
`stdev` assumes that its arguments are a sample of the entire population.
If your data represents a entire population,
then compute the standard deviation using [stdevp](#stdevp).

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| numbers | <code>Array.&lt;number&gt;</code> | The array of numbers comprising the population |

**Example**  
```js
stdev([1345, 1301, 1368]) //returns 34.044089061098404
stdevp([1345, 1301, 1368]) //returns 27.797
```
<a name="stdevp"></a>

## stdevp(numbers) ⇒ <code>number</code>
Calculates standard deviation based on the entire population given as arguments.
`stdevp` assumes that its arguments are the entire population.
If your data represents a sample of the population,
then compute the standard deviation using [stdev](#stdev).

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| numbers | <code>Array.&lt;number&gt;</code> | The array of numbers comprising the population |

**Example**  
```js
stdevp([1345, 1301, 1368]) //returns 27.797
stdev([1345, 1301, 1368]) //returns 34.044
```
<a name="substitute"></a>

## substitute(text, old, new, [which]) ⇒ <code>string</code>
Returns input `text`, with text `old` replaced by text `new` (when searching from the left).
If `which` parameter is omitted, every occurrence of `old` is replaced with `new`;
If `which` is provided, only that occurrence of `old` is replaced by `new`
(starting the count from 1).
If there is no match, or if `old` has length 0, `text` is returned unchanged.
Note that `old` and `new` may have different lengths. If `which` < 1, return `text` unchanged

**Kind**: global function  
**Returns**: <code>string</code> - replaced string  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text for which to substitute characters. |
| old | <code>string</code> | The text to replace. |
| new | <code>string</code> | The text to replace `old` with. |
| [which] | <code>integer</code> | The one-based occurrence of `old` text to replace with `new` text. |

**Example**  
```js
substitute('Sales Data', 'Sales', 'Cost') //returns 'Cost Data'
```
**Example**  
```js
substitute('Quarter 1, 2008', '1', '2', 1) //returns 'Quarter 2, 2008'
```
**Example**  
```js
substitute('Quarter 1, 1008', '1', '2', 2) //returns 'Quarter 1, 2008'
```
<a name="time"></a>

## time(hours, minutes, seconds) ⇒ <code>number</code>
Construct and returns time from hours, minutes, and seconds.

**Kind**: global function  
**Returns**: <code>number</code> - Returns the fraction of the day consumed by the given time  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| hours | <code>integer</code> | Integer value between 0 and 23 representing the hour of the day. Defaults to 0. |
| minutes | <code>integer</code> | Integer value representing the minute segment of a time. The default is 0 minutes past the hour. |
| seconds | <code>integer</code> | Integer value representing the second segment of a time. The default is 0 seconds past the minute. |

**Example**  
```js
time(12, 0, 0) //returns 0.5 (half day)
```
<a name="today"></a>

## today() ⇒
returns the number of days since epoch

**Kind**: global function  
**Returns**: number  
**Category**: openFormula  
<a name="trim"></a>

## trim(text) ⇒ <code>string</code>
Remove leading and trailing spaces, and replace all internal multiple spaces
with a single space.

**Kind**: global function  
**Returns**: <code>string</code> - removes all leading and trailing space.
Any other sequence of 2 or more spaces is replaced with a single space.  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | string to trim |

**Example**  
```js
trim('   ab    c   ') //returns 'ab c'
```
<a name="true"></a>

## true() ⇒ <code>boolean</code>
Return constant boolean true value.
Note that expressions may also use the JSON literal true: `` `true` ``

**Kind**: global function  
**Returns**: <code>boolean</code> - True  
**Category**: openFormula  
<a name="trunc"></a>

## trunc(numA, [numB]) ⇒ <code>number</code>
Truncates a number to an integer by removing the fractional part of the number.

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| numA | <code>number</code> | number to truncate |
| [numB] | <code>number</code> | A number specifying the precision of the truncation. Default is 0 |

**Example**  
```js
trunc(8.9) //returns 8
trunc(-8.9) //returns -8
trunc(8.912, 2) //returns 8.91
```
<a name="upper"></a>

## upper(input) ⇒ <code>string</code>
Converts all the alphabetic characters in a string to uppercase.
If the value is not a string it will be converted into string
using the default toString method

**Kind**: global function  
**Returns**: <code>string</code> - the upper case value of the input string  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | input string |

**Example**  
```js
upper('abcd') //returns 'ABCD'
```
<a name="weekday"></a>

## weekday(The, [returnType]) ⇒ <code>number</code>
Extract the day of the week from a date; if text, uses current locale to convert to a date.

**Kind**: global function  
**Returns**: <code>number</code> - day of the week  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | datetime for which the day of the week is to be returned. Dates should be entered by using the [datetime](#datetime) function |
| [returnType] | <code>number</code> | A number that determines the numeral representation (a number from 0 to 7) of the day of week. Default is 1. Supports the following values * 1 : Sunday (1), Monday (2), ..., Saturday (7) * 2 : Monday (1), Tuesday (2), ..., Sunday(7) * 3 : Monday (0), Tuesday (2), ...., Sunday(6) |

**Example**  
```js
weekday(datetime(2006,5,21)) // 1
```
**Example**  
```js
weekday(datetime(2006,5,21), 2) // 7
```
**Example**  
```js
weekday(datetime(2006,5,21), 3) // 6
```
<a name="year"></a>

## year(The) ⇒ <code>number</code>
Returns the year of a date represented by a serial number.

**Kind**: global function  
**Category**: openFormula  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>number</code> | date for which the year is to be returned. Dates should be entered by using the [datetime](#datetime) function |

**Example**  
```js
year(datetime(2008,5,23)) //returns 2008
```
