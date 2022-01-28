
## 什么是svg

## svg 的优势有哪些




## SVG 中能直接使用的一些几何形状

### 矩形 （Rectangle）

```html
<svg width="400" height="180">
  <rect x="50" y="20" width="150" height="150" rx="20" ry="20"
  style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9;opacity:0.5" />
</svg>
```

<svg width="400" height="180">
  <rect x="50" y="20" width="150" height="150" rx="20" ry="20"
  style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9;opacity:0.5" />
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
<svg height="140" width="500">
  <ellipse cx="200" cy="80" rx="100" ry="50"
  style="fill:yellow;stroke:purple;stroke-width:2" />
</svg>
```

解释：

* 椭圆跟圆不同的点在于可以通过 rx、ry 分别定义水平半径、垂直半径；如果 rx、ry 相等，画出来就是圆。


## 资料收集
1. [svg 教程](https://www.w3schools.com/graphics/svg_intro.asp)