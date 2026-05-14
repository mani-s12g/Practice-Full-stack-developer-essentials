// Situations based interview practice

import React, { useEffect } from 'react'


// let v = 23; // works - value changes when re-rendered by some other useState changes, 
// but not changed when tried with just button onclick itself i.e., v++ (silent updates in background but doesnt update in UI, 
//  it will get updated or shown in UI , when someother useState variable state changes and re-render occurs, then only we can see this in UI )
function Example2() {
    // let v = 232;
    const [count, setCount] = React.useState(0);
    const [user, setUser] = React.useState({name: "mani", age: 22});
    const [name, setName] = React.useState("mani name");
    const [messages, setMessages] = React.useState(["first message"]);
    console.log("React rendered")
    console.log("count", count);
    
    // Update Manually

    // let v = 2302; // doesnt work when re-rendered
    // scenario 1
    // count++; // Uncaught TypeError: Assignment to constant variable.
    // count = count + 1; // Uncaught TypeError: Assignment to constant variable.
    // count = 7; // Uncaught TypeError: Assignment to constant variable.    
    // setCount(count + 1); // Error: Infinite loop

    // scenario 2
    // user.name = "manikanta ui"; // It will display this value on UI (No Error)
    // setUser({
    //     name: "mani",
    //     age: 22,
    // }); // Error: Infinite loop

    // scenario 3
    // name = "manikanta ss"; // Uncaught TypeError: Assignment to constant variable.
    // setName("mani ss"); // Error: Infinite loop


    // scenario 4
    // messages.push("second message"); // Displays message on UI (No Error, 
    // But just appends to existing string without comma seperation)
    // messages = ["second message"]; // Uncaught TypeError: Assignment to constant variable.
    // setMessages(["second message"]); // Error: Infinite loop

    return (
        <div>
            <h1>Example2</h1>
            <p>Count: {count}</p>
            <p>User: {user.name}</p>
            {/* <p>Name: {name}</p> */}
            <p>Messages: {messages}</p>

            <button onClick={() => setCount(prev => prev + 1)}>Official WAY</button>

            {/* <button onClick={() => setUser({name: "manikant sssss", age: 22})}>Update object...</button> */}
            {/* <button onClick={() => setUser(prev => ({...prev, name: "manikant sssss", age: 22}))}>Update object...</button> */}

            {/* this will not update the UI */}
            <button onClick={() => user.name = "manikanta"}>Update object</button>
            
            {/* Uncaught TypeError: Assignment to constant variable. */}
            {/* <button onClick={() => name = "zzzz manikanta"}>Update name</button> */}

            {/* Uncaught TypeError: Assignment to constant variable. */}
            {/* <button onClick={() => count = count + 1}>Increment</button> */}


            {/* <h5>{v}</h5> */}
            {/* <button onClick={() => v++}>v increment</button> */}
            {/* <button onClick={() => v = v + 1}>v increment</button> */}
        </div>
    )
}

export default Example2;
