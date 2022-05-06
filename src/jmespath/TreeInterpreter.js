import { matchType, getTypeNames } from './matchType';
import dataTypes from './dataTypes';
import tokenDefinitions from './tokenDefinitions';
import {
  isArray, isObject, strictDeepEqual, getValueOf,
} from './utils';

const {
  TOK_CURRENT,
  TOK_GLOBAL,
  TOK_EXPREF,
  TOK_PIPE,
  TOK_EQ,
  TOK_GT,
  TOK_LT,
  TOK_GTE,
  TOK_LTE,
  TOK_NE,
  TOK_FLATTEN,
} = tokenDefinitions;

const {
  TYPE_STRING,
  TYPE_ARRAY_STRING,
} = dataTypes;

function isFalse(value) {
  // From the spec:
  // A false value corresponds to the following values:
  // Empty list
  // Empty object
  // Empty string
  // False boolean
  // null value
  // (new) use JS truthy evaluation.  This changes the spec behavior.
  // Where in the past a zero (0) would be True, it's now false

  // First check the scalar values.
  if (value === null) return true;
  // in case it's an object with a valueOf defined
  const obj = getValueOf(value);
  if (obj === '' || obj === false || obj === null) {
    return true;
  }
  if (isArray(obj) && obj.length === 0) {
    // Check for an empty array.
    return true;
  }
  if (isObject(obj)) {
    // Check for an empty object.
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      // If there are any keys, then
      // the object is not empty so the object
      // is not false.
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }
  return !obj;
}

function objValues(obj) {
  const keys = Object.keys(obj);
  const values = [];
  for (let i = 0; i < keys.length; i += 1) {
    values.push(obj[keys[i]]);
  }
  return values;
}

export default class TreeInterpreter {
  constructor(runtime, globals, toNumber, toString, debug, language) {
    this.runtime = runtime;
    this.globals = globals;
    this.toNumber = toNumber;
    this.toString = toString;
    this.debug = debug;
    this.language = language;
  }

  search(node, value) {
    return this.visit(node, value);
  }

  visit(n, v) {
    const visitFunctions = {
      Field: (node, value) => {
        if (value !== null && isObject(value)) {
          let field = value[node.name];
          // fields can be objects with overridden methods. e.g. valueOf
          // so don't resolve to a function...
          if (typeof field === 'function') field = undefined;
          if (field === undefined) {
            try {
              this.debug.push(`Failed to find: '${node.name}'`);
              const available = Object.keys(value);
              if (available.length) this.debug.push(`Available fields: ${available.map(a => `'${a}'`).toString()}`);
            // eslint-disable-next-line no-empty
            } catch (e) {}
            return null;
          }
          return field;
        }
        return null;
      },

      Subexpression: (node, value) => {
        let result = this.visit(node.children[0], value);
        for (let i = 1; i < node.children.length; i += 1) {
          result = this.visit(node.children[1], result);
          if (result === null) return null;
        }
        return result;
      },

      IndexExpression: (node, value) => {
        const left = this.visit(node.children[0], value);
        const right = this.visit(node.children[1], left);
        return right;
      },

      Index: (node, value) => {
        if (isArray(value)) {
          let index = this.toNumber(this.visit(node.value, value));
          if (index < 0) {
            index = value.length + index;
          }
          const result = value[index];
          if (result === undefined) {
            this.debug.push(`Index ${index} out of range`);
            return null;
          }
          return result;
        }
        if (isObject(value)) {
          const key = this.toString(this.visit(node.value, value));
          const result = value[key];
          if (result === undefined) {
            this.debug.push(`Key ${key} does not exist`);
            return null;
          }
          return result;
        }
        this.debug.push(`left side of index expression ${value} is not an array or object.`);
        return null;
      },

      Slice: (node, value) => {
        if (!isArray(value)) return null;
        const sliceParams = node.children.slice(0).map(
          param => (param != null ? this.toNumber(this.visit(param, value)) : null),
        );
        const computed = this.computeSliceParams(value.length, sliceParams);
        const [start, stop, step] = computed;
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
        if (!isArray(base)) return null;
        const collected = [];
        for (let i = 0; i < base.length; i += 1) {
          const current = this.visit(node.children[1], base[i]);
          if (current !== null) {
            collected.push(current);
          }
        }
        return collected;
      },

      ValueProjection: (node, value) => {
      // Evaluate left child.
        const projection = this.visit(node.children[0], value);
        if (!isObject(getValueOf(projection))) return null;
        const collected = [];
        const values = objValues(projection);
        for (let i = 0; i < values.length; i += 1) {
          const current = this.visit(node.children[1], values[i]);
          if (current !== null) collected.push(current);
        }
        return collected;
      },

      FilterProjection: (node, value) => {
        const base = this.visit(node.children[0], value);
        if (!isArray(base)) return null;
        const filtered = [];
        const finalResults = [];
        for (let i = 0; i < base.length; i += 1) {
          const matched = this.visit(node.children[2], base[i]);
          if (!isFalse(matched)) filtered.push(base[i]);
        }
        for (let j = 0; j < filtered.length; j += 1) {
          const current = this.visit(node.children[1], filtered[j]);
          if (current !== null) finalResults.push(current);
        }
        return finalResults;
      },

      Comparator: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);

        if (node.name === TOK_EQ) return strictDeepEqual(first, second);
        if (node.name === TOK_NE) return !strictDeepEqual(first, second);
        if (node.name === TOK_GT) return first > second;
        if (node.name === TOK_GTE) return first >= second;
        if (node.name === TOK_LT) return first < second;
        if (node.name === TOK_LTE) return first <= second;
        throw new Error(`Unknown comparator: ${node.name}`);
      },

