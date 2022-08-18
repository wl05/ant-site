# 前端模块化规范与实践

如今的前端技术日新月异，快速发展，我们开发的应用也越来越庞大，代码量也越来越多。所以需要将庞大的东西拆分成小件的东西，方便维护也方便组合，我们似乎已经对此习以为常，```export/import```、```module.exports/require```，这些我们用起来得心应手，但是我们有想过为什么吗？这些东西一开始就有吗？为什么会有不同的导出导入方式？本篇带着这些问题我们一起来看看```JavaScript```模块化的发展历程，以及一些常用的模块化规范实践。

## 为什么需要模块化

1. 可维护性
   
  我们需要知道```Javascript```一开始是没有模块化的。对于开发大型应用，如果无法将代码拆分成相互依赖的小文件，对于代码的维护无疑是一个巨大的挑战。

2. 避免命名空间污染
  
  对于定义在全局环境中的变量和函数如果命名有冲突，就会造成我们所说的**命名空间污染**

3. 代码可复用
   
  在日常的开发中，使用相同代码片段的场景很常见，比如封装一些工具函数。把需要复用的代码定义成一个模块，使用时引入，实现代码的可复用性。

## 模块化前置知识


### js模块

通过上面的介绍，我们可以总结出模块的一大特点：**独立性**。独立性体现在**变量私有**，对外**暴露接口**以提供对私有变量的操作。显然可以通过闭包来实现。下面我们来看一个例子：

```js
const foo = (function CoolModule() { 
  let count = 0
  function increment() {
    // 修改公共 API
    count++
  }
  function consoleCount() {
    console.log( count );
  }
  const publicAPI = { 
    increment,
    consoleCount
  };
  return publicAPI;
})();
foo.consoleCount(); // 0
foo.increment();
foo.consoleCount(); // 1
```

这个例子中通过一个立即执行函数（```IIFE```），返回了一个包含函数内部```api```的对象，```api```保留了对内部变量```count```的引用，因此形成了闭包，通过返回的```api```可以操作（访问、修改）函数内部的变量```count```。 而```count```对于外部来说是不可以直接访问到的。这其实就是一个模块。


### 模块机制

基于上面的介绍我们可以进一步封装。

```js
const Modules = (function () {
  const modules = {}
  return {
    define(name, dependencies, implementation) {
      for (let i = 0; i < dependencies.length; i++) {
        dependencies[i] = modules[dependencies[i]]
      }
      modules[name] = implementation.apply(implementation, dependencies)
    },
    require(name) {
      return modules[name]
    }
  }
})()

Modules.define('bar', [], function () {
  return {
    hello(who) {
      return 'I am ' + who
    }
  }
})
Modules.define('foo', ['bar'], function (bar) {
  const name = 'Tom'
  return {
    awesome() {
      console.log(bar.hello(name))
    }
  }
})
const bar = Modules.require('bar')
const foo = Modules.require('foo')
console.log(bar.hello('Jack')) // I am Jack
foo.awesome() // I am Tom
```

定义一个立即执行函数，返回一个对象，包含```define```，```require```两个```api```。 

**```define：```** 

 用于定义模块，接受三个参数，
 
 ```name```：模块的名字，
 
 ```dependencies```： 一个数组定义当前模块依赖的其他模块，
 
 ```implementation```: 当前模块的实现函数。
 
 在```define```函数中定义了一个```modules```对象用来存储每个模块的实现函数，定义模块时，遍历当前模块的依赖，从```modules```中找到对应依赖的实现。关键的一步 ```modules[name] = implementation.apply(implementation, dependencies)``` 通过这一步将找到的依赖以参数的形式传递给```implementation```函数所以在```implementation```函数中可以通过参数拿到对应的依赖项。

 **```require：```** 

 ```require```函数实现就比较简单，通过模块名获取对应的模块。

 这里通过一个简单的例子，我们大概的了解模块机制是怎么一回事。如果想深入了解可以通过下面的介绍，去扩展深入。

## 流行的模块化规范

因为```javascript```一开始并没有从语言层面实现模块化机制。所以对于模块化的实现出现了很多不同的尝试，自然也产生了很多不同的规范来实现模块化。接下来主要介绍当下比较流程的规范```AMD```、```CMD```、```CommonJs```，以及es6以后加入的原生模块机制```es6 module```。

### AMD

```Asynchronous Module Definition```（异步模块定义规范）简称```AMD```。 顾名思义就是以**异步方式**加载模块。异步加载的方式适合浏览器端的模块加载，模块的加载不会阻塞浏览器。

#### AMD规范

**定义模块：**

```js
//定义没有依赖的模块
define(function(){
   // do something
})

//定义有依赖的模块
define(['module1', 'module2'], function(module1, module2){
  //  do something with module1 and module2
})
```

**加载模块：**
```js
require(['module1', 'module2'], function(module1, module2){
  //  使用module1/module2
})
```
```AMD``` 通过```require```加载模块，```require```接受两个参数，第一个参数是需要加载的模块组成的数组，第二个参数是模块加载完成后执行的回调函数，回调函数接受的参数是加载后的模块



