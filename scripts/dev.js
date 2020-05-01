const path = require("path");
const { execSync } = require("child_process");

const build = require("./build");
const watch = require("./watch");

const cmd = (name) => path.join(__dirname, "../../.bin", name);

function start() {
  build();
  execSync(`${cmd("ws")} --directory dist -o`);
  watch();
}

module.exports = start;
