# 虚拟列表 [Doing]

```css
// style.css
.list-container {
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
```

```js
// VirtualList.js
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import "./style.css";
/** 1.
 * list-container 为可视区域的容器
 * list-phantom 为容器内的占位，高度为总列表高度，用于形成滚动条
 * list 为列表项的渲染区域
 */

/** 2.
 * 接着，监听list-container的scroll事件，获取滚动位置scrollTop
 * 假定可视区域高度固定，称之为screenHeight
 * 假定列表每项高度固定，称之为itemSize
 * 假定列表数据称之为listData
 * 假定当前滚动位置称之为scrollTop
 */

/** 3.
 * 则可推算出：
 * 列表总高度listHeight = listData.length * itemSize
 * 可显示的列表项数visibleCount = Math.ceil(screenHeight / itemSize)
 * 数据的起始索引startIndex = Math.floor(scrollTop / itemSize)
 * 数据的结束索引endIndex = startIndex + visibleCount
 * 列表显示数据为visibleData = listData.slice(startIndex,endIndex)
 */

/** 4.
 * 当滚动后，由于渲染区域相对于可视区域已经发生了偏移，此时我需要获取一个偏移量startOffset，通过样式控制将渲染区域偏移至可视区域中。
 * 偏移量startOffset = scrollTop - (scrollTop % itemSize);
 */
const VirtualList = (props) => {
  const { listData = [], itemSize = 200 } = props;
  const listRef = useRef();
  const listDataLength = listData.length;

  // 可视区域高度
  const [screenHeight, setScreenHeight] = useState(0);
  // 偏移量
  const [startOffset, setStartOffset] = useState(0);
  // 起始索引
  const [startIndex, setStartIndex] = useState(0);
  // 结束索引
  const [endIndex, setEndIndex] = useState(0);
  // 列表总高度
  const listHeight = listDataLength * itemSize;
  // 可显示的列表项数
  const visibleCount = Math.ceil(screenHeight / itemSize);
  // 获取真实显示列表数据
  const visibleData = listData.slice(
    startIndex,
    Math.min(endIndex, listDataLength)
  );

  const scrollEvent = useCallback(() => {
    // 当前滚动位置
    const scrollTop = listRef.current.scrollTop;
    // 此时的开始索引
    const startIndex = Math.floor(scrollTop / itemSize);
    setStartIndex(startIndex);
    // 此时的结束索引
    setEndIndex(startIndex + visibleCount);
    // 此时的偏移量
    setStartOffset(scrollTop - (scrollTop % itemSize));
  }, [listRef.current, itemSize, visibleCount]);

  useLayoutEffect(() => {
    setScreenHeight(listRef.current.clientHeight);
    setEndIndex(visibleCount);
  }, [listRef.current, visibleCount]);

  return (
    <div ref={listRef} className="list-container" onScroll={scrollEvent}>
      <div style={{ height: `${listHeight}px` }} />
      <div
        className="list"
        style={{ transform: `translate3d(0,${startOffset}px,0)` }}
      >
        {visibleData.map((item) => {
          return (
            <div
              className="list-item"
              key={item.id}
              style={{
                height: `{${itemSize}px}`,
                lineHeight: `${itemSize}px}`,
              }}
            >
              {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualList;
```
## 参考资料

1. [VirtualList](https://github.com/chenqf/frontEndBlog/issues/16)