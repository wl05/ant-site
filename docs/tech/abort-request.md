## 终止异步任务
在一些耗时的异步任务中，我们需要提前终止异步任务，使用[AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)构造函数我们可以做到这一点。

需要注意的是AbortController只能在web请求中使用，不支持在nodejs环境中使用。

### 取消fetch请求

目前只有Fetch Api官方支持使用AbortController来终止请求，但是并不影响我们使用它来终止其他的异步任务，后面会讲到，
先来看一下AbortController的基本使用方法。

```js
var controller = new AbortController(); // 1. 声明AbortController实例
var signal = controller.signal; // 2. 将signal传入5中的fetch api，

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
这里需要解释一下controller.signal属性，这里的signal属性是[AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)构造函数的实例，
它具有以下特性：
- aborted属性：aborted是一个布尔值，用来标记是否调用controller.abort()方法终止请求，是为true，否为false
- 使用addEventListener()方法监听abort事件，调用controller.abort()后会触发此事件。

### 终止异步函数

有了上面的基础，我们完全可以实现终止异步函数的功能，这里我们实现一个下载按钮，点击下载按钮开始下载，
这里使用setTimeout来模拟下载需要10s，在这10s内用户可以再次点击按钮取消下载，下面是简单的实现代码。

```html
<html>
  <body>
    <button id="download">Download</button>
  </body>
<script>
  {
    let controller = null
    let isDownloading = false
    document.querySelector( '#download' ).addEventListener( 'click',async ({target})=>{
      if(isDownloading){ // 如果正在下载中再次点击按钮则取消下载并重置变量
        controller.abort(); 
        controller = null;
        target.innerText = 'Download';
        isDownloading = false
        return;
      }else {
        controller = new AbortController()
        isDownloading = true
        const signal = controller.signal
        target.innerText = 'Downloading';
        try {
          const result = await download(signal) 
          console.log("===下载成功===",)
        } catch(error) { // 下载取消后会触发AbortError这里可以catch到
          console.log("===下载已取消===",error)
        } finally { // 最后无论下载成功还是下载取消都需要对变量进行重置
          controller = null;
          isDownloading  = false
          target.innerText = 'Download';
        }
      }
      
    })

    function download(signal) {
      const error = new DOMException( 'Download aborted', 'AbortError' );
      if(signal.aborted){ // 如果有提前终止的情况直接退出
        return reject( error );
      }
      return new Promise((resolve,reject)=>{
        const timeout = setTimeout( ()=> {
          resolve();
          clearTimeout(timeout)
        }, 10000 );
        signal.addEventListener( 'abort', () => { // 接收到abort事件提前结束
          clearTimeout( timeout );
          reject( error );
        } );
      })
    }
  }
</script>
</html>
```

###  

## 参考资料
1. [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
2. [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
3. [Aborting a signal: How to cancel an asynchronous task in JavaScript](https://dev.to/ckeditor/aborting-a-signal-how-to-cancel-an-asynchronous-task-in-javascript-2g5e)