const fs = require("fs");

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
  copyAsset,
} = require("./build");

function watch() {
  watchTree("components/src", async () => {
    await buildComponents();
    await buildPages();
    buildStaticPages();

    buildScss();
    buildLessCss();
    buildPostCss();
  });
  watchTree("pages/src", async () => {
    await buildPages();
    buildStaticPages();

    buildScss();
    buildLessCss();
    buildPostCss();
  });
  watchTree("client-js/src", async () => {
    await buildClientJs();
    await copyClientJs();
    buildStaticPages();
  });
  watchTree("static", async ({ static }) => {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const filePath of Object.keys(static)) {
      /* eslint-disable-next-line no-await-in-loop */
      await copyAsset(filePath);
    }
  });

  if (fs.existsSync("./utils")) {
    watchTree("utils", async () => {
      await buildComponents();
      await buildPages();
      await buildClientJs();

      await copyClientJs();

      buildStaticPages();
      buildScss();
      buildLessCss();
      buildPostCss();
    });
  }
}

module.exports = watch;
