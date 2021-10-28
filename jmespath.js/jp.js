#!/usr/bin/env node
/* eslint-disable no-console */
const jmespath = require('./jmespath');

process.stdin.setEncoding('utf-8');

if (process.argv.length < 2) {
  console.log('Must provide a jmespath expression.');
  process.exit(1);
}
let inputJSON = '';

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    inputJSON += chunk;
  }
});

process.stdin.on('end', () => {
  const parsedInput = JSON.parse(inputJSON);
  console.log(JSON.stringify(jmespath.search(parsedInput, process.argv[2])));
});
