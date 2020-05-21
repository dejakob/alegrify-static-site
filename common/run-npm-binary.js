const path = require("path");
const { spawnSync } = require("child_process");

function runNpmBinary(script) {
  const [binaryName, ...args] = script.split(" ");
  const fullPath = path.join(__dirname, "../../.bin", binaryName);
  return spawnSync(`${fullPath} ${args.join(" ")}`);
}

module.exports = runNpmBinary;
