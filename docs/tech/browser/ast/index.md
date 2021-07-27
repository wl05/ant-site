# 玩转AST



## 什么是AST



## Parse （解析）

javascript 被下载到浏览器本地以后，以文本的形式被解析，这个过程分为两个阶段。


### 词法分析
[The scanner](https://github.com/v8/v8/blob/master/src/parsing/scanner.h) 将js文件解析成一系列的tokens

### 语法分析

[The parser](https://github.com/v8/v8/blob/master/src/parsing/parser.h) 将上一步生成的Tokens，
进一步生成Abstract Syntax Tree (AST)，也就是抽象语法树，


## AST的简单实现

https://github.com/jamiebuilds/the-super-tiny-compiler
## AST 的应用
https://segmentfault.com/a/1190000016231512




## 参考资料
* [AST for JavaScript developers](https://itnext.io/ast-for-javascript-developers-3e79aeb08343)
* [AST详解与运用](https://zhuanlan.zhihu.com/p/266697614)
* [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

* [How JavaScript works: Parsing, Abstract Syntax Trees (ASTs) + 5 tips on how to minimize parse time](https://blog.sessionstack.com/how-javascript-works-parsing-abstract-syntax-trees-asts-5-tips-on-how-to-minimize-parse-time-abfcf7e8a0c8)
* [Abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
* [AST Explorer](https://astexplorer.net/)
* [How to implement a programming language in JavaScript](http://lisperator.net/pltut/)

