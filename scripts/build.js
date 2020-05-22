const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const runNpmBinary = require("../common/run-npm-binary");
const renderStaticPage = require("../common/render-static-page");
const silence = require("../common/silence");

const config = (name) => path.join(__dirname, "../config", name);

function build() {
  buildClientJs();
  buildComponents();
  buildPages();
  buildStaticPages();
  buildScss();
  buildLessCss();
  buildPostCss();
  copyClientJs();
  copyAssets();
}
build.buildClientJs = buildClientJs;
build.buildComponents = buildComponents;
build.buildPages = buildPages;
build.buildStaticPages = buildStaticPages;
build.buildScss = buildScss;
build.buildLessCss = buildLessCss;
build.buildPostCss = buildPostCss;
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
  silence(() => execSync("mkdir ./dist"));

  fs.readdirSync("./pages/lib").forEach((page) => {
    if (page.endsWith(".js")) {
      console.info(`Generate page ${page}`);
      renderStaticPage(page);
    }
  });
}

function buildLessCss() {
  fs.readdirSync("./pages/src").forEach((page) => {
    buildLessPage("pages", page);
  });
}

function buildLessPage(folder, page) {
  if (page.endsWith(".less")) {
    runNpmBinary(
      `lessc --source-map --clean-css="--s0" --autoprefix ${path.join(
        process.env.PWD,
        `./${folder}/src/${page} ${path.join(
          process.env.PWD,
          `./dist/${page.replace(".less", ".css")}`
        )}`
      )}`
    );
  }
}

function buildScss() {
  fs.readdirSync("./pages/src").forEach((page) => {
    buildScssPage("pages", page);
  });
}

function buildScssPage(folder, page) {
  if (page.endsWith(".scss")) {
    runNpmBinary(
      `sass ${path.join(
        process.env.PWD,
        `./${folder}/src/${page} ${path.join(
          process.env.PWD,
          `./dist/${page.replace(".scss", ".css")}`
        )}`
      )} --style compressed`
    );
  }
}

function buildPostCss() {
  fs.readdirSync("./pages/src").forEach((page) => {
    buildPostCssPage("pages", page);
  });
}

function buildPostCssPage(folder, page) {
  if (page.endsWith(".css")) {
    runNpmBinary(
      `postcss ${path.join(
        process.env.PWD,
        `./${folder}/src/${page} -o ${path.join(
          process.env.PWD,
          `./dist/${page}`
        )}`
      )} --use autoprefixer postcss-preset-env`
    );
  }
}

function copyClientJs() {
  execSync("cp -R client-js/lib/* dist/");
}

function copyAssets() {
  execSync("cp -R static/* dist/");
}

module.exports = build;
