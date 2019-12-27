const webpack = require('webpack')
// 清理上一次打包留下的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 处理html入口模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 处理 .vue 文件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 打印信息
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 路径操作模块
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 制定编译环境
  mode: 'development',
  // 入口文件
  entry: {
    main: resolve('src/main.js')
  },
  // 打包输出
  output: {
    // 输出路径
    path: resolve('dist'),
    // 通过 hash 值保证打包文件的唯一性
    filename: 'js/[name].[hash:4].js',
    // 生成的chunk文件名
    chunkFilename: 'js/[name].[hash:4].js',
    // 资源的引用路径（这个跟你打包上线的配置有关系）
    publicPath: '/'
  },
  // devServer: {
  //   host: 'localhost',
  //   port: '8088',
  //   hot: true,
  //   compress: true,
  //   quiet: true // necessary for FriendlyErrorsPlugin
  // },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.less'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        // 排除 node_modules 提升速度
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { // css相关处理
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader' // 将 JS 字符串生成为 style 节点
          },
          {
            loader: 'css-loader' // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: 'sass-loader' // 将 Sass 编译成 CSS
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // 这个参数要设置成false,不然生成图片的路径时[object Module]
          esModule: false,
          fallback: 'file-loader',
          name: 'images/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:4].[ext]'
        }
      }
    ]
  },
  plugins: [ // 插件相关
    // 清理上一次打包痕迹
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 指定相关模板
      template: resolve('public/index.html'),
      // 输出
      filename: resolve('dist/index.html')
    }),
    new VueLoaderPlugin()
  ]
}
