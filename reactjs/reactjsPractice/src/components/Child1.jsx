import React from "react";

function Child1({ prop1, sendDataToParent }) {
  const sendData = () => {
    sendDataToParent("clicked from child!");
  };
  return (
    <>
      <div className="Child1">Child1 - {prop1}</div>
      <button onClick={sendData}>Send data to Parent</button>
    </>
  );
}

export default Child1;
