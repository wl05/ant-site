# svg 不完全入门

[[toc]]
## 什么是svg

## svg 的优势有哪些




## SVG 中能直接使用的一些几何形状

### 矩形 （Rectangle）

```html
<!DOCTYPE html>
<html>
<body>
<svg width="400" height="180">
  <rect x="50" y="20" width="150" height="150" rx="20" ry="20"
  style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9;opacity:0.5" />
   Sorry, your browser does not support inline SVG.
</svg> 
</body>
</html>
```

<svg width="400" height="180">
  <rect x="50" y="20" width="150" height="150" rx="20" ry="20"
  style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9;opacity:0.5" />
   Sorry, your browser does not support inline SVG.
</svg> 


解释：

* svg 通过 `<rect>` 标签来绘制矩形
* rect 的 width、height 属性定义矩形的宽高
* (x,y) 分别定义的是矩形的左边距和上边距
* style 属性用来定义矩形的样式
* fill 定义矩形的颜色
* stroke 定义矩形边框的颜色
* stroke-width 定义矩形边框的宽度
* fill-opacity 定义 fill 颜色的透明度
* stroke-opacity 定义 stroke 颜色的透明度
* opacity  定义整个矩形的透明度
* rx,ry 用来定于矩形的圆角


### 圆（Circle）

```html
<!DOCTYPE html>
<html>
<body>
<svg width="100" height="100" style="background-color: red">
   <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
   Sorry, your browser does not support inline SVG.
</svg> 
</body>
</html>
```

<svg width="100" height="100" style="background-color: red">
   <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
   Sorry, your browser does not support inline SVG.
</svg> 


在这里我们通过SVG画了一个圆，解释如下：

* svg 图像是通过 `<svg>` 标签来绘制的。
* svg 标签的 style 属性可以定义 svg 的样式
* width、height 属性定义 svg 图像的宽高
* `<circle>` 标签用来画一个圆
* cx、cy 属性定义的是圆心的坐标点。如果不设置，默认圆心坐标是(0,0)
* r 属性定义的是圆的半径
* stroke 定义的是圆边的颜色，stroke-width 定义的是圆边的宽度
* fill 属性定义圆里面填充的颜色。

### 椭圆 （Ellipse）

```html
<!DOCTYPE html>
<html>
<body>

<svg height="140" width="500">
  <ellipse cx="200" cy="80" rx="100" ry="50" style="fill:yellow;stroke:purple;stroke-width:2" />
  Sorry, your browser does not support inline SVG.  
</svg>

</body>
</html>
```

<svg height="140" width="500">
  <ellipse cx="200" cy="80" rx="100" ry="50" style="fill:yellow;stroke:purple;stroke-width:2" />
  Sorry, your browser does not support inline SVG.  
</svg>

解释：

* 椭圆跟圆不同的点在于可以通过 rx、ry 分别定义水平半径、垂直半径；如果 rx、ry 相等，画出来就是圆。


### 线段 （Line）

```html
<!DOCTYPE html>
<html>
<body>

<svg height="210" width="500">
  <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />
  Sorry, your browser does not support inline SVG.
</svg>

</body>
</html>
```

<svg height="210" width="500">
  <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />
  Sorry, your browser does not support inline SVG.
</svg>

解释：
* x1 定义线段在 x 轴的起点
* y1 定义线段在 y 轴的起点
* x2 定义线段在 x 轴的终点
* y2 定义线段在 y 轴的终点

### 多边形 （Polygon） // TODO:

```html
<!DOCTYPE html>
<html>
<body>

<svg height="210" width="500">
  <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
  Sorry, your browser does not support inline SVG.
</svg>

</body>
</html>
```


<svg height="210" width="500">
  <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
  Sorry, your browser does not support inline SVG.
</svg>

解释：

points 定义多边形每个角的坐标。


### 多段线 (polyline)

