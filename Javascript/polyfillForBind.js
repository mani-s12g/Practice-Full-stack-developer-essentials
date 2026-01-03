// what is polyfill ?
// Polyfill is sort of a browser fallback, so what if suppose our browser does not have bind fn, 
// in that case we have to write our own bind fn

let name = {
  firstname: "Mani",
  lastname: "kanta",
};

let printFullName = function (hometown, state, country) {
  console.log(this.firstname + " " + this.lastname + " from " + hometown + " , " + state + " , " + country);
};

// bind - passing name as a reference to the 'this' variable inside printFullName method
let printName = printFullName.bind(name, "Bengaluru");
// let printName = printFullName.bind(name, "Bengaluru", "India");
// printName("karnataka");
printName("karnataka", "India");


// Important *
// Implement Function.prototype.myBind()
// custom bind method - myBind() fn
Function.prototype.myBind = function (...args) {
    // over here this is printName method
    // this -> printName method
    // so store 'this' in variable like below
    let obj = this,
        params = args.slice(1); //after slicing we get result as another array again, so we cant pass an array as the 2nd argument to
        // the call method so we should use now apply mthod here
    return function (...args2) {
        // like this we need name reference here, obj.call(name);
        // obj.call(args[0], params);
        // obj.apply(args[0], params);
        // 2nd args parameter from calling fn printName2() fn itself
        // we should concatenate params and args2, without doing like this we cant pass another args2 here so
        obj.apply(args[0], [...params, ...args2]);
    }
}

// when we call myBind() method over printName method, inside myBind, 'this' variable points to printName method. 
// let printName2 = printFullName.myBind(name, "Bengaluru", "karnataka"); // multiple args
// printName2("India");
let printName2 = printFullName.myBind(name, "Bengaluru");
printName2("karnataka", "India"); // multiple args2





// https://chatgpt.com/c/69080662-ba08-8320-bd28-340315cd117f
// Implement Function.prototype.myBind()
// Function.prototype.myBind = function (context, ...args) {
//   const fn = this;
//   return function (...newArgs) {
//     return fn.apply(context, [...args, ...newArgs]);
//   };
// };

// // Example
// function sayHello(greeting) {
//   console.log(`${greeting}, ${this.name}`);
// }

// const user = { name: 'Bob' };
// const bound = sayHello.myBind(user, 'Hi');
// bound(); // Hi, Bob
