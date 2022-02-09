# Javascript 类型判断

[[toc]]
## typeof

说到类型判断首先想到的是 typeof

typeof 是一个操作符，语法：
```js
typeof operand
// 等价于
typeof(operand)
```

typeof 能够检测的类型如下：

|  类型   | 结果  |
|  ----  | ----  |
| Undefined  | "undefined" |
| Null  | "object" |
| Boolean  | "boolean" |
| Number  | "number" |
| BigInt  | "bigint" |
| String  | "string" |
| Symbol  | "symbol" |
| Function  | "function" |
| 其他任意对象  | "object" |


对于typeof操作符，有以下几点需要注意:

1. ```typeof null === 'object';```

这是比较奇怪的点，MDN上的[解释是](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)：

> In the first implementation of JavaScript, JavaScript values were represented as a type tag and a value. The type tag for objects was 0. null was represented as the NULL pointer (0x00 in most platforms). Consequently, null had 0 as type tag, hence the typeof return value "object". (reference)

简单说就是：在js的最初实现中，js 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00）null 的类型标签也是 0，因此 typeof null 返回的也是 "object"。这个 "feature" 一直流传至今 🐶。

2. typeof 可以判断出函数类型

```js
typeof function() {} === 'function';
```


虽说 typeof 能够判断出一些类型，但是遇到对象的时候并不能区分出对象具体类型的是什么，比如：

```js
typeof {a: 1} === 'object';
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';
typeof /regex/ === 'object';
typeof new Boolean(true) === 'object';
```

这些通过typeof判断出来都是object类型。显然在某些场景下是不能满足我们的需求的。

## instanceof

instanceof 语法：

```js
object instanceof constructor
```

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，[参考MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car); // true
console.log(auto instanceof Object); // true
```

这个例子中可以看到 auto instanceof Car 为 true 这个可以理解，auto instanceof Object 也为true？

要理解instanceof 的原理，需要理解原型链的构成，这里放一张神图：

![](./prototype.jpg)

当使用 instanceof 做判断时会沿着实例对象的原型链去找也就是`__proto__`那一条线，

`auto.__proto__` 指向 `Car.prototype`, `Car.prototype.__proto__` 又指向 `Object.prototype`, `Object.prototype.__proto__` 最终指向 `null`。

所以上面判断都为true。

根据 instanceof 的原理，我们可以模拟实现一下 intanceof：

```js
function _instanceof(obj,c){
  var temp = obj.__proto__
  var prototype = c.prototype
  while(true){
    if(temp === null) return false
    if(temp === prototype) return true
    temp = temp.__proto__
  }
}
```

**注意点：**

1. 构造函数的prototype是可以改变的，这可能跟我们预期的结果不一致。例如：

```js
function C() {}
var a = new C()
console.log(a instanceof C) // true
C.prototype = {}
console.log(a instanceof C) // false
```
2. instanceof 和多全局对象(例如：多个 frame 或多个 window 之间的交互)

不同的全局环境拥有不同的全局对象，从而拥有不同的内置类型构造函数，例如：

表达式 `[] instanceof window.frames[0].Array` 会返回 false，因为 `Array.prototype !== window.frames[0].Array.prototype`。

3. 根据 instanceof 的判断逻辑可以看出 instanceof 只能用来判断对象和构造函数之间是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型。

## Constructor

函数的 prototype 都有一个默认的 constructor 属性指向函数本身。当函数作为构造函数时，创建的实例可以通过隐式原型（`__proto__`）拿到 constructor，因此可以通过这个属性的值和构造函数进行比较，例如:

```js
function Demo(){}
var demo = new Demo()
console.log(demo.constructor === Demo) // true
```

**注意点：**

原型是可以被覆写的会导致判断失效例如：

```js
function Demo(){}
Demo.prototype = {}
var demo = new Demo()
console.log(demo.constructor === Demo) // false
console.log(demo.constructor === Object) // true
```

这个时候 `demo.constructor === Object` 因为 `Demo.prototype` 此时是 Object 的字面量，所以在修改原型的时候需要将 constructor重新赋值回构造函数：`Demo.prototype.constructor = Demo`。

## Object.prototype.toString

 `Object.prototype.toString` 方法返回的字符串格式为`[object Type]`，其中的Type就是对象的类型。注意这里说的是 Object.prototype.toString，我们知道所有的对象都会继承Object的原型，按道理来说都会有 Object.prototype.toString方法，但是由于有些对象覆写了 toString 方法，例如 Number.prototype.toString，所以为了保证调用的是 Object.prototype.toString 需要使用 call 或者 apply。[参考](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#using_tostring_to_detect_object_class)


```js
const toString = Object.prototype.toString;

toString.call(new Object);  // [object Object]
toString.call(new Date);    // [object Date]
toString.call(new String);  // [object String]
toString.call(Math);        // [object Math]
toString.call(1)            // [object Number]
toString.call(true)         // [object Boolean]
toString.call("hello")      // [object String]
toString.call(Symbol())     // [object Symbol]
toString.call(11n)          // [object BigInt]
toString.call(undefined);   // [object Undefined]
toString.call(null);        // [object Null]
```

基于这个方法我们可以封装一个判断类型的函数，需求是输入参数，返回参数的类型，并且是小写的。

实现如下：

```js
function type(obj){
    if(obj == null) return obj + "" // 这里是为了兼容性考虑，排除掉 null undefined
    return typeof obj === 'object' ?  Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() : typeof obj
}
```

**注意点：**

这种方法也并不是万能的，如果对象定义了 [Symbol.toStringTag ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性，返回的类型是 Symbol.toStringTag 的属性值。

```js
const myDate = new Date();
Object.prototype.toString.call(myDate);     // [object Date]

myDate[Symbol.toStringTag] = 'myDate';
Object.prototype.toString.call(myDate);     // [object myDate]
```



## 参考资料
* [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
* [JavaScript专题之类型判断(上)](https://github.com/mqyqingfeng/Blog/issues/28)
* [JavaScript专题之类型判断(下)](https://github.com/mqyqingfeng/Blog/issues/30)
* [判断JS数据类型的四种方法](https://www.cnblogs.com/onepixel/p/5126046.html)