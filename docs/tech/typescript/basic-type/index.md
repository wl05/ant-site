# Typescript 基础类型

## Boolean

布尔类型声明：

```ts
let isDone: boolean = false;
```

## Number

和在```JavaScript```中一样，```TypeScript```中的所有数字要么是浮点值，要么是```BigIntegers```。这些浮点数的类型是```number```，而```BigIntegers```的类型是```bigint```。除了十六进制和十进制，```TypeScript```还支持```ECMAScript 2015```引入的二进制和八进制。

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

## String 
在```typescript```中使用```string```来定义一个字符串类型的变量，跟```javascript```一样变量可以使用单引号或者双引号扩起来：

```ts
let color: string = "blue";
color = 'red';
```

还可以使用模版字符串，模版字符串可以跨越多行并且可以有嵌套的表达式。字符串的值使用``反引号括起来，表达式使用```${ expr }```。

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

**方式一：** 元素类型 + []

```ts
let list: number[] = [1, 2, 3];
```

**方式二：** 使用范型类型```Array<elemType>```

```ts
let list: Array<number> = [1, 2, 3];
```

## Tuple（元组）

元组用来定义元素个数固定的数组，数组中元素可以有各自的类型：

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

当访问一个已知索引的元素，获取到的值的类型是相对应位置的类型:

```ts
// OK
console.log(x[0].substring(1));

console.log(x[1].substring(1));
// Property 'substring' does not exist on type 'number'.
```

通过超出元组索引范围的下标访问元组中的值会报错:

```ts
x[3] = "world";
// Tuple type '[string, number]' of length '2' has no element at index '3'.

console.log(x[5].toString());
// Object is possibly 'undefined'.
// Tuple type '[string, number]' of length '2' has no element at index '5'.
```

## Enum (枚举)

枚举是 ```TypeScript``` 为数不多的不是 ```JavaScript``` 类型扩展的特性之一。```Typescript``` 提供数字枚举和基于字符串的枚举。定义枚举使用```Enum```关键字。

### Numeric enums （数字枚举）

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```
定义一个数字枚举类型```Direction```，第一个元素```UP```初始值为1，后续元素的值在此基础上自动递增，也就是说·```Down =2, Left=3, Right = 4```，如果不带初始值：

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```
此时```UP```初始值为```0```，后续元素的值在此基础上自动递增。如果我们不关心成员的值，只要他们的值不相同就可以，那自动递增就非常有用了。


或者也可以给每个元素明确的赋值，

```ts
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
```

另一个方便的特性是还可以通过值来获取到对应值的名称（反向映射后面还会提到）

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

没有初始化器的枚举要么必须放在第一个，要么必须放在用数字常量或其他常量枚举成员初始化的数字枚举之后。换句话说，以下情况是不允许的:
```ts
enum E {
  A = getSomeValue(),
  B,
// Enum member must have initializer.
}
```


### String enums(字符串枚举)

字符串枚举的概念与数字枚举类似，但是有一些运行时的差别。字符串枚举类型的成员必须使用字符串或者另一个字符串枚举成员进行常量初始化。

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

尽管字符串枚举类型没有自动增长的行为，但字符串枚举的好处是它们可以很好地序列化。换句话说，在调试数字枚举运行时的值时，数字枚举的属性值不能够明确的向我们传达其所代表的意思（尽管有反向映射来获取属性值对应的属性名称），但字符串枚举可以给出一个有意义并且可读性更高的值。这样就不用依赖于枚举成员的名称了。

### Heterogeneous enums （异构枚举）

```Typescript```的枚举类型是支持混合字符串枚举和数字枚举的。
```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
```
但是一般不推荐这样的用法。

### 计算成员和常量成员

每个枚举成员都有一个与之关联的值，可以是常量，也可以是计算值。一个枚举成员在满足下列条件时被认为是常量：

* 如果是枚举中的第一个成员并且没有初始化器，在这种情况下它被初始化为0.
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

* 枚举成员使用常量枚举表达式进行初始化。常量枚举表达式是```TypeScript```表达式的子集，可以在编译时完全求值。一个表达式满足下列条件就是常量枚举表达式：
1. 字面量枚举表达式(主要是字符串字面量或数字字面量)
2. 对先前定义的常量枚举成员的引用(它可以源自不同的枚举)
3. 带圆括号的常量枚举表达式
4. 用于常量枚举表达式的```+、-、~```一元运算符之一
5. ```+, -, *, /, %, <<, >>, >>>, &, |, ^```二进制操作符，常量枚举表达式作为操作数

如果将常量枚举表达式求值为NaN或Infinity将会得到一个编译时错误。

