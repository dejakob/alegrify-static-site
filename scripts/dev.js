const path = require("path");

const liveServer = require("live-server");

const build = require("./build");
const watch = require("./watch");

function start() {
  build();

  const params = {
    port: 6666,
    root: path.join(process.env.PWD, "./dist"),
    open: true,
  };
  liveServer.start(params);

  watch();
}

module.exports = start;
