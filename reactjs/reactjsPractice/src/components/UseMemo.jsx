import React from "react";
import { useMemo } from "react";
import { useState } from "react";

function UseMemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 👉 Without useMemo, the expensive calculation would run on every keystroke in the input.
  //   const expensiveValue = () => {
  // console.log("Calculating...")
  // return count * 1000;
  //   };

  // 👉 With useMemo, it only recalculates when count changes.
  // Expensive calculation (simulated)
  // const expensiveValue = useMemo(() => {
  //   console.log("Calculating...");
  //   return count * 1000;
  // }, [count]); // Only recalculates when 'count' changes


  // const calculateExpensiveValue = () => {
  //   console.log("Calculating...");
  //   return count * 1000;
  // };
  const calculateExpensiveValue = useMemo(() => {
    console.log("Calculating...");
    return count * 1000;
  }, [count]);

  return (
    <div>
      <h2>Count: {count}</h2>
      {/* <h3>Expensive Value: {expensiveValue()}</h3> */}
      {/* <h3>Expensive Value: {expensiveValue}</h3> */}

      {/* <h3>Expensive Value: {calculateExpensiveValue()}</h3> */}
      <h3>Expensive Value: {calculateExpensiveValue}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

export default UseMemo;


// UseMemo.jsx:37 Uncaught TypeError: calculateExpensiveValue is not a function at UseMemo (UseMemo.jsx:37:29)
// why this error?
// You're getting this error because useMemo returns the computed value itself, not a function.

// https://chatgpt.com/c/692a996a-b484-8324-976d-eadac0bf38a5