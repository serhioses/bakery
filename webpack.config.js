const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const jsDir = path.resolve(__dirname, 'src/js');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const minimizer = [];

if (isProduction) {
  minimizer.push(
    new UglifyJsPlugin()
  );
}

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    'common': path.resolve(jsDir, 'pages/common.js')
  },
  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
    alias: {
      '@app-modules': path.resolve(jsDir, 'modules'),
      '@app-utils': path.resolve(jsDir, 'utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  optimization: {
    minimizer: minimizer,
  },
  devtool: isDevelopment ? 'cheap-inline-module-source-map' : false,
  watch: isDevelopment,
  mode: process.env.NODE_ENV
};
