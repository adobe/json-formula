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
import { jsonFormula } from "../index";

const sampleData = require("./sampleData.json");
const tests = require("./tests.json");

test.each(tests)("%s", (desc, tst) => {
  const data = jsonFormula(sampleData, tst.data);
  try {
    const result = jsonFormula(data, tst.expression);
    if (typeof result === "number") {
      expect(result).toBeCloseTo(tst.expected, 5);
    } else {
      expect(result).toEqual(tst.expected);
    }
  } catch(e) {
    expect(tst.error).toBe("syntax");
  }
});
