# BFS （广度优先遍历）

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

## 参考资料

* [Leetcode面试高频题分类刷题总结](https://zhuanlan.zhihu.com/p/349940945)
* [BFS 的使用场景总结：层序遍历、最短路径问题](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/bfs-de-shi-yong-chang-jing-zong-jie-ceng-xu-bian-l/)
