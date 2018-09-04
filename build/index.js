const webpack = require('webpack')
const isProd = process.env.NODE_ENV == 'production'

let webpackConfig

if (isProd) {
  webpackConfig = require('./webpack.prod.config')
} else {
  webpackConfig = require('./webpack.dev.config')
}

webpack(webpackConfig)
