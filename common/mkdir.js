const { spawnSync } = require("child_process");

/**
 * Safely create directory
 * @param {string} directoryName
 */
function mkdir(directoryName) {
  try {
    spawnSync(`mkdir ${directoryName}`);
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.info(`Directory ${directoryName} already exists`);
  }
}

module.exports = mkdir;