```html
<!DOCTYPE html>
<html>
<body>

<svg height="200" width="500">
  <polyline points="20,20 40,25 60,40 80,120 120,140 200,180" style="fill:none;stroke:black;stroke-width:3" />
  Sorry, your browser does not support inline SVG.
</svg>

</body>
</html>
```

<svg height="200" width="500">
  <polyline points="20,20 40,25 60,40 80,120 120,140 200,180" style="fill:none;stroke:black;stroke-width:3" />
  Sorry, your browser does not support inline SVG.
</svg>

解释：

points 定义多段线各个转折点的坐标。

### 路径 （path）

path 是svg中最强大也是最复杂的元素，利用 path 我们可以完成很多基本和复杂形状的绘制。

path元素的形状是通过属性d定义的，属性d的值是一个“命令+参数”的序列。

每一个命令都用一个关键字母来表示，比如，字母“M”表示的是“Move to”命令，当解析器读到这个命令时，它就知道你是打算移动到某个点。跟在命令字母后面的，是你需要移动到的那个点的x和y轴坐标。比如移动到(10,10)这个点的命令，应该写成“M 10 10”。这一段字符结束后，解析器就会去读下一段命令。每一个命令都有两种表示方式，一种是用大写字母，表示采用绝对定位。另一种是用小写字母，表示采用相对定位（例如：从上一个点开始，向上移动10px，向左移动7px），它们的参数不是指定一个明确的坐标，而是表示相对于它前面的点需要移动多少距离（这一点需要特别注意，可以结合后面的例子进行理解）。

path 的 d 属性提供了以下命令:

* M = moveto
* L = lineto
* H = horizontal lineto
* V = vertical lineto
* C = curveto
* S = smooth curveto
* Q = quadratic Bézier curve
* T = smooth quadratic Bézier curveto
* A = elliptical Arc
* Z = closepath


这里又将其分为直线命令和曲线命令

#### 直线命令

直线命令有 M、L、H、V、Z

* M 表示 move to，它需要两个参数（M x y 或者 m dx dy），分别是需要移动到的点的x轴和y轴的坐标，M 命令只会移动画笔并不实际划线，所以 M 命令通常用在路径的开始处用来指明从何处开始画。
* L 表示 line to，它需要两个参数（L x y 或者 l dx dy），line to需要画线道某个位置的，两个参数分别代表的是这个位置的x轴和y轴的坐标。
* H 表示 horizontal line to（H x 或者 h dx），用来绘制水平线，带一个参数表示在x轴移动到的位置。
* V 表示 vertical line to（V y 或者 v dy），用来绘制垂直线，带一个参数表示在y轴移动到的位置。
* Z 表示 close path （Z 或者 z），这个命令不用区分大小写，用来从当前点画一条直线到路径的起点，通常用来简化需要闭合的图形的命令。

使用这些命令就可以绘制一些简单图形了，例如画一个简单的正方形：

```html
<!DOCTYPE html>
<html>
<body>

<svg height="310" width="110" style="background-color: red">
  <!-- 使用绝对路径 -->
  <path d="M10 10 H100 V100 H10 L10 10" />
   <!-- 或者使用 Z 命令闭合 -->
  <path d="M10 110 H100 V200 H10 Z" fill="orange"/>
  <!-- 或者使用相对定位进行绘制 -->
  <path d="m10 210 h90 v90 h-90 z" fill="green"/>
  Sorry, your browser does not support inline SVG.
</svg>

</body>
</html>
```

<svg height="310" width="110" style="background-color: red">
  <path d="M10 10 H100 V100 H10 L10 10" />
  <- 或者 ->
  <path d="M10 110 H100 V200 H10 Z" fill="orange"/>
  <- 或者 ->
  <path d="m10 210 h90 v90 h-90 z" fill="green"/>
  Sorry, your browser does not support inline SVG.
</svg>

#### 曲线命令

贝塞尔曲线的类型有很多，但是在path元素里，只存在两种贝塞尔曲线：三次贝塞尔曲线C，和二次贝塞尔曲线Q。

命令有：C S Q T A

1. 三次贝塞尔曲线C （命令 C、S）

