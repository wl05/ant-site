# Javascript AST 详解

AST全称（Abstract syntax tree）翻译过来就是抽象语法树，

那些抽象语法树长什么样子呢，大家可以去[AST Explorer](https://astexplorer.net/)进行体验。
## 什么是AST


## 为什么不预备编译

Precompiling JavaScript?
Every few years, it’s proposed engines offer a way to precompile scripts so we don’t waste time parsing or compiling code pops up. The idea is if instead, a build-time or server-side tool can just generate bytecode, we’d see a large win on start-up time. My opinion is shipping bytecode can increase your load-time (it’s larger) and you would likely need to sign the code and process it for security. V8’s position is for now we think exploring avoiding reparsing internally will help see a decent enough boost that precompilation may not offer too much more, but are always open to discussing ideas that can lead to faster startup times. That said, V8 are exploring being more aggressive at compiling and code-caching scripts when you update a site in a Service Worker and we hope to see some wins with this work.


## ast 实践
https://segmentfault.com/a/1190000016231512


## AST 的简单实现

https://github.com/jamiebuilds/the-super-tiny-compiler
## 资料收集

1. [AST抽象语法树——最基础的javascript重点知识，99%的人根本不了解](https://segmentfault.com/a/1190000016231512)
2. [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
3. [How JavaScript works: Parsing, Abstract Syntax Trees (ASTs) + 5 tips on how to minimize parse time](https://blog.sessionstack.com/how-javascript-works-parsing-abstract-syntax-trees-asts-5-tips-on-how-to-minimize-parse-time-abfcf7e8a0c8)
4. [Abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
5. [AST Explorer](https://astexplorer.net/)
6. [How to implement a programming language in JavaScript](http://lisperator.net/pltut/)
7. [JavaScript Engines: An Overview](https://blog.bitsrc.io/javascript-engines-an-overview-2162bffa1187)