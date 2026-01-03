import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import dataReducer from "../features/data/dataSlice";
import todosReducer from "../features/todos/todosSlice";
import counterReducer from "../features/counter/counterSlice";
// Static reducers that are always loaded
const staticReducers = {
    user: userReducer,
    data: dataReducer,
    counterFromStore: counterReducer,
    todosFromStore: todosReducer,
};

export function createReducer(asyncReducers) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    });
}

export const store = configureStore({
    reducer: createReducer({}),
});

// Persist counter to localStorage whenever state changes
store.subscribe(() => {
    const state = store.getState();
    if (state.counterFromStore) {
        localStorage.setItem("counter", state.counterFromStore.value);
    }
});

// Attach an object to store to hold the lazy reducers
store.asyncReducers = {};

// Main injection function
export function injectReducer(key, reducer) {
    if (store.asyncReducers[key]) return; // Already loaded

    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}

export function removeReducer(key) {
    if (!store.asyncReducers[key]) return; // Not loaded

    delete store.asyncReducers[key];
    store.replaceReducer(createReducer(store.asyncReducers));
}


// ✔ injectReducer() dynamically adds a reducer
// ✔ replaceReducer() updates the Redux store without reloading the app.



// 🎉 Final Behavior
// Before (no splitting):

// ❌ All reducers are included in the main bundle
// ❌ Performance slows as app grows

// After (dynamic reducers):

// ✔ Only initial reducers load
// ✔ /counter route loads counterReducer
// ✔ /todos loads todosReducer
// ✔ Nested routes load their own reducers
// ✔ Reducers optionally unload when leaving