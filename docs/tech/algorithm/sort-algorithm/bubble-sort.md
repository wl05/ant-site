# 冒泡算法
```js
// 普通实现
const nums1 = [9, 2, 1, 3, 4, 8, 9, 10, 6, 5, 7];
function bubbleSort1(nums) {
  const len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
  }
  return nums;
}
// 优化版1
const nums2 = [9, 2, 1, 3, 4, 8, 9, 10, 6, 5, 7];
function bubbleSort2(nums) {
  const len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    let sorted = true;
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
        sorted = false;
      }
    }
    if (sorted) break;
  }
  return nums;
}
// 优化版2
const nums3 = [9, 2, 1, 3, 4, 8, 9, 10, 6, 5, 7];
function bubbleSort3(nums) {
  const len = nums.length;
  let sortBorder = len - 1;
  let lastExchangeIndex = 0;
  for (let i = 0; i < len - 1; i++) {
    let sorted = true;

    for (let j = 0; j < sortBorder; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
        sorted = false;
        lastExchangeIndex = j;
      }
    }
    sortBorder = lastExchangeIndex;
    if (sorted) break;
  }
  return nums;
}
// 优化版3
const nums4 = [9, 2, 1, 3, 4, 8, 9, 10, 6, 5, 7];
function bubbleSort4(nums) {
  const len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    let sorted = true;
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
        sorted = false;
      }
    }
    if (sorted) break;
    for (let j = len - 1 - i; j > i; j--) {
      if (nums[j] < nums[j - 1]) {
        const temp = nums[j];
        nums[j] = nums[j - 1];
        nums[j - 1] = temp;
        sorted = false;
      }
    }
    if (sorted) break;
  }
  return nums;
}
console.log("====bubbleSort1====", bubbleSort1(nums1));
console.log("====bubbleSort2====", bubbleSort2(nums2));
console.log("====bubbleSort3====", bubbleSort3(nums3));
console.log("====bubbleSort4====", bubbleSort4(nums4));
```