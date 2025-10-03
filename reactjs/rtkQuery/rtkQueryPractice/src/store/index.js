// 3. Configure the Redux Store
// Combine the API and the UI slices.

import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../features/api/usersApi";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    // 1. RTK Query Reducer
    [usersApi.reducerPath]: usersApi.reducer,
    // 2. Local State Reducer
    user: userReducer,
  },
  // Add the middleware for RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