#### AMD实践

[RequireJS](https://requirejs.org/)遵守```AMD```规范实现，我们使用[RequireJS](https://requirejs.org/)来实现一个简单的```demo```：

项目目录：

```text
├── index.html
└── js
    ├── libs
    │   └── require.js
    ├── main.js
    └── modules
        ├── print.js
        └── sayHello.js
```

下载[requirejs](http://www.requirejs.cn/)并放入```libs```文件中

**index.html：**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Modular Demo</title>
  </head>
  <body>
    <!-- 引入require.js并指定js主文件的入口 -->
    <script data-main="js/main" src="js/libs/require.js"></script>
  </body>
</html>
```

**main.js:**

```js
;(function () {
  require.config({
    baseUrl: 'js/', // 基本路径 出发点在根目录下
    paths: {
      // 映射: 模块标识名: 路径
      print: './modules/print',
      sayHello: './modules/sayHello'
    }
  })
  require(['sayHello'], function (sayHello) {
    sayHello.sayHello()
  })
})()
```

**print.js:**

```js
// 定义没有依赖的模块
define(function () {
  function print(msg) {
    console.log(msg)
  }
  return { print } // 暴露模块
})
```

**sayHello.js:**

```js
// 定义有依赖的模块
define(['print'], function (print) {
  function sayHello() {
    print.print('hello world')
  }
  // 暴露模块
  return { sayHello }
})
```

### CMD

```CMD```(```Common Module Definition``` - 通用模块定义)规范主要是[Sea.js](http://seajs.org/)推广中形成的。用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。

它与```AMD```很类似，不同点在于：```AMD``` 推崇依赖前置、提前执行，```CMD```推崇依赖就近、延迟执行。

#### CMD规范：


**定义模块：**

```js
//定义没有依赖的模块
define(function(require, exports, module){
  exports.xxx = value
  module.exports = value
})

//定义有依赖的模块
define(function(require, exports, module){
  //引入依赖模块(同步)
  const module2 = require('./module2')
  //引入依赖模块(异步)
  require.async('./module3', function (m3) {})
  //暴露模块
  exports.xxx = value
})

```

**加载模块：**

```js
define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})
```

#### CMD 实践

同样是上面的例子，使用```SeaJs``` 改写，

项目目录：

```
├── index.html
└── js
    ├── libs
    │   └── sea.js
    ├── main.js
    └── modules
        ├── asyncPrint.js
        ├── print.js
        └── sayHello.js
```

下载[SeaJs](https://seajs.github.io/seajs/docs/#downloads)放入libs目录：

**index.html:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Modular Demo</title>
  </head>
  <body>
    <script type="text/javascript" src="js/libs/sea.js"></script>
    <script type="text/javascript">
      seajs.use('./js/main')
    </script>
  </body>
</html>
```

**asyncPrint.js**

```js
define(function (require, exports, module) {
  exports.print = function (msg) {
    console.log(msg)
  }
})
```

**print.js**

```js
define(function (require, exports, module) {
  exports.print = function (msg) {
    console.log(msg)
  }
})
```

**sayHello.js**

```js
define(function (require, exports, module) {
  require.async('./asyncPrint', function (asyncPrint) {
    asyncPrint.print('async hello world')
  })
  const print = require('./print')
  print.print('hello world')
})
```

**main.js**

```js
define(function (require) {
  require('./modules/sayHello')
})
```

### CommonJs

```Node```采用 CommonJS 模块规范。在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。



### ES6 Module


### CommonJs 和 ES6 Module 的差异

* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
* CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

### CommonJs 和 ES6 Module中的循环引用问题

## 参考资料

* [前端模块化详解(完整版)](https://github.com/ljianshu/Blog/issues/48)
* [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
* [CMD 模块定义规范](https://github.com/seajs/seajs/issues/242)
* [前端模块化：CommonJS,AMD,CMD,ES6](https://cloud.tencent.com/developer/article/1683007)
* [Node.js Cycles](https://nodejs.org/api/modules.html#modules_cycles)
* [Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)
* [Javascript模块化编程（二）：AMD规范](https://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
* [Javascript模块化编程（三）：require.js的用法](https://www.ruanyifeng.com/blog/2012/11/require_js.html)
* [写了十年JS却不知道模块化为何物？](https://blog.51cto.com/u_14145734/2389975)
* [JavaScript 模块化入门Ⅰ：理解模块](https://zhuanlan.zhihu.com/p/22890374)
* [JavaScript Modules: A Beginner’s Guide](https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/)
* [你不知道的JavaScript(上卷)第70页](./)
* [AMD, CMD, CommonJS和UMD](https://segmentfault.com/a/1190000004873947)
* [CMD 模块定义规范 #242](https://github.com/seajs/seajs/issues/242)
* [深入 CommonJs 与 ES6 Module](https://segmentfault.com/a/1190000017878394)