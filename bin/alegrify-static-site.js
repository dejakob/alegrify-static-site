#!/usr/bin/env node
/* eslint-disable node/shebang,import/no-dynamic-require,global-require  */
const path = require("path");

run(process.argv[2]);

function run(input) {
  const [scriptName, ...scriptArgs] = input.split(",");
  let script;

  try {
    script = require(path.join(__dirname, `../scripts/${scriptName}`));

    if (typeof script !== "function") {
      throw new Error("Script not a function");
    }
  } catch (ex) {
    console.info(`Alegrify Static Site Generator
    ==============================

    [init] Set up new project in current directory
    [build] Build dist output folder
    [watch] Watch files for changes and build
    [dev] Watch and livereload
    [lint] Run eslint with predefined config
    [upload] Upload dist to gcloud`);
  }

  try {
    script(...scriptArgs);
  } catch (ex) {
    console.log(`❌ Running ${scriptName} failed`);
    throw ex;
  }
}
