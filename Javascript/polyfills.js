// https://claude.ai/chat/99f2374b-32d5-40d4-9ceb-a542bf0494c2
// Array.prototype.map Implementation
Array.prototype.myMap = function (callback, thisArg) {
  // Handle edge cases
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const result = [];
  const arr = Object(this);
  const len = arr.length >>> 0; // Convert to unsigned 32-bit integer

  for (let i = 0; i < len; i++) {
    // Check if property exists (handles sparse arrays)
    if (i in arr) {
      result[i] = callback.call(thisArg, arr[i], i, arr);
    }
  }
  return result;
};

// Test
const nums = [1, 2, 3];
console.log(nums.myMap((x) => x * 2)); // [2, 4, 6]

// Array.prototype.reduce Implementation
Array.prototype.myReduce = function (callback, initialValue) {
  if (this == null) {
    throw new TypeError("Array.prototype.myReduce called on null or undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const arr = Object(this);
  const len = arr.length >>> 0;
  let accumulator;
  let startIndex = 0;

  // Handle initialValue
  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    // Find first existing element
    let found = false;
    for (; startIndex < len; startIndex++) {
      if (startIndex in arr) {
        accumulator = arr[startIndex];
        startIndex++;
        found = true;
        break;
      }
    }
    if (!found) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
  }

  // Main loop
  for (let i = startIndex; i < len; i++) {
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};

const numsR = [1, 2, 3, 4];
console.log(
  numsR.myReduce((acc, val) => acc + val),
  0
);
console.log(nums.myReduce((acc, val) => acc + val));

// Array.prototype.filter Implementation
Array.prototype.myFilter = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.myFilter called on null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const result = [];
  const arr = Object(this);
  const len = arr.length >>> 0;
  
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      const val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  
  return result;
};

const numsF = [1, 2, 3];
// 0, 1, 2
// console.log(numsF.myFilter(x => x != 2))



// ❌ Common mistake
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }
// Output: 3, 3, 3 (not 0, 1, 2)

// An Immediately Invoked Function Expression (IIFE, pronounced "iffy") in JavaScript is a function that is defined and executed immediately after its creation. It is a common pattern used to create a private scope for variables, preventing them from polluting the global scope. 
// ✅ Fix with IIFE
// for(var i = 0; i < 3; i++) {
    // (function(j) {
        // setTimeout(() => console.log(j), 1000);
    // })(i);
// }
// Output: 0, 1, 2


// ✅ Fix with let (block scope)
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }
// Output: 0, 1, 2


// Method 3: Structured Clone Algorithm (Modern)
// Browser API (modern browsers + Node 17+)
function deepCloneStructured(obj) {
  return structuredClone(obj);
}

// ✅ Handles:
// - All primitives
// - Objects and Arrays
// - Date, RegExp, Map, Set, ArrayBuffer
// - Circular references
// - Typed Arrays

// ❌ Cannot clone:
// - Functions
// - DOM nodes
// - Property descriptors, getters, setters
// - Object prototypes

const original = {
  date: new Date(),
  map: new Map([['a', 1]]),
  set: new Set([1, 2, 3]),
  buffer: new ArrayBuffer(8)
};
original.self = original;

const cloned = structuredClone(original);
console.log(cloned, "cloned")

// Pros: Native, fast, handles most types, circular refs
// Cons: Can't clone functions, DOM nodes, not in older environments



// Method 4: Lodash cloneDeep (Production Standard)
// Using lodash (most robust in production)
import _ from 'lodash';

const loadCloned = _.cloneDeep(original);

// Handles:
// ✅ All built-in types
// ✅ Circular references
// ✅ Symbols
// ✅ Property descriptors
// ✅ Prototypes

// Still doesn't clone:
// ❌ Functions (keeps reference)
// ❌ DOM nodes

// Pros: Battle-tested, handles edge cases, widely used
// Cons: External dependency, bundle size

// Interview Answer Template
// When asked about deep cloning, mention:

