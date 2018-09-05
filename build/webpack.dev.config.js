const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const webpack = require('webpack')
const path = require('path')

const config = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    port: '6636',
    hot: true,
    open: true
  },
  plugins: []
})
module.exports = config
