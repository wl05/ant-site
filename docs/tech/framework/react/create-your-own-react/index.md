* Step I: The createElement Function
* Step II: The render Function   
* Step III: Concurrent Mode
* Step IV: Fibers      
* Step V: Render and Commit Phases
* Step VI: Reconciliationa
* Step VII: Function Components
* Step VIII: Hooks

## Step I: The createElement Function

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  const element  = {
    type: "h1",
    props: {
      title: "foo",
      children: "Hello"
    }
  }
  const container = document.getElementById("root")
  const node = document.createElement(element.type)
  node["title"] = element.props.title
  const text = document.createTextNode("")
  text["nodeValue"] = element.props.children
  node.appendChild(text)
  container.appendChild(node)
</script>
</html>
```


## Step I: The createElement Function

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  const element  = {
    type: "h1",
    props: {
      title: "foo",
      children: "Hello"
    }
  }

  function createElement(type,props,...children){
    return {
      type,
      props: {
        ...props,
        children: children.map((child)=>{
          return typeof child === "object" ? child : createTextElement(child)
        })
      }
    }
  }

  function createTextElement(text){
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      }
    }
  }

  const Didact = {
    createElement
  }
  
  /** @jsx Didact.createElement */
  const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  )
  
  const container = document.getElementById("root")
  ReactDom.render(element,container)  
  
</script>
</html>
```


* Step II: The render Function

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  function createElement(type,props,...children){
    return {
      type,
      props: {
        ...props,
        children: children.map((child)=>{
          return typeof child === "object" ? child : createTextElement(child)
        })
      }
    }
  }
  function createTextElement(text){
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      }
    }
  }
  function render(element,container){
      const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type)
      const  isProperty = key => key !== "children" // 注意这里是判断props里面不是children属性的其他属性
      Object.keys(element.props).filter(isProperty).forEach((name)=>{
        dom[name] = element.props[name]
      })
      element.props.children.forEach(child => {
        render(child,dom)
      });
      container.appendChild(dom)
  }
  const Didact = {
    createElement,
    render
  }
  /** @jsx Didact.createElement */
  const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  )
  const container = document.getElementById("root")
  Didact.render(element,container)  
</script>
</html>
````
可在 [codesandbox](https://codesandbox.io/s/didact-2-k6rbj?file=/src/index.js) 执行

## Step III: Concurrent Mode

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  function createElement(type,props,...children){
    return {
      type,
      props: {
        ...props,
        children: children.map((child)=>{
          return typeof child === "object" ? child : createTextElement(child)
        })
      }
    }
  }
  function createTextElement(text){
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      }
    }
  }
  /** 一：
   * 通过递归调用render函数完成渲染存在一个问题。
   * 再整个 element tree 被完全渲染出来之前我们没法停止这个过程。
   * 如果 element tree 很大，那么就会阻塞住线程。
   * 如果这个时候浏览器需要处理高优先级的任务，例如响应用户输入或者渲染流畅的动画等等，这个时候就不得不等待整个渲染完成。
   * 显然这是不能接受的。
   */ 
  function render(element,container){
      const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type)
      const  isProperty = key => key !== "children" // 注意这里是判断props里面不是children属性的其他属性
      Object.keys(element.props).filter(isProperty).forEach((name)=>{
        dom[name] = element.props[name]
      })
      element.props.children.forEach(child => {
        render(child,dom)
      });
      container.appendChild(dom)
  }

  /** 
   * 既然不能一次性完成，那就想办法把整个过程拆分成小的执行单元，
   * 如果有高优先级的任务需要处理，那么每完成一个执行单元就让浏览器暂停执行渲染，转而去执行高优先级的任务。
   */
  let nextUnitWork = null
  function workLoop(deadline){
    let shouldYield = false
    while(nextUnitWork && !shouldYield) {
      nextUnitWork = performUnitOfWork(nextUnitWork)
      shouldYield = deadline.timeRemaining() < 1
    }
    requestIdleCallback(workLoop)
  }
  requestIdleCallback(workLoop) // 在主线程空闲的时候执行回调函数，这里知识为了演示方便，react不用requestIdleCallback而是自己实现了 scheduler package https://github.com/facebook/react/tree/master/packages/scheduler

  function performUnitOfWork(nextUnitWork){
      // TODO
  }
  
  const Didact = {
    createElement,
    render
  }
  /** @jsx Didact.createElement */
  const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  )
  const container = document.getElementById("root")
  Didact.render(element,container)  
