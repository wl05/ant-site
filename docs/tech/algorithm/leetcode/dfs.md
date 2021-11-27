# DFS （深度优先遍历）

[[toc]]
## 200. [岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

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
        grid[i][j] = "2"
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
