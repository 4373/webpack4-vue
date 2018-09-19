const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

// 构建分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
// smp.wrap = obj => obj
module.exports = smp.wrap(
  merge(baseConfig, {
    mode: 'production',
    entry: {
      polyfill: '@babel/polyfill',
      main: './src/main.js'
    },
    output: {
      filename: 'static/js/[name].[chunkhash].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
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
                  // [
                  //   'import',
                  //   {
                  //     libraryName: 'iview',
                  //     libraryDirectory: 'src/components'
                  //   }
                  // ]
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
      //new BundleAnalyzerPlugin()
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
      ],
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    externals: {
      Vue: 'vue',
      Vuex: 'vuex',
      VueRouter: 'vue-router',
      Axios: 'axios'
    }
  })
)
