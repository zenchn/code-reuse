// 1.数组去重
export function removeRepeatArray(arr) {
  return [...new Set(arr)];
}

// 2.数组顺序打乱
export function upsetArr(arr) {
  return arr.sort(() => {
    return Math.random() - 0.5;
  });
}

// 3.数组最大值
//这一块的封装，主要是针对数字类型的数组
export function maxArr(arr) {
  return Math.max.apply(null, arr);
}

// 4.数组最小值
export function minArr(arr) {
  return Math.min.apply(null, arr);
}

// 5.排序（快排）
export function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var left = [],
    right = [],
    current = arr.splice(0, 1);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < current) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(current, quickSort(right));
}

// 6.数组扁平化
export function flatten(arr) {
  return [].concat(...arr);
}

// 7.从数组中找出元素，并删除
// destroyer([1,2,3,4,1,3,2],1,2) //[3,4,3]
export function destroyer(arr, ...items) {
  var removeArgs = new Set(items);
  return arr.filter(v => !removeArgs.has(v));
}
