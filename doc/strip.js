import fs from 'fs';
// import { exec } from 'child_process';

// process.chdir('doc');
const grammar = fs.readFileSync('../antlr/JsonFormula.g4').toString();
const strippedGrammar = grammar.replace(/[\s\S.]*grammar/m, 'grammar');

fs.writeFileSync('grammar.g4', strippedGrammar);

/*
// "asciidoctor -b html5 doc/spec.adoc -o dist/spec.html",

exec('../node_modules/.bin/asciidoctor -b html5 spec.adoc -o ../dist/spec.html', err => {
  if (err) {
    // eslint-disable-next-line no-console
    console.dir(err);
  }
});

exec('sh makePDF.sh', err => {
  if (err) {
    // eslint-disable-next-line no-console
    console.dir(err);
  }
});

exec('rm grammar.g4');
*/
