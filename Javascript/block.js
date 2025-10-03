// Block scope {}
// Block scope has seperate memory called Block
// variables and functions in block { } will appear and created inside the Block scope memory

// here
// var // created and will only exits in Global scope
// let & const is created inside Script memory , but here let is used inside block statement so in Block scope

// so when we come out of block statement we cant access let & const - so let & const are Block scope variables here
// but we can access var utside block scope also - Bcoz var is in global scope

// {
//   var a = 1; // created and will only exits in Global scope
//   let b = 10; // created and will only exits in Block scope
//   const c = 100; // created and will only exits in Block scope

//   console.log(a);
//   console.log(b);
//   console.log(c);
// }

// console.log(a);
// // console.log(b); // ReferenceError: b is not defined, cant access b & c
// console.log(c); // ReferenceError: c is not defined


// Shadowing in js

// shadowing in var
// var a = 100;
// {
//     var a = 1; // here a shadowed above's a, bcoz both a's are in global scope so
//     console.log(a); // this also points to global memory space
// }
// console.log(a); // this also points to global memory space
// Memory context
// Block: {

// }
// Global: {
//     a = 100; // this 100 will become 10 here only in global context, bcoz a is in global memory context only not block scope
// }



// cant re declare b as var also bcoz already let b or const b is there
// let b = 100;
// const b = 100;
// {
//     var b = 1000; // SyntaxError: Identifier 'b' has already been declared
//     console.log(b);
// }



// shadowing in let & const
// var a = 10;
// let b = 100;
// const c = 1000;
// {
//     var a = 100;
//     let b = 10;
//     const c = 1;
//     console.log(a); // 100 - here a is shadowed
//     // console.log(b); // 10 - here b is block scope so shadowed
//     // console.log(c); // 1 - here c is block scope so shadowed
// }
// console.log(a); // here 100 only not 10 (shadowed here also) - here a is global scope only so
// console.log(b); // here 100 only not 10 (not shadowed here) - here b is script scope
// console.log(c); // here 1000 only not 1 (not shadowed here) - here c is script scope

// Memory context
// Block: {
//     b = 10;
//     c = 1;
// }
// Script: {
//     b = 100;
//     c = 1000;
// }
// Global: {
//     a = 10; // becomes 100 after shadowing so 
//     a = 100; // now present after shadowing
// }


// illegal shadowing

// illegal shdowing using var
// var a = 20;
// console.log(a);
// {
//     var a = 100;
//     console.log(a);
// }
// console.log(a); // 100 (can be shadowed using var)


// illegal shdowing using let
// can't do illegal shadowing using let, coz it throws following error
// let a = 20;
// console.log(a);
// {
//     var a = 100; // SyntaxError: Identifier 'a' has already been declared
// }
// console.log(a);

// but using var first and let in block is ok(will be )
// var a = 20;
// {
//     let a = 40;
//     console.log(a);
// }
// console.log(a);

// This is fine shadowing, coz its not breaking let boundries here
// let a = 20;
// function x() {
//     var a = 100;
//     console.log(a);
// }
// x();
// console.log(a);

// using const its fine
// coz all are in there lexical scope
const a = 20;
{
    const a = 30;
    console.log(a);
    {
        const a = 40;
        console.log(a);
        {
            const a = 60;
            console.log(a);
        }
    }
}
console.log(a);

// Memory Context
// Block: {
//     a : 60
// } 
// Block: {
//     a : 40
// } 
// Block: {
//     a : 30
// } 
// Global: {
//     a : 20
// } 

// using let its fine
// let a = 20;
// {
//     let a = 30;
//     console.log(a);
// }
// console.log(a);