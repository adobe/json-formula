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
/*
Have turned off the antlr-based parser for the time being.
The generated code was failing when it was minified by terser

import antlr4 from "antlr4";
import FEParser from "./antlr/JSONFormulaParser.js";
import FELexer from "./antlr/JSONFormulaLexer.js";
import InputStream from "./InputStream.js"
import Visitor from "./Visitor.js";
*/
import jmespath from '../jmespath.js/jmespath';

// eslint-disable-next-line import/prefer-default-export
export function jsonFormula(json, special, expression) {
  const x = jmespath.search(json, special, expression);
  return x;
}
