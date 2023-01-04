# JSONFormula: an Expression Grammar for Forms

This project hosts an implementation of a form expression grammar.
The grammar is a mashup of
[spreadsheet-like](https://www.oasis-open.org/committees/download.php/16826/openformula-spec-20060221.html)
functions and operators and [JMESPath](https://jmespath.org/) a JSON query language.

# Demo
Visit the [Playground](https://opensource.adobe.com/json-formula/dist/index.html)

# Documentation
[Function Reference](https://opensource.adobe.com/json-formula/dist/jsdocs/global.html)

[JS API](https://opensource.adobe.com/json-formula/dist/jsdocs/index.html)

NOTES:
- Documentation is still in progress.  ToDo: Incorporate descriptions of expressions, operators.
- URLs for the playground and documentation are subject to change.

# Setup

Follow the 'Quick Start' instructions at: https://www.antlr.org/ to install the antlr generator

> npm install
> npm start
> navigate to http://localhost:8085

## Updating source

Highly recommended to use [vscode](https://code.visualstudio.com/) and install the vscode-antlr4 extension.

[re]generate grammar: `source generate.sh`

re-save the railroad diagram to the doc folder from vscode:
- Context click on the g4 file
- Choose "Show Railroad Diagram for All Tools
- From the railroad view choose "Save to HTML"

If an expression fails to evaluate, follow these steps to debug:

```
# populate src/test/debug.txt with the expression to test
> cd antlr
> antlr4 JSONFormula.g4
> javac *.java
> grun JSONFormula formula -tokens -tree ../test/debug.txt
```

To compare with the jmespath equivalent:

```
> cd antlr4
> antlr4 jmespath.g4
> javac *.java
> grun jmespath jmesPathExpression -tokens -tree ../test/debug.txt
```

## Running Tests

To run the tests, [re]generation of JavaScript code is a must using the command `source generate.sh`.
The tests require an 18.x version of node.

```
npm run test
```
## Contributing
Contributions are welcomed! Read the [Contributing Guide](./CONTRIBUTING.md) for more information.

## Licensing
This project is licensed under the Apache V2 License. See [LICENSE](./LICENSE) for more information.

## Releasing to npm

To release the package to npm create a commit with the message
`Release <version_number>` where the `version_number` is the version number in the package.json file.
