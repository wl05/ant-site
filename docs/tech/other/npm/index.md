# 重新认识 npm

## 配置本地开发环境

在本地安装 nodejs 时，会同时安装 npm ，npm 发版的频率一般要比 nodejs 高。如果要安装最新文档版本的 npm 可以执行下面的命令：

```bash
$ npm install npm@latest -g
```

官方建议安装 nodejs 的时候使用 nodejs 版本管理工具进行安装，

* OSX 和 Linux： [nvm](https://github.com/creationix/nvm)、[n](https://github.com/tj/n)
* Windows: [nodist](https://github.com/marcelklehr/nodist)、[nvm-windows](https://github.com/coreybutler/nvm-windows)


例如使用 nvm 可以安装不同版本的 Node，可以在不同版本之间进行切换，这在测试应用在不同环境之间的稳定性时很有用。


##  package 和 module 的一些区别

* package 必须要包含 package.json 
* moudle 是 node_modules 目录下可以使用 Nodejs require 方法加载的文件或者文件夹
* 因为要被 require 方法加载 moudule 需要满足： 1. 有 package.json 并且包含 main  字段 2. 是一个 js 文件
* 有 package.json 的 module 可以叫做 package

## package 的作用域 // TODO:

## 开发一个 package 

**1、初始化**

```bash
# 创建 package 目录
$ mkdir package-demo && cd $_
# 执行 npm init 进行初始化，会询问一些字段的填写
$ npm init
```

或者为了方便，使用默认值初始化也 ok

```bash
$ npm init -y 
```

默认初始化结果如下：

```json
{
  "name": "package-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

* name: 当前目录的名字
* version: 1.0.0 默认的初始版本号
* description: info from the README, or an empty string ""
* scripts: 创建默认的 test 命令
* keywords: 为空
* author: 为空
* license: ISC

当前对于这些默认值也是也可以设置的：

```bash
$ npm set init.author.email "example-user@example.com"
```

**2、创建 REAME.md**

创建 README.md 写入一些说明，说明如何使用该 package

```bash
$ echo  "HELLO WORLD" > README.md
```

**3、创建 index.js**

```bash
$ echo 'console.log("HELLO WORLD")' > index.js
```
**4、测试开发的 package**

考虑到不必要的发布，在 debug 阶段本地调试开发的 package 很有必要。

创建一个新的项目然后安装开发的包:

```bash
$ mkdir test-package && cd $_ && npm init -y 
$ npm i "../package-demo" # 这里使用相对路径和绝对路径都可以
# 创建 index.js 引用 pack-demo
$ echo 'require("package-demo")' > index.js
$ node index.js                       
HELLO WORLD

```

**5. 发布**

测试完成后就可以进行版本发布了。回到 package 根目录执行：

```bash
$ npm run publish
```