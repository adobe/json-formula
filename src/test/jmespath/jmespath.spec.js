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

import { jsonFormula } from "../../index";

const basic = require("./basic.json");

const boolean = require("./boolean.json");
const current = require("./current.json");
const escape = require("./escape.json");
const filters = require("./filters.json");
const functions = require("./functions.json");
const identifiers = require("./identifiers.json");
const indices = require("./indices.json");
const literal = require("./literal.json");
const multiselect = require("./multiselect.json");
const pipe = require("./pipe.json");
const slice = require("./slice.json");
const syntax = require("./syntax.json");
const unicode = require("./unicode.json");
const wildcard = require("./wildcard.json");

function toTestFmt(t) {
  const tests = [];
  t.forEach(tst => {
    const given = tst.given;
    tst.cases.forEach(c => {
      tests.push([c.comment || c.expression, {given, expression: c.expression, result: c.result, error: c.error}]);
    });
  });
  return tests;
}

function executeTest(desc, tst) {
  let result;
  try {
    result = jsonFormula(tst.given, tst.expression);
  } catch (e) {
    expect(tst.error).not.toBeUndefined();
    return;
  }
  expect(result).toEqual(tst.result === undefined ? tst.error : tst.result);
}

test.each(toTestFmt(basic))("%s", executeTest);

test.each(toTestFmt(boolean))("%s", executeTest);
test.each(toTestFmt(current))("%s", executeTest);
test.each(toTestFmt(escape))("%s", executeTest);
test.each(toTestFmt(filters))("%s", executeTest);
test.each(toTestFmt(functions))("%s", executeTest);
test.each(toTestFmt(identifiers))("%s", executeTest);
test.each(toTestFmt(indices))("%s", executeTest);
test.each(toTestFmt(literal))("%s", executeTest);
test.each(toTestFmt(multiselect))("%s", executeTest);
test.each(toTestFmt(pipe))("%s", executeTest);
test.each(toTestFmt(slice))("%s", executeTest);
test.each(toTestFmt(syntax))("%s", executeTest);
test.each(toTestFmt(unicode))("%s", executeTest);
test.each(toTestFmt(wildcard))("%s", executeTest);
