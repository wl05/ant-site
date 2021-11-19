# 贪心算法

[[toc]]

贪心解题思路：局部最优达到全局最优。

举一个不恰当的例子：你的面前有一堆面额不等的钱，你每次只能拿一张，一共可以拿五次，求如何拿到最多的钱。

只要不傻每个人都知道每次都拿最大面额的钱最后就能拿到最多的钱。这里“每次拿最大面额的钱”就是局部最优，“最后拿到最多的钱”这就是全局最优。

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
