/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import antlr4 from "antlr4";
import FEParser from "./antlr/JSONFormulaParser.js";
import FELexer from "./antlr/JSONFormulaLexer.js";
import InputStream from "./InputStream.js"
import Listener from "./Listener.js";

export default function evaluate(json, expression, trace) {
  const stream = new antlr4.InputStream(expression);
  const chars = new InputStream(stream);
  const lexer = new FELexer(chars);
  lexer._interp.debug = true;
  const tokens  = new antlr4.CommonTokenStream(lexer);
  const parser = new FEParser(tokens);
  parser.buildParseTrees = true;

  let parseError;
  class ParseErrorListener extends antlr4.error.ErrorListener {
    syntaxError(recognizer, offendingSymbol, line, column, msg) {
      parseError = `line ${line}, col ${column}: ${msg}`;
      if (trace) console.log(`ERROR: ${parseError}`);
    }
  }
  /*
  let lexerError;
  class LexerErrorListener extends antlr4.error.ErrorListener {
    syntaxError(recognizer, offendingSymbol, line, column, msg) {
      lexerError = `line ${line}, col ${column}: ${msg}`;
      if (trace) console.log(`ERROR: ${error}`);
    }
  }
  lexer.removeErrorListeners();
  const lexerErrHandler = new LexerErrorListener();
  lexer.addErrorListener(lexerErrHandler);
  */
  const parseErrHandler = new ParseErrorListener();
  parser.removeErrorListeners();
  parser.addErrorListener(parseErrHandler);


  let tree;
  tree = parser.formula();
  const extractor = new Listener(json, trace);
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(extractor, tree);
  if (parseError) {
    if (extractor.result !== undefined) {
      // antlr recovered from the error
      return extractor.result;
    }
    throw new Error(parseError);
  }
  return extractor.result;
}
