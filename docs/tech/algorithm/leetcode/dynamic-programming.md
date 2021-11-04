
# 动态规划

[[toc]]

动态规划解析思路：

动态规划，无非就是利用历史记录，来避免我们的重复计算。而这些历史记录，我们得需要一些变量来保存，一般是用一维数组或者二维数组来保存。下面我们先来讲下做动态规划题很重要的三个步骤：

* **第一步骤：定义数组元素的含义**，上面说了，我们会用一个数组，来保存历史数组，假设用一维数组 dp[] 吧。这个时候有一个非常非常重要的点，就是规定你这个数组元素的含义，例如你的 dp[i] 是代表什么意思？

* **第二步骤：找出数组元素之间的关系式**，我觉得动态规划，还是有一点类似于我们高中学习时的归纳法的，当我们要计算 dp[n] 时，是可以利用 dp[n-1]，dp[n-2].....dp[1]，来推出 dp[n] 的，也就是可以利用历史数据来推出新的元素值，所以我们要找出数组元素之间的关系式，例如 dp[n] = dp[n-1] + dp[n-2]，这个就是他们的关系式了。

* **第三步骤：找出初始值**。学过数学归纳法的都知道，虽然我们知道了数组元素之间的关系式，例如 dp[n] = dp[n-1] + dp[n-2]，我们可以通过 dp[n-1] 和 dp[n-2] 来计算 dp[n]，但是，我们得知道初始值啊，例如一直推下去的话，会由 dp[3] = dp[2] + dp[1]。而 dp[2] 和 dp[1] 是不能再分解的了，所以我们必须要能够直接获得 dp[2] 和 dp[1] 的值，而这，就是所谓的初始值。有了初始值，并且有了数组元素之间的关系式，那么我们就可以得到 dp[n] 的值了，而 dp[n] 的含义是由你来定义的，你想求什么，就定义它是什么，这样，这道题也就解出来了。

## 32、[最长有效括号](https://leetcode-cn.com/problems/longest-valid-parentheses/) （困难）

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    // 一、确定dp数组的含义: dp[i] 代表以 s[i] 结尾的最长有效长度，这里需要注意 s[i] 一定是等于 ')' 的，如果 s[i] === '(' 则将 dp[i] 记录为 dp[i] = 0，切记这一点，最后就是求出 dp 数组中的最大值。
    // 二、确定dp数组元素之间的关系，这里需要分情况讨论：
    //      1. s[i] === '(' 显然没办法和前面的子串组成有效子串，此时 dp[i] = 0
    //      2. s[i] === ')' 这就比较好玩了，这里又要分情况讨论了
    //          2.1 如果 dp[i-1] === 0： 
    //.                 2.1.1 s[i-1] === '(' 则此时刚好和 s[i] 凑成 '()'，所以 dp[i] = (dp[i-2] || 0) + 2；需要注意 dp[i-2] 可能不存在
    //                  2.1.2 s[i-1] === ')' 则 dp[i] = 0
    //          2.2 如果 dp[i-1] !== 0 说明 s[i-1] 一定是 ')'，此时我们需要去找出 dp[i-1] 长度之前的那个符号能否和 s[i] 配对：
    //                  2.2.1 如果 s[i-dp[i-1]-1] === '(' 则 dp[i] = dp[i-1] + 2 + (dp[i-dp[i-1]-2] || 0)； 需要注意 dp[i-dp[i-1]-2] 可能不存在
    //                  2.2.2 如果 s[i-dp[i-1]-1] === ')' 则 dp[i] = 0
    // 三、确定初始值：dp[0] = 0

    var len = s.length
    if(len===0) {
        return 0
    }
    var dp = [0]
    var max = 0
    for(var i=1;i<len;i++){
       if(s[i] === '(') {
           dp[i] = 0
       } else{
           if(dp[i-1] === 0) {
                dp[i] = s[i-1] === '(' ?  (dp[i-2] || 0) + 2 : 0
           }else{
               dp[i] = s[i-dp[i-1]-1] === '(' ? dp[i-1] + 2 + (dp[i-dp[i-1]-2] || 0) : 0
           }
           max = dp[i] > max ? dp[i] : max
       }
    }
   return max
};
```
<!-- |  45  | 困难 | [跳跃游戏 II](https://leetcode-cn.com/problems/jump-game-ii/) |          ❎     | -->
<!-- |  55  | 困难 | [跳跃游戏](https://leetcode-cn.com/problems/jump-game/)     |            ❎     | -->
## 62、  [不同路径](https://leetcode-cn.com/problems/unique-paths/) (*中等*)

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    // 1. 定义dp数组元素的含义: 每个元素代表到达每个网格的所有路径
    // 2. 找出数组元素之间的关系式: dp[m][n] = dp[m][n-1] + dp[m-1][n]
    // 3. 找出初始值: 因为只能向下或者向右移动，所以第一行和第一列的每个dp元素的初始值都为1，只有一条路径
    var dp = []
    for(var i =0;i<m ; i++){
        dp[i] = []
        for(var j = 0;j<n;j++){
            if(j === 0) {
                dp[i][0] = 1
            } else if(i === 0 ){
                dp[0][j] = 1
            }else{
                dp[i][j] = dp[i][j-1] + dp[i-1][j]
            }
        }
    }
    return dp[m-1][n-1]
};
```

