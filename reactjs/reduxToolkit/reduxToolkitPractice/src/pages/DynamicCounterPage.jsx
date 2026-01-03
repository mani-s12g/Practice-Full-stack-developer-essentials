import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { injectReducer, removeReducer } from "../store/store";
import counterReducer, { increment, decrement } from "../features/counter/counterSlice";
// import { useStore } from "react-redux";

export default function DynamicCounterPage() {
    const { value } = useSelector((state) => state.counterFromStore);
    const dispatch = useDispatch();

    // const store = useStore();

    // // load reducer when entering page
    // useEffect(() => {
    //     store.injectReducer("counter", counterReducer);
    // }, [store]);

    // Inject reducer on mount
    // ✔ Loads reducer when entering
    // ✔ Removes reducer when leaving
    useEffect(() => {
        injectReducer("counterFromStore", counterReducer);
        console.log("Counter reducer injected...");

        // Remove reducer on unmount
        return () => {
            removeReducer("counterFromStore");
            console.log("Counter reducer removed...");
        }
    }, [])

    return (
        <div>
            <h1>Dynamic Counter Page</h1>
            <p>{value}</p>
            <button onClick={() => { dispatch(increment()) }}>Increment</button>
            <button onClick={() => { dispatch(decrement()) }}>Decrement</button>
        </div>
    )
}


// 🎉 Result
// Before (no code-splitting):

// Redux loads ALL slices at boot

// Bundle size grows as your app grows

// After (with dynamic reducers):

// Only the Home page loads initially

// Visiting /counter lazy-loads:

// CounterPage.js

// CounterSlice.js

// injectReducer() adds reducer on the fly

// Best performance + smallest bundles