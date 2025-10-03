// what is undefined ?
// undefined is like a placeholder which is kept inside the variables, and it states that 
// that variable in the whole code was not assigned any value

// so we should never do like
var a;
a = undefined // never do this coz of above statements, never do manually any variable as undefined
// coz its js job to assign this placeholder or keyword undefined when user doesn't assign value
// to any variable.
// And when user assigns value to that variable, then js will automatically removes that undefined 
// placeholder or keyword previously assigned to variable and js will assign the latest assigned value
//to that variable so

//we should never assign undefined manually

// to maintain consistency of code quality,

// though it is completely fine and when console.log(a) it works fine 
// but its not good practice to assign undefined manually


// ex1
// console.log(x); // allocated memory space so have placeholder undefined
// var x = 10;

// ex2
// console.log(a); // a value (placeholder) will be undefined throughout the program, coz 
// not assigned any value so
// var a;

// ex3
var b;
console.log(b);
// b = 20;

if(b === undefined) {
    console.log("b === undefined");
} else {
    console.log("b has value")
}