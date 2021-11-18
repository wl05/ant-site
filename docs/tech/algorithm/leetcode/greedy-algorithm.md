# 贪心算法

[[toc]]

贪心解题思路：

## 455、[分发饼干](https://leetcode-cn.com/problems/assign-cookies/description/) （简单）

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

## 860  [柠檬水找零](https://leetcode-cn.com/problems/lemonade-change/description/) （简单）

```js
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    // 思路： 如果收到的是5元不用找；如果收到的是10元找5元；如果收到的是20元，优先找出10 + 5元，如果没有10元则找出 5 + 5 +5 元
    // 这里需要记录手上一共有几张 5元，几张10元，几张20元。
    if(bills[0] !== 5) return false // 如果首次收到的不是5元，没法找出，直接返回false。
    var map = {
        '5' : 1,
        '10': 0,
    } // 利用对象存储对应面值金额的数量。
    for(var i =1;i<bills.length;i++){
        var cur = bills[i]
        if( cur === 20) {
            if(map['10'] > 0 && map['5'] > 0) { // 优先找出10 + 5元
                map['10'] -= 1
                map['5'] -= 1
            }else if(map['5'] >= 3) { // 如果没有10元则找出 5 + 5 +5 元
                map['5'] -= 3
            }else {
                return false // 否则直接返回false，没法找零
            }
            
        } else if(cur === 10) {
            map['10'] += 1 // 收入一张10元
            if(map['5'] > 0) { // 收到10元找5元
                map['5'] -= 1
            }else{
                return false // 否则直接返回false，没法找零
            }
        } else {
             map['5'] += 1 // 收入一张5元
        }
    }
    return true
};
```

| 874  | 简单 | [模拟行走机器人](https://leetcode-cn.com/problems/walking-robot-simulation/description/) |          |    ❎     |
