/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import antlr4 from 'antlr4';
import JsonFormulaParser from './antlr/JsonFormulaParser.js';
import JsonFormulaLexer from './antlr/JsonFormulaLexer.js';

class FormulaErrorListener extends antlr4.error.ErrorListener {
  // eslint-disable-next-line class-methods-use-this
  syntaxError(_recognizer, _offendingSymbol, _line, _charPositionInLine, _msg, exception) {
    throw new Error(exception);
  }
}

// ensure that a provided expression passes the antlr parser
export default function testGrammar(expression) {
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
  if (typeof result === 'undefined') return 'error';
  return result;
}
