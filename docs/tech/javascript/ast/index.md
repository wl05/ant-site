# 玩转AST


为什么需要学习```AST```相关的知识呢？因为```AST```实在是太重要了，你可能对它不了解，但是它无处不在。更具体一点：
1. 浏览器```js```引擎拿到```js```的第一件事就是解析```js```生成```AST```，随后才是解释执行，编译优化执行。
2. ```webpack```
3. ```babel```
4. ```eslint```
5. ```prettier```
...

例子太多太多了，就不一一举例说明了，这些工具背后的原理都离不开```AST```。

这些工具都涉及到一个过程：

**拆解代码->生成AST->遍历AST并修改->重新生成代码**。

* 代码只是一串字符串，如果要对代码做修改需要对字符串进行细粒度的拆分，也就是一个字符一个字符地遍历代码，将每个字符拆分成对应的一小块（```token```）；
* 遍历完成后生成```token```列表，根据```token```与```token```之间的关系（也就是语法规则），将其组合起来，就成了一个树形的表示。这颗树就是```AST```。
* 得到```AST```以后就可以遍历这颗树然后对树的节点做一些转换操作（增删改）。
* 操作做完后，再根据修改过后的```AST```将代码输出出来。

所以```AST```其实是一个中间产物。

## 什么是AST

经过上面的介绍其实我们已经对```AST```有了一个大致的了解了。```AST``` 全称 ```abstract syntax tree``` (抽象语法树)。它是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。生成```AST```整体上分为两个步骤：
### 词法分析 （```lexical analyzer```）

词法分析器也叫```scanner```（扫描器），顾名思义就是扫描我们的代码，遍历每个字符，使用预先定义好的规则将每个字符转换成```token```(词法单元)。

```js
var answer = 6 * 7;
```

生成```token```：

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


* 语法分析 （```Syntax analyzer```）

语法分析就是将遍历得到的```token```列表，根据语法规则将```token```关联起来，形成一棵树形结构，这棵树就是```AST```。所以```AST```表示的是源代码的语法结构，树上的每个节点表示的是源代码中的一种结构。

上面例子生成的```AST```：

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

## 实现一个简单的JS编译器

有了上面的基础知识我们来看看如何实现一个简单的```js```编译器，听着是不是高大上？不要怕，我们一步一步来，目标是实现一个**简单的**```js```编译器，**最主要的是理解其中的原理**。这个编译器的主要功能是把```es6```的语法转换成```es5```的语法，听着是不是很耳熟？没错就是我们常用```babel```干的事情。为了简单起见我们的编译器主要是将：

```js
let name = "张三";
```
转换成
```js
var name = "张三";
```

编译器一般分三步走：

1. ```Parsing```（解析）：负责将代码解析然后生成```AST```
2. ```Transformation```（转换）： 根据AST来对代码做一些增删改的操作。
3. ```Code Generation``` （代码生成）：根据转换后```AST```重新生成新的代码。

所以现在我们的目标就很明确了，就是要来实现这三步。现在

