const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const webpack = require('webpack')
const path = require('path')

const config = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 6636,
    hot: true,
    open: true,
    overlay: true,
    stats: {
      colors: true,
      all: false,
      chunks: true,
      timings: true,
      errors: true,
      errorDetails: true
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
module.exports = config
