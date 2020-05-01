const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const renderStaticPage = require("../common/render-static-page");

const cmd = (name) => path.join(__dirname, "../../.bin", name);
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
  execSync(`${cmd("webpack")} --config ${config("webpack.config.js")}`);
}

/**
 * Transpile components folder
 */
function buildComponents() {
  execSync(
    `${cmd("babel")} ./components/src --config-file ${config(
      "ssr.babelrc"
    )} --out-dir ./components/lib`
  );
}

/**
 * Transpile pages folder
 */
function buildPages() {
  execSync(
    `${cmd("babel")} ./pages/src --config-file ${config(
      "ssr.babelrc"
    )} --out-dir ./pages/lib`
  );
}

/**
 * Page generator
 */
function buildStaticPages() {
  fs.readdirSync("./pages/lib").forEach((page) => {
    renderStaticPage(page);
  });
}

function copyClientJs() {
  execSync("cp -R client-js/lib/* dist/");
}

function copyAssets() {
  execSync("cp -R static/* dist/");
}

module.exports = build;