三次贝塞尔曲线需要定义一个点和两个控制点，所以用C命令创建三次贝塞尔曲线，需要设置三组坐标参数：

```
C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)
```
这里的最后一个坐标(x,y)表示的是曲线的终点，

另外两个坐标是控制点，(x1,y1)是起点的控制点，(x2,y2)是终点的控制点。

控制点描述的是曲线起始点的斜率，曲线上各个点的斜率，是从起点斜率到终点斜率的渐变过程。


结合例子来理解:

```html
<!DOCTYPE html>
<html>
<body>
<svg width="190px" height="160px" style="background-color: green">

  <path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
  <path d="M70 10 C 70 20, 120 20, 120 10" stroke="black" fill="transparent"/>
  <path d="M130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent"/>
  <path d="M10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent"/>
  <path d="M70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent"/>
  <path d="M130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent"/>
  <path d="M10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent"/>
  <path d="M70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent"/>
  <path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/>
	Sorry, your browser does not support inline SVG.
</svg>

</body>
</html>

```

<svg width="190px" height="160px" style="background-color: green">

  <path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
  <path d="M70 10 C 70 20, 120 20, 120 10" stroke="black" fill="transparent"/>
  <path d="M130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent"/>
  <path d="M10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent"/>
  <path d="M70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent"/>
  <path d="M130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent"/>
  <path d="M10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent"/>
  <path d="M70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent"/>
  <path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/>
	Sorry, your browser does not support inline SVG.
</svg>

上例的曲线从左往右看，控制点在水平方向上逐渐分开，例子中的曲线从上往下看，控制点和曲线坐标之间离得越来越远。这里要注意观察，曲线沿着起点到第一控制点的方向伸出，逐渐弯曲，然后沿着第二控制点到终点的方向结束。


这里还可以实现将多个贝塞尔曲线连接起来创建一条长的平滑曲线，通常情况下，两条曲线的交接点某一侧的控制点是它另一侧的控制点的对称（以保持斜率不变）。这样，你可以使用一个简写的贝塞尔曲线命令S:

```
S x2 y2, x y (or s dx2 dy2, dx dy)
```
需要注意的是如果S命令跟在一个C或S命令后面，则它的第一个控制点会被假设成前一个命令曲线的第二个控制点的中心对称点。如果S命令单独使用，前面没有C或S命令，那当前点将作为第一个控制点。


```html
<!DOCTYPE html>
<html>
<body>

<svg width="400px" height="400px" style="background-color: green">
  <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80 S 300 300, 400 80" stroke="black" fill="transparent"/>
  Sorry, your browser does not support inline SVG.
</svg>

</body>
</html>
```

<svg width="450px" height="200px" style="background-color: green">
  <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80 S 300 300, 400 80" stroke="black" fill="transparent"/>
  Sorry, your browser does not support inline SVG.
</svg>

2. 二次贝塞尔曲线Q (命令 Q、T)

与三次贝塞尔曲线不同的是它只需要一个控制点，用来确定起点和终点的曲线斜率，因此它需要两组参数，控制点和终点坐标，使用起来相对简单许多。语法如下：

```
Q x1 y1, x y (or q dx1 dy1, dx dy)
```

```html
<!DOCTYPE html>
<html>
<body>
<svg width="190px" height="160px" style="background-color: green">
  <path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>
  Sorry, your browser does not support inline SVG.
</svg>
</body>
</html>
```
<svg width="190px" height="160px" style="background-color: green">
  <path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>
  Sorry, your browser does not support inline SVG.
</svg>

跟三次贝塞尔曲线一样，二次贝塞尔曲线有一个简化的 T 命令，可以通过更简短的参数，延长二次贝塞尔曲线。

```
 T x y (or t dx dy)
```

T 命令只定义终点。T命令前面必须是一个Q命令，或者是另一个T命令。如果T单独使用，那么控制点就会被认为和终点是同一个点，所以画出来的将是一条直线。


