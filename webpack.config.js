const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 플러그인은 위에서 따로 require로  불러와야 한다.
// 로더는 일반적으로 모듈 번들링의 일부로 사용된다.
// -> 따로 불러오지 않아도 웹팩이 자동적으로 인식을 하고 자기가 알아서 로딩도 하고 적용한다.

// 플러그인은 빌드하는 프로세스에 추가적으로 기능을 제공해준다.
// (추가적으로 개발자가 설정하는 거라서 웹팩이 인식할 수 있게 require로 넣어줘야 한다.)

module.exports = {
  entry: "./src/index.js", // 번들링을 원하는 파일의 위치
  output: {
    // 번들링 결과물
    path: path.resolve(__dirname, "docs"),
    filename: "app.bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env"],
              ["@babel/preset-react", { runtime: "automatic" }],
              // { runtime: 'automatic' } 리액트 17버전 이상부터 사용. 빌드하는 동시에 '@babel/preset-react'를  변환.
              // 사용하지 않는다면 바로 변환이 되지 않기때문에 에러가 나거나 원하는 대로 작동하지 않는다.(필수)
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
