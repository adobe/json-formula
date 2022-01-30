 Functions

<dl>
<dt><a href="#casefold">casefold()</a> ⇒ <code>string</code></dt>
<dd><p>Return a lower-case string using locale-specific mappings.
e.g. Strings with German lowercase letter &#39;ß&#39; can be compared to &#39;ss&#39;</p>
</dd>
<dt><a href="#toMap">toMap(Any)</a> ⇒ <code>map</code></dt>
<dd><p>Create a new map by providing expressions for the key and value</p>
</dd>
<dt><a href="#and">and()</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns the logical AND result of two parameters</p>
</dd>
<dt><a href="#or">or()</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns the logical OR result of two parameters</p>
</dd>
<dt><a href="#not">not()</a> ⇒ <code>boolean</code></dt>
<dd><p>Compute logical NOT
Note that it is also possible to use the logical and operator: <code>A &amp;&amp; B</code></p>
</dd>
<dt><a href="#true">true()</a> ⇒ <code>boolean</code></dt>
<dd><p>Return constant boolean true value.
Note that expressions may also use the JSON literal true: <code>`true`</code></p>
</dd>
<dt><a href="#false">false()</a> ⇒ <code>boolean</code></dt>
<dd><p>Return constant boolean false value.
Note that expressions may also use the JSON literal false: <code>`false`</code></p>
</dd>
<dt><a href="#if">if(Logical, result1, result2)</a> ⇒ <code>boolean</code> | <code>any</code></dt>
<dd><p>Return one of two values, depending on a condition</p>
</dd>
<dt><a href="#substitute">substitute(text, old, new, which)</a> ⇒ <code>string</code></dt>
<dd><p>Returns input <code>text</code>, with text <code>old</code> replaced by text <code>new</code> (when searching from the left).
If <code>which</code> parameter is omitted, every occurrence of <code>old</code> is replaced with <code>new</code>;
If <code>which</code> is provided, only that occurrence of <code>old</code> is replaced by <code>new</code>
(starting the count from 1).
If there is no match, or if <code>old</code> has length 0, <code>text</code> is returned unchanged.
Note that <code>old</code> and <code>new</code> may have different lengths. If <code>which</code> &lt; 1, return <code>text</code> unchanged</p>
</dd>
<dt><a href="#value">value(object, index:)</a> ⇒ <code>any</code></dt>
<dd><p>Perform an indexed lookup on a map or array</p>
</dd>
</dl>

<a name="casefold"></a>

 casefold() ⇒ <code>string</code>
Return a lower-case string using locale-specific mappings.
e.g. Strings with German lowercase letter 'ß' can be compared to 'ss'

**Kind**: global function  
**Returns**: <code>string</code> - A new string converted to lower case  

| Type | Description |
| --- | --- |
| <code>string</code> | input string |

<a name="toMap"></a>

 toMap(Any) ⇒ <code>map</code>
Create a new map by providing expressions for the key and value

**Kind**: global function  
**Returns**: <code>map</code> - The resulting map  

| Param | Type | Description |
| --- | --- | --- |
|  | <code>string</code> | key name |
| Any | <code>any</code> | data to be specified as the value |

**Example**  
```js
toMap('key', 'value')
// {key: 'value'}
```
<a name="and"></a>

 and() ⇒ <code>boolean</code>
Returns the logical AND result of two parameters

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical result of applying AND to both parameters  

| Type | Description |
| --- | --- |
| <code>any</code> | any data type -- will be cast to boolean |
| <code>any</code> | any data type -- will be cast to boolean |

**Example**  
```js
and(10 > 8, length('foo') < 5)
// true
```
<a name="or"></a>

 or() ⇒ <code>boolean</code>
Returns the logical OR result of two parameters

**Kind**: global function  
**Returns**: <code>boolean</code> - The logical result of applying OR to both parameters  

| Type | Description |
| --- | --- |
| <code>any</code> | any data type -- will be cast to boolean |
| <code>any</code> | any data type -- will be cast to boolean |

**Example**  
```js
or((x / 2) == y, (y * 2) == x)
// true
```
<a name="not"></a>

 not() ⇒ <code>boolean</code>
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

 true() ⇒ <code>boolean</code>
Return constant boolean true value.
Note that expressions may also use the JSON literal true: `` `true` ``

**Kind**: global function  
**Returns**: <code>boolean</code> - True  
<a name="false"></a>

 false() ⇒ <code>boolean</code>
Return constant boolean false value.
Note that expressions may also use the JSON literal false: `` `false` ``

**Kind**: global function  
**Returns**: <code>boolean</code> - False  
<a name="if"></a>

 if(Logical, result1, result2) ⇒ <code>boolean</code> \| <code>any</code>
Return one of two values, depending on a condition

**Kind**: global function  
**Returns**: <code>boolean</code> - True<code>any</code> - either result1 or result2  

| Param | Type | Description |
| --- | --- | --- |
| Logical | <code>any</code> | condition |
| result1 | <code>any</code> | if logical condition is true |
| result2 | <code>any</code> | if logical condition is false |

<a name="substitute"></a>

 substitute(text, old, new, which) ⇒ <code>string</code>
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

 value(object, index:) ⇒ <code>any</code>
Perform an indexed lookup on a map or array

**Kind**: global function  
**Returns**: <code>any</code> - the result of the lookup -- or `null` if not found.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>map</code> \| <code>array</code> | on which to perform the lookup |
| index: | <code>string</code> \| <code>integer</code> | a named child for a map or an integer offset for an array |

