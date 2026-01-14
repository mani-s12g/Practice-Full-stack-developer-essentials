const arr1 = [0, 1, 2, [3, 4]];

console.log("arr1.flat() - ", arr1.flat());
console.log("ori", arr1)
// expected output: Array [0, 1, 2, 3, 4]

const arr2 = [0, 1, [2, [3, [4, 5]]]];

// console.log(arr2.flat());
// expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

console.log("arr2.flat(2) - ", arr2.flat(2));
// console.log(arr2.flat(3));
// expected output: Array [0, 1, 2, 3, Array [4, 5]]

// console.log(arr2.flat(Infinity));
// expected output: Array [0, 1, 2, 3, 4, 5]

// Important
// Flatten Nested Array

function flatten(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
    []
  );
}

// console.log("flatten([1, [2, [3, 4]], 5]) - ", flatten([1, [2, [3, 4]], 5]));
console.log("flatten reduce", flatten([1, 2, [3, 4, [6, 7, [8, 9, 10, [11, 12]]]]]));


// `Array.isArray(val)` is a **built-in JavaScript method** that checks whether the given value (`val`) is an **array** or not.

// ### Syntax:
// ```js
// Array.isArray(value)
// ```

// ### Returns:
// - `true` → if `value` is an array
// - `false` → if `value` is not an array

// ### Examples:
// ```js
// Array.isArray([1, 2, 3]);   // true
// Array.isArray("hello");     // false
// Array.isArray({a:1});       // false
// Array.isArray(undefined);   // false
// Array.isArray(new Array()); // true
// ```

// 👉 It’s the **recommended way** to check for arrays (better than using `typeof`, because `typeof []` returns `"object"`).

// Do you want me to also show you how `Array.isArray()` works internally (like how it distinguishes arrays from objects)?


// Good question 👍

// `Array.isArray` is a **static method** on the global `Array` object in JavaScript.

// That means:
// - It belongs **to the `Array` constructor itself**, not to individual arrays.
// - You call it as `Array.isArray(val)` — **not** as `val.isArray()`.

// ### Why it exists
// In JavaScript, `typeof []` returns `"object"` (because arrays are objects under the hood).
// So to specifically check if something is an **array**, we use `Array.isArray`.

// ### Example:
// ```js
// console.log(typeof []);           // "object"
// console.log(Array.isArray([]));   // true
// console.log(Array.isArray({}));   // false
// ```

// ✅ So:
// `Array.isArray` → **built-in static method** that returns `true` if the given value is an array, `false` otherwise.

// Do you want me to also compare it with the older approach (`instanceof Array`) and explain why `Array.isArray` is more reliable?



function flattenArray(arr) {
  const result = [];
  function helper(input) {
    for (let i = 0; i < input.length; i++) {
      if (Array.isArray(input[i])) {
        helper(input[i]);
      } else {
        result.push(input[i]);
      }
    }
  }
  helper(arr);
  return result;
}

console.log("flatten helper", flattenArray([1, 2, [3, 4, [6, 7, [8, 9, 10, [11, 12]]]]]));


// Time Complexity
// O(n) where n is the total number of elements including nested elements

// Space Complexity
// O(n) for the output array and recursive call stack