import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

function UseRef2() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef();

  //   let  timer; // wrong: re-declare each time
  //   const start = () => {
  //     timer = setInterval(() => {
  //       setSeconds((s) => s + 1);
  //     }, 1000);
  //   };
  const start = () => {
    // console.log("start called");
    // if(intervalRef.current !== null) return;
    // or call stop()
    stop(); // clears existing timer if any - ensure no duplicate timers
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  const stop = () => {
    // console.log("stop called");
    clearInterval(intervalRef.current);
    intervalRef.current = null; // good hygiene
    // console.log(intervalRef.current, "ic")
    // clearInterval(timer); // wont work (X)
  };

  const reset = () => {
    stop();
    setSeconds(0);
  }

  useEffect(() => {
    return () => stop(); // cleanup (timers, etc,.) on unmount
  }, []);

  return (
    <>
      <p>Seconds: {seconds}</p>
      <button onClick={start}>start timer</button>
      <button onClick={stop}>stop timer</button>
      <button onClick={reset}>reset timer</button>
    </>
  );
}

export default UseRef2;


// Why useRef fixes it ?
// useRef creates a container object ({ current: null }) that persists across renders:
// The interval ID is saved in timerRef.current.
// Even if the component re-renders (because seconds changes), that ref object is the same one — not recreated.
// So when you call Stop, clearInterval(timerRef.current) clears the right interval.

// Cleanup with useEffect
// Yes — if you set an interval, you should clear it when the component unmounts. Otherwise, the timer will keep running in memory even after your component is gone.

// Should you call stop() before starting a new interval?
// It depends:
// If you only ever call Start once, then you don’t need to clear before starting.
// But in practice, people sometimes click Start again by accident. Without stop(), you’d have multiple intervals running at once, all incrementing seconds.
// So calling stop() before setInterval is a safe practice to guarantee only one timer exists.

// That’s not strictly required for clearInterval to work. It’s just a cleanup practice:
// When you call clearInterval(intervalRef.current), the interval is stopped — but the number ID still sits inside intervalRef.current.
// If you later check intervalRef.current, it will still hold that old ID (even though it’s no longer valid).
// By resetting it to null, you make it clear in your own code that “there is no active timer right now.”
// It’s basically about avoiding confusion and keeping the state of your ref accurate.

// So:
// ✅ clearInterval(...) is enough technically.
// 👍 Setting intervalRef.current = null is optional, but makes it easier to reason about your logic (like: is a timer running? If yes, intervalRef.current !== null).



// Why the plain let timer; breaks in React ?
// On the first render, timer is defined for that render.

// You click Start, it sets the interval and stores the ID in timer.

// Then setSeconds causes a re-render.

// On the new render, let timer; runs again → so timer is reset to undefined for that render.

// Now when you click Stop, clearInterval(timer) is actually clearInterval(undefined) → so nothing gets cleared.

// That’s why it looks like “stop isn’t working.”