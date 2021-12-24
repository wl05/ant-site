/**
 * 一：
 * 当前存在的问题：我们每处理一个fiber就要往DOM添加一个新的节点。
 * 但是浏览器有可能会暂停整个渲染过程。这就会导致看到不完整的UI。
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

function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  const isProperty = (key) => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });
  return dom;
}

function commitRoot() {
  commitWork(wipRoot, child);
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  nextUnitOfWork = wipRoot;
}

let nextUnitWork = null;
/**
 * 二：
 * 为了解决这个问题我们引入一个新的变量 wipRoot (work in progress root)，用来保存正在处理中的 fiber tree
 *
 */
let wipRoot = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitWork && !shouldYield) {
    nextUnitWork = performUnitOfWork(nextUnitWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  /**
   * 三：
   * 当所有的 fiber 都被处理完成后，通过 nextUnitWork 是否为 null 判断,
   * 调用 commitRoot 函数一次性处理 dom 的插入
   */
  if (!nextUnitWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const elements = fiber.props.children;
  let index = 0;
  let preSibling = null;
  while (index < elements.length) {
    const element = element[index];
    const newFiber = {
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
  // 最后没有找到说明到达根 fiber
  return null;
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
