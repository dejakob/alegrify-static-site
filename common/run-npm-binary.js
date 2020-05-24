const path = require("path");
const { exec } = require("child_process");

function runNpmBinary(script) {
  const [binaryName, ...args] = script.split(" ");
  const fullPath = path.join(__dirname, "../../.bin", binaryName);

  return new Promise((resolve, reject) => {
    exec(`${fullPath} ${args.join(" ")}`, (err, stdout, stderr) => {
      if (err) {
        console.log("❌ ERROR RUNNING NPM BINARY");
        console.log(script);
        console.log("");
        console.log("========================");
        console.log(stderr);
        console.log("");

        return reject();
      }

      console.log(`✅ Script ${script.split(" ")[0]}`);
      return resolve();
    });
  });
}

module.exports = runNpmBinary;
