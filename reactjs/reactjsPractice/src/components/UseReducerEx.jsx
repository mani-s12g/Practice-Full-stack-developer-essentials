import React, { useReducer, useState } from 'react';

const initialState = {
  count: 0,
  array: [
    {
      id: 1,
      name: 'name1',
    },
  ],
  object: { theme: 'dark' },
};

function reducer(state, action) {
  switch (action.type) {
    case 'Increment':
      return { ...state, count: state.count + 1 };
    case 'Decrement':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return { ...state, count: 0 };
    case 'addUser':
      return {
        ...state,
        array: [
          ...state.array,
          { id: state.array.length + 1, name: action.payload },
        ],
      };
    default:
      throw new Error('Unknown action');
  }
}

function UseReducerEx() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');

  const handleUser = () => {
    dispatch({ type: 'addUser', payload: input });
    setInput('');
  };

  return (
    <>
      <div style={{ border: '1px solid black', padding: '4px' }}>
        <h4>Count: {state.count}</h4>
        <button onClick={() => dispatch({ type: 'Increment' })}>
          Increment +
        </button>
        <button onClick={() => dispatch({ type: 'Decrement' })}>
          Decrement -
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>

      <div
        style={{ border: '1px solid black', padding: '4px', marginTop: '10px' }}
      >
        <h4>User Data & Theme</h4>
        <ul>
          {state.array.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ul>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleUser}>Add User</button>
      </div>
    </>
  );
}

export default UseReducerEx;
