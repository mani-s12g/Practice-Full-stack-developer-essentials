// let and const are hoisted but differently

// let and const are hoisted in seperate different memory context called Script.
// here a is assigned undefined(hoisted)
// but when tried to access a it will error as - ReferenceError: Cannot access 'a' before initialization
// because for let - we need to initialize before we try to access let variable

// Temporal Dead Zone
// so a: undefined
// when a = 1, a: 1
// Time between assigning a: undefined and a: 1 is known as Temporal Dead Zone or
// Time since when let variable was hoisted and it is initialized some value,, the time between that is Temporal Dead Zone
// IN SHORT important sentence - When let is hoisted a: undefined, a is in Temporal Dead Zone, and when some value is
// initialized to a then Temporal Dead Zone ends

// So that why we got ReferenceError below, bcoz whenever we try to access the variable inside
// TDZ(Temporal Dead Zone) we get error (ReferenceError: Cannot access 'a' before initialization)
// we can only access let variable when we initialize some value to them i.e.,outside TDZ

// console.log(a); // ReferenceError: Cannot access 'a' before initialization
// let a = 1;
// var b = 100;

// accessing using this or window objects
// let a = 10;
// console.log(a);
// console.log(this.a); // undefined
// console.log(window.a); // ReferenceError: window is not defined

// Cant re declare let variables like below, gives error, js will not even run 1st line
// console.log("efefe");
// let a = 1;
// let a = 100; //SyntaxError: Identifier 'a' has already been declared
// or
// var a = 1000; // SyntaxError: Identifier 'a' has already been declared

// here its different for var
// below is valid, var allows to re declare same variables
// console.log("fefefe");
// let a = 1;
// var b = 10;
// var b = 100;

// let (stricter than var)
// let flexibility is that we can initialize let variables later in program
// let a; // just declaring not initializing here
// a = 300; // we can initializing here
// console.log(a); // valid prints 300

// ex of declaration and assignment
// var x; // Declaration
// x = 10; // Assignment
// var y = 20; // Declaration and assignment


// const (stricter than let)
// const b = 10;
// console.log(b);

// const b; // SyntaxError: Missing initializer in const declaration
// b = 100;
// console.log(b);

const b = 1000;
b = 10; // TypeError: Assignment to constant variable.
console.log(b);