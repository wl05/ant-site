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

## 简单实现一个JS编译器

有了上面的基础知识我们来看看如何实现一个简单的js编译器，听着是不是高大上？不要怕，我们一步一步来，主要实现一个**简单的**js编译器，最主要的是理解其中的原理。这个编译器的主要功能是把es6的语法转换成es5的语法，听着是不是很耳熟？没错就是babel干的事情。为了简单起见我们的编译器主要是为了将：

```js
let name = "张三";
```
转换成
```js
var name = "张三";
```
编译器一般分三步走：

1. Parsing（解析）：负责将代码解析生成AST
2. Transformation（转换）： 根据AST来对代码做一些增删改的操作。
3. Code Generation （代码生成）：根据转换后AST重新生成新的代码。

所以现在我们的目标就很明确了，就是要来实现这三步。现在

### Parsing（解析）
解析阶段上面我们已经讲到了分为词法解析和语法解析两个阶段，这里先给大家推荐在线解析工具[esprima](https://esprima.org/demo/parse.html#)，可以查看生成的Token和AST。

### 词法分析

词法分析阶段我们需要生成token列表：

```json
[
    {
        "type": "Keyword",
        "value": "let"
    },
    {
        "type": "Identifier",
        "value": "name"
    },
    {
        "type": "Punctuator",
        "value": "="
    },
    {
        "type": "String",
        "value": "\"张三\""
    },
    {
        "type": "Punctuator",
        "value": ";"
    }
]
```

这一步的核心思想就是遍历代码字符串，然后将字符串归类（生成token）。

实现思路如下：
```js
// tokenizer.js
const KEYWORD = /let/ // 匹配关键字
const PUNCTUATOR = /[\=;]/ // 匹配"="、";" 
const WHITESPACE = /\s/ // 匹配空格
const LETTERS = /[a-z]/i // 匹配字符
const TokenTypes = {
  Keyword: "Keyword",
  Identifier: "Identifier",
  Punctuator: "Punctuator",
  String: "String"
}
function tokenizer(input) {
  const tokens = [] // token列表存储token，并最终返回
  let current = 0 // 标记遍历到字符串的什么位置

  // 用while循环遍历代码字符串，直到遍历完整个字符串
  while (current < input.length) {
    let char = input[current] // 暂存一下当前遍历到的字符

    // *************** 处理关键字和变量名 ***************
    if (LETTERS.test(char)) {
      let value = ''
      // 用一个循环遍历所有的字母，把它们存入 value 中。
      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }
      // 判断当前字符串是否是关键字
      if(KEYWORD.test(value)) {
        // 记入关键字
        tokens.push({
           type: TokenTypes.Keyword,
           value: value
        })
      } else {
         // 记入变量名
         tokens.push({
           type: TokenTypes.Identifier,
           value: value
         })
       }
       // 进入下一次循环
       continue
    }

    // *************** 检查是否是符号，"="、";" ***************
    if (PUNCTUATOR.test(char)) {
      const punctuators = char // 创建变量用于保存匹配的符号
      current++
      // 记入符号
      tokens.push({
        type: TokenTypes.Punctuator,
        value: punctuators
      })
      // 进入下一次循环
      continue
    }

    // *************** 处理空格，遇到空格直接跳过 ***************
    if (WHITESPACE.test(char)) {
      current++
      continue
    }
    
    // *************** 处理字符串 ***************
    if (char === '"') {
      let value = ''
      char = input[++current] // 忽略掉开头的引号
      // 直到遇到下一个引号结束遍历
      while (char !== '"') {
        value += char
        char = input[++current]
      }
      char = input[++current] // 忽略掉结尾的引号
      tokens.push({ type: TokenTypes.String, value: '"'+value+'"' })
      continue
    }
    // 如果不满足当前的匹配规则抛出错误
    throw new TypeError('Unknown' + char)
  }
  return tokens
}

module.exports = tokenizer

console.log(JSON.stringify(tokenizer('let name = "张三";')))
```
定一个tokenizer函数专门用于做词法分析生成token，由于是简单实现，这里就特殊情况特殊处理，所以只判断了需要处理的字符，如果你想实现一些更复杂的解析可以丰富上面的匹配解析逻辑。

### 语法解析

语法解析阶段我们就要使用tokens来生成AST了，先来看看使用[esprima](https://esprima.org/demo/parse.html#)生成的AST。

```JSON
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
            "name": "name"
          },
          "init": {
            "type": "Literal",
            "value": "张三",
            "raw": "\"张三\""
          }
        }
      ],
      "kind": "let"
    }
  ],
  "sourceType": "script"
}
```

### Transformation（转换）
### Code Generation （代码生成）




## 搞一个自己的babel插件
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
* [实现一个简单的 JavaScript 编译器](https://juejin.cn/post/6844903781365186567)


