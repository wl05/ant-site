![](./79596653-38f81200-80e1-11ea-98cd-1c6a3bb5de51.png)

# lerna 简单入门

本篇将围绕**为什么要使用 lerna**以及**如何使用 lerna** 两个方面来认识 lerna。

## 为什么要使用 lerna

先来看下官方的解释：

> * Splitting up large codebases into separate independently versioned packages is extremely useful for code sharing. However, making changes across many repositories is messy and difficult to track, and testing across repositories becomes complicated very quickly.
> * To solve these (and many other) problems, some projects will organize their codebases into multi-package repositories (sometimes called monorepos). Projects like Babel, React, Angular, Ember, Meteor, Jest, and many others develop all of their packages within a single repository.
> * Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.
> * Lerna can also reduce the time and space requirements for numerous copies of packages in development and build environments - normally a downside of dividing a project into many separate NPM packages. See the hoist documentation for details.

意思就是说我们开发的一些项目存在相互依赖的情况，同时呢这些项目又是在不同的仓库里面，这就给开发、维护和测试带来了极大的困难。
为了解决这些问题，一些项目就把这些相互依赖的项目组织成多包的形式放在同一个代码仓库里面（俗称 monorepos）。
Babel, React, Angular, Ember, Meteor, Jest 等都是将它们的包放在同一个仓库中来维护的。
Lerna干的事情就是使用 git 和 npm 来优化多包库的管理工作流程。

## 如何使用 Lerna

###  Lerna 管理项目的模式

Lerna 有两种管理项目的模式：

* Fixed/Locked 模式 (默认)： 所有的包共用一个版本号。
  
* Independent mode： 在初始化的时候指定 --independent 参数：

```bash
lerna init --independent
```
这种模式下，可以单独的为每个包指定版本号。

 learn为我们提供了以下命令：

* lerna publish
* lerna version
* lerna bootstrap
* lerna list
* lerna changed
* lerna diff
* lerna exec
* lerna run
* lerna init
* lerna add
* lerna clean
* lerna import
* lerna link
* lerna create
* lerna info


下面通过具体的demo来使用一下这些命令。
  
### [lerna init](https://github.com/lerna/lerna/tree/main/commands/init#readme)

作用：初始化项目

```bash
# 采用独立模式
$ mkdir lerna-example && cd $_ && npm install lerna -D && npx lerna init --independent
```

生成的项目目录如下：

```
lerna-example/
  packages/
  package.json
  lerna.json
```

lerna.json 各个字段的含义：

```json
{
  "version": "1.1.3",
  "npmClient": "npm",
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "chore(release): publish",
      "registry": "https://npm.pkg.github.com"
    },
    "bootstrap": {
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    }
  },
  "packages": ["packages/*"]
}
```
* version: 当前项目的版本，如果是independent模式的话这里是 "independent" 字符串
* npmClient: 默认是 npm，可以使用yarn
* command.publish.ignoreChanges: 指定哪些文件的更新不需要发布，例如修改 README。
* command.publish.message: 在发版更新 version 的时候指定自定义 commit message
* command.publish.registry: 指定远程仓库
* command.bootstrap.ignore: 执行 lerna bootstrap 时忽略的文件
* command.bootstrap.npmClientArgs: 执行 lerna bootstrap 命令会去执行 npm install 这里的参数就是传递给 npm install 的。
* command.bootstrap.scope: 决定在执行 lerna bootstrap 的时候哪些 package 需要 bootstrap
* packages: 指定 package 存放的位置

现在我们的 packages 下面什么都还没有，下面我们来创建一些包。

### [lerna create](https://github.com/lerna/lerna/tree/main/commands/create#readme)

作用：通过 lerna create 创建一个新的包，当然你也可以手动创建

```bash
$ lerna create animal
$ lerna create cat 
$ lerna create dog
```

这里我们创建了animal cat dog 三个包项目结构如下:

```
.
├── lerna.json
├── package.json
└── packages
    ├── animal
    │   ├── README.md
    │   ├── __tests__
    │   │   └── animal.test.js
    │   ├── lib
    │   │   └── animal.js
    │   └── package.json
    ├── cat
    │   ├── README.md
    │   ├── __tests__
    │   │   └── cat.test.js
    │   ├── lib
    │   │   └── cat.js
    │   └── package.json
    └── dog
        ├── README.md
        ├── __tests__
        │   └── dog.test.js
        ├── lib
        │   └── dog.js
        └── package.json
```

