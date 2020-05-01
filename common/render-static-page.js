/* eslint-disable no-console,no-restricted-syntax,no-await-in-loop,global-require,import/no-dynamic-require */
const fs = require("fs");
const path = require("path");

const { renderToStaticMarkup } = require("react-dom/server");

function renderStaticPage(fileName) {
  try {
    const pageComponent = require(path.join(
      process.env.PWD,
      `./pages/lib/${fileName}`
    ));
    console.log("page component", pageComponent);
    const htmlString = renderToStaticMarkup(pageComponent());

    fs.writeFileSync(
      `./dist/${fileName.replace(/js$/gi, "html")}`,
      `<!doctype html>${htmlString}`
    );
  } catch (ex) {
    console.error(ex);
  }
}

module.exports = renderStaticPage;
