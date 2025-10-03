import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, fetchUserById } from "./features/user/userSlice";
import { useEffect } from "react";

function UserComponent() {
  // Use useSelector to read data from the store
  const user = useSelector((state) => state.user.user);
  const createdUser = useSelector((state) => state.user.createdUser); // <--- NEW STATE READING
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  // Use useDispatch to get the dispatch function
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the thunk directly!
    dispatch(fetchUserById(1)); // Fetch user with ID 1
  }, [dispatch]);

  // Conditional Rendering based on the loading state
  if (loading === "pending") {
    return <p>Loading user data...</p>;
  }

  if (loading === "failed") {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!user) {
    return <div>No user loaded.</div>;
  }

  const createNewUserFn = () => {
    const newUser = {
      name: "Mani",
      userName: "TheOne",
      email: "mani.s12g@gmail.com",
    };
    dispatch(createNewUser(newUser));
  };
  return (
    <>
      <div
        style={{
          padding: "20px",
          border: "1px solid #007bff",
          borderRadius: "5px",
        }}
      >
        <h3>✅ User Created Successfully (RTK)!</h3>
        <h3>User Details</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>City: {user.address.city}</p>
      </div>

      {createdUser && (
        <div
          style={{
            padding: "20px",
            border: "1px solid #007bff",
            borderRadius: "5px",
          }}
        >
          <p>ID: {createdUser.id}</p>
          <p>Name: {createdUser.name}</p>
          <p>Email: {createdUser.email}</p>
        </div>
      )}

      <div>
        <button onClick={createNewUserFn} disabled={loading === "pending"}>
          {loading === "pending"
            ? "Creating User..."
            : "Create New User (POST)"}
        </button>
      </div>
    </>
  );
}

export default UserComponent;
