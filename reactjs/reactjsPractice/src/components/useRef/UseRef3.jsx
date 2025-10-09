// Preventing Re-run of Effects
// 👉 Sometimes you want an effect to skip the first render but run on updates.

import React, { useEffect, useState, useRef } from "react";

function UseRef3 () {
  const [value, setValue] = useState(0);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
        // please remove strictmode in main.js or index.js, then useEffect runs only one time
      firstRender.current = false; // skip first run
      console.log("Skip Effect");
      return;
    }
    console.log("Effect ran on update:", value);
  }, [value]);

  return (
    <>
      <button onClick={() => setValue((v) => v + 1)}>Count</button>
      <p>{value}</p>
    </>
  );
}

export default UseRef3;
// ✅ Use for debouncing initial effect runs, like analytics events.


// Summary of Situations to Use useRef

// When you need direct DOM access (focus, scroll, animations).

// When you want a mutable value that persists across renders without causing re-renders.

// When storing timers, event listeners, or third-party instance references.

// When you need previous values for comparison.

// When working with integrations (Canvas, video players, external libraries).