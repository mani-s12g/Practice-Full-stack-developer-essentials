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

      {/* <div>
        <input type="radio" name="sameName" id="yes" />
        <label htmlFor="yes">Yes</label>

        <input type="radio" name="sameName" id="no" />
        <label htmlFor="no">No</label>
      </div> */}

      {/* <input type="checkbox" id='checkBox1'/>
        <label htmlFor="checkBox1">Accept Terms</label> */}

      {/* <input type="date" name="" id="" /> */}
      {/* <input type="datetime-local" name="" id="" /> */}
      {/* <input type="datetime" name="" id="" /> */}
      {/* <input type="email" name="" id="" /> */}

      {/* <input type="file" name="" id="" /> */}

      {/* <input type="search" name="" id="" /> */}

      {/* <input type="hidden" name="wq" /> */}

      {/* <input type="image" src="" alt="" /> */}

      {/* <input type="password" name="jio" id="" /> */}

      {/* <input type="range" name="" id="" /> */}

      {/* <input type="reset" value="" /> */}
    </div>
  );
}

export default UseId1;

// https://chatgpt.com/c/68e68909-89b8-8323-9f71-255d60633f82
