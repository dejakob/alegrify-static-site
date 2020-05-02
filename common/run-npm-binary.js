const path = require("path");
const { execSync } = require("child_process");

function runNpmBinary(script) {
  const [binaryName, ...args] = script.split(' ');
  const fullPath = path.join(__dirname, "../../.bin", binaryName);
  return execSync(`${fullPath} ${args.join(' ')}`);
}

module.exports = runNpmBinary;
