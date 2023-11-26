// webpack.config.js
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = {
  src: path.resolve(__dirname, "./src"),
  build: path.resolve(__dirname, "./build"),
};

module.exports = {
  entry: {
    main: PATHS.src + "/main.ts",
    background: PATHS.src + "/background.ts",
  },
  output: {
    path: PATHS.build, // 번들 결과물 위치
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /[\.js]$/, // .js 에 한하여 babel-loader를 이용하여 transpiling
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts$/, // .ts 에 한하여 ts-loader를 이용하여 transpiling
        exclude: /node_module/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          context: "public",
        },
      ],
    }),
  ],
  mode: "development", // 번들링 모드 development / production
};
