function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      }),
    },
  };
}
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
/** 一：
 * 通过递归调用render函数完成渲染存在一个问题。
 * 再整个 element tree 被完全渲染出来之前我们没法停止这个过程。
 * 如果 element tree 很大，那么就会阻塞住线程。
 * 如果这个时候浏览器需要处理高优先级的任务，例如响应用户输入或者渲染流畅的动画等等，这个时候就不得不等待整个渲染完成。
 * 显然这是不能接受的。
 */

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  const isProperty = (key) => key !== "children"; // 注意这里是判断props里面不是children属性的其他属性
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach((child) => {
    render(child, dom);
  });
  container.appendChild(dom);
}

/**
 * 既然不能一次性完成，那就想办法把整个过程拆分成小的执行单元，
 * 如果有高优先级的任务需要处理，那么每完成一个执行单元就让浏览器暂停执行渲染，转而去执行高优先级的任务。
 */
let nextUnitWork = null;
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitWork && !shouldYield) {
    nextUnitWork = performUnitOfWork(nextUnitWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop); // 在主线程空闲的时候执行回调函数，这里只是为了演示方便，react 不用 requestIdleCallback 而是自己实现了 scheduler package https://github.com/facebook/react/tree/master/packages/scheduler

function performUnitOfWork(nextUnitWork) {
  // TODO
}

const Didact = {
  createElement,
  render,
};
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
const container = document.getElementById("root");
Didact.render(element, container);
