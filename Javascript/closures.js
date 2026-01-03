// What is closure ?
// A fn bind together with its lexical environment
// Fn along with its lexical scope is closure

// All rules, scopes of Normal function is same for even arrow functions

// Application / Uses of Closures
// 1. Module Design Patterns
// 2. Currying in js
// 3. Functions like Once (fn's which only like run once, next time when called it doesn't run)
// 4. Memoize
// 5. Maintaining state in async world
// 6. setTimeouts
// 7. Iterators and many more

// function x() {
//   var a = 7;
//   // fn y binds to variables of x i.e., var a (means fn y has access to its parent's lexical scope)
//   function y() {
//     console.log(a);
//   }
//   y();
// }
// x();

// Memory Context
// Local :{
//     this.window
// }
// Closure: {
//     a: 7
// }
// Global: {

// }

// function a() {
//     let g = 10;
//     return function b() {
//         console.log(g);
//     }
// }
// let ans = a();
// ans();

//
function x() {
  var a = 7;
  // fn y binds to variables of x i.e., var a (means fn y has access to its parent's lexical scope)
  function y() {
    console.log(a);
  }
  a = 90;
  return y;
}
var r = x(); // after returning fn y() from fn x(), whole full execution context of fn x() is destroyed
// ans prints whole returned fn y() here
console.log(r);
// but when we call fn y() here now, it will print a value even after fn x() execution context is gone, that is Closure,
// it remembers its place where it came from.. and prints that value of reference of a, (it remembers the reference of a where a is pointing
//  not a' value )
// so it prints latest a reference value 90 not 7, before a was 100, a was pointing to 7, then 7 was printing, now a = 90, so prints 90
r(); // this still maintaains its lexical scope, even after fn x() is not there, this is called closure

// In simple when fn y() was returned, it not only returned its fn code, but also its lexical scope or closure or fn along with its lexical scope that was returned

// even deeper closure

function z() {
  var deep = 1;
  function x() {
    var a = 10;
    function y() {
      console.log(a, deep); // it prints 10 1 (it remembers all its parent's , its grandparent's lexical scope references values)
    }
    y();
  }
  x();
}
z();
// Memory context
// Local: {
//     this.window
// }
// Closure: {
//     a: 10
// }
// Closure: {
//     deep: 1
// }
// Global: {

// }

// Method 1 - we can return fn in js like (valid in js)
// function x() {
//   var a = 7;
//   function y() {
//     console.log(a);
//   }
//   return y;
// }
// console.log(x()); // prints whole fn y() only

// Method 2 - we can return fn in js like (valid in js)
// function x() {
//   var a = 7;
//   return function y() {
//     console.log(a);
//   }
// }
// console.log(x()); // prints whole fn y() only

// we can assign fn to variable in js (valid in js)
// function x() {
//   var a = function y() {
//     console.log("assigning fn to var");
//   }
//   a();
// }
// x();

// we can also pass fn as argument in js (valid in js)
// function x(fn) {
//   console.log(fn);
//   fn();
// }
// x(function y() {
//   console.log("passing fn as an argument to another fn");
// });

// Important *
// https://chatgpt.com/c/69080662-ba08-8320-bd28-340315cd117f

// 🔒 10. Closures
// A closure is when an inner function "remembers" variables from its outer function — even after the outer function has returned.

// 🔹 Example:
function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const increment = counter();
increment(); // 1
increment(); // 2
increment(); // 3

// ✅ Real-world use case:
// Data privacy (simulating private variables)
// Debouncing / throttling
// React hooks (useState uses closure)

// Multiple Independent Counters
function createCounter(start = 0, step = 1) {
  let count = start;

  return function () {
    const current = count;
    count += step;
    return current;
  };
}

const counter1 = createCounter(0, 1);
const counter2 = createCounter(10, 2);

console.log(counter1(), "counter1()"); // 0
console.log(counter1(), "counter1()"); // 1
console.log(counter1(), "counter1()"); // 1
console.log(counter2()); // 10
console.log(counter2()); // 12
console.log(counter2()); // 12

