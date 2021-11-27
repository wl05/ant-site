# DFS （深度优先遍历）

[[toc]]

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

## 参考资料

* [岛屿类问题的通用解法、DFS 遍历框架](https://leetcode-cn.com/problems/number-of-islands/solution/dao-yu-lei-wen-ti-de-tong-yong-jie-fa-dfs-bian-li-/)
