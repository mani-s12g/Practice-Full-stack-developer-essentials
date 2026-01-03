import React, { useState } from "react";
import { useTransition } from "react";

const items = Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`);

function UseTransition1() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);

  // useTransition gives us "isPending" and "startTransition"
  const [isPending, startTransition] = useTransition();

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setQuery(value);
  //   const filtered = items.filter((x) =>
  //     x.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setFiltered(filtered);
  // };

  // non-urgent update → filtering can be deferred
  // handleChangeUsingTransition
  const hCUsingTransition = (e) => {
    const value = e.target.value;
    setQuery(value); // urgent update → input stays responsive

    // non-urgent update → filtering can be deferred
    startTransition(() => {
      setFiltered(
        items.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      );
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        // onChange={handleChange}
        onChange={hCUsingTransition}
        placeholder="Search items..."
      />

      {isPending && <p>Loading...</p>}
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default UseTransition1;
