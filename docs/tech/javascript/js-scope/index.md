# Javascript 作用域

如何给作用域下一个概念，作用域是什么?

代码在执行的过程中需要用到一些变量，这些变量存储在什么地方？怎样在用到这些变量的时候方便查找？对此我们把存储变量和查找变量的这套规则叫做作用域。

## 词法作用域

简单地说，词法作用域就是定义在词法阶段的作用域。换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域 不变（大部分情况下是这样的）。

词法作用域意味着作用域是由书写代码时函数声明的位置来决定的。编译的词法分析阶段 基本能够知道全部标识符在哪里以及是如何声明的，从而能够预测在执行过程中如何对它 们进行查找。 JavaScript 中有两个机制可以“欺骗”词法作用域：eval(..) 和 with。前者可以对一段包 含一个或多个声明的“代码”字符串进行演算，并借此来修改已经存在的词法作用域（在 运行时）。后者本质上是通过将一个对象的引用当作作用域来处理，将对象的属性当作作 用域中的标识符来处理，从而创建了一个新的词法作用域（同样是在运行时）。 这两个机制的副作用是引擎无法在编译时对作用域查找进行优化，因为引擎只能谨慎地认 为这样的优化是无效的。使用这其中任何一个机制都将导致代码运行变慢。不要使用它们。

## 动态作用域

## 资料收集

* [Execution Context, Lexical Environment, and Closures in JavaScript](https://betterprogramming.pub/execution-context-lexical-environment-and-closures-in-javascript-b57c979341a5)
* [Lexical environment and function scope](https://stackoverflow.com/questions/12599965/lexical-environment-and-function-scope)
* [Lexical Environment — The hidden part to understand Closures](https://amnsingh.medium.com/lexical-environment-the-hidden-part-to-understand-closures-71d60efac0e0)
* [Variable scope, closure](https://javascript.info/closure)
