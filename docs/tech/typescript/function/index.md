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

这里使用 `(a: string) => void` 声明函数 `fn` 的类型，`=>` 之前的部分表示的是函数接受的参数类型，之后标识的是函数的返回值。


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

```

## 范型约束





## 参考
1. [More oinasdasdasd  Function](https://www.typescriptlang.org/docs/handbook/2/functions.html)