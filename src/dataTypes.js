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

// Type constants used to define functions.
const dataTypes = {
  TYPE_NUMBER: 0,
  TYPE_ANY: 1,
  TYPE_STRING: 2,
  TYPE_ARRAY: 3,
  TYPE_OBJECT: 4,
  TYPE_BOOLEAN: 5,
  TYPE_EXPREF: 6,
  TYPE_NULL: 7,
  TYPE_ARRAY_NUMBER: 8,
  TYPE_ARRAY_STRING: 9,
  TYPE_ARRAY_ARRAY: 10,
  TYPE_EMPTY_ARRAY: 11,
};

const typeNameTable = {
  [dataTypes.TYPE_NUMBER]: 'number',
  [dataTypes.TYPE_ANY]: 'any',
  [dataTypes.TYPE_STRING]: 'string',
  [dataTypes.TYPE_ARRAY]: 'array',
  [dataTypes.TYPE_OBJECT]: 'object',
  [dataTypes.TYPE_BOOLEAN]: 'boolean',
  [dataTypes.TYPE_EXPREF]: 'expression',
  [dataTypes.TYPE_NULL]: 'null',
  [dataTypes.TYPE_ARRAY_NUMBER]: 'Array<number>',
  [dataTypes.TYPE_ARRAY_STRING]: 'Array<string>',
  [dataTypes.TYPE_ARRAY_ARRAY]: 'Array<array>',
  [dataTypes.TYPE_EMPTY_ARRAY]: 'array',
};

export { dataTypes, typeNameTable };
