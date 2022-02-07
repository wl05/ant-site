
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

<svg height="400" width="400" style="background-color: red">
  <!-- 使用绝对路径 -->
  <path d="M10 10 H100 V100 H10 L10 10" />
  <- 使用 Z 命令闭合 ->
  <path d="M10 110 H100 V200 H10 Z" fill="orange"/>
  <- 或者 ->
  <path d="m10 210 h90 v90 h-90 z" fill="green"/>
  Sorry, your browser does not support inline SVG.
</svg>

</body>
</html>
```

<svg height="400" width="400" style="background-color: red">
  <path d="M10 10 H100 V100 H10 L10 10" />
  <- 或者 ->
  <path d="M10 110 H100 V200 H10 Z" fill="orange"/>
  <- 或者 ->
  <path d="m10 210 h90 v90 h-90 z" fill="green"/>
  Sorry, your browser does not support inline SVG.
</svg>


## 资料收集
* [svg 教程](https://www.w3schools.com/graphics/svg_intro.asp)
* [svg path](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)