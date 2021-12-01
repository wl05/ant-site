# DFS （深度优先遍历）

[[toc]]

## 130. [被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/) （中等）

```js
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

// 思路：
// 1. 寻找边界边界上的 O ，然后寻找所有和它相邻的所有 O 设置为 Y，这样处理以后剩下的 O 就是被 X 包围的 O 了
// 2. 再次遍历，将剩余的 O 替换为 X，将所有 Y 替换回 O。

// DFS
var solve = function(board) {
    var iLen = board.length
    var jLen = board[0].length
    var dfs = function(i,j){
        if(i < 0 || j< 0 || i>=iLen || j>=jLen || board[i][j] !== 'O') {
            return 
        }
        board[i][j] = 'Y'
        dfs(i-1,j)
        dfs(i+1,j)
        dfs(i,j-1)
        dfs(i,j+1) 
    }
    for(var i=0;i<iLen;i++){
        for(var j=0;j<jLen;j++){
            if(board[i][j] === 'O' && (i === 0 || j === 0 || i === iLen - 1 || j === jLen - 1) ) {
                dfs(i,j)
            }
        }
    }
    for(var i=0;i<iLen;i++){
        for(var j=0;j<jLen;j++){
            if(board[i][j] === "Y") {
                board[i][j] = "O"    
            }else{
                board[i][j] = "X"
            }
        }
    }
};

// BFS
var solve = function(board){
    var iLen = board.length
    var jLen = board[0].length
    var bfs = function(indexI,indexJ){
        var queue = [[indexI,indexJ]]
        while(queue.length) {
            var [i,j] = queue.shift()
            if(!(i < 0 || j< 0 || i>=iLen || j>=jLen || board[i][j] !== 'O')) {
                board[i][j] = "Y"
                queue.push([i,j-1]) 
                queue.push([i,j+1])
                queue.push([i-1,j])
                queue.push([i+1,j])
            }
        }
    }
    for(var i=0;i<iLen;i++){
        for(var j=0;j<jLen;j++){
            if(board[i][j] === 'O' && (i === 0 || j === 0 || i === iLen - 1 || j === jLen - 1) ) {
                bfs(i,j)
            }
        }
    }
    for(var i=0;i<iLen;i++){
        for(var j=0;j<jLen;j++){
            if(board[i][j] === "Y") {
                board[i][j] = "O"    
            }else{
                board[i][j] = "X"
            }
        }
    }
}
```

## 133. [克隆图](https://leetcode-cn.com/problems/clone-graph/)（中等）

```js
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */

// dfs
var cloneGraph = function (node) {
  if (node == null) return null
  var map = {}
  var dfs = function (node) {
    if (map[node.val]) return map[node.val]
    var newNode = new Node(node.val)
    map[node.val] = newNode
    newNode.neighbors = node.neighbors.map(function (node) {
      return dfs(node)
    })
    return newNode
  }
  return dfs(node)
}

// bfs
var cloneGraph = function (node) {
    if (node == null) return null
    var bfs = function (node) {
        var map = {}
        var queue = [node]
        var root = null
        while(queue.length) {
            var  tempNode = queue.shift()
            var  currentNode = map[tempNode.val] || new Node(tempNode.val)
            if(!root) root = currentNode
            map[tempNode.val] = currentNode
            for(var n of tempNode.neighbors) {
                if(!map[n.val]) {
                    queue.push(n)
                    map[n.val] = new Node(n.val)
                }
                currentNode.neighbors.push(map[n.val])
            }
        }   
        return root
    }
  return bfs(node)
}
```

## 200. [岛屿数量](https://leetcode-cn.com/problems/number-of-islands/) （中等） (需复习)

解法一： 深度优先遍历 （DFS）

```js
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if(grid.length === 0) {
        return 0
    }
    var iLen = grid.length
    var jLen = grid[0].length
    var count = 0
    var dfs = function(i,j){
        if(i<0 || j<0 || i>= iLen || j >= jLen || grid[i][j] !== "1") return 
        grid[i][j] = "2" // 赋值为 "2" 表示已经遍历过了
        dfs(i-1,j)
        dfs(i+1,j)
        dfs(i,j+1)
        dfs(i,j-1)
    }
    for(var i =0;i<iLen;i++){
        for(var j=0;j<jLen;j++){
            if(grid[i][j] === "1") {
                dfs(i,j)
                count++
            }
           
        }
    }
    return count
};
```

解法二： 广度优先遍历 （BFS）

```js
var numIslands = function(grid) {
    if(grid.length === 0) {
        return 0
    }
    var iLen = grid.length
    var jLen = grid[0].length
    var count = 0
    var bfs = function(i,j){
        var queue = [[i,j]]
        while( queue.length !== 0) {
            var [i,j] = queue.shift()
            grid[i][j] = '2' // 赋值为 "2" 表示已经遍历过了
            if(j - 1 >=0 && grid[i][j-1] === '1') {
                    grid[i][j-1] = '2'
                    queue.push([i,j-1])
            }
            if(j + 1 >=0 && grid[i][j+1] === '1') {
                    grid[i][j+1] = '2'
                    queue.push([i,j+1])
            }
            if(i+1 <iLen && grid[i+1][j] === '1' ) {
                grid[i+1][j] = '2'
                queue.push([i + 1,j])
            }
            if(i-1 >= 0 && grid[i-1][j] === '1' ) {
                grid[i-1][j] = '2'
                queue.push([i - 1,j])
            }
        }
    }
    for(var i =0;i<iLen;i++){
        for(var j=0;j<jLen;j++){
           if(grid[i][j] === "1") {
                bfs(i,j)
                count++
            }
        }
    }
    return count
};
```

## 695. [岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/)

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    if(grid.length === 0) return 0
    var iLen = grid.length
    var jLen = grid[0].length
    var res = 0
    var dfs = function(i,j,count= []){
        if( i<0 || j<0 || i>= iLen || j>= jLen ||  grid[i][j] !== 1) {
            return count
        }
        grid[i][j] = 2 // 将遍历的点设置为2，防止重复遍历
        count.push([i,j])
        dfs(i-1,j,count)
        dfs(i+1,j,count)
        dfs(i,j-1,count)
        dfs(i,j+1,count)
        return count
    }p
    for(var i=0;i< iLen;i++){
        for(var j=0;j< jLen;j++){
            if(grid[i][j] === 1) {
                var count = dfs(i,j)
                res = Math.max(res,count.length)
            }
        }
    }
    return res
};
```

## 参考资料

* [岛屿类问题的通用解法、DFS 遍历框架](https://leetcode-cn.com/problems/number-of-islands/solution/dao-yu-lei-wen-ti-de-tong-yong-jie-fa-dfs-bian-li-/)
