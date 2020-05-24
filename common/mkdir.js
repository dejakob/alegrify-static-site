const { execSync } = require("child_process");

/**
 * Safely create directory
 * @param {string} directoryName
 */
function mkdir(directoryName) {
  try {
    execSync(`mkdir ${directoryName} >/dev/null 2>&1`);
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.info(`ℹ️  Directory ${directoryName} already exists`);
  }
}

module.exports = mkdir;
