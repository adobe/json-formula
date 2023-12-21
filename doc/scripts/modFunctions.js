/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const docDir = path.dirname(fileURLToPath(import.meta.url));

const functionsFile = path.join(docDir, '..', 'functions.md');

/* The markdown has lines that look like:

## abs(value) ⇒ <code>number</code>

transform it to:

## abs
Signature
:abs(value) ⇒ <code>number</code>
*/

const functions = fs.readFileSync(functionsFile).toString();
const updatedFunctions = functions
  // reduce the section header to just the name of the function instead
  // of the full function signature.
  .replace(/##\s*([a-zA-Z0-9]+)(.*)/g, '\n## $1\n**$1$2**\n\n**Description**')
  .replace(/\*\*Kind\*\*: global function /g, '')
  .replace(/\\\|/g, '{vbar}')
  // weirdly, the markdown generator makes 'null' parameters a link to the null() function
  .replace(/\[<code>null<\/code>\]\(#null\)/g, 'null');

fs.writeFileSync(functionsFile, updatedFunctions);
