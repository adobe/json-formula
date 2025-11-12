<a name="JsonFormula"></a>

## JsonFormula
Class represents an instance of a JsonFormula Expression that can be executed later on with
multiple instances of JSON Data. The instance of the class has a search
function that can be used to evaluate the expression on a json payload.

**Kind**: global class  

* [JsonFormula](#JsonFormula)
    * [new JsonFormula([customFunctions], [stringToNumber], [debug])](#new_JsonFormula_new)
    * [.search(expression, json, [globals], [language])](#JsonFormula+search) ⇒ <code>\*</code>
    * [.run(ast, json, [language], globals)](#JsonFormula+run) ⇒ <code>\*</code>
    * [.compile(expression, [allowedGlobalNames])](#JsonFormula+compile)

<a name="new_JsonFormula_new"></a>

### new JsonFormula([customFunctions], [stringToNumber], [debug])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [customFunctions] | <code>object</code> | <code>{}</code> | custom functions needed by a hosting application. |
| [stringToNumber] | <code>function</code> | <code>&#x27;null&#x27;</code> | A function that converts string values to numbers. Can be used to convert currencies/dates to numbers |
| [debug] | <code>array</code> | <code>[]</code> | will be populated with any errors/warnings |

<a name="JsonFormula+search"></a>

### jsonFormula.search(expression, json, [globals], [language]) ⇒ <code>\*</code>
Evaluates the JsonFormula on a particular json payload and return the result

**Kind**: instance method of [<code>JsonFormula</code>](#JsonFormula)  
**Returns**: <code>\*</code> - the result of the expression being evaluated  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| expression | <code>string</code> |  | the json-formula expression to evaluate |
| json | <code>object</code> \| <code>array</code> |  | the json data on which the expression needs to be evaluated |
| [globals] | <code>object</code> | <code>{}</code> | global objects that can be accessed via custom functions. |
| [language] | <code>string</code> | <code>&quot;en-US&quot;</code> | BCP-47 language tag |

**Example**  
```js
const jf = new JsonFormula();
const result = jf.search('toDate(d) | day(@) & "/" & month(@)', {d: "2025-11-12"});
// returns "12/11"
```
<a name="JsonFormula+run"></a>

### jsonFormula.run(ast, json, [language], globals) ⇒ <code>\*</code>
Execute a previously compiled expression against a json object and return the result.
Use this method for better performance when you will evaluate the same expression
multiple times with different data.

**Kind**: instance method of [<code>JsonFormula</code>](#JsonFormula)  
**Returns**: <code>\*</code> - the result of the expression being evaluated  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ast | <code>object</code> |  | The abstract syntax tree returned from compile() |
| json | <code>object</code> \| <code>array</code> |  | the json data on which the expression needs to be evaluated |
| [language] | <code>string</code> | <code>&quot;en-US&quot;</code> | BCP-47 language tag |
| globals | <code>\*</code> |  | set of objects available in global scope |

**Example**  
```js
const globals = {
  $days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};
const jf = new JsonFormula();
const ast = jf.compile('value($days, num)', ['$days']); // compile the expression once
const result1 = jf.run(ast, {num: 2}, 'en-US', globals); // returns "Wed"
const result2 = jf.run(ast, {num: 3}, 'en-US', globals); // returns "Thu"
```
<a name="JsonFormula+compile"></a>

### jsonFormula.compile(expression, [allowedGlobalNames])
Creates a compiled expression that can be executed later on with some data.

**Kind**: instance method of [<code>JsonFormula</code>](#JsonFormula)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| expression | <code>string</code> |  | the expression to evaluate |
| [allowedGlobalNames] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | An array of names of the global variables being used in the expression. |

<a name="jsonFormula"></a>

## jsonFormula(json, globals, expression, [customFunctions], [stringToNumber], [debug], [language]) ⇒ <code>\*</code>
Compile and execute a json-formula expression.
If executing the same expression multiple times, it is more efficient to create a
class instance of JsonFormula and call the search() method or the compile()/run() methods
multiple times.

**Kind**: global function  
**Returns**: <code>\*</code> - the result of the expression being evaluated  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| json | <code>object</code> \| <code>array</code> |  | the json data on which the expression needs to be evaluated |
| globals | <code>object</code> |  | global objects that can be accessed via custom functions. |
| expression | <code>string</code> |  | the expression to evaluate |
| [customFunctions] | <code>object</code> | <code>{}</code> | custom functions needed by a hosting application. |
| [stringToNumber] | <code>function</code> | <code>&#x27;null&#x27;</code> | A function that converts string values to numbers. Can be used to convert currencies/dates to numbers |
| [debug] | <code>array</code> | <code>[]</code> | will be populated with any errors/warnings |
| [language] | <code>string</code> | <code>&quot;en-US&quot;</code> | BCP-47 language tag |

<a name="CustomFunctionDefinition"></a>

## CustomFunctionDefinition : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _func | <code>function</code> | The function implementation |
| [_signature] | <code>array</code> | Function signature metadata |

**Example**  
```js
// simple custom functions definition
  const customFunctions = {
    true_fn: {
      _func: () => true,
      _signature: [],
    },
    false_fn: {
      _func: () => false,
      _signature: [],
    },
  };
  
```
**Example**  
```js
// custom function with a signature for its parameters
  const customFunctions = {
    padEnd: {
      _func: args => {
        const src = args[0];
        const length = args[1];
        const padChar = args[2];
        if (Array.isArray(src)) return src.map(s => s.padEnd(length, padChar));
        return src.padEnd(length, padChar);
      },
      _signature: [
        { types: [TYPE_STRING, TYPE_ARRAY_STRING] },
        { types: [TYPE_NUMBER] },
        { types: [TYPE_STRING] },
      ],
    }
  }
  // May also register functions is via the `register()` or `registerWithParams()` methods. e.g.

   const regFormula = `${register("${fn_name}", &${code})`;
   // Run the registration formula after which, the registered function may be called
   this.search(regFormula, {});
```
<a name="globals"></a>

## globals : <code>object</code>
An object where each key **MUST** begin with a `$` character, representing global variables
that can be accessed inside a json-formula expression.
The value of each key can be of any data type supported by json.

**Kind**: global typedef  
**Example**  
```js
const globals = {
  $num: 42,
  $arr: [1, 2, 3],
  $days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};
jsonFormula({}, globals, '$arr * $num') // returns [42, 84, 126]
```
