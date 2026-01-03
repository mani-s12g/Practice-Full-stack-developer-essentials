// let name = {
//     firstname: "Mani",
//     lastname: "kanta",
//     printFullName: function () {
//         console.log(this.firstname + " " + this.lastname)
//     }
// }

// name.printFullName();

// let name2 = {
//     firstname: "Akshay",
//     lastname: "saini",
// }

// // function borrowing - using other object's methods
// // .call(name2) // we want this to be pointing to name2 object so use .call(name2)
// name.printFullName.call(name2);

// let name = {
//   firstname: "Mani",
//   lastname: "kanta",
// };
// generally we keep our function outside like this and use so
// let printFullName = function (hometown, state) {
//   console.log(this.firstname + " " + this.lastname + " from " + hometown + ", state " + state);
// };

// printFullName.call(name, "Bengaluru", "karnataka");

// let name2 = {
// firstname: "Akshay",
// lastname: "saini",
// };

// function borrowing - using other object's methods
// .call(name2) // we want this to be pointing to name2 object so use .call(name2)
// call method
// printFullName.call(name2, "Mumbai", "maharashtra");

// apply method
// printFullName.apply(name2, ["Mumbai", "maharashtra"]);



// what is bind method ?
// Bind method - It looks exactly like call method, but instead of calling the function directly like call,
//  what bind does is that, it binds printFullName method with object name2 and returns us the copy of that method

// bind method 
// doesnt call fn directly like call and apply methods, but returns the function which we can call later as below
// let printNameUsingBind = printFullName.bind(name2, "Mumbai", "maharashtra");
// console.log(printNameUsingBind); // returns printFullName fn
// printNameUsingBind();

// line 52: creates the copy of printFullName method and it will bind that with name2 object and returns that fn, but it doesnt directly 
// calls this method (printFullName) as in call, bind method only returns us the copy of that printFullName method, 
// which we can call later


// call method
// It will invoke a fn directly by passing in the reference which points to the 'this' variable inside the method (printFullName)

// apply method
// It is exactly same as the call method, only difference is that it takes 2nd arguments as a array list of the parameter
//  which needs to passed to the printFullName fn


// https://chatgpt.com/c/69080662-ba08-8320-bd28-340315cd117f

// call(), apply(), bind()
// 🔹 call() → invokes with given this & arguments (comma-separated)
// 🔹 apply() → invokes with given this & arguments (array)
// 🔹 bind() → returns a new function with this bound


const user = { name: 'Alice' };
function greet(greeting, punctuation, lo) {
  console.log(`${greeting}, ${this.name}${punctuation} ${lo}`);
}

// greet.call(user, 'Hello', '!');    // Hello, Alice!
// greet.apply(user, ['Hi', '...']);  // Hi, Alice...
const boundFn = greet.bind(user, 'Hey', '@@');
boundFn('!!');                      // Hey, Alice?
