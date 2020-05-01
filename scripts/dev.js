const path = require("path");
const { execSync } = require("child_process");

const build = require("./build");
const watch = require("./watch");

const cmd = (name) => path.join(__dirname, "../../.bin", name);

function start() {
  build();
  console.log(`${cmd("ws")} --directory dist -p 6666 -o`);
  execSync(`${cmd("ws")} --directory dist -p 6666 -o`);
  watch();
}

module.exports = start;
