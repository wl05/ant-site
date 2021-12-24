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

// 创建dom节点添加属性
function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  const isProperty = (key) => key !== "children"; // 注意这里是判断props里面不是children属性的其他属性
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });
  return dom;
}

/**
 * render 创建 root Fiber
 */
function render(element, container) {
  nextUnitWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

let nextUnitWork = null;
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitWork && !shouldYield) {
    nextUnitWork = performUnitOfWork(nextUnitWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
/**
 * performUnitOfWork 做三件事
 * 1. add the element to the DOM
 * 2. create the fibers for the element’s children
 * 3. select the next unit of work
 */
function performUnitOfWork(fiber) {
  // 创建dom
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  // 创建新的 fibers
  const elements = fiber.props.children;
  let index = 0;
  let preSibling = null;
  while (index < elements.length) {
    const element = element[index];
    const newFiber = {
      // fiber 的结构
      type: element.type,
      props: elements.props,
      parent: fiber,
      dom: null,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      preSibling.sibling = newFiber;
    }
    preSibling = newFiber;
    index++;
  }
  // 返回下一个要被处理的fiber
  if (fiber.child) {
    return fiber.child;
  }
  let nexFiber = fiber;
  while (nextFiber) {
    if (nexFiber.sibling) {
      return nexFiber.sibling;
    }
    nexFiber = nexFiber.parent;
  }
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
