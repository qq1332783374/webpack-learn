# 新手上路-webpack配置学习

## 前言
学习和使用`vue` 差不多一年了，至今还不是很了解全家桶之中的 `vue-cli`, `cli`现在都已经出到四版本，然而我对 2.x 版本还不是很了解。为了更好的学习，于是就开学习`webpack`的配置。

## 开始

```
# node 版本
node -v
v12.13.0

npm -v
v6.12.0
```

### 1. 初始化项目
直接简单粗暴：

```
npm init -y
```

执行完命令之后会自动生成一个 `package.json` 文件，该文件定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。`npm install` 命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。
文件内容如下：

```
{
  "name": "01--webpack-vue-mobile",
  "version": "1.0.0",
  "description": "## 前言 学习和使用`vue` 差不多一年了，至今还不是很了解全家桶之中的 `vue-cli`, `cli`现在都已经出到四版本，然而我对 2.x 版本还不是很了解。为了更好的学习，于是就开学习`webpack`的配置。",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

到这里一个项目初始化就已经完成了，想了解更多`npm`和`webpack`相关资料请自行网上查阅.

### 2. 安装 `webpack`

安装命令：
```
npm install webpack webpack-cli -D
```
注：我这里用的是 `webpack 4.x`版本的所以要配合 `webpack-cli` 一起才能使用

在这里和大家科普一下：

* `--save-dev` = `-D` 表示是将安装的依赖信息写入 `package.json` 文件中的 `devDependencies` 开发项，只是用与开发环境，打包上线到生产就不需要该依赖安装包。

* `--save` = `-S` 同上，这里是安装到 `dependencies`, 用于开发和生产环境。

想了解更多`npm` 命令，请移步到[这里](https://www.cnblogs.com/itlkNote/p/6830682.html)

### 3. 项目搭建

#### 3.1 目录结构
```
|--build
|--丨_webpack.config.js
|--src
|--|_ main.js
```

* `webpack.config.js`

```
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
```
在 `package.json` 的`script`项里面添加开发命令：

```
// 
"scripts": {
    "dev": "webpack ./src/main.js --config ./build/webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```
现在就可以通过 `npm` 命令了：

```
npm run dev
```

打包成功后，会自动生成一个 `dist` 文件夹和相关文件。

![01](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/01.png)

![02](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/02.png)



#### 3.2 依赖安装

大概要用到一下依赖：

* [babel](https://babel.docschina.org/)  `ES6+` 语法统一转换为浏览器一般都支持的 `ES5` 语法
* `css` 预处理器，例如： `less` , ` sass` 等等
* 处理各种文件的 `loader`
* 自动生成 `html` 模板
* 热重载功能，在开发中实时更新保存好的代码，爽到不要要的
* 用于是别 `.vue` 文件的 `loader` 
* vue 全家桶



##### 3.2.1 ES6+  to ES5

用到的依赖：

* [babel-loader](https://www.webpackjs.com/loaders/babel-loader/) 用于webpack来处理babel的加载器，调用`@babel/core`的核心API来完成编译。
* [@babel-core](https://babeljs.io/docs/en/babel-core) `babel`核心依赖
* [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) `babel`预置环境 

安装命令：

```javascript
npm install babel-loader @babel/core @babel/preset-env -D
```



在 `webpack.config.js` 添加👆安装的 `babel`：

```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

在根目录新建 `babel` 配置文件 `babel.config.js`：

```javascript
module.exports = {
  // 配置预置环境
  presets: [
    // 使用的规则
    ["@babel/preset-env", {
      // 这儿有false, entry, usage三个可选参数，usage可以按需引入polyfill
      "useBuiltIns": "usage",
      // corejs版本
      "corejs": 2
    }]
  ]
}
```

然后在`src/main.js` 就写点 `es6` 语法进行打包测试一下：

```javascript
let hello = 'Hello'

console.log(`${hello} World`)

// 箭头函数测试
let fn = () => {
  console.log('es6')
}
fn()

// Promise 测试
let fn1 = () => {
  return new Promise((resolve, reject) => {
    resolve('promise success')
  })
}
fn1().then(res => {
  console.log(res)
})

```

成功输出：

![03](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/03.png)

现在已经基本支持 `es6+` 语法啦！不过想要用 `async/await` 还需要继续配置一下，先安装以下依赖:

```javascript
npm install @babel/transform-runtime -D
```

然后在 `bable.config.js` 文件里面配置刚刚安装的插件到 `plugins` 插件项:

```javascript
plugins: ["@babel/transform-runtime"]
```

* `bable.config.js`

  ```javascript
  module.exports = {
    "presets": [
      // 使用的规则
      ["@babel/preset-env", {
        "useBuiltIns": "usage",
        // 指定corejs版本
        "corejs": 2
      }]
    ],
    "plugins": ["@babel/transform-runtime"]
  }
  ```

写一个 `async function` 测试一下：

```javascript
// async await 测试
function pFn () {
  return new Promise((resolve, reject) => {
    resolve('success')
  })
}
async function fn2 () {
  let res = await pFn()
  console.log('async await', res)
}
fn2()
```

![04](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/04.png)

到这里 `es6+` 语法转换就可以啦



##### 3.2.2 `css` 预处理器

依赖相关：

* [sass-loader](https://www.webpackjs.com/loaders/sass-loader/) 
* Node-sass
* Css-loader 
* Style-loader 

安装：

```javascript
npm i sass-loader node-sass css-loader style-loader -D 
```

在 `build/webpack.config.js` 添加相应规则：

```javascript
module.exports = {
  ...,
  module: {
    rules: [
      // ... 其它规则
      { // css相关处理
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }
        ]
      }
    ]
  }
}

```

测试配置的规则，新建文件夹和目录

```
# 新建文件夹
mkdir src/assets/scss

# 创建文件
touch src/assets/scss/main.scss
```

测试内容:

```scss
// src/assets/scss/main.scss
$--default-color: #666;

body {
  color: $--default-color;
}
```

在 `src/main.js` 引入测试

![05](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/05.png)

##### 3.2.3 html 模板

依赖相关：

* [html-webpack-plugin](https://www.webpackjs.com/plugins/html-webpack-plugin/) 简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个HTML文件，使用[lodash模板](https://lodash.com/docs#template)提供你自己的模板，或使用你自己的[loader](https://www.webpackjs.com/loaders)。

安装命令：

```
npm install html-webpack-plugin -D
```



参照 `vue-cli > 2.x` 做法，先新建一个 `public` 文件夹，然后在里面新建一个 `index.html` 文件，作为项目的入口，代码如下：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
        <title>Document</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
</html>
```

依赖安装完成后在 `build/webpack.config.js` 进行相关配置：

```javascript
// 1. 引入依赖
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  ...,
  // 2. 添加 plugins 插件项
  plugins: [ // 插件相关
    new HtmlWebpackPlugin({
      // 指定相关模板
      template: resolve('../public/index.html'),
      // 输出
      filename: resolve('../dist/index.html')
    })
  ]
}

```



配置完成后打包 `dist` 目录下会多出一个 `index.html` 文件并且这个文件是自动 `src` 打包好的 `main.js`

![06](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/06.png)



这里建议用 `nginx` 配置一下，再打开打包好的 `index.html` 看效果。



##### 3.2.4 处理字体、图片等文件

依赖相关：

* [url-loader](https://www.webpackjs.com/loaders/url-loader/) 功能类似于 `file-loader`，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL
* [file-loader](https://github.com/webpack-contrib/file-loader)  处理文件相关

安装命令: 

```
npm install url-loader file-loader -D
```

配置项：

```javascript
module.exports = {
  ...,
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
  				// 此处是个坑，这个参数要设置成false,不然生成图片的路径时[object Module]
          esModule: false,
          name: 'images/[name].[has4].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
```

测试一下，我在 `main.scss` 引入了一张背景图

![07](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/07.png)

![08](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/08.png)



配置成功！！！



##### 3.2.5 处理 `.vue` 文件

依赖相关：

* [vue-loader]([https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE](https://vue-loader.vuejs.org/zh/guide/#手动设置))
* vue-template-compiler

> 两个是要配合起来用



安装命令：

```
npm install -D vue-loader vue-template-compiler
```



`src/webpack.config.js` 配置：

```javascript
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  ...,
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```



测试：

* 目录结构

![09](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/09.png)

* 新建 `App.vue` 内容如下:

  ```vue
  <template>
    <div id="app">
      {{msg}}
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data () {
      return {
        msg: 'Hello Vue'
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
    #app {
      font-size: 24px;
    }
  </style>
  ```

* 修改 `src/main.js` 

  ```javascript
  import Vue from 'vue'
  import App from './App.vue'
  import './assets/scss/main.scss'
  
  Vue.config.productionTip = false
  
  new Vue({
    el: '#app',
    render: h => h(App)
  })
  
  ```

然后就可以打包构建测试啦！

![10](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/10.png)

##### 3.2.6 `alias` 别名配置和省略文件后缀名

给 `build/webpack.config.js` 添加新项:

```javascript
module.exports = {
  ...,
	resolve: {
    // 配置这里，在import的时候就可以省略以下的文件后缀名
    extensions: ['.js', '.vue', '.json', '.less'],
    // @ 代表目录 src 好好体会一下
    alias: {
      '@': resolve('src')
    }
  }
}
```



##### 3.2.7 配置`postcss`

依赖相关：

* [postcss-loader](https://www.webpackjs.com/loaders/postcss-loader/) 
* postcss-import
* autoprefixer 补全css3前缀



安装命令：

```
npm i postcss-loader postcss-import autoprefixer -D
```



安装完成后， 在项目的根目录创建文件 `postcss.config.js`，内容如下：

```javascript
module.exports = {
  plugins: {
    "postcss-import": {},
    "autoprefixer": {}
  }
}
```



然后在 `build/webpack.config.js` css 规则添加上 `postcss-loader`

![11](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/11.png)

测试：

![12](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/12.png)





##### 3.2.8 配置热重载功能

依赖相关：

* [webpack-dev-server](https://www.webpackjs.com/configuration/dev-server/) 

安装命令：

```
npm install webpack-dev-server -D
```



安装完成后，配置 `build/webpack.confi.js`：

```javascript
// 引入 webpack 模块
const webpack = require('webpack')

// 在插件项 plugins 添加上
new webpack.NamedModulesPlugin(),
new webpack.HotModuleReplacementPlugin()

// 添加新的一项 devServer 内容如下
module.exports = {
  ...,
  devServer: {
    host: 'localhost',
    port: '8088',
    hot: true,
    compress: true
  }
}
```

以上配置完成之后就去修改一下 `package.json` 里面的 `dev` 启动命令，内容如下：

```json
"scripts": {
    "dev": "webpack-dev-server --inline --color --progress --config ./build/webpack.config.js"
  }
```

然后重新的 `npm run dev` 一下

![13](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/13.png)

出现 `Compiled successfully` 就表示热重载已经生效啦！ 由于在 `devServer`项配置的端口是 `8088` ， 所以就 访问 `localhost:8088` 

![14](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/14.png)

优化点：

1. 终端的打印信息看着和想象中的不大一样，决定把ta变成熟悉的样子

   依赖相关：

   * [friendly-errors-webpack-plugin](https://www.npmjs.com/package/friendly-errors-webpack-plugin) 主要是用于编译完成，终端显示的信息(个人理解)

   安装命令：

   ```
   npm install friendly-errors-webpack-plugin --save-dev
   ```

   使用：

   ```
   // 引入依赖包
   const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
   
   module.exports = {
   	// 其他配置项
   	...,
     devServer: {
       ...,
       quiet: true // necessary for FriendlyErrorsPlugin
     },
     plugins: {
       ...,
       new FriendlyErrorsPlugin({
           compilationSuccessInfo: {
             // 暂时先写死地址和端口，后面优化会把相关配置抽离这个文件
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
     }	
   }
   ```

   完成以上配置后，重新跑一次 `dev` 命令:

   ![15](/Users/tanshangbiao/Learn/02--学习/02--webpack/00-素材相关/15.png)

   成功输出想要的内容，舒服！！

##### 3.2.9 小结

配置到这里已经可以进行基本的开发了，不过距离完成的 `cli` 还是有点距离的。接下来是进行开发环境和生产环境的区分，还有生产环境打包相关的配置，最后就是优化打包速度之类的。



##### 3.2.10 开发环境和生产环境

简单了解一下这两个环境的区别：

* 开发环境：为了方便开发提高效率，在开发环境我们需要一个实时性的功能以便我们开发，例如 ：热重载功能；（一下子不知道怎么讲了。。。反正开发环境就是方便开发-_-）
* 生产环境：在生产环境中，更加注重的是性能方面的提升。例如在生产环境中，相关代码会被压缩，不再需要热重载功能，按需引入`cdn` ，开启 `gzip` 等等 。反正就是能提升一点性能的就提升一点。

大概了解后就正式开工了，先来了解一下相关依赖:

* [webpack-merge](https://www.npmjs.com/package/webpack-merge) 主要是用来合并`webpack` 相关配置
* [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) 打包文件分析工具

* [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) 主要是用于清理上一次打包文件
* [copy-webpack-plugin](https://www.webpackjs.com/plugins/copy-webpack-plugin/ ) 不参与打包的静态资源复制
* [@intervolga/optimize-cssnano-plugin](https://npm.taobao.org/package/@intervolga/optimize-cssnano-plugin) 抽离 `css` 进行压缩
* [mini-css-extract-plugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin) 用于把css单独抽离出来。

安装命令：

```
npm i clean-webpack-plugin copy-webpack-plugin @intervolga/optimize-cssnano-plugin mini-css-extract-plugin webpack-merge webpack-bundle-analyzer -D
```

在配置这两个文件之前，还需要对 `webpack.config.js` 进行抽离。

* `webpack.config.js`

  ```javascript
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
      filename: 'js/[name].[hash:8].js',
      // 生成的chunk文件名
      chunkFilename: 'js/[name].[hash:8].js',
      // 资源的引用路径（这个跟你打包上线的配置有关系）
      publicPath: '/'
    },
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
  ```

* `webpack.dev.js`

  ```javascript
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
  
  ```

* `webpack.prod.js`

  ```javascript
  const path = require('path')
  const webpackConfig = require('./webpack.config')
  const WebpackMerge = require('webpack-merge')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const OptimizeCssAssetsPlugin = require('@intervolga/optimize-cssnano-plugin')
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  
  module.exports = WebpackMerge(webpackConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
      // 复制文件
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist')
      }])
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({ // 压缩js
          cache:true,
          parallel:true,
          sourceMap:true
        }),
        new OptimizeCssAssetsPlugin({})
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial"
          }
        }
      }
    }
  })
  
  ```

在来修改一波 `package.json` 命令就基本完成啦

```json
"scripts": {
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js",
    "test": "echo \"Error: no test specified\" && exit 1"
 }
```

