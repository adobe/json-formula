# Test Structure

json-formula is tested by executing the tests found in a series of JSON files.  Each file defines a series of tests consisting of a test expression and other properties that control the environment of the test and define the correct test result.

The structure of the JSON file is and array of test suites.
Each suite has two required members:
* `given`: JSON data for the test expressions to run against
* `cases`: an array of tests
The suite may also have:
* `comment`: a description of the test suite

Each test must have at least two properties:
* `expression`: the json-formula expression to execute
Plus one of:
* `result`: the expected result of the expression

or

* `error`: if the expression failed, the expected error.

In addition, tests may define:
* `language`: the locale to use when executing the test. If not defined, run the tests as `en-US`
* `fieldsOnly`: See: object handling. If `fieldsOnly` is true, then this test must be run only in the scenario where the data members are represented as class objects.
* `data`: May be one of:
   * JSON data that overrides the `given` test data
   * A string that represents an expression to run against the `given` data to produce a modified dataset to use for the test `expression`
* `precedence`: the parsed expression with brackets to explicitly indicate the precedence of the operations in the expression
* `comment` a description of the test

### Example

```
[{
  "comment": "Documentation example",
  "given": {
    "address": {"street": "Oak St"},
    "casefold": {
      "test": {"str1": "Straße", "str2": "Strasse"},
    }
  },
  "cases": [
    {
        "expression": "2 & 3 + 4 * 5",
        "result": "223",
        "precedence": "2&(3+(4*5))"
    },
    {
        "data": "casefold.test",
        "expression": "casefold(str1) == casefold(str2)",
        "language": "de-DE",
        "result": true,
        "comment": "casefold() for German"
    },
    {
        "expression": "foo..bar",
        "error": "SyntaxError"
    },
    {
      "expression": "a ~ 10",
      "data": { "a": [0, 1, 2] },
      "result": [0, 1, 2, 10]
    },
    {
      "fieldsOnly": true,
      "expression": "values(address)[0].$name",
      "result": "street"
    }
  ]
}]
```


### Object Handling
json-formula is structured to accommodate applications whose data is, in fact, complex objects.  Using JavaScript as an example, the data may be structure so that a member in the data is an object or class with these behaviours:

* define a valueOf() and toString() methods so that normal property access returns a scalar value
* define a toJSON() method so that the property may be serialized to JSON correctly
* define non-enumerable accessors that return properties of the object/class

For example, a JSON member may be represented by a class implemented as:

```
function createField(name, value, readonly = false, required = true) {
  class Field {
    valueOf() { return value; }
    toString() { return value.toString(); }
    toJSON() { return value; }
  }
  const f = new Field();
  Object.defineProperty(f, '$name', { get: () => name });
  Object.defineProperty(f, '$value', { get: () => value });
  Object.defineProperty(f, '$readonly', { get: () => readonly });
  Object.defineProperty(f, '$required', { get: () => required });

  return f;
}
```

For example, if each data member in an address block were represented by a `Field` class, an expression could access: `address.street` to return the value of the street name.  But the getters could also be referenced explicitly.  e.g.:  `address.street.$required`

## Testing Precedence
The precedence output is tested by using the antlr tool to generate code to parse expressions.  The resulting parse tree can be serialized to test for precedence.

The JavaScript code to test expressions:
```
function testGrammar(expression) {
  let result;
  try {
    const chars = new antlr4.InputStream(expression);
    const lexer = new JsonFormulaLexer(chars);
    lexer.removeErrorListeners();
    lexer.addErrorListener(new FormulaErrorListener());
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new JsonFormulaParser(tokens);
    parser.buildParseTrees = true;
    parser.removeErrorListeners();
    parser.addErrorListener(new FormulaErrorListener());
    result = parser.formula();
  } catch (e) {
    return 'SyntaxError';
  }
  return result;
}

const grammarResult = testGrammar(test.expression);
const tree = grammarResult.toStringTree()
// clean up extra brackets to make the output easier to read
    .replace(/\[[0-9 ]*\]/g, '')
    .replace(/ /g, '')
    .replace(/\(\(([^(]+)\)\)/g, '$1')
    .replace(/\(([`0-9]+)\)/g, '$1')
    .replace(/\(\((true\(\)|false\(\))\)\)/g, '$1')
    .replace(/^\(\(/, '')
    .replace(/\)<EOF>\)/, '');

expect(tree).toBe(test.precedence);
```