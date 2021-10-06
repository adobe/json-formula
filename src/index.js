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
import Visitor from "./Visitor.js";
import jmespath from "../jmespath.js/jmespath.js";

export function jsonFormula(json, expression, trace) {

  // confirm that we pass the parser

  const stream = new antlr4.InputStream(expression);
  const chars = new InputStream(stream);
  const lexer = new FELexer(chars);
  lexer._interp.debug = true;
  const tokens  = new antlr4.CommonTokenStream(lexer);
  const parser = new FEParser(tokens);
  parser.buildParseTrees = true;
  lexer.removeErrorListeners();

  let parseError;
  class ParseErrorListener extends antlr4.error.ErrorListener {
    syntaxError(recognizer, offendingSymbol, line, column, msg) {
      parseError = `line ${line}, col ${column}: ${msg}`;
      if (trace) console.log(`ERROR: ${parseError}`);
    }
  }

  const parseErrHandler = new ParseErrorListener();
  parser.removeErrorListeners();
  parser.addErrorListener(parseErrHandler);

  // let tree;
  parser.formula();
  // const visitor = new Visitor(json, trace);
  // const result = visitor.visitFormula(tree);

  if (parseError) {
    /*
    if (result !== undefined) {
      // antlr recovered from the error
      return result;
    }*/
    throw new Error(parseError);
  }
  // return result;

  const x = jmespath.search(json, expression);
  return x;

}

/*
var SimpleJavaLexer = require('generated/GrammarLexer');
var SimpleJavaParser = require('generated/GrammarParser');
var SimpleJavaVisitor = require('generated/GrammarVisitor');
var Visitor = require('./Visitor');

var input = "TestInput";
var chars = new antlr4.InputStream(input);
var lexer = new GrammarLexer.GrammarLexer(chars);
var tokens = new antlr4.CommonTokenStream(lexer);
var parser = new GrammarParser.GrammarParser(tokens);
var visitor = new Visitor.Visitor();
parser.buildParseTrees = true;
var tree = parser.parse();
and call your entry function

visitor.visitTest(tree);
*/