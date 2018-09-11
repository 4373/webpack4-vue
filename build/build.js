const webpack = require('webpack')
const chalk = require('chalk')
const rm = require('rimraf')
const path = require('path')

console.log(chalk.cyan('removing dist'))
rm.sync(path.resolve(__dirname, '../dist'))
console.log(chalk.green('remove dist successful'))
const webpackConfig = require('./webpack.prod.config')
console.log(chalk.cyan('start webpack'))
let time = Date.now()
webpack(webpackConfig, (err, stats) => {
  if (err) throw err

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }
  time = (Date.now() - time) / 1000
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  )
  console.log(chalk.black.bgGreenBright('build successful'))
  console.log(chalk.cyan(`build time: ${time} s`))
})
