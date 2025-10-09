import React, { useRef } from "react";
import { useEffect } from "react";

function UseRef() {
  const inputRef = useRef(null);
  const focusInput = () => {
    console.log(inputRef, "inputRef  ref object");
    inputRef.current.focus(); // direct DOM access
    // inputRef.current.className = "inputBg"; // direct DOM access
  };

  // on page load
  useEffect(() => {
    focusInput();
  }, []);

  return (
    <div>
      <h2>Use Ref</h2>
      <input type="text" ref={inputRef} placeholder="Type here..." />
      <button onClick={focusInput}>Click to focus</button>
    </div>
  );
}

export default UseRef;

// 1. Accessing and Controlling DOM Elements
// 👉 Classic use case: grabbing an input, focusing, scrolling, or measuring an element.
// ✅ Use when you need imperative DOM actions (focus, scroll, play video, etc.).

// What is imperative DOM access ? And what is Declarative in React js ?
// Imperative DOM access means manually and explicitly writing code that tells the browser how to change the Document Object Model (DOM) step-by-step. It is a direct and hands-on approach to modifying the structure, style, and content of a web page using the browser's native Web APIs, primarily with JavaScript.
// This contrasts with a declarative approach, where you describe the desired final state of the UI and the framework (like React) handles the actual low-level DOM manipulations for you.

// Key characteristics of imperative DOM access
// Manual and step-by-step: You must write a specific sequence of instructions to get the desired result. You tell the computer how to do something, not just what to do.
// Direct element manipulation: You directly select elements from the DOM and then call methods on those elements to modify them.
// Detailed control flow: The programmer is responsible for managing the state and controlling every single operation, which offers fine-grained control but can become complex.
// Can be less efficient: If not managed carefully, repeated or complex imperative DOM manipulations can be slow because they may trigger multiple browser reflows and repaints.

// Example in plain JavaScript
// To create a new button element and add it to the body of a webpage imperatively, you would write the following steps:
// javascript
// // Step 1: Create a new button element
// const button = document.createElement('button');

// // Step 2: Set the text content of the button
// button.innerText = 'Click Me';

// // Step 3: Add an event listener to handle clicks
// button.addEventListener('click', () => {
//   alert('Button Clicked!');
// });

// // Step 4: Find the body and append the new button to it
// document.body.appendChild(button);

// Each of these lines is an explicit command telling the browser how to construct and modify the page.

// Comparison with a declarative approach
// Using a declarative framework like React, the same process is abstracted away. You simply declare what you want the UI to look like, and the framework figures out the most efficient way to achieve that result.
// Declarative React example:
// javascript
// function App() {
//   return (
//     <button onClick={() => alert('Button Clicked!')}>
//       Click Me
//     </button>
//   );
// }
// Here, you are not manually creating, setting, or appending elements. Instead, you declare the desired UI using JSX, and React handles the imperative DOM operations behind the scenes.

// When to use imperative DOM access ?
// Even in modern, declarative frameworks, imperative access is sometimes necessary for specific tasks, such as:
// Accessing a legacy library: Interacting with third-party libraries that require direct DOM node manipulation.
// Managing focus or scrolling: Programmatically focusing on an input field or scrolling to a specific element.
// Working with animations: Performing certain complex animations or transitions that need direct access to DOM properties