// Implement Function.prototype.call
// Understanding call()
// The call() method calls a function with a given this value and arguments provided individually.

Function.prototype.myCall = function (context, ...args) {
  // Handle null/undefined context -> use globalThis (window in browser)
  context = context || globalThis;

  // Convert primitives to objects
  if (typeof context !== "object" && typeof context !== "function") {
    context = Object(context);
  }

  // Create a unique symbol to avoid property name collision
  const fnSymbol = Symbol("fn");

  // Add the function as a property to the context
  context[fnSymbol] = this;

  // Call the function with the context
  const result = context[fnSymbol](...args);

  // Clean up - remove the temporary property
  delete context[fnSymbol];

  // Return the result
  return result;
};

// const obj = {
//   fn: "original value"
//  };

// //  console.log(obj)
// //  obj.fn = function () {
//   // return "temp";
// //  }

// //  console.log(obj, "obj.fn")

//  const sym = Symbol('fn');
//  obj[sym] = function () {
//   return "temp";
//  }
//  console.log(obj.fn);

// const obj = { fn: 'original value' };

// ❌ Without Symbol (property collision)
// obj.fn = function() { return 'temp'; };
// console.log(obj.fn); // Overwrites original!

// // ✅ With Symbol (no collision)
// const sym = Symbol('fn');
// obj[sym] = function() { return 'temp'; };
// console.log(obj.fn); // 'original value' (preserved!)

// const person = {
//   title: "Mr"
// }

// function greet (name) {
//   return `Hello, ${name} i am ${this.title}`
// }

// let ans = greet.myCall(person, "John");
// console.log(ans)

// Complete Working Example

Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;

  if (typeof context !== "object" && typeof context !== "function") {
    context = Object(context);
  }

  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];

  return result;
};

// Test 1: Basic usage
function greet(greeting, punctuation) {
  return `${greeting}, my name is ${this.name}${punctuation}`;
}

const person = { name: "Alice" };
console.log(greet.myCall(person, "Hello", "!"));
// "Hello, my name is Alice!"

// Test 2: With null context
function showThis() {
  console.log(this);
}
showThis.myCall(null); // globalThis (window/global)

// Test 3: With primitive
function getType() {
  return typeof this;
}
console.log(getType.myCall(5)); // "object" (Number object)
console.log(getType.myCall("text")); // "object" (String object)

// 2. Implement Function.prototype.apply
// Understanding apply()
// Similar to call(), but takes arguments as an array.

Function.prototype.myApply = function (context, argsArray) {
  // Handle null/undefined context
  context = context || globalThis;

  // Convert primitives to objects
  if (typeof context !== "object" && typeof context !== "function") {
    context = Object(context);
  }

  // Handle null/undefined argsArray
  argsArray = argsArray || [];

  // Validate argsArray is array-like
  if (!Array.isArray(argsArray) && typeof argsArray !== "object") {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  // Create unique symbol
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  // Call with spread array
  const result = context[fnSymbol](...argsArray);

  // Clean up
  delete context[fnSymbol];

  return result;
};

// Key Differences from call()

// call() - arguments passed individually
func.myCall(context, arg1, arg2, arg3);

// apply() - arguments passed as array
func.myApply(context, [arg1, arg2, arg3]);

// Complete Working Example
Function.prototype.myApply = function (context, argsArray) {
  context = context || globalThis;

  if (typeof context !== "object" && typeof context !== "function") {
    context = Object(context);
  }

  argsArray = argsArray || [];

  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  const result = context[fnSymbol](...argsArray);
  delete context[fnSymbol];

  return result;
};

// Test 1: Basic usage
function introduce(greeting, hobby) {
  return `${greeting}, I'm ${this.name} and I like ${hobby}`;
}

const user = { name: "Bob" };
console.log(introduce.myApply(user, ["Hi", "coding"]));
// "Hi, I'm Bob and I like coding"

// Test 2: Math.max with apply
const numbers = [5, 6, 2, 3, 7];
console.log(Math.max.myApply(null, numbers)); // 7

// Test 3: Array-like object
function sum() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}
console.log(sum.myApply(null, [1, 2, 3, 4])); // 10

