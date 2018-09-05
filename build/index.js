const webpack = require('webpack')
const isProd = process.env.NODE_ENV == 'production'
const chalk = require('chalk')
const { serve } = require('./webpack.dev.config')

if (isProd) {
  const webpackConfig = require('./webpack.prod.config')
  const compiler = webpack(webpackConfig, (err, stats) => {
    if (err) throw err

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
  })
} else {
  serve()
}
