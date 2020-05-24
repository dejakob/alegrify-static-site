/**
 * Try catch and ignore failures
 */
function silence(cb) {
  try {
    cb();
  } catch (ex) {
    // Silence error
  }
}

module.exports = silence;
