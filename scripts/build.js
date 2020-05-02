const fs = require("fs");
const path = require("path");

const runNpmBinary = require("../common/run-npm-binary");
const renderStaticPage = require("../common/render-static-page");

const config = (name) => path.join(__dirname, "../config", name);

function build() {
  buildClientJs();
  buildComponents();
  buildPages();
  buildStaticPages();
  copyClientJs();
  copyAssets();
}
build.buildClientJs = buildClientJs;
build.buildComponents = buildComponents;
build.buildPages = buildPages;
build.buildStaticPages = buildStaticPages;
build.copyClientJs = copyClientJs;
build.copyAssets = copyAssets;

/**
 * Transpile client-js folder
 */
function buildClientJs() {
  runNpmBinary(`webpack --config ${config("webpack.config.js")}`);
}

/**
 * Transpile components folder
 */
function buildComponents() {
  runNpmBinary(
    `babel ./components/src --config-file ${config(
      "ssr.babelrc"
    )} --out-dir ./components/lib`
  );
}

/**
 * Transpile pages folder
 */
function buildPages() {
  runNpmBinary(
    `babel ./pages/src --config-file ${config(
      "ssr.babelrc"
    )} --out-dir ./pages/lib`
  );
}

/**
 * Page generator
 */
function buildStaticPages() {
  fs.readdirSync("./pages/lib").forEach((page) => {
    console.info(`Generate page ${page}`);
    renderStaticPage(page);
  });
}

function copyClientJs() {
  runNpmBinary("cp -R client-js/lib/* dist/");
}

function copyAssets() {
  runNpmBinary("cp -R static/* dist/");
}

module.exports = build;
