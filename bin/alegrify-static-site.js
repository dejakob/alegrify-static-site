#!/usr/bin/env node
/* eslint-disable node/shebang,import/no-dynamic-require,global-require  */
const path = require("path");

run(process.argv[2]);

function run(input) {
  const [scriptName, ...scriptArgs] = input.split(",");
  let script;

  try {
    script = require(path.join(__dirname, `../scripts/${scriptName}`));
    console.log(script(...scriptArgs));
  } catch (ex) {
    if (process.env.CI) {
      console.error(`Error when running script ${scriptName}`);
      throw ex;
    } else {
      console.info(`Alegrify Static Site Generator
      ===========

      [init] Set up new project in current directory
      [build] Build dist output folder
      [watch] Watch files for changes and build
      [dev] Watch and livereload
      [lint] Run eslint with predefined config
      [upload] Upload dist to gcloud`);
    }
  }
}
