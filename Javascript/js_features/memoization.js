// Memoization Function
// Cache results of expensive function calls to improve performance.


function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("key found in cache... !")
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    console.log(this, "this", result, "result", args, "args")
    cache.set(key, result);

    console.log("NOT found key in cache... !")
    return result;
  }
}




// Example
const slowSquare = n => {
  console.log('Calculating...');
  return n * n;
};

const fastSquare = memoize(slowSquare);
console.log(fastSquare(4), "slow..."); // "Calculating..." → 16
console.log(fastSquare(4), "return cached !"); // "key found in cache... !" → 16