所有其它情况的枚举成员都被当作是需要计算得出的值。

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

还有一种特殊的常量枚举成员的子集：字面量枚举成员。字面量枚举成员是值没有初始值的常量枚举成员或者初始值被初始化为:

* 任何字符串字面量（例如："foo","bar","baz"） 
* 任何数字字面量（例如：1，100）
* 或者任何加了一元操作符```-```号的数字字面量（比如：-1，-100）

当枚举中的所有成员都有字面量枚举值时，就会产生一些特殊的语义。


**第一，**就是枚举成员本身也会成为类型。比如我们可以定义对象的某些成员只能具有枚举成员的值。

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

**第二，** 枚举类型本身实际上变成了每个枚举成员的联合。使用联合枚举，类型系统就能够知道存在于枚举中的确切的值，利用这一点```Typescript```可以捕获到错误比较的```bug```，例如：

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

在这个例子中，我们首先比较了 ```x``` 是否不等于 ```E.Foo```。 如果这个条件成立，判断就结束了。但是如果不成立那```x```就是```E.Foo```。所以后面再去比较```E.bar```就没有意义了。

### 运行时的枚举

在运行时枚举就是真实的对象，例如：

```ts
enum E {
  X,
  Y,
  Z,
}

function f(obj: { X: number }) {
  return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
f(E);
```

这里可以直接将枚举当对象使用。

### 编译时的枚举 

使用```keyof typeof```关键字可以获取一个类型，该类型将枚举所有的键表示为字符串。

```ts
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}
printImportant("ERROR", "This is a message");
```


### 反向映射 （Reverse mappings）

数字枚举类型成员会有一个从值到名字的反向映射，在前面也已经提到过。

```ts
enum Enum {
  A,
}

let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

```Typescript```会将这段代码编译成下面的```js```代码：

```js
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

最后的结果是将枚举编译成为一个对象，这个对象既存储了```name->value```的映射，又存储了```value->name```的映射。

需要特别注意的一点，字符串枚举不具备这种反向映射能力。

#### const 枚举 （const enums）

常量枚举使用```const```修饰符定义，并且只能使用常量枚举表达式。不同于一般的枚举类型，如何不存在反向映射的访问，常量枚举在编译阶段会被完全移除掉，只会在使用枚举成员的地方保留枚举成员的值，正是因为没有计算成员，所以能够在编译阶段做到这一点。看个例子就明白了：

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];
```
这个例子只存在对枚举成员的访问没有反向访问的情况（比如 ```Direction[0]```，如果没有使用常量枚举编译后的```js```代码为：
```js
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
var directions = [
    Direction.Up,
    Direction.Down,
    Direction.Left,
    Direction.Right,
];
```

使用```const``` 定义常量枚举类型：

```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}
...
```
编译后的```js```代码：

```js
var directions = [
    0 /* Up */,
    1 /* Down */,
    2 /* Left */,
    3 /* Right */,
];
```

这样的好处是显而易见的，没有了反向映射的额外代码，最终的代码变少了。


### 外部枚举 （Ambient enums）


外部枚举被用来描述已经存在的枚举类型的，也就说：

```ts
// Note: Assume no other file has actually created a Foo var at runtime
declare enum Foo { Bar } 
var s = 'Bar';
var b = Foo[s]; // Fails
```

假定没有在其他地方定义过```Foo```枚举类型，这段代码不会在编译时报错，但是会在运行时报错，因为没有定义```Foo```枚举类型。

外部枚举和非外部枚举的一个重要区别是，在非外部枚举中，如果前一个枚举成员是常量，那么没有初始化式的成员将被认为是常量。相反，没有初始化式的外部(并且非```const```)枚举成员总是被当作计计算枚举成员。

## Unknown

当定义不知道的变量类型的时候可以将变量的类型定义为```unknown```。```unknown```就是告诉编译器当前变量可能是任何类型的值，我们现在不知道变量的类型所以给它一个```unknow```的类型。

```ts
let notSure: unknown = 4;
notSure = "maybe a string instead";

// OK, definitely a boolean
notSure = false;
```

一个unknown类型的变量，可以通过```typeof```、比较检查或更高级的类型保护将其缩小到更具体的范围：

```ts
declare const maybe: unknown;
// 'maybe' could be a string, object, boolean, undefined, or other types
const aNumber: number = maybe;
// Type 'unknown' is not assignable to type 'number'.

if (maybe === true) {
  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  const aString: string = maybe;
// Type 'boolean' is not assignable to type 'string'.
}

