const path = require("path");
// The ./server.js will be replaced with the file name of your server
const entry = path.join(__dirname, "./server.js");

// Omit this next line if not using / needing dotenv
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  devtool: false,
  externals: [],
  name: "server",
  target: "node",
  optimization: {
    minimize: false,
  },
  // Omit this (or at least the new Dotenv()) if not using dotenv
  plugins: [new Dotenv()],
  entry: entry,
  output: {
    publicPath: "./",
    // Path you want to put it out to, could be a separate folder or the same level
    path: path.resolve(__dirname, "./"),
    // File name to be output to
    filename: "server.prod.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [
      ".webpack-loader.js",
      ".web-loader.js",
      ".loader.js",
      ".js",
      ".jsx",
    ],
    modules: [path.resolve(__dirname, "node_modules")],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: [
          path.resolve(__dirname, "./src"),
          path.resolve(__dirname, "./build"),
        ],
        options: {
          babelrc: true,
        },
      },
    ],
  },
};
