const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = merge(baseConfig, {
  mode: 'development',
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              plugins: ['dynamic-import-node']
            }
          }
        ],
        include: [path.resolve(__dirname, '../src/router')]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    host: '127.0.0.1',
    disableHostCheck: true,
    port: 8833,
    hot: true,
    open: true,
    overlay: true,
    stats: {
      colors: true,
      all: false,
      chunks: false,
      chunkGroups: true,
      timings: true,
      errors: true,
      errorDetails: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
    })
  ]
})
module.exports = config
