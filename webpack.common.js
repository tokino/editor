const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const renderConfig = {
  target: 'electron-renderer',
  entry: ['./src/ts/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/html/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'stylus-loader'},
        ]
      }
    ]
  }
};

const mainConfig = {
  target: 'electron-main',
  entry: ['./src/ts/main.ts'],
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          /node_modules/
        ],
        loader: 'ts-loader'
      }
    ]
  }
};

module.exports = [renderConfig, mainConfig];