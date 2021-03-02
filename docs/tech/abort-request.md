## 终止异步任务
在一些耗时的异步任务中，我们需要提前终止异步任务，使用[AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)构造函数我们可以做到这一点。

需要注意的是AbortController只能在web请求中使用，不支持在nodejs环境中使用。

### 取消fetch请求

目前只Fetch Api官方支持使用AbortController来终止请求，但是并不影响我们使用它来终止其他的异步任务，后面会讲到，
先来看一下AbortController的基本使用方法。

```js
var controller = new AbortController(); // 1. 声明AbortController实例
var signal = controller.signal; // 2. 将signal传入5中的fetch api

var downloadBtn = document.querySelector('.download');
var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo); // 3. 点击按钮开始下载音频

abortBtn.addEventListener('click', function() { // 4. 点击中断按钮终止下载
  controller.abort();// 5. 调用abort方法触发终止
  console.log('Download aborted');
});

function fetchVideo() {
  ...
  fetch(url, {
    signal // 6. 传入signal参数
  
  }).then(function(response) {
    ...
  }).catch(function(e) { 
    // 7. 接收终止异常
    reports.textContent = 'Download error: ' + e.message;
  })
}
```

### 终止异步函数




## 参考资料
1. [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
2. [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)