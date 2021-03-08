## 回溯

```js
function permute(nums) {
  const res = [];
  backtrack();
  return res;
  function backtrack(track = []) {
    if (nums.length === track.length) {
      return res.push([...track]);
    }
    for (let num of nums) {
      if (!track.includes(num)) {
        track.push(num);
        backtrack(track);
        track.pop();
      }
    }
  }
}
const res = permute([1, 2, 3]);
console.log(res);
```


