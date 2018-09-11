const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(
  merge(baseConfig, {
    mode: 'production',
    entry: ['@babel/polyfill', './src/main.js'],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'cache-loader'
            },
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                  '@babel/plugin-syntax-dynamic-import', // 按需加载的错误
                  [
                    'component',
                    {
                      libraryName: 'element-ui',
                      styleLibraryName: 'theme-chalk'
                    }
                  ]
                ],
                exclude: /node_modules/,
                cacheDirectory: true
              }
            }
          ],
          include: path.resolve(__dirname, '../src')
        }
      ]
    },

    plugins: [
      // 提取css
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css'
      })
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin(), // 压缩css
        // 压缩js
        new UglifyJsPlugin({
          exclude: /node_modules/,
          cache: true,
          parallel: 4
        })
      ]
    }
  })
)