### ```Parsing```（解析）
解析阶段上面我们已经讲到了分为词法解析和语法解析两个阶段，这里先给大家推荐在线解析工具[esprima](https://esprima.org/demo/parse.html#)，可以查看生成的```Token```和```AST```。

#### 词法分析

词法分析阶段我们需要生成```token```列表：

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

这一步的核心思想就是遍历代码字符串，然后将字符串归类（生成```token```）。

首先定义一些类型变量后续会用到：

```js
// constants.js
const TokenTypes = {
  Keyword: "Keyword",
  Identifier: "Identifier",
  Punctuator: "Punctuator",
  String: "String"
}

const AST_Types = {
  Literal: "Literal",
  Identifier: "Identifier",
  AssignmentExpression: "AssignmentExpression",
  VariableDeclarator: "VariableDeclarator",
  VariableDeclaration: "VariableDeclaration",
  Program: "Program"
}

module.exports = {
  TokenTypes,
  AST_Types
}
```

实现思路如下：
```js
// tokenizer.js
const tokens = require("./constants")
const KEYWORD = /let/ // 匹配关键字
const PUNCTUATOR = /[\=;]/ // 匹配"="、";" 
const WHITESPACE = /\s/ // 匹配空格
const LETTERS = /[a-z]/i // 匹配字符
const {TokenTypes } = tokens

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
      
      if(KEYWORD.test(value)) { // 判断当前字符串是否是关键字
        // 记入关键字
        tokens.push({
           type: TokenTypes.Keyword,
           value: value
        })
      } else { // 否则是变量名
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
    // *************** 如果不满足当前的匹配规则抛出错误 ***************
    throw new TypeError('Unknown' + char)
  }
  return tokens
}

module.exports = tokenizer

```

定一个```tokenizer```函数专门用于做词法分析生成```token```，由于是简单实现，这里就特殊情况特殊处理，所以只判断了需要处理的字符，如果你想实现一些更复杂的解析可以丰富上面的匹配解析逻辑。

#### 语法解析

语法解析阶段我们就要使用```tokens```来生成```AST```了，先来看看使用[esprima](https://esprima.org/demo/parse.html#)生成的```AST```。

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

实现思路如下：

```js
const tokens = require("./constants")
const {TokenTypes, AST_Types } = tokens

// 语法解析函数，接收 tokens 作为参数
function parser(tokens) {
  // 记录当前遍历到tokens的哪个位置
  let current = 0

  // 通过遍历来解析token节点，定义 walk 函数
  // 对于不同类型的结点，对应的处理方法也不同
  function walk() {
    // 从当前 token 开始解析
    const token = tokens[current]

    // *************** 检查是不是字符串 ***************
    if (token.type === TokenTypes.String) {
      // 如果是 current 自增。
      current++;
      // 然后返回一个新的 AST 结点
      return {
        type: AST_Types.Literal,
        value: JSON.parse(token.value),
        row: token.value
      }
    }
   
    // *************** 检查是不是变量名 ***************
    if (token.type === TokenTypes.Identifier) {
      // 如果是，current 自增。
      current++;
      // 然后返回一个新的 AST 结点
      return {
        type: AST_Types.Identifier,
        name: token.value,
      };
    }

    // *************** 检查是不是运算符关键字 ***************
    if (token.type === TokenTypes.Punctuator) {
      // 如果是，current 自增。
      current++;
      // 判断是否是=号
      if(/\=/.test(token.value)){
        return {
          type: AST_Types.AssignmentExpression,
          operator: token.value
        }
      }else{ // 忽略掉;号，不算入AST中
        return
      }
    }

    // *************** 检查是不是关键字 ***************
    if ( token.type === TokenTypes.Keyword) {
      var value = token.value
      current++; // 这里current++，因为紧跟声明语句的就是变量名，下一步walk就可以返回变量名
      const variable = walk() // 获取定义的变量
      current++ // 下一个应该是=号，我们这里直接current++略过，不算入AST中
      const rightVar = walk()
      current++ // 下一个应该是;号，我们这里直接current++略过，不算入AST中
      
      // 定义声明
      const declaration = {
        type: AST_Types.VariableDeclarator,
        id: variable, // 定义的变量
        init: rightVar // 赋予的值
      }
      // 定义要返回的节点
      return {
        type: AST_Types.VariableDeclaration,
        declarations: [declaration],
        kind: value,
      };
    }
    // *************** 遇到了一个类型未知的结点，就抛出一个错误。 ***************
    throw new TypeError(token.type);
  }
  // 创建 AST，定义根结点是一个类型为 `Program` 的结点。
  const ast = {
    type: AST_Types.Program,
    body: [],
    sourceType: "script"
  };

  // 开始 walk 函数，把结点放入 ast.body 中。
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}

module.exports = parser
```

核心点就是```walk```函数，在处理赋值语句的时候存在递归调用。同时我们忽略了一些```token```的处理，比如"="、";"。[esprima](https://esprima.org/demo/parse.html#)生成的```AST```中我们也没有看到"="、";"。

至此我们已经实现了一个非常简单的```AST```生成工具。但是要用于实际开发中，还需要做很多判断和特殊的处理，不过大体上思路就是这样。我们注重理解原理和思路就好。

### Transformation（转换）

生成```AST```后我们就可以对```AST```进行增删改查的操作了。

记住我们的目的是将
```js
let name = "张三";
```
转换成
```js
var name = "张三";
```

所以我们需要将```let```替换成```var```，也就是说需要将```AST```转换成如下形式：
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
      "kind": "var"
    }
  ],
  "sourceType": "script"
}
```

#### ```traverser```（遍历器）
首先我们需要一个可以遍历```ast```的```traverser```函数，这个函数有几个要点：

* ```ast```是一颗树形结构，采用深度优先进行遍历
* ```traverser``` 接受两个参数```ast```，```visitor```
* ```traverser```负责遍历```AST```，```visitor```包含接受不同类型的节点和它们父节点的方法，例如：
  ```js
  const visitor = {
     VariableDeclaration(node, parent) {},
  };
  ```
* 这些方法对匹配到的节点做增删改处理


实现如下：
```js
// traverser.js
const constants = require("./constants")
const { AST_Types } = constants
function traverser(ast, visitor) {
  // 遍历树中每个节点，调用 traverseNode
  function traverseArray(array, parent) {
    array.forEach(function(child) {
      traverseNode(child, parent);
    });
  }

  // 处理 ast 节点的函数, 使用 visitor 定义的转换函数进行转换
  function traverseNode(node, parent) {
    // 首先看看 visitor 中有没有对应 type 的处理函数。
    const method = visitor[node.type]
    // 如果有，调用处理方法
    if (method) {
      method(node, parent)
    }

    // 下面对每一个不同类型的结点分开处理。
    switch (node.type) {
      case AST_Types.Program: // 顶层的 Program 开始，body是数组所以调用traverseArray
        traverseArray(node.body, node) 
        break
      // 如果不需要转换，则直接退出
      case AST_Types.VariableDeclaration:
      case AST_Types.VariableDeclarator:
      case AST_Types.AssignmentExpression:
      case AST_Types.Identifier:
      case AST_Types.Literal:
        break
      // 同样，如果不能识别当前的结点，那么就抛出一个错误。
      default:
        throw new TypeError(node.type)
    }
  }
  // 触发遍历AST，根节点没有父节点所以这里传入null
  traverseNode(ast, null)
}


