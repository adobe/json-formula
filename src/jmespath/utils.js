export function isArray(obj) {
  if (obj !== null) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
  return false;
}

export function isObject(obj) {
  if (obj !== null) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  return false;
}

export function getValueOf(a) {
  if (a === null || a === undefined) return a;
  if (isArray(a)) {
    return a.map(i => getValueOf(i));
  }
  // if we have a child named 'valueOf' then we're an object,
  // and just return the object.
  if (typeof (a.valueOf) !== 'function') return a;
  return a.valueOf();
}

export function strictDeepEqual(lhs, rhs) {
  const first = getValueOf(lhs);
  const second = getValueOf(rhs);
  // Check the scalar case first.
  if (first === second) {
    return true;
  }

  // Check if they are the same type.
  const firstType = Object.prototype.toString.call(first);
  if (firstType !== Object.prototype.toString.call(second)) {
    return false;
  }
  // We know that first and second have the same type so we can just check the
  // first type from now on.
  if (isArray(first) === true) {
    // Short circuit if they're not the same length;
    if (first.length !== second.length) {
      return false;
    }
    for (let i = 0; i < first.length; i += 1) {
      if (strictDeepEqual(first[i], second[i]) === false) {
        return false;
      }
    }
    return true;
  }
  if (isObject(first) === true) {
    // An object is equal if it has the same key/value pairs.
    const keysSeen = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key in first) {
      if (hasOwnProperty.call(first, key)) {
        if (strictDeepEqual(first[key], second[key]) === false) {
          return false;
        }
        keysSeen[key] = true;
      }
    }
    // Now check that there aren't any keys in second that weren't
    // in first.
    // eslint-disable-next-line no-restricted-syntax
    for (const key2 in second) {
      if (hasOwnProperty.call(second, key2)) {
        if (keysSeen[key2] !== true) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
}
