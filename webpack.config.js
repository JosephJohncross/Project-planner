const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app2.js',
  output: {
    filename: 'app2.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    // publicPath: 'assets/scripts'
  },
  // devServer: {
  //     contentBase: './'
  // }
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { useBuiltIns: 'usage', corejs: { version: 3 } },
              ],
            ],
          },
        },
      },
    ],
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [new cleanPlugin.CleanWebpackPlugin()],
};
