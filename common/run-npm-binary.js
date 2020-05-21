const path = require("path");
const { exec } = require("child_process");

function runNpmBinary(script) {
  const [binaryName, ...args] = script.split(" ");
  const fullPath = path.join(__dirname, "../../.bin", binaryName);

  exec(`${fullPath} ${args.join(" ")}`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
  });
}

module.exports = runNpmBinary;
