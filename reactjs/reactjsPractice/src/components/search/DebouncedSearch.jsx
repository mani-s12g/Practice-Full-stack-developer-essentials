import React, { useEffect, useState } from "react";

const mockapi = (query) => {
  const data = [
    { id: 1, name: "Manikanta" },
    { id: 2, name: "Rahul" },
    { id: 3, name: "Ramesh" },
    { id: 4, name: "John" },
    { id: 5, name: "React Developer" },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      // resolve(data)
      const result = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );

      resolve(result);
    }, 1000);
  });
};

const DebouncedSearch = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // API call
  useEffect(() => {
    if (!debouncedSearch) {
      setUsers([]);
      return;
    }
    fetchData(debouncedSearch);
  }, [debouncedSearch]);

  async function fetchData(query) {
    try {
      const res = await mockapi(query);
      // const data = await res.json();
      setUsers(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div>
        <h2>User Search</h2>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DebouncedSearch;
