/* eslint-disable no-console,no-restricted-syntax,no-await-in-loop,global-require,import/no-dynamic-require */
const fs = require("fs");
const path = require("path");

const { renderToStaticMarkup } = require("react-dom/server");

function renderStaticPage(fileName) {
  //shutUp(() => {
    const pageComponent = requireUncached(
      path.join(process.env.PWD, `./pages/lib/${fileName}`)
    );
    const htmlString = renderToStaticMarkup(pageComponent());

    fs.writeFileSync(
      `./dist/${fileName.replace(/js$/gi, "html")}`,
      `<!doctype html>${htmlString}`
    );
  //});
}

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

function shutUp(fn) {
  const consoleError = (function (originalFn) {
    return originalFn;
  })(console.error);
  const consoleInfo = (function (originalFn) {
    return originalFn;
  })(console.info);
  const consoleLog = (function (originalFn) {
    return originalFn;
  })(console.log);
  const consoleWarn = (function (originalFn) {
    return originalFn;
  })(console.warn);
  const consoleDebug = (function (originalFn) {
    return originalFn;
  })(console.debug);

  console.error = () => {};
  console.info = () => {};
  console.log = () => {};
  console.warn = () => {};
  console.debug = () => {};

  fn();

  console.error = consoleError;
  console.info = consoleInfo;
  console.log = consoleLog;
  console.warn = consoleWarn;
  console.debug = consoleDebug;
}

module.exports = renderStaticPage;
