# JS 类型判断

说到类型判断首先想到的是type

```js
function type(obj){
    if(obj == null) return obj + ""
    return typeof obj === 'object' ?  Object.prototype.toString.call(obj).slice(8, -1).toLocaleLowerCase() : typeof obj
}
```
