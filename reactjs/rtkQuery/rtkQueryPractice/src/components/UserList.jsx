// 4. React Component (Displaying & Manipulating)
// This component fetches data, displays it, and uses local Redux state for UI logic.

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
} from "../features/api/usersApi";
import {
  setFilterText,
  setSortOrder,
  setSelectedUser,
  updateSelectedUserName,
} from "../features/user/userSlice";

function UserList() {
  const userId = 1;
  // --- A. DATA FETCHING (RTK Query) ---
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const { data: randomUSer, isLoadingUser } = useGetUserByIdQuery(userId);

  // --- B. LOCAL STATE (Redux Toolkit Slice) ---
  const dispatch = useDispatch();
  const { filterText, sortOrder, selectedUser } = useSelector(
    (state) => state.user
  );

  // --- C. MANIPULATION OF ARRAYS/LISTS (Filtering and Sorting) ---
  const filteredAndSortedUsers = React.useMemo(() => {
    console.log("using useMemo...");
    if (!users) return [];
    // 1. Filtering (Manipulation of Array/List based on primitive state)
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(filterText.toLowerCase())
    );

    // 2. Sorting (Manipulation of Array/List based on primitive state)
    // return Array.from(filtered).sort((a, b) => {
    // or
    return [...filtered].sort((a, b) => {
      if (sortOrder === "name_asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
  }, [users, filterText, sortOrder]);

  if (isLoading) return <div>Loading users...</div>;
  if (isLoadingUser) return <div>Loading user...</div>;
  if (isError) return <div>Error fetching users!</div>;

  return (
    <div>
      <h2>User Dashboard</h2>

      <h3>User By Id</h3>
      {randomUSer && (
        <>
          <p>{randomUSer.id}</p>
          <h4>{randomUSer.name}</h4>
          <h4>{randomUSer.phone}</h4>
          <h4>{randomUSer.username}</h4>
          <h4>{randomUSer.website}</h4>
        </>
      )}

      {/* Input for Primitive State Manipulation (filterText) */}
      <input
        type="text"
        placeholder="Filter by name..."
        value={filterText}
        onChange={(e) => dispatch(setFilterText(e.target.value))}
      />

      {/* Select for Primitive State Manipulation (sortOrder) */}
      <select
        value={sortOrder}
        onChange={(e) => dispatch(setSortOrder(e.target.value))}
      >
        <option value="name_asc">Name (A-Z)</option>
        <option value="name_desc">Name (Z-A)</option>
      </select>

      <hr />

      {/* Displaying Manipulated Array Data */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredAndSortedUsers.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            {/* 3. Handling Object State */}
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <button onClick={() => dispatch(setSelectedUser(user))}>
              Edit Name
            </button>
          </div>
        ))}
      </div>
      <hr />

      {/* UI for Object State Manipulation */}
      {selectedUser && (
        <div
          style={{
            border: "2px solid blue",
            padding: "15px",
            marginTop: "20px",
          }}
        >
          <h3>Editing User: {selectedUser.name}</h3>
          <p>This data is local to the Redux UI slice.</p>
          <input
            type="text"
            value={selectedUser.name}
            // 4. Manipulating the selected object's property
            onChange={(e) => dispatch(updateSelectedUserName(e.target.value))}
          />
          <button
            onClick={() => dispatch(setSelectedUser(null))}
            style={{ marginLeft: "10px" }}
          >
            Close Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default UserList;
