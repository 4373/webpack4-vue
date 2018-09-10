const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: './src/main.js',
  output: {
    filename: 'static/js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.vue', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunksSortMode: 'none'
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: './static',
        to: './static',
        ignore: ['.*']
      }
    ])
  ],
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
                '@babel/plugin-syntax-dynamic-import',
                [
                  'component',
                  {
                    libraryName: 'element-ui',
                    styleLibraryName: 'theme-chalk'
                  }
                ]
              ], // 按需加载的错误
              exclude: /node_modules/
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [{ loader: 'cache-loader' }, { loader: 'vue-loader' }]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