</script>
</html>
```

## Step IV: Fibers      

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  /** 
   * 一：
   * 为了将这些执行单元组织起来，我们需要一个数据结构就是我们常说的 fiber tree，每一个 element 都对应一个fiber，每一个fiber都是一个执行单元
   * 具体什么是fiber tree，fiber tree 是一个数据结构，由单个fiber之间的关系连接而成。
   * 这样做的目的是为了方便找到下一个需要处理的执行单元，
   * 基于这样的目的，每个 fiber 都会保存对它第一个 child、下一个兄弟、parent 的引用。
   * 
   * 
   * 执行规则：当处理完一个fiber
   * 1. 如果它有child则，child会成为下一个被处理的fiber
   * 2. 如果没有child，则下一个兄弟成为下一个被处理的fiber
   * 3. 如果既没有child又没有下一个兄弟则处理parent的下一个兄弟。
   * 4. 如果parent也没有下一个兄弟，则继续往上找，直到找到或者到达根 fiber。如果达到根 fiber 说明我们完成了本次渲染的所有任务。
   */
  function createElement(type,props,...children){
    return {
      type,
      props: {
        ...props,
        children: children.map((child)=>{
          return typeof child === "object" ? child : createTextElement(child)
        })
      }
    }
  }
  function createTextElement(text){
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      }
    }
  }

  // 创建dom节点添加属性
  function createDom(fiber){
    const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)
    const isProperty = key => key !== "children" // 注意这里是判断props里面不是children属性的其他属性
    Object.keys(fiber.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = fiber.props[name]
      })
    return dom
  }

  /**
   * render 创建 root Fiber
   */
  function render(element,container){
      nextUnitWork = {
        dom: container,
        props: {
          children: [element]
        }
      }
  }
  
  let nextUnitWork = null
  function workLoop(deadline){
    let shouldYield = false
    while(nextUnitWork && !shouldYield) {
      nextUnitWork = performUnitOfWork(nextUnitWork)
      shouldYield = deadline.timeRemaining() < 1
    }
    requestIdleCallback(workLoop)
  }
  requestIdleCallback(workLoop)
  /**
   * performUnitOfWork 做三件事
   * 1. add the element to the DOM 
   * 2. create the fibers for the element’s children
   * 3. select the next unit of work
   */
  function performUnitOfWork(fiber){
      // 创建dom
      if(!fiber.dom){
        fiber.dom = createDom(fiber)
      }
      if(fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom)
      }
      // 创建新的 fibers
      const elements = fiber.props.children
      let index = 0
      let preSibling = null
      while(index < elements.length){
        const element = element[index]
        const newFiber = { // fiber 的结构
          type: element.type,
          props: elements.props,
          parent:fiber,
          dom: null
        }
        if(index === 0){
          fiber.child = newFiber
        }else{
          preSibling.sibling = newFiber
        }
        preSibling = newFiber
        index++
      }
      // 返回下一个要被处理的fiber
      if(fiber.child) {
        return fiber.child
      }
      let nexFiber = fiber
      while(nextFiber){
        if(nexFiber.sibling) {
          return nexFiber.sibling
        }
        nexFiber = nexFiber.parent
      }
  }
  
  const Didact = {
    createElement,
    render
  }
  /** @jsx Didact.createElement */
  const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  )
  const container = document.getElementById("root")
  Didact.render(element,container)  
</script>
</html>
```

## Step V: Render and Commit Phases

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  /**
   * 一：
   * 当前存在的问题：我们每处理一个fiber就要往DOM添加一个新的节点。
   * 但是浏览器有可能会暂停整个渲染过程。这就会导致看到不完整的UI。
   */
  function createElement(type,props,...children){
    return {
      type,
      props: {
        ...props,
        children: children.map((child)=>{
          return typeof child === "object" ? child : createTextElement(child)
        })
      }
    }
  }
  function createTextElement(text){
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      }
    }
  }

  function createDom(fiber){
    const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)
    const isProperty = key => key !== "children"
    Object.keys(fiber.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = fiber.props[name]
      })
    return dom
  }

  function commitRoot(){
    commitWork(wipRoot,child)
    wipRoot = null
  }

  function commitWork(fiber){
    if(!fiber) {
      return
    }
    const domParent = fiber.parent.dom
    document.appendChild(fiber.dom)
    commitWork(fiber.child)
    commitWork(fiber.sibling)
  }
  function render(element,container){
      wipRoot = {
        dom: container,
        props: {
          children: [element]
        }
      }
  }
  
  let nextUnitWork = null
  /**
   * 二：
   * 为了解决这个问题我们引入一个新的变量 wipRoot (work in progress root) ，用来保存正在处理中的 fiber tree
   * 
  */
  let wipRoot = null
  
  function workLoop(deadline){
    let shouldYield = false
    while(nextUnitWork && !shouldYield) {
      nextUnitWork = performUnitOfWork(nextUnitWork)
      shouldYield = deadline.timeRemaining() < 1
    }
    /**
     * 三：
     * 当所有的fiber都被处理完成后，通过 nextUnitWork 是否为 null 判断,
     * 调用 commitRoot 函数一次性处理 dom 的插入
    */
    if(!nextUnitWork && wipRoot) {
      commitRoot()
    }
    requestIdleCallback(workLoop)
  }
  requestIdleCallback(workLoop)
  function performUnitOfWork(fiber){
      if(!fiber.dom){
        fiber.dom = createDom(fiber)
      }
      // if(fiber.parent) {
      //   fiber.parent.dom.appendChild(fiber.dom)
      // }
      const elements = fiber.props.children
      let index = 0
      let preSibling = null
      while(index < elements.length){
        const element = element[index]
        const newFiber = { 
          type: element.type,
          props: elements.props,
          parent:fiber,
          dom: null
        }
        if(index === 0){
          fiber.child = newFiber
        }else{
          preSibling.sibling = newFiber
        }
        preSibling = newFiber
        index++
      }
      if(fiber.child) {
        return fiber.child
      }
      let nexFiber = fiber
      while(nextFiber){
        if(nexFiber.sibling) {
          return nexFiber.sibling
        }
        nexFiber = nexFiber.parent
      }
  }
  
  const Didact = {
    createElement,
    render
  }
  /** @jsx Didact.createElement */
  const element = (
    <div id="foo">
      <a>bar</a>
      <b />
    </div>
  )
  const container = document.getElementById("root")
  Didact.render(element,container)  
</script>
</html>
```

## Step VI: Reconciliationa

```html

```
## 参考
* [build your own react](https://pomb.us/build-your-own-react/)
