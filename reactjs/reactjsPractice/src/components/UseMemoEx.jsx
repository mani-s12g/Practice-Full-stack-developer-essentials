import React from "react";
import { useMemo } from "react";
import { useState } from "react";

const items = [
  {
    item: "Item1",
  },
  {
    item: "Item2",
  },
  {
    item: "ItemN...",
  },
];

// Child component
function SearchableList({ itemsProp }) {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  // const [ans, setAns] = useState([]);

  // useEffect(() => {
  //   console.log("rendering..");
  //   setAns(itemsProp.filter((y) => y.item.toLowerCase().includes(query.toLowerCase())));
  // }, [itemsProp, query]);

  // No useMemo: this will run on every render
  // console.log("re-rendered with count");
  // const filtered = itemsProp.filter(x => {
  //   console.log("filtering...")
  //   return x.item.toLowerCase().includes(query.toLowerCase())
  // });

  const filtered = useMemo(() => {
    console.log("Filtering...");
    return itemsProp.filter((x) => x.item.toLowerCase().includes(query.toLowerCase()));
  }, [itemsProp, query]);

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(c => c + 1)}>Click Me</button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {/* {ans.map((x, i) => ( */}
        {filtered.map((x, i) => (
          <li key={i}>{x.item}</li>
        ))}
      </ul>
    </div>
  );
}

function UseMemoEx() {
  return <SearchableList itemsProp={items} />;
}

export default UseMemoEx;