      [TOK_FLATTEN]: (node, value) => {
        const original = this.visit(node.children[0], value);
        if (!isArray(original)) return null;
        const merged = [];
        for (let i = 0; i < original.length; i += 1) {
          const current = original[i];
          if (isArray(current)) {
            merged.push(...current);
          } else {
            merged.push(current);
          }
        }
        return merged;
      },

      Identity: (node, value) => value,

      MultiSelectList: (node, value) => {
        if (value === null) return null;
        const collected = [];
        for (let i = 0; i < node.children.length; i += 1) {
          collected.push(this.visit(node.children[i], value));
        }
        return collected;
      },

      MultiSelectHash: (node, value) => {
        if (value === null) return null;
        const collected = {};
        for (let i = 0; i < node.children.length; i += 1) {
          const child = node.children[i];
          collected[child.name] = this.visit(child.value, value);
        }
        return collected;
      },

      OrExpression: (node, value) => {
        let matched = this.visit(node.children[0], value);
        if (isFalse(matched)) matched = this.visit(node.children[1], value);
        return matched;
      },

      AndExpression: (node, value) => {
        const first = this.visit(node.children[0], value);

        if (isFalse(first) === true) return first;
        return this.visit(node.children[1], value);
      },

      AddExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        return this.toNumber(first) + this.toNumber(this.visit(node.children[1], value));
      },

      ConcatenateExpression: (node, value) => {
        let first = this.visit(node.children[0], value);
        let second = this.visit(node.children[1], value);
        first = matchType(getTypeNames(first), [TYPE_STRING, TYPE_ARRAY_STRING], first, 'concatenate', this.toNumber);
        second = matchType(getTypeNames(second), [TYPE_STRING, TYPE_ARRAY_STRING], second, 'concatenate', this.toNumber);
        return this.applyOperator(first, second, '&');
      },

      SubtractExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        return first - this.visit(node.children[1], value);
      },

      MultiplyExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        return this.applyOperator(first, second, '*');
      },

      DivideExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const result = first / this.visit(node.children[1], value);
        return Number.isFinite(result) ? result : null;
      },

      PowerExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        return first ** this.visit(node.children[1], value);
      },

      NotExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        return isFalse(first);
      },

      Literal: node => node.value,

      Number: node => node.value,

      [TOK_PIPE]: (node, value) => {
        const left = this.visit(node.children[0], value);
        return this.visit(node.children[1], left);
      },

      [TOK_CURRENT]: (node, value) => value,

      [TOK_GLOBAL]: node => {
        const result = this.globals[node.name];
        return result === undefined ? null : result;
      },

      Function: (node, value) => {
      // Special case for if()
      // we need to make sure the results are called only after the condition is evaluated
      // Otherwise we end up with both results invoked -- which could include side effects
        if (node.name === 'if') return this.runtime.callFunction(node.name, node.children, value, this);
        const resolvedArgs = [];
        for (let i = 0; i < node.children.length; i += 1) {
          resolvedArgs.push(this.visit(node.children[i], value));
        }
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
    const fn = n && visitFunctions[n.type];
    if (!fn) throw new Error(`Unknown/missing node type ${(n && n.type) || ''}`);
    return fn(n, v);
  }

  // eslint-disable-next-line class-methods-use-this
  computeSliceParams(arrayLength, sliceParams) {
    function capSliceRange(arrayLen, actual, step) {
      let actualValue = actual;
      if (actualValue < 0) {
        actualValue += arrayLen;
        if (actualValue < 0) {
          actualValue = step < 0 ? -1 : 0;
        }
      } else if (actualValue >= arrayLen) {
        actualValue = step < 0 ? arrayLen - 1 : arrayLen;
      }
      return actualValue;
    }

    let start = sliceParams[0];
    let stop = sliceParams[1];
    let step = sliceParams[2];
    const computed = [null, null, null];
    if (step === null) {
      step = 1;
    } else if (step === 0) {
      const error = new Error('Invalid slice, step cannot be 0');
      error.name = 'RuntimeError';
      throw error;
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
    computed[0] = start;
    computed[1] = stop;
    computed[2] = step;
    return computed;
  }

  applyOperator(first, second, operator) {
    // TODO: fill in remaining operators
    if (isArray(first) && isArray(second)) {
      const len = Math.min(first.length, second.length);
      const result = [];
      let i;
      for (i = 0; i < len; i += 1) {
        if (isArray(first[i]) || isArray(second[i])) {
          result.push(this.applyOperator(first[i], second[i], operator));
        } else if (operator === '*') {
          result.push(first[i] * second[i]);
        } else if (operator === '&') {
          result.push(first[i] + second[i]);
        } else throw new Error('unimplemented');
      }
      for (i = len; i < Math.max(first.length, second.length); i += 1) {
        // Result of the operator applied with 'null'
        if (operator === '&') result.push('');
        else if (operator === '*') result.push(0);
      }
      return result;
    }

    if (isArray(first) || isArray(second)) {
      const [arr, scalar] = isArray(first) ? [first, second] : [second, first];
      if (operator === '*') return arr.map(a => this.toNumber(a) * this.toNumber(scalar));
      if (operator === '&') return arr.map(a => a + scalar);
    }
    if (operator === '*') return this.toNumber(first) * this.toNumber(second);
    if (operator === '&') return first + second;
    throw new Error(`unimplemented array operator: ${operator}`);
  }
}
