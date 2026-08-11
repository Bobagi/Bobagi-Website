const { defineConfig } = require("@vue/cli-service");
const fs = require("fs");
const webpack = require("webpack");

// Date of this build, in the build machine's local time. Drives the
// "last update" line in the footer, so it moves on every `npm run build`.
const now = new Date();
const BUILD_DATE = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
].join("-");

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __BUILD_DATE__: JSON.stringify(BUILD_DATE),
      }),
    ],
  },

  devServer: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    https: {
      key: fs.readFileSync("./localhost-key.pem"),
      cert: fs.readFileSync("./localhost.pem"),
    },
    host: "localhost",
    port: 8080,
  },
});
