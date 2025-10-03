// ex 1
// x is no wheere initialized in the program and we are tring to access it so error
// console.log(x); // ReferenceError: x is not defined

// ex2
console.log(x);
var x = 5;

// ex3
// console.log(getName);
// function getName() {
//     console.log("mani");
// }
// console.log(getName);

//ex4
// getName();
// console.log(getName);
// console.log(x); // ReferenceError: x is not defined, and program not even goes to next line
// function getName() {
//     console.log("mani");
// }

// ex5
// getName3();
// // getName2(); //TypeError: getName2 is not a function
// // getName(); //TypeError: getName is not a function 
// console.log(getName);
// console.log(x);
// var x = 6;
// // here as getName is arrow fn, so it doesnt behave like fn , but behaves like variable
// // so like other variables, undefined is stored in getName
// // fn using arrow fn
// var getName = () => {
//     console.log("mani");
// }
// // another way of writing fn using varibales, here also same error
// var getName2 = () => {
//     console.log("mani2");
// }
// function getName3() {
//     console.log("mani3");
// }