### [lerna add](https://github.com/lerna/lerna/tree/main/commands/add#readme)

作用：learn add 添加本地包或者远程包作为包的依赖

```
# 向名字以 prefix- 为前缀的文件夹里面添加 module-1 作为依赖
$ lerna add module-1 packages/prefix-*

# 向 module-2 中添加 module-1 作为依赖
$ lerna add module-1 --scope=module-2

# 向 module-2 中添加 module-1 作为开发依赖（devDependencies）
$ lerna add module-1 --scope=module-2 --dev

# 向 module-2 中添加 module-1 作为peerDependencies
$ lerna add module-1 --scope=module-2 --peer

# 向除了module-1（因为 module-1 是本地包）的所有包中添加 module-1 作为依赖
$ lerna add module-1

# 向所有的包中添加 babel-core 作为依赖（ babel-core 是远程包）
$ lerna add babel-core
```

```
# 添加的 animal 作为 dog、cat 的依赖
$ lerna add animal 
```
查看 dog 或者 cat 的 dependencies 会看到加入的依赖 animal。


### [lerna version](https://github.com/lerna/lerna/tree/main/commands/version#readme)

作用：发布前更新包的版本 （lerna publish 包含这一步）

用法：

```bash
$ lerna version 1.0.1 # 直接指定特定的版本
$ lerna version patch # 使用语义关键字
$ lerna version       # 通过交互式命令选择
```
lerna version 在背后为我们做了这些事：

1. 识别出自上次发布以后更新过的包；
2. 提示选择新版本；
3. 修改包的元数据来反映最新发版（修改包的版本号），在根目录和每个包里面运行生命周期脚本；
4. 对提交打 tag；
5. 推送到远程代码仓库。

先 commit 本地的改动，然后执行 lerna version，默认情况下 lerna version 会将本地的 commit 和 tag 推送到远程仓库，这里只是本地演示可以通过指定 --no-push 参数来禁止推送。

```bash
$ lerna version --no-push
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent
lerna info Looking for changed packages since animal@1.0.1
? Select a new version for cat (currently 1.0.0) (Use arrow keys)
❯ Patch (1.0.1) 
  Minor (1.1.0) 
  Major (2.0.0) 
  Prepatch (1.0.1-alpha.0) 
  Preminor (1.1.0-alpha.0) 
  Premajor (2.0.0-alpha.0) 
  Custom Prerelease 
  Custom Version 
...
```

### [lerna publish](https://github.com/lerna/lerna/tree/main/commands/publish#readme)

作用： 发布本地包

用法：

```bash
#发布自上次发布过后更新过的包 （背后会执行 lerna version）
$ lerna publish 
#发布当前通过 lerna version 打好 tag 的包，需要先使用 lerna version 更新版本
$ lerna publish from-git
#只发布远程 npm 仓库中没有的版本，适用于 lerna publish 没有全部发布成功的场景。
$ lerna publish from-package
```



