# 泛型

<page-tags text="发布于：2021-06-25"></page-tags>

现在我们想定义一个函数 identity，接收参数为 number 类型，返回参数也为 number 类型，我们通常的做法是像下面这样定义这个函数。

```ts
function identity(arg: number): number {
  return arg;
}
```

当然这没问题，现在我们想这个函数更通用一些，比如我想让 arg 能接收 string 类型的参数，那怎么做？

我们可以这样定义：

```ts
function identity(arg: number | string): number | string {
  return arg;
}
```

或者更粗暴一点

```ts
function identity(arg: any): any {
  return arg;
}
```

但是这里使用 any 就失去了我们使用 typescript 的意义了。我们现在的目的是想定义传入参数的类型，同时呢这个参数的类型可能会用到返回参数的类型定义中，那有没有更加优雅的姿势来达到我们的目的呢，答案当然是有的，那就是泛型。我们来看看使用泛型如何定义上面的函数。

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```

使用<>在函数后面定义了一个 Type 变量，这个变量可以让我们捕获到入参的类型，同时我们将这个变量用作返回参数的类型。现在这个函数就可以灵活的传入不同类型的参数了，这就是泛型的概念了。和 any 不同的是我们这里并没有丢失类型。

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

但是如果我想打印 arg 的 length 属性

```ts
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  // Property 'length' does not exist on type 'Type'.
  return arg;
}
```

此时 ts 就会报错了，因为其实我现在是可以传入任意类型的参数的，比如 number，number 类型是没有 length 属性的。那怎么办呢？我们可以表明需要传入一个元素类型是 Type 类型的数组，因为数组是有 length 属性的，同时返回一个元素类型是 Type 的数组。

```ts
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
```

这里 Type 作为我们定义的类型的一部分，使用起来更加灵活。我们也可以使用内置的泛型类型 Array 来定义，泛型类型我们后面会介绍。

```ts
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
```

## 泛型类型

前面我们创建了一个泛型函数 identity，那么怎么定义这个泛型函数的类型呢？

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;
```

这里声明了一个 myIdentity 变量，然后将 identity 赋值给它，myIdentity 后面就是 identity 函数的类型定义：`<Type>(arg: Type) =>Type`，Type 名字就是一个变量名，可以随意。比如下面这样也是可以的，

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

更进一步我们可以将这个对象字面量提取出来放到一个 interface 中，

```ts
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

还不够完美，我们想让泛型参数 Type 变成整个 interface 的参数，这样我们就能清楚的知道我们使用的是什么类型的参数了，同时对于 interface 里面的所有成员这个参数也是可见的。

```ts
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

对于 interface GenericIdentityFn 这就是一个泛型类型。

## 泛型类

泛型类的结构和泛型 interface 的结构差不多，

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};
```

和泛型 interface 一样，泛型类保证了类的成员使用的都是相同类型的变量，需要注意的是，类有静态部分和实例部分只有实例部分可以使用这个泛型类型。

## 泛型约束

说回我们之前定义的函数，

```ts
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  // Property 'length' does not exist on type 'Type'.
  return arg;
}
```

我们尝试打印 arg 的 length，但是因为不确定传入的参数是否有 length 属性，所以这里 ts 报错了，那么这里我们需要给我们的泛型加上一定的限制，要求传入的参数必须要有 length 属性，怎么做？

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```

我们定义了一个 interface Lengthwise 将我们的限制放到里面这里要求必须要有 length 属性。然后使用 extends 关键字来加入我们的限制，现在就要求传入的参数必须要有 length 属性了，

```ts
loggingIdentity(3);
// Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
```

如果没有就会 ts 报错。

相反如果有 length 属性，就没问题了。

```ts
loggingIdentity({ length: 10, value: 3 });
```

### 在泛型约束中使用类型参数

一个类型参数可以作为另一个类型参数的约束，怎么理解，我们来看一个例子，现在我们想定义一个根据对象 key 获取对象属性值的方法，但是呢我们又想防止访问的 key 在对象中不存在的这种情况。这里我们就可以使用一个类型参数作为另一个类型参数的约束，

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");
// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

这里我们就限制了 Key 必须是 Type 的 key。如果不是则会 ts 报错。

### 在泛型中使用类类型

一个工厂函数，传入构造函数返回实例，我们可以通过泛型来定义构造函数的类型，

```ts
function create<T>(c: new () => T): T {
  return new c();
}
```

拓展用法，结合泛型约束。

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

这里我们限制了类型参数 A 必须是 Animal 的子类。

## 参考资料

1. [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
