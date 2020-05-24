/* eslint-disable no-console,no-restricted-syntax,no-await-in-loop,global-require,import/no-dynamic-require */
const fs = require("fs");
const path = require("path");

const { renderToStaticMarkup } = require("react-dom/server");

function renderStaticPage(fileName) {
  const pageComponent = requireUncached(
    path.join(process.env.PWD, `./pages/lib/${fileName}`)
  );
  const htmlString = renderToStaticMarkup(pageComponent());

  fs.writeFileSync(
    `./dist/${fileName.replace(/js$/gi, "html")}`,
    `<!doctype html>${htmlString}`
  );
}

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

module.exports = renderStaticPage;
