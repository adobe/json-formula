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
const adocFile = path.join(docDir, '..', 'functions.adoc');

const version = process.argv[1] || '1.0';

const functions = fs.readFileSync(adocFile).toString();

/* The asciidoc has lines that look like:

link:#datetime[datetime]
transform it to:

<<_datetime>>
*/
const updatedFunctions = functions
  .replace(/link:#([a-zA-Z0-9]+)[[a-zA-Z0-9]+]/g, '<<_$1>>')
  .replace(/1\.0, {docdate}:/, `${version}, {docdate}:`)
  .replace(/`\*`/g, '`{asterisk}`')
  .replace(/\\{vbar}/g, '{vbar}');

fs.writeFileSync(path.join(docDir, '..', 'functions.adoc'), updatedFunctions);
