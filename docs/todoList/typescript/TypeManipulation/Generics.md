# 泛型世界

现在我们想定义一个函数identity，接收参数为number类型，返回参数也会number类型，我们通常的做法是像下面这样定义这个函数。

```ts
function identity(arg: number): number {
  return arg;
}
```
当然这没问题，现在我们想这个函数更通用一些，比如我想让arg能接收string类型的参数，那怎么做？

可以这样定义：
```ts
function identity(arg: number|string): number|string {
  return arg;
}
```

或者更粗暴一点

```ts
function identity(arg: any): any {
  return arg;
}
```

这里使用any就失去了我们使用typescript的意义了。我们现在的目的是想定义传入参数的类型，同时呢这个参数的类型可能会用到返回参数的类型定义中，那有没有更加优雅的姿势来达到我们的目的呢，答案当然是有的，那就是泛型。我们来看看使用泛型如何定义上面的函数。

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```
使用<>在函数后面定义了一个Type变量，





## 参考资料

1. [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)