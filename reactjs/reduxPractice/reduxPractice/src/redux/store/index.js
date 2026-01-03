import { createStore, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"; // Import the middleware
import rootReducer from "../reducers"

// Create the store and apply the Redux Thunk middleware
const store = createStore(
    rootReducer,
    // applyMiddleware is a Redux utility that chains middlewares together
    applyMiddleware(thunk) // <--- Redux Thunk must be applied here!
);

export default store;
