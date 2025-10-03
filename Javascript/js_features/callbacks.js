// What is a Callback?
// A callback is a function passed as an argument to another function, to be executed later when an async operation completes.
// Why Callbacks?
// JavaScript is single-threaded and non-blocking. Callbacks allow you to execute code after an async operation finishes without blocking the main thread.


// Callback Example
// Traditional callback approach
// ex1

// function fetchData(callback) {
//     setTimeout(() => {
//         const data = { id: 1, name: "John" };
//         callback(data);
//     }, 1000);
// }
// fetchData((data) => {
//     console.log(data);
// })

// google ex2
function greet(name, callback) {
    console.log(`Hello, ${name}`);
    callback(); // The callback function is executed here
}

function sayGoodbye() {
    console.log("Goodbye!");
}

greet("Alice", sayGoodbye); // sayGoodbye is passed as the callback
// In this example, sayGoodbye is a callback function passed to greet. After greet logs its message, it then calls sayGoodbye.
