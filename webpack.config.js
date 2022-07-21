const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        // 要绝对路径
        include: path.resolve(__dirname, "./src"),
        // 要绝对路径
        exclude: path.resolve(__dirname, "./node_modules"),
      },
    ],
  },

  plugins: [
    new htmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
