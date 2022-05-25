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

