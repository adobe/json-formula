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
import JsonFormula from '../src/json-formula.js';
import stringToNumber from '../src/jmespath/stringToNumber.js';
import createForm from '../tutorial/Form.js';

test('if executes correct branch', () => {
  const customFunctions = {
    true_fn: {
      _func: () => true,
      _signature: [],
    },
    false_fn: {
      _func: () => false,
      _signature: [],
    },
  };

  const jsonFormula = new JsonFormula(customFunctions);

  const expressionTrue = 'if(true(),true_fn(),false_fn())';
  const expressionFalse = 'if(false(),true_fn(),false_fn())';
  const spyTrue = jest.spyOn(customFunctions.true_fn, '_func');
  const spyFalse = jest.spyOn(customFunctions.false_fn, '_func');

  const resultTrue = jsonFormula.search(expressionTrue, {});
  expect(resultTrue).toEqual(true);
  expect(spyTrue).toHaveBeenCalled();
  expect(spyFalse).not.toHaveBeenCalled();

  jest.clearAllMocks();
  const resultFalse = jsonFormula.search(expressionFalse, {});
  expect(spyTrue).not.toHaveBeenCalled();
  expect(spyFalse).toHaveBeenCalled();
  expect(resultFalse).toEqual(false);
});

test('handle function that throws', () => {
  const customFunctions = {
    throw: {
      _func: () => {
        throw new RangeError('big mistake');
      },
      _signature: [],
    },
  };

  const debug = [];
  const jsonFormula = new JsonFormula(customFunctions, stringToNumber, debug);

  expect(() => jsonFormula.search('throw()', {})).toThrow('big mistake');
  expect(debug).toHaveLength(1);
  expect(debug[0]).toEqual('big mistake');
});

test('can pass a class as a function argument', () => {
  // i.e. make sure it does not resolve to the scalar value of a field
  const TYPE_CLASS = 10;

  const getNameFunc = 'getName(address.street)';

  const customFunctions = {
    getName: {
      _func: ([fld]) => fld.$name,
      _signature: [{ types: [TYPE_CLASS] }],
    },
  };
  const root = createForm({ address: { street: 'Oak' } });
  const jsonFormula = new JsonFormula(customFunctions);
  const result = jsonFormula.search(
    getNameFunc,
    root,
  );
  expect(result).toEqual('street');
});

test('custom function with a lambda parameter', () => {
  const TYPE_STRING = 2;
  const TYPE_EXPREF = 6;
  const testCustomFunc = 'customEval(\'string\', &@ & @)';

  const customFunctions = {
    customEval: {
      // eslint-disable-next-line no-underscore-dangle
      _func: ([str, fn]) => customFunctions.customEval._runtime.interpreter.visit(fn, str),
      _signature: [{ types: [TYPE_STRING] }, { types: [TYPE_EXPREF] }],
    },
  };
  const root = createForm({ address: { street: 'Oak' } });
  const jsonFormula = new JsonFormula(customFunctions);
  const result = jsonFormula.search(
    testCustomFunc,
    root,
  );
  expect(result).toEqual('stringstring');
});

test('creating second form should not affect first form', () => {
  const data = { data: { address: { street: 'Oak' } } };

  const form1 = createForm(data);
  const numFields1 = form1.$fields.length;
  const form2 = createForm(data);
  const numFields2 = form2.$fields.length;

  expect(form1.$fields).toHaveLength(numFields1);
  expect(numFields1).toEqual(numFields2);
});

test('Access properties of array-based fieldset', () => {
  const items = [100, 200, 300];

  const form1 = createForm(items);
  const expression = 'length($form.$fields)';
  const result = new JsonFormula().search(expression, { $form: form1 }, form1);

  expect(result).toBe(3);
});

describe('current datetime tests', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
    // 2nd Jan 1970 12 PM
    jest.setSystemTime(Date.UTC(1970, 0, 2, 12));
  });

  test('now returns the correct value', () => {
    const expression = 'now()';
    const result = new JsonFormula().search(expression, {});
    expect(result).toEqual(1.5);
  });

  test('today returns the correct value', () => {
    const expression = 'today()';
    const result = new JsonFormula().search(expression, {});
    expect(result).toBeCloseTo(1.2083333333333333, 10);
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});

describe('expressions with globals', () => {
  const data = { data: { address: { street: 'Oak' } } };
  const form = createForm(data);

  test('should extract value from global', () => {
    const expression = '$form.address.street';
    const globals = {
      $form: form.data,
    };
    const result = new JsonFormula().search(expression, {}, globals);
    expect(result.valueOf()).toEqual(globals.$form.address.street.valueOf());
  });

  test('should extract correct value for common name in global and data', () => {
    const expression = '$form.address.street';
    const globals = {
      $form: form.data,
    };
    const json = {
      $form: 'ignore',
    };
    const result = new JsonFormula().search(expression, json, globals);
    expect(result.valueOf()).toEqual(globals.$form.address.street.valueOf());
  });

  test('should ignore globals not at top level', () => {
    const expression = 'address.$form';
    const globals = {
      $form: 'ignore',
    };
    const json = {
      address: {
        $form: 'value',
      },
    };
    const result = new JsonFormula().search(expression, json, globals);
    expect(result.valueOf()).toEqual(json.address.$form);
  });

  test('should not extract invalid globals', () => {
    const globals = {
      '#form': 'ignore',
      form: 'ignore',
    };
    const json = {
      '#form': 'value',
    };
    const result1 = new JsonFormula().search('"#form"', json, globals);
    expect(result1).toEqual(json['#form']);
    const result2 = new JsonFormula().search('form', json, globals);
    expect(result2).toEqual(null);
  });

  test('access globals in custom functions', () => {
    const globals = {
      element: 'value',
    };
    const customFunctions = {
      customFunc: {
        _func: (_args, _searchData, interpreter) => interpreter.globals.element,
        _signature: [],
      },
    };
    const expression = 'customFunc()';
    const result = new JsonFormula(customFunctions).search(expression, {}, globals);
    expect(result).toEqual(globals.element);
  });
});

test('expressions in brackets', () => {
  const sample = {
    array: [0, 1, 2, 3, 4],
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    ten: 10,
  };
  const testcases = [
    ['array[$form.zero]', 0],
    ['array[$form.one + $form.two]', 3],
    ['array[$form.zero:]', [0, 1, 2, 3, 4]],
    ['array[0:$form.two]', [0, 1]],
    ['array[$form.zero:length(@)-1:$form.one]', [0, 1, 2, 3]],
    ['array | [$form.ten]', [10]],
    ['array | [::$form.two]', [0, 2, 4]],
    ['array | [0::$form.two]', [0, 2, 4]],
    ['array | [$form.zero::$form.two]', [0, 2, 4]],
  ];
  const globals = {
    $form: sample,
  };
  testcases.forEach(([expression, expected]) => {
    const result = new JsonFormula().search(expression, sample, globals);
    expect(result).toEqual(expected);
  });

  const failures = [
    'array[3 3]',
    'array[$form.zero:$form.ten:$form.one:$form.one]',
    'array[$form.zero, $form.one]',
  ];
  failures.forEach(expression => {
    expect(() => new JsonFormula().search(expression, sample, globals)).toThrow();
  });
});
