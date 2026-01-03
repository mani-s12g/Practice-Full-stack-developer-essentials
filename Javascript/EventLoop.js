console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
console.log(4);

// 🔹 Output:
// 1
// 4
// 3
// 2


// 🔹 Why:

// JS is single-threaded (one call stack).
// Microtasks (Promises) have higher priority than macrotasks (setTimeout).

// Execution order:
// console.log(1) → runs immediately.
// setTimeout() → callback added to macrotask queue.
// Promise.resolve().then() → added to microtask queue.
// console.log(4) → immediate.
// Event loop → executes microtasks → logs 3.
// Then executes macrotasks → logs 2.