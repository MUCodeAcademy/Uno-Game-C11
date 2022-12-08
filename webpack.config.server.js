const path = require("path");
const entry = path.join(__dirname, "./server.js");
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
  plugins: [new Dotenv()],
  entry: entry,
  output: {
    publicPath: "./",
    path: path.resolve(__dirname, "./"),
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
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
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