## 63、  [不同路径 II](https://leetcode-cn.com/problems/unique-paths-ii/) （*中等*）

```js
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    // 1. 定义dp数组元素的含义: 每个元素代表到达每个网格的所有路径，如果遇到某个网格是障碍物，将到达这个网格的路径dp[i][j] 设置为0
    // 2. 找出数组元素之间的关系式: dp[i][j] = obstacleGrid[i][j] === 0 ? dp[i][j-1] + dp[i-1][j] : 0
    // 3. 找出初始值: 因为只能向下或者向右移动，所以第一行和第一列的每个dp元素的初始值都为1，只有一条路径，但是如果第一行和第一列里面有障碍物，到达障碍物以及障碍物后面的网格的路径都设置为0
    var m = obstacleGrid.length
    var n = obstacleGrid[0].length
    var dp = []
    for(var i=0;i<m;i++){
        dp[i] = []
        for(var j = 0;j<n;j++){
            if(i === 0){
                dp[0][j] = obstacleGrid[0][j] === 1 || (j-1 >= 0 && dp[0][j-1] === 0) ? 0 : 1
            }else if(j === 0){
                dp[i][0] = obstacleGrid[i][0] === 1 || (i-1 >= 0 && dp[i-1][0] === 0) ? 0 : 1
            }else{
                dp[i][j] = obstacleGrid[i][j] === 0 ? dp[i][j-1] + dp[i-1][j] : 0
            }
        }
    }
    return dp[m-1][n-1]
};
```

## 64、 [最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/) （*中等*）

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    // 1. 定义dp数组元素的含义: 每个dp元素代表到达当前网格的路径数字最小和
    // 2. 找出数组元素之间的关系式: dp[i][j] = Math.min(dp[i][j-1], dp[i-1][j]) + grid[i][j]
    // 3. 找出初始值: 因为只能向下或者向右移动，所以第一行和第一列的每个dp元素的初始值都很好计算，从左往右加起来和从上往下加起来
    // 注意：这里为了节省空间直接使用grid来存储计算的结果。
    const m = grid.length
    const n = grid[0].length
    for(var i=0;i<m;i++){
        for(var j =0;j<n;j++){
            if(i === 0 && j ===0){
                grid[0][0] = grid[0][0]
            }else if(i===0){
                grid[0][j] = grid[0][j] + grid[0][j-1]
            }else if(j ===0){
                grid[i][0] = grid[i][0] + grid[i-1][0]
            }else{
                grid[i][j] = Math.min(grid[i][j-1], grid[i-1][j]) + grid[i][j]
            }
        }
    }
    return grid[m-1][n-1]
};
```
<!-- |  72  | 困难 | [编辑距离](https://leetcode-cn.com/problems/edit-distance/) |        ❎     | -->
<!-- |  76  | 困难 | [最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/) |        ❎     | -->
<!-- |  91  | 中等 | [解码方法](https://leetcode-cn.com/problems/decode-ways)     |       ❎     | -->
<!-- | 120  | 中等 | [三角形最小路径和](https://leetcode-cn.com/problems/triangle/description/) |       ❎     | -->
## 121、[买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/#/description) （*简单*）

解法一：

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // 1. 确定dp数组中元素的含义：因为要求的是最大利润，如果i天的价格时prices数组，很明显dp元素的含义就是这i天中卖出该股票所获得的最大利润
    // 2. 确定数组中元素的关系表达式： 假设前 i-1 天中的最低价格是min, 则 dp[i] = Math.max(dp[i-1],prices[i] - min)
    // 3. 确定初始值： dp[0] = 0
    
    var dp = [0]
    var min = prices[0]
    var len = prices.length
    for(var i = 1;i<len;i++){
        dp[i] = Math.max(dp[i-1],prices[i] - min)
        if( prices[i] < min) {
            min = prices[i]
        }
    }
    return dp[len-1]
};
```

解法二：空间优化

```js
var maxProfit = function(prices) {
    var cur = [0]
    var min = prices[0]
    var len = prices.length
    for(var i = 1;i<len;i++){
        cur = Math.max(cur,prices[i] - min)
        if( prices[i] < min) {
            min = prices[i]
        }
    }
    return cur
};
```

