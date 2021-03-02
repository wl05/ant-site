## 终止异步任务
想象这样一种场景，在一个批量上传图片的操作里面，上传的图片很多，这个操作是一个异步任务比较耗时用户可能要等几分钟才能完成这个操作。
同时我们提供一个取消按钮，用户可以选择取消本次操作，然后我们需要终止异步任务。那么对于这样的场景我们怎样来终止异步任务呢。
答案是可以使用AbortController




## 参考资料
1. [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
2. [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)