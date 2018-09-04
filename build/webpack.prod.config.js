const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.config.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..')
    })
  ]
})
