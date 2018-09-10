const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const webpack = require('webpack')
const path = require('path')

const config = merge(baseConfig, {
  mode: 'development',
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
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
module.exports = config
