import React, { useState } from 'react';
import Child from './Child1';

function Parent() {
  const [childData, setChildData] = useState('');

  const handleChildData = (data) => {
    setChildData(data);
  };

  return (
    <>
      <div style={{ border: '1px solid black' }}>
        <h1>Parent Container</h1>
        <h4>{childData}</h4>
        <Child parentData={'Parent says hello!'} onClickFn={handleChildData} />
      </div>
    </>
  );
}

export default Parent;
