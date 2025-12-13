const findLargest = (arr = []) => {
  let max = arr[0];
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}


console.log(findLargest([1, 2, 3, 4, 55, 0]));
console.log(findLargest([1, 2, 3, 4, 55, 900]));