/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require("fs");
const path = require("path");

const PACKAGE_JSON = JSON.parse(
  fs.readFileSync(path.join(process.env.PWD, "./package.json")).toString()
);

function createPageConfig() {
  return {
    package: { ...PACKAGE_JSON },
    getScriptFile: (scriptPath) =>
      `${scriptPath}.js`.replace(/(\.js)+$/i, `-${PACKAGE_JSON.version}.js`),
    getStyleFile: (stylePath) =>
      `${stylePath}.css`.replace(/(\.css)+$/i, `-${PACKAGE_JSON.version}.css`),
  };
}

module.exports = createPageConfig();