// bind
Function.prototype.myBind = function (context, ...bindArgs) {
  const originalFunc = this;

  if (typeof originalFunc !== "function") {
    throw new TypeError("Bind must be called on a function");
  }

  return function (...callArgs) {
    return originalFunc.apply(context, [...bindArgs, ...callArgs]);
  };
};

// Test 1: Basic binding
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "Charlie" };
const boundGreet = greet.myBind(person, "Hello");
console.log(boundGreet("!")); // "Hello, Charlie!"

// Test 2: Event handler binding
const button = {
  content: "Click me",
  click: function () {
    console.log(`Button says: ${this.content}`);
  },
};

// Without bind - loses context
setTimeout(button.click, 1000); // "Button says: undefined"

// With bind - preserves context
setTimeout(button.click.myBind(button), 1000); // "Button says: Click me"

// Test 3: Partial application
function add(a, b, c) {
  return a + b + c;
}

const add5 = add.myBind(null, 5);
console.log(add5(10, 15)); // 30 (5 + 10 + 15)

const add5And10 = add.myBind(null, 5, 10);
console.log(add5And10(15)); // 30 (5 + 10 + 15)

// Implement sleep(ms) Function

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Usage with async/await
async function demo() {
  console.log("start");
  await sleep(2000);
  console.log('After 2 seconds');
}

demo();


// Step-by-step execution:
// 1. sleep(2000) returns a Promise
// 2. setTimeout schedules resolve() to run after 2000ms
// 3. Promise stays pending for 2000ms
// 4. After 2000ms, resolve() is called
// 5. Promise becomes fulfilled
// 6. await resumes execution


// Advanced Implementation with Cancellation

function sleepwithCancel(ms) {
  let timeoutId;
  const promise = new Promise((resolve) => {
    timeoutId = setTimeout(resolve, ms);
  });
  // Add cancel method
  promise.cancel = () => {
    clearTimeout(timeoutId);
  }
  return promise;
}

// Usage
async function demo1() {
   console.log('Start');
  const sleepPromise = sleep(5000);
  // Cancel after 2 seconds
  setTimeout(() => {
    sleepPromise.cancel();
    console.log('Sleep cancelled!');
  }, 2000);

  await sleepPromise;
  console.log('This may not print if cancelled');
}

// Implementation with Rejection (Timeout)
function sleepWithRejection(ms, shouldReject = false ) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error(`Sleep timed out after ${ms}ms`));
      } else {
        resolve();
      }
    }, ms)
  })
}

async function demo2() {
  console.log("start");
  try {
    await sleepWithRejection(2000, false);
    console.log('Resolved after 1 second');
    
    await sleepWithRejection(2000, true);
    console.log('This will not print');
  } catch (error) {
    console.log('Error:', error.message);
  }
}

// sleep() with Value Return
function sleepReturns(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  })
}

// Usage
async function demo() {
  const result = await sleep(1000, 'Hello after 1 second');
  console.log(result); // "Hello after 1 second"
  
  const data = await sleep(2000, { name: 'Alice', age: 25 });
  console.log(data); // { name: 'Alice', age: 25 }
}

// Multiple sleep() Patterns
// Sequential Execution
async function sequential() {
  console.log('Start:', Date.now());
  
  await sleep(1000);
  console.log('After 1s:', Date.now());
  
  await sleep(1000);
  console.log('After 2s:', Date.now());
  
  await sleep(1000);
  console.log('After 3s:', Date.now());
  
  // Total time: ~3 seconds
}

