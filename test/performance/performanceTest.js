/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import JsonFormula from '../../src/json-formula.js';

export function sortPerformance() {
  const data = [];
  for (let i = 0; i < 1000000; i += 1) {
    data.push(i.toString());
  }

  const jsonFormula = new JsonFormula();
  const t1 = performance.now();
  jsonFormula.search('sort(@)', data);
  const t2 = performance.now();
  return `Time to sort: ${Math.round(t2 - t1)}ms`;
}

export function sortByPerformance() {
  const data = [];
  for (let i = 0; i < 1000000; i += 1) {
    data.push(i.toString());
  }
  const jsonFormula = new JsonFormula();
  const t1 = performance.now();
  jsonFormula.search('sortBy(@, &@)', data);
  const t2 = performance.now();
  return `Time to sortBy: ${Math.round(t2 - t1)}ms`;
}
