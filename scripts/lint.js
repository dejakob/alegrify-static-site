const path = require("path");

const runNpmBinary = require("../common/run-npm-binary");

function lint(...args) {
  runNpmBinary(
    `eslint ${args.indexOf("fix") > -1 ? "--fix " : ""}--config ${path.join(
      process.env.PWD,
      ".eslintrc.json"
    )} '${path.join(
      process.env.PWD,
      "/[(components)|(pages)|(client-js)]/src/**/*.js"
    )}'`
  );
}

module.exports = lint;
