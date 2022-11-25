import antlr4 from 'antlr4';
import JSONFormulaParser from '../antlr/JSONFormulaParser';
import JSONFormulaLexer from '../antlr/JSONFormulaLexer';

const basic = require('./basic.json');

const boolean = require('./boolean.json');
const current = require('./current.json');
const escape = require('./escape.json');
const filters = require('./filters.json');
const functions = require('./functions.json');
const identifiers = require('./identifiers.json');
const indices = require('./indices.json');
const literal = require('./literal.json');
const multiselect = require('./multiselect.json');
const pipe = require('./pipe.json');
const slice = require('./slice.json');
const syntax = require('./syntax.json');
const unicode = require('./unicode.json');
const wildcard = require('./wildcard.json');

class FormulaErrorListener extends antlr4.error.ErrorListener {
  // eslint-disable-next-line class-methods-use-this
  syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, exeption) {
    throw new Error(exeption);
  }
}

function toTestFmt(t) {
  const tests = [];
  t.forEach(tst => {
    const { given } = tst;
    tst.cases.forEach(c => {
      const testName = c.comment ? `${c.comment} (${c.expression})` : c.expression;
      tests.push([testName, {
        given, expression: c.expression, result: c.result, error: c.error,
      }]);
    });
  });
  return tests;
}

function executeTest(desc, tst) {
  let result;
  try {
    const chars = new antlr4.InputStream(tst.expression);
    const lexer = new JSONFormulaLexer(chars);
    lexer.removeErrorListeners();
    lexer.addErrorListener(new FormulaErrorListener());
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new JSONFormulaParser(tokens);
    parser.buildParseTrees = true;
    parser.removeErrorListeners();
    parser.addErrorListener(new FormulaErrorListener());
    result = parser.formula();
  } catch (e) {
    expect(tst.error).not.toBeUndefined();
    return;
  }
  expect(tst.error).not.toEqual('syntax');
  expect(result).toBeDefined();
}
describe('basic', () => {
  test.each(toTestFmt(basic))('%s', executeTest);
});

describe('boolean', () => {
  test.each(toTestFmt(boolean))('%s', executeTest);
});

describe('current', () => {
  test.each(toTestFmt(current))('%s', executeTest);
});

describe('escape', () => {
  test.each(toTestFmt(escape))('%s', executeTest);
});

describe('filters', () => {
  test.each(toTestFmt(filters))('%s', executeTest);
});

describe('functions', () => {
  test.each(toTestFmt(functions))('%s', executeTest);
});

describe('identifiers', () => {
  test.each(toTestFmt(identifiers))('%s', executeTest);
});

describe('indices', () => {
  test.each(toTestFmt(indices))('%s', executeTest);
});

describe('literal', () => {
  test.each(toTestFmt(literal))('%s', executeTest);
});

describe('multiselect', () => {
  test.each(toTestFmt(multiselect))('%s', executeTest);
});

describe('pipe', () => {
  test.each(toTestFmt(pipe))('%s', executeTest);
});

describe('slice', () => {
  test.each(toTestFmt(slice))('%s', executeTest);
});

describe('syntax', () => {
  test.each(toTestFmt(syntax))('%s', executeTest);
});

describe('unicode', () => {
  test.each(toTestFmt(unicode))('%s', executeTest);
});

describe('wildcard', () => {
  test.each(toTestFmt(wildcard))('%s', executeTest);
});

// Uncomment to debug a single test

// const json = {
//   "comment": "Literal char not escaped",
//   "expression": "foo[?bar==`[\"foo`bar\"]`]",
//   "error": "syntax"
// }

// test('test', () => {
//   executeTest('test', json);
// });
