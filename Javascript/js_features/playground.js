const str = "mani"
console.log(str.split(""))

const arr = ["mani", "lop", "pop"]
console.log(arr.join(""))


// Array.from
// The static method Array.from() in JavaScript creates a new, 
// shallow-copied Array instance from an iterable or array-like object. 


// Array.from(items)
// Array.from(items, mapFn)
// Array.from(items, mapFn, thisArg)

// items: An iterable or array-like object to convert to an array. 
// This can include strings, Sets, Maps, NodeLists, or the arguments object.

// ex

// From a String: Each character becomes an element in the new array.
console.log(Array.from("mani"));

// From an Array-like Object (e.g., arguments):
function f() {
    return Array.from(arguments);
}
console.log(f(1, 2, 3));
// Expected output: Array [1, 2, 3]


// With a mapFn: Manipulate elements during creation without an intermediate array
console.log(Array.from([1, 2, 3], (x) => x + x));


// Generating a Sequence of Numbers: Useful for creating a range of numbers.
console.log(Array.from({ length: 5 }, (_, i) => i + 1));

console.log([...Array(5).keys()])