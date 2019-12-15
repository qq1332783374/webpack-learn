// 路径操作模块
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 制定编译环境
  mode: 'development',
  // 入口文件
  entry: {
    main: resolve('../src/main.js')
  },
  // 打包输出
  output: {
    // 输出路径
    path: resolve('../dist'),
    // 通过 hash 值保证打包文件的唯一性
    filename: 'js/[name].[hash:4].js',
    // 生成的chunk文件名
    chunkFilename: 'js/[name].[hash:4].js',
    // 资源的引用路径（这个跟你打包上线的配置有关系）
    publicPath: '/'
  }
}