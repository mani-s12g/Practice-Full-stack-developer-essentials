// what is Scope ?
// scope is where we can access specific variables and functions in our code

// what is Lexical environment ?
// whenever global execution context is created, a lexical environment is also created 
// along. 
// So Lexical environment is local memory along with Lexical environment of its parent

// Lexical means in hierarchy or in order or sequence
// continue on line 31...

// ex1
// function a() {
//     console.log(b);
// }
// var b = 10;
// a();

// ex2
function a() {
  c();
  function c() {
    console.log(b);
  }
}
var b = 10;
a();

// ex3

// ex2 - Lexical environment topic code
function a() {
  var b = 10;
  c();
  function c() {}
}
a();
console.log(b); //ReferenceError: b is not defined

// Lexical - function c() is Lexically sitting inside function a() or
// function c() is physically present or sitting inside function a()

// and function a() is sitting inside Global scope (Global Execution Context)

// BUT function a() has access to lexical environment of its parent i.e., Global Execution Context 
// BUT Global Execution Context doesn't have parent right so no lexical environment 
// so Global scope (Global Execution Context) points to null


// what is Scope Chain ?
// Nothing but the chaining of the same above scopes mentioned is scope chain
// ex2 explanation
// suppose we trying to console.log(b) inside funtion c() right?

// so if b is not inside function c() then it will check is lexical parent function a(), so if a in its local memory has b value
// its prints or else again js will try to check function a()'s lexical parent i.e., global execution context,
// so if b is present inside global execution context then it prints b or else it again checks its parent lexical scope
// so we know it trys checking global execution context's parent's lexical scope , but glpbal execution context doesn't have parent
// and it will be pointing to null right? so it gives answer as not defined 

// c() will have reference to its parent's lexical environment , a() will have reference to its parent lexical environment and
// global execution context will be pointing to null BECAUSE it doesn't have any parent right so

// THIS is known as Scope Chain in js


// Local memory + reference to lexical environment of its parent - LEXICAL ENVIRONMENT