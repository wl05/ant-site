# This 理解

在 javascript 中this的指向一向都让人晦涩难懂，很多时候是反直觉的，怎么一会儿指向这儿一会儿指向那儿？

本篇就来罗列一下 this 如何取值的场景。知道这些场景后以后就再也不用靠猜了。

首先我们需要明确一条规则： **函数中this的取值是在函数调用的时候确定的，而不是在函数定义的时候**，这一点一定要切记。

## new 构造函数

我们知道可以通过 new 构造函数的方式创建对象，那么 new 关键字做了哪些事情呢？可以总结如下：

1. 创建一个空对象；
2. 给空对象添加__proto__属性，指向构造函数的prototype（原型）对象；
3. 将新创建的对象作为构造函数中的 this；
4. 如果构造函数返回的是原始类型或者不返回值则new操作的结果就是上面创建的对象；如果构造函数返回一个对象，这个对象就是new操作的结果（此时this不指向返回的对象）。

```js
function Person(name){
    this.name = name
    console.log(this) // Person {name: 'Tom'}
}
var Tom = new Person("Tom")
console.log(Tom.name) // Tom
```

此时this指向新创建的对象。

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

当函数独立调用的时候，函数里面的this指向的是全局对象（浏览器环境下是window），严格模式下指向undefined。

```js
function demo(){
  console.log(this === window) // true
  console.log(this.a) // 10
}
var a = 10 // 全局变量是挂在window上的。
demo()
```

## call、apply、bind调用

这三个方法的作用都是改变函数中this的指向。

* call: `function.call(thisArg, arg1, arg2, ...)` 第一个参数要指定的 this 对象，后续的是 function 接收的参数列表
* apply: `func.apply(thisArg, [argsArray])` 第一个参数要指定的 this 对象，然后接收一个参数数组
* bind: 不会立刻执行，只是绑定函数的this对象,并将绑定好的函数返回。

```js
function say(){
  console.log("I am",this.name," and I am ",this.age, "years old")
}

var Tom = {
  age: 18,
  name: "Tome"
}

var Tony = {
  age: 20,
  name: "Tony"
}

say.call(Tom) // I am Tome  and I am  18 years old
say.call(Tony) // I am Tony  and I am  20 years old
```

## 箭头函数

箭头函数的出现让this的指向更加明确，也更加符合人的直觉。

首先要明确两点:

* 箭头函数内部是没有this对象的
* 箭头函数里面的this是指向箭头函数外最近的那个this对象

```js
var person = {
  name: "Tom",
  say: function(){
    return ()=>{
      console.log("I am ",this.name)  // I am  Tom
    }
  }
}
var say = person.say()
say()
```

这里需要注意的是 say 函数需要使用function 函数包裹，这样保证 function里面的this是指向 person对象，如果直接把say写成箭头函数：

```js
var person = {
  name: "Tom",
  say: ()=>{
      console.log("I am ",this.name)  // I am undefined
    }
}
person.say()
```

此时箭头函数外层的this在浏览器非严格模式下是指向window的。

## 总结

涉及到this取值的场景一共有五种：

1. new 构造函数：此时this指向新创建的对象
2. 函数作为对象的属性调用：此时this指向调用函数的对象
3. 作为普通函数调用： 此时this指向的是全局对象（浏览器环境下是window），严格模式下指向undefined。
4. call、apply、bind改变函数里this的指向： 此时this指向传入的对象
5. 箭头函数：箭头函数里面的this指向箭头函数外最近的那个this对象

## 资料收集

* [深入理解 js this 绑定 ( 无需死记硬背，尾部有总结和面试题解析 )](https://segmentfault.com/a/1190000011194676)
* [深入理解javascript原型和闭包（10）——this](https://www.cnblogs.com/wangfupeng1988/p/3988422.html)
