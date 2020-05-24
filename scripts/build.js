const fs = require("fs");
const path = require("path");
const { exec, execSync } = require("child_process");

const runNpmBinary = require("../common/run-npm-binary");
const renderStaticPage = require("../common/render-static-page");
const silence = require("../common/silence");
const mkdir = require("../common/mkdir");

const config = (name) => path.join(__dirname, "../config", name);

async function build({ exitOnFailure } = { exitOnFailure: true }) {
  try {
    await buildClientJs();
    await buildComponents();
    await buildPages();
    buildStaticPages();

    buildScss();
    buildLessCss();
    buildPostCss();

    await copyClientJs();
    await copyAssets();

    console.log("🎉🎉🎉");
    console.log("BUILD SUCCEEDED!");
    console.log("🎉🎉🎉");
  } catch (ex) {
    if (exitOnFailure) {
      // eslint-disable-next-line no-process-exit
      process.exit(3);
    }
  }
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
  return runNpmBinary(`webpack --config ${config("webpack.config.js")}`);
}

/**
 * Transpile components folder
 */
function buildComponents() {
  return runNpmBinary(
    `babel ./components/src --config-file ${config(
      "ssr.babelrc"
    )} --out-dir ./components/lib`
  );
}

/**
 * Transpile pages folder
 */
function buildPages() {
  return runNpmBinary(
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
  mkdir('./dist');

  fs.readdirSync("./pages/lib").forEach((page) => {
    if (page.endsWith(".js")) {
      try {
        renderStaticPage(page);
        console.log(`✅ Generated ${page} successfully`);
      } catch (ex) {
        console.log(`❌ Could not render ${page}`);
        console.log(ex);
        throw ex;
      }
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
  return new Promise((resolve, reject) => {
    exec("cp -R client-js/lib/* dist/", (err, stdout, stderr) => {
      if (err) {
        console.log("❌ ERROR copying client js files");
        console.log("");
        console.log("========================");
        console.log(stderr);
        console.log("");

        return reject();
      }

      console.log(`✅ Copied client JS files`);
      return resolve();
    });
  });
}

function copyAssets() {
  return new Promise((resolve, reject) => {
    exec("cp -R static/* dist/", (err, stdout, stderr) => {
      if (err) {
        console.log("❌ ERROR copying assets");
        console.log("");
        console.log("========================");
        console.log(stderr);
        console.log("");

        return reject();
      }

      console.log(`✅ Copied assets`);
      return resolve();
    });
  });
}

module.exports = build;
