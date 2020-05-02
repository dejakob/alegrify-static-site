#!/usr/bin/env node
/* eslint-disable node/shebang,import/no-dynamic-require,global-require  */
const path = require("path");

run(process.argv.slice(2));

function run(scriptName, ...scriptArgs) {
  let script;

  try {
    script = require(path.join(__dirname, `../scripts/${scriptName}`));
  } catch (ex) {
    console.info(`Alegrify Static Site Generator
===========

[init] Set up new project in current directory
[build] Build dist output folder
[watch] Watch files for changes and build
[dev] Watch and livereload
[lint] Run eslint with predefined config`);
  }

  script(...scriptArgs);
}
