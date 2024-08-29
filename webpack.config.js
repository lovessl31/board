const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // HtmlWebpackPlugin 불러오기

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',  // index.js 엔트리
    detail: './src/detail.js', // detail.js 엔트리
    cmt: './src/cmt.js',
    write: './src/write.js',
  },
  output: {
    filename: '[name].bundle.js', // 각 엔트리의 이름으로 파일 생성
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/, // CSS 파일을 처리하기 위한 설정
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
  
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'], // index.js만 포함
    }),
    new HtmlWebpackPlugin({
      template: './src/detail.html',
      filename: 'detail.html',
      chunks: ['detail'], // detail.js만 포함
    }),
    new HtmlWebpackPlugin({
      template: './src/cmt.html',
      filename: 'cmt.html',
      chunks: ['cmt'],
    }),
    new HtmlWebpackPlugin({
      template: './src/write.html',
      filename: 'write.html',
      chunks: ['write'],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 9005,
    open: true,
  },
};
