const { watchTree } = require("watch");
const { buildClientJs, buildComponents, buildPages } = require("./build");

function watch() {
  watchTree("components/src", () => buildComponents());
  watchTree("pages/src", () => buildPages());
  watchTree("client-js/src", () => buildClientJs());
}

module.exports = watch;
