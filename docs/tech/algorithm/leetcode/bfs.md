# BFS （广度优先遍历）

[[toc]]

BFS 主要是利用队列先进先出的特点来进行遍历，例如对于下面的树来说，进行广度优先遍历后得到的结果应该是 1,2,3,4,5。就是说是一层一层的遍历的。

```
    1
   / \
  2  3
    /  \
   4    5
```

BFS 是从根节点开始，沿着树(图)的宽度遍历树(图)的节点，结合队列的操作过程就是：

* 把起始点放入队列中；

* 重复下述的步骤，直到队列为空：
  * 从队列中取出队列的第一个元素；
  * 找出与元素邻接的且尚未遍历的点， 标记为已遍历， 然后全部放入队列中。

## 102. [二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

思路：

使用 bfs ，利用队列来完成遍历。

如果只是为了遍历得到树中每个节点的值我们遵循以下步骤就好了：

* 将 根结点放入队列中
* 重复下列步骤直至队列为空
  * 将队列的第一个元素节点取出，获取值
  * 获取当前节点的左右节点，放入队列中。
  
但是从题目描述中我们看到最后的结果是要按节点所在的层进行保存，但是我们现在得到结果是没有进行分层的。
所以问题的点在于我们需要知道当前节点的层级。好在我们是可以得到每一层节点的个数的。怎么理解？理解如下：

* 从根节点开始，此时队列的长度是 1， 这是第0层的长度
* 根节点出队列，左右节点（假设有）入队列，此时队列长度是 2，这是第1层的长度，后面以此类推
* 根据这个长度我们就可以对节点进行分层存储了。

代码实现如下：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) {
        return []
    }
    var queue = [root] 
    var res = []
    while(queue.length>0) {
        var curResLength = queue.length // 保存每一层的个数
        var level = []
        while(curResLength > 0) { // 将每一层的节点值放在同一个数组 level 中的存储
            var curNode = queue.shift()
            var left =  curNode.left 
            var right = curNode.right
            if(left){
                queue.push(left)
            }
            if(right){
                queue.push(right)
            }
            level.push(curNode.val)
            curResLength --
        }
        res.push(level)
    }
    
    return res
};
```

## 103. [二叉树的锯齿形层序遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

承接上一题的思路，唯一需要注意的是在保存每一层值的顺序时需要注意一下

对于奇数层是从右到左，否则从左到右。所以在保存每层值的时候判断一下就可以了。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if(!root) return []
    var res = []
    var queue = [root]
    while(queue.length > 0){
        var level = []
        var currentLevelLength = queue.length
        while(currentLevelLength > 0) {
            var currentNode = queue.shift()
            var left = currentNode.left
            var right = currentNode.right
            if(left) {
                queue.push(left)
            }
            if(right) {
                queue.push(right)
            }
            currentLevelLength--
            res.length % 2 === 0 ? level.push(currentNode.val) : level.unshift(currentNode.val)
        }
        res.push(level)
    }
    return res
};
```

## 111. [111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/) （简单）

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    // 思路：
    // 因为是找出最小深度，所以只需要找到带叶子结点最近的一层
    // 遍历的时候一层一层的找，确定一层中没有叶子节点再继续往下寻找
    var bfs=function(){
        if(!root) return 0
        var queue = [root]
        var count = 1    
        while(queue.length) {
            var queueLen = queue.length // 这里表示的是一层里面的节点个数
            while(queueLen>0) { 
                var cur = queue.shift()
                if(!cur.left && !cur.right) {
                    return count
                }
                if(cur.left) queue.push(cur.left)
                if(cur.right) queue.push(cur.right)
                queueLen--
            }
            count ++ // 找完一层没有找到叶子节点再继续往下寻找
        }
    }
    return bfs()
};
```

## 116、[填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)（中等）

```js
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    // 思路：
    // 使用 dfs 进行层序遍历，一层一层遍历
    // 关键点在于需要知道每层的最后一个节点，最后一个节点的next是指向null的，所以需要知道当前节点在哪一层
    if(!root) return root
    var dfs = function(){
        var queue = [root]    
        while(queue.length) { 
            var count = queue.length // 这里记录的count就是每层节点的个数
            while(count>0) { // 处理完每层节点再处理下一层
                var curNode = queue.shift() 
                count--
                if(count > 0) curNode.next = queue[0] // 如果没有到当前层的最后一个节点则将当前节点的next指向它的下一个节点
                curNode.left && queue.push(curNode.left)
                curNode.right && queue.push(curNode.right)
            }
        }
    }
    dfs()
    return root
};
```

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

## 199. [199. 二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/) （中等）

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    var res = []
    if(!root) return res
    var queue = [root]
    
    while(queue.length) {
        var count = queue.length
        while(count) {
            var curNode = queue.shift()
            count === 1 && res.push(curNode.val)
            curNode.left && queue.push(curNode.left)
            curNode.right && queue.push(curNode.right)
            count--
        }
    }
    return res
};
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

## 参考资料

* [Leetcode面试高频题分类刷题总结](https://zhuanlan.zhihu.com/p/349940945)
* [BFS 的使用场景总结：层序遍历、最短路径问题](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/bfs-de-shi-yong-chang-jing-zong-jie-ceng-xu-bian-l/)
* [A Beginners guid to BFS and DFS](https://leetcode.com/discuss/study-guide/1072548/A-Beginners-guid-to-BFS-and-DFS)
* [BFS 题例](https://leetcode.com/list/57ksoa4v/)
* [DFS 题例](https://leetcode.com/list/57ksrrzj/)
