import React from "react";
import { useState } from "react";
import { useRef } from "react";

function UseRef5() {
  const [input, setInput] = useState("");
  const inputRef = useRef();

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);

    clearTimeout(inputRef.current); // clear previous timer
    // inputRef.current = null; // optional - to prevent previous id
    // console.log(inputRef.current)
    
    inputRef.current = setTimeout(() => {
      console.log("Searching for:", value); // simulate API call
    }, 400);
  };

  return <input type="text" value={input} onChange={handleInput} />;
}

export default UseRef5;

// Search Box (Debounce API Calls)
// Storing a timer ref to debounce user input.
// ✅ Real-world use: Google search box, e-commerce search bars.