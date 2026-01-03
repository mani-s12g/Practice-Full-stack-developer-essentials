import React, { useState, useEffect, useCallback } from "react";

const Fetcher = React.memo(({ userId }) => {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");

  console.log("Child rendered! coz of initial render and state changes");
  // Memoize the fetchData function
  const fetchData = useCallback(async () => {
    console.log("Fetching data...");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const result = await response.json();
    setData(result);
  }, [userId]); // The function is recreated only when userId changes

  useEffect(() => {
    console.log("calling useEffect")
    fetchData();
  }, [fetchData]); // useEffect runs only when fetchData (and thus userId) changes

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>{data ? <p>User: {data.name}</p> : <p>Loading...</p>}</div>
    </>
  );
});

function DataFetcher() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount((c) => c + 1)}>Click me</button>
      <Fetcher userId={count} />
    </>
  );
}

export default DataFetcher;

// without strict mode
// Child rendered!          <-- initial render (data = null)
// Fetching data...
// Child rendered!          <-- re-render after setData(result)
