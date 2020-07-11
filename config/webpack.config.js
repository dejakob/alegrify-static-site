const fs = require("fs");
const path = require("path");

const PACKAGE_JSON = JSON.parse(
  fs.readFileSync(path.join(process.env.PWD, "package.json")).toString()
);

const entry = {};

fs.readdirSync("./client-js/src").forEach((file) => {
  if (file.endsWith(".js")) {
    entry[file.replace(/.js$/gi, "")] = path.join(
      process.env.PWD,
      `client-js/src/${file}`
    );
  }
});

module.exports = {
  mode: "production",
  entry,
  output: {
    path: path.join(process.env.PWD, "client-js/lib"),
    filename: `[name]-${PACKAGE_JSON.version}.js`,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [/\bcore-js\b/, /\bwebpack\/buildin\b/],
        use: {
          loader: "babel-loader",
          options: {
            sourceType: "unambiguous",
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: ["@babel/plugin-syntax-dynamic-import"],
          },
        },
      },
    ],
  },
};
