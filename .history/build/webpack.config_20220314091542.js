const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    index:  path.resolve(__dirname, '../src/main.js'),
    mobile: path.resolve(__dirname, '../src/mobile.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/[name].[hash].js'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, "../public"),
    hot: true
  },
  module: {
    rules: [
        {
          test: /\.css$/,
          use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader'
            }]
        },
        {
            test: /\.vue$/,
            use: ['vue-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.(jpg|png|gif|woff|woff2|svg|ttf|eot)$/,
            use: ['url-loader'],
        },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, "../public/index.html"),
        chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'mobile.html',
      template: path.resolve(__dirname, "../public/mobile.html"),
      chunks: ['mobile']
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin({
        root: path.resolve(__dirname, './dist')
    }),
    new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        ignoreOrder: true
    })
  ]
}