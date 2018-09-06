const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')

const webpackConfig = require('./webpack.dev.config.js')
const { devServer } = webpackConfig

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServer)

const compiler = Webpack(webpackConfig)

const server = new WebpackDevServer(compiler, devServer)

server.listen(devServer.port, devServer.host, () => {
  console.log(chalk.cyan(`open http://${devServer.host}:${devServer.port}`))
})