```html
<!DOCTYPE html>
<html>
<body>
<svg width="190px" height="160px" style="background-color: green">
  <path d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
  Sorry, your browser does not support inline SVG.
</svg>
</body>
</html>
```

<svg width="190px" height="160px" style="background-color: green">
  <path d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
  Sorry, your browser does not support inline SVG.
</svg>

3. 弧形 // TODO:

弧形可以看作是圆形或者椭圆形的一部分。创建命令如下：

```
 A rx ry x-axis-rotation large-arc-flag sweep-flag x y
 a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
```

### 文本 （Text）

```html
<!DOCTYPE html>
<html>
<body>

<svg height="160" width="200" style="background-color: green">
  <text x="10" y="20" style="fill:red;">Several lines:
    <tspan x="10" y="45">First line.</tspan>
    <a xlink:href="https://www.w3schools.com/graphics/" target="_blank">
    	<tspan x="10" y="70">Second line.</tspan>
  	</a>
    
  </text>
  <text x="40" y="100" fill="red" transform="rotate(30 20,40)">I love SVG</text>
    Sorry, your browser does not support inline SVG.
</svg>

</body>
</html>

```


<svg height="160" width="200" style="background-color: green">
  <text x="10" y="20" style="fill:red;">Several lines:
    <tspan x="10" y="45">First line.</tspan>
    <a xlink:href="https://www.w3schools.com/graphics/" target="_blank">
    	<tspan x="10" y="70">Second line.</tspan>
  	</a>
    
  </text>
  <text x="40" y="100" fill="red" transform="rotate(30 20,40)">I love SVG</text>
    Sorry, your browser does not support inline SVG.
</svg>

解释：

* 文字使用 `<text>` 标签
* 使用 transform 属性可以旋转文字
* `<text>` 标签中可以嵌套 `<tspan>` 子标签，每一个`<tspan>`可以拥有独立的样式和位置
* 可以使用 `<a>` 标签包含链接。


### Stroke 属性

stroke属性包含下列属性：

* stroke： 绘制对象的线条的颜色
* stroke-width： 定义了描边的宽度
* stroke-linecap： 它控制边框终点的形状
  * butt用直边结束线段，它是常规做法，线段边界90度垂直于描边的方向、贯穿它的终点。
  * square的效果差不多，但是会稍微超出实际路径的范围，超出的大小由stroke-width控制。
  * round表示边框的终点是圆角，圆角的半径也是由stroke-width控制的。
* stroke-dasharray: 定义虚线描边


```html
<!DOCTYPE html>
<html>
<body>

<svg height="200" width="300" style="background-color: green">
  <g fill="none" stroke="black">
    <path stroke="red" d="M5 20 l215 0" />
	<path stroke-width="6" d="M5 40 l215 0" />
	<path stroke-width="6" stroke-linecap="butt" d="M5 60 l215 0" />
    <path stroke-width="6" stroke-linecap="round" d="M5 80 l215 0" />
    <path stroke-width="6" stroke-linecap="square" d="M5 100 l215 0" />
    <path stroke-width="6" stroke-dasharray="20,10,5,5,5,10" d="M5 120 l215 0" />
    </g>
  Sorry, your browser does not support inline SVG.
</svg>
 
</body>
</html>
```

<svg height="200" width="300" style="background-color: green">
  <g fill="none" stroke="black">
    <path stroke="red" d="M5 20 l215 0" />
	<path stroke-width="6" d="M5 40 l215 0" />
	<path stroke-width="6" stroke-linecap="butt" d="M5 60 l215 0" />
    <path stroke-width="6" stroke-linecap="round" d="M5 80 l215 0" />
    <path stroke-width="6" stroke-linecap="square" d="M5 100 l215 0" />
    <path stroke-width="6" stroke-dasharray="20,10,5,5,5,10" d="M5 120 l215 0" />
    </g>
  Sorry, your browser does not support inline SVG.
</svg>

## 资料收集
* [svg 教程](https://www.w3schools.com/graphics/svg_intro.asp)
* [svg 教程](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)