# webpack 配置学习

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
npm install webpack webpack-cli --D
```
注：我这里用的是 `webpack 4.x`版本的所以要配合 `webpack-cli` 一起才能使用

在这里和大家科普一下：

* `--save-dev` = `-D` 表示是将安装的依赖信息写入 `package.json` 文件中的 `devDependencies` 开发项，只是用与开发环境，打包上线到生产就不需要该依赖安装包。

* `--save` = `-S` 同上，这里是安装到 `dependencies`, 用于开发和生产环境。

想了解更多`npm` 命令，请移步到[这里](https://www.cnblogs.com/itlkNote/p/6830682.html)

### 3. 目录构建

