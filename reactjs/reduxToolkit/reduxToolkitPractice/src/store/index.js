import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import dataReducer from "../features/data/dataSlice";
import counterReducer from "../features/counter/counterSlice";
import todosReducer from "../features/todos/todosSlice";
// configureStore handles:
// 1. Combining reducers
// 2. Adding Redux Thunk and other middleware (like dev tools)
// 3. Setting up the store

const store = configureStore({
  reducer: {
    // Defines the state slice: state.user will be managed by userReducer
    user: userReducer,
    data: dataReducer,
    counterFromStore: counterReducer,
    todosFromStore: todosReducer,
  },
});

// --- Persist to localStorage whenever state changes ---
store.subscribe(() => {
  localStorage.setItem("counter", store.getState().counterFromStore.value);
})
export default store;

// Redux Toolkit simplifies handling asynchronous actions primarily through its built-in integration of Redux Thunk
//  and the createAsyncThunk utility.
// Here's how it works: [1]

// • Redux Thunk Middleware:
// 	• Redux Thunk is a middleware that allows you to write action creators that return a function instead of a plain action object.
// 	• This function, often called a "thunk," receives dispatch and getState as arguments, enabling you to perform asynchronous operations
// (like API calls) and then dispatch regular actions based on the results.
// 	• Redux Toolkit's configureStore automatically includes Redux Thunk, so you don't need to manually set it up.

// • createAsyncThunk Utility:
// 	• This is Redux Toolkit's recommended way to handle asynchronous logic. It's a powerful helper that wraps
//  the Redux Thunk pattern and automates much of the boilerplate associated with async actions.
// 	• Automatic Action Generation: createAsyncThunk automatically generates three lifecycle actions
//  for you: pending, fulfilled, and rejected. These actions represent the different stages of an asynchronous operation.
// 	• Simplified Reducer Logic: You can easily handle these generated actions in your reducers using extraReducers within createSlice.
// This allows you to update your state based on the progress and outcome of the async operation
// (e.g., setting a loading flag, storing fetched data, or handling errors).
// 	• Payload Creator: You provide createAsyncThunk with an asynchronous function (the "payload creator")
// that performs the actual async work (e.g., making an API request). This function should return a Promise.

// In essence:
// You define an async thunk using createAsyncThunk, which encapsulates your asynchronous logic.
// When you dispatch this thunk, Redux Toolkit, powered by Redux Thunk, manages the execution of your async function and
// automatically dispatches the pending, fulfilled, or rejected actions, allowing your reducers to react accordingly and update the state.

// AI responses may include mistakes.

// [1] https://www.geeksforgeeks.org/reactjs/how-to-dispatch-asynchronous-actions-using-redux-thunk/
