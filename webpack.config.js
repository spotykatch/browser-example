var path = require("path");
var webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
      crypto: false,
      path: false,
      "react-native-sqlite-storage": false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
      result.request = result.request.replace(/typeorm/, "typeorm/browser");
    }),
    new webpack.ProvidePlugin({
      "window.SQL": "sql.js/dist/sql-wasm.js",
    }),
    new CopyWebpackPlugin({
        patterns: [
            { from: "static" },
        ],
    }),
  ],
};
