import React from "react";
import { useState } from "react";
import { useDeferredValue } from "react";

const items = Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`);

function UseDeferredValue1() {
  const [query, setQuery] = useState("");
  // Create a deferred version of query
  const deferredQuery = useDeferredValue(query);

  const isStale = deferredQuery !== query;

  // Filter using the deferred query (may "lag behind" a little)
  const filtered = items.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search items..."
      />

      {/* Notice: query updates immediately, but filtering lags a bit */}
      <p>Searching for: {query}</p>

        {isStale && <p>Showing previous results while calculating...</p> }
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default UseDeferredValue1;
