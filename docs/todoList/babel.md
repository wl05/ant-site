<<<<<<< HEAD
## Babel 是一个 JavaScript 编译器

Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事情：

* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性（通过第三方 polyfill 模块，例如 core-js，实现）
* 源码转换 (codemods)
* 更多资源！（请查看这些 [视频](https://www.babeljs.cn/videos.html) 以获得启发）

```js
// Babel 输入： ES2015 箭头函数
[1, 2, 3].map((n) => n + 1);

// Babel 输出： ES5 语法实现的同等功能
[1, 2, 3].map(function(n) {
  return n + 1;
});
```


有关编译器的精彩教程，请查看 [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler) 项目，它还高屋建瓴地解释了 Babel 的工作方式。
=======
# babel新手快速入门

>>>>>>> b9e77b054558bd7955ee9595ba733542ffdd253c



## 参考资料
1. [babeljs](https://babeljs.io/docs)
2. [从 0 到 1 手写 babel》思路分享](https://mp.weixin.qq.com/s/KvFX1-HTAqK00xn6MNNcGA)
3. [Babel 手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/README.md)
4. [深入浅出 Babel 上篇：架构和原理 + 实战](https://juejin.cn/post/6844903956905197576#comment)