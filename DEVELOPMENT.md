# Build

Download antlr4:

```
$ cd /usr/local/lib
$ sudo curl -O https://www.antlr.org/download/antlr-4.13.1-complete.jar
```

Install npm packages:

```
npm install
npm start
navigate to http://localhost:8085
```

## Updating Grammar

Recommend using [vscode](https://code.visualstudio.com/) and the vscode-antlr4 extension.

[re]generate grammar: `source generate.sh`

**_Ensure that you are using antlr version 4.13.1_**

re-save the railroad diagram to the doc/output folder from vscode:
- Context click on the g4 file
- Choose "Show Railroad Diagram for All Tools
- From the railroad view choose "Save to HTML"

If an expression fails to evaluate, follow these steps to debug the parser:

```
# populate src/test/debug.txt with the expression to test
> cd antlr
> sh debugExpression.sh
```

## Updating Spec
If the specification (or grammar) has changed, generate new PDF and HTML files using:
> npm run spec

(note the requirement to have docker installed)

## Running Tests

To run the tests, [re]generation of JavaScript code is necessary using the command `source generate.sh`.
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
