# 浏览器篇（三）- 渲染进程的内部工作过程

在上一篇中我们遗留了一个问题，渲染进程是如何加载文档的？HTML，CSS，JS是如何被解析的? 本篇我们就来一探究竟。

## 前言

渲染进程涉及到网页性能的很多方面，可想而知这里面一定有不少的东西，本篇只是一个总体上的概述，如果你非常感兴趣想研究一下，可以参考[the Performance section of Web Fundamentals](https://developers.google.com/web/fundamentals/performance/why-performance-matters)

## 渲染进程处理网页内容

在前面的篇章中我们也提到过，tab里面的所有内容都是由渲染进程来控制的。在渲染进程中主线程会处理你的大部分代码。如果你使用web worker 或者service worker，wokrder线程会处理你的部分代码。合成器（Compositor）和光栅 （raster）线程也在渲染器进程内运行，以高效流畅地渲染页面。


渲染进程的核心任务是将HTML、CSS、JS转换为用户可交互的网页。

![renderer.png](./renderer.png)

<image-description text="渲染进程里面有一个主线程，多个worker线程，一个合成器（Compositor）线程和一个光栅 （raster）线程"/>


## 网页解析过程

### DOM的构建

当渲染进程收到来自浏览器进程的导航提交信息并且开始接收HTML数据，主线程就开始将HTML 文本字符串解析为DOM（Document Object Model (DOM)。

DOM是网页在浏览器中的内部表示，同时也是我们通过js与网页交互的数据结构和API。

[HTML Standard](https://html.spec.whatwg.org/)定义了如何将HTML 文档解析为DOM。你可能也注意到了浏览器解析HTML从来不会报错。比如我们忘了给<span>标签加上闭合标签</span>这里也不会报错。再比如这一串 ```Hi! <b>I'm <i>Chrome</b>!</i>```也可以被正常解析，貌似跟正常的写法```Hi! <b>I'm <i>Chrome</i></b><i>!</i>```没有什么区别。要问为什么的话，那就是设计如此，HTML就是这样设计的，它可以帮我们处理这些错误。如果想了解更多可以参考["An introduction to error handling and strange cases in the parser"](https://html.spec.whatwg.org/multipage/parsing.html#an-introduction-to-error-handling-and-strange-cases-in-the-parser)

### 外部资源加载

在HTML文档中通常会用到外部资源，比如images,CSS,JS。这些资源要么从网络中获取要么从缓存中获取。主线程可以在解析DOM的过程中找到这些标签并且请求这些资源，但是为了提升效率，浏览器会同时启动一个预加载扫描器（preload scanner），预加载扫描器会查看有HTML解析器生成的tokens，看看里面有没有<img>，<link>之类的标签，有的话就把请求发送给浏览器进程的网络线程。

![dom.png](./dom.png)

<image-description text="主线程解析HTML并构建DOM树"/>

### JavaScript会阻塞解析过程

在解析HTML的过程中遇到```<script>```标签，HTML的解析会被阻塞，然后加载、解析并执行js代码。为什么？ 因为js的执行可能会改变文档的结构(HTML的解析过程[overview of the parsing model](https://html.spec.whatwg.org/multipage/parsing.html#overview-of-the-parsing-model))。这就是为什么HTML解析器必须要等到js执行完了才能重新开始解析文档的原因。如果你对js的执行过程发生了什么感兴趣可以参考[JavaScript engine fundamentals: Shapes and Inline Caches](https://mathiasbynens.be/notes/shapes-ics)


### 告诉浏览器你想如何加载资源

有很多方法告诉浏览器如何加载资源。比如，你可以通过给```<script>```标签加上```async```或者```defer```属性，这样浏览器会异步的加载js代码，不会阻塞HTML的解析。如果合适你也可以使用[JavaScript module](https://developers.google.com/web/fundamentals/primers/modules)。另外通过```<link rel="preload">``` 标签可以告诉浏览器当前资源是必须的并且希望尽快下载。想了解更多可以参考[ Resource Prioritization – Getting the Browser to Help You.](https://developers.google.com/web/fundamentals/performance/resource-prioritization)


### 样式计算
光有DOM还不够，我们还需要样式才能更好的展示我们的页面。主线程会解析CSS并且决定每个DOM 节点的计算样式（computed style）。计算样式是基于Css选择器的信息，这个信息表示什么样式会应用到Dom元素上。

![computedstyle.png](./computedstyle.png)

<image-description text="主线程解析Css，并给Dom节点加上计算样式"/>

就算我们不写任何CSS代码，每个的DOM节点也会有一个计算样式。比如```<h1>```标签比```h2```标签大、不同标签之间的margin也不一样。Chrome的默认样式表可以参考[you can see the source code here](https://cs.chromium.org/chromium/src/third_party/blink/renderer/core/html/resources/html.css)


### 布局 (Layout)

现在渲染进程知道了文档的结构和Dom节点的样式，但是要渲染页面这些还不够。打个比方，我们玩一个猜图游戏，你通过手机向你的朋有描绘一幅图，你说这儿有个大的红圈圈，这有一个小的正方形。你朋友肯定懵一脸。因为你的朋友不知道大圈圈和正方形在画面中的位置。

![tellgame.png](./tellgame.png)
<image-description text="向你的朋友描绘一副画面"/>


布局是计算元素几何形状的过程。主线程遍历DOM和计算样式创建布局树，其中包含 x y 坐标和边界框大小（bounding box sizes）等信息，布局树一般来说比Dom 树要小，它只包含跟页面可见内容相关的信息。比如设置元素```display: none```这个元素就不会包含在布局树中（注意:```visibility: hidden```是会包含在布局树中，只是对我们肉眼不可见）。还有就是伪元素，比如```p::before{content:"Hi!"}```，虽然伪元素没有包含在DOM中但是会包含在布局树中。

![layout.png](./layout.png)
<image-description text="主线程遍历带有计算样式的DOM树然后产出布局树"/>

布局过程不是那么简单和容易的。即使是最简单的页面布局，比如从上到下的排列段落，这个过程就必须要考虑到字体的大小以及到哪里换行，因为这些会影响到段落的大小和形状，更进一步会影响到下一个段落的位置。

![layout.gif](./layout.gif)

我们可以通过CSS干很多事情，比如使元素浮动，隐藏溢出的部分或者改变输入框的输入方向。以此可以想象布局阶段是多么的复杂，在Chrome团队中有一个专门的团队来负责布局过程。如果你对他们的工作感兴趣可以看下这个视频[few talks from BlinkOn Conference](https://www.youtube.com/watch?v=Y5Xa4H2wtVA)


## 绘制过程（Paint）

[drawgame.png](./drawgame.png)
<image-description text="一个人站在画布面前思考是应该先画圆还是应该画正方形"/>


现在我们已经有了DOM，样式和布局，但是要渲染页面这些还是不够。就跟画画一样，知道了画中元素的大小，形状和位置，你还要考虑从哪个元素开始画起。

举个例子，给某些元素设置了不同的z-index属性，在这种情况还按照元素在HTML中的顺序渲染，渲染出来的页面就会有问题。

![zindex.png](./zindex.png)

<!-- <image-description text="一个人站在画布面前思考是应该先画圆还是应该画正方形"/> -->