module.exports = traverser
```


#### 转换器（transformer）

有了遍历```ast```的函数，接下来定义处理```AST```节点的函数```transformer```， ```transformer```的作用是调用```traverser```生成新的```ast```，同时我们需要定义```traverser``` ```visitor```参数的具体实现，以实现对```ast```节点的增删改：

```js
// transformer.js
const traverser = require("./traverser")
const constants = require("./constants")
const { AST_Types } = constants

// transformer接收 AST 作为参数
function transformer(ast) {
  // newAst用于存储新的AST
  const newAst = {
    type: AST_Types.Program,
    body: [],
    sourceType: "script"
  };
  // 这里为了简便起见，直接将newAst.body挂载到了ast的_context属性上。
  // 这样处理完一个节点后可以通过当前节点的父节点拿到_context，然后通过push
  // 保存当前修改过的节点
  ast._context = newAst.body 
  // 将 AST 和 visitor 传入traverser中
  traverser(ast, {
    // 将let转换为var
    VariableDeclaration: function(node, parent) {
      const variableDeclaration = {
        type: AST_Types.VariableDeclaration,
        declarations: node.declarations,
        kind: "var"
      };
      // 把新的 VariableDeclaration 放入到 context 中。
      parent._context.push(variableDeclaration)
    }
  });
  // 最后返回新的AST
  return newAst
}


module.exports = transformer
```


### Code Generation （代码生成）

最后就是根据新的```AST```来重新生成代码了。

```js
const constants = require("./constants")
const { AST_Types } = constants

function codeGenerator(node) {
  // 处理不同类型的结点
  switch (node.type) {
    // 如果是 Program 结点，遍历它的 body 属性中的每一个结点并加入换行符号
    case AST_Types.Program:
      return node.body.map(codeGenerator)
        .join('\n')
    
    case AST_Types.VariableDeclaration: // 处理变量声明
      return (
        node.kind + ' ' + node.declarations.map(codeGenerator)
      )
    case AST_Types.VariableDeclarator: // 处理声明的变量和值
      return (
        codeGenerator(node.id) + ' = ' + 
        codeGenerator(node.init)
      )
    case AST_Types.Identifier: // 变量名直接返回
      return node.name
    
    case AST_Types.Literal: // 字符串加上""、;返回
      return '"'+node.value+'"'+";"

    // 如果我们不能识别这个结点，那么抛出一个错误。
    default:
      throw new TypeError(node.type)
  }
}

module.exports = codeGenerator
```

这一步比较简单了，就是通过递归遍历生成新的```ast```，然后把相应的部分拼接起来。


最后来看看我们写的编译器的运行效果：

```js
const transformer = require("./transformer")
const tokenizer = require("./tokenizer")
const parser = require("./parser")
const codeGenerator = require("./codeGenerator")

const tokens = tokenizer('let name = "张三";')
const ast = parser(tokens)
const newAst = transformer(ast)
const newCode = codeGenerator(newAst)


console.log(newCode) // var name = "张三";
```

完整的代码放在[这里](https://github.com/wl05/code-demo/tree/master/js-compiler)了，有兴趣的话可以参考一下。




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
* [AST抽象语法树——最基础的javascript重点知识，99%的人根本不了解](https://segmentfault.com/a/1190000016231512)


