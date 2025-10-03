// // All about this keyword

// Great question! In JavaScript, `this` is a special keyword that behaves differently depending on **how** and **where** it’s used. Let’s break it down thoroughly.

// ---

// ## 🔑 Core Idea

// `this` refers to the **context** in which a function is executed. That context depends on:

// 1. **How the function is called**
// 2. **Whether strict mode is enabled**
// 3. **Whether it’s an arrow function or not**

// ---

// ## 1. **Global Context**

// * In browsers (non-strict mode):

//   ```js
//   console.log(this); // window
//   ```
// * In Node.js (non-strict mode):

//   ```js
//   console.log(this); // {} (empty object, not global)
//   ```
// * In **strict mode**:

//   ```js
//   'use strict';
//   console.log(this); // undefined
//   ```

// ---

// ## 2. **Inside a Function**

// ```js
// function test() {
//   console.log(this);
// }
// test();
// ```

// * Non-strict: `this` is the **global object** (`window` in browsers).
// * Strict mode: `this` is **undefined**.

// ---

// ## 3. **Inside an Object Method**

// ```js
// const obj = {
//   name: "Alice",
//   greet() {
//     console.log(this.name);
//   }
// };
// obj.greet(); // "Alice"
// ```

// Here, `this` refers to the object `obj`, because the method was called on it.

// ---

// ## 4. **Arrow Functions**

// Arrow functions **don’t bind their own `this`**. They “inherit” it from the **surrounding lexical scope**.

// ```js
// const obj = {
//   name: "Alice",
//   greet: () => {
//     console.log(this.name);
//   }
// };
// obj.greet(); // undefined (because `this` is not `obj`, it's global/undefined)

// function outer() {
//   return () => console.log(this);
// }
// outer().call({x: 1}); // {x: 1} (inherited from outer)
// ```

// ---

// ## 5. **In Classes**

// Classes use `this` similarly to objects:

// ```js
// class Person {
//   constructor(name) {
//     this.name = name;
//   }
//   greet() {
//     console.log(`Hi, I'm ${this.name}`);
//   }
// }
// const p = new Person("Bob");
// p.greet(); // "Hi, I'm Bob"
// ```

// ---

// ## 6. **Event Handlers**

// ```js
// const button = document.querySelector("button");

// button.addEventListener("click", function () {
//   console.log(this); // the button element
// });

// button.addEventListener("click", () => {
//   console.log(this); // inherits from outer scope (usually window)
// });
// ```

// ---

// ## 7. **Manually Binding `this`**

// JavaScript lets you control `this` explicitly:

// * **call** – invokes immediately with given `this`:

//   ```js
//   function sayHello() {
//     console.log(this.name);
//   }
//   sayHello.call({ name: "Eve" }); // "Eve"
//   ```

// * **apply** – like `call` but arguments are an array:

//   ```js
//   sayHello.apply({ name: "Eve" }, []);
//   ```

// * **bind** – returns a new function with `this` permanently set:

//   ```js
//   const bound = sayHello.bind({ name: "Eve" });
//   bound(); // "Eve"
//   ```

// ---

// ## 8. **Constructor Functions**

// When used with `new`, `this` refers to the newly created object:

// ```js
// function Person(name) {
//   this.name = name;
// }
// const p = new Person("Sam");
// console.log(p.name); // "Sam"
// ```

// ---

// ## 9. **Default Binding vs. Implicit Binding vs. Explicit Binding**

// * **Default binding**: function call → global/undefined
// * **Implicit binding**: method call → object before dot
// * **Explicit binding**: use `.call`, `.apply`, `.bind`
// * **New binding**: `new` keyword → new object

// ---

// ✅ **In summary:**

// * `this` is **not determined by where a function is defined**, but by **how it’s called** (except arrow functions).
// * Four main rules: default, implicit, explicit, and new binding.
// * Arrow functions inherit `this` from their enclosing scope.

// ---

// Do you want me to also create a **visual cheat sheet diagram** for `this` in JavaScript? That could help you memorize it super fast.
