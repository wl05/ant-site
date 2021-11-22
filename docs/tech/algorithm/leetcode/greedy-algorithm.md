# 贪心算法

[[toc]]

求解最优化问题的算法通常需要经过一系列的步骤，在每个步骤都面临多种选择。对于许
多最优化问题，使用动态规划算法来求最优解有些杀鸡用牛刀了，可以使用更简单、更高效的算
法。贪心算法(greedy algorithm)就是这样的算法，它在每一步都做出当时看起来最佳的选择。也
就是说，它总是做出局部最优的选择，寄希望这样的选择能导致全局最优解。本章介绍一些贪心
算法能找到最优解的最优化问题。在学习本章之前，你应该学习第15章动态规划，特别是应认
真学习15.3节。 ---- 摘自《算法导论（第三版）》第 16 章的叙述

贪心解题思路：局部最优达到全局最优。

举一个不恰当的例子：你的面前有一堆面额不等的钱，你每次只能拿一张，一共可以拿五次，求如何拿到最多的钱。

只要不傻每个人都知道每次都拿最大面额的钱最后就能拿到最多的钱。这里“每次拿最大面额的钱”就是局部最优，“最后拿到最多的钱”这就是全局最优。

## 122、 [买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/) （中等）（需复习）

解法一：

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // 思路： 
    // 1. 比较 prices[i] 和 prices[i-1]，如果 prices[i] <  prices[i-1] 说明不应该在 i-1天的时候买入。重新尝试从第i天买入
    // 2. 如果 prices[i] >= prices[i-1] 说明在i-1天买入有利可图，我们为了卖出更好的价钱还需要比较第i天和i+1天的价格，
    //    如果prices[i+1] >= prices[i]，则继续往后比较，否则就应该在第i天的时候卖出获取最大利润。后续以此类推。
    var len = prices.length
    if(len === 1) {
        return 0
    } 
    var profit = 0 // 记录获取的最大利润
    var currentPrice = prices[0] // 记录当前买入价格
    for(var i = 1;i<len;i++){
        if(prices[i] <  prices[i-1]) {
           currentPrice = prices[i] 
        }else{
            while(i + 1 < len  && prices[i + 1] >= prices[i]) {
                i++                
            }
            profit += prices[i] - currentPrice // 计算利润

            // 判断 i 是否是最后一个元素，不是的话需要继续进行交易
            if(i + 1 < len) {
                currentPrice = prices[i+1]
                i++
            }
        }
    }
    return profit
};
```

解法二： 贪心

```js
var maxProfit = function(prices){
    var len = prices.length
    var profit = 0
    if(len === 1){
        return profit
    }
    for(var i = 1;i<len;i++){
        if(prices[i]-prices[i-1] >= 0) {
            profit += prices[i]-prices[i-1]
        }
    }
    return profit
}
```

## 134、[加油站](https://leetcode-cn.com/problems/gas-station/) (中等)

解法一：

```js
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    var len = gas.length
    var initPosition = 0 // 记录是从哪个加油站开始的
    var currentGas =  gas[initPosition] // 记录当前邮箱的油量
    var position = initPosition // 记录当前走到哪个加油站
    var distanceCount = 1 // 记录当前走过的加油展个数记录，用于判断是否走了一圈
    // 过滤出可以作为起始点的加油站，后续这些加油站可以作为起始加油站，其余的直接跳过，节约尝试的次数，相当于是以空间换时间了
    var map = {}
    for(var i =0;i<len;i++){
        if(gas[i] > 0 && gas[i] >= cost[i]) {
            map[i] = true
        }
    }
    while(true){
        if(currentGas < cost[position]) { // 如果当前位置的油量不足以到达下一个加油站则需要判断:1、是从下一个加油站开始？2、还是已经所有的加油站都尝试过了还是没有找到可以走一圈的开始加油站？
            if(initPosition === len - 1) { // 说明尝试的已经是最后一个加油站了，直接返回-1
                return -1
            }else{ // 否则，从当前 initPosition 的下一个位置的加油站重新开始尝试。
                initPosition ++
                while(!map[initPosition]) { // 这里需要判断一下下一个位置是否在map里面，在map里面的才可以作为开始位置
                    if(initPosition === len - 1) { // 如果 initPosition 都等于最后一个位置了还是没有找到可以作为开始位置的加油站，这个时候直接返回 - 1
                        return -1
                    }
                    initPosition ++
                }
                // 重新赋初始值
                currentGas = gas[initPosition]
                position = initPosition
                distanceCount = 1
            }
        } else { // 否则说明可以到达下一个加油站
            if(distanceCount === len){ // 如果可以到达下一个加油站并且 distanceCount 等于 len  说明已经走了一圈了，当前的 initPosition 就是我们要找的起始加油站位置。
                return initPosition
            }else{
                if(position+1 === len) { // 说明此时需要从0位置开始算
                    currentGas = currentGas - cost[position] + gas[0]
                    position = 0
                }else{
                    currentGas = currentGas - cost[position] + gas[position + 1]
                    position ++
                }
                distanceCount ++
            }
        }     
    }
};
```

## 435、[无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/) （中等）

方法一：

```js
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    // 思路：
    // 1、根据题目描述如果区间不相互重叠，那区间之间一定是存在顺序关系的，这里就以升序的方式来看，
    //    假设有 A B C D 区间满足不相互重叠的条件且满足 A[1] <= B[0]，B[1] <= C[0]，C[1] <= D[0]，此时ABCD是按生序排列的互不重叠的区间，因此也应该满足 A[0] < B[0] < C[0] < D[0] 或者。A[1] < B[1] < C[1] < D[1]。
    //    所以首先想到的就是对区间进行排序，这里我们根据终点的大小进行升序排序，根据起点排序也是同样的道理。
    // 2、排序完成后遍历 intervals 比较相邻两个区间是否有交集，如果有交集我们就去掉后面这个区间，为什么？因为后面这个区间和剩余区间存在交集的可能性更大（想想为什么要进行排序）

    if(intervals.length === 1) {
        return 0
    }
    // 首先进行排序
    intervals = intervals.sort(function(pre,cur){
        return pre[1] - cur[1]
    })
    var count = 0 // 记录去掉的区间数量
    for(var i=1;i<intervals.length;i++){
        if(intervals[i][0] < intervals[i-1][1]) { // 判断是否存在交集，如果当前区间的起点比前一个区间的终点小则认为两个区间相交
            count ++ // 计数加1
            var temp = intervals[i] // 这里我们没有真正的删除这个区间，因为直接删除会到改变数组的长度。我们将两个区间的位置进行交换来间接的实现“删除”的目的，方便后面继续进行比较
            intervals[i] = intervals[i-1]
            intervals[i-1] = temp
        }
    }
    return count // 返回最终结果
};
```

方法二：

```js
var eraseOverlapIntervals = function(intervals) {
    if(intervals.length === 1) {
        return 0
    }
    // 根据起点大小进行升序排序
    intervals = intervals.sort(function(pre,cur){
        return pre[0] - cur[0]
    })
    var count = 0 // 记录去掉的区间数量
    for(var i=1;i<intervals.length;i++){
        if(intervals[i][0] < intervals[i-1][1] ) { 
            count ++ // 计数加1
            if(intervals[i-1][1] < intervals[i][1]) { // 这里需要注意一下，如果当前区间的终点大于前一个区间的终点，去掉的是当前这个区间，需要进行位置交换达到“删除”的目的；否则“删除”的应该是前一个区间就不用进行交换了。
                var temp = intervals[i] 
                intervals[i] = intervals[i-1]
                intervals[i-1] = temp
            }
        }
    }
    return count
};
```

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

解法二、

```js
var canCompleteCircuit = function(gas, cost) {
    // 思路：
    // 1. 如果所有的汽油量加起来比所有需要消耗的汽油量加起来还要小，是一定不能走一圈的。
    // 2. 如果从 x 位置开始走到 y 位置，刚好y位置的汽油量小于cost[y]，此时不仅说明 x 位置不能作为起点，
    //    还说明 x 到 y 的所有位置都不能作为起点。为什么？其实也很好理解，当走到 x 到 y 中间的任意位置 x + i，假设此时剩余油量 n, 假设邮箱的汽油储量是tank，那tank = gas[x+i] + n。
    //    其中 n 应该是大于等于 0 的。
    //    在这种情况都走不到一圈，那如果将 x + i 作为起点那 tank = gas[x+i] + 0。就更走不到一圈了。所以这种情况下我们就跳过这些中间位置，直接从 y+1位置开始重新计算
    // 3. 因为在第一步中我们已经排除了一定不能走一圈的情况，那说明一定有可以作为起点的加油站，所以在我们遍历完一遍后找打的那个起点就是我们要的答案
    var sum = gas.reduce(function(pre,cur,currentIndex){
       return pre + cur - cost[currentIndex]
    },0)
    // 如果走完一圈所需要的油耗大于所有汽油的量，则一定不能走完一圈
    if(sum < 0) return -1

    var start = 0 // 记录起点
    var sum = 0 // 记录油箱中的油量
    // 这里需要注意，因为通过上面的的遍历我们已经排除了一定不能走完一圈的情况，说明是一定有加油站可以作为起点走完一圈的，所以一遍遍历结束后，找到的那个起点就是我们要找的起点
    for(var i=0;i<gas.length;i++){
        sum+= gas[i] - cost[i]  // 记录当前邮箱中的量
        if(sum < 0) { // 如果油箱的量小于0说明走不到下一个加油站，同时也说明从起点start开始到当前位置中间的点都不能作为起点，所以以 i + 1 位置作为起点重新开始计算。
            // 无法从 start 走到 i，所以站点 i + 1 应该是起点
            start = i +1
            sum = 0
        }
    }
    return start
}
```

## 605、[种花问题](https://leetcode-cn.com/problems/can-place-flowers/submissions/) (简单)

```js
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {
    // 思路：
    // 能种花的条件：[...0,0,0...]至少三个连续的0才能在中间种一朵。只要达到这个条件就种一朵 （据说这就是贪心的思想？）
    // 边界怎么办？像[0,0,1], [1,0,0]也是可以在边界处种一朵的，很好办将越界的地方都当成0，0[0,0,1], [1,0,0]0。这样方便我们从逻辑上理解。
    var len = flowerbed.length
    for(var i=0;i<len;i++){
        // i-1 === -1 和 i+1===len 都当作0来看待，保证我们逻辑的完整性
       if((i-1 === -1 || flowerbed[i-1] === 0) && flowerbed[i] === 0 && (flowerbed[i+1] === 0 || i+1===len)) {
            n--
            i++ // 这里 i++ 是为了跳过后一个，因为已经在当前位置种了一朵了，后一个位置必不能种
        }
        if(n <= 0){ 
            return true
        }
    }
    return false
}
```

## 860、[柠檬水找零](https://leetcode-cn.com/problems/lemonade-change/description/) （简单）

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

## 874、[模拟行走机器人](https://leetcode-cn.com/problems/walking-robot-simulation/description/) （中等）

解法一：

```js
/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    var direction = "+Y" // 取值 "+Y" , "-Y", "+X", "-X"
    var currentPositionX = 0 // 记录当前到达的x横坐标
    var currentPositionY = 0 // 记录当前到达的y纵坐标
    var maxEuclideanDistance = 0 // 记录走过的最大距离
    
    // 计算转向后的方向
    var changeDirection = function(command,curDirection){
        var newDirection = ''
        if(curDirection === '+Y') {
            newDirection = command === -1 ? "+X" : "-X"
        }else if (curDirection === '-Y') {
            newDirection = command === -2 ? "+X" : "-X"
        }else if(curDirection === '+X') {
            newDirection = command === -1 ? "-Y" : "+Y"
        } else if(curDirection === '-X') {
           newDirection = command === -2 ? "-Y" : "+Y"
        }
        return newDirection
    }
    for(var i = 0;i<commands.length;i++){
        var command = commands[i]
        if(command >= 1) { // 如果 command 大于1，则表示需要移动
            var tempPositionX = currentPositionX // 暂存当前x横坐标位置
            var tempPositionY = currentPositionY // 暂存当前y纵坐标位置
            for(j=0;j<command;j++) {
                if(direction === '+Y') { // 如果当前方向是 "+Y"，则y纵坐标加1
                    tempPositionY += 1
                }else if (direction === '-Y') { // 如果当前方向是 "-Y"，则y纵坐标减1
                    tempPositionY -= 1
                }else if(direction === '+X') { // 如果当前方向是 "+X"，则x横坐标加1
                    tempPositionX += 1
                }else if(direction === '-X') { // 如果当前方向是 "-X"，则x横坐标减1
                    tempPositionX -= 1
                }
                var isThereObstacle = false // 标记是否遇到障碍物
                // 判断是否遇到障碍物
                for(var b=0;b<obstacles.length;b++){
                    if(obstacles[b][0] === tempPositionX && obstacles[b][1] === tempPositionY) {
                        isThereObstacle = true
                        break
                    }
                }
                // 如果遇到障碍物需要将之前加的操作减回来
                if(isThereObstacle) {
                     if(direction === '+Y') {
                        tempPositionY -= 1
                    }else if (direction === '-Y') {
                        tempPositionY += 1
                    }else if(direction === '+X') {
                        tempPositionX -= 1
                    }else if(direction === '-X') {
                        tempPositionX += 1
                    }
                    break
                }
            }
            currentPositionX = tempPositionX 
            currentPositionY = tempPositionY
            // 存下当前的最大距离
            var tempMaxEuclideanDistance = Math.pow(currentPositionX,2) + Math.pow(currentPositionY,2)
            maxEuclideanDistance = maxEuclideanDistance <  tempMaxEuclideanDistance  ? tempMaxEuclideanDistance : maxEuclideanDistance
        }else{ // 否则是做改变方向的动作
            direction = changeDirection(command,direction)
        }
        
    }
    return maxEuclideanDistance // 最后返回最大距离
};
```

解法二：

```js
/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    var direction = "+Y" // 取值 "+Y" , "-Y", "+X", "-X"
    var currentPositionX = 0 // 记录当前到达的x横坐标
    var currentPositionY = 0 // 记录当前到达的y纵坐标
    var maxEuclideanDistance = 0 // 记录走过的最大距离
    
    // 计算转向后的方向
    var changeDirection = function(command,curDirection){
        switch(curDirection) {
            case "+Y":
                return command === -1 ? "+X" : "-X"
            case "-Y":
                return command === -2 ? "+X" : "-X"
            case "+X":
                return command === -1 ? "-Y" : "+Y"
            case "-X":
                return command === -2 ? "-Y" : "+Y"
        }
    }

    // 这里使用一个对象来存储字符串化的障碍物坐标，方便后续判断障碍物的时候使用，可以降低复杂度，以空间换时间
    var obstaclesMap = {}
    for(var val of obstacles) {
        obstaclesMap[`${val[0]}-${val[1]}`] =  `${val[0]}-${val[1]}`
    }
    for(var i = 0;i<commands.length;i++){
        var command = commands[i]
        if(command >= 1) { // 如果 command 大于1，则表示需要移动
            var tempPositionX = currentPositionX // 暂存当前x横坐标位置
            var tempPositionY = currentPositionY // 暂存当前y纵坐标位置
            for(j=0;j<command;j++) {
                var isObstacle = false
                switch(direction) {
                    case "+Y": // 如果当前方向是 "+Y"，则y纵坐标加1
                        isObstacle = obstaclesMap[`${tempPositionX}-${tempPositionY+1}`]
                        tempPositionY = isObstacle ? tempPositionY : tempPositionY + 1
                        break
                    case "-Y": // 如果当前方向是 "-Y"，则y纵坐标减1
                        isObstacle =  obstaclesMap[`${tempPositionX}-${tempPositionY-1}`]
                        tempPositionY = isObstacle ? tempPositionY : tempPositionY - 1
                        break
                    case "+X": // 如果当前方向是 "+X"，则x横坐标加
                        isObstacle = obstaclesMap[`${tempPositionX+1}-${tempPositionY}`]
                        tempPositionX = isObstacle ? tempPositionX : tempPositionX + 1
                        break
                    case "-X": // 如果当前方向是 "-X"，则x横坐标减1
                        isObstacle = obstaclesMap[`${tempPositionX-1}-${tempPositionY}`]
                        tempPositionX = isObstacle ? tempPositionX : tempPositionX - 1
                        break
                }
                if(isObstacle) {
                    break
                }
            }
            currentPositionX = tempPositionX 
            currentPositionY = tempPositionY
            // 存下当前的最大距离
            var tempMaxEuclideanDistance = Math.pow(currentPositionX,2) + Math.pow(currentPositionY,2)
            maxEuclideanDistance = maxEuclideanDistance <  tempMaxEuclideanDistance  ? tempMaxEuclideanDistance : maxEuclideanDistance
        }else{ // 否则是做改变方向的动作
            direction = changeDirection(command,direction)
        }
        
    }
    return maxEuclideanDistance // 最后返回最大距离
};
```
