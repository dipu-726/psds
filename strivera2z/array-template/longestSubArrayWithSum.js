/*

arr = [2,5,1,7,10]
         ^   ^

sum = 14

sum = 8

sum = 12

arr = [15, 17, 12, 1, 22]
                    l
                    r
*/

function solution(arr, sumToChase) {
  let left = 0;
  let right = arr.length -1;
  let sum = 0;
  let len = arr.length - 1;

  while (right < len) {
    let temp = sum + arr[right];
    if (temp <= sumToChase) {
      right++;
      sum+=arr[right];
      continue;
    }

    left++;

    if (left > right) {
      right++;
      continue;
    }

    if(sum - arr[left] <= sumToChase) {
      sum = sum - arr[left];
    }

  }
}

console.log(solution([2,5,1,7,10]))
// console.log(solution([]))
