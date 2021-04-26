# JSONFormula: an Expression Grammar for Forms

This project hosts an implementation of a form expression grammar.
The grammar is a mashup of [spreadsheet-like](https://www.oasis-open.org/committees/download.php/16826/openformula-spec-20060221.html) functions and operators and [JMESPath](https://jmespath.org/) a JSON query language.

# Demo
See the expression tester running [here](https://github.com/adobe/json-formula/pages/expressions/)

# Setup

Follow the 'Quick Start' instructions at: https://www.antlr.org/ to install the antlr generator

> npm install
> npm start
> navigate to http://localhost:8085

## Updating source

Highly recommended to use [vscode](https://code.visualstudio.com/) and install the vscode-antlr4 extension.

[re]generate grammar: `source generate.sh`

re-save the railroad diagram to the doc folder from vscode

If an expression fails to evaluate, follow these steps to debug:

```
# populate src/test/debug.txt with the expression to test
> cd antlr4
> antlr4 JSONFormula.g4
> javac *.java
> grun JSONFormula formula -tokens -tree ../src/test/debug.txt
```

To compare with the jmespath equivalent:

```
> cd antlr4
> antlr4 jmespath.g4
> javac *.java
> grun jmespath jmesPathExpression -tokens -tree ../src/test/debug.txt
```

## Contributing
Contributions are welcomed! Read the [Contributing Guide](./CONTRIBUTING.md) for more information.

## Licensing
This project is licensed under the Apache V2 License. See [LICENSE](./LICENSE) for more information.
