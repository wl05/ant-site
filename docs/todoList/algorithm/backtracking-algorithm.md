# 回溯 [Doing]

```js
function permute(nums) {
  const res = [];
  backtrack();
  return res;
  function backtrack(track = [], used = []) {
    if (nums.length === track.length) {
      return res.push([...track]);
    }
    for (let i = 0, len = nums.length; i < len; i++) {
      if (!used[i]) {
        track.push(nums[i]);
        used[i] = true;
        backtrack(track, used);
        track.pop();
        used[i] = false;
      }
    }
  }
}
const res = permute([1, 2, 3]);
console.log(res);
```


## 参考资料
1. [回溯算法入门级详解 + 练习](https://leetcode-cn.com/problems/permutations/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liweiw/)
2. [回溯算法详解](https://github.com/labuladong/fucking-algorithm/blob/master/%E7%AE%97%E6%B3%95%E6%80%9D%E7%BB%B4%E7%B3%BB%E5%88%97/%E5%9B%9E%E6%BA%AF%E7%AE%97%E6%B3%95%E8%AF%A6%E8%A7%A3%E4%BF%AE%E8%AE%A2%E7%89%88.md)