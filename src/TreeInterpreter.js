/*
Copyright 2014 James Saryerwinnie

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
import {
  matchType, getTypeName, getType, isArrayType,
} from './matchType.js';
import { dataTypes } from './dataTypes.js';
import tokenDefinitions from './tokenDefinitions.js';
import {
  isArray, isObject, strictDeepEqual, getValueOf, getProperty, debugAvailable, toBoolean,
} from './utils.js';
import { evaluationError, typeError } from './errors.js';

const {
  TOK_CURRENT,
  TOK_GLOBAL,
  TOK_EXPREF,
  TOK_PIPE,
  TOK_FLATTEN,
} = tokenDefinitions;

const {
  TYPE_STRING,
  TYPE_ARRAY_STRING,
  TYPE_ARRAY,
  TYPE_NUMBER,
} = dataTypes;

function objValues(obj) {
  return Object.values(obj);
}

function balanceArrayOperands(opLeft, opRight) {
  if (isArray(opLeft) && isArray(opRight)) {
    // balance the size of the arrays by padding with nulls
    const shorter = opLeft.length < opRight.length ? opLeft : opRight;
    const diff = Math.abs(opLeft.length - opRight.length);
    shorter.length += diff;
    shorter.fill(null, shorter.length - diff);
  }
}

export default class TreeInterpreter {
  constructor(runtime, globals, toNumber, toString, debug, language) {
    this.runtime = runtime;
    this.globals = globals;
    this.toNumber = toNumber;
    this.toString = toString;
    this.debug = debug;
    this.language = language;
    this.visitFunctions = this.initVisitFunctions();
  }

  search(node, value) {
    return this.visit(node, value);
  }

  field(node, value) {
    // we used to check isObject(value) here -- but it is possible for an array-based
    // object to have properties.  So we'll allow the child check on objects and arrays.
    if (value !== null && (isObject(value) || isArray(value))) {
      const field = getProperty(value, node.name);
      if (field === undefined) {
        debugAvailable(this.debug, value, node.name);
        return null;
      }
      return field;
    }
    debugAvailable(this.debug, value, node.name);
    return null;
  }

  initVisitFunctions() {
    return {
      Identifier: this.field.bind(this),
      QuotedIdentifier: this.field.bind(this),

      ChainedExpression: (node, value) => {
        let result = this.visit(node.children[0], value);
        for (let i = 1; i < node.children.length; i += 1) {
          result = this.visit(node.children[1], result);
          if (result === null) return null;
        }
        return result;
      },

      BracketExpression: (node, value) => {
        const left = this.visit(node.children[0], value);
        return this.visit(node.children[1], left);
      },

      Index: (node, value) => {
        if (isArray(value)) {
          let index = node.value.value;
          if (index < 0) {
            index = value.length + index;
          }
          const result = value[index];
          if (result === undefined) {
            this.debug.push(`Index: ${index} out of range for array size: ${value.length}`);
            return null;
          }
          return result;
        }
        this.debug.push('Left side of index expression must be an array');
        this.debug.push(`Did you intend a single-element array? if so, use a JSON literal: \`[${node.value.value}]\``);
        return null;
      },

      Slice: (node, value) => {
        if (!isArray(value)) {
          this.debug.push('Slices apply to arrays only');
          return null;
        }
        const sliceParams = node.children.map(param => (param === null ? null : param.value));
        const [start, stop, step] = this.computeSliceParams(value.length, sliceParams);
        const result = [];
        if (step > 0) {
          for (let i = start; i < stop; i += step) {
            result.push(value[i]);
          }
        } else {
          for (let i = start; i > stop; i += step) {
            result.push(value[i]);
          }
        }
        return result;
      },

      Projection: (node, value) => {
      // Evaluate left child.
        const base = this.visit(node.children[0], value);
        if (!isArray(base)) {
          if (node.debug === 'Wildcard') {
            this.debug.push('Bracketed wildcards apply to arrays only');
          }
          return null;
        }
        const collected = [];
        base.forEach(b => {
          const current = this.visit(node.children[1], b);
          collected.push(current);
        });
        return collected;
      },

      // wildcard: ".*"
      ValueProjection: (node, value) => {
      // Evaluate left child.
        const projection = this.visit(node.children[0], value);
        if (!isObject(getValueOf(projection))) {
          this.debug.push('Chained wildcards apply to objects only');
          return null;
        }
        const collected = [];
        const values = objValues(projection);
        values.forEach(val => {
          const current = this.visit(node.children[1], val);
          collected.push(current);
        });
        return collected;
      },

      FilterProjection: (node, value) => {
        const base = this.visit(node.children[0], value);
        if (!isArray(base)) {
          this.debug.push('Filter expressions apply to arrays only');
          return null;
        }
        const filtered = base.filter(b => {
          const matched = this.visit(node.children[2], b);
          return toBoolean(matched);
        });

        const finalResults = [];
        filtered.forEach(f => {
          const current = this.visit(node.children[1], f);
          finalResults.push(current);
        });
        return finalResults;
      },

      Comparator: (node, value) => {
        let first = getValueOf(this.visit(node.children[0], value));
        let second = getValueOf(this.visit(node.children[1], value));

        if (node.value === '==') return strictDeepEqual(first, second);
        if (node.value === '!=') return !strictDeepEqual(first, second);
        if (isObject(first) || isArray(first)) {
          this.debug.push(`Cannot use comparators with ${getTypeName(first)}`);
          return false;
        }
        if (isObject(second) || isArray(second)) {
          this.debug.push(`Cannot use comparators with ${getTypeName(second)}`);
          return false;
        }
        const type1 = getType(first);
        const type2 = getType(second);
        // if either parameter is a number, we need to do a numeric comparison
        // javascript will compare this way automatically, but if we explicitly convert
        // to numbers, we will get debug warnings for non-numeric strings
        if (type1 === TYPE_NUMBER || type2 === TYPE_NUMBER) {
          // if toNumber fails, it will populate the debug array
          // with an appropriate warning
          try {
            first = this.toNumber(first);
            second = this.toNumber(second);
            if (first === null || second === null) return false;
          } catch (_e) {
            // failing to convert to a number for comparison is not an error
            // we just return false
            return false;
          }
        }
        if (node.value === '>') return first > second;
        if (node.value === '>=') return first >= second;
        if (node.value === '<') return first < second;
        // if (node.value === '<=)
        // must be LTE
        return first <= second;
      },

      [TOK_FLATTEN]: (node, value) => {
        const original = this.visit(node.children[0], value);
        if (!isArray(original)) {
          this.debug.push('Flatten expressions apply to arrays only. If you want an empty array, use a JSON literal: `[]`');
          return null;
        }
        const merged = [];
        original.forEach(current => {
          if (isArray(current)) {
            merged.push(...current);
          } else {
            merged.push(current);
          }
        });
        return merged;
      },

      Identity: (_node, value) => value,

      ArrayExpression: (node, value) => node.children.map(child => this.visit(child, value)),

      ObjectExpression: (node, value) => {
        // at one time we used to have this:
        // if (value === null) return null;
        // BUT then an expression such as:
        // values({a: 'aa'})
        // would return null if the document were `null`
        // Removing the check means that:
        // `null`.{a: 'aa'}
        // returns: {a: 'aa'}
        // which is a bit odd, but seems correct.
        const collected = {};
        node.children.forEach(child => {
          if (collected[child.name] !== undefined) this.debug.push(`Duplicate key: '${child.name}'`);
          collected[child.name] = this.visit(child.value, value);
        });
        return collected;
      },

      OrExpression: (node, value) => {
        let matched = this.visit(node.children[0], value);
        if (!toBoolean(matched)) matched = this.visit(node.children[1], value);
        return matched;
      },

      AndExpression: (node, value) => {
        const first = this.visit(node.children[0], value);

        if (!toBoolean(first)) return first;
        return this.visit(node.children[1], value);
      },

      AddExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        balanceArrayOperands(first, second);
        return this.applyOperator(first, second, '+');
      },

      ConcatenateExpression: (node, value) => {
        let first = this.visit(node.children[0], value);
        let second = this.visit(node.children[1], value);
        balanceArrayOperands(first, second);
        if (isArrayType(first)) {
          first = matchType([TYPE_ARRAY_STRING], first, 'concatenate', this.toNumber, this.toString);
        } else {
          first = matchType([TYPE_STRING], first, 'concatenate', this.toNumber, this.toString);
        }
        if (isArrayType(second)) {
          second = matchType([TYPE_ARRAY_STRING], second, 'concatenate', this.toNumber, this.toString);
        } else {
          second = matchType([TYPE_STRING], second, 'concatenate', this.toNumber, this.toString);
        }
        return this.applyOperator(first, second, '&');
      },

      UnionExpression: (node, value) => {
        let first = this.visit(node.children[0], value);
        let second = this.visit(node.children[1], value);
        first = matchType([TYPE_ARRAY], first, 'union', this.toNumber, this.toString);
        second = matchType([TYPE_ARRAY], second, 'union', this.toNumber, this.toString);
        return first.concat(second);
      },

      SubtractExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        balanceArrayOperands(first, second);
        return this.applyOperator(first, second, '-');
      },

      MultiplyExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        balanceArrayOperands(first, second);
        return this.applyOperator(first, second, '*');
      },

      DivideExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        balanceArrayOperands(first, second);
        return this.applyOperator(first, second, '/');
      },

      NotExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        return !toBoolean(first);
      },

      UnaryMinusExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const minus = first * -1;
        if (Number.isNaN(minus)) throw typeError(`Failed to convert "${first}" to number`);
        return minus;
      },

      String: node => node.value,

      Literal: node => node.value,

      Number: node => node.value,

      Integer: node => node.value,

      [TOK_PIPE]: (node, value) => {
        const left = this.visit(node.children[0], value);
        return this.visit(node.children[1], left);
      },

      [TOK_CURRENT]: (_node, value) => value,

      [TOK_GLOBAL]: node => {
        const result = this.globals[node.name];
        return result === undefined ? null : result;
      },

      Function: (node, value) => {
      // Special case for if()
      // we need to make sure the results are called only after the condition is evaluated
      // Otherwise we end up with both results invoked -- which could include side effects
      // For "if", the last parameter to callFunction is false (bResolved) to indicate there's
      // no point in validating the argument type.
        if (node.name === 'if') return this.runtime.callFunction(node.name, node.children, value, this, false);
        const resolvedArgs = node.children.map(child => this.visit(child, value));
        return this.runtime.callFunction(node.name, resolvedArgs, value, this);
      },

      ExpressionReference: node => {
        const [refNode] = node.children;
        // Tag the node with a specific attribute so the type
        // checker verify the type.
        refNode.jmespathType = TOK_EXPREF;
        return refNode;
      },
    };
  }

  visit(n, v = null) {
    const fn = n && this.visitFunctions[n.type];
    return fn(n, v);
  }

  // eslint-disable-next-line class-methods-use-this
  computeSliceParams(arrayLength, sliceParams) {
    function capSliceRange(arrayLen, actual, stp) {
      let actualValue = actual;
      if (actualValue < 0) {
        actualValue += arrayLen;
        if (actualValue < 0) {
          actualValue = stp < 0 ? -1 : 0;
        }
      } else if (actualValue >= arrayLen) {
        actualValue = stp < 0 ? arrayLen - 1 : arrayLen;
      }
      return actualValue;
    }

    let [start, stop, step] = sliceParams;
    if (step === null) {
      step = 1;
    } else if (step === 0) {
      throw evaluationError('Invalid slice, step cannot be 0');
    }
    const stepValueNegative = step < 0;

    if (start === null) {
      start = stepValueNegative ? arrayLength - 1 : 0;
    } else {
      start = capSliceRange(arrayLength, start, step);
    }

    if (stop === null) {
      stop = stepValueNegative ? -1 : arrayLength;
    } else {
      stop = capSliceRange(arrayLength, stop, step);
    }
    return [start, stop, step];
  }

  applyOperator(first, second, operator) {
    if (isArray(first) && isArray(second)) {
      const result = [];
      for (let i = 0; i < first.length; i += 1) {
        result.push(this.applyOperator(first[i], second[i], operator));
      }
      return result;
    }

    if (isArray(first)) return first.map(a => this.applyOperator(a, second, operator));
    if (isArray(second)) return second.map(a => this.applyOperator(first, a, operator));

    if (operator === '&') return first + second;
    if (operator === '*') return this.toNumber(first) * this.toNumber(second);
    const n1 = this.toNumber(first);
    const n2 = this.toNumber(second);
    if (operator === '+') return n1 + n2;
    if (operator === '-') return n1 - n2;
    // if (operator === '/') {
    // Must be division
    const result = n1 / n2;
    if (!Number.isFinite(result)) {
      throw evaluationError(`Division by zero ${first}/${second}`);
    }
    return result;
  }
}
