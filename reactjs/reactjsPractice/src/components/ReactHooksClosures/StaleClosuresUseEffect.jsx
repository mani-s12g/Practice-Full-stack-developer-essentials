import { useState } from "react";
import { useEffect } from "react";

export default function StaleClosuresUseEffect() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            // This function inside the effect uses 'count'.
            console.log(`Count in interval: ${count}`);  // Stale closure if [count] in 
            // dependency array is missing
        }, 1000);
        return () => clearInterval(id); // Cleanup function also uses the closure
        // }, []);
    }, [count]); // Adding 'count' to the dependency array solves the stale closure issue
    return (
        <div>
            <h1>Stale Closures UseEffect</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}