const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
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
        test: /\.vue$/,
        use: [{ loader: 'cache-loader' }, { loader: 'vue-loader' }]
        // include: [path.resolve(__dirname, '../src'), /node_modules\/iview/]
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'less-loader'
        ],
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'less-loader'
        ],
        include: [/node_modules\/iview/]
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/images/[name].[ext]'
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
