const { watchTree } = require("watch");
const {
  buildClientJs,
  buildComponents,
  buildPages,
  buildStaticPages,
  copyClientJs,
  copyAssets,
} = require("./build");

function watch() {
  watchTree("components/src", () => {
    buildComponents();
  });
  watchTree("pages/src", () => {
    buildPages();
    buildStaticPages();
  });
  watchTree("client-js/src", () => {
    buildClientJs();
    copyClientJs();
  });
  watchTree("static", () => {
    copyAssets();
  });
}

module.exports = watch;
