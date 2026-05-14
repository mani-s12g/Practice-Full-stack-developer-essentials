// Situations based interview practice

import React, { useEffect } from 'react'

function Example1() {
    const [count, setCount] = React.useState(0);
    console.log("React rendered")

    // scenario 1
    // This runs only once
    // useEffect(() => {
    //     console.log("useEffect runs only once")
    //     setCount(count + 1);
    // }, []);

    // scenario 2
    // This runs infinitly
    // useEffect(() => {
    //     console.log("useEffect runs infinitly")
    //     setCount(count + 1);
    // }, [count]);

    return (
        <div>
            <h1>Example1</h1>
            <p>Count: {count}</p>
        </div>
    )
}

export default Example1;
