import React, { useRef } from "react";
import { useImperativeHandle } from "react";

// Child component
function Child({ ref }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = "";
    },
  }));

  return <input type="text" ref={inputRef} />;
}

// Parent component
function UseRef7() {
  const fancyInputRef = useRef(null);

  return (
    <div>
      <Child ref={fancyInputRef} />
      <button onClick={() => fancyInputRef.current.focus()}>Focus</button>
      <button onClick={() => fancyInputRef.current.clear()}>Clear</button>
    </div>
  );
}

export default UseRef7;
