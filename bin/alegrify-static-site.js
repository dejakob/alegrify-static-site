#!/usr/bin/env node
const build = require("../scripts/build");
const dev = require("../scripts/dev");
const init = require("../scripts/init");
const watch = require("../scripts/watch");

const SCRIPTS_TO_RUN = {
  build,
  dev,
  init,
  watch,
};

run(process.argv.slice(2));

function run(script, ...scriptArgs) {
  if (!SCRIPTS_TO_RUN[script]) {
    throw new Error(`There is no ${script} script.`);
  }

  SCRIPTS_TO_RUN[script](...scriptArgs);
}
