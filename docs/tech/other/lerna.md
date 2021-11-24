# lerna 使用入门

本篇将围绕为什么要使用 lerna，如何使用 lerna 两个方面带领大家认识 lerna。

## 为什么要使用Lerna

先来看下官方的解释：

> Splitting up large codebases into separate independently versioned packages is extremely useful for code sharing. However, making changes across many repositories is messy and difficult to track, and testing across repositories becomes complicated very quickly.
> To solve these (and many other) problems, some projects will organize their codebases into multi-package repositories (sometimes called monorepos). Projects like Babel, React, Angular, Ember, Meteor, Jest, and many others develop all of their packages within a single repository.
> Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.
> Lerna can also reduce the time and space requirements for numerous copies of packages in development and build environments - normally a downside of dividing a project into many separate NPM packages. See the hoist documentation for details.

意思就是说我们开发的一些项目存在相互依赖的情况，同时呢这些项目又是在不同的仓库里面，这就给维护和测试带来了极大的困难。
为了解决这些问题，一些项目就把这些相互依赖的项目组织成多包的形式放在同一个代码仓库里面（俗称 monorepos）。
Babel, React, Angular, Ember, Meteor,Jest等都是将它们的包放在同一个仓库中来维护的。
Lerna干的事情就是使用git和npm来优化多包库管理工作流程。

## 如何使用Lerna

### Lerna管理项目的模式

Lerna 有两种管理项目的模式：

* Fixed/Locked 模式 (默认)： 所有的包共用一个版本号。
  
* Independent mode： 在初始化的时候指定 --independent 参数：

```bash
lerna init --independent
```

这种模式下，可以单独的为每个包指定版本号。

 learn为我们提供了以下命令：

```
* lerna publish
* lerna version
* lerna bootstrap
<!-- * lerna list -->
<!-- * lerna changed -->
* lerna diff
* lerna exec
* lerna run
<!-- * lerna init -->
<!-- * lerna add -->
* lerna clean
* lerna import
* lerna link
<!-- * lerna create -->
<!-- * lerna info -->
```

下面通过具体的demo来使用一下Lerna的这些命令。
  
#### [lerna init](https://github.com/lerna/lerna/tree/main/commands/init#readme)

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
* command.publish.ignoreChanges: 指定哪些文件的更新不需要发布，例如修改README。
* command.publish.message: 在发版更新 version 的时候指定自定义commit message
* command.publish.registry: 指定远程仓库
* command.bootstrap.ignore: 执行lerna bootstrap时忽略的文件
* command.bootstrap.npmClientArgs: 执行 lerna bootstrap 命令会去执行 npm install 这里的参数就是传递给npm install 的。
* command.bootstrap.scope: 决定在执行 lerna bootstrap 的时候哪些package需要 bootstrap
* packages: 指定package存放的位置

现在我们的packages下面什么都还没有。下面我们来创建一些包

#### [lerna create](https://github.com/lerna/lerna/tree/main/commands/create#readme)

作用：通过 lerna create 创建一个新的包，当然你也可以手动创建

```bash
lerna create animal
lerna create cat 
lerna create dog
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

#### [lerna add](https://github.com/lerna/lerna/tree/main/commands/add#readme)

作用：learn add 添加本地包或者远程包作为包的依赖

```
# 向名字以prefix-为前缀的文件夹里面添加 module-1 作为依赖
lerna add module-1 packages/prefix-*

# 向 module-2 中添加 module-1 作为依赖
lerna add module-1 --scope=module-2

# 向 module-2 中添加 module-1 作为开发依赖（devDependencies）
lerna add module-1 --scope=module-2 --dev

# 向 module-2 中添加 module-1 作为peerDependencies
lerna add module-1 --scope=module-2 --peer

# 向除了module-1（因为module-1是本地包）的所有包中添加module-1 作为依赖
lerna add module-1

# Install babel-core in all modules 向所有的包中添加 babel-core 作为依赖（babel-core是远程包）
lerna add babel-core
```

```
# 添加的 animal 作为dog、cat 的依赖
$ lerna add animal 
```

查看dog或者cat的dependencies会看到加入的依赖animal。

#### [lerna list](https://github.com/lerna/lerna/tree/main/commands/list#readme)

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

#### [lerna info](https://github.com/lerna/lerna/tree/main/commands/info#readme)

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

#### [lerna changed](https://github.com/lerna/lerna/tree/main/commands/changed#readme)

作用：TODO:

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

#### [lerna version](https://github.com/lerna/lerna/tree/main/commands/version#readme)

作用：发布前更新包的版本

用法：

```
lerna version 1.0.1 # 直接指定特定的版本
lerna version patch # 使用语义关键字
lerna version       # 通过交互式命令选择

lerna version 在背后为我们做了这些事：

1. Identifies packages that have been updated since the previous tagged release. 
2. Prompts for a new version.
3. Modifies package metadata to reflect new release, running appropriate lifecycle scripts in root and per-package.
4. Commits those changes and tags the commit. 对发布打tag
5. Pushes to the git remote. 
```

先commit本地的改动，然后执行：

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
```

#### [lerna publish](https://github.com/lerna/lerna/tree/main/commands/publish#readme)

作用： 发布本地包

为了真实的模拟发包过程这里我们使用Verdaccio搭建一个本地 npm 仓库

```bash
npm install -g verdaccio
verdaccio
```

访问 <http://localhost:4873/> 可以看到启动界面。

将每个package里面package.json 重的 publishConfig.registry 改为 "http://localhost:4873/"

或者在项目的根目录创建.npmrc 文件，将 npm 仓库地址改写为本地仓库地址：

```
registry="http://localhost:4873/"
```

注意将每个package里面package.json 中的publishConfig字段去掉

commit提交本地的修改，然后执行：

```bash
$ lerna publish --no-push             
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent
lerna info Assuming all packages changed
? Select a new version for animal (currently 1.0.0) Patch (1.0.1)
? Select a new version for cat (currently 1.0.0) Patch (1.0.1)
? Select a new version for dog (currently 1.0.0) Patch (1.0.1)

...

Successfully published:
 - animal@1.0.1
 - cat@1.0.1
 - dog@1.0.1
lerna success published 3 packages
```

命令行中会让我们进行版本的选择和确认，确认完毕后就会将我们的包发布到npm仓库中。

刷新 <http://localhost:4873/> 就可以看到我们刚刚发布的包了。

## 参考资料

* [Lerna工作流探索](https://zhuanlan.zhihu.com/p/398080866)
* [All in one：项目级 monorepo 策略最佳实践](https://fed.taobao.org/blog/taofed/do71ct/uihagy/)
* [Lerna 中文教程详解](https://juejin.cn/post/6844903856153821198)
* [使用lerna优雅地管理多个package](https://zhuanlan.zhihu.com/p/35237759)
