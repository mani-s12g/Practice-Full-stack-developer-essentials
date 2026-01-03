// https://claude.ai/chat/99f2374b-32d5-40d4-9ceb-a542bf0494c2
// Array.prototype.map Implementation
Array.prototype.myMap = function (callback, thisArg) {
    // Handle edge cases
    if(this == null) {
        throw new TypeError('Array.prototype.myMap called on null or undefined');
    }
    if(typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    const result = [];
    const arr = Object(this);
    const len = arr.length >>> 0; // Convert to unsigned 32-bit integer

    for ( let i = 0; i < len; i++)  {
        // Check if property exists (handles sparse arrays)
        if(i in arr) {
            result[i] = callback.call(thisArg, arr[i], i, arr);
        }
    }
    return result;
}

// Test
const nums = [1, 2, 3];
console.log(nums.myMap((x) => x * 2)); // [2, 4, 6]

let factor =  5
let f = nums.map((x) => {
    // console.log(typeof x)
    // console.log(x)
    return x * factor
}, factor)

console.log(f, "f")
// console.log(typeof nums);

// const nums2 = Array(nums);
// console.log(typeof nums2, "nums2")

// map can be called on array-like objects:
// const arrayLike = { 
//     0: 'a',
//     1: 'b', 
//     2: 'c', 
//     length: 3 
// };

// const res = arrayLike.map((x) => {
//     return x.toUpperCase();
// })

// console.log(res);



// sparse array
// map returns empty slots where value is not there
// const arr = new Array(5);  // [empty × 5]
// arr[0] = 1;
// arr[4] = 5;

// console.log(arr.myMap(x => x * 2))

// [1, 2, 3].map( (x) => x * 2 );

// Array on which we call map on - [1, 2, 3] - this
// Inside callback fn whatever we pass - (x) - thisArg

// for(let i = 0; i < this.length; i++) {
//     callback.call(thisArg, this[i], i, this);
// }

// const numbers = [1, 2, 3];

// numbers.myMap(function(value) {
//   // Question: What is 'this' here?
//   console.log(this);
// });

// ❌ Doesn't work - arrow functions ignore thisArg
let g = [1, 2, 3].map((x) => x * this.factor, { factor: 10 });
console.log(g, "g"); // [ NaN, NaN, NaN ]

// ✅ Works - regular functions respect thisArg
let h = [1, 2, 3].myMap(function(x) { 
  return x * this.factor; 
}, { factor: 10 });

console.log(h);