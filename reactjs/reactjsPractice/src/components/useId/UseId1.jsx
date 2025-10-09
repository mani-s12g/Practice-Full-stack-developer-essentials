import React, { useId } from "react";

function UseId1() {
  const id = useId();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <input type="checkbox" id={`${id}-1`} />
        <label htmlFor={`${id}-1`}>Accept Terms</label>
      </div>

      <div>
        <input type="checkbox" id={id} />
        <label htmlFor={id}>Accept Terms Now</label>
      </div>
      {/* <input type="checkbox" id='checkBox1'/>
        <label htmlFor="checkBox1">Accept Terms</label> */}
    </div>
  );
}

export default UseId1;

// https://chatgpt.com/c/68e68909-89b8-8323-9f71-255d60633f82