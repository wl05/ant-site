# RN Webview 内嵌h5方案调研

[[toc]]

## 背景

1. driver rn 新增骑手注册功能，涉及到复杂表单的填写。这部分表单在之前的 foms 项目（运营人员使用的招募骑手的H5，协助骑手注册）中基本已经实现过一遍，表单字段和校验基本一致。
2. 后续会将注册流程迁移到 pc 端和 mobile h5 上，让骑手不下载app也可以实现注册。

为了节省人力和时间以及为了后续的迁移，决定采用内嵌 h5 的方式来实现这部分表单的功能。

## 技术需求

* 所有的 H5 资源都打包进最后的 rn bundle 中，最后 app 本地加载 H5 资源
* RN 页面和 H5 页面可以相互通信。

## 方案

1. 将打包好的静态资源放置在 main/assets 目录下
2. 使用 webview 加载本地的静态资源，[加载机制](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#basic-inline-html) 
3. RN H5 [通信机制](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#communicating-between-js-and-native) 

## 详细设计

### webview 依赖

Driver App 目前使用的 RN 版本是 0.63.3，RN原有的 [Webview](https://reactnative.dev/docs/0.61/webview#injectedjavascript) 版本已经被废弃掉了，不再支持Webview组件，官方推荐使用社区提供的 [react-native-webview](https://github.com/react-native-webview/react-native-webview)，该组件安装需要 link，基于目前我们项目采用的 Native 壳子 + RN 的架构方式，需要客户端协助添加[相关依赖](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md)

### Webview 文件权限设置

Webview 表单中涉及到多处需要上传照片的字段，Webview 中上传文件需要Native端设置相应的权限，基于目前已经有上传图片功能的情况，**也许已经都加过权限了？// TODO: 待后续验证**
### 加载本地资源

#### 开发环境

开发环境为了方便调试，在 webview 中加载 h5 时直接使用本地开发服务例如：

```tsx
import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

export default () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{
          uri: 'http://localhost:8000', // H5本地开发服务
        }}
      />
    </View>
  );
};
```

#### 生产环境

为了发布生产环境，需要提前将 H5 打包好，将最终打包好的文件拷贝到 main/assets (**这一步还没想到比较便捷的方案，目前只能手动拷贝**) 

官方提供了三种[加载 html的方式](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#basic-inline-html)：

1. html 字符串
2. url 链接
3. 加载本地 html 文件，这正是我们需要的，但是有[坑](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#loading-local-html-files)🤮。

第三种方式，官方自己都已经弃坑明确说了这种方式不行，可以看下 issue [#428](https://github.com/react-native-webview/react-native-webview/issues/428) 和 [#518](https://github.com/react-native-webview/react-native-webview/issues/518)中的讨论，官方建议将所有的资源打包进一个html文件里面，实践发现这个坑确实有，下面是加载方式的实践。

```js
// demo/demo.js
exports.template = () => `<!DOCTYPE html>
<html>
  <body>
    <div style="display: flex;align-items: center;justify-content: center;height: 800px">
      hello world
    </div>
  </body>
  <script src="./index.js"></script>
</html>`;
```

```html
// demo/html
<!DOCTYPE html>
<html>
  <body>
    <div style="display: flex;align-items: center;justify-content: center;height: 800px">
      hello world
    </div>
  </body>
  <script src="./index.js"></script>
</html>
```

```js
// demo/index.js
alert('1');
```
然后将demo文件拷贝一份到 `android/app/src/main/assets/` 目录下，方便下面尝试不同的加载方式

```tsx
import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
const html = require('./demo/demo.js').template();
export default () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{html}} // 方式一：这种方式ios、android都能正常渲染，但是html必须以字符串的形式导出，html的里面的外部链接无法加载，所以官方建议将所有资源打包在一起。
        // source={require('./demo/index.html')} // 方式二 这种方式ios正常渲染，但是也不能加载外部链接，android 渲染出来是html字符串
        // source={
        //   Platform.OS === 'ios'
        //     ? require('./demo/index.html')
        //     : {uri: 'file:///android_asset/demo/demo.html'}
        // } // 方式三: 官方提供的方式，换一种方式加载 android 资源，实践发现android加载直接报错。
        onMessage={event => {
          console.log(event.nativeEvent.data);
        }}
        originWhiteList={['*']}
      />
    </View>
  );
};
```

经过实践发现方式一勉强能达到我们的需求，**需要研究一下如何将所有资源打进一个包里，打进一个包里有没有其他坑？**
### RN 和 H5 之间通信

RN 中提供了四种通信方式：

1. injectedJavaScript(RN->web)

injectedJavaScript 是js脚本的字符串，在页面第一次加载完成后立即执行且只执行一次

```tsx
import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

export default () => {
  const script = `
  setTimeout(function() { window.alert('hello world') }, 1000);
  true; // 注意这个 true 是必须的，否则可能会报错
`;

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{
          uri: 'http://localhost:8000', // H5本地开发服务
        }}
        injectedJavaScript={script}
      />
    </View>
  );
};
```

加载完网页后，1秒钟后弹出 "hello world"


2. injectedJavaScriptBeforeContentLoaded (RN->web)

`injectedJavaScriptBeforeContentLoaded` 注入的代码在页面首次加载之前执行且只执行一次。用法同 injectedJavaScript

3. injectJavaScript(RN->web)

injectedJavaScript 的缺点是只在页面加载完后执行一次，如果后续想继续往 webview里面注入代码可以使用 webview ref 的 injectJavaScript 方法

```tsx
import React, {useRef} from 'react';
import {Button, View} from 'react-native';
import {WebView} from 'react-native-webview';

export default () => {
  const script = `
  setTimeout(function() { window.alert('hello world') }, 1000);
  true; 
`;
  const ref = useRef<WebView>(null);
  const handleClick = () => {
    ref.current?.injectJavaScript(`window.alert('click');true;`);
  };
  return (
    <View style={{flex: 1}}>
      <Button onPress={handleClick} title="Button" />
      <WebView
        source={{
          uri: 'http://localhost:8000',
        }}
        ref={ref}
        injectedJavaScript={script}
      />
    </View>
  );
};
```

4. postMessage 和 onMessage(web->RN)

web 页面往 RN 发送消息，需要组合使用 `window.ReactNativeWebView.postMessage`方法和`onMessage`回调

```tsx
import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

export default () => {
  const script = `
setTimeout(function () {
  window.ReactNativeWebView.postMessage("Hello!")
}, 2000)
true; 
`;
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{
          uri: 'http://localhost:8000',
        }}
        onMessage={event => {
          console.log(event.nativeEvent.data);
        }}
        injectedJavaScript={script}
      />
    </View>
  );
};
```

在这个例子中我们通过在页面加载完后往网页中注入js代码执行 `window.ReactNativeWebView.postMessage("Hello!")`, 在RN侧通过 `onMessage` 回调接收到发送过来的数据。

**注意：**
1. 必须要指定onMessage回调`window.ReactNativeWebView.postMessage`才会被注入到网页中
2. `window.ReactNativeWebView.postMessage` 只接收一个参数切必须是字符串。

### H5 中发起的请求鉴权问题

是否需要手动设置 header 等信息

// TODO: 待验证
### H5 中的多语言方案

目前想到两种方案：
 
1. RN和H5单独拉多语言配置，这种方式有两个弊端：一、翻译更新可能需要同时在 web和rn中重新拉最新的翻译，二、冗余，两边持有同样一份配置但是只用到了一部分。但是好处是后续迁移比较方便。
2. 暴力一点的方法，直接根据当前的语言环境，获取对应的配置全部塞到webview里面，缺点也是冗余。
3. 专门维护一份H5多语言对应的key的list，在使用方式2的时候把这些key过滤出来后再塞到 webview 里面。

// TODO: 待讨论

