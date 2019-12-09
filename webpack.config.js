const path = require("path");

module.exports = {
  entry: "./index.js",
  mode: "development",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  }
};
