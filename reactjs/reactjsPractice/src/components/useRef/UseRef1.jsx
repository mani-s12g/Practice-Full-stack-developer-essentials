import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function UseRef1() {
  const [count, setCount] = useState(0);
  const prevCount = useRef(null);

  useEffect(() => {
    console.log("useEffect useRef");
    prevCount.current = count; // updates after dom has rendered.. 
    // so whatever updated will apppear on next render(hence previous)
  }, [count]);
  // prevCount.current = count; // updates same time as count

  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <>
      <p>
        <button onClick={() => setCount((c) => c + 1)}>Click to count</button>
        Now: {count}, Before: {prevCount.current}
      </p>
      <p>Component rendered {renderCount.current} times</p>
    </>
  );
}

export default UseRef1;

// Keeping Previous State/Prop
// 👉 Sometimes you need to compare current vs previous values.
// ✅ Use for analytics, logging, or animations based on previous values.

// when clicked button , why is it showing rendered 2 times each time i click button once? counter is increasing twice each time?it should increase each time by one right?
// 👍 This is a common confusion when using React 18 with useRef to count renders.

// Here’s what’s happening:
// Why it renders twice
// In React 18 development mode (with StrictMode enabled in index.js),
// React intentionally mounts, unmounts, and re-mounts components twice to help you detect
//  unexpected side effects.
// This only happens in development mode, not in production builds.
// So each time you click the button, React causes two renders:

// First render → state updates → useEffect runs.
// React immediately re-renders again to check if your component logic is safe (double invoke for dev).
// That’s why your renderCount.current++ is increasing by 2.

// Example:
// If you click once:
// Expected: 1 render.
// Actual (dev mode with StrictMode): 2 renders.



// https://chatgpt.com/c/69159ddf-842c-8322-8020-aa647c4f9aab