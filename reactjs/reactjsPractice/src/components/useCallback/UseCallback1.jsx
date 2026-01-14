import React, { useState, useCallback } from "react";

// React.memo prevents child re-renders when props haven’t changed.
// when received new function prop child will render

// ❌ Without React.memo
// function Child({ onClick }) {
//   console.log("Child rendered !!");
//   return <button onClick={onClick}>Click Me</button>;
// };

// ✅ With React.memo
const Child = React.memo(function Child({ onClick }) {
  console.log("Child rendered! & re-created");
  return <button onClick={onClick}>Click Me</button>
})

// or
// const Child = React.memo(({ onClick }) => {
// console.log("Child rendered!");
// return <button onClick={onClick}>Click Me</button>
// })
export default function UseCallback() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ❌ Without useCallback
  // Every render creates a new function instance
  // function is same, re-calculates same thing every time so using useCallback to 
  // prevent re-calculations and re-renders
  // const handleClick = () => {
  //   setCount(count + 1)
  //   console.log("set count is running...")
  // };

  // ✅ With useCallback
  // const handleClick = useCallback(() => {
  //   setCount((prev) => prev + 1);
  // }, []); // depends on nothing, so it stays the same function instance

  //   Function is re-created whenever either count or text changes.
  // Useful if your function needs the latest values from multiple states/props.
  const handleClick = useCallback(() => {
    console.log("Count:", count, "Text:", text);
    setCount((prev) => prev + 1);
  }, [count]);

  return (
    <div>
      <h2>Count: {count}</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <Child onClick={handleClick} />
    </div>
  );
}



// Without useCallback
// Every time App re-renders (like when typing in the input), handleClick is recreated.

// With useCallback
// handleClick is memoized and only re-created when dependencies change.
// Since the dependency array is [], the function instance never changes.


// 🧑‍💻 When to prefer each
// Use useMemo when you want the result (value/array/object).
// Example: filtering, sorting, expensive math.

// Use useCallback when you want a stable function reference.
// Example: passing a callback to a React.memo child.


// can we use useCallback inplace of useMemo?
// The short answer: sometimes yes, but not always.
// ⚡ So, can we replace?
// Yes technically:
// Using useMemo
// const value = useMemo(() => computeExpensive(count), [count]);

// Using useCallback
// const getValue = useCallback(() => computeExpensive(count), [count]);
// const value = getValue(); // must call function manually


// But 🔴 not equivalent in intent:
// useMemo → memoizes a value directly.
// useCallback → memoizes a function that you call later.