# 贪心算法

[[toc]]

贪心解题思路：

## 455、[分发饼干](https://leetcode-cn.com/problems/assign-cookies/description/) (简单)

```js
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    // 审题： 目标是尽可能满足越多数量的孩子。怎么达到目的呢，当然是充分利用不同尺寸的饼干了，我们每次都用尺寸最小的饼干去匹配胃口尽量小的孩子。
    // 所以首先我们需要对孩子的胃口和饼干的尺寸进行排序。
    // 排序完毕后就可以进行比较了。
    g = g.sort((a,b)=> a-b) 
    s = s.sort((a,b)=> a-b)
    var gIndex=0
    for(var sIndex = 0;sIndex<s.length;sIndex++) {
        if(s[sIndex] >= g[gIndex]) { // 如果饼干的尺寸大于等于孩子的胃口，则满足一个孩子 gIndex 加 1，这里结合 g和s都已经排序过了来理解。
            gIndex ++
        }
        if(gIndex >= g.length) { // 如果已经满足了所有的孩子，后面的饼干就不用管了，提前推出循环。
            break
        }
    }
    return gIndex // 最后返回满足的孩子的个数。
};
```

| 860  | 简单 | [柠檬水找零](https://leetcode-cn.com/problems/lemonade-change/description/) |          |    ❎     |
| 874  | 简单 | [模拟行走机器人](https://leetcode-cn.com/problems/walking-robot-simulation/description/) |          |    ❎     |
