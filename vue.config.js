const { defineConfig } = require("@vue/cli-service");
const fs = require("fs");

module.exports = defineConfig({
  transpileDependencies: true,

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
