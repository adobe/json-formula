/* eslint-disable no-underscore-dangle */
import dataTypes from './dataTypes';

export default function functions(interpreter, isObject, isArray, toNumber, getTypeName, valueOf) {
  const {
    TYPE_NUMBER,
    TYPE_ANY,
    TYPE_STRING,
    TYPE_ARRAY,
    TYPE_OBJECT,
    TYPE_BOOLEAN,
    TYPE_EXPREF,
    TYPE_NULL,
    TYPE_ARRAY_NUMBER,
    TYPE_ARRAY_STRING,
  } = dataTypes;

  function toString(a) {
    if (a === null || a === undefined) return '';
    return a.toString();
  }

  function createKeyFunction(exprefNode, allowedTypes) {
    const keyFunc = x => {
      const current = interpreter.visit(exprefNode, x);
      if (allowedTypes.indexOf(getTypeName(current)) < 0) {
        const msg = `TypeError: expected one of ${allowedTypes
        }, received ${getTypeName(current)}`;
        throw new Error(msg);
      }
      return current;
    };
    return keyFunc;
  }

  return {
    // name: [function, <signature>]
    // The <signature> can be:
    //
    // {
    //   args: [[type1, type2], [type1, type2]],
    //   variadic: true|false
    // }
    //
    // Each arg in the arg list is a list of valid types
    // (if the function is overloaded and supports multiple
    // types.  If the type is "any" then no type checking
    // occurs on the argument.  Variadic is optional
    // and if not provided is assumed to be false.
    abs: {
      _func: resolvedArgs => Math.abs(resolvedArgs[0]),
      _signature: [{ types: [TYPE_NUMBER] }],
    },
    avg: {
      _func: resolvedArgs => {
        let sum = 0;
        const inputArray = resolvedArgs[0];
        for (let i = 0; i < inputArray.length; i += 1) {
          sum += inputArray[i];
        }
        return sum / inputArray.length;
      },
      _signature: [{ types: [TYPE_ARRAY_NUMBER] }],
    },
    ceil: {
      _func: resolvedArgs => Math.ceil(resolvedArgs[0]),
      _signature: [{ types: [TYPE_NUMBER] }],
    },
    contains: {
      _func: resolvedArgs => valueOf(resolvedArgs[0]).indexOf(valueOf(resolvedArgs[1])) >= 0,
      _signature: [{ types: [TYPE_STRING, TYPE_ARRAY] },
        { types: [TYPE_ANY] }],
    },
    endsWith: {
      _func: resolvedArgs => {
        const searchStr = valueOf(resolvedArgs[0]);
        const suffix = valueOf(resolvedArgs[1]);
        return searchStr.indexOf(suffix, searchStr.length - suffix.length) !== -1;
      },
      _signature: [{ types: [TYPE_STRING] }, { types: [TYPE_STRING] }],
    },

    floor: {
      _func: resolvedArgs => Math.floor(resolvedArgs[0]),
      _signature: [{ types: [TYPE_NUMBER] }],
    },

    length: {
      _func: resolvedArgs => {
        const arg = valueOf(resolvedArgs[0]);
        if (isObject(arg)) return Object.keys(arg).length;

        return isArray(arg) ? arg.length : toString(arg).length;
      },
      _signature: [{ types: [TYPE_STRING, TYPE_ARRAY, TYPE_OBJECT] }],
    },

    map: {
      _func: resolvedArgs => {
        const mapped = [];
        const exprefNode = resolvedArgs[0];
        const elements = resolvedArgs[1];
        for (let i = 0; i < elements.length; i += 1) {
          mapped.push(interpreter.visit(exprefNode, elements[i]));
        }
        return mapped;
      },
      _signature: [{ types: [TYPE_EXPREF] }, { types: [TYPE_ARRAY] }],
    },

    max: {
      _func: resolvedArgs => {
        if (resolvedArgs[0].length > 0) {
          const typeName = getTypeName(resolvedArgs[0][0]);
          if (typeName === TYPE_NUMBER) {
            return resolvedArgs[0].reduce(
              (prev, cur) => (toNumber(prev) >= toNumber(cur) ? prev : cur),
              resolvedArgs[0][0],
            );
          }
          return resolvedArgs[0].reduce(
            (a, b) => (toString(b).localeCompare(toString(a)) < 0 ? a : b),
            resolvedArgs[0][0],
          );
        }
        return null;
      },
      _signature: [{ types: [TYPE_ARRAY, TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING] }],
    },

    merge: {
      _func: resolvedArgs => {
        const merged = {};
        for (let i = 0; i < resolvedArgs.length; i += 1) {
          const current = resolvedArgs[i];
          Object.keys(current).forEach(key => {
            merged[key] = current[key];
          });
        }
        return merged;
      },
      _signature: [{ types: [TYPE_OBJECT], variadic: true }],
    },

    maxBy: {
      _func: resolvedArgs => {
        const exprefNode = resolvedArgs[1];
        const resolvedArray = resolvedArgs[0];
        const keyFunction = createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
        let maxNumber = -Infinity;
        let maxRecord;
        let current;
        for (let i = 0; i < resolvedArray.length; i += 1) {
          current = keyFunction(resolvedArray[i]);
          if (current > maxNumber) {
            maxNumber = current;
            maxRecord = resolvedArray[i];
          }
        }
        return maxRecord;
      },
      _signature: [{ types: [TYPE_ARRAY] }, { types: [TYPE_EXPREF] }],
    },

    sum: {
      _func: resolvedArgs => {
        let sum = 0;
        const listToSum = resolvedArgs[0];
        for (let i = 0; i < listToSum.length; i += 1) {
          sum += listToSum[i] * 1;
        }
        return sum;
      },
      _signature: [{ types: [TYPE_ARRAY_NUMBER] }],
    },

    startsWith: {
      _func: resolvedArgs => valueOf(resolvedArgs[0]).lastIndexOf(valueOf(resolvedArgs[1])) === 0,
      _signature: [{ types: [TYPE_STRING] }, { types: [TYPE_STRING] }],
    },

    min: {
      _func: resolvedArgs => {
        if (resolvedArgs[0].length > 0) {
          const typeName = getTypeName(resolvedArgs[0][0]);
          if (typeName === TYPE_NUMBER) {
            return resolvedArgs[0].reduce(
              (prev, cur) => (toNumber(prev) <= toNumber(cur) ? prev : cur),
              resolvedArgs[0][0],
            );
          }
          const elements = resolvedArgs[0];
          let minElement = elements[0];
          for (let i = 1; i < elements.length; i += 1) {
            if (toString(elements[i]).localeCompare(toString(minElement)) < 0) {
              minElement = elements[i];
            }
          }
          return minElement;
        }
        return null;
      },
      _signature: [{ types: [TYPE_ARRAY, TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING] }],
    },

    minBy: {
      _func: resolvedArgs => {
        const exprefNode = resolvedArgs[1];
        const resolvedArray = resolvedArgs[0];
        const keyFunction = createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
        let minNumber = Infinity;
        let minRecord;
        let current;
        for (let i = 0; i < resolvedArray.length; i += 1) {
          current = keyFunction(resolvedArray[i]);
          if (current < minNumber) {
            minNumber = current;
            minRecord = resolvedArray[i];
          }
        }
        return minRecord;
      },
      _signature: [{ types: [TYPE_ARRAY] }, { types: [TYPE_EXPREF] }],
    },

    type: {
      _func: resolvedArgs => ({
        [TYPE_NUMBER]: 'number',
        [TYPE_STRING]: 'string',
        [TYPE_ARRAY]: 'array',
        [TYPE_OBJECT]: 'object',
        [TYPE_BOOLEAN]: 'boolean',
        [TYPE_EXPREF]: 'expref',
        [TYPE_NULL]: 'null',
      }[getTypeName(resolvedArgs[0])]),
      _signature: [{ types: [TYPE_ANY] }],
    },

    keys: {
      _func: resolvedArgs => Object.keys(resolvedArgs[0]),
      _signature: [{ types: [TYPE_ANY] }],
    },

    values: {
      _func: resolvedArgs => Object.values(resolvedArgs[0]),
      _signature: [{ types: [TYPE_ANY] }],
    },

    sort: {
      _func: resolvedArgs => {
        const sortedArray = resolvedArgs[0].slice(0);
        if (sortedArray.length > 0) {
          const normalize = getTypeName(resolvedArgs[0][0]) === TYPE_NUMBER ? toNumber : toString;
          sortedArray.sort((a, b) => {
            const va = normalize(a);
            const vb = normalize(b);
            if (va < vb) return -1;
            if (va > vb) return 1;
            return 0;
          });
        }
        return sortedArray;
      },
      _signature: [{ types: [TYPE_ARRAY, TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER] }],
    },

    sortBy: {
      _func: resolvedArgs => {
        const sortedArray = resolvedArgs[0].slice(0);
        if (sortedArray.length === 0) {
          return sortedArray;
        }
        const exprefNode = resolvedArgs[1];
        const requiredType = getTypeName(
          interpreter.visit(exprefNode, sortedArray[0]),
        );
        if ([TYPE_NUMBER, TYPE_STRING].indexOf(requiredType) < 0) {
          throw new Error('TypeError');
        }
        // In order to get a stable sort out of an unstable
        // sort algorithm, we decorate/sort/undecorate (DSU)
        // by creating a new list of [index, element] pairs.
        // In the cmp function, if the evaluated elements are
        // equal, then the index will be used as the tiebreaker.
        // After the decorated list has been sorted, it will be
        // undecorated to extract the original elements.
        const decorated = [];
        for (let i = 0; i < sortedArray.length; i += 1) {
          decorated.push([i, sortedArray[i]]);
        }
        decorated.sort((a, b) => {
          const exprA = interpreter.visit(exprefNode, a[1]);
          const exprB = interpreter.visit(exprefNode, b[1]);
          if (getTypeName(exprA) !== requiredType) {
            throw new Error(
              `TypeError: expected ${requiredType}, received ${
                getTypeName(exprA)}`,
            );
          } else if (getTypeName(exprB) !== requiredType) {
            throw new Error(
              `TypeError: expected ${requiredType}, received ${
                getTypeName(exprB)}`,
            );
          }
          if (exprA > exprB) {
            return 1;
          }
          if (exprA < exprB) {
            return -1;
          }
          // If they're equal compare the items by their
          // order to maintain relative order of equal keys
          // (i.e. to get a stable sort).
          return a[0] - b[0];
        });
        // Undecorate: extract out the original list elements.
        for (let j = 0; j < decorated.length; j += 1) {
          [, sortedArray[j]] = decorated[j];
        }
        return sortedArray;
      },
      _signature: [{ types: [TYPE_ARRAY] }, { types: [TYPE_EXPREF] }],
    },

    join: {
      _func: resolvedArgs => {
        const joinChar = resolvedArgs[0];
        const listJoin = resolvedArgs[1];
        return listJoin.join(joinChar);
      },
      _signature: [
        { types: [TYPE_STRING] },
        { types: [TYPE_ARRAY_STRING] },
      ],
    },

    reverse: {
      _func: resolvedArgs => {
        const originalStr = valueOf(resolvedArgs[0]);
        const typeName = getTypeName(originalStr);
        if (typeName === TYPE_STRING) {
          let reversedStr = '';
          for (let i = originalStr.length - 1; i >= 0; i -= 1) {
            reversedStr += originalStr[i];
          }
          return reversedStr;
        }
        const reversedArray = resolvedArgs[0].slice(0);
        reversedArray.reverse();
        return reversedArray;
      },
      _signature: [{ types: [TYPE_STRING, TYPE_ARRAY] }],
    },

    toArray: {
      _func: resolvedArgs => {
        if (getTypeName(resolvedArgs[0]) === TYPE_ARRAY) {
          return resolvedArgs[0];
        }
        return [resolvedArgs[0]];
      },

      _signature: [{ types: [TYPE_ANY] }],
    },

    toString: {
      _func: resolvedArgs => {
        if (getTypeName(resolvedArgs[0]) === TYPE_STRING) {
          return resolvedArgs[0];
        }
        return JSON.stringify(resolvedArgs[0]);
      },

      _signature: [{ types: [TYPE_ANY] }],
    },

    toNumber: {
      _func: resolvedArgs => {
        const typeName = getTypeName(resolvedArgs[0]);
        if (typeName === TYPE_NUMBER) {
          return resolvedArgs[0];
        }
        if (typeName === TYPE_STRING) {
          return toNumber(resolvedArgs[0]);
        }
        return null;
      },
      _signature: [{ types: [TYPE_ANY] }],
    },

    notNull: {
      _func: resolvedArgs => {
        for (let i = 0; i < resolvedArgs.length; i += 1) {
          if (getTypeName(resolvedArgs[i]) !== TYPE_NULL) {
            return resolvedArgs[i];
          }
        }
        return null;
      },
      _signature: [{ types: [TYPE_ANY], variadic: true }],
    },
  };
}
