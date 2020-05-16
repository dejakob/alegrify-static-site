/**
 * Try catch and ignore failures
 */
function silence(cb) {
  try {
    cb();
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.log("SILENCED ERROR", ex);
  }
}

module.exports = silence;
