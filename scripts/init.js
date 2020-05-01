const path = require("path");
const { execSync } = require("child_process");

const mkdir = require("../common/mkdir");
const { version } = require("../package.json");

const DIRECTORIES = [
  // Pages to generate build time (SSR)
  "pages",
  "pages/src",

  // Isomorphic components
  "components",
  "components/src",

  // Gcloud functions / serverless web workers
  "cloud-functions",

  // Assets (e.g. images, favicon, ...)
  "static",

  // Client side JavaScript
  "client-js",
  "client-js/src",

  "dist",
];
const FILES_TO_COPY = {
  [path.join(__dirname, "../.editorconfig")]: ".editorconfig",
  [path.join(__dirname, "../.eslintrc.json")]: ".eslintrc.json",
  [path.join(__dirname, "../templates/gitignore.txt")]: ".gitignore",
  [path.join(__dirname, "../templates/npmignore.txt")]: ".npmignore",
  [path.join(__dirname, "../templates/README.md")]: "README.md",
  [path.join(__dirname, "../templates/package.json")]: "package.json",
  [path.join(__dirname, "../templates/index.js")]: "pages/src/index.js",
  [path.join(__dirname, "../templates/head.js")]: "components/src/head.js",
  [path.join(__dirname, "../templates/client.js")]: "client-js/src/index.js",
};
const DIRECTORIES_TO_COPY = {
  [path.join(__dirname, "../.vscode")]: ".vscode",
  [path.join(__dirname, "../templates/static")]: "static",
};
const DEV_DEPS = ["alegrify-static-site"];
const DEPS = ["react", "react-dom", "react-alegrify-ui"];

/**
 * Initialize new project
 */
function init() {
  console.info(".:: Creating new project ::.");
  console.info("This can take some time");

  // Create all directories
  DIRECTORIES.forEach((directory) => {
    mkdir(directory);
  });

  // Copy config files
  Object.keys(FILES_TO_COPY).forEach((fileFrom) => {
    const fileTo = FILES_TO_COPY[fileFrom];
    execSync(`cp ${fileFrom} ${fileTo}`);
  });

  // Copy full directories
  Object.keys(DIRECTORIES_TO_COPY).forEach((directoryFrom) => {
    const directoryTo = DIRECTORIES_TO_COPY[directoryFrom];
    execSync(`cp -R ${directoryFrom} ${directoryTo}`);
  });

  // Add dev deps
  DEV_DEPS.forEach((devDep) => {
    execSync(`npm i --save-dev ${devDep}@${version}`);
  });

  // Add deps
  DEPS.forEach((dep) => {
    execSync(`npm i --save --save-exact ${dep}`);
  });
}

module.exports = init;
