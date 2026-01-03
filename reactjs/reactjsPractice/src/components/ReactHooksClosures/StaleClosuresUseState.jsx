import { useRef } from "react";
import { useEffect, useState } from "react";

export default function StaleClosuresUseState() {
    const [count, setCount] = useState(0);
    // to solve stale closures
    const latestCountRef = useRef(count);

    const handleClick = () => {
        // This function "closes over" the 'count' value from the render in which it was defined.
        // console.log(`Count when clicked: ${count}`);
        setCount(count + 1);
        // latestCountRef.current = count; // here previous count value is stored(dont update ref here, instead update ref in useEffect)
    };
    useEffect(() => {
        latestCountRef.current = count;
    }, [count]);

    // useEffect and Stale Closures: The closure concept becomes crucial when dealing with hooks
    //  like useEffect, useCallback, or useMemo, especially with asynchronous code or timers. 
    // If you create a function inside an effect that relies on a state variable but don't include 
    // that variable in the effect's dependency array, the function will use the outdated value from
    // the initial render (a "stale closure").
    // Stale Closure Example:
    useEffect(() => {
        const intervalId = setInterval(() => {
            // This function closes over count as 0 from the initial render and never updates.
            // console.log(`Count in interval: ${count}`);
            console.log(`Count in interval ref: ${latestCountRef.current}`);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs only once
    // Clicking "Increase" updates the UI, but the console continues to log "Count is: 0"
    // because the setInterval callback has a stale reference to count. 

    return (
        <div>
            <h1>Counter</h1>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Increment</button>
        </div>
    )
}


/*
// https://share.google/aimode/bNHBM5f95OiEZOtZr
How Closures Work with React Hooks

*useState and Event Handlers: When you define an event handler (e.g., an onClick function)
inside a functional component, it "closes over" or "remembers" the count state variable and the setCount
function from that specific render. When the user clicks the button later, 
the event handler uses the count value it remembered from when it was created.

*In this scenario, React's re-rendering mechanism ensures that a fresh handleClick function with the
latest count value is generated with each render, so it generally "just works".

q: I did not understand still that usestate one? what is closes over the count ? please explain to me like easily

When you write a function inside another function, the inner function "remembers" or "closes over" 
the variables from its surrounding scope. In the context of React's useState in a functional component, this means:

1. New Functions Every Render
Imagine your Counter component is a factory that runs every time the state changes.
Render 1 (Initial):
count is 0.
React creates a new handleClick function.
This new handleClick function has 0 "baked into" it because that was the value of count at that moment.
Render 2 (After First Click):
count is now 1.
React creates a brand new handleClick function (the old one from Render 1 is gone).
This new function has 1 "baked into" it.
2. "Closes Over the Count" Explained Easily
"Closes over the count" means the handleClick function keeps a reference to the specific count variable from the render in which it was created.
It's like a person taking a snapshot of a whiteboard:
You render the component.
The count is 0.
The handleClick function takes a snapshot of that count variable. Its internal instructions are essentially: console.log("Count is 0"); setCount(0 + 1);
The user clicks the button.
The function runs and uses the value from its snapshot (0).
React handles this seamlessly for event handlers because it re-renders the component every time the state changes, thus generating a new event handler with a 
new snapshot of the latest state. The old event handler is replaced.

The Problem (Stale Closures)
The "stale closure" problem happens when you create a function that doesn't get replaced on every render, like one inside a setTimeout 
or setInterval with an empty dependency array ([]). That function keeps holding onto its original, outdated snapshot.

// Imagine this function only runs once and sticks around:
const handleClick = () => {
  // If this function never changes, it will ALWAYS remember count was 0.
  console.log(`Count is: ${count}`);
};

Because event handlers (onClick) in React functional components are short-lived and re-created with every render, you usually don't experience stale closures with them. 
They always get the fresh closure with the updated count value.


Solutions for Stale Closures
To avoid stale closures, you can use the following best practices:
Correct Dependency Arrays: The react-hooks/exhaustive-deps ESLint rule helps enforce this. Including count in the useEffect dependency array will re-run the effect (clearing the old interval and starting a new one with the current count value) whenever count changes.
Functional State Updates: For state updates based on the previous state, use the functional form of the state updater function. React provides the latest value as an argument to this function.

setCount(prevCount => prevCount + 1);


*/
