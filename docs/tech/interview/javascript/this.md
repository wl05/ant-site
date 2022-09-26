# this

除去不常用的 with 和 eval 的情况，具体到实际应用中，this 的指向大致可以分为以下 4 种。
* 作为对象的方法调用。
* 作为普通函数调用。
* 构造器调用。
* Function.prototype.call 或 Function.prototype.apply 调用。

下面我们分别进行介绍。 

1. 作为对象的方法调用

当函数作为对象的方法被调用时，this 指向该对象：
```js
var obj = {
	a: 1,
	getA: function(){
		alert ( this === obj ); // 输出：true
		alert ( this.a ); // 输出: 1
	}
};
obj.getA();
```

2. 作为普通函数调用

当函数不作为对象的属性被调用时，也就是我们常说的普通函数方式，此时的 this 总是指
向全局对象。在浏览器的 JavaScript 里，这个全局对象是 window 对象。
```js
window.name = 'globalName';
var getName = function(){
	return this.name;
};
console.log( getName() ); // 输出：globalName
// 或者：
window.name = 'globalName';
var myObject = {
	name: 'sven',
	getName: function(){
		return this.name;
 	}
};
var getName = myObject.getName;
console.log( getName() ); // globalName
```

有时候我们会遇到一些困扰，比如在 div 节点的事件函数内部，有一个局部的 callback 方法，
callback 被作为普通函数调用时，callback 内部的 this 指向了 window，但我们往往是想让它指向
该 div 节点，见如下代码：
```html
<html>
 <body>
 <div id="div1">我是一个 div</div>
 </body>
 <script>
 window.id = 'window';
 document.getElementById( 'div1' ).onclick = function(){
 alert ( this.id ); // 输出：'div1'
 var callback = function(){
 alert ( this.id ); // 输出：'window'
 }
 callback();
 };
 </script>
</html>
```

此时有一种简单的解决方案，可以用一个变量保存 div 节点的引用：
```js
document.getElementById( 'div1' ).onclick = function(){
 var that = this; // 保存 div 的引用
 var callback = function(){
 alert ( that.id ); // 输出：'div1'
 }
 callback();
};
```
在 ECMAScript 5 的 strict 模式下，这种情况下的 this 已经被规定为不会指向全局对象，而
是 undefined：
```js
function func(){
 "use strict"
 alert ( this ); // 输出：undefined
}
func();
```

3. 构造器调用
JavaScript 中没有类，但是可以从构造器中创建对象，同时也提供了 new 运算符，使得构造
器看起来更像一个类。
除了宿主提供的一些内置函数，大部分 JavaScript 函数都可以当作构造器使用。构造器的外
表跟普通函数一模一样，它们的区别在于被调用的方式。当用 new 运算符调用函数时，该函数总
会返回一个对象，通常情况下，构造器里的 this 就指向返回的这个对象，见如下代码：
```js
var MyClass = function(){
 this.name = 'sven';
};
var obj = new MyClass();
alert ( obj.name ); // 输出：sven
```
但用 new 调用构造器时，还要注意一个问题，如果构造器显式地返回了一个 object 类型的对
象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this：
```js
var MyClass = function(){
 this.name = 'sven';
 return { // 显式地返回一个对象
 name: 'anne'
 }
};
var obj = new MyClass();
alert ( obj.name ); // 输出：anne
```
如果构造器不显式地返回任何数据，或者是返回一个非对象类型的数据，就不会造成上述
问题：
```js
var MyClass = function(){
 this.name = 'sven'
 return 'anne'; // 返回 string 类型
};
var obj = new MyClass();
alert ( obj.name ); // 输出：sven
```
4. Function.prototype.call 或 Function.prototype.apply 调用
跟普通的函数调用相比，用 Function.prototype.call 或 Function.prototype.apply 可以动态地
改变传入函数的 this：
```js
var obj1 = {
 name: 'sven',
 getName: function(){
 return this.name;
 }
};
var obj2 = {
 name: 'anne'
};
console.log( obj1.getName() ); // 输出: sven
console.log( obj1.getName.call( obj2 ) ); // 输出：anne 
```
call 和 apply 方法能很好地体现 JavaScript 的函数式语言特性，在 JavaScript 中，几乎每一次
编写函数式语言风格的代码，都离不开 call 和 apply。在 JavaScript 诸多版本的设计模式中，也
用到了 call 和 apply。在下一节会详细介绍它们。 

## 参考资料
* JavaScript设计模式与开发实践(第二章2.1)