const { watchTree } = require("watch");
const {
  buildClientJs,
  buildComponents,
  buildPages,
  buildStaticPages,
  buildScss,
  buildLessCss,
  buildPostCss,
  copyClientJs,
  copyAssets,
} = require("./build");
const silence = require("../common/silence");

function watch() {
  watchTree("components/src", () => {
    silence(buildComponents);
  });
  watchTree("pages/src", () => {
    silence(buildPages);
    silence(buildStaticPages);
    silence(buildScss);
    silence(buildLessCss);
    silence(buildPostCss);
  });
  watchTree("client-js/src", () => {
    silence(buildClientJs);
    silence(copyClientJs);
  });
  watchTree("static", () => {
    silence(copyAssets);
  });

  process.on("uncaughtException", watch);
}

module.exports = watch;
