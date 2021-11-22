# 贪心算法

[[toc]]

贪心解题思路：局部最优达到全局最优。

举一个不恰当的例子：你的面前有一堆面额不等的钱，你每次只能拿一张，一共可以拿五次，求如何拿到最多的钱。

只要不傻每个人都知道每次都拿最大面额的钱最后就能拿到最多的钱。这里“每次拿最大面额的钱”就是局部最优，“最后拿到最多的钱”这就是全局最优。

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