// Parallel Execution
async function parallel() {
  console.log('Start:', Date.now());
  
  await Promise.all([
    sleep(1000),
    sleep(1000),
    sleep(1000)
  ]);
  
  console.log('After 1s:', Date.now());
  // Total time: ~1 second (all run simultaneously)
}






// Real-World Use Cases
// 1. Retry with Delay


async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(`Attempt ${i + 1} failed`);
      if (i < retries - 1) {
        await sleep(1000 * Math.pow(2, i)); // Exponential backoff
      }
    }
  }
  throw new Error('All retries failed');
}

// 2. Rate Limiting
async function rateLimitedRequests(urls) {
  const results = [];
  
  for (const url of urls) {
    const result = await fetch(url);
    results.push(result);
    await sleep(1000); // Wait 1 second between requests
  }
  
  return results;
}


// 3. Animation Timing
async function animate() {
  const element = document.getElementById('box');
  
  for (let i = 0; i < 100; i++) {
    element.style.left = i + 'px';
    await sleep(10); // 10ms per frame (~100fps)
  }
}



// 4. Polling
async function pollUntilReady(checkFn, interval = 1000, timeout = 30000) {
  const startTime = Date.now();
  
  while (true) {
    if (await checkFn()) {
      return true;
    }
    
    if (Date.now() - startTime > timeout) {
      throw new Error('Polling timeout');
    }
    
    await sleep(interval);
  }
}

// Usage
await pollUntilReady(async () => {
  const response = await fetch('/api/status');
  const data = await response.json();
  return data.ready;
}, 2000, 60000);


// Interview Practice Questions
// Q1: Implement sleep without async/await

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage with .then()
console.log('Start');
sleep(2000).then(() => {
  console.log('After 2 seconds');
});

// Q2: What's the difference between these?
// Version 1
async function v1() {
  await sleep(1000);
  await sleep(1000);
}

// Version 2
async function v2() {
  await Promise.all([sleep(1000), sleep(1000)]);
}
// Answer:
// v1() takes 2 seconds (sequential)
// v2() takes 1 second (parallel)


// Q3: Fix this code
// ❌ Wrong
for (var i = 0; i < 3; i++) {
  sleep(1000).then(() => console.log(i));
}
// Logs: 3, 3, 3

// ✅ Fixed
for (let i = 0; i < 3; i++) {
  sleep(1000).then(() => console.log(i));
}
// Logs: 0, 1, 2


// Key Takeaways

// call/apply: Execute immediately with context
// bind: Returns new function (doesn't execute)
// Symbol: Prevents property name collision
// sleep: Just a Promise wrapper around setTimeout
// await sleep(): Pauses async function execution

// Common Interview Questions:

// "Implement call/apply/bind from scratch" ✅
// "Why use Symbol in implementation?" ✅
// "What's the difference between call and apply?" ✅
// "How to pause async function execution?" ✅



// Critical Interview Points:
// Why use Symbol in call/apply?

// ❌ Without Symbol - property collision
const obj = { fn: 'important' };
obj.fn = function() {}; // Overwrites!

// ✅ With Symbol - no collision
const sym = Symbol('fn');
obj[sym] = function() {}; // Safe!




// Common sleep() Patterns
// Sequential (slow):
await sleep(1000);
await sleep(1000);
// Total: 2 seconds
// Parallel (fast):
await Promise.all([sleep(1000), sleep(1000)]);
// Total: 1 second



// Most Asked Follow-ups:
// "Why not just use a string property?"
// Symbol prevents property collision
// "Can you handle the 'new' keyword with bind?"
// Check this instanceof boundFunction
// "How to cancel sleep()?"
// Store timeoutId and add .cancel() method
// "sleep() without async/await?"
// Use .then(): sleep(1000).then(() => console.log('done'))



// https://claude.ai/chat/99f2374b-32d5-40d4-9ceb-a542bf0494c2

// https://chatgpt.com/c/69080662-ba08-8320-bd28-340315cd117f
// https://chatgpt.com/c/69080662-ba08-8320-bd28-340315cd117f