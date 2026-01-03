// ⚖️ 4. Difference between == and === (Coercion)
// Operator	 Compares	     Coercion
// --------------------------------
// ==	         Value only	     ✅ Yes
// ===	         Value + Type	 ❌ No


console.log(2 == '2');   // true (string → number)
console.log(2 === '2');  // false (different types)

console.log(false == 0);   // true  (false → 0)
console.log(false === 0); // false

console.log(null == undefined);  // true

// ✅ Use === always to avoid implicit coercion bugs.