# 浏览器篇（二）- 输入URL回车发生了什么

老生常谈的问题导航栏输入URL回车到页面展示出来这个过程中发生了什么？结合上一篇浏览器架构的知识，我们来一探究竟。


## 页面控制

上一篇我们知道了Chrome 浏览器是多进程架构，进程之间分工协作。打开浏览器，除了Tab里面的内容，我们眼睛能看到的部分都是由浏览器进程来控制的。浏览器进程里面又有分工协作的线程，比如负责操作界面的UI线程（绘制操作按钮，地址导航栏），负责网络请求的网络线程，负责文件访问控制的存储线程。

![](./browserprocesses.png)

当我们在地址栏输入URL，浏览器进程的UI线程会负责处理。

## 过程分析

### 步骤1. 处理输入

因为Chrome的地址栏既可以输入查询字符串又可以输入网址，所以UI线程需要判断输入的字符串到底是查询字符串还是网站URL。
![input](./input.png)

### 步骤2. 开始导航

输入网址，敲下回车，此时UI线程告诉网络线程获取网站内容，此时标签的左上角开始转圈圈，网络线程此时会进行DNS查找、建立TLS连接。

![browserprocesses](./browserprocesses.png)

### 步骤3. 读取响应

网络线程会根据response Header里面的Content-Type 来判断响应数据的类型，但是因为Content-Type有可能会缺失或者跟数据的实际类型不一致，所以这里会进行 MIME Type sniffing 。

如果返回的是HTML文档，则会交给渲染进程来处理；如果是文件比如PDF则会交给下载管理器进行下载。

这里会同时进行SafeBrowsing检测，如果站点的域名和响应数据匹配到已有的恶意站点，网络线程就抛出一个警告页面。此外还会进行 (CORB) 检查，保证敏感的跨站点数据不会进入到渲染器进程。

![sniff](./sniff.png)

### 步骤4. 找到渲染进程

当上面的检查都做完后，网络线程就通知UI线程一切准备就绪，然后UI线程找到一个渲染进程进行页面的渲染。

![findrenderer](./findrenderer.png)

由于网络请求获取响应会花一些时间，所以在这个过程中会做一些优化。在步骤二中UI线程告诉网络线程发送请求时，UI线程是知道将要渲染一个网站的，所以在网络请求的过程中UI线程会并行的启起一个渲染进程。当请求如期返回时，此时渲染进程已经准备好了，就可以进行后面的渲染任务，以此节省时间。

### 步骤5. 提交导航

现在数据已经返回，渲染进程也准备好了，此时IPC会从浏览器进程发送到渲染进程以此来提交本次导航，同时会将HTML 数据传递给渲染进程。一旦浏览器进程收到来自渲染进程的提交确认回应，此次导航就完成了，后面就进入文档的加载阶段。

到了这个时候，导航栏会被更新，安全指示符（security indicator）和站点设置UI（site settings UI）会展示新页面相关的站点信息。当前tab的会话历史（session history）也会被更新，这样当你点击浏览器的前进和后退按钮也可以导航到刚刚导航完的页面。为了方便你在关闭了tab或窗口（window）的时候还可以恢复当前tab和会话（session）内容，当前的会话历史会被保存在磁盘上面。

![commit](./commit.png)

### 额外步骤： 初始加载完成

一旦导航提交了，渲染进程就开始加载资源渲染页面。后续的篇章我们详细的介绍这个过程，一旦渲染进程完成渲染他会发送IPC给浏览器进程（注意这发生在页面上所有帧（frames）的onload事件都已经被触发了而且对应的处理函数已经执行完成了的时候），此时UI线程停止转圈。

![loaded](./loaded.png)


## 导航到不同的站点

现在一次简单的导航完成了。但是如果现在再次在地址栏输入一个新的网址会发生什么呢？其实整体的过程和上面的步骤差不多，但是还是会有一些区别，在导航到其他页面的时候需要检查当前页面是否有监听**beforeunload**事件。


**beforeunload**事件就是在你要离开或者关闭页面的时候弹出一个警告框，询问你是否确定离开当前页面。在tab里面的内容都是由渲染进程控制的，所以导航到新站点之前浏览器进程必须要检查渲染进程。


> 注意：不要随意添加 beforeunload 事件监听。它会产生延迟，因为需要在导航开始之前执行beforeunload的事件回调。在真正需要的时候才监听这个事件，比如一些需求，比如用户输入表单还没有提交准备离开页面时提醒用户输入数据将会丢失。 

![beforeunload](./beforeunload.png)

如果是在渲染进程中跳转到其他页面，例如点击网站链接或者window.location 到新的网址，渲染进程首先检查是否有监听beforeunload 事件。后续的步骤也跟前面一样。不同的是导航请求是从渲染进程开始然后到浏览器进程。


当导航到新站点，会有单独的渲染进程来处理这次导航，同时会保留当前渲染进程以便处理unload等事件。想了解更多可以参考[ an overview of page lifecycle states](https://developers.google.com/web/updates/2018/07/page-lifecycle-api#overview_of_page_lifecycle_states_and_events)以及如何使用[the Page Lifecycle API.](https://developers.google.com/web/updates/2018/07/page-lifecycle-api#overview_of_page_lifecycle_states_and_events)监听页面状态的变化做一些处理。

![v2](./v2-a4997ca70ed51cbf9f72c61a3c58438f_1440w.jpeg)


## Service Worker存在的场景

Service Worker可以代理我们的网络请求将响应缓存或者请求新的数据。如果Service Worker中有缓存数据就不会发送网络请求获取数据。

需要特别记住的点，service worker也是运行在渲染进程中的。那么问题来了，当有新的导航请求时，浏览器进程如何判断新站点是否注册了service worker。


当我们注册一个service worker后，service worker的scope将作为引用保存下来。想了解更多关于scope的信息可以阅读这篇文章[The Service Worker Lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)。 当导航开始时，网络线程就会参照已经注册了的service worker scopes来检查域名，如果这个网站注册过service worker，UI 线程就会找一个渲染进程来执行service worker代码。
![scope_lookup](./scope_lookup.png)
service worker决定是使用本地缓存数据还是请求最新的数据。

![serviceworker](./serviceworker.png)



## 导航预加载 ( Navigation Preload)

如果 Service Worker 最终决定从网络请求数据，浏览器进程和渲染进程之间的这种往返可能会导致延迟。 Navigation Preload 是一种通过在 Service Worker 启动的同时加载资源来加速此过程的机制。它会在header中标记这些请求，让服务器决定如何为这些请求返回数据；比如只是更新数据而不是整个文档。

![navpreload](./navpreload.png)



## 参考资料

1. [Inside look at modern web browser (part 2)](https://developers.google.com/web/updates/2018/09/inside-browser-part2)