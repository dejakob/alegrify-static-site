const fs = require("fs");
const path = require("path");

const entry = {};

fs.readdirSync("./client-js/src").forEach((file) => {
  entry[file.replace(/.js$/gi, "")] = path.join(
    process.env.PWD,
    `client-js/src/${file}`
  );
});

module.exports = {
  mode: "production",
  entry,
  output: {
    path: path.join(process.env.PWD, "client-js/lib"),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
