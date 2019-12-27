// 生产环境配置文件
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
// 合并配置
const WebpackMerge = require('webpack-merge')
// 终端打印信息处理
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = WebpackMerge(webpackConfig, {
  mode: 'development',
  devtool: "cheap-eval-source-map",
  devServer: {
    host: 'localhost',
    port: 8088,
    hot: true,
    quiet: true,
    contentBase: '../dist'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://localhost:8088`]
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,
     
      // add formatters and transformers (see below)
      additionalFormatters: [],
      additionalTransformers: []
    }) 
  ]
})
