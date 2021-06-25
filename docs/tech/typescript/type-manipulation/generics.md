# 泛型

发布于：2021-06-25

现在我们想定义一个函数identity，接收参数为number类型，返回参数也为number类型，我们通常的做法是像下面这样定义这个函数。

```ts
function identity(arg: number): number {
  return arg;
}
```
当然这没问题，现在我们想这个函数更通用一些，比如我想让arg能接收string类型的参数，那怎么做？

我们可以这样定义：
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

但是这里使用any就失去了我们使用typescript的意义了。我们现在的目的是想定义传入参数的类型，同时呢这个参数的类型可能会用到返回参数的类型定义中，那有没有更加优雅的姿势来达到我们的目的呢，答案当然是有的，那就是泛型。我们来看看使用泛型如何定义上面的函数。

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```
使用<>在函数后面定义了一个Type变量，这个变量可以让我们捕获到入参的类型，同时我们将这个变量用作返回参数的类型。现在这个函数就可以灵活的传入不同类型的参数了，这就是泛型的概念了。和any不同的是我们这里并没有丢失类型。

那么怎么调用这个方法呢，两种方式：

方法一：明确指明传入参数的类型

```ts
let output = identity<string>("myString");
```
调用方法的时候使用<>明确的指明传入参数的类型。

方法二：使用类型推断

```ts
let output = identity("myString");
```
这里编译器会根据我们传入的参数为我们自动推断出传入参数的类型。好处就是代码更简洁可读性更高。但是在一些复杂的场景下，编译器无法推断出类型时，我们可以使用方法一明确地指明入参类型。


## 使用泛型变量

在上面这个例子中我们是可以传入任意类型的参数的，
```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```
但是如果我想打印arg的length属性

```ts
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
// Property 'length' does not exist on type 'Type'.
  return arg;
}
```

此时ts就会报错了，因为其实我现在是可以传入任意类型的参数的，比如number，number类型是没有length属性的。那怎么办呢？我们可以表明需要传入一个元素类型是Type类型的数组，因为数组是有length属性的，同时返回一个元素类型是Type的数组。

```ts
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
```
这里Type作为我们定义的类型的一部分，使用起来更加灵活。我们也可以使用内置的泛型类型Array来定义，泛型类型我们后面会介绍。

```ts
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
```

## 泛型类型

前面我们创建了一个泛型函数identity，那么怎么定义这个泛型函数的类型呢？

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;
```

这里声明了一个myIdentity变量，然后将identity赋值给它，myIdentity后面就是identity函数的类型定义：```<Type>(arg: Type) =>Type```，Type名字就是一个变量名，可以随意。比如下面这样也是可以的，

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Input>(arg: Input) => Input = identity;
```

我们还可以使用带有调用签名的对象字面量来定义泛型函数：


```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: { <Type>(arg: Type): Type } = identity;
```

更进一步我们可以将这个对象字面量提取出来放到一个interface中，

```ts
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

还不够完美，我们想让泛型参数Type变成整个interface的参数，这样我们就能清楚的知道我们使用的是什么类型的参数了，同时对于interface里面的所有成员这个参数也是可见的。
```ts
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

对于interface GenericIdentityFn这就是一个泛型类型。


## 范型类

范型类的结构和范型interface的结构差不多，

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

和范型interface一样，范型类保证了类的成员使用的都是相同类型的变量，需要注意的是，类有静态部分和实例部分只有实例部分可以使用这个泛型类型。

## 泛型约束

说回我们之前定义的函数，

```ts
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
// Property 'length' does not exist on type 'Type'.
  return arg;
}
```
我们尝试打印arg的length，但是因为不确定传入的参数是否有length属性，所以这里ts报错了，那么这里我们需要给我们的泛型加上一定的限制，要求传入的参数必须要有length属性，怎么做？

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```

我们定义了一个interface Lengthwise 将我们的限制放到里面这里要求必须要有length属性。然后使用extends关键字来加入我们的限制，现在就要求传入的参数必须要有length属性了，
```ts
loggingIdentity(3);
// Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
```

如果没有就会ts报错。

相反如果有length属性，就没问题了。


```ts
loggingIdentity({ length: 10, value: 3 });
```


### 在泛型约束中使用类型参数

一个类型参数可以作为另一个类型参数的约束，怎么理解，我们来看一个例子，现在我们想定义一个根据对象key获取对象属性值的方法，但是呢我们又想防止访问的key在对象中不存在的这种情况。这里我们就可以使用一个类型参数作为另一个类型参数的约束，

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");
// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

这里我们就限制了Key必须是Type的key。如果不是则会ts报错。

### 在范型中使用类类型

一个工厂函数，传入构造函数返回实例，我们可以通过范型来定义构造函数的类型，

```ts
function create<T>(c: new()=> T): T {
  return new c();
}
```

拓展用法，结合范型约束。
```ts
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

```

这里我们限制了类型参数A必须是Animal 的子类。


## 参考资料

1. [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)