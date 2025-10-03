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
