# 玩转AST

为什么需要学习AST相关的知识呢？因为AST实在是太重要了，你可能对它不了解，但是它无处不在。更具体一点：
1. 浏览器引擎拿到js的第一件事就是解析js生成AST，随后才是解释执行，编译优化执行。
2. babel插件
3. eslint代码检查
4. prettier代码格式化
...


例子太多太多了，就不一一举例说明，这些工具背后的原理都离不开AST。因为这里面涉及到到一个**拆解->生成AST->遍历AST并修改->重新生成**的过程。

* 代码只是一串字符串，如果要对代码做修改需要对字符串进行细粒度的拆分，也就是一个字符一个字符地遍历代码，将每个字符拆分成对应的一小块（token）；
* 遍历完成后生成token列表，根据token与token之间的关系，将其组合起来，就成了一个树形的表示。这颗树就是AST。
* 得到AST以后就可以遍历这颗树然后对树的节点做一些转换操作（增删改）。
* 操作做完后，再根据修改过后的AST将代码输出出来。

所以AST其实是一个中间产物。生成AST的过程就是一个拆解的过程。

## 什么是AST

经过上面的介绍其实我们已经对AST有了一个大致的了解了。AST 全称 ```abstract syntax tree``` (抽象语法树)。它是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。生成AST整体上分为两个步骤：
### 词法分析 （lexical analyzer ）

词法分析器也叫scanner（扫描器），顾名思义就是扫描我们的代码，遍历每个字符，使用预先定义好的规则将每个字符转换成token(词法单元)。

```js
var answer = 6 * 7;
```

=>

```json
[
    {
        "type": "Keyword",
        "value": "var"
    },
    {
        "type": "Identifier",
        "value": "answer"
    },
    {
        "type": "Punctuator",
        "value": "="
    },
    {
        "type": "Numeric",
        "value": "6"
    },
    {
        "type": "Punctuator",
        "value": "*"
    },
    {
        "type": "Numeric",
        "value": "7"
    },
    {
        "type": "Punctuator",
        "value": ";"
    }
]
```


* 语法分析 （Syntax analyzer）

语法分析就是将遍历得到的token列表，根据语法规则将token关联起来，形成一棵树形结构，这棵树就是AST。所以AST表示的是源代码的语法结构，树上的每个节点表示的是源代码中的一种结构。

上面的例子生成AST：

```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "answer"
          },
          "init": {
            "type": "BinaryExpression",
            "operator": "*",
            "left": {
              "type": "Literal",
              "value": 6,
              "raw": "6"
            },
            "right": {
              "type": "Literal",
              "value": 7,
              "raw": "7"
            }
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
}
```

## AST的简单实现

有了上面的基础知识我们来看看如何实现一个简单的js解析器，



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
* [esprima](https://github.com/jquery/esprima)
* [手把手带你入门 AST 抽象语法树](https://juejin.cn/post/6844904035271573511)
* [编译原理：从0写一个js解释器](https://zhuanlan.zhihu.com/p/137509746)


