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
  watchTree("components/src", (...a) => {
    console.log('components', a)
    silence(buildComponents);
    silence(buildPages);
    silence(buildStaticPages);
    silence(buildScss);
    silence(buildLessCss);
    silence(buildPostCss);
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
  watchTree("utils", () => {
    silence(buildComponents);
    silence(buildPages);
    silence(buildStaticPages);
    silence(buildScss);
    silence(buildLessCss);
    silence(buildPostCss);
  });

  process.on("uncaughtException", watch);
}

module.exports = watch;
