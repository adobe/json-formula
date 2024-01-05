<a name="JsonFormula"></a>

## JsonFormula
Class represents an instance of a JsonFormula Expression that can be executed later on with
multiple instances of JSON Data. The instance of the class has a search
function that can be used to evaluate the expression on a json payload.

**Kind**: global class  

* [JsonFormula](#JsonFormula)
    * [new JsonFormula([customFunctions], [stringToNumber], [language], [debug])](#new_JsonFormula_new)
    * [.search(json, [globals])](#JsonFormula+search) ⇒ <code>\*</code>
    * [.run(ast, json, globals)](#JsonFormula+run) ⇒ <code>\*</code>
    * [.compile(expression, [allowedGlobalNames], [debug])](#JsonFormula+compile)

<a name="new_JsonFormula_new"></a>

### new JsonFormula([customFunctions], [stringToNumber], [language], [debug])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [customFunctions] | <code>object</code> | <code>{}</code> | custom functions needed by a hosting application. |
| [stringToNumber] | <code>function</code> | <code>&#x27;null&#x27;</code> | A function that converts string values to numbers. Can be used to convert currencies/dates to numbers |
| [language] | <code>string</code> | <code>&quot;en-US&quot;</code> |  |
| [debug] | <code>array</code> | <code>[]</code> | will be populated with any errors/warnings |

<a name="JsonFormula+search"></a>

### jsonFormula.search(json, [globals]) ⇒ <code>\*</code>
Evaluates the JsonFormula on a particular json payload and return the result

**Kind**: instance method of [<code>JsonFormula</code>](#JsonFormula)  
**Returns**: <code>\*</code> - the result of the expression being evaluated  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| json | <code>object</code> \| <code>array</code> |  | the json data on which the expression needs to be evaluated |
| [globals] | <code>object</code> | <code>{}</code> | global objects that can be accessed via custom functions. |

<a name="JsonFormula+run"></a>

### jsonFormula.run(ast, json, globals) ⇒ <code>\*</code>
Execute a previously compiled expression against a json object and return the result

**Kind**: instance method of [<code>JsonFormula</code>](#JsonFormula)  
**Returns**: <code>\*</code> - the result of the expression being evaluated  

| Param | Type | Description |
| --- | --- | --- |
| ast | <code>object</code> | The abstract syntax tree returned from compile() |
| json | <code>object</code> \| <code>array</code> | the json data on which the expression needs to be evaluated |
| globals | <code>\*</code> | set of objects available in global scope |

<a name="JsonFormula+compile"></a>

### jsonFormula.compile(expression, [allowedGlobalNames], [debug])
Creates a compiled expression that can be executed later on with some data.

**Kind**: instance method of [<code>JsonFormula</code>](#JsonFormula)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| expression | <code>string</code> |  | the expression to evaluate |
| [allowedGlobalNames] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | A list of names of the global variables being used in the expression. |
| [debug] | <code>array</code> | <code>[]</code> | will be populated with any errors/warnings |

<a name="jsonFormula"></a>

## jsonFormula(json, globals, expression, [customFunctions], [stringToNumber], [language], [debug]) ⇒ <code>\*</code>
Compile and execute a json-formula expression.
If executing the same expression multiple times, it is more efficient to create a
class instance of {JsonFormula} and call the search method multiple times.

**Kind**: global function  
**Returns**: <code>\*</code> - the result of the expression being evaluated  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| json | <code>object</code> \| <code>array</code> |  | the json data on which the expression needs to be evaluated |
| globals | <code>object</code> |  | global objects that can be accessed via custom functions. |
| expression | <code>string</code> |  | the expression to evaluate |
| [customFunctions] | <code>object</code> | <code>{}</code> | custom functions needed by a hosting application. |
| [stringToNumber] | <code>function</code> | <code>&#x27;null&#x27;</code> | A function that converts string values to numbers. Can be used to convert currencies/dates to numbers |
| [language] | <code>string</code> | <code>&quot;en-US&quot;</code> |  |
| [debug] | <code>array</code> | <code>[]</code> | will be populated with any errors/warnings |

