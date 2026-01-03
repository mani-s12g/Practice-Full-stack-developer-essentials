import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, fetchUserById } from "../features/user/userSlice";
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
      userName: "The One",
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

// The useEffect hook in React, when combined with Redux Toolkit (RTK), allows for dispatching asynchronous actions, such as fetching data from an API, when a component mounts or when specific dependencies change.
// In the provided code snippet:
// JavaScript

// useEffect(() => {
//   // Dispatch the thunk directly!
//   dispatch(fetchUserById(1)); // Fetch user with ID 1
// }, [dispatch]);
// useEffect(() => { ... }, [dispatch]): This sets up an effect that will run after the component renders. The empty dependency array [] would typically mean it runs only once after the initial render. However, including dispatch in the dependency array is a common practice when using useDispatch from react-redux. While dispatch is generally stable and won't cause re-renders, including it explicitly can help avoid linting warnings and ensures the effect is re-run if dispatch itself were to change (which is highly unlikely).
// dispatch(fetchUserById(1)): This is the core action.
// dispatch is a function provided by react-redux's useDispatch hook, allowing you to send actions to the Redux store.
// fetchUserById(1) is an async thunk created using RTK's createAsyncThunk. When dispatched, this thunk will:
// Initiate an asynchronous operation (e.g., an API call to fetch user data for ID 1).
// Automatically dispatch pending, fulfilled, or rejected actions based on the outcome of the asynchronous operation. These actions update the Redux store's state, indicating loading status, success data, or error information.
// In essence, this useEffect block ensures that when the component mounts, it immediately dispatches an action to fetch user data for a specific ID, and the Redux store will be updated accordingly as the data fetching progresses. This is a standard pattern for initiating data fetching in React components using Redux Toolkit.
