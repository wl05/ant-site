# 前端手写题

## 实现防抖函数（debounce）

概念：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

适用场景： 搜索框搜索联想、优化resize事件等。

实现：

```html
<!-- 防抖函数实现 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Debounce</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      #search {
        width: 400px;
        margin-left: 300px;
        margin-bottom: 50px;
      }
      #showSearch {
        width: 800px;
        height: 100px;
        background: lightblue;
        color: red;
        margin-left: 300px;
      }
    </style>
  </head>
  <body>
    <input type="search" id="search" />
    <div id="showSearch"></div>
    <script>
      function debounce(fn, wait) {
        let timer
        return function () {
          const args = arguments
          const context = this // 保留函数执行时的this对象
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(function () {
            fn.apply(context, args)
          }, wait)
          // 因为这里是在setTimeout的回调函数中执行，fn中的this在非严格模式下是指向window的，所以需要改变fn中this的指向，
          // 同时将接受到的参数传递给fn
        }
      }
      const showSearch = document.querySelector('#showSearch')
      const search = document.querySelector('#search')
      function getSearchInfo(e) {
        showSearch.innerText = this.value // 这里的this指向
      }
      search.onkeyup = debounce(getSearchInfo, 1000)
    </script>
  </body>
</html>
```

## 实现节流函数（throttle）

概念：每隔n秒执行一次事件，在这n秒内无论触发多少次事件最终只会执行一次

适用场景：优化用户点击过快等

实现：

```html
<!-- 防抖函数实现 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Throttle</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script>
      // 实现方式1:
      // 这种方式会延迟到delay时间才会执行一次
      function throttle1(fn, delay) {
        let timer
        return function () {
          const context = this
          const args = arguments
          if (timer) {
            return
          }
          timer = setTimeout(function () {
            fn.apply(context, args)
            timer = null // 注意这里需要将timer置为null
          }, delay)
        }
      }

      // 实现方式2:
      // 这种方式会立刻触发一次，然后等delay时长后再触发
      function throttle2(fn, delay) {
        let previous = 0
        return function () {
          const now = Date.now()
          const args = arguments
          if (now - previous > delay) {
            fn.apply(this, args)
            previous = now
          }
        }
      }

      function testThrottle(e, content) {
        console.log(e, content)
      }

      const testThrottleFn = throttle2(testThrottle, 1000) // 节流函数
      document.onmousemove = function (e) {
        testThrottleFn(e, 'throttle') // 给节流函数传参
      }
    </script>
  </body>
</html>
```

## 用 Throttle 来优化 Debounce

## 深拷贝（deepclone）

## 实现Event(event bus)

## 实现instanceOf

## 模拟new

要模拟实现new关键字，首先我们要知道new关键字做了哪些事情。

new关键字后面跟的是构造函数或者class。参考 MDN 中对[new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)关键字的介绍，可以总结几个关键点：

1. 创建一个空对象；
2. 给空对象添加__proto__属性，指向构造函数的prototype（原型）对象；
3. 将新创建的对象作为 this 上下文；
4. 如果构造函数返回一个对象，这个对象就是new操作的结果；如果构造函数返回的是原始类型或者不返回值则new操作的结果就是上面创建的对象。

根据上面的要点可以实现如下：

```js
function ObjFactory() {
  const obj = new Object() // 1. 创建一个空对象；
  const args = arguments
  const Constructor = Array.prototype.shift.call(args) // ObjFactory的第一个参数是构造函数，这里shift会改变args，剩下的都是传给构造函数的参数
  obj.__proto__ = Constructor.prototype // 2. 给空对象添加__proto__属性，指向构造函数的prototype（原型）对象；
  const res = Constructor.apply(obj, args) // 3. 将新创建的对象作为 this 上下文；
  return Object.prototype.toString.call(res) === '[object Array]' ||
    Object.prototype.toString.call(res) === '[object Object]' ||
    Object.prototype.toString.call(res) === '[object Function]'
    ? res
    : obj // 4. 如果构造函数返回一个对象，这个对象就是new操作的结果；如果构造函数返回的是原始类型或者不返回值则new操作的结果就是上面创建的对象。
}
const Person = function (name) {
  this.name = name
}

Person.prototype.sayHello = function () {
  console.log(`${this.name} say hello`)
}
const res = ObjFactory(Person, 'Tom')
res.sayHello()
```

## 实现一个call

## 实现一个apply

## 实现bind

## 函数柯里化

## Promise

## 模板引擎实现

## 参考资料

* [防抖节流](https://segmentfault.com/a/1190000018445196)
* [最全的手写JS面试题](https://juejin.cn/post/6968713283884974088)
* [「中高级前端面试」JavaScript手写代码无敌秘籍](https://juejin.cn/post/6844903809206976520)
* [前端面试常见的手写功能](https://juejin.cn/post/6873513007037546510)
* [最新的前端大厂面经（详解答案）](https://juejin.cn/post/7004638318843412493#heading-20)
* [AntBlog](https://github.com/wl05/AntBlog)
