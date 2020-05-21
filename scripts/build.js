const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const runNpmBinary = require("../common/run-npm-binary");
const renderStaticPage = require("../common/render-static-page");
const silence = require("../common/silence");

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
  // Create dist folder, if it doesn't exist yet
  silence(() => spawnSync("mkdir ./dist"));

  fs.readdirSync("./pages/lib").forEach((page) => {
    console.info(`Generate page ${page}`);
    renderStaticPage(page);
  });
}

function copyClientJs() {
  spawnSync("cp -R client-js/lib/* dist/");
}

function copyAssets() {
  spawnSync("cp -R static/* dist/");
}

module.exports = build;