// JSON.stringify/parse - Quick and dirty, but limited
// Recursive function - Most control, handles complex cases
// structuredClone - Modern native solution
// Library (lodash) - Production-ready

// Choose based on:

// Performance critical + simple data → JSON
// Need full control → Recursive
// Modern environment + no functions → structuredClone
// Production code → Lodash


// Method 2: Recursive Function (Most Common)
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  
  // Handle Map
  if (obj instanceof Map) {
    const cloneMap = new Map();
    obj.forEach((value, key) => {
      cloneMap.set(key, deepClone(value, hash));
    });
    return cloneMap;
  }
  
  // Handle Set
  if (obj instanceof Set) {
    const cloneSet = new Set();
    obj.forEach(value => {
      cloneSet.add(deepClone(value, hash));
    });
    return cloneSet;
  }
  
  // Handle circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    const cloneArr = [];
    hash.set(obj, cloneArr);
    obj.forEach((item, index) => {
      cloneArr[index] = deepClone(item, hash);
    });
    return cloneArr;
  }
  
  // Handle Object
  const cloneObj = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, cloneObj);
  
  // Copy all properties (including symbols)
  Reflect.ownKeys(obj).forEach(key => {
    cloneObj[key] = deepClone(obj[key], hash);
  });
  
  return cloneObj;
}

// Test with complex object
const original = {
  string: 'hello',
  number: 42,
  bool: true,
  date: new Date(),
  regex: /test/gi,
  array: [1, 2, { nested: 'value' }],
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  func: function() { return 'hi'; }
};
original.circular = original;

const recuriveCloned = deepClone(original);
console.log(recuriveCloned.date instanceof Date);        // true
console.log(recuriveCloned.regex instanceof RegExp);     // true
console.log(recuriveCloned.circular === recuriveCloned);         // true (maintains circular ref)
console.log(recuriveCloned !== original);                // true (different object)

// Pros: Handles most types, circular refs, maintains prototypes
// Cons: Doesn't handle functions (references them), complex implementation



// Deep Clone - Complete Analysis
// Method 1: JSON Serialization (Simplest, but Limited)

function deepCloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// ✅ Works for:
const simple = { a: 1, b: { c: 2 }, d: [3, 4] };
console.log(deepCloneJSON(simple));

// ❌ Limitations:
const complex = {
  date: new Date(),              // Becomes string
  regex: /test/gi,               // Becomes {}
  func: () => 'hello',           // Lost
  undefined: undefined,          // Lost
  nan: NaN,                      // Becomes null
  infinity: Infinity,            // Becomes null
  circular: null                 // Error!
};
complex.circular = complex;

// JSON.stringify will:
// - Convert Date to ISO string
// - Convert RegExp to {}
// - Omit functions
// - Omit undefined
// - Convert NaN/Infinity to null
// - Throw error on circular references

// Pros: Simple, fast, built-in
// Cons: Loses functions, dates, regexes, undefined, symbols; fails on circular refs




// Implement once()
// Basic Implementation

function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

// Test
const initialize = once(() => {
  console.log('Initializing...');
  return 'Initialized!';
});

console.log(initialize()); // Logs: "Initializing..." and returns "Initialized!"
console.log(initialize()); // Returns "Initialized!" (no log)
console.log(initialize()); // Returns "Initialized!" (no log)


// With Context Preservation
function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
      // Optional: allow garbage collection
      fn = null;
    }
    return result;
  };
}

// Test with object method
const counter = {
  count: 0,
  increment: once(function() {
    return ++this.count;
  })
};

console.log(counter.increment()); // 1
console.log(counter.increment()); // 1
console.log(counter.increment()); // 1

// Advanced: with Reset Capability
function once(fn) {
  let called = false;
  let result;
  
  const wrapper = function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
  
  wrapper.reset = function() {
    called = false;
    result = undefined;
  };
  
  return wrapper;
}

// Test
const fn = once(() => Math.random());
console.log(fn());       // 0.123456
console.log(fn());       // 0.123456 (same)
fn.reset();
console.log(fn());       // 0.789012 (new value)