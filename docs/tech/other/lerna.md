# lerna 使用入门

本篇将围绕为什么要使用 lerna，如何使用 lerna 两个方面带领大家认识 lerna。

## 为什么要使用Lerna

先来看下官方的解释：

> Splitting up large codebases into separate independently versioned packages is extremely useful for code sharing. However, making changes across many repositories is messy and difficult to track, and testing across repositories becomes complicated very quickly.

To solve these (and many other) problems, some projects will organize their codebases into multi-package repositories (sometimes called monorepos). Projects like Babel, React, Angular, Ember, Meteor, Jest, and many others develop all of their packages within a single repository.

Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

Lerna can also reduce the time and space requirements for numerous copies of packages in development and build environments - normally a downside of dividing a project into many separate NPM packages. See the hoist documentation for details.

意思就是说我们开发的一些项目存在相互依赖的情况，同时呢这些项目又是在不同的仓库里面，这就给维护和测试带来了极大的困难。
为了解决这些问题，一些项目就把这些相互依赖的项目组织成多包的形式放在同一个代码仓库里面（俗称 monorepos）。
Babel, React, Angular, Ember, Meteor,Jest等都是讲它们的包放在同一个仓库中来维护的。
Lerna干的事情就是使用git和npm来优化多包库管理工作流程。

## 如何使用Lerna



## 参考资料

* [Lerna工作流探索](https://zhuanlan.zhihu.com/p/398080866)
* [All in one：项目级 monorepo 策略最佳实践](https://fed.taobao.org/blog/taofed/do71ct/uihagy/)
* [Lerna 中文教程详解](https://juejin.cn/post/6844903856153821198)