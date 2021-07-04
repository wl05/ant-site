# Typescript 基础类型

## Boolean

布尔类型声明：

```ts
let isDone: boolean = false;
```

## Number

和在JavaScript中一样，TypeScript中的所有数字要么是浮点值，要么是BigIntegers。这些浮点数的类型是number，而BigIntegers的类型是bigint。除了十六进制和十进制，TypeScript还支持ECMAScript 2015引入的二进制和八进制文字。

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

## String 
在typescript中使用string来定义一个字符串类型的变量，跟javascript一样变量可以使用单引号或者双引号，

```ts
let color: string = "blue";
color = 'red';
```

还可以使用模版字符串，模版字符串可以跨越多行并且可以有嵌套的表达式。字符串的值使用``，表达式使用```${ expr }```。

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string =
  "Hello, my name is " +
  fullName +
  ".\n\n" +
  "I'll be " +
  (age + 1) +
  " years old next month.";
```

## Array

声明数组变量有两种方式，

方式一：数组元素的类型 + []

```ts
let list: number[] = [1, 2, 3];
```

方式二：使用范型类型```Array<elemType>```

```ts
let list: Array<number> = [1, 2, 3];
```

## Tuple（元组）

如果一个数组的元素个数固定，可以使用Tuple来定义这个数组，同时也可以单独指定每个元素的类型。
```ts
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
// Type 'number' is not assignable to type 'string'.
// Type 'string' is not assignable to type 'number'.
```

通过超出元组索引范围的下标访问元组中的值会报错

```ts
x[3] = "world";
// Tuple type '[string, number]' of length '2' has no element at index '3'.

console.log(x[5].toString());
// Object is possibly 'undefined'.
// Tuple type '[string, number]' of length '2' has no element at index '5'.
```



## Enum (枚举)

枚举是 TypeScript 为数不多的不是 JavaScript 类型扩展的特性之一。Typescript 支持数字枚举和字符串枚举。

### Numeric enums （数字枚举）

定义枚举使用Enum关键字，

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

这里定义了一个数字枚举类型Direction，第一个元素UP初始值为1，后续元素的值在此基础上自动递增，也就是```Down =2, Left=3, Right = 4```，如果不带初始值，

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```
UP值为0，后续元素的值在此基础上自动递增。如果不关心成员的值只要他们的值不相同就可以，那自动递增是非常有用的。


或者也可以给每个元素明确的赋值，

```ts
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
```

另一个方便的特性是还可以通过值来获取到对应值的名称，

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];

// Displays 'Green'
console.log(colorName);
```

使用枚举很简单：访问枚举类型的属性，并使用枚举的名称声明类型：

```ts
enum UserResponse {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: UserResponse): void {
  // ...
}

respond("Princess Caroline", UserResponse.Yes);
```

简单地说，没有初始化的枚举要么必须放在第一个，要么必须放在用数字常量或其他常量枚举成员初始化的数字枚举之后。换句话说，下面这种情况是不允许的：
```ts
enum E {
  A = getSomeValue(),
  B,
// Enum member must have initializer.
}
```


### String enums(字符串枚举)

字符串枚举的概念与数字枚举类似，但是有一些运行时的差别。字符串枚举类型的成员必须使用一个字符串或者另一个字符串枚举成员进行初始化。

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

尽管字符串枚举类型没有自动增长的行为，但字符串枚举的好处是它们可以很好地序列化。换句话说，当在调试数字枚举运行时的值时，数字枚举的属性值不能够明确的向我们传达其所代表的意思（尽管有反向映射来获取属性值对应的属性名称），但字符串枚举可以给出一个有意义并且可读性更高的值。



### Heterogeneous enums （异构枚举）

Typescript的枚举类型是支持混合字符串枚举和数字枚举的。
```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
```
一般不推荐这样的写法

### 计算成员和常量成员

每个枚举成员都有一个与之关联的值，可以是常量，也可以是计算值。一个枚举成员在满足下列条件时被认为是常量：

* 如果是枚举中的第一个成员并却没有初始化器，在这种情况下它被赋值为0.
  ```ts
  // E.X is constant:
  enum E {
    X,
  }
  ```
* 没有初始化器并且它前面的枚举成员是一个数值常量。在这种情况下当前枚举成员的值是前面一个枚举成员的值加1。

```ts
// All enum members in 'E1' and 'E2' are constant.

enum E1 {
  X,
  Y,
  Z,
}

enum E2 {
  A = 1,
  B,
  C,
}
```

* enum成员使用常量enum表达式进行初始化。常量枚举表达式是TypeScript表达式的子集，可以在编译时完全求值。一个表达式满足下列条件就是常量枚举表达式：
1. 字面量enum表达式(基本上是字符串字面量或数字字面量)
2. 对以前定义的常量枚举成员的引用(它可以源自不同的枚举)
3. 带圆括号的常量枚举表达式
4. 用于常量枚举表达式的+、-、~一元运算符之一
5. ， %， <<， >>， >>>， &， |， ^二进制操作符，常量枚举表达式作为操作数

如果将常量枚举表达式求值为NaN或Infinity将会得到一个编译时错误。

所有其它情况的枚举成员被当作是需要计算得出的值。


```ts
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length,
}
```

### 联合枚举和枚举成员类型 （Union enums and enum member types
）

存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。字面量枚举成员是值没有初始值的常量枚举成员或者初始值被初始化为:

* 任何字符串字面量（例如："foo","bar","baz"） 
* 任何数字字面量（例如：1，100）
* 或这任何加了一元操作符-号的数字字面量（比如：-1，-100）


当枚举中的所有成员都有字面量枚举值时，就会产生一些特殊的语义。


第一就是枚举成员本身也会成为类型。比如我们可以定义对象的某些成员只能具有enum成员的值。

```ts
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Square,
// Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
  radius: 100,
};
```

第二，枚举类型本身实际上变成了每个枚举成员的联合。使用联合枚举，类型系统就能够知道存在于枚举中的确切的值，利用这一点Typescript可以捕获到错误比较的bug，例如：

```ts
enum E {
  Foo,
  Bar,
}

function f(x: E) {
  if (x !== E.Foo || x !== E.Bar) {
  // This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap.
  }
}
```

在这个例子中，我们首先比较了 x 是否不等于 E.Foo。 如何这个条件成立，判断就结束了。但是如果不成立那x就只能是E.Foo。所以后面再去比较E.bar就没有意义了。

### 运行时的枚举类型




## 参考资料

1. [Enums](https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums)
2. [Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)