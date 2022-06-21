<a name="zip"></a>

## zip(...arrays) ⇒ <code>array</code>
Returns a convolved (zipped) array containing grouped arrays of values from
the array arguments from index 0, 1, 2, etc.
This function accepts a variable number of arguments.
The length of the returned array is equal to the length of the shortest array.

**Kind**: global function  
**Returns**: <code>array</code> - An array of arrays with elements zipped together  

| Param | Type | Description |
| --- | --- | --- |
| ...arrays | <code>array</code> | array of arrays to zip together |

<a name="casefold"></a>

## casefold(input) ⇒ <code>string</code>
Return a lower-case string using locale-specific mappings.
e.g. Strings with German lowercase letter 'ß' can be compared to 'ss'

**Kind**: global function  
**Returns**: <code>string</code> - A new string converted to lower case  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | string to casefold |

<a name="and"></a>

## and(first, ...operand) ⇒ <code>boolean</code>
Returns the logical AND result of all parameters

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical result of applying AND to all parameters  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>any</code> | logical expression -- will be cast to boolean |
| ...operand | <code>any</code> | any number of additional expressions |

**Example**  
```js
and(10 > 8, length('foo') < 5)
// true
```
<a name="or"></a>

## or(first, ...operand) ⇒ <code>boolean</code>
Returns the logical OR result of two parameters

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical result of applying OR to all parameters  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>any</code> | logical expression -- will be cast to boolean |
| ...operand | <code>any</code> | any number of additional expressions |

**Example**  
```js
or((x / 2) == y, (y * 2) == x)
// true
```
<a name="not"></a>

## not() ⇒ <code>boolean</code>
Compute logical NOT
Note that it is also possible to use the logical and operator: `A && B`

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical NOT applied to the input parameter  

| Type | Description |
| --- | --- |
| <code>any</code> | any data type -- will be cast to boolean |

**Example**  
```js
not(length('bar') > 0)
// false
```
<a name="true"></a>

## true() ⇒ <code>boolean</code>
Return constant boolean true value.
Note that expressions may also use the JSON literal true: `` `true` ``

**Kind**: global function  
**Returns**: <code>boolean</code> - True  
<a name="false"></a>

## false() ⇒ <code>boolean</code>
Return constant boolean false value.
Note that expressions may also use the JSON literal false: `` `false` ``

**Kind**: global function  
**Returns**: <code>boolean</code> - False  
<a name="if"></a>

## if(condition, result1, result2) ⇒ <code>boolean</code> \| <code>any</code>
Return one of two values, depending on a condition

**Kind**: global function  
**Returns**: <code>boolean</code> - True<code>any</code> - either result1 or result2  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>any</code> | logical expression to evaluate |
| result1 | <code>any</code> | if logical condition is true |
| result2 | <code>any</code> | if logical condition is false |

<a name="substitute"></a>

## substitute(text, old, new, which) ⇒ <code>string</code>
Returns input `text`, with text `old` replaced by text `new` (when searching from the left).
If `which` parameter is omitted, every occurrence of `old` is replaced with `new`;
If `which` is provided, only that occurrence of `old` is replaced by `new`
(starting the count from 1).
If there is no match, or if `old` has length 0, `text` is returned unchanged.
Note that `old` and `new` may have different lengths. If `which` < 1, return `text` unchanged

**Kind**: global function  
**Returns**: <code>string</code> - replaced string  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> |  |
| old | <code>string</code> | text |
| new | <code>string</code> | text |
| which | <code>integer</code> | (optional) which occurence to replace |

<a name="value"></a>

## value(object, index:) ⇒ <code>any</code>
Perform an indexed lookup on a map or array

**Kind**: global function  
**Returns**: <code>any</code> - the result of the lookup -- or `null` if not found.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>map</code> \| <code>array</code> | on which to perform the lookup |
| index: | <code>string</code> \| <code>integer</code> | a named child for a map or an integer offset for an array |

<a name="datetime"></a>

## datetime(year, day, hours, (optional), (optional), (optional), (optional)) ⇒ <code>number</code>
Return a date/time value.

**Kind**: global function  
**Returns**: <code>number</code> - the new date/time value  

| Param | Type | Description |
| --- | --- | --- |
| year | <code>integer</code> |  |
| day | <code>integer</code> |  |
| hours | <code>integer</code> |  |
| (optional) | <code>integer</code> | minutes |
| (optional) | <code>integer</code> | seconds |
| (optional) | <code>integer</code> | milliseconds |
| (optional) | <code>string</code> | time zone name -- according to IANA time zone names. e.g. "America/Toronto" |

<a name="datedif"></a>

## datedif(start_date, end_date, unit) ⇒ <code>integer</code>
Return a datetime value.

**Kind**: global function  
**Returns**: <code>integer</code> - The number of days/months/years difference  

| Param | Type | Description |
| --- | --- | --- |
| start_date | <code>number</code> | The starting date |
| end_date | <code>number</code> | The end date -- must be greater or equal to start_date |
| unit | <code>string</code> | One of:           `y` the number of whole years between start_date and end_date           `m` the number of whole months between start_date and end_date.           `d` the number of days between start_date and end_date           `md` the number of days between start_date and end_date after subtracting whole months.           `ym` the number of whole months between start_date and end_date              after subtracting whole years.           `yd` the number of days between start_date and end_date, assuming start_date              and end_date were no more than one year apart |

<a name="eomonth"></a>

## eomonth(startDate, monthAdd) ⇒ <code>integer</code>
Summary: Returns the serial number of the end of a month, given date plus MonthAdd months

**Kind**: global function  
**Returns**: <code>integer</code> - the number of days in the computed month  

| Param | Type | Description |
| --- | --- | --- |
| startDate | <code>number</code> | The base date to start from |
| monthAdd | <code>integer</code> | Number of months to add to start date |

