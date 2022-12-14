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
  TYPE_ARRAY,
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
  return Object.values(obj);
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
        // we used to check isObject(value) here -- but it is possible for an array-based
        // object to have properties.  So we'll allow the child check on objects and arrays.
        if (value !== null && (isObject(value) || isArray(value))) {
          let field = value[node.name];
          // fields can be objects with overridden methods. e.g. valueOf
          // so don't resolve to a function...
          if (typeof field === 'function') field = undefined;
          if (field === undefined) {
            try {
              this.debug.push(`Failed to find: '${node.name}'`);
              const available = Object.keys(value).map(a => `'${a}'`).toString();
              if (available.length) this.debug.push(`Available fields: ${available}`);
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
        return this.visit(node.children[1], left);
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
        base.forEach(b => {
          const current = this.visit(node.children[1], b);
          if (current !== null) {
            collected.push(current);
          }
        });
        return collected;
      },

      ValueProjection: (node, value) => {
      // Evaluate left child.
        const projection = this.visit(node.children[0], value);
        if (!isObject(getValueOf(projection))) return null;
        const collected = [];
        const values = objValues(projection);
        values.forEach(val => {
          const current = this.visit(node.children[1], val);
          if (current !== null) collected.push(current);
        });
        return collected;
      },

      FilterProjection: (node, value) => {
        const base = this.visit(node.children[0], value);
        if (!isArray(base)) return null;
        const filtered = base.filter(b => {
          const matched = this.visit(node.children[2], b);
          return !isFalse(matched);
        });

        const finalResults = [];
        filtered.forEach(f => {
          const current = this.visit(node.children[1], f);
          if (current !== null) finalResults.push(current);
        });
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

      MultiSelectList: (node, value) => {
        if (value === null) return null;
        return node.children.map(child => this.visit(child, value));
      },

      MultiSelectHash: (node, value) => {
        if (value === null) return null;
        const collected = {};
        node.children.forEach(child => {
          collected[child.name] = this.visit(child.value, value);
        });
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
        const second = this.visit(node.children[1], value);
        return this.applyOperator(first, second, '+');
      },

      ConcatenateExpression: (node, value) => {
        let first = this.visit(node.children[0], value);
        let second = this.visit(node.children[1], value);
        first = matchType(getTypeNames(first), [TYPE_STRING, TYPE_ARRAY_STRING], first, 'concatenate', this.toNumber, this.toString);
        second = matchType(getTypeNames(second), [TYPE_STRING, TYPE_ARRAY_STRING], second, 'concatenate', this.toNumber, this.toString);
        return this.applyOperator(first, second, '&');
      },

      UnionExpression: (node, value) => {
        let first = this.visit(node.children[0], value);
        let second = this.visit(node.children[1], value);
        first = matchType(getTypeNames(first), [TYPE_ARRAY], first, 'union', this.toNumber, this.toString);
        second = matchType(getTypeNames(second), [TYPE_ARRAY], second, 'union', this.toNumber, this.toString);
        return first.concat(second);
      },

      SubtractExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        return this.applyOperator(first, second, '-');
      },

      MultiplyExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        return this.applyOperator(first, second, '*');
      },

      DivideExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        return this.applyOperator(first, second, '/');
      },

      PowerExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        const second = this.visit(node.children[1], value);
        return this.applyOperator(first, second, '^');
      },

      NotExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        return isFalse(first);
      },

      UnaryMinusExpression: (node, value) => {
        const first = this.visit(node.children[0], value);
        return first * -1;
      },

      Literal: node => node.value,

      Number: node => node.value,

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
    const fn = n && visitFunctions[n.type];
    if (!fn) throw new Error(`Unknown/missing node type ${(n && n.type) || ''}`);
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
    return [start, stop, step];
  }

  applyOperator(first, second, operator) {
    if (isArray(first) && isArray(second)) {
      // balance the size of the arrays
      const shorter = first.length < second.length ? first : second;
      const diff = Math.abs(first.length - second.length);
      shorter.length += diff;
      shorter.fill(null, shorter.length - diff);
      const result = [];
      for (let i = 0; i < first.length; i += 1) {
        result.push(this.applyOperator(first[i], second[i], operator));
      }
      return result;
    }

    if (isArray(first)) return first.map(a => this.applyOperator(a, second, operator));
    if (isArray(second)) return second.map(a => this.applyOperator(first, a, operator));

    if (operator === '*') return this.toNumber(first) * this.toNumber(second);
    if (operator === '&') return first + second;
    if (operator === '+') {
      return this.toNumber(first) + this.toNumber(second);
    }
    if (operator === '-') return this.toNumber(first) - this.toNumber(second);
    if (operator === '/') {
      const result = first / second;
      return Number.isFinite(result) ? result : null;
    }
    if (operator === '^') {
      return first ** second;
    }
    throw new Error(`Unknown operator: ${operator}`);
  }
}
