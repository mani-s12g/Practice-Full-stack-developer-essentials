import React from 'react';

function Child({ parentData, onClickFn }) {
  const handleClick = () => {
    onClickFn('child says hi!');
  };
  return (
    <>
      <div style={{ border: '1px solid red' }}>
        <h1>Child Container</h1>
        <p>{parentData}</p>
        <button onClick={handleClick}>Child click</button>
      </div>
    </>
  );
}

export default Child;
