# 函数类型

## 函数类型的简单声明

```ts
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
// 或者这里将 (a: string) => void 提出来 type GreetFunction = (a: string) => void;
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);
```

这里使用 `(a: string) => void` 声明函数 `fn` 的类型，`=>` 之前的部分表示的是函数接受的参数类型，之后表示的是函数的返回值。


## 声明函数的其他属性

函数也是对象，也可能会有其他的属性。那函数本身的属性怎么声明呢？很显然上面的方式办不到。

这里可以声明一个对象类型来表示：

```ts
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```
这里给函数声明了一个 `description` 属性。这里需要注意函数的类型声明部分和上面的方式不一样，这里函数接受的参数类型与返回类型之间是冒号而不是箭头。


## 声明构造函数的类型

```ts
class SomeObject {
  constructor(word: string) {
    console.log(word);
  }
}
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
fn(SomeObject);
```

## 泛型函数声明

如果函数的入参和返回的类型之间存在关系，或者入参的类型存在关系，则可以考虑使用泛型。

```ts
function getElementByIndex<T>(arr: T[], index): T｜undefined {
  return arr[index];
}

const num = getElementByIndex([1, 2, 3, 4], 1);
const str = getElementByIndex(["a", "b", "c", "d"], 1);
```

这里不用明确的指定具体的类型，typescript 会自动的帮我们推断出来。

再举个例子：

```ts
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

这里 ts 会帮我们自动推断出 Input 的类型，同时也会根据 第二个函数参数的返回值类型推断出 Output 的类型。

## 范型约束

对于泛型函数如果我们想读取入参的某个具体的属性比如说 length 属性，但是有些类型不一定有 length 属性，这个时候我们可以通过 extends 关键字来对泛型加一些约束。

举个例子：

```ts
function compareLength<T extends { length: number }>(a: T, b: T) {
  return a.length > b.length; // 这里如果不加约束访问 length  属性是会报错的。
}

compareLength([1, 2, 3, 4], [1, 2, 3]);
compareLength("hello", "world");
compareLength(100, 220); // 报错
```

## 函数重载

函数重载的意义在于可以定义接收不同参数数量和参数类型的函数，调用函数的时候类型校验会自动映射到某一个定义上，通过一个例子来讲解一下。

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): number;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3); // 这里 ts 报错： "No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.ts(2575)"
```
需要特别注意：*前两个是函数的重载声明，最后一个是函数的实现声明。*

实现声明必须要保证对重载声明的兼容性，兼容性体现在实现函数的入参和返回参数类型必须兼容所有的重载声明。

d3 报错的原因是没有重载声明是接收两个参数的。这里声明的 makeDate 只能接收一个参数或者两个参数。


## 什么情况下返回值类型是 never ?

以下三种情况下函数的返回值是 never :

1. 抛出错误的函数

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

2. 终止执行的函数
3. 当 TypeScript 确定联合类型中没有的类型时 never 也会出现。


```ts
function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```


## 参考

* [More on  Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)