为了真实地模拟发包过程这里我们使用 [Verdaccio](https://verdaccio.org/) 搭建一个本地 npm 仓库

```bash
# 全局安装
$ npm install -g verdaccio
$ verdaccio
```
访问 `http://localhost:4873/` 可以看到启动界面。


* 将每个包 package.json 中的 publishConfig.registry 改为 `http://localhost:4873/`

* 或者在项目的根目录创建 .npmrc 文件，将 npm 仓库地址改写为本地仓库地址： `registry="http://localhost:4873/"`，注意将每个包 package.json 中的 publishConfig 字段去掉


在 dog.js 中添加一行 `console.log("bark")`,准备就绪后 commit 提交本地的修改，然后执行：

```bash
$ lerna publish --no-push
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent
lerna info Looking for changed packages since cat@1.0.3
? Select a new version for dog (currently 1.0.4) (Use arrow keys)
❯ Patch (1.0.5) 
  Minor (1.1.0) 
  Major (2.0.0) 
  Prepatch (1.0.5-alpha.0) 
  Preminor (1.1.0-alpha.0) 
  Premajor (2.0.0-alpha.0) 
  Custom Prerelease 
  Custom Version 
...
```

命令行中会让我们进行版本的选择和确认，确认完毕后就会将我们的包发布到 npm 仓库中。

刷新 `http://localhost:4873/` 就可以看到我们刚刚发布的包了。


### [lerna list](https://github.com/lerna/lerna/tree/main/commands/list#readme)

作用：列出所有的本地包

```bash
$ lerna list      
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent
animal
cat
dog
lerna success found 3 packages
```

### [lerna info](https://github.com/lerna/lerna/tree/main/commands/info#readme)

作用：打印出本地环境信息

```bash
$ lerna info   
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent

 Environment info:

  System:
    OS: macOS 11.5.2
    CPU: (8) x64 Intel(R) Core(TM) i7-7920HQ CPU @ 3.10GHz
  Binaries:
    Node: 14.16.0 - ~/.nvm/versions/node/v14.16.0/bin/node
    Yarn: 1.22.4 - ~/.yarn/bin/yarn
    npm: 6.14.11 - ~/.nvm/versions/node/v14.16.0/bin/npm
  Utilities:
    Git: 2.24.3 - /usr/bin/git
  npmPackages:
    lerna: ^4.0.0 => 4.0.0 
```

### [lerna changed](https://github.com/lerna/lerna/tree/main/commands/changed#readme)

作用：列出自上一次发布过后修改过的包

修改文件，执行命令：

```bash
$ lerna changed   
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent
lerna info Assuming all packages changed
animal
cat
dog
lerna success found 3 packages ready to publish
```

### [lerna clean](https://github.com/lerna/lerna/tree/main/commands/clean#readme)

作用：移除所有 package 下的 node_modules，除了根目录下的 node_modules

```bash
$ lerna clean               
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent
lerna info Removing the following directories:
lerna info clean packages/animal/node_modules
lerna info clean packages/cat/node_modules
lerna info clean packages/dog/node_modules
? Proceed? Yes
...
```
### [lerna bootstrap](https://github.com/lerna/lerna/tree/main/commands/bootstrap#readme) 

作用：建立相互依赖的包之间的软连接并安装其他的依赖

这个命令在背后执行了以下步骤:

* 安装所有包的外部依赖
* 建立存在依赖关系的包之间的依赖
* 在 bootstrapped 的包中执行 npm run prepublish （没有指定 --ignore-prepublish 的情况下）
* 在 bootstrapped 的包中执行npm run prepare 


```bash
$ lerna bootstrap
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent
lerna info Bootstrapping 3 packages
lerna info Symlinking packages and binaries
lerna success Bootstrapped 3 packages
```

### [lerna diff](https://github.com/lerna/lerna/tree/main/commands/diff#readme)

作用：列出包自上一次发版以来做出的修改。

用法：

```bash
# 列出所有包的改动
$ lerna diff 
# 列出具体某个包的改动
$ lerna diff package-name
```


### [lerna exec](https://github.com/lerna/lerna/tree/main/commands/exec#readme)

作用：使用 lerna exec 可以在所有的包目录下执行任意的命令。

用法：

```bash
$ lerna exec -- <command> [..args] # runs the command in all packages
$ lerna exec -- rm -rf ./node_modules # 删除所有包下面的 node_modules
```

### [lerna run](https://github.com/lerna/lerna/tree/main/commands/run#readme)

作用：使用 lerna run 可以在所有的包目录下执行对应的脚本。

用法： 

```bash
$ lerna run test # 执行所有包的 test 命令
```

### [lerna import](https://github.com/lerna/lerna/tree/main/commands/import#readme)

作用：将已经存在的项目作为一个包导入到现有的lerna项目中，同时项目的 commit 历史记录会被一并导入。

用法：

```bash
$ lerna import <path-to-external-repository>
```

### [lerna link](https://github.com/lerna/lerna/tree/main/commands/link#readme)

作用：建立存在依赖关系的包之间的软连接

用法：

```bash
$ lerna link
```


## 总结

本篇对 lerna 管理多包项目的实践过程做了一些简单的讲解，做到基本入门应该问题不大，剩下的就自由发挥了 😊。

## 参考资料

* [Lerna工作流探索](https://zhuanlan.zhihu.com/p/398080866)
* [All in one：项目级 monorepo 策略最佳实践](https://fed.taobao.org/blog/taofed/do71ct/uihagy/)
* [Lerna 中文教程详解](https://juejin.cn/post/6844903856153821198)
* [使用lerna优雅地管理多个package](https://zhuanlan.zhihu.com/p/35237759)