import React, { useState } from "react";
import Child1 from "./Child1";

function Parent() {
  const [dataFromChild, setDataFromChild] = useState("");
  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  }

  return (
    <div className="parent">
      Parent

      Child's data - {dataFromChild}
      <Child1 prop1={"ok prop1"} sendDataToParent={handleDataFromChild} />
    </div>
  );
}

export default Parent;
