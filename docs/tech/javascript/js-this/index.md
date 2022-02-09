# This 理解

在 javascript 中this的指向一直都让人晦涩难懂，怎么一会儿指向这儿一会儿指向那儿？本篇就来罗列一下 this 如何取值的场景。以后就再也不用靠猜了。

首先我们需要明确一条规则： **函数中this的取值是在函数调用的时候确定的，而不是在函数定义的时候**，这一点一定要切记。

## new 构造函数

我们知道可以通过 new 构造函数的方式创建对象，那么 new 关键字做了哪些事情呢？可以总结如下：

1. 创建一个空对象；
2. 给空对象添加__proto__属性，指向构造函数的prototype（原型）对象；
3. 将新创建的对象作为构造函数中的 this；
4. 如果构造函数返回的是原始类型或者不返回值则new操作的结果就是上面创建的对象；如果构造函数返回一个对象，这个对象就是new操作的结果。

```js
function Person(name){
    this.name = name
    console.log(this) // Person {name: 'Tom'}
}
var Tom = new Person("Tom")
console.log(Tom.name) // Tom
```

可以看到此时的this是指向新创建的对象的。

## 函数作为对象的属性调用

这个也是比较常见的场景，举例如下：

```js
function say(){
    console.log("I am",this.name)
}
var Tom = {
    name: "Tom",
    say
}
Tom.say()
```

此时函数里面的this指向的是调用函数的那个对象。

## 作为普通函数调用

当函数独立调用的时候，函数里面的this指向的是

## call、apply、bind调用

## 箭头函数

## 资料收集

* [深入理解 js this 绑定 ( 无需死记硬背，尾部有总结和面试题解析 )](https://segmentfault.com/a/1190000011194676)
* [深入理解javascript原型和闭包（10）——this](https://www.cnblogs.com/wangfupeng1988/p/3988422.html)
