// Closures with Performance Hooks
// Hooks like useCallback and useMemo specifically leverage closures for performance
// optimization by memoizing(caching) functions or values.
// useCallback: This hook returns a memoized version of a callback function that only
//  changes when one of its dependencies changes.This is useful for passing functions
//  to child components, preventing the child from re - rendering unnecessarily because
//  the function reference remains the same across renders(as long as dependencies are unchanged).

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";


// const memoizedCallback = useCallback(() => {
//     doSomething(count);
// }, [count]); // The function is only re-created when 'count' changes




// useMemo: This hook computes and caches a value (not a function). The function you provide runs
//  only when its dependencies change. It "closes over" the inputs and re-calculates the result
// only when a dependency changes, avoiding expensive computations on every render.

// const memoizedValue = useMemo(() => expensiveFn(a, b), [a, b]);


// Closures with useRef
// The useRef hook offers a way to bypass typical closure behavior when you need a
// mutable value that persists across renders without triggering re - renders.
// The ref object itself is consistent across renders, but its current property can be changed.
// When a function closes over a ref, it always accesses the current, up - to - date value of ref.current,
// not the value it had at the time the function was created. This makes useRef a useful tool for scenarios
// where a stale closure would otherwise be an issue, such as managing interval IDs.




// Closures with useRef
// The useRef hook offers a way to bypass typical closure behavior when you need a mutable value
// that persists across renders without triggering re-renders.
// The ref object itself is consistent across renders, but its current property can be changed.
// When a function closes over a ref, it always accesses the current, up-to-date value of ref.current,
// not the value it had at the time the function was created. This makes useRef a useful tool for
// scenarios where a stale closure would otherwise be an issue, such as managing interval IDs.


export default function ClosuresWithUseRef() {
    const [count, setCount] = useState(0);
    const latestCountRef = useRef(count);

    useEffect(() => {
        // Update the ref to always hold the latest count
        latestCountRef.current = count;
    }, [count]); // Only run this effect when count changes

    const showAlert = () => {
        setTimeout(() => {
            // This function closes over the 'latestCount' ref object itself.
            // When it runs, it reads the current value of latestCount.current, which is always the latest count.
            console.log(`Count when clicked: ${latestCountRef.current}`);
        }, 1000)
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={showAlert}>Show Alert</button>
        </div>
    );
}



// Closures Power Custom Hooks

// Custom hooks rely heavily on closures to encapsulate logic and state.
// The functions returned by your custom hook "close over" the internal state variables,
// allowing components that use the hook to interact with that state without direct access
// to the inner workings. This allows you to create reusable, self-contained pieces of stateful logic.


// ESLint is Your Best Friend
// The eslint-plugin-react-hooks package and its "exhaustive-deps" rule are crucial tools.
// They automatically detect most stale closure issues by warning you when you forget to
// include a variable in a hook's dependency array. Do not ignore these warnings; they are
// designed to prevent real bugs that are hard to spot otherwise.

// Closures vs. Performance & Memory Leaks

// Performance: Closures themselves are a standard JavaScript feature and are highly optimized.
// Creating functions inside components on every render is generally fine. Performance issues
// usually only arise if you are performing a highly expensive computation repeatedly
// without memoization (useMemo or useCallback).


// Memory Leaks: An untidy closure can cause memory leaks. If a closure (like a stray
// event listener or an uncleared interval) keeps a reference to an entire component that
// should have been unmounted, the garbage collector can't remove that component from memory.
// Always use the cleanup function returned by useEffect for timers, subscriptions, and other side effects.