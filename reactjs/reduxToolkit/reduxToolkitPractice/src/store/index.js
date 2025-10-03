import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/user/userSlice"
import dataReducer from "../features/data/dataSlice"

// configureStore handles:
// 1. Combining reducers
// 2. Adding Redux Thunk and other middleware (like dev tools)
// 3. Setting up the store

const store = configureStore({
    reducer: {
        // Defines the state slice: state.user will be managed by userReducer
        user: userReducer,
        data: dataReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself (for TypeScript, but good practice)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

export default store;