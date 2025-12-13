// const printSubArray = (arr = []) => {
//   const len = arr.length;
//   for (let k = 0; k < len; k++) {
//     let result = [];
//     for (let i = k; i < len; i++) {
//       result.push(arr[i]);
//       console.log(result.join(","));
//     }
//   }
// }

/*

  1,
  1,2
  1,2,3
  1,2,3,4
  1,2,3,4,5

  2
  2,3
  2,3,4
  2,3,4,5

  3
  3,4
  3,4,5

  4,
  4,5

  5


*/


const printSubArray = (arr) => {
  const len = arr.length;
  for (let i =0; i< len; i++) {
    let result = [];
    for (let j= i; j<len; j++) {
      result.push(arr[j]);
      console.log(result.join(","));
    }
    console.log("");
  }
}

printSubArray([1, 2, 3, 4, 5]);