if (typeof maybe === "string") {
  // TypeScript knows that maybe is a string
  const aString: string = maybe;
  // So, it cannot be a boolean
  const aBoolean: boolean = maybe;
// Type 'string' is not assignable to type 'boolean'.
}
```

## Any 

当你想绕过类型检查的时候可以使用```any```类型

```ts
declare function getValue(key: string): any;
// OK, return value of 'getValue' is not checked
const str: string = getValue("myString");
```

与```unknown```的区别是，当定一个变量为```any```类型的时候，可以访问这个变量的任意属性，```ts```不会检查属性是否存在和属性的类型。

```ts
let looselyTyped: any = 4;
// OK, ifItExists might exist at runtime
looselyTyped.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
looselyTyped.toFixed();

let strictlyTyped: unknown = 4;
strictlyTyped.toFixed();
// Object is of type 'unknown'.

let looselyTyped: any = {};
let d = looselyTyped.a.b.c.d;
// let d: any
```

虽然使用```any```有这些便利，但是是以牺牲类型安全为代价的，这样就违背了使用```Typescript```的初衷了，总之能避免使用```any```就尽量避免。



## Void 
void类型有点像是any的反面，表示没有任何类型。通常在定义一个没有返回值的函数时使用到：
```ts
function warnUser(): void {
  console.log("This is my warning message");
}
```
将一个变量声明为void用处不大，因为只能赋值为null（没有指定--strictNullChecks）或者undefined：

```ts
let unusable: void = undefined;
// OK if `--strictNullChecks` is not given
unusable = null;
```

## Null 和 Undefined
在Typescript中，值null和undefined都有自己的类型，分别为null 和 undefined。当前变量声明为null或者undefined时，也只能分别赋值为null和undefined：

```ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```


类型null和undefined可以用作其他类型的子类型，比如可以将null 或者 undefined赋值给number类型的变量。

但是如果使用```--strictNullChecks```，null和undefined就只能赋值给unknown、any 还有他们各自的类型null和undefined的变量（undefined还可以赋值给void类型的变量）。

## Never

never表示变量值不存在的类型。 比如一个函数永远不会返回或者总是抛出错误那么就可以将这个函数的返回值定义为never类型。当变量被永不为真的类型守卫所约束时也会获得never类型。

never类型是任何类型的子类型，可以赋值给任何类型。只有never可以赋值给never，any类型也不能赋值给never。

```ts
// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must not have a reachable end point
function infiniteLoop(): never {
  while (true) {}
}
```

never 的使用场景：

```ts
interface Foo {
  type: 'foo'
}

interface Bar {
  type: 'bar'
}

type All = Foo | Bar

// 在 switch 当中判断 type，TS 是可以收窄类型的 (discriminated union)：
function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
```

如果增加一个新的类型，但是没有在switch中处理：

```ts
type All = Foo | Bar | Baz
```

最终default 里面的val就被收窄为Baz， 因为没有任何类型可以复制给never（除了never自己），导致这里无法通过编译，通过这个办法，可以确保 handleValue 总是穷尽 (exhaust) 了所有 All 的可能类型。

## Object

object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

使用object类型，就可以更好的表示像Object.create这样的API。例如：


```ts
declare function create(o: object | null): void;

// OK
create({ prop: 0 });
create(null);
create(undefined); // with `--strictNullChecks` flag enabled, undefined is not a subtype of null
// Argument of type 'undefined' is not assignable to parameter of type 'object | null'.

create(42);
// Argument of type '42' is not assignable to parameter of type 'object | null'.
create("string");
// Argument of type '"string"' is not assignable to parameter of type 'object | null'.
create(false);
// Argument of type 'false' is not assignable to parameter of type 'object | null'.
```

## Type assertions （类型断言）

有时候当我们明确的知道某个值的类型，然后想告诉编译器将这个值按照某种类型处理时就可以使用类型断言，类型断言只用于编译阶段的类型检查，不会对值做任何运行时的转换。

有两种方式可以做类型断言：

**使用as语法**

```ts
let someValue: unknown = "this is a string";

let strLength: number = (someValue as string).length;
```


**使用尖括号语法**

```ts
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```

两种方式是等效的，喜欢那种方式看个人喜好，需要注意的是在JSX中只能使用as语法


## 关于 Number,String,Boolean,Symbol, Object

需要区分Number,String,Boolean,Symbol, Object和小写的number,string,boolean,symbol, object，只有小写形式可以作为类型。



## 参考资料

1. [Enums](https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums)
2. [Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
3. [TypeScript中的never类型具体有什么用？](https://www.zhihu.com/question/354601204)
4. [How do the different enum variants work in TypeScript?](https://stackoverflow.com/questions/28818849/how-do-the-different-enum-variants-work-in-typescript)