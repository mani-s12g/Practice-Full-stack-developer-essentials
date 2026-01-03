// Why the Original Code Fails
// Without a separate function scope, all the setTimeout callbacks form a closure over the 
// same function-scoped var i. The loop finishes quickly, i becomes 3, and only then do the
//  callbacks run, all referencing the final value of i.
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    // console.log(i, "check");
  }, 1000);
}

// output
// 5 check
// 5 check
// 5 check
// 5 check
// 5 check

// with let and const
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    // console.log(i, "check");
  }, 1000);
}

// output
// 0 check
// 1 check
// 2 check
// 3 check
// 4 check

// for (const i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i, "check");
//   }, 1000);
// }
// output's Error:
// for (const i = 0; i < 5; i++) {
//   ^

// TypeError: Assignment to constant variable.

// To achieve in var

// option 1: using helper function

function createTimeoutCallback(i) {
  setTimeout(() => {
    // console.log(i, "achieved in var");
  }, 1000);
}

for (var i = 0; i < 5; i++) {
  createTimeoutCallback(i);
}

// output
// 0 achieved in var
// 1 achieved in var
// 2 achieved in var
// 3 achieved in var
// 4 achieved in var

// using helper function
// This approach is similar to the IIFE but uses a named helper function to achieve
// the same result: creating a new function scope that captures the iteration value.

// option 2 : using IIFE (Immediately Invoked Function Expression)

for (var i = 0; i < 5; i++) {
  // Pass the current value of 'i' as an argument 'index' to the IIFE
  (function (index) {
    setTimeout(() => {
      // console.log(index, "achieved in var using IIFE"); // 'index' is local to this IIFE's scope
    }, 1000);
  })(i); // Immediately invoke the function with the current 'i'
}

// output
// 0 achieved in var using IIFE
// 1 achieved in var using IIFE
// 2 achieved in var using IIFE
// 3 achieved in var using IIFE
// 4 achieved in var using IIFE

// IIFE
// An IIFE creates a private scope for each iteration and captures the value of i as an argument
//  at that specific moment in time. The setTimeout callback function then closes over this
// local variable (e.g., index), preserving the correct value when it eventually executes.


// These techniques demonstrate how closures can be used to manage scope when working with
//  asynchronous operations inside loops that use var. Modern JavaScript typically
//  uses let for this purpose, which is block-scoped and automatically handles this behavior
//  without the need for IIFEs. You can find more information on this pattern in 
// the MDN Web Docs on closures. 



// function d() {
//     var f = 10;
//     console.log(f, "swwd");
// }
// var f =100
// console.log(f);

// d();

// 

const digits = 5;
const arr = new Array(digits);

// console.log(new Array(digits))

for (let index = 0; index < arr.length; index++) {
  // console.log(arr[index], "array[index]"); 
}

// arr.forEach(x => {
//   console.log(x)
// })
// arr.map(x => {
//   console.log(x)
// })

// for (const element of arr) {
//     console.log(element, "for of"); // This line will never execute
// }

// arr.fill(undefined).forEach((element, index) => {
//     console.log(`Index ${index}:`, element);
// });

arr.fill("").forEach((element, index) => {
    // console.log(`Index ${index}:`, element);
});



const arr1 = Array.from({length: 5});
console.log(arr1)

arr.forEach((element, index) => {
    console.log(`Index ${index}:`, element);
});