<!-- | 122  | 简单 | [买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/) 
<!-- | 123  | 困难 | [买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)        |    ❎     | -->
<!-- | 152  | 中等 | [乘积最大子序列](https://leetcode-cn.com/problems/maximum-product-subarray/description/)    |    ❎     | -->
<!-- | 188  | 困难 | [买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)          |    ❎     | -->
## 198、 [打家劫舍](https://leetcode-cn.com/problems/house-robber/)（*中等*）

解法一：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // 1. 确定dp数组中元素的含义：dp元素代表偷取第i个房屋时获得的最高金额
    // 2. 确定数组中元素的关系表达式：dp[i] = Math.max(dp[i-1],dp[i-2] + nums[i])
    // 3. 确定初始值: dp[0] = num[0],dp[1] = Math.max(num[0],num[1])
    var len = nums.length
    if(len === 1) {
        return nums[0]
    }
    if(len === 2) {
        return Math.max(nums[0],nums[1])
    }
    var dp = [nums[0],Math.max(nums[0],nums[1])]
    for(var i = 2;i<nums.length;i++){
        dp[i] = Math.max(dp[i-1],dp[i-2] + nums[i])
    }
    return dp[len-1]
};
```

解法二：

```js
var rob = function(nums) {    
    var len = nums.length
    if(len === 1) {
        return nums[0]
    }
    if(len === 2) {
        return Math.max(nums[0],nums[1])
    }
    var preDp = nums[0],curDp = Math.max(nums[0],nums[1])
    for(var i = 2;i<nums.length;i++){
        temp = Math.max(curDp,preDp + nums[i])
        preDp = curDp
        curDp = temp
    }
    return curDp
};
```

<!-- | 213  | 中等 | [打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/description/) |     ❎     | -->
<!-- | 221  | 中等 | [最大正方形](https://leetcode-cn.com/problems/maximal-square/) |          ❎     | -->
<!-- | 279  | 中等 | [完全平方数](https://leetcode-cn.com/problems/perfect-squares/) |            ❎     | -->
<!-- | 322  | 中等 | [零钱兑换](https://leetcode-cn.com/problems/coin-change/description/) |       ❎     | -->
<!-- | 518  | 中等 | [零钱兑换 II](https://leetcode-cn.com/problems/coin-change-2/) |            ❎     | -->
<!-- | 309  | 中等 | [最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) |         ❎     | -->
<!-- | 312  | 困难 | [戳气球](https://leetcode-cn.com/problems/burst-balloons/)   |         ❎     | -->
<!-- | 363  | 困难 | [矩形区域不超过 K 的最大数值和](https://leetcode-cn.com/problems/max-sum-of-rectangle-no-larger-than-k/) |         ❎     | -->
<!-- | 403  | 困难 | [青蛙过河](https://leetcode-cn.com/problems/frog-jump/)      |        ❎     | -->
<!-- | 410  | 困难 | [分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum) |           ❎     | -->
<!-- | 552  | 困难 | [学生出勤记录 II](https://leetcode-cn.com/problems/student-attendance-record-ii/) |             ❎     | -->
<!-- | 621  | 中等 | [任务调度器](https://leetcode-cn.com/problems/task-scheduler/) |         ❎     | -->
<!-- | 647  | 中等 | [回文子串](https://leetcode-cn.com/problems/palindromic-substrings/) |             ❎     | -->
<!-- | 714  | 中等 | [买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) |     ❎     | -->
## 746、[使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/) (*简单* )

解法1：

```js
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    // 1. 定义dp数组元素的含义: 每个元素代表的是爬到第i个阶梯的最低花费
    // 2. 找出数组元素之间的关系式: dp[i] = Math.min(dp[i-1 ] +cost[i-1],dp[i-2] + cost[i-2])
    // 3. 找出初始值: dp[0] = cost[0],dp[1] = cost[1]
    var len = cost.length
    var dp = [0,0]
    for(var i = 2;i<len;i++){
        dp[i] = Math.min(dp[i-1] + cost[i-1], dp[i-2]+cost[i-2]) 
    }
    return Math.min(dp[len-1] + cost[len-1],dp[len-2] + cost[len-2])
};
```

解法二：

```js
var minCostClimbingStairs = function(cost) {
    var len = cost.length
    var preDp = 0,curDp = 0,
    preValue = cost[0], 
    curValue = cost[1]
    
    for(var i = 2;i<len;i++){
        var temp = Math.min(curDp + cost[i-1], preDp +cost[i-2]) 
        preDp = curDp
        preValue = cost[i-1]
        curDp = temp
        curValue = cost[i]
    }
    return Math.min(curDp + curValue,preDp + preValue)
};
```
<!-- | 980  | 困难 | [不同路径 III](https://leetcode-cn.com/problems/unique-paths-iii/) |     ❎     | -->

## 参考资料

1. [告别动态规划，连刷 40 道题，我总结了这些套路，看不懂你打我（万字长文）](https://zhuanlan.zhihu.com/p/91582909)
