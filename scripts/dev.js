const path = require("path");

const liveServer = require("live-server");

const build = require("./build");
const watch = require("./watch");

function start() {
  build({ exitOnFailure: false });
  runLiveServer();
  watch();
}

function runLiveServer() {
  const params = {
    port: 8080,
    root: path.join(process.env.PWD, "./dist"),
    watch: path.join(process.env.PWD, "./dist"),
    open: true,
  };
  liveServer.start(params);
}

module.exports = start;
