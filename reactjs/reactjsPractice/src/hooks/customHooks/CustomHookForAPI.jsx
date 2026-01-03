import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // can use useCallback function to memoize getData function
    const getData = async () => {
      try {
        const res = await fetch(url, { signal });
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error(error);
        }
      }
    };

    getData();

    // 🧹 cleanup
    return () => {
      controller.abort();
      console.log("cleaned")
    };
  }, [url]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetch(url);
  //     const json = await res.json();
  //     setData(json);
  //     setLoading(false);
  //   };

  //   getData();
  // }, [url]);

  return { data, loading };
}

// Usage
export default function CustomHookForAPI() {
  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  // or
  // const V = useFetch("https://jsonplaceholder.typicode.com/posts/1");
  // const obj = {};
  // obj.data = V.data;
  // obj.loading = V.loading;
  // const {data, loading} = obj;

  if (loading) return <p>Loading Custom Hook API data...</p>;
  return <h1>{data.title}</h1>;
  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

// Custom Hooks for API Calls
// You can create your own useFetch hook to reuse across components.

// ✅ So in short, you can call APIs in React using:

// fetch (sync/async)

// axios

// React Query (advanced caching + retries)

// SWR (lightweight alternative)

// Apollo / urql (for GraphQL)

// Custom Hooks

// https://chatgpt.com/c/68ce3ee2-4ba4-8324-9e22-26c56b8d40d7

// https://chatgpt.com/c/69155887-f460-8322-a289-d55c473b8b2d
// above link to say why we need cleanup function here in useEffect
